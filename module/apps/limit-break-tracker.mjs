/**
 * FFXIV TTRPG — Limit Break Tracker
 * App flutuante compartilhado pela party
 */
export class LimitBreakTracker extends Application {

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "ffxiv-limit-break-tracker",
            classes: ["ffxivttrpg", "limit-break-tracker"],
            template: "systems/ffxivttrpg/templates/apps/limit-break.hbs",
            title: "Limit Break",
            width: 340,
            height: "auto",
            resizable: false,
            popOut: true,
        });
    }

    /** Instância singleton */
    static instance = null;

    static getOrCreate() {
        if (!LimitBreakTracker.instance) {
            LimitBreakTracker.instance = new LimitBreakTracker();
        }
        return LimitBreakTracker.instance;
    }

    getData() {
        const raw = game.settings.get("ffxivttrpg", "limitBreakValue") ?? 0;
        // 3 barras de 100 cada
        const bar1 = Math.min(100, raw);
        const bar2 = Math.min(100, Math.max(0, raw - 100));
        const bar3 = Math.min(100, Math.max(0, raw - 200));
        const totalBars = Math.floor(raw / 100);

        return {
            raw,
            bar1, bar2, bar3,
            totalBars,
            canLB1: raw >= 100,
            canLB2: raw >= 200,
            canLB3: raw >= 300,
            isGM: game.user.isGM,
        };
    }

    activateListeners(html) {
        super.activateListeners(html);

        // Botões de uso de LB
        html.on("click", ".lb-use-btn", async (ev) => {
            const level = parseInt(ev.currentTarget.dataset.level);
            await this._useLimitBreak(level);
        });

        // Ajuste manual (GM only)
        if (game.user.isGM) {
            html.on("click", ".lb-add", async () => {
                await FFXIVActor.gainLimitBreak(25);
                this.render();
            });
            html.on("click", ".lb-reset", async () => {
                await game.settings.set("ffxivttrpg", "limitBreakValue", 0);
                this.render();
            });
        }
    }

    async _useLimitBreak(level) {
        const current = game.settings.get("ffxivttrpg", "limitBreakValue") ?? 0;
        const cost = level * 100;
        if (current < cost) {
            ui.notifications.warn(`Limit Break ${level} requer ${cost} de gauge!`);
            return;
        }

        const lbNames = {
            1: "Limit Break Nível 1",
            2: "Limit Break Nível 2",
            3: "Limit Break Nível 3",
        };

        await game.settings.set("ffxivttrpg", "limitBreakValue", current - cost);
        ChatMessage.create({
            content: `<div class="ffxiv-lb-message">
                <div class="lb-title">⚡ LIMIT BREAK! ⚡</div>
                <div class="lb-name">${lbNames[level]}</div>
                <div class="lb-desc">A party desencadeou o Limit Break de Nível ${level}!</div>
            </div>`,
        });
        this.render();
    }
}

import { FFXIVActor } from "../documents/actor.mjs";
