// Data source para as Raças (Race e Subclass/Tribe) do FFXIV TTRPG V2
export const RACES_DATA = {
    "Hyur": {
        name: "Hyur",
        baseAttributeBonus: { str: 0, dex: 0, vit: 0, int: 0, mnd: 0 },
        tribes: [
            {
                name: "Midlander",
                stats: "FOR 10, DES 10, VIT 9, INT 10, MEN 10",
                bonuses: { str: 0, dex: 0, vit: -1, int: 0, mnd: 0 },
                traits: [
                    { name: "Povo Instruído", effect: "Você recebe +1 em testes de Inteligência e Sabedoria." }
                ]
            },
            {
                name: "Highlander",
                stats: "FOR 11, DES 10, VIT 11, INT 8, MEN 9",
                bonuses: { str: 1, dex: 0, vit: 1, int: -2, mnd: -1 },
                traits: [
                    { name: "Constituição Robusta", effect: "Aumente seu HP máximo base em 2." }
                ]
            }
        ]
    },
    "Elezen": {
        name: "Elezen",
        baseAttributeBonus: { str: 0, dex: 0, vit: 0, int: 0, mnd: 0 },
        tribes: [
            {
                name: "Wildwood",
                stats: "FOR 9, DES 11, VIT 9, INT 11, MEN 9",
                bonuses: { str: -1, dex: 1, vit: -1, int: 1, mnd: -1 },
                traits: [
                    { name: "Visão Florestal", effect: "Você pode atirar ou usar magias com +1 de alcance máximo." }
                ]
            },
            {
                name: "Duskwight",
                stats: "FOR 10, DES 10, VIT 9, INT 11, MEN 9",
                bonuses: { str: 0, dex: 0, vit: -1, int: 1, mnd: -1 },
                traits: [
                    { name: "Audição Apurada", effect: "Vantagem em testes de Percepção em locais escuros." }
                ]
            }
        ]
    },
    // Adicionando um resumo de Roegadyn para testes
    "Roegadyn": {
        name: "Roegadyn",
        baseAttributeBonus: { str: 0, dex: 0, vit: 0, int: 0, mnd: 0 },
        tribes: [
            {
                name: "Sea Wolf",
                stats: "FOR 11, DES 9, VIT 11, INT 8, MEN 10",
                bonuses: { str: 1, dex: -1, vit: 1, int: -2, mnd: 0 },
                traits: [
                    { name: "Vigor dos Mares", effect: "Reduz qualquer dano de Água sofrido em 2." }
                ]
            },
            {
                name: "Hellsguard",
                stats: "FOR 10, DES 9, VIT 11, INT 9, MEN 10",
                bonuses: { str: 0, dex: -1, vit: 1, int: -1, mnd: 0 },
                traits: [
                    { name: "Casca Vulcânica", effect: "Reduz qualquer dano de Fogo sofrido em 2." }
                ]
            }
        ]
    }
};
