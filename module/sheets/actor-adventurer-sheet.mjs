/**
 * FFXIV TTRPG — Actor Sheet: Adventurer
 */

export class FFXIVAdventurerSheet extends ActorSheet {

    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["ffxivttrpg", "sheet", "actor", "adventurer"],
            template: "systems/ffxivttrpg/templates/actors/adventurer-sheet.hbs",
            width: 780,
            height: 680,
            tabs: [
                {
                    navSelector: ".sheet-tabs",
                    contentSelector: ".sheet-body",
                    initial: "combat",
                },
            ],
        });
    }

    /** @override */
    get template() {
        return `systems/ffxivttrpg/templates/actors/adventurer-sheet.hbs`;
    }

    /** @override */
    async getData() {
        const context = await super.getData();
        const actorData = this.actor.toObject(false);
        context.system = actorData.system;
        context.flags = actorData.flags;

        // Adicionar dados de configuração
        context.config = CONFIG.FFXIV;
        context.isGM = game.user.isGM;

        // Preparar atributos com modificadores calculados
        context.attributes = {};
        for (const [key, attr] of Object.entries(actorData.system.attributes || {})) {
            context.attributes[key] = {
                ...attr,
                label: game.i18n.localize(`FFXIV.Attr${key.toUpperCase()}`),
                modifier: Math.floor((attr.value - 10) / 2),
            };
        }

        // Preparar HP e MP como percentuais para barras visuais
        const hp = actorData.system.derived?.hp ?? { value: 0, max: 1 };
        const mp = actorData.system.derived?.mp ?? { value: 0, max: 1 };
        context.hpPercent = Math.round((hp.value / Math.max(1, hp.max)) * 100);
        context.mpPercent = Math.round((mp.value / Math.max(1, mp.max)) * 100);
        context.hpColor = hp.value / hp.max > 0.5 ? "healthy" : hp.value / hp.max > 0.25 ? "injured" : "critical";

        // Gauge especial do job
        const gauge = actorData.system.gauge;
        if (gauge && gauge.max > 0) {
            context.gaugePercent = Math.round((gauge.current / gauge.max) * 100);
        }

        // Dados do job
        const jobKey = actorData.system.job?.name?.toLowerCase().replace(/\s/g, "");
        context.jobConfig = CONFIG.FFXIV.jobs?.[jobKey] || null;

        // Preparar itens por tipo
        context.abilities = {
            primary: [],
            secondary: [],
            instant: [],
            passive: [],
        };
        context.weapons = [];
        context.armors = [];
        context.consumables = [];
        context.traits = [];

        for (const item of this.actor.items) {
            const itemData = item.toObject(false);
            itemData.enrichedDesc = await TextEditor.enrichHTML(itemData.system.description || "", { async: true });

            if (item.type === "ability") {
                const actionType = itemData.system.actionType || "primary";
                context.abilities[actionType]?.push(itemData);
            } else if (item.type === "weapon") {
                context.weapons.push(itemData);
            } else if (item.type === "armor") {
                context.armors.push(itemData);
            } else if (item.type === "consumable") {
                context.consumables.push(itemData);
            } else if (item.type === "trait") {
                context.traits.push(itemData);
            }
        }

        // Active Effects
        context.effects = this.actor.effects.map(e => ({
            id: e.id,
            label: e.label,
            icon: e.icon,
            disabled: e.disabled,
            duration: e.duration,
            ffxivType: e.flags?.ffxivttrpg?.type,
        }));

        // Combo state
        context.comboState = actorData.system.comboState || { lastAbility: "", enabled: [] };

        // Enmity info (se em combate)
        if (game.combat?.active) {
            const enemyCombatants = game.combat.combatants.filter(c => c.actor?.type === "enemy");
            if (enemyCombatants.length > 0) {
                context.enmityInfo = FFXIVEnmity.getEnmityTable(enemyCombatants[0].actor);
                context.isHighestEnmity = context.enmityInfo?.[0]?.actor?.id === this.actor.id;
            }
        }

        return context;
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Se não é proprietário, sai
        if (!this.isEditable) return;

        // Rolar atributo ao clicar no label
        html.on("click", ".attribute-roll", async (event) => {
            event.preventDefault();
            const attrKey = event.currentTarget.dataset.attr;
            await FFXIVRoll.rollAttribute(attrKey, this.actor);
        });

        // Usar habilidade ao clicar no nome
        html.on("click", ".ability-use", async (event) => {
            event.preventDefault();
            const li = event.currentTarget.closest("[data-item-id]");
            const itemId = li.dataset.itemId;
            const item = this.actor.items.get(itemId);
            if (item) await FFXIVRoll.rollAbility(item, this.actor);
        });

        // Editar item
        html.on("click", ".item-edit", (event) => {
            event.preventDefault();
            const li = event.currentTarget.closest("[data-item-id]");
            const item = this.actor.items.get(li.dataset.itemId);
            item?.sheet?.render(true);
        });

        // Deletar item
        html.on("click", ".item-delete", (event) => {
            event.preventDefault();
            const li = event.currentTarget.closest("[data-item-id]");
            const item = this.actor.items.get(li.dataset.itemId);
            item?.delete();
        });

        // Criar item via botão de +
        html.on("click", ".item-create", this._onItemCreate.bind(this));

        // Toggle de effect ativo/desativado
        html.on("click", ".effect-toggle", async (event) => {
            event.preventDefault();
            const effectId = event.currentTarget.closest("[data-effect-id]")?.dataset.effectId;
            const effect = this.actor.effects.get(effectId);
            if (effect) await effect.update({ disabled: !effect.disabled });
        });

        // Deletar effect
        html.on("click", ".effect-delete", async (event) => {
            event.preventDefault();
            const effectId = event.currentTarget.closest("[data-effect-id]")?.dataset.effectId;
            const effect = this.actor.effects.get(effectId);
            if (effect) await effect.delete();
        });

        // Modificar HP diretamente pela barra
        html.on("change", ".hp-input", async (event) => {
            const value = parseInt(event.currentTarget.value);
            if (!isNaN(value)) {
                await this.actor.update({ "system.derived.hp.value": Math.max(0, value) });
            }
        });

        // Modificar MP diretamente
        html.on("change", ".mp-input", async (event) => {
            const value = parseInt(event.currentTarget.value);
            if (!isNaN(value)) {
                await this.actor.update({ "system.derived.mp.value": Math.max(0, value) });
            }
        });

        // Gauge do job (Beast Gauge, Chakra, etc.)
        html.on("change", ".gauge-input", async (event) => {
            const value = parseInt(event.currentTarget.value);
            if (!isNaN(value)) {
                await this.actor.update({ "system.gauge.current": Math.max(0, value) });
            }
        });

        // Drag & Drop de items
        html.on("drop", ".ability-list", this._onDrop.bind(this));

        // Botão de Rest (recupera HP/MP fora de combate)
        html.on("click", ".rest-button", async (event) => {
            event.preventDefault();
            await this._onRest();
        });
    }

    /**
     * Criar novo item
     */
    async _onItemCreate(event) {
        event.preventDefault();
        const header = event.currentTarget;
        const type = header.dataset.type || "ability";
        const data = { name: `Novo ${game.i18n.localize(`TYPES.Item.${type}`)}`, type };
        await Item.create(data, { parent: this.actor });
    }

    /**
     * Rest — recupera HP e MP totalmente (fora de combate)
     */
    async _onRest() {
        if (game.combat?.active) {
            ui.notifications.warn(game.i18n.localize("FFXIV.NoRestInCombat"));
            return;
        }

        const maxHP = this.actor.system.derived.hp.max;
        const maxMP = this.actor.system.derived.mp.max;

        await this.actor.update({
            "system.derived.hp.value": maxHP,
            "system.derived.mp.value": maxMP,
            "system.comboState": { lastAbility: "", enabled: [] },
        });

        ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            content: `<div class="ffxiv-rest-message">
        <i class="fas fa-moon"></i>
        <strong>${this.actor.name}</strong> ${game.i18n.localize("FFXIV.Rested")}! HP e MP recuperados.
      </div>`,
        });
    }
}

// Lazy import
import { FFXIVRoll } from "../helpers/roll.mjs";
import { FFXIVEnmity } from "../helpers/enmity.mjs";
