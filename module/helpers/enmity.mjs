/**
 * FFXIV TTRPG — Sistema de Enmity (Aggro/Ameaça)
 * Rastreia o nível de ameaça de cada adventurer em relação a cada inimigo
 */

export class FFXIVEnmity {

    // Estrutura: { enemyId: { actorId: enmityValue } }
    static _table = {};

    /**
     * Inicializa o sistema de Enmity
     */
    static initialize() {
        // Limpar ao iniciar combate
        Hooks.on("combatStart", () => {
            FFXIVEnmity.reset();
        });

        // Limpar ao terminar combate
        Hooks.on("deleteCombat", () => {
            FFXIVEnmity.reset();
        });

        // Hook para renderizar o Combat Tracker com Enmity
        Hooks.on("renderCombatTracker", (app, html, data) => {
            if (game.settings.get("ffxivttrpg", "enmityVisible")) {
                FFXIVEnmity.renderEnmityIndicators(app, html, data);
            }
        });

        console.log("FFXIV Enmity | Initialized");
    }

    /**
     * Reseta toda a tabela de Enmity
     */
    static reset() {
        FFXIVEnmity._table = {};
    }

    /**
     * Adiciona Enmity para um ator em relação a um (ou todos os) inimigos
     * @param {Actor} actor - Quem causou a ameaça (adventurer ou healer)
     * @param {Actor|null} targetEnemy - O inimigo alvo (null = todos os inimigos em combate)
     * @param {number} amount - Quantidade de Enmity a adicionar
     */
    static addEnmity(actor, targetEnemy, amount) {
        if (!actor || amount <= 0) return;

        const combat = game.combat;
        if (!combat) return;

        const enemies = targetEnemy
            ? [targetEnemy]
            : combat.combatants.filter(c => c.actor?.type === "enemy").map(c => c.actor);

        for (const enemy of enemies) {
            if (!enemy?.id) continue;

            if (!FFXIVEnmity._table[enemy.id]) {
                FFXIVEnmity._table[enemy.id] = {};
            }

            if (!FFXIVEnmity._table[enemy.id][actor.id]) {
                FFXIVEnmity._table[enemy.id][actor.id] = 0;
            }

            FFXIVEnmity._table[enemy.id][actor.id] += amount;
        }

        // Re-renderizar o Combat Tracker
        if (ui.combat) ui.combat.render();
    }

    /**
     * Define Enmity máxima para um ator (Provoke)
     */
    static maximizeEnmity(actor, targetEnemy) {
        if (!targetEnemy?.id) return;

        if (!FFXIVEnmity._table[targetEnemy.id]) {
            FFXIVEnmity._table[targetEnemy.id] = {};
        }

        // Encontrar o maior valor atual
        const currentMax = Math.max(0, ...Object.values(FFXIVEnmity._table[targetEnemy.id]));

        // Definir o ator com o máximo + 1
        FFXIVEnmity._table[targetEnemy.id][actor.id] = currentMax + 1;

        if (ui.combat) ui.combat.render();
    }

    /**
     * Transfere Enmity (Shirk — 25% para outro aliado)
     */
    static transferEnmity(fromActor, toActor, percent = 0.25) {
        const combat = game.combat;
        if (!combat) return;

        const enemies = combat.combatants.filter(c => c.actor?.type === "enemy").map(c => c.actor);

        for (const enemy of enemies) {
            if (!FFXIVEnmity._table[enemy.id]) continue;

            const fromValue = FFXIVEnmity._table[enemy.id][fromActor.id] ?? 0;
            const transferAmount = Math.floor(fromValue * percent);

            FFXIVEnmity._table[enemy.id][fromActor.id] -= transferAmount;
            FFXIVEnmity._table[enemy.id][toActor.id] = (FFXIVEnmity._table[enemy.id][toActor.id] ?? 0) + transferAmount;
        }

        if (ui.combat) ui.combat.render();
    }

    /**
     * Obtém o ator com maior Enmity em relação a um inimigo
     * @param {Actor} enemy 
     * @returns {Actor|null}
     */
    static getHighestEnmityTarget(enemy) {
        if (!enemy?.id) return null;

        const enmityForEnemy = FFXIVEnmity._table[enemy.id] || {};
        if (Object.keys(enmityForEnemy).length === 0) {
            // Fallback: pegar um adventurer aleatório
            const combat = game.combat;
            if (!combat) return null;
            const adventurers = combat.combatants.filter(c => c.actor?.type === "adventurer");
            return adventurers[0]?.actor || null;
        }

        let highestActorId = null;
        let highestValue = -1;

        for (const [actorId, value] of Object.entries(enmityForEnemy)) {
            if (value > highestValue) {
                highestValue = value;
                highestActorId = actorId;
            }
        }

        return game.actors.get(highestActorId) || null;
    }

    /**
     * Obtém a tabela de Enmity de um inimigo, ordenada
     */
    static getEnmityTable(enemy) {
        if (!enemy?.id) return [];

        const enmityForEnemy = FFXIVEnmity._table[enemy.id] || {};

        return Object.entries(enmityForEnemy)
            .map(([actorId, value]) => ({
                actor: game.actors.get(actorId),
                value,
                isHighest: false,
            }))
            .sort((a, b) => b.value - a.value)
            .map((entry, index) => ({
                ...entry,
                isHighest: index === 0,
                rank: index + 1,
            }));
    }

    /**
     * Renderiza indicadores de Enmity no Combat Tracker
     */
    static renderEnmityIndicators(app, html, data) {
        // Adicionar indicadores de Enmity ao lado de cada combatante Tank/Adventurer
        const combat = game.combat;
        if (!combat) return;

        for (const combatant of combat.combatants) {
            if (combatant.actor?.type !== "adventurer") continue;

            const li = html.find(`[data-combatant-id="${combatant.id}"]`);
            if (!li.length) continue;

            // Calcular nivel de Enmity médio do adventurer em todos os inimigos
            let totalEnmity = 0;
            let enemyCount = 0;

            for (const [enemyId, enmityTable] of Object.entries(FFXIVEnmity._table)) {
                const val = enmityTable[combatant.actor.id] ?? 0;
                totalEnmity += val;
                enemyCount++;
            }

            const avgEnmity = enemyCount > 0 ? Math.floor(totalEnmity / enemyCount) : 0;

            // Determinar cor do indicador
            let enmityClass = "enmity-low";
            if (avgEnmity > 200) enmityClass = "enmity-high";
            else if (avgEnmity > 100) enmityClass = "enmity-medium";

            // Adicionar badge ao combatante
            const controls = li.find(".combatant-controls");
            controls.prepend(`
        <span class="ffxiv-enmity-badge ${enmityClass}" title="${game.i18n.localize('FFXIV.Enmity')}: ${avgEnmity}">
          <i class="fas fa-eye"></i> ${Math.floor(avgEnmity / 10)}
        </span>
      `);
        }

        // Adicionar indicador de alvo principal nos inimigos
        for (const combatant of combat.combatants) {
            if (combatant.actor?.type !== "enemy") continue;

            const li = html.find(`[data-combatant-id="${combatant.id}"]`);
            if (!li.length) continue;

            const targetActor = FFXIVEnmity.getHighestEnmityTarget(combatant.actor);
            if (targetActor) {
                li.find(".token-name").append(
                    `<small class="ffxiv-target-indicator"> → ${targetActor.name}</small>`
                );
            }
        }
    }
}
