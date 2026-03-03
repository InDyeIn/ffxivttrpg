/**
 * FFXIV TTRPG — Sistema para Foundry VTT v13
 * Módulo principal — Fase 2
 */

import { FFXIVActor } from "./documents/actor.mjs";
import { FFXIVItem } from "./documents/item.mjs";
import { FFXIVAdventurerSheet } from "./sheets/actor-adventurer-sheet.mjs";
import { FFXIVEnemySheet } from "./sheets/actor-enemy-sheet.mjs";
import { FFXIVAbilitySheet } from "./sheets/item-ability-sheet.mjs";
import { FFXIVItemSheet } from "./sheets/item-generic-sheet.mjs";
import { FFXIVCombat } from "./helpers/combat.mjs";
import { FFXIVRoll } from "./helpers/roll.mjs";
import { FFXIVEnmity } from "./helpers/enmity.mjs";
import { LimitBreakTracker } from "./apps/limit-break-tracker.mjs";
import { FFXIVCombatHUD } from "./hud/combat-hud.mjs";
import { FFXIVActionBar } from "./hud/action-bar.mjs";
import { preloadHandlebarsTemplates } from "./helpers/templates.mjs";
import { FFXIV } from "./config.mjs";

/* -------------------------------------------- */
/*  Init Hook                                    */
/* -------------------------------------------- */

Hooks.once("init", async function () {
    console.log("FFXIV TTRPG | Initializing system v1.1...");

    game.ffxivttrpg = {
        FFXIVActor,
        FFXIVItem,
        FFXIVAdventurerSheet,
        FFXIVEnemySheet,
        FFXIVRoll,
        FFXIVEnmity,
        LimitBreakTracker,
        FFXIVCombatHUD,
        FFXIVActionBar,
        rollItemMacro,
    };

    CONFIG.FFXIV = FFXIV;

    // Documentos customizados — lógica de jogo no Actor e Item
    CONFIG.Actor.documentClass = FFXIVActor;
    CONFIG.Item.documentClass = FFXIVItem;
    CONFIG.Combat.documentClass = FFXIVCombat;
    CONFIG.ActiveEffect.legacyTransferral = false;

    // Sheets
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("ffxivttrpg", FFXIVAdventurerSheet, {
        types: ["adventurer"], makeDefault: true, label: "FFXIV.SheetAdventurer",
    });
    Actors.registerSheet("ffxivttrpg", FFXIVEnemySheet, {
        types: ["enemy"], makeDefault: true, label: "FFXIV.SheetEnemy",
    });

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("ffxivttrpg", FFXIVAbilitySheet, {
        types: ["ability"], makeDefault: true, label: "FFXIV.SheetAbility",
    });
    Items.registerSheet("ffxivttrpg", FFXIVItemSheet, {
        types: ["weapon", "armor", "consumable", "trait", "status", "class", "subclass", "race", "feature"],
        makeDefault: true, label: "FFXIV.SheetItem",
    });

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

    // Inicia Action Bar (sempre visivel pra quem tem personagem)
    if (game.user.character) {
        new FFXIVActionBar().render(true);
    }

    // Renderizar LB Tracker se houver combate ativo
    if (game.combat?.active) {
        LimitBreakTracker.getOrCreate().render(true);
    }

    // Socket para sincronização do LB entre jogadores
    game.socket.on("system.ffxivttrpg", (data) => {
        if (data.type === "limitBreakUpdate") {
            LimitBreakTracker.getOrCreate()?.render();
        }
        if (data.type === "phaseChange") {
            FFXIVCombatHUD.getOrCreate().setPhase(data.phase, data.round);
        }
    });
});

/* -------------------------------------------- */
/*  Combat Hooks — Fases e LB                    */
/* -------------------------------------------- */

Hooks.on("createCombat", () => {
    LimitBreakTracker.getOrCreate().render(true);
});

Hooks.on("deleteCombat", () => {
    LimitBreakTracker.instance?.close();
    LimitBreakTracker.instance = null;
    FFXIVCombatHUD.instance?.close();
    FFXIVCombatHUD.instance = null;
});

// Detectar mudança de combatente para mostrar fase
Hooks.on("combatTurnChange", async (combat) => {
    const phase = combat.getFlag("ffxivttrpg", "currentPhase") ?? "adventurer";
    FFXIVCombatHUD.getOrCreate().render(true);
});

