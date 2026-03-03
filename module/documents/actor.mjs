/**
 * FFXIV TTRPG — Actor Document Customizado
 * Adiciona lógica de jogo: prepareData, applyDamage, LimitBreak
 */
export class FFXIVActor extends Actor {

    /** @override */
    prepareData() {
        super.prepareData();
        const sys = this.system;

        if (this.type === "adventurer") {
            this._prepareAdventurerData(sys);
        } else if (this.type === "enemy") {
            this._prepareEnemyData(sys);
        }
    }

    /**
     * Calcula valores derivados do Adventurer:
     * HP max = VIT × 10, MP max por job, Defense a partir de equipamentos
     */
    _prepareAdventurerData(sys) {
        const vit = sys.attributes?.vit?.value ?? 10;
        const mnd = sys.attributes?.mnd?.value ?? 10;
        const str = sys.attributes?.str?.value ?? 10;

        // HP máximo = VIT × 10
        if (!sys.derived) sys.derived = {};
        if (!sys.derived.hp) sys.derived.hp = { value: 20, max: 20 };
        sys.derived.hp.max = Math.max(1, vit * 10);

        // MP máximo: Healers e casters têm mais MP
        const job = sys.job?.name?.toLowerCase() ?? "";
        const mpByRole = {
            paladin: 5, warrior: 3, "dark knight": 5, darkknight: 5,
            "white mage": 8, whitemage: 8,
            scholar: 8, astrologian: 8,
            monk: 3, dragoon: 3, ninja: 4, samurai: 3,
            bard: 5, machinist: 4,
            "black mage": 10, blackmage: 10,
            summoner: 9,
        };
        if (!sys.derived.mp) sys.derived.mp = { value: 5, max: 5 };
        sys.derived.mp.max = mpByRole[job] ?? 5;

        // Defense base = STR / 5 (arredondado), mínimo 5
        if (!sys.derived.defense) sys.derived.defense = { value: 5 };
        sys.derived.defense.value = Math.max(5, Math.floor(str / 5) + 5);

        // Magic Defense base = MND / 5 + 5
        if (!sys.derived.magicDefense) sys.derived.magicDefense = { value: 5 };
        sys.derived.magicDefense.value = Math.max(5, Math.floor(mnd / 5) + 5);

        // Speed: padrão 3
        if (!sys.derived.speed) sys.derived.speed = { value: 3 };

        // Gauge do Job
        this._prepareJobGauge(sys, job);
    }

    /**
     * Configura o gauge visual baseado no job
     */
    _prepareJobGauge(sys, job) {
        if (!sys.gauge) sys.gauge = { current: 0, max: 0, label: "", type: "bar" };

        const gaugeConfig = {
            warrior: { max: 100, label: "Beast Gauge", type: "bar", color: "#e07820" },
            "dark knight": { max: 100, label: "Blood Gauge", type: "bar", color: "#8b0066" },
            darkknight: { max: 100, label: "Blood Gauge", type: "bar", color: "#8b0066" },
            monk: { max: 5, label: "Chakra", type: "spheres", color: "#ffd700" },
            ninja: { max: 100, label: "Ninki Gauge", type: "bar", color: "#2ecc71" },
            samurai: { max: 100, label: "Kenki Gauge", type: "bar", color: "#c0392b" },
            bard: { max: 100, label: "Soul Voice", type: "bar", color: "#3498db" },
            machinist: { max: 100, label: "Heat Gauge", type: "bar", color: "#f39c12" },
            "black mage": { max: 6, label: "Elemental", type: "element", color: "#2980b9" },
            blackmage: { max: 6, label: "Elemental", type: "element", color: "#2980b9" },
            summoner: { max: 100, label: "Aethercharge", type: "bar", color: "#9b59b6" },
            scholar: { max: 3, label: "Aetherflow", type: "spheres", color: "#27ae60" },
            astrologian: { max: 3, label: "Arcanum", type: "spheres", color: "#f1c40f" },
            "white mage": { max: 3, label: "Lily Gauge", type: "spheres", color: "#e74c3c" },
            whitemage: { max: 3, label: "Lily Gauge", type: "spheres", color: "#e74c3c" },
            paladin: { max: 0, label: "", type: "none", color: "" },
        };

        const cfg = gaugeConfig[job] ?? { max: 0, label: "", type: "none", color: "" };
        sys.gauge.max = cfg.max;
        sys.gauge.label = cfg.label;
        sys.gauge.type = cfg.type;
        sys.gauge.color = cfg.color;

        // Manter valor atual dentro do range
        if (sys.gauge.current > sys.gauge.max) sys.gauge.current = sys.gauge.max;
        if (sys.gauge.current < 0) sys.gauge.current = 0;
    }

