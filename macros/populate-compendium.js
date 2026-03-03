/**
 * FFXIV TTRPG — Macro de Populate do Compêndio de Habilidades
 * 
 * COMO USAR:
 * 1. Certifique-se de que o Compêndio "ffxivttrpg.abilities" existe no mundo.
 * 2. Cole este script em uma Macro de tipo "Script".
 * 3. Execute como GM.
 * 4. Aguarde — as habilidades serão criadas, receberão ícones e serão organizadas em pastas.
 */

const { ABILITIES_DATA } = await import("/systems/ffxivttrpg/module/data/abilities-data.mjs");
const PACK_NAME = "ffxivttrpg.abilities";

const pack = game.packs.get(PACK_NAME);
if (!pack) {
    ui.notifications.error(`Compêndio "${PACK_NAME}" não encontrado!`);
    return;
}

await pack.configure({ locked: false });

let created = 0;
let updated = 0;
let errors = 0;

// Lista de Jobs e Categorias
const JOB_ROLES = {
    "Paladin": "Tank", "Warrior": "Tank", "Dark Knight": "Tank",
    "White Mage": "Healer", "Scholar": "Healer", "Astrologian": "Healer",
    "Monk": "Melee DPS", "Dragoon": "Melee DPS", "Ninja": "Melee DPS", "Samurai": "Melee DPS",
    "Bard": "Ranged DPS", "Machinist": "Ranged DPS",
    "Black Mage": "Magic DPS", "Summoner": "Magic DPS",
    "Limit Breaks - Tank": "Limit Break", "Limit Breaks - Healer": "Limit Break",
    "Limit Breaks - Melee DPS": "Limit Break", "Limit Breaks - Ranged DPS": "Limit Break", "Limit Breaks - Magic DPS": "Limit Break"
};

