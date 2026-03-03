/**
 * FFXIV TTRPG — Actor Sheet: Adventurer (v2 — simplificado e à prova de falhas)
 */

export class FFXIVAdventurerSheet extends ActorSheet {

    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["ffxivttrpg", "sheet", "actor", "adventurer"],
            template: "systems/ffxivttrpg/templates/actors/adventurer-sheet.hbs",
            width: 720,
            height: 640,
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
    async getData() {
        // Pegar contexto base do Foundry
        const context = await super.getData();

        // Dados do actor como plain object
        const actorData = this.actor.toObject(false);
        context.system = actorData.system || {};
        context.flags = actorData.flags || {};
        context.config = CONFIG.FFXIV || {};
        context.isGM = game.user.isGM;

        // ---- Atributos primários (com modificador pré-calculado) ----
        const attrKeys = ["str", "dex", "vit", "int", "mnd"];
        const attrLabels = { str: "FOR", dex: "DES", vit: "VIT", int: "INT", mnd: "MEN" };
        context.attributes = {};
        for (const key of attrKeys) {
            const val = context.system.attributes?.[key]?.value ?? 10;
            const mod = Math.floor((val - 10) / 2);
            context.attributes[key] = {
                value: val,
                modifier: mod,
                modifierStr: (mod >= 0 ? "+" : "") + mod,
                label: attrLabels[key],
            };
        }

        // ---- HP / MP percentuais ----
        const hp = context.system.derived?.hp ?? { value: 20, max: 20 };
        const mp = context.system.derived?.mp ?? { value: 5, max: 5 };
        context.hpValue = hp.value ?? 20;
        context.hpMax = hp.max ?? 20;
        context.mpValue = mp.value ?? 5;
        context.mpMax = mp.max ?? 5;
        context.hpPercent = Math.round((context.hpValue / Math.max(1, context.hpMax)) * 100);
        context.mpPercent = Math.round((context.mpValue / Math.max(1, context.mpMax)) * 100);
        const hpRatio = context.hpValue / Math.max(1, context.hpMax);
        context.hpColor = hpRatio > 0.5 ? "healthy" : hpRatio > 0.25 ? "injured" : "critical";

        // ---- Gauge especial do job ----
        const gauge = context.system.gauge ?? {};
        context.hasGauge = (gauge.max ?? 0) > 0;
        context.gaugeValue = gauge.current ?? 0;
        context.gaugeMax = gauge.max ?? 0;
        context.gaugeLabel = gauge.label ?? "";
        context.gaugePercent = context.hasGauge
            ? Math.round((context.gaugeValue / Math.max(1, context.gaugeMax)) * 100)
            : 0;

        // ---- Atributos derivados ----
        context.defense = context.system.derived?.defense?.value ?? 10;
        context.magicDefense = context.system.derived?.magicDefense?.value ?? 10;
        context.speed = context.system.derived?.speed?.value ?? 3;

        // ---- Informações do job / raça ----
        context.jobName = context.system.job?.name ?? "";
        context.jobLevel = context.system.job?.level ?? 1;
        context.raceName = context.system.race?.name ?? "";
        context.raceTribe = context.system.race?.tribe ?? "";

        // ---- Separar itens por tipo ----
        context.abilities = { primary: [], secondary: [], instant: [], passive: [] };
        context.weapons = [];
        context.consumables = [];
        context.traits = [];

        for (const item of this.actor.items) {
            const d = item.toObject(false);
            if (item.type === "ability") {
                const at = d.system?.actionType || "primary";
                if (context.abilities[at]) context.abilities[at].push(d);
                else context.abilities.primary.push(d);
            } else if (item.type === "weapon") { context.weapons.push(d); }
            else if (item.type === "consumable") { context.consumables.push(d); }
            else if (item.type === "trait") { context.traits.push(d); }
        }

        // ---- Active Effects ----
        context.effects = this.actor.effects.map(e => ({
            id: e.id,
            label: e.label,
            icon: e.icon,
            disabled: e.disabled,
            rounds: e.duration?.rounds ?? 0,
        }));

        // ---- Combo state ----
        context.lastCombo = context.system.comboState?.lastAbility ?? "";
        context.hasCombo = !!context.lastCombo;

        // ---- Perfil ----
        context.profileAge = context.system.profile?.age ?? "";
        context.profileHeight = context.system.profile?.height ?? "";
        context.profileDeity = context.system.profile?.deity ?? "";
        context.profileHomeland = context.system.profile?.homeland ?? "";
        context.biography = context.system.biography ?? "";

        return context;
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);
        if (!this.isEditable) return;

