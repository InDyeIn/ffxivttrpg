/**
 * FFXIV TTRPG — Configurações e constantes do sistema
 */

export const FFXIV = {};

// Atributos primários
FFXIV.attributes = {
    str: "FFXIV.AttrSTR",
    dex: "FFXIV.AttrDEX",
    vit: "FFXIV.AttrVIT",
    int: "FFXIV.AttrINT",
    mnd: "FFXIV.AttrMND",
};

// Tipos de ação
FFXIV.actionTypes = {
    primary: "FFXIV.ActionPrimary",
    secondary: "FFXIV.ActionSecondary",
    instant: "FFXIV.ActionInstant",
    passive: "FFXIV.ActionPassive",
};

// Tipos de dano
FFXIV.damageTypes = {
    physical: "FFXIV.DamagePhysical",
    magic: "FFXIV.DamageMagic",
    holy: "FFXIV.DamageHoly",
    dark: "FFXIV.DamageDark",
    fire: "FFXIV.DamageFire",
    ice: "FFXIV.DamageIce",
    lightning: "FFXIV.DamageLightning",
    wind: "FFXIV.DamageWind",
    earth: "FFXIV.DamageEarth",
    water: "FFXIV.DamageWater",
    unaspected: "FFXIV.DamageUnaspected",
};

// Tipos de alcance
FFXIV.rangeTypes = {
    melee: "FFXIV.RangeMelee",
    short: "FFXIV.RangeShort",
    medium: "FFXIV.RangeMedium",
    long: "FFXIV.RangeLong",
    self: "FFXIV.RangeSelf",
};

// Tipos de alvo
FFXIV.targetTypes = {
    single: "FFXIV.TargetSingle",
    all_allies: "FFXIV.TargetAllAllies",
    all_enemies: "FFXIV.TargetAllEnemies",
    aoe: "FFXIV.TargetAOE",
    self: "FFXIV.TargetSelf",
    line: "FFXIV.TargetLine",
    cone: "FFXIV.TargetCone",
};

// Formas de AOE
FFXIV.aoeShapes = {
    none: "FFXIV.AOENone",
    circle: "FFXIV.AOECircle",
    cone: "FFXIV.AOECone",
    line: "FFXIV.AOELine",
    donut: "FFXIV.AOEDonut",
    cross: "FFXIV.AOECross",
};

// Jobs
FFXIV.jobs = {
    paladin: { name: "FFXIV.JobPaladin", role: "tank", stat: "str", icon: "fas fa-shield", color: "#4a90d9" },
    warrior: { name: "FFXIV.JobWarrior", role: "tank", stat: "str", icon: "fas fa-axe-battle", color: "#c0392b" },
    darkKnight: { name: "FFXIV.JobDarkKnight", role: "tank", stat: "str", icon: "fas fa-skull", color: "#8e44ad" },
    whiteMage: { name: "FFXIV.JobWhiteMage", role: "healer", stat: "mnd", icon: "fas fa-cross", color: "#f0e68c" },
    scholar: { name: "FFXIV.JobScholar", role: "healer", stat: "mnd", icon: "fas fa-book", color: "#27ae60" },
    astrologian: { name: "FFXIV.JobAstrologian", role: "healer", stat: "mnd", icon: "fas fa-star", color: "#f39c12" },
    monk: { name: "FFXIV.JobMonk", role: "melee", stat: "str", icon: "fas fa-fist-raised", color: "#e67e22" },
    dragoon: { name: "FFXIV.JobDragoon", role: "melee", stat: "str", icon: "fas fa-dragon", color: "#2980b9" },
    ninja: { name: "FFXIV.JobNinja", role: "melee", stat: "dex", icon: "fas fa-wind", color: "#34495e" },
    samurai: { name: "FFXIV.JobSamurai", role: "melee", stat: "str", icon: "fas fa-sword", color: "#c0392b" },
    bard: { name: "FFXIV.JobBard", role: "ranged", stat: "dex", icon: "fas fa-music", color: "#27ae60" },
    machinist: { name: "FFXIV.JobMachinist", role: "ranged", stat: "dex", icon: "fas fa-cogs", color: "#7f8c8d" },
    blackMage: { name: "FFXIV.JobBlackMage", role: "magic", stat: "int", icon: "fas fa-hat-wizard", color: "#8e44ad" },
    summoner: { name: "FFXIV.JobSummoner", role: "magic", stat: "int", icon: "fas fa-dragon", color: "#16a085" },
};

