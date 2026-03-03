// Data source para Armas, Armaduras e Consumíveis

export const WEAPONS_DATA = [
    { name: "Iron Sword", weaponType: "sword", roles: ["tank", "melee"], formula: "1d6", damageAttr: "str", defense: 0, speed: 0, price: 100, rarity: "common" },
    { name: "Bronze Axe", weaponType: "axe", roles: ["tank", "melee"], formula: "1d8", damageAttr: "str", defense: 0, speed: 0, price: 120, rarity: "common" },
    { name: "Maple Wand", weaponType: "cane", roles: ["healer"], formula: "1d4", damageAttr: "mnd", defense: 0, speed: 0, price: 80, rarity: "common" },
    { name: "Ash Staff", weaponType: "staff", roles: ["magical"], formula: "1d6", damageAttr: "int", defense: 0, speed: 0, price: 90, rarity: "common" }
];

export const ARMORS_DATA = [
    { name: "Bronze Plate", armorType: "heavy", roles: ["tank"], defense: 3, magicDefense: 0, speed: -1, price: 150, rarity: "common" },
    { name: "Leather Jacket", armorType: "light", roles: ["melee", "ranged"], defense: 1, magicDefense: 1, speed: 0, price: 100, rarity: "common" },
    { name: "Cotton Robe", armorType: "cloth", roles: ["magical", "healer"], defense: 0, magicDefense: 3, speed: 0, price: 80, rarity: "common" }
];

export const CONSUMABLES_DATA = [
    { name: "Potion", consumableType: "potion", effect: "Recupera 1d6 + 2 HP", price: 50, uses: 1, autoDestroy: true },
    { name: "Ether", consumableType: "potion", effect: "Recupera 1d4 MP", price: 80, uses: 1, autoDestroy: true }
];
