/**
 * FFXIV TTRPG — Sistema de Rolagem
 * Gerencia todas as rolagens de dados, combos, crits e aplicação de dano
 */

export class FFXIVRoll {

    /**
     * Rola uma habilidade de um ator
     * @param {Item} ability - A habilidade sendo usada
     * @param {Actor} actor - O ator usando a habilidade
     * @param {Object} options - Opções extras
     */
    static async rollAbility(ability, actor, options = {}) {
        const abilityData = ability.system;
        const actorData = actor.system;

        // Verificar custos antes de rolar
        if (!this._canUseAbility(ability, actor)) return;

        // Verificar combo
        if (abilityData.combo.requires && !this._checkCombo(ability, actor)) {
            ui.notifications.warn(`${game.i18n.localize("FFXIV.ComboNotReady")}: ${abilityData.combo.requires}`);
            return;
        }

        // Verificar condições especiais (gauge, modo ativo, etc.)
        if (!this._checkConditions(ability, actor)) return;

        // Pegar alvo(s)
        const targets = this._getTargets(ability, actor);

        // Realizar o roll principal
        const rollResult = await this._performRoll(ability, actor, targets, options);

        if (!rollResult) return;

        // Aplicar custos (MP, gauge)
        await this._applyCosts(ability, actor);

        // Atualizar estado de combo
        await this._updateComboState(ability, actor);

        // Criar mensagem no chat
        await this._createChatMessage(ability, actor, targets, rollResult);

        return rollResult;
    }

    /**
     * Verifica se o ator pode usar a habilidade
     */
    static _canUseAbility(ability, actor) {
        const abilityData = ability.system;
        const actorData = actor.system;

        // Verificar MP
        if (abilityData.cost.mp > 0 && actorData.derived.mp.value < abilityData.cost.mp) {
            ui.notifications.warn(game.i18n.localize("FFXIV.NotEnoughMP"));
            return false;
        }

        // Verificar Gauge
        if (abilityData.cost.gauge > 0) {
            const gaugeValue = actorData.gauge?.current ?? 0;
            if (gaugeValue < abilityData.cost.gauge) {
                ui.notifications.warn(game.i18n.localize("FFXIV.NotEnoughGauge"));
                return false;
            }
        }

        return true;
    }

    /**
     * Verifica se o combo está pronto
     */
    static _checkCombo(ability, actor) {
        const required = ability.system.combo.requires;
        if (!required) return true;
        const comboState = actor.system.comboState;
        return comboState?.enabled?.includes(required) || false;
    }

    /**
     * Verifica condições especiais
     */
    static _checkConditions(ability, actor) {
        const conditions = ability.system.conditions;
        if (!conditions?.requires) return true;

        const req = conditions.requires;

        // Verificações de modo ativo (ex: "astral_fire_active", "overheat_active")
        if (req.includes("_active")) {
            const modeName = req.replace("_active", "");
            const hasEffect = actor.effects.find(e => e.flags?.ffxivttrpg?.type === modeName);
            if (!hasEffect) {
                ui.notifications.warn(`${game.i18n.localize("FFXIV.ConditionNotMet")}: ${req}`);
                return false;
            }
        }

        return true;
    }

    /**
     * Determina os alvos da habilidade
     */
    static _getTargets(ability, actor) {
        const targetType = ability.system.target;
        const gameTargets = [...game.user.targets];

        if (targetType === "self") return [actor.token || actor];
        if (targetType === "single") {
            if (gameTargets.length === 0) {
                ui.notifications.warn(game.i18n.localize("FFXIV.NoTarget"));
                return null;
            }
            return [gameTargets[0]];
        }
        if (targetType.includes("all")) return gameTargets;
        return gameTargets;
    }

