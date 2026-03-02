import { generateNpcWithAi } from "./ai-handler.js";

export function setupUI(app, html, data) {
    if (!game.user.isGM) return; // Only allow GM to generate NPCs

    const buttonHtml = `
        <div class="action-buttons flexrow">
            <button class="ffxiv-generate-npc" type="button">
                <i class="fas fa-robot"></i> ${game.i18n.localize("FFXIVGEN.UI.GenerateButton")}
            </button>
        </div>
    `;

    // Try finding the directory header to inject the button
    const header = html.find('.directory-header');
    if (header.length > 0) {
        header.append(buttonHtml);
    } else {
        html.find('.header-actions').append(buttonHtml); // fallback
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
