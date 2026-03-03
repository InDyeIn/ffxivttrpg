/**
 * FFXIV TTRPG — Actor Sheet: Enemy (Application V2)
 */
const { ActorSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;

export class FFXIVEnemySheet extends HandlebarsApplicationMixin(ActorSheetV2) {

    /** @override */
    static DEFAULT_OPTIONS = {
        classes: ["ffxivttrpg", "sheet", "actor", "enemy"],
        position: { width: 620, height: 520 },
        form: { submitOnChange: true, closeOnSubmit: false }
    };

    /** @override */
    static PARTS = {
        sheet: { template: "systems/ffxivttrpg/templates/actors/enemy-sheet.hbs" }
    };

    /** @override */
    async _prepareContext(options) {
        const context = await super._prepareContext(options);
        const actorData = this.document.toObject(false);
        context.system = actorData.system;
        context.config = CONFIG.FFXIV;
        context.isGM = game.user.isGM;

        // HP como percentual
        const hp = actorData.system.hp ?? { value: 0, max: 1 };
        context.hpPercent = Math.round((hp.value / Math.max(1, hp.max)) * 100);
        context.hpColor = hp.value / hp.max > 0.5 ? "healthy" : hp.value / hp.max > 0.25 ? "injured" : "critical";

        // Tier do inimigo
        context.tierConfig = CONFIG.FFXIV.enemyTiers?.[actorData.system.tier] || {};

        // Habilidades do inimigo
        context.abilities = this.document.items.filter(i => i.type === "ability").map(i => i.toObject(false));

        // Tabela de Enmity (quem está gerando mais aggro)
        context.enmityTable = FFXIVEnmity.getEnmityTable(this.document);
        context.currentTarget = FFXIVEnmity.getHighestEnmityTarget(this.document);

        return context;
    }

    /** @override */
    _onRender(context, options) {
        super._onRender(context, options);
        if (!this.isEditable) return;

        const html = $(this.element);

        // Fallback robusto para abas (Tabs) no V2 sem alterar os templates V1
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

        // Usar habilidade do inimigo (GM only)
        html.on("click", ".ability-use", async (event) => {
            event.preventDefault();
            const li = event.currentTarget.closest("[data-item-id]");
            const itemId = li.dataset.itemId;
            const item = this.document.items.get(itemId);
            if (item) await FFXIVRoll.pingAbility(item, this.document);
        });

        // Editar habilidade
        html.on("click", ".item-edit", (event) => {
            event.preventDefault();
            const li = event.currentTarget.closest("[data-item-id]");
            this.document.items.get(li.dataset.itemId)?.sheet?.render(true);
        });

        // Deletar habilidade
        html.on("click", ".item-delete", (event) => {
            event.preventDefault();
            const li = event.currentTarget.closest("[data-item-id]");
            this.document.items.get(li.dataset.itemId)?.delete();
        });

        // Adicionar habilidade
        html.on("click", ".item-create", async (event) => {
            event.preventDefault();
            await Item.create({ name: "Nova Habilidade", type: "ability" }, { parent: this.document });
        });

        // Colocar AOE (marcador visual no mapa)
        html.on("click", ".place-aoe", async (event) => {
            event.preventDefault();
            const aoeType = event.currentTarget.dataset.aoe;
            await this._placeAOEMarker(aoeType);
        });
    }

    /**
     * Coloca marcador de AOE no canvas para visualização dos players
     */
    async _placeAOEMarker(type) {
        // Verifica se o actor tem um token ativo no canvas
        const tokenDoc = this.document.isToken ? this.document.token : canvas.tokens?.controlled?.[0]?.document ?? null;
        if (!tokenDoc || !canvas.scene) {
            ui.notifications.warn(game.i18n.localize("FFXIV.EnemyNotOnScene"));
            return;
        }

        const aoeShapes = {
            circle: { t: "circle", distance: 6 },
            cone: { t: "cone", distance: 6, angle: 90 },
            line: { t: "ray", distance: 10, width: 1 },
            donut: { t: "circle", distance: 8 },
        };

        const shape = aoeShapes[type] || aoeShapes.circle;

        await canvas.scene.createEmbeddedDocuments("MeasuredTemplate", [{
            ...shape,
            x: tokenDoc.x + (canvas.grid.size / 2),
            y: tokenDoc.y + (canvas.grid.size / 2),
            fillColor: "#ff000033",
            borderColor: "#ff0000",
            flags: { ffxivttrpg: { type: "aoe_warning", resolves: "roundup" } },
        }]);
    }

    /** @override */
    _processSubmitData(event, form, formData) {
        const submitData = foundry.utils.expandObject(formData.object);
        this.document.update(submitData);
        return submitData;
    }
}

// Lazy imports
import { FFXIVRoll } from "../helpers/roll.mjs";
import { FFXIVEnmity } from "../helpers/enmity.mjs";