    /**
     * Executa a rolagem principal
     */
    static async _performRoll(ability, actor, targets, options = {}) {
        const abilityData = ability.system;
        const actorData = actor.system;

        // Determinar atributo principal
        const attrKey = abilityData.damage?.attribute || abilityData.healing?.attribute || "str";
        const attrValue = actorData.attributes[attrKey]?.value ?? 10;
        const modifier = Math.floor((attrValue - 10) / 2);

        let results = {};

        // Habilidades de ataque (dano)
        if (abilityData.damage?.formula) {
            for (const target of (targets || [])) {
                const targetActor = target.actor || target;

                // Roll de ataque d20 + mod
                const attackRoll = await new Roll(`1d20 + ${modifier}`).evaluate();
                const d20Result = attackRoll.dice[0].results[0].result;

                // Determinar defense do alvo
                const defenseKey = abilityData.damage.type === "physical" ? "defense" : "magicDefense";
                const targetDefense = targetActor?.system?.derived?.[defenseKey]?.value
                    ?? targetActor?.system?.[defenseKey]?.value ?? 10;

                const isCrit = d20Result >= game.settings.get("ffxivttrpg", "critThreshold");
                const isHit = isCrit || attackRoll.total >= targetDefense;
                const isDirectHit = !isCrit && d20Result === 19; // Direct Hit em 19

                let damageTotal = 0;
                let damageRoll = null;

                if (isHit) {
                    // Calcular dano
                    let formula = abilityData.damage.formula;

                    // Aplicar bônus de buffs do ator
                    const damageBonus = this._getActiveDamageBonus(actor);
                    if (damageBonus > 0) formula += ` + ${damageBonus}`;

                    // Substituir atributo na fórmula
                    formula = formula.replace(/STR|DEX|VIT|INT|MND/gi, String(attrValue));

                    damageRoll = await new Roll(formula).evaluate();
                    damageTotal = damageRoll.total;

                    // Crit = dano dobrado
                    if (isCrit) damageTotal *= 2;

                    // Direct Hit = +25% de dano
                    if (isDirectHit) damageTotal = Math.floor(damageTotal * 1.25);

                    // Verificar opção posicional
                    const positional = options.positional;
                    if (positional && abilityData.positional?.[positional]) {
                        const posBonus = await new Roll(abilityData.positional[positional].replace(/[^\dd+\-\s]/gi, '')).evaluate();
                        damageTotal += posBonus.total;
                    }

                    // Aplicar dano ao alvo se autoApply está ativo
                    if (game.settings.get("ffxivttrpg", "autoApplyDamage") && targetActor?.id) {
                        await this._applyDamageToActor(targetActor, damageTotal, abilityData.damage.type);
                    }

                    // Atualizar Enmity
                    FFXIVEnmity.addEnmity(actor, targetActor, damageTotal);
                }

                results[targetActor?.id || "unknown"] = {
                    targetName: targetActor?.name || "Unknown",
                    attackRoll,
                    d20Result,
                    isHit,
                    isCrit,
                    isDirectHit,
                    damageTotal,
                    damageRoll,
                    defense: targetDefense,
                };
            }
        }

        // Habilidades de cura
        if (abilityData.healing?.formula) {
            for (const target of (targets || [])) {
                const targetActor = target.actor || target;
                let formula = abilityData.healing.formula;
                formula = formula.replace(/STR|DEX|VIT|INT|MND/gi, String(attrValue));

                const healRoll = await new Roll(formula).evaluate();
                let healTotal = healRoll.total;

                // Aplicar cura
                if (game.settings.get("ffxivttrpg", "autoApplyDamage") && targetActor?.id) {
                    await this._applyHealToActor(targetActor, healTotal);
                }

                // Atualizar Enmity de cura (50% do valor curado como threat)
                FFXIVEnmity.addEnmity(actor, null, Math.floor(healTotal * 0.5));

                results[targetActor?.id || "heal"] = {
                    targetName: targetActor?.name || "Unknown",
                    isHeal: true,
                    healTotal,
                    healRoll,
                };
            }
        }

        // Habilidades de shield
        if (abilityData.shield?.formula) {
            for (const target of (targets || [])) {
                const targetActor = target.actor || target;
                let formula = abilityData.shield.formula;
                formula = formula.replace(/STR|DEX|VIT|INT|MND/gi, String(attrValue));

                const shieldRoll = await new Roll(formula).evaluate();
                const shieldTotal = shieldRoll.total;

                // Aplicar shield como Active Effect
                if (targetActor?.id) {
                    await this._applyShieldEffect(targetActor, shieldTotal, ability.name);
                }

                results[targetActor?.id || "shield"] = {
                    isShield: true,
                    shieldTotal,
                    shieldRoll,
                };
            }
        }

        // Aplicar efeitos de status (DoT, HoT, buffs, debuffs)
        if (abilityData.effect?.type && abilityData.effect.type !== "none") {
            await this._applyStatusEffect(ability, actor, targets);
        }

        return results;
    }

