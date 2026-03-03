/**
 * FFXIV TTRPG — Sistema de Combate por Fases
 * Implementa as 3 fases: Adventurer Phase → Enemy Phase → Round-Up Phase
 */

export class FFXIVCombat extends Combat {

    /** @override */
    async nextTurn() {
        const currentPhase = this.flags?.ffxivttrpg?.phase ?? "adventurer";
        const currentCombatant = this.combatant;

        // Lógica de fase por fase
        if (currentPhase === "adventurer") {
            // Avançar para o próximo adventurer
            const adventurers = this.combatants.filter(c => c.actor?.type === "adventurer");
            const currentIndex = adventurers.findIndex(c => c.id === currentCombatant?.id);

            if (currentIndex < adventurers.length - 1) {
                // Ainda há adventurers para agir
                return super.nextTurn();
            } else {
                // Todos os adventurers agiram — ir para Enemy Phase
                await this._startEnemyPhase();
                return;
            }
        }

        if (currentPhase === "enemy") {
            const enemies = this.combatants.filter(c => c.actor?.type === "enemy");
            const currentIndex = enemies.findIndex(c => c.id === currentCombatant?.id);

            if (currentIndex < enemies.length - 1) {
                return super.nextTurn();
            } else {
                // Todos os inimigos agiram — ir para Round-Up Phase
                await this._startRoundUpPhase();
                return;
            }
        }

        if (currentPhase === "roundup") {
            // Round-Up processado — começar novo round na Adventurer Phase
            await this._startAdventurerPhase();
            return;
        }

        return super.nextTurn();
    }

    /** @override */
    async nextRound() {
        await this._startAdventurerPhase();
    }

    /**
     * Inicia a Adventurer Phase
     */
    async _startAdventurerPhase() {
        console.log("FFXIV | Starting Adventurer Phase");

        await this.setFlag("ffxivttrpg", "phase", "adventurer");

        // Notificar via chat
        await ChatMessage.create({
            content: `<div class="ffxiv-phase-banner adventurer-phase">
        <i class="fas fa-shield-halved"></i>
        <span>${game.i18n.localize("FFXIV.PhaseAdventurer")}</span>
        <small>${game.i18n.localize("FFXIV.Round")} ${this.round + 1}</small>
      </div>`,
            type: CONST.CHAT_MESSAGE_STYLES.OTHER,
        });

        // Avançar para o primeiro adventurer na iniciativa
        const adventurers = this.combatants.filter(c => c.actor?.type === "adventurer");
        if (adventurers.length > 0) {
            const turn = this.turns.findIndex(t => t.id === adventurers[0].id);
            await this.update({ turn, round: this.round + 1 });
        }

        // Reduzir duração de efeitos nos adventurers
        await this._decrementEffects("adventurer");
    }

    /**
     * Inicia a Enemy Phase
     */
    async _startEnemyPhase() {
        console.log("FFXIV | Starting Enemy Phase");

        await this.setFlag("ffxivttrpg", "phase", "enemy");

        await ChatMessage.create({
            content: `<div class="ffxiv-phase-banner enemy-phase">
        <i class="fas fa-skull"></i>
        <span>${game.i18n.localize("FFXIV.PhaseEnemy")}</span>
      </div>`,
            type: CONST.CHAT_MESSAGE_STYLES.OTHER,
        });

        // Executar ataques automáticos dos inimigos (GM pode overrride)
        const enemies = this.combatants.filter(c => c.actor?.type === "enemy");
        for (const enemy of enemies) {
            await this._processEnemyTurn(enemy);
        }

        // Ir para Round-Up automaticamente
        await this._startRoundUpPhase();
    }

    /**
     * Processa o turno de um inimigo (ataques automáticos básicos)
     */
    async _processEnemyTurn(enemyCombatant) {
        const enemy = enemyCombatant.actor;
        if (!enemy) return;

        // Por enquanto, fazer ataque básico no alvo com maior Enmity
        const highestEnmityTarget = FFXIVEnmity.getHighestEnmityTarget(enemy);
        if (!highestEnmityTarget) return;

        const targetActor = highestEnmityTarget;

        // Buscar habilidades do inimigo
        const abilities = enemy.items.filter(i => i.type === "ability");
        if (abilities.length === 0) {
            // Ataque básico se não tem habilidades configuradas
            await this._performBasicEnemyAttack(enemy, targetActor);
            return;
        }

        // Usar a primeira habilidade disponível (lógica simplificada)
        const ability = abilities[0];
        await FFXIVRoll.rollAbility(ability, enemy);
    }

