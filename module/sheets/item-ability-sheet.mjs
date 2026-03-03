/**
 * FFXIV TTRPG — Item Sheet: Ability
 */
export class FFXIVAbilitySheet extends foundry.appv1.sheets.ItemSheet {

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
    activateListeners(html) {
        super.activateListeners(html);
    }
}