    /**
     * Obtém bônus de dano de buffs ativos no ator
     */
    static _getActiveDamageBonus(actor) {
        let bonus = 0;
        for (const effect of actor.effects) {
            const dmgBonus = effect.flags?.ffxivttrpg?.damageBonus;
            if (dmgBonus) bonus += dmgBonus;
        }
        return bonus;
    }

    /**
     * Aplica dano a um ator
     */
    static async _applyDamageToActor(targetActor, damage, damageType) {
        // Verificar shield primeiro
        const shieldEffect = targetActor.effects.find(e => e.flags?.ffxivttrpg?.type === "shield");
        let remainingDamage = damage;

        if (shieldEffect) {
            const shieldValue = shieldEffect.flags.ffxivttrpg.value;
            if (shieldValue >= damage) {
                // Shield absorve todo o dano
                const newShieldValue = shieldValue - damage;
                if (newShieldValue <= 0) {
                    await shieldEffect.delete();
                } else {
                    await shieldEffect.update({
                        "flags.ffxivttrpg.value": newShieldValue,
                    });
                }
                return;
            } else {
                remainingDamage = damage - shieldValue;
                await shieldEffect.delete();
            }
        }

        // Aplicar dano ao HP
        const currentHP = targetActor.system.derived?.hp?.value ?? targetActor.system.hp?.value ?? 0;
        const newHP = Math.max(0, currentHP - remainingDamage);

        const updatePath = targetActor.system.derived?.hp ? "system.derived.hp.value" : "system.hp.value";
        await targetActor.update({ [updatePath]: newHP });
    }

    /**
     * Aplica cura a um ator
     */
    static async _applyHealToActor(targetActor, amount) {
        const currentHP = targetActor.system.derived?.hp?.value ?? targetActor.system.hp?.value ?? 0;
        const maxHP = targetActor.system.derived?.hp?.max ?? targetActor.system.hp?.max ?? 999;
        const newHP = Math.min(maxHP, currentHP + amount);

        const updatePath = targetActor.system.derived?.hp ? "system.derived.hp.value" : "system.hp.value";
        await targetActor.update({ [updatePath]: newHP });
    }

    /**
     * Aplica shield como Active Effect
     */
    static async _applyShieldEffect(targetActor, value, sourceName) {
        const effectData = {
            label: `Shield (${sourceName})`,
            icon: "icons/svg/shield.svg",
            flags: {
                ffxivttrpg: {
                    type: "shield",
                    value: value,
                },
            },
        };
        await targetActor.createEmbeddedDocuments("ActiveEffect", [effectData]);
    }