// Update Action Bar on Token Selection for quick testing/GM usage
Hooks.on("controlToken", (token, controlled) => {
    // Busca todas renders da Action Bar abertas e força elas a atualizarem
    if (Object.keys(game.ffxivttrpg.FFXIVActionBar.renders || {}).length > 0) {
        Object.values(game.ffxivttrpg.FFXIVActionBar.renders)[0].render();
    } else {
        new game.ffxivttrpg.FFXIVActionBar().render(true);
    }
});

// Intercepta e ativa listeners no chat para rolagens pós-ping
Hooks.on("renderChatMessage", (message, html, data) => {
    FFXIVRoll.activateChatListeners(html);
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
    const register = (key, opts) => game.settings.register("ffxivttrpg", key, {
        scope: "world", config: true, requiresReload: false, ...opts,
    });

    register("enmityVisible", { name: "FFXIV.Settings.EnmityVisible", hint: "FFXIV.Settings.EnmityVisibleHint", default: true, type: Boolean });
    register("autoApplyDamage", { name: "FFXIV.Settings.AutoApplyDamage", hint: "FFXIV.Settings.AutoApplyDamageHint", default: true, type: Boolean });
    register("showPhaseTracker", { name: "FFXIV.Settings.ShowPhaseTracker", hint: "FFXIV.Settings.ShowPhaseTrackerHint", default: true, type: Boolean });
    register("critThreshold", { name: "FFXIV.Settings.CritThreshold", hint: "FFXIV.Settings.CritThresholdHint", default: 20, type: Number });

    // Gauge de Limit Break — world-scoped para persistir entre jogadores
    game.settings.register("ffxivttrpg", "limitBreakValue", {
        scope: "world", config: false, default: 0, type: Number,
    });
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
    h("concat", (...args) => args.filter(a => typeof a !== "object").join(""));
    h("toLowerCase", str => (str || "").toLowerCase());
    h("localize", key => game.i18n.localize(key));

    // Range helper — cria array [0..n-1] para loops de esferas
    h("range", (n) => Array.from({ length: n }, (_, i) => i));

    // Gauge sphere helper — retorna "filled" ou "empty"
    h("sphereFilled", (index, current) => index < current ? "filled" : "empty");

    h("damageTypeColor", type => ({
        physical: "#c8a84b", magic: "#7b5ea7", holy: "#f0e68c",
        dark: "#4a0e8f", fire: "#ff6b35", ice: "#64b5f6",
        lightning: "#ffd54f", wind: "#81c784", earth: "#a1887f",
        water: "#4fc3f7", unaspected: "#ffffff", heal: "#66bb6a",
    }[type] || "#ffffff"));

    h("actionTypeIcon", type => ({
        primary: "crosshairs",
        secondary: "star-half-stroke",
        instant: "bolt",
        passive: "infinity"
    }[type] || "circle"));
}

/* -------------------------------------------- */
/*  Item Macros                                  */
/* -------------------------------------------- */

async function createItemMacro(data, slot) {
    if (!("uuid" in data)) return ui.notifications.warn(game.i18n.localize("FFXIV.MacroWarning"));
    const item = await fromUuid(data.uuid);
    if (!item) return ui.notifications.warn(game.i18n.localize("FFXIV.MacroNoItem"));

    const command = `game.ffxivttrpg.rollItemMacro("${data.uuid}");`;
    let macro = game.macros.find(m => m.name === item.name && m.command === command);
    if (!macro) macro = await Macro.create({ name: item.name, type: "script", img: item.img, command });
    game.user.assignHotbarMacro(macro, slot);
}

async function rollItemMacro(uuid) {
    const item = await fromUuid(uuid);
    if (!item || item.type !== "ability") return ui.notifications.warn(game.i18n.localize("FFXIV.MacroNotAbility"));

    const speaker = ChatMessage.getSpeaker();
    let actor = speaker.token ? game.actors.tokens[speaker.token] : null;
    if (!actor) actor = game.actors.get(speaker.actor);
    if (!actor) return ui.notifications.warn(game.i18n.localize("FFXIV.MacroNoActor"));

    return FFXIVRoll.pingAbility(item, actor);
}
