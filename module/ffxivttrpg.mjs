/**
 * FFXIV TTRPG — Sistema para Foundry VTT v13
 * Módulo principal de inicialização
 * Usa APIs do namespace correto do v13
 */

import { FFXIVAdventurerSheet } from "./sheets/actor-adventurer-sheet.mjs";
import { FFXIVEnemySheet } from "./sheets/actor-enemy-sheet.mjs";
import { FFXIVAbilitySheet } from "./sheets/item-ability-sheet.mjs";
import { FFXIVItemSheet } from "./sheets/item-generic-sheet.mjs";
import { FFXIVCombat } from "./helpers/combat.mjs";
import { FFXIVRoll } from "./helpers/roll.mjs";
import { FFXIVEnmity } from "./helpers/enmity.mjs";
import { preloadHandlebarsTemplates } from "./helpers/templates.mjs";
import { FFXIV } from "./config.mjs";

/* -------------------------------------------- */
/*  Init Hook                                    */
/* -------------------------------------------- */

Hooks.once("init", async function () {
    console.log("FFXIV TTRPG | Initializing system...");

    // Expor no objeto global do jogo
    game.ffxivttrpg = {
        FFXIVAdventurerSheet,
        FFXIVEnemySheet,
        FFXIVRoll,
        FFXIVEnmity,
        rollItemMacro,
    };

    // Configurações do sistema
    CONFIG.FFXIV = FFXIV;
    CONFIG.Actor.documentClass = Actor;
    CONFIG.Item.documentClass = Item;
    CONFIG.Combat.documentClass = FFXIVCombat;
    CONFIG.ActiveEffect.legacyTransferral = false;

    // ---- Registrar sheets — usando a API v13 via Actors/Items que ainda funciona ----
    // Usamos o acesso directo que é backwards-compat até v15
    Actors.unregisterSheet("core", foundry.appv1.sheets.ActorSheet);
    Actors.registerSheet("ffxivttrpg", FFXIVAdventurerSheet, {
        types: ["adventurer"],
        makeDefault: true,
        label: "FFXIV.SheetAdventurer",
    });
    Actors.registerSheet("ffxivttrpg", FFXIVEnemySheet, {
        types: ["enemy"],
        makeDefault: true,
        label: "FFXIV.SheetEnemy",
    });

    Items.unregisterSheet("core", foundry.appv1.sheets.ItemSheet);
    Items.registerSheet("ffxivttrpg", FFXIVAbilitySheet, {
        types: ["ability"],
        makeDefault: true,
        label: "FFXIV.SheetAbility",
    });
    Items.registerSheet("ffxivttrpg", FFXIVItemSheet, {
        types: ["weapon", "armor", "consumable", "trait", "status"],
        makeDefault: true,
        label: "FFXIV.SheetItem",
    });

    // Settings e Helpers
    _registerSystemSettings();
    await preloadHandlebarsTemplates();
    _registerHandlebarsHelpers();

    console.log("FFXIV TTRPG | System initialized!");
});

/* -------------------------------------------- */
/*  Ready Hook                                   */
/* -------------------------------------------- */

Hooks.once("ready", async function () {
    console.log("FFXIV TTRPG | System ready.");
    FFXIVEnmity.initialize();
});

/* -------------------------------------------- */
/*  Hotbar Drop                                  */
/* -------------------------------------------- */

Hooks.on("hotbarDrop", (bar, data, slot) => {
    if (data.type === "Item") {
        createItemMacro(data, slot);
        return false;
    }
});

/* -------------------------------------------- */
/*  System Settings                              */
/* -------------------------------------------- */

function _registerSystemSettings() {
    const settings = [
        {
            key: "enmityVisible",
            name: "FFXIV.Settings.EnmityVisible",
            hint: "FFXIV.Settings.EnmityVisibleHint",
            default: true,
            type: Boolean,
        },
        {
            key: "autoApplyDamage",
            name: "FFXIV.Settings.AutoApplyDamage",
            hint: "FFXIV.Settings.AutoApplyDamageHint",
            default: true,
            type: Boolean,
        },
        {
            key: "showPhaseTracker",
            name: "FFXIV.Settings.ShowPhaseTracker",
            hint: "FFXIV.Settings.ShowPhaseTrackerHint",
            default: true,
            type: Boolean,
        },
        {
            key: "critThreshold",
            name: "FFXIV.Settings.CritThreshold",
            hint: "FFXIV.Settings.CritThresholdHint",
            default: 20,
            type: Number,
        },
    ];

    for (const s of settings) {
        game.settings.register("ffxivttrpg", s.key, {
            name: s.name,
            hint: s.hint,
            scope: "world",
            config: true,
            requiresReload: false,
            default: s.default,
            type: s.type,
        });
    }
}

/* -------------------------------------------- */
/*  Handlebars Helpers                           */
/* -------------------------------------------- */

function _registerHandlebarsHelpers() {
    const h = Handlebars.registerHelper.bind(Handlebars);

    h("eq", (a, b) => a === b);
    h("neq", (a, b) => a !== b);
    h("gt", (a, b) => a > b);
    h("gte", (a, b) => a >= b);
    h("lt", (a, b) => a < b);
    h("and", (a, b) => a && b);
    h("or", (a, b) => a || b);

    h("concat", function (...args) {
        return args.filter(a => typeof a !== "object").join("");
    });

    h("toLowerCase", str => (str || "").toLowerCase());

    h("localize", key => game.i18n.localize(key));

    h("damageTypeColor", type => ({
        physical: "#c8a84b", magic: "#7b5ea7", holy: "#f0e68c",
        dark: "#4a0e8f", fire: "#ff6b35", ice: "#64b5f6",
        lightning: "#ffd54f", wind: "#81c784", earth: "#a1887f",
        water: "#4fc3f7", unaspected: "#ffffff", heal: "#66bb6a",
    }[type] || "#ffffff"));
}

/* -------------------------------------------- */
/*  Item Macros                                  */
/* -------------------------------------------- */

async function createItemMacro(data, slot) {
    if (data.type !== "Item") return;
    if (!("uuid" in data)) {
        return ui.notifications.warn(game.i18n.localize("FFXIV.MacroWarning"));
    }

    const item = await fromUuid(data.uuid);
    if (!item) return ui.notifications.warn(game.i18n.localize("FFXIV.MacroNoItem"));

    const command = `game.ffxivttrpg.rollItemMacro("${data.uuid}");`;
    let macro = game.macros.find(m => m.name === item.name && m.command === command);
    if (!macro) {
        macro = await Macro.create({
            name: item.name,
            type: "script",
            img: item.img,
            command,
            flags: { "ffxivttrpg.itemMacro": true },
        });
    }
    game.user.assignHotbarMacro(macro, slot);
}

async function rollItemMacro(uuid) {
    const item = await fromUuid(uuid);
    if (!item || item.type !== "ability") {
        return ui.notifications.warn(game.i18n.localize("FFXIV.MacroNotAbility"));
    }

    const speaker = ChatMessage.getSpeaker();
    let actor;
    if (speaker.token) actor = game.actors.tokens[speaker.token];
    if (!actor) actor = game.actors.get(speaker.actor);
    if (!actor) return ui.notifications.warn(game.i18n.localize("FFXIV.MacroNoActor"));

    return FFXIVRoll.rollAbility(item, actor);
}
