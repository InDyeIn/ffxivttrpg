/**
 * FFXIV TTRPG — Dados completos das habilidades dos 13 Jobs
 * Fonte: FFXIV-TTRPG-Habilidades-Completas.md
 * Formato compatível com o template.json do sistema
 */
export const ABILITIES_DATA = {

    // ─────────────────────────────────────────────
    //  🛡️ PALADIN
    // ─────────────────────────────────────────────
    paladin: [
        {
            name: "Fast Blade", job: "paladin", level: 1, actionType: "primary", img: "icons/weapons/swords/sword-guard-gold.webp",
            damage: { formula: "1d6", type: "physical" }, cost: { mp: 0 }, range: "melee", target: "single", combo: { isOpener: true, enables: "riot_blade" }, description: "Ataque básico do Paladin. Combo Opener — habilita Riot Blade."
        },
        {
            name: "Shield Bash", job: "paladin", level: 2, actionType: "primary", img: "icons/weapons/shields/shield-round-boss-gold.webp",
            damage: { formula: "1d4", type: "physical" }, cost: { mp: 0 }, range: "melee", target: "single", description: "Dano baixo + aplica Interrupt (cancela 1 habilidade inimiga)."
        },
        {
            name: "Riot Blade", job: "paladin", level: 4, actionType: "primary", img: "icons/weapons/swords/sword-guard-gold.webp",
            damage: { formula: "2d6", type: "physical" }, cost: { mp: 0 }, range: "melee", target: "single", combo: { requires: "Fast Blade", restoreMP: 1 }, description: "Req. combo Fast Blade. Restaura 1 MP em combo."
        },
        {
            name: "Shield Oath", job: "paladin", level: 1, actionType: "secondary", img: "icons/weapons/shields/shield-heater-silver-sword.webp",
            cost: { mp: 0 }, range: "self", target: "self", description: "+2 Defense enquanto ativo. Penalidade: –1d6 em habilidades físicas. Desativa Sword Oath."
        },
        {
            name: "Holy Spirit", job: "paladin", level: 5, actionType: "primary", img: "icons/magic/holy/golden-cross-glow.webp",
            damage: { formula: "2d6", type: "holy" }, cost: { mp: 1 }, range: "long", target: "single", description: "Projétil de energia sagrada. Dano mágico Holy (2d6 + MND)."
        },
        {
            name: "Provoke", job: "paladin", level: 5, actionType: "secondary", img: "icons/skills/social/intimidation-eye.webp",
            cost: { mp: 0 }, range: "medium", target: "single", description: "Maximiza Enmity do Paladin no alvo imediatamente."
        },
        {
            name: "Bulwark", job: "paladin", level: 8, actionType: "secondary", img: "icons/weapons/shields/shield-heater-steel.webp",
            cost: { mp: 0 }, range: "self", target: "self", description: "O próximo ataque que acertar o Paladin causa metade do dano."
        },
        {
            name: "Royal Authority", job: "paladin", level: 10, actionType: "primary", img: "icons/weapons/swords/sword-broad-gold.webp",
            damage: { formula: "3d6", type: "physical" }, cost: { mp: 0 }, range: "melee", target: "single", combo: { requires: "Riot Blade" }, description: "Req. combo Riot Blade. Aplica Sword Oath por 2 turnos (+1d6 em físicas)."
        },
        {
            name: "Circle of Scorn", job: "paladin", level: 15, actionType: "primary", img: "icons/magic/fire/ring-burst-orange.webp",
            damage: { formula: "1d6", type: "physical" }, cost: { mp: 0 }, range: "self", target: "aoe", aoeShape: "circle", aoeSize: 2, description: "AOE circular raio 2. Aplica Burns (DoT 1d4 por 2 turnos)."
        },
        {
            name: "Cover", job: "paladin", level: 15, actionType: "instant", img: "icons/magic/defensive/shield-barrier-reflect-blue.webp",
            cost: { mp: 0 }, range: "adjacent", target: "ally", description: "Redireciona ataque de aliado adjacente para si mesmo."
        },
        {
            name: "Shirk", job: "paladin", level: 20, actionType: "secondary", img: "icons/skills/movement/feet-winged-boots-glowing-yellow.webp",
            cost: { mp: 0 }, range: "medium", target: "ally", description: "Transfere 25% do Enmity atual para o aliado alvo."
        },
        {
            name: "Atonement", job: "paladin", level: 20, actionType: "primary", img: "icons/weapons/swords/sword-guard-gold.webp",
            damage: { formula: "3d6+2", type: "physical" }, cost: { mp: 0 }, range: "melee", target: "single", description: "Dano alto. Disponível apenas com Sword Oath ativo."
        },
        {
            name: "Clemency", job: "paladin", level: 25, actionType: "primary", img: "icons/magic/holy/prayer-hands-glow-white.webp",
            healing: { formula: "3d6" }, cost: { mp: 2 }, range: "short", target: "ally", description: "Cura (3d6 + MND). Emergência de cura do Paladin."
        },
        {
            name: "Divine Veil", job: "paladin", level: 30, actionType: "secondary", img: "icons/magic/defensive/shield-barrier-glowing-gold.webp",
            cost: { mp: 1 }, range: "self", target: "self", description: "Ao receber cura próximos 2t, aliados em 3 tiles ganham Shield de 1d6."
        },
        {
            name: "Confiteor", job: "paladin", level: 30, actionType: "primary", img: "icons/magic/holy/projectile-cross-light.webp",
            damage: { formula: "3d6", type: "holy" }, cost: { mp: 2 }, range: "self", target: "aoe", aoeShape: "cone", aoeSize: 3, description: "Danificação Holy em cone de 3 tiles. Longe: 2d6."
        },
    ],

    // ─────────────────────────────────────────────
    //  🪓 WARRIOR
    // ─────────────────────────────────────────────
    warrior: [
        {
            name: "Heavy Swing", job: "warrior", level: 1, actionType: "primary", img: "icons/weapons/axes/axe-broad.webp",
            damage: { formula: "1d6", type: "physical" }, cost: { mp: 0 }, gaugeGain: 5, range: "melee", target: "single", combo: { isOpener: true, enables: "maim" }, description: "Combo Opener → habilita Maim. +5 Beast Gauge."
        },
        {
            name: "Tomahawk", job: "warrior", level: 5, actionType: "primary", img: "icons/weapons/axes/axe-broad.webp",
            damage: { formula: "1d6", type: "physical" }, cost: { mp: 0 }, range: "long", target: "single", description: "Ataque à distância. Alta geração de Enmity."
        },
        {
            name: "Overpower", job: "warrior", level: 5, actionType: "primary", img: "icons/weapons/axes/axe-broad.webp",
            damage: { formula: "1d6", type: "physical" }, cost: { mp: 0 }, range: "self", target: "aoe", aoeShape: "cone", aoeSize: 2, description: "AOE cone 2 tiles. Gera Enmity em todos os alvos. +3 BG/inimigo."
        },
        {
            name: "Provoke", job: "warrior", level: 5, actionType: "secondary", img: "icons/skills/social/intimidation-eye.webp",
            cost: { mp: 0 }, range: "medium", target: "single", description: "Maximiza Enmity imediatamente."
        },
        {
            name: "Maim", job: "warrior", level: 4, actionType: "primary", img: "icons/weapons/axes/axe-broad.webp",
            damage: { formula: "2d6", type: "physical" }, cost: { mp: 0 }, gaugeGain: 10, range: "melee", target: "single", combo: { requires: "Heavy Swing" }, description: "Req. combo Heavy Swing. Em combo: –1 Defense no alvo. +10 BG."
        },
        {
            name: "Thrill of Battle", job: "warrior", level: 8, actionType: "secondary", img: "icons/magic/life/heart-glowing-red.webp",
            cost: { mp: 0 }, range: "self", target: "self", description: "+20% Max HP por 1 turno. Restaura esse HP ganho."
        },
        {
            name: "Vengeance", job: "warrior", level: 12, actionType: "secondary", img: "icons/magic/fire/flame-burning-shield.webp",
            cost: { mp: 1 }, range: "self", target: "self", description: "Por 2 turnos: ao receber dano físico, atacante recebe 1d4 refletido."
        },
        {
            name: "Storm's Eye", job: "warrior", level: 10, actionType: "primary", img: "icons/weapons/axes/axe-broad.webp",
            damage: { formula: "2d6+2", type: "physical" }, cost: { mp: 0 }, gaugeGain: 20, range: "melee", target: "single", combo: { requires: "Maim" }, description: "Req. combo Maim. Em combo: Warrior ganha +1d6 dano em físicas por 3t."
        },
        {
            name: "Storm's Path", job: "warrior", level: 10, actionType: "primary", img: "icons/weapons/axes/axe-broad.webp",
            damage: { formula: "2d6", type: "physical" }, cost: { mp: 0 }, gaugeGain: 20, range: "melee", target: "single", combo: { requires: "Maim" }, description: "Req. combo Maim. Alternativa: recupera HP = metade do dano causado."
        },
        {
            name: "Raw Intuition", job: "warrior", level: 15, actionType: "instant", img: "icons/magic/defensive/shield-barrier-reflect.webp",
            cost: { mp: 0 }, range: "self", target: "self", description: "Após receber dano físico: reduz próximo dano físico à metade."
        },
        {
            name: "Upheaval", job: "warrior", level: 15, actionType: "secondary", img: "icons/weapons/axes/axe-broad.webp",
            damage: { formula: "2d6", type: "physical" }, cost: { gauge: 20 }, range: "melee", target: "single", description: "Dano (2d6+STR). Gasta 20 Beast Gauge."
        },
        {
            name: "Fell Cleave", job: "warrior", level: 20, actionType: "primary", img: "icons/weapons/axes/axe-broad.webp",
            damage: { formula: "4d6", type: "physical" }, cost: { gauge: 50 }, range: "melee", target: "single", description: "Dano massivo (4d6+STR). Gasta 50 Beast Gauge."
        },
        {
            name: "Inner Release", job: "warrior", level: 20, actionType: "secondary", img: "icons/magic/fire/phoenix-wings-gift.webp",
            cost: { mp: 0 }, range: "self", target: "self", description: "Por 2t: habilidades grátis de BG; Fell Cleave/Decimate causam Crit automático."
        },
        {
            name: "Shirk", job: "warrior", level: 20, actionType: "secondary", img: "icons/skills/movement/feet-winged-boots-glowing-yellow.webp",
            cost: { mp: 0 }, range: "medium", target: "ally", description: "Transfere 25% Enmity para aliado."
        },
        {
            name: "Nascent Flash", job: "warrior", level: 18, actionType: "instant", img: "icons/magic/life/heart-flame-red.webp",
            cost: { mp: 1 }, range: "adjacent", target: "ally", description: "Warrior e aliado curam = 50% do próximo dano causado pelo Warrior."
        },
        {
            name: "Decimate", job: "warrior", level: 25, actionType: "primary", img: "icons/weapons/axes/axe-broad.webp",
            damage: { formula: "3d6", type: "physical" }, cost: { gauge: 50 }, range: "self", target: "aoe", aoeShape: "circle", aoeSize: 2, description: "AOE raio 2 (3d6+STR). Gasta 50 Beast Gauge."
        },
        {
            name: "Shake It Off", job: "warrior", level: 25, actionType: "secondary", img: "icons/magic/defensive/shield-barrier-glowing.webp",
            cost: { mp: 1 }, range: "self", target: "aoe", aoeShape: "circle", aoeSize: 3, description: "Todos aliados em 3 tiles: Shield de 1d6 por 1 turno."
        },
        {
            name: "Inner Chaos", job: "warrior", level: 30, actionType: "primary", img: "icons/magic/fire/explosion-fireball-large.webp",
            damage: { formula: "6d6", type: "physical" }, cost: { gauge: 100 }, range: "melee", target: "single", description: "Dano imenso (6d6+STR). Crit automático se Beast Gauge estava em 100."
        },
    ],

    // ─────────────────────────────────────────────
    //  🌑 DARK KNIGHT
    // ─────────────────────────────────────────────
    darkknight: [
        {
            name: "Hard Slash", job: "darkknight", level: 1, actionType: "primary", img: "icons/weapons/swords/sword-cross-silver.webp",
            damage: { formula: "1d6", type: "physical" }, cost: { mp: 0 }, range: "melee", target: "single", combo: { isOpener: true, enables: "syphon_strike" }, description: "Combo Opener → habilita Syphon Strike."
        },
        {
            name: "Darkside", job: "darkknight", level: 1, actionType: "secondary", img: "icons/magic/unholy/beam-impact-purple.webp",
            cost: { mp: 0 }, range: "self", target: "self", description: "Ativa modo Darkside. Drena 1 MP/turno. +1d6 em todos os danos enquanto ativo."
        },
        {
            name: "Syphon Strike", job: "darkknight", level: 4, actionType: "primary", img: "icons/weapons/swords/sword-cross-silver.webp",
            damage: { formula: "2d6", type: "physical" }, cost: { mp: 0 }, range: "melee", target: "single", combo: { requires: "Hard Slash", restoreMP: 1 }, description: "Req. combo Hard Slash. Restaura 1 MP em combo."
        },
        {
            name: "Dark Mind", job: "darkknight", level: 8, actionType: "instant", img: "icons/magic/dark/orb-shadowy.webp",
            cost: { mp: 0 }, range: "self", target: "self", description: "Após receber dano mágico: reduz próximo dano mágico em 50%."
        },
        {
            name: "Plunge", job: "darkknight", level: 10, actionType: "secondary", img: "icons/skills/movement/feet-winged-boots-glowing-yellow.webp",
            damage: { formula: "2d6", type: "physical" }, cost: { mp: 0 }, range: "medium", target: "single", description: "Move até 4 tiles em linha reta e causa dano. 2 cargas."
        },
        {
            name: "Souleater", job: "darkknight", level: 10, actionType: "primary", img: "icons/weapons/swords/sword-cross-silver.webp",
            damage: { formula: "2d6+2", type: "physical" }, cost: { mp: 0 }, gaugeGain: 20, range: "melee", target: "single", combo: { requires: "Syphon Strike" }, description: "Req. combo. Lifesteal total. +20 Blood Gauge."
        },
        {
            name: "Salted Earth", job: "darkknight", level: 15, actionType: "primary", img: "icons/magic/unholy/beam-impact-purple.webp",
            damage: { formula: "1d6", type: "dark" }, cost: { mp: 2 }, range: "short", target: "aoe", aoeShape: "circle", aoeSize: 2, description: "Zona de 2x2. DoT Dark 1d6 por 3 turnos no Round-Up."
        },
        {
            name: "The Blackest Night", job: "darkknight", level: 15, actionType: "instant", img: "icons/magic/defensive/shield-barrier-glowing-purple.webp",
            cost: { mp: 1 }, range: "short", target: "ally", shield: { formula: "2d6" }, description: "Escudo de 2d6. Se destruído completamente: restaura 2 MP."
        },
        {
            name: "Bloodspiller", job: "darkknight", level: 20, actionType: "primary", img: "icons/weapons/swords/sword-cross-silver.webp",
            damage: { formula: "4d6", type: "physical" }, cost: { gauge: 50 }, range: "melee", target: "single", description: "Dano alto (4d6+STR). Gasta 50 Blood Gauge."
        },
        {
            name: "Reprisal", job: "darkknight", level: 20, actionType: "instant", img: "icons/magic/symbols/rune-ringed-purple.webp",
            cost: { mp: 0 }, range: "short", target: "single", description: "Aplica Reprisal: inimigo causa –10% dano por 1 turno."
        },
        {
            name: "Quietus", job: "darkknight", level: 25, actionType: "primary", img: "icons/weapons/swords/sword-cross-silver.webp",
            damage: { formula: "2d6", type: "physical" }, cost: { gauge: 50 }, range: "self", target: "aoe", aoeShape: "circle", aoeSize: 2, description: "AOE 2 tiles. Recupera HP =nº de inimigos atingidos."
        },
        {
            name: "Edge of Shadow", job: "darkknight", level: 25, actionType: "primary", img: "icons/magic/unholy/beam-impact-purple.webp",
            damage: { formula: "3d6", type: "dark" }, cost: { mp: 2 }, gaugeGain: 10, range: "medium", target: "single", description: "Dano Shadow (3d6+STR). Só com Darkside ativo. +10 BG."
        },
        {
            name: "Living Shadow", job: "darkknight", level: 30, actionType: "secondary", img: "icons/creatures/magical/shadow-creature.webp",
            damage: { formula: "2d6", type: "dark" }, cost: { gauge: 50, mp: 3 }, range: "self", target: "single", description: "Invoca sombra por 3 turnos. Ela ataca o maior Enmity por 2d6/turno."
        },
        {
            name: "Provoke", job: "darkknight", level: 5, actionType: "secondary", img: "icons/skills/social/intimidation-eye.webp",
            cost: { mp: 0 }, range: "medium", target: "single", description: "Maximiza Enmity imediatamente."
        },
        {
            name: "Shirk", job: "darkknight", level: 20, actionType: "secondary", img: "icons/skills/movement/feet-winged-boots-glowing-yellow.webp",
            cost: { mp: 0 }, range: "medium", target: "ally", description: "Transfere 25% Enmity para aliado."
        },
    ],

    // ─────────────────────────────────────────────
    //  💚 WHITE MAGE
    // ─────────────────────────────────────────────
    whitemage: [
        {
            name: "Cure", job: "whitemage", level: 1, actionType: "primary", img: "icons/magic/life/heart-cross-strong-green.webp",
            healing: { formula: "2d6" }, cost: { mp: 1 }, range: "short", target: "ally", gaugeGain: 1, description: "Cura (2d6+MND). Ganha +1 Lily."
        },
        {
            name: "Stone", job: "whitemage", level: 1, actionType: "primary", img: "icons/magic/earth/projectile-stone.webp",
            damage: { formula: "2d6", type: "earth" }, cost: { mp: 1 }, range: "long", target: "single", description: "Projétil de pedra — dano Earth (2d6+MND)."
        },
        {
            name: "Regen", job: "whitemage", level: 5, actionType: "secondary", img: "icons/magic/life/cross-area-circle-green.webp",
            cost: { mp: 1 }, range: "short", target: "ally", description: "Aplica Regen HOT: 1d6 HP por Round-Up por 3 turnos."
        },
        {
            name: "Cure II", job: "whitemage", level: 5, actionType: "primary", img: "icons/magic/life/heart-cross-strong-green.webp",
            healing: { formula: "3d6+3" }, cost: { mp: 2 }, range: "short", target: "ally", gaugeGain: 1, description: "Cura forte (3d6+3+MND). +1 Lily."
        },
        {
            name: "Holy Spirit", job: "whitemage", level: 5, actionType: "primary", img: "icons/magic/holy/golden-cross-glow.webp",
            damage: { formula: "2d6", type: "holy" }, cost: { mp: 1 }, range: "long", target: "single", description: "Dano Holy (2d6+MND)."
        },
        {
            name: "Medica", job: "whitemage", level: 8, actionType: "primary", img: "icons/magic/life/cross-area-circle-green.webp",
            healing: { formula: "1d6+2" }, cost: { mp: 2 }, range: "self", target: "aoe", aoeShape: "circle", aoeSize: 3, description: "Cura AOE (1d6+2+MND) em todos aliados em 3 tiles."
        },
        {
            name: "Raise", job: "whitemage", level: 10, actionType: "primary", img: "icons/magic/life/cross-explosion-green.webp",
            cost: { mp: 3 }, range: "short", target: "ally", description: "Revive aliado K.O. com 25% HP. Não age até próximo turno."
        },
        {
            name: "Asylum", job: "whitemage", level: 12, actionType: "secondary", img: "icons/magic/holy/filled-circle-light.webp",
            cost: { mp: 2 }, range: "medium", target: "aoe", aoeShape: "circle", aoeSize: 2, description: "Zona sagrada. Aliados dentro: +1d4+MND de cura por Round-Up (3 turnos)."
        },
        {
            name: "Medica II", job: "whitemage", level: 15, actionType: "primary", img: "icons/magic/life/cross-area-circle-green.webp",
            healing: { formula: "1d6" }, cost: { mp: 3 }, range: "self", target: "aoe", aoeShape: "circle", aoeSize: 3, description: "Cura (1d6+MND) AOE + Regen (1d4 por 3t) em todos aliados 3 tiles."
        },
        {
            name: "Afflatus Solace", job: "whitemage", level: 15, actionType: "primary", img: "icons/magic/life/heart-cross-strong-green.webp",
            healing: { formula: "4d6" }, cost: { gauge: 1 }, range: "short", target: "ally", description: "Cura poderosa (4d6+MND). Sem MP. Gasta 1 Lily. +1 Blood Lily."
        },
        {
            name: "Afflatus Rapture", job: "whitemage", level: 20, actionType: "primary", img: "icons/magic/life/cross-area-circle-green.webp",
            healing: { formula: "2d6" }, cost: { gauge: 1 }, range: "self", target: "aoe", aoeShape: "circle", aoeSize: 3, description: "Cura AOE (2d6+MND). Sem MP. Gasta 1 Lily. +1 Blood Lily."
        },
        {
            name: "Glare", job: "whitemage", level: 20, actionType: "primary", img: "icons/magic/light/beam-yellow-light.webp",
            damage: { formula: "3d6", type: "unaspected" }, cost: { mp: 1 }, range: "long", target: "single", description: "Substitui Stone. Dano Unaspected (3d6+MND)."
        },
        {
            name: "Presence of Mind", job: "whitemage", level: 20, actionType: "secondary", img: "icons/magic/light/light-ray-crystal.webp",
            cost: { mp: 1 }, range: "self", target: "self", description: "Por 2t: +1 Primary Action extra de cura/dano por turno."
        },
        {
            name: "Assize", job: "whitemage", level: 15, actionType: "primary", img: "icons/magic/holy/prayer-hands-glow-white.webp",
            damage: { formula: "2d6", type: "holy" }, healing: { formula: "2d6" }, cost: { mp: 0 }, range: "self", target: "aoe", aoeShape: "circle", aoeSize: 3, description: "Dano Holy nos inimigos + Cura nos aliados (2d6 cada). Restaura 2 MP."
        },
        {
            name: "Afflatus Misery", job: "whitemage", level: 25, actionType: "primary", img: "icons/magic/unholy/explosion-fire-purple.webp",
            damage: { formula: "6d6", type: "unaspected" }, cost: { gauge: 3 }, range: "long", target: "single", description: "Dano imenso (6d6+MND) + 2d6 splash. Gasta 3 Blood Lilies."
        },
        {
            name: "Plenary Indulgence", job: "whitemage", level: 25, actionType: "secondary", img: "icons/magic/holy/prayer-hands-glow-white.webp",
            cost: { mp: 1 }, range: "self", target: "aoe", aoeShape: "circle", aoeSize: 3, description: "Por 2t: próxima Lily (Solace/Rapture) também cura aliados em 3 tiles."
        },
    ],

    // ─────────────────────────────────────────────
    //  📗 SCHOLAR
    // ─────────────────────────────────────────────
    scholar: [
        {
            name: "Adloquium", job: "scholar", level: 1, actionType: "primary", img: "icons/magic/defensive/shield-barrier-reflect-blue.webp",
            healing: { formula: "2d6" }, shield: { formula: "2d6" }, cost: { mp: 2 }, range: "short", target: "ally", description: "Cura (2d6+MND) + Galvanize Shield (absorve 2d6 dano)."
        },
        {
            name: "Aetherflow", job: "scholar", level: 10, actionType: "secondary", img: "icons/magic/water/splash-pulsing-teal.webp",
            cost: { mp: 0 }, range: "self", target: "self", description: "Recupera 3 cargas de Aetherflow + restaura 1 MP."
        },
        {
            name: "Succor", job: "scholar", level: 5, actionType: "primary", img: "icons/magic/defensive/shield-barrier-reflect-blue.webp",
            healing: { formula: "1d6" }, shield: { formula: "1d6" }, cost: { mp: 2 }, range: "self", target: "aoe", aoeShape: "circle", aoeSize: 3, description: "Cura AOE (1d6+MND) + Catalyze Shield (1d6) em todos aliados 3 tiles."
        },
        {
            name: "Lustrate", job: "scholar", level: 10, actionType: "instant", img: "icons/magic/life/heart-cross-strong-green.webp",
            healing: { formula: "3d6" }, cost: { gauge: 1 }, range: "short", target: "ally", description: "Cura de emergência (3d6+MND). Gasta 1 Aetherflow."
        },
        {
            name: "Sacred Soil", job: "scholar", level: 15, actionType: "secondary", img: "icons/magic/water/splash-pulsing-teal.webp",
            cost: { gauge: 1 }, range: "medium", target: "aoe", aoeShape: "circle", aoeSize: 2, description: "Zona 2x2. Aliados dentro: cura 1d4 + –10% dano por 3 turnos. Gasta 1 Aetherflow."
        },
        {
            name: "Indomitability", job: "scholar", level: 20, actionType: "instant", img: "icons/magic/life/cross-area-circle-green.webp",
            healing: { formula: "2d6" }, cost: { gauge: 1 }, range: "self", target: "aoe", aoeShape: "circle", aoeSize: 3, description: "Cura imediata AOE (2d6+MND). Gasta 1 Aetherflow."
        },
        {
            name: "Deployment Tactics", job: "scholar", level: 20, actionType: "instant", img: "icons/magic/defensive/shield-barrier-reflect-blue.webp",
            cost: { mp: 1 }, range: "short", target: "ally", description: "Espalha Galvanize do alvo para todos aliados em 2 tiles. Requer Galvanize ativo."
        },
        {
            name: "Energy Drain", job: "scholar", level: 25, actionType: "primary", img: "icons/magic/unholy/beam-impact-purple.webp",
            damage: { formula: "2d6", type: "unaspected" }, cost: { gauge: 1 }, range: "long", target: "single", description: "Dano (2d6+MND). Restaura 1 MP. Gasta 1 Aetherflow."
        },
        {
            name: "Summon Eos", job: "scholar", level: 1, actionType: "secondary", img: "icons/creatures/magical/fairy-winged-small.webp",
            cost: { mp: 0 }, range: "self", target: "self", description: "Invoca Eos. No Round-Up: cura aliado <50% HP em 3 tiles por 1d6+MND."
        },
        {
            name: "Fey Illumination", job: "scholar", level: 15, actionType: "instant", img: "icons/creatures/magical/fairy-winged-small.webp",
            cost: { mp: 0 }, range: "self", target: "aoe", description: "Faerie irradia luz: todos aliados 3 tiles +2 Magic Defense por 1 turno."
        },
        {
            name: "Dissipation", job: "scholar", level: 25, actionType: "secondary", img: "icons/magic/water/splash-pulsing-teal.webp",
            cost: { mp: 0 }, range: "self", target: "self", description: "Absorve Faerie: +3 Aetherflow + MND+2 por 3t. Faerie indisponível por 3t."
        },
        {
            name: "Expedient", job: "scholar", level: 30, actionType: "secondary", img: "icons/magic/movement/trail-streak-blue.webp",
            cost: { mp: 2 }, range: "self", target: "aoe", aoeShape: "circle", aoeSize: 3, description: "Por 2t, aliados 3 tiles: +1 speed e –15% dano recebido."
        },
        {
            name: "Raise", job: "scholar", level: 10, actionType: "primary", img: "icons/magic/life/cross-explosion-green.webp",
            cost: { mp: 3 }, range: "short", target: "ally", description: "Revive aliado K.O. com 25% HP."
        },
    ],

    // ─────────────────────────────────────────────
    //  ⭐ ASTROLOGIAN
    // ─────────────────────────────────────────────
    astrologian: [
        {
            name: "Benefic", job: "astrologian", level: 1, actionType: "primary", img: "icons/magic/holy/golden-cross-glow.webp",
            healing: { formula: "2d6" }, cost: { mp: 1 }, range: "short", target: "ally", description: "Cura (2d6+MND). Crit → aplica Harmony (próximo Benefic II gratuito)."
        },
        {
            name: "Benefic II", job: "astrologian", level: 8, actionType: "primary", img: "icons/magic/holy/golden-cross-glow.webp",
            healing: { formula: "3d6+3" }, cost: { mp: 2 }, range: "short", target: "ally", description: "Cura forte (3d6+3+MND). Se Harmony ativo: custo 0 MP."
        },
        {
            name: "Helios", job: "astrologian", level: 5, actionType: "primary", img: "icons/magic/holy/filled-circle-light.webp",
            healing: { formula: "1d6+2" }, cost: { mp: 2 }, range: "self", target: "aoe", aoeShape: "circle", aoeSize: 3, description: "Cura AOE (1d6+2+MND) em todos aliados 3 tiles."
        },
        {
            name: "Draw", job: "astrologian", level: 1, actionType: "secondary", img: "icons/equipment/treasure/cards-tarot-suits.webp",
            cost: { mp: 0 }, range: "self", target: "self", description: "Compra 1 carta aleatória do baralho. 2 cargas."
        },
        {
            name: "Play", job: "astrologian", level: 1, actionType: "secondary", img: "icons/equipment/treasure/cards-tarot-suits.webp",
            cost: { mp: 0 }, range: "short", target: "ally", description: "Aplica efeito da carta em mão no aliado. Consumida ao usar."
        },
        {
            name: "Essential Dignity", job: "astrologian", level: 10, actionType: "instant", img: "icons/magic/life/heart-cross-strong-green.webp",
            healing: { formula: "1d6" }, cost: { mp: 1 }, range: "short", target: "ally", description: "Cura (1d6+MND). HP<50%: x2. HP<25%: x3."
        },
        {
            name: "Aspected Helios", job: "astrologian", level: 15, actionType: "primary", img: "icons/magic/holy/filled-circle-light.webp",
            healing: { formula: "1d6" }, cost: { mp: 3 }, range: "self", target: "aoe", aoeShape: "circle", aoeSize: 3, description: "Cura (1d6+MND) AOE + Regen (1d4 por 3t) em todos aliados."
        },
        {
            name: "Earthly Star", job: "astrologian", level: 20, actionType: "secondary", img: "icons/magic/holy/golden-cross-glow.webp",
            cost: { mp: 2 }, range: "medium", target: "aoe", aoeShape: "circle", aoeSize: 2, description: "Star 2x2: aliados curam 1d4/Round-Up 2t. Detonation: cura 3d6 aliados + 2d6 inimigos."
        },
        {
            name: "Divination", job: "astrologian", level: 25, actionType: "secondary", img: "icons/equipment/treasure/cards-tarot-suits.webp",
            cost: { mp: 2 }, range: "self", target: "aoe", aoeShape: "circle", aoeSize: 4, description: "Todos aliados 4 tiles: +1d4 dano em todos ataques por 2 turnos."
        },
        {
            name: "Celestial Intersection", job: "astrologian", level: 25, actionType: "secondary", img: "icons/magic/defensive/shield-barrier-reflect-blue.webp",
            healing: { formula: "1d6" }, shield: { formula: "1d6" }, cost: { mp: 0 }, range: "short", target: "ally", description: "Cura (1d6+MND) + Shield (1d6). 2 cargas."
        },
        {
            name: "Raise", job: "astrologian", level: 10, actionType: "primary", img: "icons/magic/life/cross-explosion-green.webp",
            cost: { mp: 3 }, range: "short", target: "ally", description: "Revive aliado K.O. com 25% HP."
        },
    ],

    // ─────────────────────────────────────────────
    //  🥋 MONK
    // ─────────────────────────────────────────────
    monk: [
        {
            name: "Bootshine", job: "monk", level: 1, actionType: "primary", img: "icons/skills/melee/foot-stomp-yellow.webp",
            damage: { formula: "1d6", type: "physical" }, cost: { mp: 0 }, range: "melee", target: "single", positional: { flank: "auto_crit" }, combo: { isOpener: true, enables: "true_strike" }, description: "Positional(Flanco): Crit automático. Combo Opener → habilita True Strike."
        },
        {
            name: "True Strike", job: "monk", level: 4, actionType: "primary", img: "icons/skills/melee/fist-punch-yellow.webp",
            damage: { formula: "2d6", type: "physical" }, cost: { mp: 0 }, range: "melee", target: "single", positional: { rear: "+1d6" }, combo: { requires: "Bootshine" }, description: "Req. combo Bootshine. Positional(Costas): +1d6."
        },
        {
            name: "Snap Punch", job: "monk", level: 10, actionType: "primary", img: "icons/skills/melee/strike-palm-yellow.webp",
            damage: { formula: "2d6+2", type: "physical" }, cost: { mp: 0 }, gaugeGain: 1, range: "melee", target: "single", positional: { flank: "+1d6" }, combo: { requires: "True Strike" }, description: "Req. True Strike. Positional(Flanco): +1d6. +1 Chakra."
        },
        {
            name: "Twin Snakes", job: "monk", level: 8, actionType: "primary", img: "icons/skills/melee/fist-punch-yellow.webp",
            damage: { formula: "1d6+1", type: "physical" }, cost: { mp: 0 }, range: "melee", target: "single", combo: { isOpener: true, enables: "demolish" }, description: "Alternate combo opener. +1d4 dano por 2t (Disciplined Fist). Habilita Demolish."
        },
        {
            name: "Demolish", job: "monk", level: 12, actionType: "primary", img: "icons/skills/melee/strike-kick-yellow.webp",
            damage: { formula: "2d6", type: "physical" }, cost: { mp: 0 }, range: "melee", target: "single", positional: { rear: "dot_1d4_3t" }, combo: { requires: "Twin Snakes" }, description: "Req. Twin Snakes. Positional(Costas): DoT 1d4 por 3t."
        },
        {
            name: "Meditation", job: "monk", level: 15, actionType: "secondary", img: "icons/magic/light/orb-yellow.webp",
            cost: { mp: 0 }, gaugeGain: 2, range: "self", target: "self", description: "+2 Chakra. Fora de combate: +5 Chakra."
        },
        {
            name: "Howling Fist", job: "monk", level: 10, actionType: "primary", img: "icons/magic/sonic/explosion-impact-yellow.webp",
            damage: { formula: "3d6", type: "physical" }, cost: { gauge: 5 }, range: "self", target: "aoe", aoeShape: "cone", aoeSize: 3, description: "Cone 3 tiles (3d6+STR). Gasta todos os 5 Chakra."
        },
        {
            name: "Mantra", job: "monk", level: 15, actionType: "secondary", img: "icons/magic/holy/prayer-hands-glow-white.webp",
            cost: { mp: 1 }, range: "self", target: "aoe", aoeShape: "circle", aoeSize: 3, description: "Por 2t: curas em aliados 3 tiles são +25% mais eficazes."
        },
        {
            name: "The Forbidden Chakra", job: "monk", level: 20, actionType: "instant", img: "icons/magic/light/orb-yellow.webp",
            damage: { formula: "5d6", type: "physical" }, cost: { gauge: 5 }, range: "melee", target: "single", description: "Dano altíssimo (5d6+STR). Gasta todos os 5 Chakra."
        },
        {
            name: "Riddle of Fire", job: "monk", level: 20, actionType: "secondary", img: "icons/magic/fire/explosion-fireball-small.webp",
            cost: { mp: 1 }, range: "self", target: "self", description: "Por 2t: +1d6 dano em todos ataques físicos."
        },
        {
            name: "Six-Sided Star", job: "monk", level: 25, actionType: "primary", img: "icons/skills/melee/spinning-fall-yellow.webp",
            damage: { formula: "4d6", type: "physical" }, cost: { gauge: 3 }, range: "melee", target: "single", description: "Dano alto (4d6+STR). +1 Speed por 1 turno. Gasta 3 Chakra."
        },
        {
            name: "Perfect Balance", job: "monk", level: 25, actionType: "secondary", img: "icons/skills/melee/fist-punch-yellow.webp",
            cost: { mp: 0 }, range: "self", target: "self", description: "Por 2 ataques: bônus posicionais aplicados automaticamente sem precisar de posição."
        },
    ],

    // ─────────────────────────────────────────────
    //  🐉 DRAGOON
    // ─────────────────────────────────────────────
    dragoon: [
        {
            name: "True Thrust", job: "dragoon", level: 1, actionType: "primary", img: "icons/weapons/polearms/spear-silver.webp",
            damage: { formula: "1d6", type: "physical" }, cost: { mp: 0 }, range: "melee", target: "single", combo: { isOpener: true, enables: "vorpal_thrust,disembowel" }, description: "Combo Opener → habilita Vorpal Thrust e Disembowel."
        },
        {
            name: "Life Surge", job: "dragoon", level: 5, actionType: "instant", img: "icons/magic/life/heart-flame-red.webp",
            cost: { mp: 0 }, range: "self", target: "self", description: "Próximo ataque físico: Crit automático + lifesteal (cura=dano causado)."
        },
        {
            name: "Vorpal Thrust", job: "dragoon", level: 4, actionType: "primary", img: "icons/weapons/polearms/spear-silver.webp",
            damage: { formula: "2d6", type: "physical" }, cost: { mp: 0 }, range: "melee", target: "single", combo: { requires: "True Thrust", enables: "full_thrust" }, description: "Req. True Thrust → habilita Full Thrust."
        },
        {
            name: "Lance Charge", job: "dragoon", level: 8, actionType: "secondary", img: "icons/magic/fire/flame-burning-yellow.webp",
            cost: { mp: 0 }, range: "self", target: "self", description: "Por 2t: +1d4 dano em todos ataques físicos."
        },
        {
            name: "Full Thrust", job: "dragoon", level: 10, actionType: "primary", img: "icons/weapons/polearms/spear-silver.webp",
            damage: { formula: "3d6+2", type: "physical" }, cost: { mp: 0 }, range: "melee", target: "single", combo: { requires: "Vorpal Thrust" }, description: "Finalizador de alto dano (3d6+2+STR). Req. Vorpal Thrust."
        },
        {
            name: "Disembowel", job: "dragoon", level: 8, actionType: "primary", img: "icons/weapons/polearms/spear-silver.webp",
            damage: { formula: "2d6", type: "physical" }, cost: { mp: 0 }, range: "melee", target: "single", combo: { requires: "True Thrust", enables: "chaos_thrust" }, description: "Alt. combo. Aplica DoT 1d4 por 3t. Habilita Chaos Thrust."
        },
        {
            name: "Jump", job: "dragoon", level: 10, actionType: "primary", img: "icons/skills/movement/feet-winged-boots-glowing-yellow.webp",
            damage: { formula: "3d6", type: "physical" }, cost: { mp: 0 }, range: "medium", target: "single", description: "Salta ao inimigo (4 tiles, ignora terreno). Retorna 1 tile automaticamente."
        },
        {
            name: "Chaos Thrust", job: "dragoon", level: 10, actionType: "primary", img: "icons/weapons/polearms/spear-silver.webp",
            damage: { formula: "2d6+1", type: "physical" }, cost: { mp: 0 }, range: "melee", target: "single", positional: { rear: "dot_1d6_3t" }, combo: { requires: "Disembowel" }, description: "Req. Disembowel. Positional(Costas): DoT 1d6 por 3t."
        },
        {
            name: "Spineshatter Dive", job: "dragoon", level: 15, actionType: "primary", img: "icons/skills/movement/feet-winged-boots-glowing-yellow.webp",
            damage: { formula: "3d6", type: "physical" }, cost: { mp: 0 }, range: "long", target: "single", description: "Salta 6 tiles. Dano (3d6+STR) + splash 1d6 nos adjacentes."
        },
        {
            name: "Dragon Sight", job: "dragoon", level: 20, actionType: "secondary", img: "icons/creatures/reptiles/dragon-winged-sky-blue.webp",
            cost: { mp: 1 }, range: "short", target: "ally", description: "Dragoon e aliado escolhido: +1d6 dano em todos ataques por 2t."
        },
        {
            name: "Dragonfire Dive", job: "dragoon", level: 20, actionType: "primary", img: "icons/magic/fire/explosion-fireball-large.webp",
            damage: { formula: "4d6", type: "physical" }, cost: { mp: 1 }, range: "long", target: "aoe", aoeShape: "circle", aoeSize: 2, description: "Salta 6 tiles. AOE 2x2 — dano físico+fogo (4d6+STR)."
        },
        {
            name: "Geirskogul", job: "dragoon", level: 25, actionType: "primary", img: "icons/weapons/polearms/spear-silver.webp",
            damage: { formula: "3d6", type: "physical" }, cost: { mp: 0 }, range: "long", target: "aoe", aoeShape: "line", aoeSize: 5, description: "Linha reta 5 tiles (3d6+STR). Ativa Life of the Dragon por 3 turnos."
        },
        {
            name: "Nastrond", job: "dragoon", level: 25, actionType: "primary", img: "icons/creatures/reptiles/dragon-winged-sky-blue.webp",
            damage: { formula: "4d6", type: "physical" }, cost: { mp: 0 }, range: "long", target: "aoe", aoeShape: "line", aoeSize: 5, description: "Linha 5 tiles (4d6+STR). Requer Life of the Dragon ativo."
        },
    ],

    // ─────────────────────────────────────────────
    //  🥷 NINJA
    // ─────────────────────────────────────────────
    ninja: [
        {
            name: "Spinning Edge", job: "ninja", level: 1, actionType: "primary", img: "icons/weapons/daggers/dagger-curved-black.webp",
            damage: { formula: "1d6", type: "physical" }, cost: { mp: 0 }, gaugeGain: 5, range: "melee", target: "single", combo: { isOpener: true, enables: "gust_slash" }, description: "Combo Opener → habilita Gust Slash. +5 Ninki."
        },
        {
            name: "Shade Shift", job: "ninja", level: 5, actionType: "secondary", img: "icons/magic/unholy/shadow-dark.webp",
            cost: { mp: 0 }, range: "self", target: "self", description: "Shadow: próximo ataque é completamente absorvido (0 dano)."
        },
        {
            name: "Gust Slash", job: "ninja", level: 4, actionType: "primary", img: "icons/weapons/daggers/dagger-curved-black.webp",
            damage: { formula: "2d6", type: "physical" }, cost: { mp: 0 }, gaugeGain: 5, range: "melee", target: "single", combo: { requires: "Spinning Edge" }, description: "Req. Spinning Edge. +5 Ninki."
        },
        {
            name: "Aeolian Edge", job: "ninja", level: 10, actionType: "primary", img: "icons/weapons/daggers/dagger-curved-black.webp",
            damage: { formula: "2d6+2", type: "physical" }, cost: { mp: 0 }, gaugeGain: 10, range: "melee", target: "single", positional: { rear: "+1d6" }, combo: { requires: "Gust Slash" }, description: "Req. Gust Slash. Positional(Costas): +1d6. +10 Ninki."
        },
        {
            name: "Armor Crush", job: "ninja", level: 15, actionType: "primary", img: "icons/weapons/daggers/dagger-curved-black.webp",
            damage: { formula: "2d6", type: "physical" }, cost: { mp: 0 }, gaugeGain: 10, range: "melee", target: "single", positional: { flank: "debuff_defense_-1_2t" }, combo: { requires: "Gust Slash" }, description: "Req. Gust Slash. Positional(Flanco): –1 Defense alvo por 2t. +10 Ninki."
        },
        {
            name: "Trick Attack", job: "ninja", level: 10, actionType: "primary", img: "icons/weapons/daggers/dagger-curved-black.webp",
            damage: { formula: "2d6", type: "physical" }, cost: { mp: 0 }, range: "melee", target: "single", positional: { rear: "vulnerability_+10percent_2t" }, description: "Positional(Costas): alvo recebe +10% dano por 2t (Trick Attack Debuff)."
        },
        {
            name: "Mug", job: "ninja", level: 15, actionType: "primary", img: "icons/weapons/daggers/dagger-curved-black.webp",
            damage: { formula: "1d6", type: "physical" }, cost: { mp: 0 }, gaugeGain: 40, range: "melee", target: "single", description: "Dano (1d6+DEX). +40 Ninki."
        },
        {
            name: "Bhavacakra", job: "ninja", level: 20, actionType: "primary", img: "icons/magic/symbols/rune-ringed-yellow.webp",
            damage: { formula: "4d6", type: "physical" }, cost: { gauge: 50 }, range: "melee", target: "single", description: "Dano muito alto (4d6+DEX). Gasta 50 Ninki."
        },
        {
            name: "Hellfrog Medium", job: "ninja", level: 20, actionType: "primary", img: "icons/magic/nature/frog-poison.webp",
            damage: { formula: "3d6", type: "magic" }, cost: { gauge: 50 }, range: "medium", target: "single", description: "Dano mágico (3d6) + splash 1d6 adjacentes. Gasta 50 Ninki."
        },
        {
            name: "Bunshin", job: "ninja", level: 25, actionType: "secondary", img: "icons/magic/unholy/shadow-clone.webp",
            cost: { gauge: 50 }, range: "self", target: "self", description: "Por 3t: cada ataque físico gera shadow replica (1d6 dano físico add). Gasta 50 Ninki."
        },
        {
            name: "Ten Chi Jin", job: "ninja", level: 30, actionType: "secondary", img: "icons/magic/symbols/rune-ringed-yellow.webp",
            cost: { mp: 0 }, range: "self", target: "self", description: "Por 1 turno: executa 3 Ninjutsus diferentes como Secondary Actions (custo 0)."
        },
    ],

    // ─────────────────────────────────────────────
    //  ⚔️ SAMURAI
    // ─────────────────────────────────────────────
    samurai: [
        {
            name: "Hakaze", job: "samurai", level: 1, actionType: "primary", img: "icons/weapons/swords/katana-golden.webp",
            damage: { formula: "1d6", type: "physical" }, cost: { mp: 0 }, gaugeGain: 5, range: "melee", target: "single", combo: { isOpener: true, enables: "jinpu,shifu" }, description: "Combo Opener → habilita Jinpu e Shifu. +5 Kenki."
        },
        {
            name: "Jinpu", job: "samurai", level: 4, actionType: "primary", img: "icons/weapons/swords/katana-golden.webp",
            damage: { formula: "1d6+1", type: "physical" }, cost: { mp: 0 }, range: "melee", target: "single", combo: { requires: "Hakaze", enables: "gekko" }, description: "Req. Hakaze. Aplica Fugetsu (+1d4 dano 3t). Habilita Gekko."
        },
        {
            name: "Shifu", job: "samurai", level: 8, actionType: "primary", img: "icons/weapons/swords/katana-golden.webp",
            damage: { formula: "1d6+1", type: "physical" }, cost: { mp: 0 }, range: "melee", target: "single", combo: { requires: "Hakaze", enables: "kasha" }, description: "Req. Hakaze. Aplica Fuka (+1 Speed 3t). Habilita Kasha."
        },
        {
            name: "Gekko", job: "samurai", level: 10, actionType: "primary", img: "icons/weapons/swords/katana-golden.webp",
            damage: { formula: "2d6+1", type: "physical" }, cost: { mp: 0 }, gaugeGain: 10, range: "melee", target: "single", positional: { rear: "gain_setsu" }, combo: { requires: "Jinpu" }, description: "Req. Jinpu. Positional(Costas): ganha Sen Setsu. +10 Kenki."
        },
        {
            name: "Kasha", job: "samurai", level: 12, actionType: "primary", img: "icons/weapons/swords/katana-golden.webp",
            damage: { formula: "2d6+1", type: "physical" }, cost: { mp: 0 }, gaugeGain: 10, range: "melee", target: "single", positional: { flank: "gain_ka" }, combo: { requires: "Shifu" }, description: "Req. Shifu. Positional(Flanco): ganha Sen Ka. +10 Kenki."
        },
        {
            name: "Yukikaze", job: "samurai", level: 15, actionType: "primary", img: "icons/weapons/swords/katana-golden.webp",
            damage: { formula: "2d6", type: "physical" }, cost: { mp: 0 }, gaugeGain: 10, range: "melee", target: "single", combo: { requires: "Hakaze" }, description: "Req. Hakaze. Ganha Sen Getsu. Aplica –1 Defense alvo por 2t. +10 Kenki."
        },
        {
            name: "Iaijutsu", job: "samurai", level: 10, actionType: "primary", img: "icons/weapons/swords/katana-golden.webp",
            damage: { formula: "2d6", type: "physical" }, cost: { mp: 0 }, range: "melee", target: "single", description: "1 Sen → Higanbana (DoT 2d6/3t). 2 Sen → Tenka Goken (AOE cone 3d6). 3 Sen → Midare Setsugekka (6d6 single)."
        },
        {
            name: "Tsubame-gaeshi", job: "samurai", level: 20, actionType: "instant", img: "icons/weapons/swords/katana-golden.webp",
            cost: { mp: 0 }, range: "self", target: "self", description: "Replica o último Iaijutsu com 75% dano, sem gastar Sen. Usar logo após Iaijutsu."
        },
        {
            name: "Third Eye", job: "samurai", level: 10, actionType: "instant", img: "icons/magic/perception/eye-foe-detect-yellow.webp",
            cost: { mp: 0 }, range: "self", target: "self", description: "Reduz próximo dano em 10%. Se ativo ao tomar dano: +10 Kenki."
        },
        {
            name: "Meikyo Shisui", job: "samurai", level: 25, actionType: "secondary", img: "icons/magic/symbols/rune-ringed-yellow.webp",
            cost: { mp: 0 }, range: "self", target: "self", description: "Por 2 ataques: usa Gekko/Kasha/Yukikaze diretamente sem combo (ainda ganham Sen)."
        },
        {
            name: "Hissatsu: Guren", job: "samurai", level: 25, actionType: "primary", img: "icons/weapons/swords/katana-golden.webp",
            damage: { formula: "4d6", type: "physical" }, cost: { gauge: 25 }, range: "medium", target: "aoe", aoeShape: "line", aoeSize: 5, description: "Corte em linha 5 tiles (4d6+STR). Gasta 25 Kenki."
        },
    ],

    // ─────────────────────────────────────────────
    //  🎵 BARD
    // ─────────────────────────────────────────────
    bard: [
        {
            name: "Heavy Shot", job: "bard", level: 1, actionType: "primary", img: "icons/weapons/bows/bow-simple-wood.webp",
            damage: { formula: "1d6", type: "physical" }, cost: { mp: 0 }, range: "long", target: "single", description: "Dano (1d6+DEX). 20% de ativar Straight Shot Ready."
        },
        {
            name: "Straight Shot", job: "bard", level: 4, actionType: "primary", img: "icons/weapons/bows/bow-simple-wood.webp",
            damage: { formula: "2d6", type: "physical" }, cost: { mp: 0 }, gaugeGain: 10, range: "long", target: "single", description: "Dano (2d6+DEX). Se Straight Shot Ready ativo: Direct Hit automático. +10 Soul Voice."
        },
        {
            name: "Venomous Bite", job: "bard", level: 5, actionType: "primary", img: "icons/magic/nature/snake-bite-poison.webp",
            damage: { formula: "1d6", type: "physical" }, cost: { mp: 0 }, range: "long", target: "single", description: "Dano +DoT Veneno (1d4 por 3t). +10 Soul Voice quando DoT ticks."
        },
        {
            name: "Bloodletter", job: "bard", level: 8, actionType: "instant", img: "icons/weapons/bows/bow-simple-wood.webp",
            damage: { formula: "2d6", type: "physical" }, cost: { mp: 0 }, range: "short", target: "single", description: "Dano (2d6+DEX). 2 cargas."
        },
        {
            name: "Mage's Ballad", job: "bard", level: 5, actionType: "secondary", img: "icons/magic/sonic/explosion-sound-wave.webp",
            cost: { mp: 0 }, range: "self", target: "aoe", description: "Song (3 turnos): party em 3 tiles → +1 MP por Round-Up. Ao terminar: ganha Mage's Coda."
        },
        {
            name: "Army's Paeon", job: "bard", level: 10, actionType: "secondary", img: "icons/magic/sonic/explosion-sound-wave.webp",
            cost: { mp: 0 }, range: "self", target: "aoe", description: "Song (3 turnos): party em 3 tiles → +1 Speed. Ao terminar: ganha Army's Coda."
        },
        {
            name: "The Wanderer's Minuet", job: "bard", level: 15, actionType: "secondary", img: "icons/magic/sonic/explosion-sound-wave.webp",
            cost: { mp: 0 }, range: "self", target: "aoe", description: "Song (3 turnos): Acertos críticos = +1 Repertoire. Habilita Pitch Perfect. Ganha Wanderer's Coda."
        },
        {
            name: "Pitch Perfect", job: "bard", level: 20, actionType: "instant", img: "icons/weapons/bows/bow-simple-wood.webp",
            damage: { formula: "2d6", type: "physical" }, cost: { gauge: 1 }, range: "long", target: "single", description: "1 Rep: 2d6. 2 Rep: 3d6. 3 Rep: 4d6+Direct Hit. Req. Wanderer's Minuet."
        },
        {
            name: "Apex Arrow", job: "bard", level: 25, actionType: "primary", img: "icons/weapons/bows/bow-simple-wood.webp",
            damage: { formula: "2d6", type: "physical" }, cost: { gauge: 20 }, range: "long", target: "aoe", aoeShape: "line", aoeSize: 5, description: "Linha 5 tiles. Dano = Soul Voice/20 dados (mín 2d6, máx 5d6 com 100)."
        },
        {
            name: "Troubadour", job: "bard", level: 20, actionType: "instant", img: "icons/magic/defensive/shield-barrier-glowing.webp",
            cost: { mp: 1 }, range: "self", target: "aoe", aoeShape: "circle", aoeSize: 4, description: "Party 4 tiles: –15% dano recebido por 1 turno."
        },
        {
            name: "Battle Voice", job: "bard", level: 25, actionType: "secondary", img: "icons/magic/sonic/explosion-sound-wave.webp",
            cost: { mp: 1 }, range: "self", target: "aoe", aoeShape: "circle", aoeSize: 4, description: "Party 4 tiles: +15% chance de Direct Hit por 2 turnos."
        },
    ],

    // ─────────────────────────────────────────────
    //  🔫 MACHINIST
    // ─────────────────────────────────────────────
    machinist: [
        {
            name: "Split Shot", job: "machinist", level: 1, actionType: "primary", img: "icons/weapons/guns/pistol-revolver-brown.webp",
            damage: { formula: "1d6", type: "physical" }, cost: { mp: 0 }, gaugeGain: 5, range: "long", target: "single", combo: { isOpener: true, enables: "slug_shot" }, description: "Combo Opener → habilita Slug Shot. +5 Heat."
        },
        {
            name: "Slug Shot", job: "machinist", level: 4, actionType: "primary", img: "icons/weapons/guns/pistol-revolver-brown.webp",
            damage: { formula: "2d6", type: "physical" }, cost: { mp: 0 }, gaugeGain: 5, range: "long", target: "single", combo: { requires: "Split Shot", enables: "clean_shot" }, description: "Req. Split Shot. +5 Heat."
        },
        {
            name: "Clean Shot", job: "machinist", level: 10, actionType: "primary", img: "icons/weapons/guns/pistol-revolver-brown.webp",
            damage: { formula: "2d6+2", type: "physical" }, cost: { mp: 0 }, gaugeGain: 5, range: "long", target: "single", combo: { requires: "Slug Shot" }, description: "Req. Slug Shot. +5 Heat +20 Battery."
        },
        {
            name: "Hypercharge", job: "machinist", level: 15, actionType: "secondary", img: "icons/magic/fire/explosion-fireball-small.webp",
            cost: { gauge: 50 }, range: "self", target: "self", description: "Por 2t: todos ataques Primary ganham +1d6. Gasta 50 Heat. Ativa Overheat."
        },
        {
            name: "Wildfire", job: "machinist", level: 15, actionType: "secondary", img: "icons/magic/fire/explosion-fireball-large.webp",
            cost: { mp: 0 }, range: "medium", target: "single", description: "Aplica Wildfire: após 6 ataques do Machinist, explode (dano = nº acertos × 2d4)."
        },
        {
            name: "Drill", job: "machinist", level: 20, actionType: "primary", img: "icons/tools/smithing/drill.webp",
            damage: { formula: "3d6", type: "physical" }, cost: { mp: 0 }, range: "long", target: "single", description: "Dano alto (3d6+DEX). Independente de combo."
        },
        {
            name: "Air Anchor", job: "machinist", level: 25, actionType: "primary", img: "icons/weapons/guns/gun-small-black.webp",
            damage: { formula: "3d6+2", type: "physical" }, cost: { mp: 0 }, range: "long", target: "single", description: "Dano (3d6+2+DEX). +20 Battery."
        },
        {
            name: "Rook Autoturret", job: "machinist", level: 10, actionType: "secondary", img: "icons/tools/smithing/hammer-anvil-steel.webp",
            cost: { gauge: 50 }, range: "adjacent", target: "self", description: "Turret com 5 HP por 3t. Ataca inimigo mais próximo no Round-Up por 1d6+DEX. Gasta 50 Battery."
        },
        {
            name: "Automaton Queen", job: "machinist", level: 25, actionType: "secondary", img: "icons/tools/smithing/hammer-anvil-steel.webp",
            cost: { gauge: 80 }, range: "self", target: "self", description: "Robô autônomo por 3t. Age 2x/turno (Enemy Phase) com 2d6+DEX. 80 Battery: 15 HP. 100: 25 HP."
        },
        {
            name: "Ricochet", job: "machinist", level: 8, actionType: "instant", img: "icons/weapons/guns/pistol-revolver-brown.webp",
            damage: { formula: "2d6", type: "physical" }, cost: { mp: 0 }, range: "long", target: "single", description: "Dano (2d6+DEX). 3 cargas."
        },
        {
            name: "Tactician", job: "machinist", level: 20, actionType: "instant", img: "icons/magic/defensive/shield-barrier-glowing.webp",
            cost: { mp: 0 }, range: "self", target: "aoe", aoeShape: "circle", aoeSize: 4, description: "Party 4 tiles: –15% dano recebido por 1 turno."
        },
    ],

    // ─────────────────────────────────────────────
    //  🔥 BLACK MAGE
    // ─────────────────────────────────────────────
    blackmage: [
        {
            name: "Fire", job: "blackmage", level: 1, actionType: "primary", img: "icons/magic/fire/projectile-flameball-yellow-red.webp",
            damage: { formula: "2d6", type: "fire" }, cost: { mp: 1 }, range: "long", target: "single", description: "Dano Fire (2d6+INT). Aplica/mantém Astral Fire. Em AF: +1d6 extra."
        },
        {
            name: "Blizzard", job: "blackmage", level: 1, actionType: "primary", img: "icons/magic/ice/projectile-shard-ice.webp",
            damage: { formula: "1d6", type: "ice" }, cost: { mp: 1 }, range: "long", target: "single", description: "Dano Ice (1d6+INT). Ativa Umbral Ice por 3t."
        },
        {
            name: "Sleep", job: "blackmage", level: 1, actionType: "primary", img: "icons/magic/unholy/orb-beam-blast-purple.webp",
            cost: { mp: 1 }, range: "long", target: "single", description: "Inimigo dorme por 1 turno (cancela se receber dano)."
        },
        {
            name: "Thunder III", job: "blackmage", level: 5, actionType: "primary", img: "icons/magic/lightning/bolt-strike-yellow.webp",
            damage: { formula: "2d6", type: "lightning" }, cost: { mp: 2 }, range: "long", target: "single", description: "Dano Raio (2d6+INT) + DoT 2d4 por 3t. Direct Hit: DoT dura 6t."
        },
        {
            name: "Transpose", job: "blackmage", level: 5, actionType: "secondary", img: "icons/magic/symbols/rune-circle-cross-blue.webp",
            cost: { mp: 0 }, range: "self", target: "self", description: "Troca estado elemental (AF→UI ou UI→AF) imediatamente."
        },
        {
            name: "Fire III", job: "blackmage", level: 12, actionType: "primary", img: "icons/magic/fire/explosion-fireball-large.webp",
            damage: { formula: "3d6", type: "fire" }, cost: { mp: 2 }, range: "long", target: "single", description: "Dano Fire (3d6+INT). Aplica Astral Fire III máximo."
        },
        {
            name: "Blizzard III", job: "blackmage", level: 10, actionType: "primary", img: "icons/magic/ice/explosion-ice.webp",
            damage: { formula: "2d6", type: "ice" }, cost: { mp: 1 }, range: "long", target: "single", description: "Dano Ice (2d6+INT). Aplica Umbral Ice III máximo."
        },
        {
            name: "Leylines", job: "blackmage", level: 10, actionType: "secondary", img: "icons/magic/symbols/rune-line-circle.webp",
            cost: { mp: 1 }, range: "medium", target: "aoe", aoeShape: "circle", aoeSize: 2, description: "Zona de 2x2. Dentro: +1 Primary Action de magia/turno. Dura 3t."
        },
        {
            name: "Amplifier", job: "blackmage", level: 15, actionType: "secondary", img: "icons/magic/symbols/orb-glowing-blue.webp",
            cost: { mp: 0 }, range: "self", target: "self", description: "+1 Polyglot instantaneamente."
        },
        {
            name: "Flare", job: "blackmage", level: 15, actionType: "primary", img: "icons/magic/fire/explosion-fireball-large.webp",
            damage: { formula: "4d6", type: "fire" }, cost: { mp: 0 }, range: "self", target: "aoe", aoeShape: "circle", aoeSize: 2, description: "Gasta TODA a MP. AOE círculo 2 tiles (4d6+INT). Req. Astral Fire."
        },
        {
            name: "Fire IV", job: "blackmage", level: 20, actionType: "primary", img: "icons/magic/fire/explosion-fireball-large.webp",
            damage: { formula: "4d6", type: "fire" }, cost: { mp: 0 }, range: "long", target: "single", description: "Dano imenso (4d6+INT). Req. Astral Fire. Gera +1 Umbral Heart."
        },
        {
            name: "Blizzard IV", job: "blackmage", level: 20, actionType: "primary", img: "icons/magic/ice/explosion-ice.webp",
            damage: { formula: "2d6", type: "ice" }, cost: { mp: 0 }, range: "long", target: "single", description: "Dano Ice (2d6+INT). Req. Umbral Ice. Gera +3 Umbral Hearts."
        },
        {
            name: "Xenoglossy", job: "blackmage", level: 20, actionType: "primary", img: "icons/magic/symbols/orb-glowing-blue.webp",
            damage: { formula: "5d6", type: "unaspected" }, cost: { gauge: 1 }, range: "long", target: "single", description: "Dano altíssimo (5d6+INT). Ignora AF/UI. Gasta 1 Polyglot."
        },
        {
            name: "Freeze", job: "blackmage", level: 25, actionType: "primary", img: "icons/magic/ice/burst-blizzard-blue.webp",
            damage: { formula: "2d6", type: "ice" }, cost: { mp: 0 }, range: "short", target: "aoe", aoeShape: "circle", aoeSize: 2, description: "AOE Ice 2 tiles. Aplica Bind (alvo não move 1t). Req. Umbral Ice."
        },
        {
            name: "Paradox", job: "blackmage", level: 25, actionType: "primary", img: "icons/magic/symbols/rune-glowing-blue.webp",
            damage: { formula: "4d6", type: "unaspected" }, cost: { mp: 0 }, range: "long", target: "single", description: "Dano (4d6+INT). Disponível após transição perfeita AF↔UI."
        },
    ],

    // ─────────────────────────────────────────────
    //  🌟 SUMMONER
    // ─────────────────────────────────────────────
    summoner: [
        {
            name: "Ruin II", job: "summoner", level: 5, actionType: "primary", img: "icons/magic/unholy/projectile-horn-purple.webp",
            damage: { formula: "2d6+1", type: "magic" }, cost: { mp: 1 }, range: "long", target: "single", description: "Dano mágico (2d6+1+INT). Sempre disponível."
        },
        {
            name: "Outburst", job: "summoner", level: 10, actionType: "primary", img: "icons/magic/unholy/explosion-fire-purple.webp",
            damage: { formula: "2d6", type: "magic" }, cost: { mp: 1 }, range: "short", target: "aoe", aoeShape: "circle", aoeSize: 2, description: "Dano mágico AOE (2d6+INT) em círculo 2 tiles."
        },
        {
            name: "Physick", job: "summoner", level: 4, actionType: "secondary", img: "icons/magic/life/heart-cross-strong-green.webp",
            healing: { formula: "1d6" }, cost: { mp: 1 }, range: "short", target: "ally", description: "Cura de emergência (1d6+MND)."
        },
        {
            name: "Aethercharge", job: "summoner", level: 1, actionType: "secondary", img: "icons/magic/symbols/rune-circle-pink.webp",
            cost: { mp: 0 }, range: "self", target: "self", description: "Concede Arcana Ruby/Topaz/Emerald. +1d6 em Ruin/Outburst por 3t."
        },
        {
            name: "Summon Ruby (Ifrit)", job: "summoner", level: 8, actionType: "secondary", img: "icons/creatures/fire/elemental-fire.webp",
            cost: { mp: 0 }, range: "self", target: "self", description: "Invoca Ifrit-Egi. Desbloqueia Ruby Ruin (3d6 Fire) e Ruby Rite (AOE 2d6 Fire). 4 ações."
        },
        {
            name: "Summon Topaz (Titan)", job: "summoner", level: 10, actionType: "secondary", img: "icons/creatures/earth/golem-dark.webp",
            cost: { mp: 0 }, range: "self", target: "self", description: "Invoca Titan-Egi. Ruby Ruin (3d6 Terra+splash 1d6) e Titan's Favor (Instant +2 Defense). 4 ações."
        },
        {
            name: "Summon Emerald (Garuda)", job: "summoner", level: 12, actionType: "secondary", img: "icons/creatures/air/flying-creature.webp",
            cost: { mp: 0 }, range: "self", target: "self", description: "Invoca Garuda-Egi. Emerald Ruin (2d6 Vento 3x) e Emerald Rite (AOE Vento cone). 4 ações."
        },
        {
            name: "Demi-Bahamut", job: "summoner", level: 20, actionType: "secondary", img: "icons/creatures/reptiles/dragon-winged-sky-blue.webp",
            cost: { mp: 0 }, range: "self", target: "self", description: "Invoca Demi-Bahamut por 3t. Round-Up: Wyrmwave (3d6 Unaspected). Final: Akh Morn (5d6 AOE)."
        },
        {
            name: "Demi-Phoenix", job: "summoner", level: 25, actionType: "secondary", img: "icons/creatures/fire/phoenix-mount.webp",
            cost: { mp: 0 }, range: "self", target: "self", description: "Invoca Phoenix por 3t. Round-Up: Fountain of Fire (3d6) + Scarlet Flame (1d6 heal). Final: Revelation AOE."
        },
        {
            name: "Searing Light", job: "summoner", level: 20, actionType: "secondary", img: "icons/magic/light/beam-yellow-light.webp",
            cost: { mp: 1 }, range: "self", target: "aoe", aoeShape: "circle", aoeSize: 4, description: "Party 4 tiles: +1d4 dano em todos os ataques por 2 turnos."
        },
        {
            name: "Resurrection", job: "summoner", level: 12, actionType: "primary", img: "icons/magic/life/cross-explosion-green.webp",
            cost: { mp: 3 }, range: "short", target: "ally", description: "Revive aliado K.O. com 25% HP."
        },
    ],

    // ─────────────────────────────────────────────
    //  ⚡ LIMIT BREAKS (Compartilhados por Papel)
    // ─────────────────────────────────────────────
    limitbreak: [
        // Tank LBs
        {
            name: "Shield Wall", job: "tank", level: 0, actionType: "limit_break", img: "icons/magic/defensive/shield-barrier-glowing-gold.webp",
            cost: { limitBreak: 1 }, range: "self", target: "aoe", aoeShape: "circle", aoeSize: 4, description: "LB Lv.1 Tank: party –25% dano recebido por 1 turno."
        },
        {
            name: "Stronghold", job: "tank", level: 0, actionType: "limit_break", img: "icons/magic/defensive/shield-barrier-glowing-gold.webp",
            cost: { limitBreak: 2 }, range: "self", target: "aoe", aoeShape: "circle", aoeSize: 4, description: "LB Lv.2 Tank: party –40% dano recebido por 1 turno."
        },
        {
            name: "Last Bastion", job: "tank", level: 0, actionType: "limit_break", img: "icons/magic/defensive/shield-barrier-glowing-gold.webp",
            cost: { limitBreak: 3 }, range: "self", target: "aoe", aoeShape: "circle", aoeSize: 4, description: "LB Lv.3 Tank: party invulnerável por 1 turno completo."
        },
        // Healer LBs
        {
            name: "Healing Wind", job: "healer", level: 0, actionType: "limit_break", img: "icons/magic/life/cross-explosion-green.webp",
            healing: { formula: "2d6" }, cost: { limitBreak: 1 }, range: "self", target: "aoe", description: "LB Lv.1 Healer: cura toda a party (2d6 HP)."
        },
        {
            name: "Breath of the Earth", job: "healer", level: 0, actionType: "limit_break", img: "icons/magic/life/cross-explosion-green.webp",
            healing: { formula: "4d6" }, cost: { limitBreak: 2 }, range: "self", target: "aoe", description: "LB Lv.2 Healer: cura party (4d6 HP) + Regen por 3t."
        },
        {
            name: "Pulse of Life", job: "healer", level: 0, actionType: "limit_break", img: "icons/magic/life/cross-explosion-green.webp",
            cost: { limitBreak: 3 }, range: "self", target: "aoe", description: "LB Lv.3 Healer: revive toda a party com 50% HP."
        },
        // Melee DPS LBs
        {
            name: "Braver", job: "melee", level: 0, actionType: "limit_break", img: "icons/weapons/swords/sword-broad-gold.webp",
            damage: { formula: "6d6", type: "physical" }, cost: { limitBreak: 1 }, range: "melee", target: "single", description: "LB Lv.1 Melee DPS: dano single (6d6 físico)."
        },
        {
            name: "Bladedance", job: "melee", level: 0, actionType: "limit_break", img: "icons/weapons/swords/sword-broad-gold.webp",
            damage: { formula: "10d6", type: "physical" }, cost: { limitBreak: 2 }, range: "melee", target: "single", description: "LB Lv.2 Melee DPS: dano single (10d6 físico)."
        },
        {
            name: "Final Heaven", job: "melee", level: 0, actionType: "limit_break", img: "icons/weapons/swords/sword-broad-gold.webp",
            damage: { formula: "16d6", type: "physical" }, cost: { limitBreak: 3 }, range: "melee", target: "single", description: "LB Lv.3 Melee DPS: dano MÁXIMO do jogo (16d6 físico)."
        },
        // Physical Ranged LBs
        {
            name: "Big Shot", job: "ranged", level: 0, actionType: "limit_break", img: "icons/weapons/bows/bow-simple-wood.webp",
            damage: { formula: "5d6", type: "physical" }, cost: { limitBreak: 1 }, range: "long", target: "single", description: "LB Lv.1 Phys Ranged: dano single (5d6 físico)."
        },
        {
            name: "Desperado", job: "ranged", level: 0, actionType: "limit_break", img: "icons/weapons/bows/bow-simple-wood.webp",
            damage: { formula: "4d6", type: "physical" }, cost: { limitBreak: 2 }, range: "long", target: "aoe", aoeShape: "circle", aoeSize: 3, description: "LB Lv.2 Phys Ranged: AOE círculo 3 tiles (4d6 físico)."
        },
        {
            name: "Sagittarius Arrow", job: "ranged", level: 0, actionType: "limit_break", img: "icons/weapons/bows/bow-simple-wood.webp",
            damage: { formula: "14d6", type: "physical" }, cost: { limitBreak: 3 }, range: "long", target: "single", description: "LB Lv.3 Phys Ranged: flecha de longo alcance (14d6 físico)."
        },
        // Magic DPS LBs
        {
            name: "Skyshard", job: "caster", level: 0, actionType: "limit_break", img: "icons/magic/unholy/explosion-fire-purple.webp",
            damage: { formula: "4d6", type: "magic" }, cost: { limitBreak: 1 }, range: "long", target: "aoe", aoeShape: "circle", aoeSize: 2, description: "LB Lv.1 Magic DPS: AOE mágico círculo 2 tiles (4d6)."
        },
        {
            name: "Starstorm", job: "caster", level: 0, actionType: "limit_break", img: "icons/magic/space/star-smashing-orange.webp",
            damage: { formula: "6d6", type: "magic" }, cost: { limitBreak: 2 }, range: "long", target: "aoe", aoeShape: "circle", aoeSize: 3, description: "LB Lv.2 Magic DPS: AOE grande círculo 3 tiles (6d6 mágico)."
        },
        {
            name: "Meteor", job: "caster", level: 0, actionType: "limit_break", img: "icons/magic/space/meteor-strike-purple.webp",
            damage: { formula: "10d6", type: "magic" }, cost: { limitBreak: 3 }, range: "long", target: "aoe", aoeShape: "circle", aoeSize: 10, description: "LB Lv.3 Magic DPS: todo o campo de batalha (10d6 mágico catastrófico)."
        },
    ],

};

export default ABILITIES_DATA;
