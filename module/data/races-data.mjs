/**
 * FFXIV TTRPG — Dados Completos de Raças e Tribos
 * Baseado puramente no FFXIV-TTRPG-Habilidades-Completas.md
 */
export const RACES_DATA = {
    hyur: {
        name: "Hyur",
        tribes: [
            {
                name: "Midlander", stats: "+1 STR, +1 VIT",
                traits: [
                    { name: "Versatilidade Humana", effect: "Vantagem em 1 Check de atributo à escolha." },
                    { name: "Adaptabilidade", effect: "1 vez por sessão, pode rerrolar um Check de qualquer atributo." }
                ]
            },
            {
                name: "Highlander", stats: "+2 STR, +1 VIT",
                traits: [
                    { name: "Punhos de Ferro", effect: "Vantagem em Checks de STR envolvendo força bruta." },
                    { name: "Constituição Robusta", effect: "+2 HP máximo permanente." }
                ]
            }
        ]
    },
    elezen: {
        name: "Elezen",
        tribes: [
            {
                name: "Wildwood", stats: "+1 DEX, +1 INT",
                traits: [
                    { name: "Visão Aguçada", effect: "Vantagem em Checks de MND/INT de percepção visual." },
                    { name: "Sentidos da Floresta", effect: "Nunca é surpreendido em ambientes naturais." }
                ]
            },
            {
                name: "Duskwight", stats: "+1 INT, +1 MND",
                traits: [
                    { name: "Audição Sobrenatural", effect: "Vantagem em Checks de MND para detectar stealth." },
                    { name: "Filho das Sombras", effect: "Vantagem em Checks de DEX para stealth em pouca luz." }
                ]
            }
        ]
    },
    lalafell: {
        name: "Lalafell",
        tribes: [
            {
                name: "Plainsfolk", stats: "+1 DEX, +1 MND",
                traits: [
                    { name: "Ágil como o Vento", effect: "Vantagem em Checks acrobáticos e de escape." },
                    { name: "Perspicácia Comercial", effect: "Vantagem em Checks de avaliação e persuasão." }
                ]
            },
            {
                name: "Dunesfolk", stats: "+1 DEX, +1 INT",
                traits: [
                    { name: "Resistência Arcana", effect: "Reduz o dano de magias recebidas em 1." },
                    { name: "Leitura das Estrelas", effect: "Vantagem em interpretação de astrologia e textos antigos." }
                ]
            }
        ]
    },
    miqote: {
        name: "Miqo'te",
        tribes: [
            {
                name: "Seekers of the Sun", stats: "+1 STR, +1 DEX",
                traits: [
                    { name: "Instinto Predatório", effect: "Vantagem em rastreamento e detecção." },
                    { name: "Garras Afiadas", effect: "Pode usar ataques desarmados como arma de 1d4 Physical." }
                ]
            },
            {
                name: "Keepers of the Moon", stats: "+1 DEX, +1 MND",
                traits: [
                    { name: "Visão Noturna", effect: "Imunidade a penalidades de escuridão." },
                    { name: "Laços do Grupo", effect: "Vantagem em Checks de empatia com a party." }
                ]
            }
        ]
    },
    roegadyn: {
        name: "Roegadyn",
        tribes: [
            {
                name: "Sea Wolves", stats: "+2 STR, +1 VIT",
                traits: [
                    { name: "Corpo de Ferro", effect: "+3 HP máximo permanente." },
                    { name: "Rugido de Guerra", effect: "Vantagem em intimidação. Aliados ganham +1 Vantagem na próxima jogada." }
                ]
            },
            {
                name: "Hellsguard", stats: "+1 STR, +1 MND",
                traits: [
                    { name: "Resistência ao Fogo", effect: "Reduz dano do tipo Fire em 2." },
                    { name: "Vontade de Aço", effect: "Vantagem em resistir coerção e medo." }
                ]
            }
        ]
    },
    viera: {
        name: "Viera",
        tribes: [
            {
                name: "Rava", stats: "+2 DEX, +1 MND",
                traits: [
                    { name: "Passo Silencioso", effect: "Vantagem em Stealth e ignora penalidade de movimento furtivo." },
                    { name: "Ouvidos das Selvas", effect: "Percepção auditiva a distâncias dobradas." }
                ]
            },
            {
                name: "Veena", stats: "+1 DEX, +1 INT",
                traits: [
                    { name: "Toque da Natureza", effect: "Vantagem em Checks de sobrevivência e naturalismo." },
                    { name: "Ligação Arcana", effect: "Vantagem na identificação de magias e leitura arcana." }
                ]
            }
        ]
    },
    hrothgar: {
        name: "Hrothgar",
        tribes: [
            {
                name: "Helions", stats: "+2 STR, +1 VIT",
                traits: [
                    { name: "Carga do Leão", effect: "Vantagem em Checks físicos como derrubar/empurrar alvos médios." },
                    { name: "Brado Territorial", effect: "Vantagem em checks de intimidação em seus próprios territórios." }
                ]
            },
            {
                name: "The Lost", stats: "+1 STR, +1 DEX, +1 VIT",
                traits: [
                    { name: "Sobrevivente nato", effect: "Vantagem ao sobreviver em ambientes hostis extremos." },
                    { name: "Garras de Predador", effect: "Pode usar ataques desarmados como arma de 1d4 Physical." }
                ]
            }
        ]
    }
};
