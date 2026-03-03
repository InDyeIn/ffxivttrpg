/**
 * FFXIV TTRPG — Preload de templates Handlebars
 * Apenas os templates que realmente existem no sistema
 */
export async function preloadHandlebarsTemplates() {
    return foundry.applications.handlebars.loadTemplates([
        "systems/ffxivttrpg/templates/actors/adventurer-sheet.hbs",
        "systems/ffxivttrpg/templates/actors/enemy-sheet.hbs",
        "systems/ffxivttrpg/templates/items/ability-sheet.hbs",
        "systems/ffxivttrpg/templates/items/item-generic-sheet.hbs",
        "systems/ffxivttrpg/templates/chat/ability-card.hbs",
    ]);
}
