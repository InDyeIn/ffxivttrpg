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
                await pack.configure({ locked: false });

                const docs = await pack.getDocuments();
                if (docs.length > 0) {
                    const docIds = docs.map(d => d.id);
                    await Item.deleteDocuments(docIds, { pack: PACK_NAME });
                }

                const folderIds = Array.from(pack.folders.keys());
                if (folderIds.length > 0) {
                    await Folder.deleteDocuments(folderIds, { pack: PACK_NAME });
                }

                await pack.configure({ locked: true });
                ui.notifications.info(`✅ Compêndio limpo! ${docs.length} itens e ${folderIds.length} pastas removidos.`);
                console.log(`FFXIV TTRPG | Limpeza: ${docs.length} Itens e ${folderIds.length} Pastas removidas.`);
            }
        },
        no: {
            icon: '<i class="fas fa-times"></i>',
            label: "Cancelar"
        }
    },
    default: "no"
}).render(true);
