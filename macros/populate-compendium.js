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

// Heurística visual para ícones pré-instalados no Foundry
function getIconForAbility(job, name, desc) {
    const n = name.toLowerCase();

    // 1. Palavras Chave Específicas
    if (n.includes("cure") || n.includes("heal") || n.includes("medica") || n.includes("benefic") || n.includes("adloquium"))
        return "icons/svg/heal.svg";
    if (n.includes("raise") || n.includes("resurrection") || n.includes("ascend"))
        return "icons/svg/angel.svg";
    if (n.includes("shield") || n.includes("rampart") || n.includes("wall") || n.includes("barrier") || n.includes("succor"))
        return "icons/svg/shield.svg";
    if (n.includes("fire") || n.includes("fira") || n.includes("flare"))
        return "icons/svg/fire.svg";
    if (n.includes("blizzard") || n.includes("freeze"))
        return "icons/svg/ice-aura.svg";
    if (n.includes("thunder") || n.includes("lightning"))
        return "icons/svg/lightning.svg";
    if (n.includes("aero") || n.includes("stone") || n.includes("glare") || n.includes("holy") || n.includes("ruin"))
        return "icons/svg/sun.svg";
    if (n.includes("provoke") || n.includes("enmity") || n.includes("taunt"))
        return "icons/svg/target.svg";
    if (n.includes("limit break") || n.includes("lb"))
        return "icons/svg/explosion.svg";

    // 2. Baseado no Job/Role
    const role = JOB_ROLES[job];
    if (role === "Tank") return "icons/svg/sword.svg";
    if (role === "Healer") return "icons/svg/regen.svg";
    if (role === "Melee DPS") return "icons/svg/combat.svg";
    if (role === "Ranged DPS") return "icons/svg/target.svg";
    if (role === "Magic DPS") return "icons/svg/daze.svg";

    return "icons/svg/item-bag.svg"; // Fallback final
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