    /**
     * Aplica efeitos de status
     */
    static async _applyStatusEffect(ability, actor, targets) {
        const effect = ability.system.effect;
        const duration = effect.duration || 1;

        const effectTargets = effect.type.includes("buff") ? [actor] : (targets || []);

        for (const target of effectTargets) {
            const targetActor = target.actor || target;
            if (!targetActor?.id) continue;

            const effectData = {
                label: effect.label || ability.name,
                icon: this._getStatusIcon(effect.type),
                duration: { rounds: duration },
                flags: {
                    ffxivttrpg: {
                        type: effect.type,
                        value: effect.value,
                        sourceAbility: ability.id,
                    },
                },
            };

            await targetActor.createEmbeddedDocuments("ActiveEffect", [effectData]);
        }
    }

    static _getStatusIcon(type) {
        const icons = {
            dot: "icons/svg/blood.svg",
            hot: "icons/svg/regen.svg",
            buff: "icons/svg/upgrades.svg",
            debuff: "icons/svg/downgrade.svg",
            bind: "icons/svg/net.svg",
            silence: "icons/svg/silenced.svg",
            sleep: "icons/svg/sleep.svg",
            poison: "icons/svg/poison.svg",
            doom: "icons/svg/skull.svg",
        };
        return icons[type] || "icons/svg/aura.svg";
    }

    /**
     * Aplica custos da habilidade (MP, gauge)
     */
    static async _applyCosts(ability, actor) {
        const cost = ability.system.cost;
        const updates = {};

        if (cost.mp > 0) {
            const currentMP = actor.system.derived.mp.value;
            updates["system.derived.mp.value"] = Math.max(0, currentMP - cost.mp);
        }

        if (cost.gauge > 0) {
            const currentGauge = actor.system.gauge?.current ?? 0;
            updates["system.gauge.current"] = Math.max(0, currentGauge - cost.gauge);
        }

        if (Object.keys(updates).length > 0) {
            await actor.update(updates);
        }
    }

    /**
     * Atualiza o estado de combo após usar uma habilidade
     */
    static async _updateComboState(ability, actor) {
        const combo = ability.system.combo;
        const updates = {};

        // Registrar que esta habilidade foi usada
        updates["system.comboState.lastAbility"] = ability.name;

        // Habilitar próximas habilidades no combo
        if (combo.enables && combo.enables.length > 0) {
            updates["system.comboState.enabled"] = combo.enables;
        } else if (!combo.enables || combo.enables.length === 0) {
            // Resetar combo se não habilita nada
            updates["system.comboState.enabled"] = [];
        }

        await actor.update(updates);
    }

    /**
     * Cria a mensagem de chat com o resultado da rolagem
     */
    static async _createChatMessage(ability, actor, targets, results) {
        const flavor = ability.system.chat?.flavor || "";

        const templateData = {
            ability,
            actor,
            targets: targets || [],
            results,
            flavor,
            FFXIV: CONFIG.FFXIV,
        };

        const content = await renderTemplate(
            "systems/ffxivttrpg/templates/chat/ability-card.hbs",
            templateData
        );

        const speaker = ChatMessage.getSpeaker({ actor });

        await ChatMessage.create({
            speaker,
            content,
            type: CONST.CHAT_MESSAGE_STYLES.OTHER,
            flags: {
                ffxivttrpg: {
                    type: "ability",
                    abilityId: ability.id,
                    actorId: actor.id,
                },
            },
        });
    }

    /**
     * Rolagem de atributo simples para checks fora de combate
     */
    static async rollAttribute(attrKey, actor) {
        const attrValue = actor.system.attributes[attrKey]?.value ?? 10;
        const modifier = Math.floor((attrValue - 10) / 2);
        const attrLabel = game.i18n.localize(`FFXIV.Attr${attrKey.toUpperCase()}`);

        const roll = await new Roll(`1d20 + ${modifier}`).evaluate();

        const speaker = ChatMessage.getSpeaker({ actor });
        roll.toMessage({
            speaker,
            flavor: `${actor.name} — Check de ${attrLabel}`,
        });

        return roll;
    }
}

// Import lazy to avoid circular
import { FFXIVEnmity } from "./enmity.mjs";