    /**
     * Ataque básico de inimigo (fallback)
     */
    async _performBasicEnemyAttack(enemy, target) {
        const level = enemy.system.cr || 1;
        const defenseVal = target.system.derived?.defense?.value ?? target.system.defense ?? 10;

        const attackRoll = await new Roll(`1d20 + ${Math.floor(level / 2)}`).evaluate();
        const damageRoll = await new Roll(`${Math.ceil(level / 3)}d6`).evaluate();

        const isHit = attackRoll.total >= defenseVal;
        let damageTotal = 0;

        if (isHit) {
            damageTotal = damageRoll.total;
            if (game.settings.get("ffxivttrpg", "autoApplyDamage")) {
                // Aplicar dano
                const currentHP = target.system.derived?.hp?.value ?? target.system.hp?.value ?? 0;
                const newHP = Math.max(0, currentHP - damageTotal);
                const updatePath = target.system.derived?.hp ? "system.derived.hp.value" : "system.hp.value";
                await target.update({ [updatePath]: newHP });
            }
        }

        await ChatMessage.create({
            content: `<div class="ffxiv-enemy-attack">
        <strong>${enemy.name}</strong> ${game.i18n.localize("FFXIV.Attacks")} <strong>${target.name}</strong>!
        ${isHit ? `<br>${game.i18n.localize("FFXIV.Hit")}! ${game.i18n.localize("FFXIV.Damage")}: <strong>${damageTotal}</strong>` : `<br>${game.i18n.localize("FFXIV.Miss")}!`}
      </div>`,
            type: CONST.CHAT_MESSAGE_STYLES.OTHER,
        });
    }

    /**
     * Inicia o Round-Up Phase — resolve DoTs, HoTs, AOEs pendentes
     */
    async _startRoundUpPhase() {
        console.log("FFXIV | Starting Round-Up Phase");

        await this.setFlag("ffxivttrpg", "phase", "roundup");

        await ChatMessage.create({
            content: `<div class="ffxiv-phase-banner roundup-phase">
        <i class="fas fa-hourglass-half"></i>
        <span>${game.i18n.localize("FFXIV.PhaseRoundUp")}</span>
      </div>`,
            type: CONST.CHAT_MESSAGE_STYLES.OTHER,
        });

        // Processar AOEs pendentes
        await this._resolvePendingAOEs();

        // Processar DoTs em todos os combatentes
        await this._processDotsAndHots();

        // Verificar fases dos bosses
        await this._checkBossPhases();

        // Verificar Enrage
        await this._checkEnrage();
    }

    /**
     * Resolver AOEs pendentes que foram anunciados na Enemy Phase
     */
    async _resolvePendingAOEs() {
        const pendingAOEs = this.getFlag("ffxivttrpg", "pendingAOEs") || [];

        for (const aoe of pendingAOEs) {
            const damage = await new Roll(aoe.formula).evaluate();

            // Encontrar tokens no template (AOE no canvas)
            let affectedActors = [];
            if (aoe.templateId) {
                const template = canvas.templates?.get(aoe.templateId);
                if (template) {
                    affectedActors = this._getActorsInTemplate(template);
                    await template.delete(); // Remove o marcador visual
                }
            }

            for (const actor of affectedActors) {
                if (actor.type === "adventurer") {
                    const currentHP = actor.system.derived?.hp?.value ?? actor.system.hp?.value ?? 0;
                    const newHP = Math.max(0, currentHP - damage.total);
                    const updatePath = actor.system.derived?.hp ? "system.derived.hp.value" : "system.hp.value";
                    await actor.update({ [updatePath]: newHP });
                }
            }

            if (affectedActors.length > 0) {
                await ChatMessage.create({
                    content: `<div class="ffxiv-aoe-resolve">
            <i class="fas fa-burst"></i>
            <strong>${aoe.name}</strong> ${game.i18n.localize("FFXIV.AOEResolves")}! 
            ${game.i18n.localize("FFXIV.Damage")}: <strong>${damage.total}</strong>
            (${affectedActors.map(a => a.name).join(", ")})
          </div>`,
                });
            }
        }

        // Limpar AOEs pendentes
        await this.setFlag("ffxivttrpg", "pendingAOEs", []);
    }

    /**
     * Processar DoTs (Damage over Time) e HoTs (Heal over Time)
     */
    async _processDotsAndHots() {
        for (const combatant of this.combatants) {
            const actor = combatant.actor;
            if (!actor) continue;

            for (const effect of actor.effects) {
                const effectType = effect.flags?.ffxivttrpg?.type;
                if (!effectType) continue;

                if (effectType === "dot") {
                    const formula = effect.flags.ffxivttrpg.value;
                    if (!formula) continue;

                    const roll = await new Roll(formula).evaluate();
                    const currentHP = actor.system.derived?.hp?.value ?? actor.system.hp?.value ?? 0;
                    const newHP = Math.max(0, currentHP - roll.total);
                    const updatePath = actor.system.derived?.hp ? "system.derived.hp.value" : "system.hp.value";
                    await actor.update({ [updatePath]: newHP });

                    await ChatMessage.create({
                        content: `<div class="ffxiv-dot-tick">
              <i class="fas fa-droplet" style="color:#c0392b"></i>
              <strong>${actor.name}</strong> ${game.i18n.localize("FFXIV.TakesDOT")}: <strong>${roll.total}</strong> (${effect.label})
            </div>`,
                    });
                }

                if (effectType === "hot") {
                    const formula = effect.flags.ffxivttrpg.value;
                    if (!formula) continue;

                    const roll = await new Roll(formula).evaluate();
                    const currentHP = actor.system.derived?.hp?.value ?? actor.system.hp?.value ?? 0;
                    const maxHP = actor.system.derived?.hp?.max ?? actor.system.hp?.max ?? 999;
                    const newHP = Math.min(maxHP, currentHP + roll.total);
                    const updatePath = actor.system.derived?.hp ? "system.derived.hp.value" : "system.hp.value";
                    await actor.update({ [updatePath]: newHP });

                    await ChatMessage.create({
                        content: `<div class="ffxiv-hot-tick">
              <i class="fas fa-heart-pulse" style="color:#27ae60"></i>
              <strong>${actor.name}</strong> ${game.i18n.localize("FFXIV.ReceivesHOT")}: <strong>${roll.total}</strong> (${effect.label})
            </div>`,
                    });
                }
            }

            // Decrementar duração de todos os efeitos
            await this._decrementActorEffects(actor);
        }
    }

