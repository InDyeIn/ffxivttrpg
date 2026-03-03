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
     * Busca raça e classe (job) equipados para derivar estatísticas
     */
    _prepareAdventurerData(sys) {
        // Inicializa defaults se não existirem
        sys.derived = sys.derived || {};
        sys.attributes = sys.attributes || { str: { value: 0 }, dex: { value: 0 }, vit: { value: 0 }, int: { value: 0 }, mnd: { value: 0 } };

        let basePath = { str: 10, dex: 10, vit: 10, int: 10, mnd: 10 };
        let activeJob = null;
        let activeRace = null;

        // 1. Procurar por Items Ativos (Race e Class)
        for (let item of this.items) {
            if (item.type === "class") activeJob = item;
            if (item.type === "race") activeRace = item;
        }

        // 2. Aplicar bônus da Raça
        if (activeRace && activeRace.system.baseAttributeBonus) {
            basePath.str += activeRace.system.baseAttributeBonus.str || 0;
            basePath.dex += activeRace.system.baseAttributeBonus.dex || 0;
            basePath.vit += activeRace.system.baseAttributeBonus.vit || 0;
            basePath.int += activeRace.system.baseAttributeBonus.int || 0;
            basePath.mnd += activeRace.system.baseAttributeBonus.mnd || 0;
        }

        // 3. Mesclar com os pontos gastos pelo jogador na ficha
        sys.attributes.str.value = basePath.str + (sys.attributes.str.bonus || 0);
        sys.attributes.dex.value = basePath.dex + (sys.attributes.dex.bonus || 0);
        sys.attributes.vit.value = basePath.vit + (sys.attributes.vit.bonus || 0);
        sys.attributes.int.value = basePath.int + (sys.attributes.int.bonus || 0);
        sys.attributes.mnd.value = basePath.mnd + (sys.attributes.mnd.bonus || 0);

        // 4. Calcular Nível (Level) derivado da Classe ativa
        sys.profile.level = activeJob ? activeJob.system.levels : 1;
        sys.profile.job = activeJob ? activeJob.name : "Adventurer";
        sys.profile.race = activeRace ? activeRace.name : "Unknown";

        // 5. HP máximo = VIT × 10
        if (!sys.derived.hp) sys.derived.hp = { value: 20, max: 20 };
        sys.derived.hp.max = Math.max(1, sys.attributes.vit.value * 10);

        // 6. MP máximo: 5 por padrão, modificadores podem mudar via classe no futuro
        if (!sys.derived.mp) sys.derived.mp = { value: 5, max: 5 };
        const role = activeJob ? activeJob.system.role : "melee";
        if (role === "healer") sys.derived.mp.max = 8;
        else if (role === "magical") sys.derived.mp.max = 10;
        else sys.derived.mp.max = 5;

        // 7. Defense base = STR / 5 (arredondado), mínimo 5
        if (!sys.derived.defense) sys.derived.defense = { value: 5 };
        sys.derived.defense.value = Math.max(5, Math.floor(sys.attributes.str.value / 5) + 5);

        // 8. Magic Defense base = MND / 5 + 5
        if (!sys.derived.magicDefense) sys.derived.magicDefense = { value: 5 };
        sys.derived.magicDefense.value = Math.max(5, Math.floor(sys.attributes.mnd.value / 5) + 5);

        // 9. Speed: padrão 3
        if (!sys.derived.speed) sys.derived.speed = { value: 3 };

        // 10. Gauge do Job
        const jobConfigName = activeJob ? activeJob.name.toLowerCase() : "";
        this._prepareJobGauge(sys, jobConfigName);
    }

    /**
     * Configura o gauge visual baseado no job (Nomes normalizados)
     */
    _prepareJobGauge(sys, job) {
        if (!sys.gauge) sys.gauge = { current: 0, max: 0, label: "", type: "bar" };

        const gaugeConfig = {
            warrior: { max: 100, label: "Beast Gauge", type: "bar", color: "#e07820" },
            "dark knight": { max: 100, label: "Blood Gauge", type: "bar", color: "#8b0066" },
            monk: { max: 5, label: "Chakra", type: "spheres", color: "#ffd700" },
            ninja: { max: 100, label: "Ninki Gauge", type: "bar", color: "#2ecc71" },
            samurai: { max: 100, label: "Kenki Gauge", type: "bar", color: "#c0392b" },
            bard: { max: 100, label: "Soul Voice", type: "bar", color: "#3498db" },
            machinist: { max: 100, label: "Heat Gauge", type: "bar", color: "#f39c12" },
            "black mage": { max: 6, label: "Elemental", type: "element", color: "#2980b9" },
            summoner: { max: 100, label: "Aethercharge", type: "bar", color: "#9b59b6" },
            scholar: { max: 3, label: "Aetherflow", type: "spheres", color: "#27ae60" },
            astrologian: { max: 3, label: "Arcanum", type: "spheres", color: "#f1c40f" },
            "white mage": { max: 3, label: "Lily Gauge", type: "spheres", color: "#e74c3c" }
        };

        const cfg = gaugeConfig[job] ?? { max: 0, label: "", type: "none", color: "" };
        sys.gauge.max = cfg.max;
        sys.gauge.label = cfg.label;
        sys.gauge.type = cfg.type;
        sys.gauge.color = cfg.color;

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

    /* -------------------------------------------- */
    /*  Database Hooks (Item Validation)             */
    /* -------------------------------------------- */

    /** @override */
    _preCreateEmbeddedDocuments(embeddedName, result, options, userId) {
        super._preCreateEmbeddedDocuments(embeddedName, result, options, userId);

        if (embeddedName !== "Item" || this.type !== "adventurer") return;

        // Limita a 1 Class e 1 Race por Actor (DnD5e logic block)
        let hasNewClass = false;
        let hasNewRace = false;

        for (let itemData of result) {
            if (itemData.type === "class") hasNewClass = true;
            if (itemData.type === "race") hasNewRace = true;
        }

        if (hasNewClass) {
            const existingClasses = this.items.filter(i => i.type === "class").map(i => i.id);
            if (existingClasses.length > 0) {
                // Deletar os antigos sincronicamente não rola bem no preCreate, 
                // então delegamos para o onCreate/onDrop, mas registramos aqui.
                options.replaceClassIds = existingClasses;
            }
        }

        if (hasNewRace) {
            const existingRaces = this.items.filter(i => i.type === "race").map(i => i.id);
            if (existingRaces.length > 0) {
                options.replaceRaceIds = existingRaces;
            }
        }
    }

    /** @override */
    _onCreateEmbeddedDocuments(embeddedName, documents, result, options, userId) {
        super._onCreateEmbeddedDocuments(embeddedName, documents, result, options, userId);
        if (userId !== game.user.id || embeddedName !== "Item") return;

        // Cleanup Classes/Races antigas ao dropar uma nova
        if (options.replaceClassIds?.length) {
            this.deleteEmbeddedDocuments("Item", options.replaceClassIds).then(() => {
                ui.notifications.info("Job Substituído.");
            });
        }
        if (options.replaceRaceIds?.length) {
            this.deleteEmbeddedDocuments("Item", options.replaceRaceIds).then(() => {
                ui.notifications.info("Raça Substituída.");
            });
        }
    }
}
