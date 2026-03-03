/**
 * FFXIV TTRPG — Dados de Itens Principais (Armas, Armaduras, Consumíveis)
 */

export const WEAPONS_DATA = [
    { name: "Iron Sword", weaponType: "sword", roles: ["paladin"], damageAttr: "str", formula: "1d6", defense: 0, speed: 0, rarity: "common", price: 100 },
    { name: "Steel Axe", weaponType: "axe", roles: ["warrior"], damageAttr: "str", formula: "1d8", defense: 0, speed: 0, rarity: "common", price: 150 },
    { name: "Oak Cane", weaponType: "cane", roles: ["whitemage"], damageAttr: "mnd", formula: "1d4", defense: 0, speed: 0, rarity: "common", price: 80 },
    { name: "Heavy Greatsword", weaponType: "greatsword", roles: ["darkknight"], damageAttr: "str", formula: "2d6", defense: 0, speed: -1, rarity: "uncommon", price: 300 },
    { name: "Grimoire of Erudition", weaponType: "grimoire", roles: ["scholar", "summoner"], damageAttr: "int", formula: "1d6", defense: 0, speed: 0, rarity: "uncommon", price: 250 },
    { name: "Star Globe", weaponType: "globe", roles: ["astrologian"], damageAttr: "mnd", formula: "1d4", defense: 0, speed: 0, rarity: "uncommon", price: 250 },
    { name: "Iron Knuckles", weaponType: "knuckles", roles: ["monk"], damageAttr: "str", formula: "1d6", defense: 0, speed: 1, rarity: "common", price: 120 },
    { name: "Mythril Spear", weaponType: "spear", roles: ["dragoon"], damageAttr: "str", formula: "1d8", defense: 0, speed: 0, rarity: "common", price: 180 },
    { name: "Steel Daggers", weaponType: "daggers", roles: ["ninja"], damageAttr: "dex", formula: "1d4", defense: 0, speed: 2, rarity: "common", price: 140 },
    { name: "Uchigatana", weaponType: "katana", roles: ["samurai"], damageAttr: "str", formula: "1d8", defense: 0, speed: 1, rarity: "uncommon", price: 220 },
    { name: "Yew Bow", weaponType: "bow", roles: ["bard"], damageAttr: "dex", formula: "1d6", defense: 0, speed: 0, rarity: "common", price: 150 },
    { name: "Musketoon", weaponType: "firearm", roles: ["machinist"], damageAttr: "dex", formula: "1d8", defense: 0, speed: 0, rarity: "common", price: 200 },
    { name: "Lilith Rod", weaponType: "rod", roles: ["blackmage"], damageAttr: "int", formula: "1d6", defense: 0, speed: 0, rarity: "rare", price: 500 }
];

export const ARMORS_DATA = [
    { name: "Cotton Robe", armorType: "cloth", roles: ["whitemage", "blackmage", "scholar", "summoner", "astrologian"], defense: 1, magicDefense: 3, speed: 0, rarity: "common", price: 50 },
    { name: "Leather Jacket", armorType: "light", roles: ["monk", "ninja", "bard", "machinist"], defense: 2, magicDefense: 2, speed: 1, rarity: "common", price: 80 },
    { name: "Chainmail", armorType: "heavy", roles: ["paladin", "warrior", "darkknight", "dragoon", "samurai"], defense: 4, magicDefense: 1, speed: -1, rarity: "common", price: 150 },
    { name: "Mythril Cuirass", armorType: "heavy", roles: ["paladin", "warrior", "darkknight"], defense: 6, magicDefense: 2, speed: -2, rarity: "uncommon", price: 400 },
    { name: "Kite Shield", armorType: "shield", roles: ["paladin"], defense: 2, magicDefense: 0, speed: 0, rarity: "common", price: 100 }
];

export const CONSUMABLES_DATA = [
    { name: "Potion", consumableType: "potion", uses: 1, effect: "Cura 2d4 + 2 HP.", price: 50, autoDestroy: true },
    { name: "Hi-Potion", consumableType: "potion", uses: 1, effect: "Cura 4d4 + 4 HP.", price: 150, autoDestroy: true },
    { name: "Ether", consumableType: "ether", uses: 1, effect: "Restaura 2 MP.", price: 100, autoDestroy: true },
    { name: "Phoenix Down", consumableType: "revive", uses: 1, effect: "Revive um aliado alvo com 1 HP.", price: 300, autoDestroy: true },
    { name: "Antidote", consumableType: "remedy", uses: 1, effect: "Remove o status Poison.", price: 40, autoDestroy: true },
    { name: "Elixir", consumableType: "elixir", uses: 1, effect: "Restaura HP e MP aos máximos.", price: 1000, autoDestroy: true }
];