    /**
     * Decrementa duração de efeitos de um ator
     */
    async _decrementActorEffects(actor) {
        for (const effect of actor.effects) {
            if (!effect.duration?.rounds) continue;
            const newDuration = effect.duration.rounds - 1;
            if (newDuration <= 0) {
                await effect.delete();
            } else {
                await effect.update({ "duration.rounds": newDuration });
            }
        }
    }

    /**
     * Decrementa efeitos de todos os combatentes de um tipo
     */
    async _decrementEffects(actorType) {
        for (const combatant of this.combatants) {
            if (combatant.actor?.type !== actorType) continue;
            await this._decrementActorEffects(combatant.actor);
        }
    }

    /**
     * Verifica transições de fase dos bosses
     */
    async _checkBossPhases() {
        const bosses = this.combatants.filter(c => c.actor?.system?.tier === "boss");

        for (const boss of bosses) {
            const actor = boss.actor;
            const currentHP = actor.system.hp?.value ?? 0;
            const maxHP = actor.system.hp?.max ?? 1;
            const hpPercent = currentHP / maxHP;

            const currentPhase = actor.system.phase?.current ?? 1;
            const thresholds = actor.system.phase?.thresholds ?? [];

            for (const threshold of thresholds) {
                if (hpPercent <= threshold.hp && currentPhase < threshold.phase) {
                    await actor.update({ "system.phase.current": threshold.phase });

                    await ChatMessage.create({
                        content: `<div class="ffxiv-phase-transition">
              <i class="fas fa-bolt" style="color:#f39c12"></i>
              <strong>${actor.name}</strong> ${game.i18n.localize("FFXIV.PhaseTransition")} ${threshold.phase}!
            </div>`,
                    });
                }
            }
        }
    }

    /**
     * Verifica e ativa Enrage nos bosses
     */
    async _checkEnrage() {
        const bosses = this.combatants.filter(c => c.actor?.system?.tier === "boss");

        for (const boss of bosses) {
            const actor = boss.actor;
            const maxRounds = actor.system.enrage?.maxRounds ?? 10;

            if (this.round >= maxRounds && !actor.system.enrage?.active) {
                await actor.update({ "system.enrage.active": true });

                await ChatMessage.create({
                    content: `<div class="ffxiv-enrage">
            <i class="fas fa-fire" style="color:#e74c3c"></i>
            <strong>${actor.name}</strong> ${game.i18n.localize("FFXIV.Enrage")}!
          </div>`,
                });
            }
        }
    }

    /**
     * Obtém os atores dentro de um template de AOE
     */
    _getActorsInTemplate(template) {
        const actors = [];
        for (const token of canvas.tokens.objects.children) {
            if (!token.actor || token.actor.type !== "adventurer") continue;
            if (template.object?.contains(token.center)) {
                actors.push(token.actor);
            }
        }
        return actors;
    }

    /**
     * Adiciona um AOE pendente para resolver no Round-Up
     */
    async addPendingAOE(aoeData) {
        const existing = this.getFlag("ffxivttrpg", "pendingAOEs") || [];
        existing.push(aoeData);
        await this.setFlag("ffxivttrpg", "pendingAOEs", existing);
    }

    /** @override */
    async rollInitiative(ids, options = {}) {
        // Todos os adventurers vão juntos antes dos inimigos
        for (const id of ids) {
            const combatant = this.combatants.get(id);
            if (!combatant) continue;

            let initiative;
            if (combatant.actor?.type === "adventurer") {
                // Adventurers rolam d20 + DEX
                const dex = combatant.actor.system.attributes?.dex?.value ?? 10;
                const mod = Math.floor((dex - 10) / 2);
                const roll = await new Roll(`1d20 + ${mod}`).evaluate();
                // Adicionar 100 para garantir que adventurers vêm antes dos inimigos
                initiative = roll.total + 100;
            } else {
                // Inimigos têm iniciativa baixa
                const roll = await new Roll("1d20").evaluate();
                initiative = roll.total;
            }

            await this.combatants.get(id)?.update({ initiative });
        }
    }
}

// Lazy import para evitar circular
import { FFXIVEnmity } from "./enmity.mjs";
import { FFXIVRoll } from "./roll.mjs";
