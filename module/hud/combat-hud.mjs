/**
 * FFXIV TTRPG — Banner de Fase do Combate
 * App que exibe a fase atual no canvas, visível a todos os players
 */
export class FFXIVCombatHUD extends Application {

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "ffxiv-combat-hud",
            classes: ["ffxivttrpg", "combat-hud"],
            template: "systems/ffxivttrpg/templates/hud/phase-banner.hbs",
            popOut: false,
            resizable: false,
        });
    }

    static instance = null;

    static getOrCreate() {
        if (!FFXIVCombatHUD.instance) {
            FFXIVCombatHUD.instance = new FFXIVCombatHUD();
        }
        return FFXIVCombatHUD.instance;
    }

    getData() {
        const combat = game.combat;
        if (!combat?.active) return { active: false };

        // Determinar fase atual baseado na flag do combat
        const phase = combat.getFlag("ffxivttrpg", "currentPhase") ?? "adventurer";
        const round = combat.round ?? 1;

        const phaseData = {
            adventurer: { label: "⚔️ FASE DOS AVENTUREIROS", class: "phase-adventurer" },
            enemy: { label: "💀 FASE DOS INIMIGOS", class: "phase-enemy" },
            roundup: { label: "⏳ ROUND-UP PHASE", class: "phase-roundup" },
        };

        return {
            active: true,
            phase,
            round,
            ...phaseData[phase] ?? phaseData.adventurer,
        };
    }

    /**
     * Atualiza a fase exibida no banner
     * @param {string} phase - "adventurer" | "enemy" | "roundup"
     * @param {number} round - número do round
     */
    async setPhase(phase, round) {
        if (game.combat) {
            await game.combat.setFlag("ffxivttrpg", "currentPhase", phase);
        }
        this.render(true);

        // Auto-remover após 4 segundos e re-renderizar
        if (this._bannerTimeout) clearTimeout(this._bannerTimeout);
        this._bannerTimeout = setTimeout(() => {
            this.render();
        }, 4000);
    }
}
