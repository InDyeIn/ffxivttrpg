/**
 * FFXIV TTRPG — Macro de Limpeza de Compêndio
 * 
 * COMO USAR:
 * 1. Cole este script em uma Macro de tipo "Script" no Foundry.
 * 2. Execute como GM.
 * 3. Esta macro APAGARÁ TODOS os Items e Pastas do compêndio "ffxivttrpg.abilities".
 * 
 * Use isto antes de executar o "Populate Compendium" se quiser recomeçar do zero 
 * sem criar duplicatas acidentais!
 */

const PACK_NAME = "ffxivttrpg.abilities";

const pack = game.packs.get(PACK_NAME);
if (!pack) {
    ui.notifications.error(`Cuidado! O compêndio "${PACK_NAME}" não foi encontrado.`);
    return;
}

// Confirmação para evitar desastres
new Dialog({
    title: "⚠️ Limpar Compêndio FFXIV",
    content: `<p>Tem certeza que deseja apagar <strong>TUDO</strong> do compêndio <em>${pack.title}</em>?</p>
              <p style="color:red;">Esta ação é irreversível.</p>`,
    buttons: {
        yes: {
            icon: '<i class="fas fa-trash"></i>',
            label: "Sim, Excluir Tudo",
            callback: async () => {
                ui.notifications.info(`Iniciando purgação do compêndio ${PACK_NAME}...`);

                // Desbloqueia mod
                await pack.configure({ locked: false });

                // 1. Apagar Itens
                const documents = await pack.getDocuments();
                if (documents.length > 0) {
                    const docIds = documents.map(d => d.id);
                    await Item.deleteDocuments(docIds, { pack: PACK_NAME });
                    console.log(`FFXIV TTRPG | Deletados ${docIds.length} Itens do compêndio.`);
                }

                // 2. Apagar Pastas
                const folders = pack.folders.contents;
                if (folders.length > 0) {
                    const folderIds = folders.map(f => f.id);
                    await Folder.deleteDocuments(folderIds, { pack: PACK_NAME });
                    console.log(`FFXIV TTRPG | Deletadas ${folderIds.length} Pastas do compêndio.`);
                }

                // Bloqueia novamente
                await pack.configure({ locked: true });

                ui.notifications.info(`✅ Compêndio limpo! ${documents.length} itens e ${folders.length} pastas removidos.`);
            }
        },
        no: {
            icon: '<i class="fas fa-times"></i>',
            label: "Cancelar"
        }
    },
    default: "no"
}).render(true);
