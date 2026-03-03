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
    const d = desc.toLowerCase();

    // 1. Palavras Chave Específicas
    if (n.includes("cure") || n.includes("heal") || n.includes("medica") || n.includes("benefic") || n.includes("adloquium"))
        return "icons/magic/life/cross-yellow-green.webp";
    if (n.includes("raise") || n.includes("resurrection") || n.includes("ascend"))
        return "icons/magic/life/heart-cross-blue.webp";
    if (n.includes("shield") || n.includes("rampart") || n.includes("wall") || n.includes("barrier") || n.includes("succor"))
        return "icons/magic/defensive/shield-barrier-blue.webp";
    if (n.includes("fire") || n.includes("fira") || n.includes("flare"))
        return "icons/magic/fire/projectile-meteor-salvo-strong-red.webp";
    if (n.includes("blizzard") || n.includes("freeze"))
        return "icons/magic/water/projectile-ice-snowball.webp";
    if (n.includes("thunder") || n.includes("lightning"))
        return "icons/magic/lightning/bolt-strike-blue.webp";
    if (n.includes("aero") || n.includes("stone") || n.includes("glare") || n.includes("holy") || n.includes("ruin"))
        return "icons/magic/light/projectile-star-yellow.webp";
    if (n.includes("provoke") || n.includes("enmity") || n.includes("taunt"))
        return "icons/skills/social/intimidation-impressing.webp";
    if (n.includes("limit break") || n.includes("lb"))
        return "icons/magic/light/explosion-star-glow-yellow-green.webp";

    // 2. Baseado no Job/Role
    const role = JOB_ROLES[job];
    if (role === "Tank") return "icons/skills/melee/strike-sword-steel-yellow.webp";
    if (role === "Healer") return "icons/magic/life/cross-yellow-green.webp";
    if (role === "Melee DPS") {
        if (job === "Monk") return "icons/skills/melee/unarmed-punch-fist.webp";
        if (job === "Dragoon") return "icons/weapons/polearms/spear-flared-steel.webp";
        return "icons/skills/melee/strike-blade-assassin-blue.webp"; // Ninja/Samurai
    }
    if (role === "Ranged DPS") {
        if (job === "Bard") return "icons/weapons/bows/shortbow-recurve-blue.webp";
        if (job === "Machinist") return "icons/weapons/guns/gun-pistol-flintlock-brown.webp";
    }
    if (role === "Magic DPS") return "icons/magic/fire/projectile-fireball-red.webp";

    return "icons/svg/combat.svg"; // Fallback final
}

// 1. Criar estrutura de Pastas no Compêndio
const existingFolders = pack.folders.contents;
const getOrCreateFolder = async (folderName) => {
    let f = existingFolders.find(x => x.name === folderName);
    if (!f) {
        f = await Folder.create({ name: folderName, type: "Item" }, { pack: PACK_NAME });
    }
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

ui.notifications.info(`📚 Populando ${allAbilities.length} habilidades e organizando em pastas...`);

for (const ability of allAbilities) {
    try {
        const folderId = await getOrCreateFolder(ability.job);

        let iconToUse = ability.img;
        if (!iconToUse || iconToUse === "icons/svg/mystery-man.svg" || iconToUse === "") {
            iconToUse = getIconForAbility(ability.job, ability.name, ability.description || "");
        }

        const data = {
            name: ability.name,
            type: "ability",
            img: iconToUse,
            folder: folderId,
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