// Heurística visual detalhada usando tokens locais (Game-Icons)
function getIconForAbility(job, name, desc) {
    const n = name.toLowerCase();
    const d = desc.toLowerCase();
    const basePath = "systems/ffxivttrpg/assets/tokens/";

    const matchMatches = (keywords) => keywords.some(k => n.includes(k) || d.includes(k));

    // Curas e Ressurreições
    if (matchMatches(["raise", "resurrection", "ascend", "verraise", "revive"])) return basePath + "angel-wings.png";
    if (matchMatches(["cure", "heal", "medica", "benefic", "adloquium", "physick", "lustrate", "essential dignity", "tetragrammaton", "regen"])) return basePath + "healing.png";
    if (matchMatches(["potion", "ether", "elixir"])) return basePath + "health-potion.png";

    // Defesas e Mitigações
    if (matchMatches(["shield", "rampart", "wall", "barrier", "succor", "protect", "shell", "sentinel", "reprisal", "feint", "addle", "mitigation", "parry", "block"])) return basePath + "shield.png";
    if (matchMatches(["invulnerable", "hallowed ground", "holmgang", "living dead", "superbolide"])) return basePath + "energy-shield.png";

    // Provocações e Aggro
    if (matchMatches(["provoke", "enmity", "taunt", "shirk", "aggro", "attention", "voke"])) return basePath + "bullseye.png";

    // Magias Elementais
    if (matchMatches(["fire", "fira", "firaga", "flare", "despair", "scorch"])) return basePath + "fire.png";
    if (matchMatches(["blizzard", "freeze", "blizzara", "blizzaga", "umbral"])) return basePath + "ice-bolt.png";
    if (matchMatches(["thunder", "lightning", "spark", "shock"])) return basePath + "lightning-storm.png";
    if (matchMatches(["aero", "wind", "breeze", "tornado", "gale"])) return basePath + "magic-swirl.png";
    if (matchMatches(["stone", "earth", "quake", "rock"])) return basePath + "falling-rocks.png";
    if (matchMatches(["water", "fluid", "aqua", "splash"])) return basePath + "droplets.png";

    // Magias Não-elementais e Luz/Trevas
    if (matchMatches(["glare", "holy", "dia", "luz", "light"])) return basePath + "glowing-artifact.png";
    if (matchMatches(["ruin", "broil", "dosis", "foul", "xenoglossy", "dark", "shadow"])) return basePath + "magic-swirl.png";
    if (matchMatches(["bio", "miasma", "poison", "venom", "toxin", "bleed"])) return basePath + "poison-bottle.png";

    // Ataques Físicos
    if (matchMatches(["punch", "strike", "fist", "bootshine", "snap", "demolish"])) return basePath + "fist.png";
    if (matchMatches(["kick", "sweep", "leg", "foot"])) return basePath + "high-kick.png";
    if (matchMatches(["slash", "blade", "sword", "edge", "cleave", "riot", "savage", "goring", "royal", "fast blade"])) return basePath + "broadsword.png";
    if (matchMatches(["stab", "pierce", "thrust", "fang", "claw"])) return basePath + "piercing-sword.png";
    if (matchMatches(["spin", "whirl", "cyclone", "aoe"])) return basePath + "spinning-sword.png";
    if (matchMatches(["shot", "shoot", "bullet", "burst", "slug", "clean", "heated", "gun"])) return basePath + "bullet-impacts.png";
    if (matchMatches(["arrow", "bow", "nock", "bite"])) return basePath + "bow-arrow.png";
    if (matchMatches(["axe", "tomahawk", "cleave", "fell"])) return basePath + "battle-axe.png";

    // Buffs e Posturas
    if (matchMatches(["stance", "oath", "grit", "defiance", "aura", "form", "dance", "song", "draw", "play"])) return basePath + "aura.png";
    if (matchMatches(["buff", "increase", "boost", "power", "strength"])) return basePath + "muscle-up.png";
    if (matchMatches(["jump", "leap", "dive", "spineshatter"])) return basePath + "jump-across.png";

    // Limit Break
    if (matchMatches(["limit break", "lb", "meteor", "braver"])) return basePath + "bright-explosion.png";

    // Fallbacks baseados no Job (se o nome não combinou com nada acima)
    const role = JOB_ROLES[job];
    if (job === "Paladin") return basePath + "attached-shield.png";
    if (job === "Warrior") return basePath + "battered-axe.png";
    if (job === "Dark Knight") return basePath + "shattered-sword.png";
    if (job === "Gunbreaker") return basePath + "revolver.png";
    if (role === "Tank") return basePath + "broadsword.png";

    if (job === "White Mage") return basePath + "fairy-wand.png";
    if (job === "Scholar") return basePath + "book-cover.png";
    if (job === "Astrologian") return basePath + "star-swirl.png";
    if (role === "Healer") return basePath + "health-potion.png";

    if (job === "Monk") return basePath + "punch.png";
    if (job === "Dragoon") return basePath + "spear-head.png";
    if (job === "Ninja") return basePath + "shuriken.png";
    if (job === "Samurai") return basePath + "katana.png";
    if (role === "Melee DPS") return basePath + "crossed-swords.png";

    if (job === "Bard") return basePath + "bow-arrow.png";
    if (job === "Machinist") return basePath + "pistol-gun.png";
    if (job === "Dancer") return basePath + "chakram.png";
    if (role === "Ranged DPS") return basePath + "crosshair.png";

    if (job === "Black Mage") return basePath + "wizard-staff.png";
    if (job === "Summoner") return basePath + "evil-book.png";
    if (job === "Red Mage") return basePath + "fencer.png";
    if (role === "Magic DPS") return basePath + "crystal-wand.png";

    return basePath + "knapsack.png"; // Fallback final genérico
}

// 1. Criar estrutura de Pastas no Compêndio (Agora com Subpastas por Nível)
const existingFoldersArray = pack.folders.contents;
const folderCache = new Map(existingFoldersArray.map(f => [f.name, f.id]));

