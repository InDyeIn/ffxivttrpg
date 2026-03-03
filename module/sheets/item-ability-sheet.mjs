/**
 * FFXIV TTRPG — Item Sheet: Ability (Application V2)
 */
const { ItemSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;

export class FFXIVAbilitySheet extends HandlebarsApplicationMixin(ItemSheetV2) {

    /** @override */
    static DEFAULT_OPTIONS = {
        classes: ["ffxivttrpg", "sheet", "item", "ability"],
        position: { width: 520, height: 560 },
        form: { submitOnChange: true, closeOnSubmit: false }
    };

    /** @override */
    static PARTS = {
        sheet: { template: "systems/ffxivttrpg/templates/items/ability-sheet.hbs" }
    };

    /** @override */
    async _prepareContext(options) {
        const context = await super._prepareContext(options);
        const itemData = this.document.toObject(false);
        context.system = itemData.system || {};
        context.config = CONFIG.FFXIV || {};

        // Valores seguros para o template
        context.jobName = context.system.job ?? "";
        context.levelVal = context.system.level ?? 1;
        context.actionType = context.system.actionType ?? "primary";
        context.rangeVal = context.system.range ?? "melee";
        context.targetVal = context.system.target ?? "single";
        context.costMp = context.system.cost?.mp ?? 0;
        context.costGauge = context.system.cost?.gauge ?? 0;
        context.damageFormula = context.system.damage?.formula ?? "";
        context.damageType = context.system.damage?.type ?? "physical";
        context.damageAttr = context.system.damage?.attribute ?? "str";
        context.healFormula = context.system.healing?.formula ?? "";
        context.shieldFormula = context.system.shield?.formula ?? "";
        context.comboRequires = context.system.combo?.requires ?? "";
        context.comboEnables = context.system.combo?.enables ?? "";
        context.comboIsOpener = context.system.combo?.isOpener ?? false;
        context.positionalFlank = context.system.positional?.flank ?? "";
        context.positionalRear = context.system.positional?.rear ?? "";
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
            if (!nav.find('.item.active').length) nav.find('.item').first().click();
        }
    }
}
