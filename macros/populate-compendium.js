/**
 * FFXIV TTRPG — Macro de Populate do Compêndio de Habilidades
 * 
 * COMO USAR:
 * 1. Certifique-se de que os Compêndios "ffxivttrpg.abilities" existem no sistema
 * 2. Cole este script em uma Macro de tipo "Script" no Foundry
 * 3. Execute como GM
 * 4. Aguarde — as habilidades serão criadas automaticamente nos compêndios
 *
 * Este script lê os dados de ABILITIES_DATA e cria/atualiza Items no compêndio.
 */

// Importação dinâmica do arquivo de dados
const { ABILITIES_DATA } = await import("systems/ffxivttrpg/module/data/abilities-data.mjs");

// Nome do compêndio onde as habilidades serão salvas
const PACK_NAME = "ffxivttrpg.abilities";

// Obter o compêndio
const pack = game.packs.get(PACK_NAME);
if (!pack) {
    ui.notifications.error(`Compêndio "${PACK_NAME}" não encontrado! Verifique o system.json.`);
    return;
}

// Desbloquear compêndio para edição
await pack.configure({ locked: false });

// Contador
let created = 0;
let updated = 0;
let errors = 0;

// Função auxiliar: converte dados da habilidade para o formato do sistema
function toItemData(abilData) {
    const data = {
        name: abilData.name,
        type: "ability",
        img: abilData.img || "icons/svg/mystery-man.svg",
        system: {
            job: abilData.job || "",
            level: abilData.level || 1,
            actionType: abilData.actionType || "primary",
            range: abilData.range || "melee",
            target: abilData.target || "single",
            description: abilData.description || "",
            cost: {
                mp: abilData.cost?.mp ?? 0,
                gauge: abilData.cost?.gauge ?? 0,
                limitBreak: abilData.cost?.limitBreak ?? 0,
            },
            damage: abilData.damage ? {
                formula: abilData.damage.formula || "",
                type: abilData.damage.type || "physical",
            } : { formula: "", type: "physical" },
            healing: abilData.healing ? {
                formula: abilData.healing.formula || "",
            } : { formula: "" },
            shield: abilData.shield ? {
                formula: abilData.shield.formula || "",
            } : { formula: "" },
            aoeShape: abilData.aoeShape || "",
            aoeSize: abilData.aoeSize || 0,
            combo: abilData.combo ? {
                isOpener: abilData.combo.isOpener || false,
                requires: abilData.combo.requires || "",
                enables: abilData.combo.enables || "",
            } : { isOpener: false, requires: "", enables: "" },
            gaugeGain: abilData.gaugeGain || 0,
            positional: abilData.positional || {},
        },
    };
    return data;
}

// Processar todos os jobs
const allAbilities = [];
for (const [job, abilities] of Object.entries(ABILITIES_DATA)) {
    for (const ability of abilities) {
        allAbilities.push({ ...ability, job });
    }
}

ui.notifications.info(`📚 Populando compêndio com ${allAbilities.length} habilidades...`);

// Obter conteúdo atual do compêndio
const existingItems = await pack.getDocuments();
const existingByName = new Map(existingItems.map(i => [i.name, i]));

for (const ability of allAbilities) {
    try {
        const itemData = toItemData(ability);
        const existing = existingByName.get(ability.name);

        if (existing) {
            // Atualizar existente
            await existing.update(itemData);
            updated++;
        } else {
            // Criar novo
            await Item.create(itemData, { pack: PACK_NAME });
            created++;
        }
    } catch (err) {
        console.error(`FFXIV TTRPG | Erro ao criar "${ability.name}":`, err);
        errors++;
    }
}

// Re-lock compêndio
await pack.configure({ locked: true });

// Relatório final
const msg = `✅ Compêndio populado!
📝 Criados: ${created}
🔄 Atualizados: ${updated}
❌ Erros: ${errors}`;

ui.notifications.info(msg);
console.log("FFXIV TTRPG | Populate concluído:", { created, updated, errors });
ChatMessage.create({
    content: `<div class="ffxiv-chat-card" style="padding:12px">
        <strong>📚 Compêndio Populado!</strong><br>
        ✅ Criados: <strong>${created}</strong><br>
        🔄 Atualizados: <strong>${updated}</strong><br>
        ❌ Erros: <strong>${errors}</strong><br>
        Total: <strong>${created + updated}</strong> habilidades
    </div>`,
    speaker: { alias: "Sistema FFXIV" },
});