const getOrCreateFolder = async (folderName, parentFolderId = null) => {
    // Definimos uma chave única para o cache pra evitar colisão de "Lv. 1" de Jobs diferentes se a lógica explodir
    const cacheKey = parentFolderId ? `${parentFolderId}_${folderName}` : folderName;
    if (folderCache.has(cacheKey)) return folderCache.get(cacheKey);

    const f = await Folder.create({
        name: folderName,
        type: "Item",
        folder: parentFolderId // ID da pasta pai no V11/V12/V13
    }, { pack: PACK_NAME });

    folderCache.set(cacheKey, f.id);
    return f.id;
};

// Obter conteúdo atual
const existingItems = await pack.getDocuments();
const existingByName = new Map(existingItems.map(i => [i.name, i]));

const allAbilities = [];
for (const [job, abilities] of Object.entries(ABILITIES_DATA)) {
    for (const ability of abilities) {
        allAbilities.push({ ...ability, job });
    }
}

ui.notifications.info(`📚 Populando ${allAbilities.length} habilidades e organizando em subpastas de níveis...`);

for (const ability of allAbilities) {
    try {
        // 1. Pega ou cria a pasta do Job
        const jobFolderId = await getOrCreateFolder(ability.job);

        // 2. Pega ou cria a subpasta do Level (ex: "Lv. 1", "Lv. 5", etc)
        const lvlStr = `Lv. ${ability.level || 1}`;
        const levelFolderId = await getOrCreateFolder(lvlStr, jobFolderId);

        // 3. Define ícone
        let iconToUse = ability.img;
        if (!iconToUse || iconToUse === "icons/svg/mystery-man.svg" || iconToUse === "") {
            iconToUse = getIconForAbility(ability.job, ability.name, ability.description || "");
        }

        const data = {
            name: ability.name,
            type: "ability",
            img: iconToUse,
            folder: levelFolderId, // Associa à subpasta de level final
            system: {
                job: ability.job || "",
                level: ability.level || 1,
                actionType: ability.actionType || "primary",
                range: ability.range || "melee",
                target: ability.target || "single",
                description: ability.description || "",
                cost: {
                    mp: ability.cost?.mp ?? 0,
                    gauge: ability.cost?.gauge ?? 0,
                    limitBreak: ability.cost?.limitBreak ?? 0,
                },
                damage: ability.damage ? {
                    formula: ability.damage.formula || "",
                    type: ability.damage.type || "physical",
                } : { formula: "", type: "physical" },
                healing: ability.healing ? {
                    formula: ability.healing.formula || "",
                } : { formula: "" },
                shield: ability.shield ? {
                    formula: ability.shield.formula || "",
                } : { formula: "" },
                aoeShape: ability.aoeShape || "",
                aoeSize: ability.aoeSize || 0,
                combo: ability.combo ? {
                    isOpener: ability.combo.isOpener || false,
                    requires: ability.combo.requires || "",
                    enables: ability.combo.enables || "",
                } : { isOpener: false, requires: "", enables: "" },
                gaugeGain: ability.gaugeGain || 0,
                positional: ability.positional || {},
            },
        };

        const existing = existingByName.get(ability.name);
        if (existing) {
            await existing.update(data);
            updated++;
        } else {
            await Item.create(data, { pack: PACK_NAME });
            created++;
        }
    } catch (err) {
        console.error(`FFXIV TTRPG | Erro ao criar "${ability.name}":`, err);
        errors++;
    }
}

await pack.configure({ locked: true });

const msg = `✅ Compêndio populado e organizado com Pastas + Ícones!
Criados: ${created} | Atualizados: ${updated} | Erros: ${errors}`;
ui.notifications.info(msg);

ChatMessage.create({
    content: `<div class="ffxiv-chat-card" style="padding:12px">
        <strong>📚 Compêndio Atualizado (V2)</strong><br>
        ✅ Itens com Ícones visuais.<br>
        � Organizado em pastas por Job.<br>
        🔄 Criados: ${created} | Atualizados: ${updated} | Erros: ${errors}
    </div>`,
    speaker: { alias: "Sistema FFXIV" },
});