        // Rolar atributo ao clicar no modificador
        html.on("click", ".attribute-roll", async (ev) => {
            ev.preventDefault();
            const attrKey = ev.currentTarget.dataset.attr;
            if (attrKey) this._rollAttribute(attrKey);
        });

        // Usar habilidade ao clicar no nome
        html.on("click", ".ability-use", async (ev) => {
            ev.preventDefault();
            const li = ev.currentTarget.closest("[data-item-id]");
            if (!li) return;
            const item = this.actor.items.get(li.dataset.itemId);
            if (item) {
                try { await FFXIVRoll.rollAbility(item, this.actor); }
                catch (e) { console.error("FFXIV | Roll error:", e); }
            }
        });

        // Editar item
        html.on("click", ".item-edit", (ev) => {
            ev.preventDefault();
            const li = ev.currentTarget.closest("[data-item-id]");
            if (li) this.actor.items.get(li.dataset.itemId)?.sheet?.render(true);
        });

        // Deletar item
        html.on("click", ".item-delete", (ev) => {
            ev.preventDefault();
            const li = ev.currentTarget.closest("[data-item-id]");
            if (li) this.actor.items.get(li.dataset.itemId)?.delete();
        });

        // Criar item
        html.on("click", ".item-create", async (ev) => {
            ev.preventDefault();
            const type = ev.currentTarget.dataset.type || "ability";
            await Item.create({ name: "Novo Item", type }, { parent: this.actor });
        });

        // Toggle efeito
        html.on("click", ".effect-toggle", async (ev) => {
            ev.preventDefault();
            const id = ev.currentTarget.closest("[data-effect-id]")?.dataset.effectId;
            const eff = this.actor.effects.get(id);
            if (eff) await eff.update({ disabled: !eff.disabled });
        });

        // Deletar efeito
        html.on("click", ".effect-delete", async (ev) => {
            ev.preventDefault();
            const id = ev.currentTarget.closest("[data-effect-id]")?.dataset.effectId;
            this.actor.effects.get(id)?.delete();
        });

        // Botão de rest
        html.on("click", ".rest-button", () => this._onRest());
    }

    async _rollAttribute(attrKey) {
        const val = this.actor.system.attributes?.[attrKey]?.value ?? 10;
        const mod = Math.floor((val - 10) / 2);
        const labels = { str: "FOR", dex: "DES", vit: "VIT", int: "INT", mnd: "MEN" };
        const roll = await new Roll(`1d20 + ${mod}`).evaluate();
        roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            flavor: `${this.actor.name} — Check de ${labels[attrKey] || attrKey}`,
        });
    }

    async _onRest() {
        if (game.combat?.active) {
            ui.notifications.warn("Não é possível descansar durante o combate!");
            return;
        }
        const maxHP = this.actor.system.derived?.hp?.max ?? 20;
        const maxMP = this.actor.system.derived?.mp?.max ?? 5;
        await this.actor.update({
            "system.derived.hp.value": maxHP,
            "system.derived.mp.value": maxMP,
            "system.comboState.lastAbility": "",
            "system.comboState.enabled": [],
        });
        ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            content: `<div class="ffxiv-rest-message">🌙 <strong>${this.actor.name}</strong> descansou! HP e MP recuperados.</div>`,
        });
    }
}

// Import lazy — no final para evitar problemas de circular import
import { FFXIVRoll } from "../helpers/roll.mjs";
