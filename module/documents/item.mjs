/**
 * FFXIV TTRPG — Item Document Customizado
 * Adiciona lógica de uso, combo e geração de chat card
 */
export class FFXIVItem extends Item {

    /** @override */
    prepareData() {
        super.prepareData();
    }

    /** @override */
    async _onCreate(data, options, userId) {
        super._onCreate(data, options, userId);
        if (userId !== game.user.id || !this.parent) return;

        // Auto-cria efeitos para itens do tipo 'feature' (ex: traits raciais ou stances de job)
        if (this.type === "feature" || this.type === "class" || this.type === "race" || this.type === "trait") {
            const effects = [];

            // Exemplo hardcoded temporário para Traits específicos enquanto a compilação não suportar effects
            if (this.name.includes("Highlander")) {
                effects.push({
                    name: "Constituição Robusta",
                    icon: this.img,
                    changes: [{ key: "system.derived.hp.max", mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: "2" }]
                });
            } else if (this.name.includes("Sword Oath")) {
                effects.push({
                    name: "Sword Oath",
                    icon: this.img,
                    changes: [
                        { key: "system.attributes.str.value", mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: "2" },
                        { key: "system.derived.defense.value", mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: "1" }
                    ]
                });
            } else if (this.name.includes("Darkside")) {
                effects.push({
                    name: "Darkside",
                    icon: this.img,
                    changes: [{ key: "system.attributes.str.value", mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: "3" }]
                });
            }

            if (effects.length > 0) {
                await this.createEmbeddedDocuments("ActiveEffect", effects.map(e => ({
                    ...e,
                    origin: this.uuid,
                    transfer: true // Transfere para o Actor pai
                })));
                ui.notifications.info(`[FFXIV] Active Effect instanciado para: ${this.name}`);
            }
        }
    }

    /* -------------------------------------------- */
    /*  Método Principal de Uso                      */
    /* -------------------------------------------- */

    /**
     * Usa este item — entry point unificado
     * @param {FFXIVActor} actor - ator usando o item
     * @param {Array<Token>} targets - tokens alvo selecionados
     */
    async use(actor, targets = []) {
        if (!actor) return;

        switch (this.type) {
            case "ability": return this._useAbility(actor, targets);
            case "consumable": return this._useConsumable(actor);
            case "weapon": return this._useWeapon(actor, targets);
            default:
                return ui.notifications.info(`${this.name} equipado.`);
        }
    }

    async _useAbility(actor, targets) {
        const sys = this.system;

        // --- Verificar custo de MP ---
        const mpCost = sys.cost?.mp ?? 0;
        if (mpCost > 0) {
            const currentMP = actor.system.derived?.mp?.value ?? 0;
            if (currentMP < mpCost) {
                ui.notifications.warn(`${actor.name}: MP insuficiente! (${currentMP}/${mpCost})`);
                return null;
            }
            await actor.update({ "system.derived.mp.value": currentMP - mpCost });
        }

        // --- Verificar custo de Gauge ---
        const gaugeCost = sys.cost?.gauge ?? 0;
        if (gaugeCost > 0) {
            const currentGauge = actor.system.gauge?.current ?? 0;
            if (currentGauge < gaugeCost) {
                ui.notifications.warn(`${actor.name}: Gauge insuficiente! (${currentGauge}/${gaugeCost})`);
                return null;
            }
            await actor.modifyGauge(-gaugeCost);
        }

        // --- Verificar combo ---
        const comboBonus = this._checkCombo(actor);

        // --- Rolagem via FFXIVRoll ---
        const target = targets[0]?.actor ?? null;
        const result = await FFXIVRoll.rollAbility(this, actor, target, { comboBonus });

        // --- Atualizar estado de combo ---
        if (result) {
            await this._updateComboState(actor);
            // Gauge bonus da habilidade
            const gaugeGain = sys.gaugeGain ?? 0;
            if (gaugeGain > 0) await actor.modifyGauge(gaugeGain);
        }

        return result;
    }

    async _useConsumable(actor) {
        const sys = this.system;
        const heal = sys.healAmount ?? 0;
        const restoreMP = sys.restoreMP ?? 0;
        const quantity = sys.quantity ?? 1;

        if (quantity <= 0) {
            ui.notifications.warn(`${this.name}: quantidade esgotada!`);
            return;
        }

        if (heal > 0) await actor.applyHealing(heal);
        if (restoreMP > 0) {
            const currentMP = actor.system.derived?.mp?.value ?? 0;
            const maxMP = actor.system.derived?.mp?.max ?? 5;
            await actor.update({ "system.derived.mp.value": Math.min(maxMP, currentMP + restoreMP) });
        }

        // Diminuir quantidade
        await this.update({ "system.quantity": quantity - 1 });

        ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor }),
            content: `<div class="ffxiv-chat-card">
                <img src="${this.img}" class="item-img" alt="${this.name}" style="width:32px;height:32px;float:left;margin-right:8px"/>
                <strong>${actor.name}</strong> usou <strong>${this.name}</strong>.
                ${heal > 0 ? `<br>❤ Recuperou ${heal} HP.` : ""}
                ${restoreMP > 0 ? `<br>💧 Recuperou ${restoreMP} MP.` : ""}
            </div>`,
        });
    }

    async _useWeapon(actor, targets) {
        const sys = this.system;
        const formula = sys.damage?.formula ?? "1d6";
        const type = sys.damage?.type ?? "physical";
        const roll = await new Roll(formula).evaluate();
        roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor }),
            flavor: `${actor.name} ataca com ${this.name} — ${type}`,
        });
    }

    /* -------------------------------------------- */
    /*  Combo System                                 */
    /* -------------------------------------------- */

    /**
     * Verifica se a habilidade é o próximo elo do combo ativo
     * @param {FFXIVActor} actor
     * @returns {boolean} - true se está em combo
     */
    _checkCombo(actor) {
        const requires = this.system.combo?.requires ?? "";
        const isOpener = this.system.combo?.isOpener ?? false;
        const lastAbility = actor.system.comboState?.lastAbility ?? "";

        if (isOpener || !requires) return true;
        return lastAbility === requires;
    }

    /**
     * Atualiza o estado de combo após usar a habilidade
     */
    async _updateComboState(actor) {
        const enables = this.system.combo?.enables ?? "";
        await actor.update({
            "system.comboState.lastAbility": this.name,
            "system.comboState.enables": enables ? enables.split(",").map(s => s.trim()) : [],
        });
    }

    /* -------------------------------------------- */
    /*  Chat Data                                    */
    /* -------------------------------------------- */

    /**
     * Retorna dados para renderizar o chat card
     */
    getChatData() {
        const sys = this.system;
        return {
            item: this,
            name: this.name,
            img: this.img,
            type: this.type,
            actionType: sys.actionType ?? "primary",
            level: sys.level ?? 1,
            job: sys.job ?? "",
            mpCost: sys.cost?.mp ?? 0,
            gaugeCost: sys.cost?.gauge ?? 0,
            damageFormula: sys.damage?.formula ?? "",
            damageType: sys.damage?.type ?? "physical",
            healFormula: sys.healing?.formula ?? "",
            description: sys.description ?? "",
        };
    }
}

// Import lazy
import { FFXIVRoll } from "../helpers/roll.mjs";
