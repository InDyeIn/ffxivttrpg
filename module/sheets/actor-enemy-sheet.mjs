/**
 * FFXIV TTRPG — Actor Sheet: Enemy
 */

export class FFXIVEnemySheet extends ActorSheet {

    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["ffxivttrpg", "sheet", "actor", "enemy"],
            template: "systems/ffxivttrpg/templates/actors/enemy-sheet.hbs",
            width: 620,
            height: 520,
            tabs: [
                {
                    navSelector: ".sheet-tabs",
                    contentSelector: ".sheet-body",
                    initial: "main",
                },
            ],
        });
    }

    /** @override */
    async getData() {
        const context = await super.getData();
        const actorData = this.actor.toObject(false);
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
        context.abilities = this.actor.items.filter(i => i.type === "ability").map(i => i.toObject(false));

        // Tabela de Enmity (quem está gerando mais aggro)
        context.enmityTable = FFXIVEnmity.getEnmityTable(this.actor);
        context.currentTarget = FFXIVEnmity.getHighestEnmityTarget(this.actor);

        return context;
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);
        if (!this.isEditable) return;

        // Usar habilidade do inimigo (GM only)
        html.on("click", ".ability-use", async (event) => {
            event.preventDefault();
            const li = event.currentTarget.closest("[data-item-id]");
            const itemId = li.dataset.itemId;
            const item = this.actor.items.get(itemId);
            if (item) await FFXIVRoll.rollAbility(item, this.actor);
        });

        // Editar habilidade
        html.on("click", ".item-edit", (event) => {
            event.preventDefault();
            const li = event.currentTarget.closest("[data-item-id]");
            this.actor.items.get(li.dataset.itemId)?.sheet?.render(true);
        });

        // Deletar habilidade
        html.on("click", ".item-delete", (event) => {
            event.preventDefault();
            const li = event.currentTarget.closest("[data-item-id]");
            this.actor.items.get(li.dataset.itemId)?.delete();
        });

        // Adicionar habilidade
        html.on("click", ".item-create", async (event) => {
            event.preventDefault();
            await Item.create({ name: "Nova Habilidade", type: "ability" }, { parent: this.actor });
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
        const tokenDoc = this.actor.token;
        if (!tokenDoc) {
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
}

// Lazy imports
import { FFXIVRoll } from "../helpers/roll.mjs";
import { FFXIVEnmity } from "../helpers/enmity.mjs";
