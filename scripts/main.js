import { registerSettings } from "./settings.js";
import { setupUI } from "./ui.js";

Hooks.once('init', async function () {
    console.log("FFXIV TTRPG NPC Generator | Initializing module");

    // Register custom module settings
    registerSettings();
});

Hooks.once('ready', async function () {
    console.log("FFXIV TTRPG NPC Generator | Ready");
});

// Hook into the rendering of the Actors Directory sidebar to add our button
Hooks.on("renderActorDirectory", (app, html, data) => {
    setupUI(app, html, data);
});
