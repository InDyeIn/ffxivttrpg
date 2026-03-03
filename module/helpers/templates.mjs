/**
 * FFXIV TTRPG — Preload de templates Handlebars (Fase 2)
 */
export async function preloadHandlebarsTemplates() {
    return foundry.applications.handlebars.loadTemplates([
        // Actor Sheets
        "systems/ffxivttrpg/templates/actors/adventurer-sheet.hbs",
        "systems/ffxivttrpg/templates/actors/enemy-sheet.hbs",
        // Item Sheets
        "systems/ffxivttrpg/templates/items/ability-sheet.hbs",
        "systems/ffxivttrpg/templates/items/item-generic-sheet.hbs",
        // Chat
        "systems/ffxivttrpg/templates/chat/ability-card.hbs",
        "systems/ffxivttrpg/templates/chat/ability-ping.hbs",
        // Apps
        "systems/ffxivttrpg/templates/apps/limit-break.hbs",
        // HUD
        "systems/ffxivttrpg/templates/hud/phase-banner.hbs",
    ]);
}
