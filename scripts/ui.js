import { generateNpcWithAi } from "./ai-handler.js";

export function setupUI(app, html, data) {
    if (!game.user.isGM) return; // Only allow GM to generate NPCs

    const buttonText = game.i18n.localize("FFXIVGEN.UI.GenerateButton");
    const buttonHtml = `
        <button class="ffxiv-generate-npc" type="button" style="flex: 0 0 100%; margin-top: 5px;">
            <i class="fas fa-robot"></i> ${buttonText}
        </button>
    `;

    const headerActions = html.find('.directory-header .header-actions');
    if (headerActions.length > 0) {
        headerActions.append(buttonHtml);
    } else {
        html.find('.directory-header').append(`<div class="header-actions action-buttons flexrow">${buttonHtml}</div>`);
    }

    html.on('click', '.ffxiv-generate-npc', (ev) => {
        ev.preventDefault();
        openGeneratorDialog();
    });
}

function openGeneratorDialog() {
    // Check if API key exists
    const apiKey = game.settings.get("ffxivttrpg-npc-generator", "openaiApiKey");
    if (!apiKey) {
        ui.notifications.warn(game.i18n.localize("FFXIVGEN.Error.NoApiKey"));
        return;
    }

    const content = `
        <form id="ffxiv-generator-form">
            <div class="form-group">
                <label>${game.i18n.localize("FFXIVGEN.Dialog.PromptLabel")}</label>
                <textarea name="prompt" rows="4" placeholder="e.g. A hulking level 10 Roegadyn gladiator clad in dark iron armor, wielding a massive axe."></textarea>
            </div>
            <div class="form-group">
                <label>${game.i18n.localize("FFXIVGEN.Dialog.ImageUrlLabel")}</label>
                <input type="text" name="imageUrl" placeholder="https://example.com/image.jpg"/>
            </div>
        </form>
    `;

    new Dialog({
        title: game.i18n.localize("FFXIVGEN.Dialog.Title"),
        content: content,
        buttons: {
            generate: {
                icon: '<i class="fas fa-magic"></i>',
                label: game.i18n.localize("FFXIVGEN.Dialog.Submit"),
                callback: async (html) => {
                    const prompt = html.find('[name="prompt"]').val();
                    const imageUrl = html.find('[name="imageUrl"]').val();

                    if (!prompt && !imageUrl) {
                        ui.notifications.warn("Please provide either a prompt or an image URL.");
                        return;
                    }

                    ui.notifications.info(game.i18n.localize("FFXIVGEN.Dialog.Generating"));

                    try {
                        await generateNpcWithAi(prompt, imageUrl);
                        ui.notifications.info("NPC generated successfully!");
                    } catch (error) {
                        console.error("FFXIV TTRPG Generator | Error generating NPC:", error);
                        ui.notifications.error("Failed to generate NPC. Check console for details.");
                    }
                }
            },
            cancel: {
                icon: '<i class="fas fa-times"></i>',
                label: game.i18n.localize("FFXIVGEN.Dialog.Cancel")
            }
        },
        default: "generate"
    }).render(true);
}
