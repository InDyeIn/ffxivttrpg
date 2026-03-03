/**
 * FFXIV TTRPG — Item Sheet: Ability
 */

export class FFXIVAbilitySheet extends ItemSheet {

    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["ffxivttrpg", "sheet", "item", "ability"],
            template: "systems/ffxivttrpg/templates/items/ability-sheet.hbs",
            width: 520,
            height: 560,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "details" }],
        });
    }

    /** @override */
    async getData() {
        const context = await super.getData();
        const itemData = this.item.toObject(false);
        context.system = itemData.system;
        context.config = CONFIG.FFXIV;
        context.enrichedDescription = await TextEditor.enrichHTML(
            itemData.system.description || "", { async: true }
        );
        return context;
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);
        if (!this.isEditable) return;

        // Switch de damage type atualiza cor do label
        html.on("change", "select[name='system.damage.type']", (event) => {
            const type = event.currentTarget.value;
            const color = CONFIG.FFXIV && this._getDamageColor(type);
            html.find(".damage-type-preview").css("color", color || "#ffffff");
        });
    }

    _getDamageColor(type) {
        const colors = {
            physical: "#c8a84b", magic: "#7b5ea7", holy: "#f0e68c",
            dark: "#4a0e8f", fire: "#ff6b35", ice: "#64b5f6",
            lightning: "#ffd54f", wind: "#81c784", earth: "#a1887f",
            water: "#4fc3f7", unaspected: "#ffffff",
        };
        return colors[type] || "#ffffff";
    }
}

/**
 * FFXIV TTRPG — Item Sheet: Genérico (weapon, armor, consumable, trait, status)
 */
export class FFXIVItemSheet extends ItemSheet {

    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["ffxivttrpg", "sheet", "item"],
            template: "systems/ffxivttrpg/templates/items/item-generic-sheet.hbs",
            width: 480,
            height: 440,
        });
    }

    /** @override */
    async getData() {
        const context = await super.getData();
        const itemData = this.item.toObject(false);
        context.system = itemData.system;
        context.config = CONFIG.FFXIV;
        context.enrichedDescription = await TextEditor.enrichHTML(
            itemData.system.description || "", { async: true }
        );
        return context;
    }
}
