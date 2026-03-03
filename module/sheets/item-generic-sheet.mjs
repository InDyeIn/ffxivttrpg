/**
 * FFXIV TTRPG — Item Sheet: Genérico
 * Usado para: weapon, armor, consumable, trait, status
 */
export class FFXIVItemSheet extends foundry.appv1.sheets.ItemSheet {

    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["ffxivttrpg", "sheet", "item"],
            template: "systems/ffxivttrpg/templates/items/item-generic-sheet.hbs",
            width: 520,
            height: 400,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "details" }],
        });
    }

    /** @override */
    async getData() {
        const context = await super.getData();
        const itemData = this.item.toObject(false);
        context.system = itemData.system || {};
        context.flags = itemData.flags || {};

        // Valores seguros para cada tipo
        context.itemType = this.item.type;
        context.weaponType = context.system.weaponType ?? "";
        context.damageFormula = context.system.damage?.formula ?? "";
        context.price = context.system.price ?? 0;
        context.defense = context.system.defense ?? 0;
        context.magicDefense = context.system.magicDefense ?? 0;
        context.quantity = context.system.quantity ?? 1;
        context.effect = context.system.effect ?? "";
        context.durationRounds = context.system.duration?.rounds ?? 1;
        context.statusType = context.system.statusType ?? "buff";
        context.description = context.system.description ?? "";

        return context;
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);
    }
}
