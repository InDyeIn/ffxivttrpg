const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * FFXIV TTRPG — Action Bar HUD
 * Inspirado no HUD do jogo, exibe as habilidades equipadas nas actions
 */
export class FFXIVActionBar extends HandlebarsApplicationMixin(ApplicationV2) {
    static DEFAULT_OPTIONS = {
        id: "ffxiv-action-bar",
        classes: ["ffxiv-hud", "action-bar"],
        tag: "div",
        window: {
            frame: false,
            positioned: true,
            controls: []
        },
        position: {
            width: "auto",
            height: "auto",
            // Posiciona na base da tela via CSS
        }
    };

    static PARTS = {
        content: {
            template: "systems/ffxivttrpg/templates/hud/action-bar.hbs"
        }
    };

    /**
     * O Action Bar segue o personagem controlado pelo jogador atual.
     */
    get actor() {
        return game.user.character || (canvas.tokens.controlled[0] ? canvas.tokens.controlled[0].actor : null);
    }

    async _prepareContext(options) {
        const actor = this.actor;
        if (!actor) return { show: false };

        const sys = actor.system;
        const job = sys.job?.name || "Adventurer";

        // Puxa as habilidades na aba da Action Bar
        const abilities = actor.items.filter(i => i.type === "ability");

        // Separar habilidades por custo de ação pra UI
        const primary = abilities.filter(a => a.system.actionType === "primary");
        const secondary = abilities.filter(a => a.system.actionType === "secondary");
        const instant = abilities.filter(a => a.system.actionType === "instant");

        return {
            show: true,
            actor: actor,
            job: job,
            actions: sys.actions,
            primary: primary,
            secondary: secondary,
            instant: instant,
            gauge: sys.gauge,
            FFXIV: CONFIG.FFXIV
        };
    }

    /**
     * Listeners de cliques no Action Bar
     */
    _attachPartListeners(partId, htmlElement, options) {
        super._attachPartListeners(partId, htmlElement, options);
        const html = $(htmlElement);

        html.on("click", ".action-slot", async (ev) => {
            const itemId = ev.currentTarget.dataset.itemId;
            const actor = this.actor;
            if (!actor || !itemId) return;

            const item = actor.items.get(itemId);
            if (item) {
                // Rola a habilidade
                await item.system.rollAbility(item, actor);
                // Fecha a UI atualizada apos rolar, idealmente re-renderiza
                this.render(true);
            }
        });
    }

    /**
     * Override no fechamento. A Action Bar geralmente não fecha, 
     * a não ser que GM force.
     */
    close(options) {
        // Impedir fechamento acidental a menos que forced (options.force)
        if (!options || !options.force) return Promise.resolve();
        return super.close(options);
    }
}
