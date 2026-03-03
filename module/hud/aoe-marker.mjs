/**
 * FFXIV TTRPG — AOE Markers System (V13 Compatible)
 * Cria marcadores visuais (Drawings) laranjas pulsantes no Canvas para indicar ataques
 */

export class FFXIVAoeMarker {

    /**
     * Tenta colocar um marcador no campo, que ficará salvo na array pendingAOEs do combat.mjs
     * @param {Token} source - Token de quem castou o AOE
     * @param {Object} aoeData - Formato do AOE (shape, size) e dados do ataque
     * @param {String} formula - Formula a rolar na Round Up
     */
    static async placeMarker(source, ability, aoeData, damageFormula) {
        // V13 usa objetos de Desenho (Drawings)
        // Lógica de forma (Shape)
        let shapeType = CONST.DRAWING_TYPES.ELLIPSE;
        let width = aoeData.size * (canvas.dimensions.distance || 1);
        let height = width;
        let points = [];
        let rotation = source.document.rotation || 0;

        if (aoeData.shape === "cone") {
            shapeType = CONST.DRAWING_TYPES.POLYGON;
            // Cálculo rudimentar de cone: Triângulo
            // Largura = size, Altura = size
            points = [[0, 0], [width / 2, height], [-width / 2, height]];
        } else if (aoeData.shape === "line") {
            shapeType = CONST.DRAWING_TYPES.RECTANGLE;
            width = (aoeData.size / 2) * canvas.dimensions.distance; // exp: largura menor, comprimento longo
            height = aoeData.size * canvas.dimensions.distance;
        }

        const drawingData = {
            author: game.user.id,
            shape: {
                type: shapeType,
                width: width,
                height: height,
                points: points
            },
            x: source.center.x - (width / 2),
            y: source.center.y - (height / 2),
            rotation: rotation,
            fillType: CONST.DRAWING_FILL_TYPES.SOLID,
            fillColor: "#ffaa00",
            fillAlpha: 0.5,
            strokeWidth: 2,
            strokeColor: "#ff0000",
            strokeAlpha: 1.0,
            text: `AOE: ${ability.name} \n Delay: ${aoeData.delay || 1}`,
            fontFamily: "Signika",
            fontSize: 24,
            textColor: "#ffffff",
            hidden: false
        };

        // Cria no Canvas
        const drawingDocs = await canvas.scene.createEmbeddedDocuments("Drawing", [drawingData]);
        const createdDrawingId = drawingDocs[0].id;

        // Se houver combate, registra pra resolver na turn-up phase
        if (game.combat) {
            const combatMod = game.combat;
            const existingPending = combatMod.getFlag("ffxivttrpg", "pendingAOEs") || [];

            existingPending.push({
                name: ability.name,
                templateId: createdDrawingId, // Usamos reference a esse ID no desenho
                formula: damageFormula,
                delayRounds: aoeData.delay || 1
            });

            await combatMod.setFlag("ffxivttrpg", "pendingAOEs", existingPending);
            ui.notifications.info(`${ability.name} AOE marker placed! Will resolve in Round-Up.`);
        }
    }
}
