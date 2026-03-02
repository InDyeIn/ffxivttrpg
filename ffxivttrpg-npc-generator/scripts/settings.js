export const MODULE_ID = "ffxivttrpg-npc-generator";

export function registerSettings() {
    game.settings.register(MODULE_ID, "openaiApiKey", {
        name: game.i18n.localize("FFXIVGEN.Settings.ApiKey.Name"),
        hint: game.i18n.localize("FFXIVGEN.Settings.ApiKey.Hint"),
        scope: "world",     // Needs to be world so the GM uses their key
        config: true,       // Shows up in the settings menu
        type: String,
        default: "",
    });

    game.settings.register(MODULE_ID, "aiModel", {
        name: game.i18n.localize("FFXIVGEN.Settings.Model.Name"),
        hint: game.i18n.localize("FFXIVGEN.Settings.Model.Hint"),
        scope: "world",
        config: true,
        type: String,
        choices: {
            "gpt-4o-mini": "GPT-4o Mini (Fast/Cheap)",
            "gpt-4o": "GPT-4o (Better Reasoning)"
        },
        default: "gpt-4o",
    });
}
