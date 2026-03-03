/**
 * FFXIV TTRPG — Item Sheet: Genérico (Application V2)
 * Usado para: weapon, armor, consumable, trait, status
 */
const { ItemSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;

export class FFXIVItemSheet extends HandlebarsApplicationMixin(ItemSheetV2) {

    /** @override */
    static DEFAULT_OPTIONS = {
        classes: ["ffxivttrpg", "sheet", "item"],
        position: { width: 520, height: 400 },
        form: { submitOnChange: true, closeOnSubmit: false }
    };

    /** @override */
    _configureRenderOptions(options) {
        super._configureRenderOptions(options);
        // Em ApplicationV2, injetamos dinamicamente as partes dependendo do tipo de item
        if (this.document.type === "class") {
            options.parts = { sheet: { template: "systems/ffxivttrpg/templates/items/class-sheet.hbs" } };
        } else if (this.document.type === "race" || this.document.type === "subclass") {
            options.parts = { sheet: { template: "systems/ffxivttrpg/templates/items/race-sheet.hbs" } };
        } else if (this.document.type === "feature" || this.document.type === "trait") {
            options.parts = { sheet: { template: "systems/ffxivttrpg/templates/items/feature-sheet.hbs" } };
        } else {
            options.parts = { sheet: { template: "systems/ffxivttrpg/templates/items/item-generic-sheet.hbs" } };
        }
    }

    /** @override */
    async _prepareContext(options) {
        const context = await super._prepareContext(options);
        const itemData = this.document.toObject(false);
        context.system = itemData.system || {};
        context.flags = itemData.flags || {};

        // Valores seguros para cada tipo
        context.itemType = this.document.type;
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
    _onRender(context, options) {
        super._onRender(context, options);
        // Fallback robusto para abas (Tabs) no V2 sem alterar os templates V1
        const html = $(this.element);
        const nav = html.find('.sheet-tabs');
        if (nav.length) {
            nav.on('click', '.item', (ev) => {
                ev.preventDefault();
                nav.find('.item').removeClass('active');
                $(ev.currentTarget).addClass('active');
                const tabName = ev.currentTarget.dataset.tab;
                html.find('.tab').removeClass('active');
                html.find(`.tab[data-tab="${tabName}"]`).addClass('active');
            });
            // Ativa a primeira aba no render inicial se não houver ativa
            if (!nav.find('.item.active').length) nav.find('.item').first().click();
        }
    }
}
