/**
 * FFXIV TTRPG — Sistema para Foundry VTT v13
 * Módulo principal de inicialização
 */

// Import all modules
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
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once("init", async function () {
    console.log("FFXIV TTRPG | Initializing system...");

    // Store system config in global game object
    game.ffxivttrpg = {
        FFXIVAdventurerSheet,
        FFXIVEnemySheet,
        FFXIVRoll,
        FFXIVEnmity,
        rollItemMacro,
    };

    // Define custom constants for the system
    CONFIG.FFXIV = FFXIV;

    // Set up custom document classes (use default)
    CONFIG.Actor.documentClass = Actor;
    CONFIG.Item.documentClass = Item;

    // Override Combat class
    CONFIG.Combat.documentClass = FFXIVCombat;

    // Configure active effects
    CONFIG.ActiveEffect.legacyTransferral = false;

    // Register sheet application classes
    Actors.unregisterSheet("core", ActorSheet);
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

    Items.unregisterSheet("core", ItemSheet);
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

    // Register system settings
    _registerSystemSettings();

    // Preload Handlebars templates
    await preloadHandlebarsTemplates();

    // Register Handlebars helpers
    _registerHandlebarsHelpers();

    console.log("FFXIV TTRPG | System initialized successfully!");
});

/* -------------------------------------------- */
/*  Ready Hook                                   */
/* -------------------------------------------- */

Hooks.once("ready", async function () {
    console.log("FFXIV TTRPG | System ready.");

    // Init enmity tracker
    FFXIVEnmity.initialize();

    // Check Foundry version
    if (!game.user.isGM) return;

    const version = game.version;
    if (foundry.utils.isNewerVersion("13", version)) {
        ui.notifications.warn(game.i18n.localize("FFXIV.VersionWarning"));
    }
});

/* -------------------------------------------- */
/*  Macro Hooks                                  */
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
    game.settings.register("ffxivttrpg", "enmityVisible", {
        name: "FFXIV.Settings.EnmityVisible",
        hint: "FFXIV.Settings.EnmityVisibleHint",
        scope: "world",
        config: true,
        requiresReload: false,
        default: true,
        type: Boolean,
    });

    game.settings.register("ffxivttrpg", "autoApplyDamage", {
        name: "FFXIV.Settings.AutoApplyDamage",
        hint: "FFXIV.Settings.AutoApplyDamageHint",
        scope: "world",
        config: true,
        requiresReload: false,
        default: true,
        type: Boolean,
    });

    game.settings.register("ffxivttrpg", "showPhaseTracker", {
        name: "FFXIV.Settings.ShowPhaseTracker",
        hint: "FFXIV.Settings.ShowPhaseTrackerHint",
        scope: "world",
        config: true,
        requiresReload: false,
        default: true,
        type: Boolean,
    });

    game.settings.register("ffxivttrpg", "critThreshold", {
        name: "FFXIV.Settings.CritThreshold",
        hint: "FFXIV.Settings.CritThresholdHint",
        scope: "world",
        config: true,
        requiresReload: false,
        default: 20,
        type: Number,
        range: { min: 16, max: 20, step: 1 },
    });
}

/* -------------------------------------------- */
/*  Handlebars Helpers                           */
/* -------------------------------------------- */

function _registerHandlebarsHelpers() {
    Handlebars.registerHelper("concat", function (...args) {
        let outStr = "";
        for (let arg in args) {
            if (typeof args[arg] !== "object") outStr += args[arg];
        }
        return outStr;
    });

    Handlebars.registerHelper("toLowerCase", function (str) {
        return str.toLowerCase();
    });

    Handlebars.registerHelper("eq", function (a, b) {
        return a === b;
    });

    Handlebars.registerHelper("neq", function (a, b) {
        return a !== b;
    });

    Handlebars.registerHelper("gt", function (a, b) {
        return a > b;
    });

    Handlebars.registerHelper("gte", function (a, b) {
        return a >= b;
    });

    Handlebars.registerHelper("lt", function (a, b) {
        return a < b;
    });

    Handlebars.registerHelper("and", function (a, b) {
        return a && b;
    });

    Handlebars.registerHelper("or", function (a, b) {
        return a || b;
    });

    Handlebars.registerHelper("times", function (n, block) {
        let result = "";
        for (let i = 0; i < n; i++) result += block.fn(i);
        return result;
    });

    Handlebars.registerHelper("gaugePercent", function (value, max) {
        if (!max) return 0;
        return Math.round((value / max) * 100);
    });

    Handlebars.registerHelper("hpColor", function (value, max) {
        const pct = value / max;
        if (pct > 0.5) return "healthy";
        if (pct > 0.25) return "injured";
        return "critical";
    });

    Handlebars.registerHelper("localize", function (key) {
        return game.i18n.localize(key);
    });

    Handlebars.registerHelper("actionTypeIcon", function (type) {
        const icons = {
            primary: "fa-circle",
            secondary: "fa-circle-half-stroke",
            instant: "fa-bolt",
            passive: "fa-infinity",
        };
        return icons[type] || "fa-circle";
    });

    Handlebars.registerHelper("damageTypeColor", function (type) {
        const colors = {
            physical: "#c8a84b",
            magic: "#7b5ea7",
            holy: "#f0e68c",
            dark: "#4a0e8f",
            fire: "#ff6b35",
            ice: "#64b5f6",
            lightning: "#ffd54f",
            wind: "#81c784",
            earth: "#a1887f",
            water: "#4fc3f7",
            unaspected: "#ffffff",
            heal: "#66bb6a",
        };
        return colors[type] || "#ffffff";
    });
}

/* -------------------------------------------- */
/*  Item Macro Creation                          */
/* -------------------------------------------- */

async function createItemMacro(data, slot) {
    if (data.type !== "Item") return;
    if (!("uuid" in data)) {
        return ui.notifications.warn(game.i18n.localize("FFXIV.MacroWarning"));
    }

    const item = await fromUuid(data.uuid);
    if (!item) return ui.notifications.warn(game.i18n.localize("FFXIV.MacroNoItem"));

    const command = `game.ffxivttrpg.rollItemMacro("${data.uuid}");`;
    let macro = game.macros.find(
        (m) => m.name === item.name && m.command === command
    );

    if (!macro) {
        macro = await Macro.create({
            name: item.name,
            type: "script",
            img: item.img,
            command: command,
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

    if (!actor) {
        return ui.notifications.warn(game.i18n.localize("FFXIV.MacroNoActor"));
    }

    return FFXIVRoll.rollAbility(item, actor);
}