    _prepareEnemyData(sys) {
        if (!sys.hp) sys.hp = { value: 10, max: 10 };
        if (!sys.defense) sys.defense = 5;
        if (!sys.magicDefense) sys.magicDefense = 5;
    }

    /* -------------------------------------------- */
    /*  Métodos de Jogo                              */
    /* -------------------------------------------- */

    /**
     * Aplica dano ao ator, considerando tipo de dano
     * @param {number} amount - quantidade de dano
     * @param {string} type - tipo de dano ("physical","magic","fire",...)
     * @returns {Promise<boolean>}
     */
    async applyDamage(amount, type = "physical") {
        let dmg = Math.max(0, amount);

        // Resistências raciais (baseado nas traits do ator)
        const race = this.system?.race?.name?.toLowerCase() ?? "";
        if (type === "fire" && (race === "hellsguard" || race === "hellsguard roegadyn")) {
            dmg = Math.max(0, dmg - 2);
        }
        if (type === "magic" && race === "dunesfolk lalafell") {
            dmg = Math.max(0, dmg - 1);
        }

        if (this.type === "adventurer") {
            const hp = this.system.derived?.hp ?? { value: 0, max: 1 };
            const newHp = Math.max(0, hp.value - dmg);
            await this.update({ "system.derived.hp.value": newHp });
        } else {
            const hp = this.system.hp ?? { value: 0, max: 1 };
            const newHp = Math.max(0, hp.value - dmg);
            await this.update({ "system.hp.value": newHp });
        }
        return true;
    }

    /**
     * Aplica cura ao ator
     * @param {number} amount - quantidade de cura
     */
    async applyHealing(amount) {
        const heal = Math.max(0, amount);
        if (this.type === "adventurer") {
            const hp = this.system.derived?.hp ?? { value: 0, max: 1 };
            const newHp = Math.min(hp.max, hp.value + heal);
            await this.update({ "system.derived.hp.value": newHp });
        } else {
            const hp = this.system.hp ?? { value: 0, max: 1 };
            const newHp = Math.min(hp.max, hp.value + heal);
            await this.update({ "system.hp.value": newHp });
        }
    }

    /**
     * Altera o Gauge do Job (Beast Gauge, Chakra, etc.)
     * @param {number} delta - valor a adicionar (positivo) ou remover (negativo)
     */
    async modifyGauge(delta) {
        const current = this.system.gauge?.current ?? 0;
        const max = this.system.gauge?.max ?? 0;
        if (max === 0) return;

        const newVal = Math.min(max, Math.max(0, current + delta));
        await this.update({ "system.gauge.current": newVal });
    }

    /**
     * Incrementa gauge de Limit Break da party (via world setting)
     * @param {number} amount - quanto incrementar (0–100)
     */
    static async gainLimitBreak(amount = 10) {
        if (!game.user.isGM && !game.settings.get("ffxivttrpg", "autoApplyDamage")) return;
        const current = game.settings.get("ffxivttrpg", "limitBreakValue") ?? 0;
        const newVal = Math.min(300, current + amount); // 300 = 3 barras × 100
        await game.settings.set("ffxivttrpg", "limitBreakValue", newVal);

        // Emitir socket para outros players atualizarem a UI
        if (game.socket) {
            game.socket.emit("system.ffxivttrpg", { type: "limitBreakUpdate", value: newVal });
        }
    }

    /**
     * Reseta ações de combate (chamado no início de cada turno)
     */
    async resetCombatActions() {
        await this.update({
            "system.actions.primary": true,
            "system.actions.secondary": true,
            "system.actions.instant": true,
            "system.actions.movement": true,
        });
    }
}