// Raças
FFXIV.races = {
    hyur: { name: "FFXIV.RaceHyur", tribes: ["midlander", "highlander"] },
    elezen: { name: "FFXIV.RaceElezen", tribes: ["wildwood", "duskwight"] },
    lalafell: { name: "FFXIV.RaceLalafell", tribes: ["plainsfolk", "dunesfolk"] },
    miqote: { name: "FFXIV.RaceMiqote", tribes: ["seekers", "keepers"] },
    roegadyn: { name: "FFXIV.RaceRoegadyn", tribes: ["seaWolves", "hellsguard"] },
    viera: { name: "FFXIV.RaceViera", tribes: ["rava", "veena"] },
    hrothgar: { name: "FFXIV.RaceHrothgar", tribes: ["helions", "theLost"] },
};

// Roles
FFXIV.roles = {
    tank: { name: "FFXIV.RoleTank", icon: "fas fa-shield-halved", color: "#4a90d9" },
    healer: { name: "FFXIV.RoleHealer", icon: "fas fa-heart", color: "#27ae60" },
    melee: { name: "FFXIV.RoleMelee", icon: "fas fa-swords", color: "#e74c3c" },
    ranged: { name: "FFXIV.RoleRanged", icon: "fas fa-bow-arrow", color: "#f39c12" },
    magic: { name: "FFXIV.RoleMagic", icon: "fas fa-sparkles", color: "#8e44ad" },
};

// Gauges especiais por job
FFXIV.gauges = {
    none: { label: "", max: 0, color: "transparent" },
    beast: { label: "Beast Gauge", max: 100, color: "#c0392b", job: "warrior" },
    blood: { label: "Blood Gauge", max: 100, color: "#6c0000", job: "darkKnight" },
    chakra: { label: "Chakra", max: 5, color: "#f39c12", job: "monk" },
    ninki: { label: "Ninki Gauge", max: 100, color: "#8e44ad", job: "ninja" },
    kenki: { label: "Kenki Gauge", max: 100, color: "#e74c3c", job: "samurai" },
    soulVoice: { label: "Soul Voice", max: 100, color: "#27ae60", job: "bard" },
    heat: { label: "Heat Gauge", max: 100, color: "#e67e22", job: "machinist" },
    battery: { label: "Battery Gauge", max: 100, color: "#3498db", job: "machinist" },
    lily: { label: "Lily Gauge", max: 3, color: "#f1c40f", job: "whiteMage" },
    aetherflow: { label: "Aetherflow", max: 3, color: "#27ae60", job: "scholar" },
};

// Tiers de inimigos
FFXIV.enemyTiers = {
    minion: { name: "FFXIV.TierMinion", hpMult: 0.5 },
    standard: { name: "FFXIV.TierStandard", hpMult: 1 },
    elite: { name: "FFXIV.TierElite", hpMult: 2 },
    boss: { name: "FFXIV.TierBoss", hpMult: 4 },
};

// Fases de combate
FFXIV.combatPhases = {
    adventurer: { name: "FFXIV.PhaseAdventurer", color: "#27ae60" },
    enemy: { name: "FFXIV.PhaseEnemy", color: "#e74c3c" },
    roundup: { name: "FFXIV.PhaseRoundUp", color: "#f39c12" },
};

// Status effects
FFXIV.statusEffects = [
    { id: "poison", name: "FFXIV.StatusPoison", icon: "icons/svg/poison.svg" },
    { id: "bind", name: "FFXIV.StatusBind", icon: "icons/svg/net.svg" },
    { id: "silence", name: "FFXIV.StatusSilence", icon: "icons/svg/silenced.svg" },
    { id: "slow", name: "FFXIV.StatusSlow", icon: "icons/svg/slow.svg" },
    { id: "bleed", name: "FFXIV.StatusBleed", icon: "icons/svg/blood.svg" },
    { id: "doom", name: "FFXIV.StatusDoom", icon: "icons/svg/skull.svg" },
    { id: "vulnerability", name: "FFXIV.StatusVulnerability", icon: "icons/svg/eye.svg" },
    { id: "regen", name: "FFXIV.StatusRegen", icon: "icons/svg/regen.svg" },
    { id: "shield", name: "FFXIV.StatusShield", icon: "icons/svg/shield.svg" },
    { id: "enrage", name: "FFXIV.StatusEnrage", icon: "icons/svg/fire.svg" },
    { id: "sleep", name: "FFXIV.StatusSleep", icon: "icons/svg/sleep.svg" },
    { id: "stun", name: "FFXIV.StatusStun", icon: "icons/svg/stun.svg" },
];
