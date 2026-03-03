/**
 * FFXIV TTRPG — Preload de templates Handlebars
 */

export async function preloadHandlebarsTemplates() {
    return loadTemplates([
        // Actors
        "systems/ffxivttrpg/templates/actors/adventurer-sheet.hbs",
        "systems/ffxivttrpg/templates/actors/enemy-sheet.hbs",
        // Partials de Actor
        "systems/ffxivttrpg/templates/actors/parts/attributes.hbs",
        "systems/ffxivttrpg/templates/actors/parts/abilities.hbs",
        "systems/ffxivttrpg/templates/actors/parts/equipment.hbs",
        "systems/ffxivttrpg/templates/actors/parts/effects.hbs",
        "systems/ffxivttrpg/templates/actors/parts/biography.hbs",
        // Items
        "systems/ffxivttrpg/templates/items/ability-sheet.hbs",
        "systems/ffxivttrpg/templates/items/item-generic-sheet.hbs",
        // Chat
        "systems/ffxivttrpg/templates/chat/ability-card.hbs",
        "systems/ffxivttrpg/templates/chat/roll-card.hbs",
    ]);
}
