// Data source para as Classes (Jobs) V2 do FFXIV TTRPG
export const CLASSES_DATA = [
    {
        name: "Paladin",
        role: "tank",
        description: "Os cavaleiros juramentados de Ul'dah. Especialistas em mitigar dano e proteger os fracos com magia sagrada.",
        primaryStat: "str",
        hpFormula: "1d10 + @vit",
        mpMax: 5,
        gaugeType: "none",
        levels: {
            1: {
                features: ["Oath of Sword", "Shield Lob"],
            },
            2: {
                features: ["Fight or Flight"],
            },
            3: {
                features: ["Sheltron"],
            }
        }
    },
    {
        name: "Warrior",
        role: "tank",
        description: "Bárbaros furiosos que descendem das montanhas de Abalathia. Eles não usam magia, apenas fúria contida.",
        primaryStat: "str",
        hpFormula: "1d12 + @vit",
        mpMax: 3,
        gaugeType: "bar",
        levels: {
            1: {
                features: ["Defiance", "Tomahawk"],
            },
            2: {
                features: ["Berserk"],
            },
            3: {
                features: ["Inner Beast"],
            }
        }
    },
    {
        name: "White Mage",
        role: "healer",
        description: "Conjuradores antigos de Gridania. Mestres do elemento vento e terra, e da pura magia curativa.",
        primaryStat: "mnd",
        hpFormula: "1d6 + @vit",
        mpMax: 8,
        gaugeType: "spheres",
        levels: {
            1: {
                features: ["Cure", "Stone"],
            },
            2: {
                features: ["Aero"],
            },
            3: {
                features: ["Medica"],
            }
        }
    },
    {
        name: "Black Mage",
        role: "magical",
        description: "Mestres da destruição e da feitiçaria profana de Mhach. Inigualáveis na arte de explodir coisas.",
        primaryStat: "int",
        hpFormula: "1d6 + @vit",
        mpMax: 10,
        gaugeType: "element",
        levels: {
            1: {
                features: ["Fire", "Blizzard"],
            },
            2: {
                features: ["Enochian"],
            },
            3: {
                features: ["Ley Lines"],
            }
        }
    }
];
