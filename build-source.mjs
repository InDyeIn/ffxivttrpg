import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

import { WEAPONS_DATA, ARMORS_DATA, CONSUMABLES_DATA } from './module/data/items-data.mjs';
import { RACES_DATA } from './module/data/races-data.mjs';
import { CLASSES_DATA } from './module/data/classes-data.mjs';

function generateId() {
    return crypto.randomBytes(8).toString('hex');
}

function writeJson(dir, filename, data) {
    const fullPath = path.join(dir, `${filename}.json`);
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
    console.log(`Wrote: ${fullPath}`);
}

const outWeapons = path.join(process.cwd(), "src/packs/weapons");
const outArmors = path.join(process.cwd(), "src/packs/armors");
const outConsumables = path.join(process.cwd(), "src/packs/consumables");
const outRaces = path.join(process.cwd(), "src/packs/races");
const outClasses = path.join(process.cwd(), "src/packs/classes");

function sanitizeName(name) {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

console.log("Building Weapons...");
for (const w of WEAPONS_DATA) {
    const id = generateId();
    const doc = {
        name: w.name,
        type: "weapon",
        img: "icons/svg/sword.svg",
        system: {
            weaponType: w.weaponType,
            roles: w.roles,
            damage: { formula: w.formula, type: "physical", attribute: w.damageAttr },
            defense: w.defense,
            speed: w.speed,
            price: w.price,
            rarity: w.rarity,
            equipped: false
        },
        _id: id,
        _key: `!items!${id}`
    };
    writeJson(outWeapons, sanitizeName(w.name), doc);
}

console.log("Building Armors...");
for (const a of ARMORS_DATA) {
    const id = generateId();
    const doc = {
        name: a.name,
        type: "armor",
        img: "icons/svg/shield.svg",
        system: {
            armorType: a.armorType,
            roles: a.roles,
            defense: a.defense,
            magicDefense: a.magicDefense,
            speed: a.speed,
            price: a.price,
            rarity: a.rarity,
            equipped: false
        },
        _id: id,
        _key: `!items!${id}`
    };
    writeJson(outArmors, sanitizeName(a.name), doc);
}

console.log("Building Consumables...");
for (const c of CONSUMABLES_DATA) {
    const id = generateId();
    const doc = {
        name: c.name,
        type: "consumable",
        img: "icons/svg/potion.svg",
        system: {
            consumableType: c.consumableType,
            effect: c.effect,
            price: c.price,
            quantity: 1,
            uses: { value: c.uses, max: c.uses, autoDestroy: c.autoDestroy }
        },
        _id: id,
        _key: `!items!${id}`
    };
    writeJson(outConsumables, sanitizeName(c.name), doc);
}

console.log("Building Races...");
fs.mkdirSync(outRaces, { recursive: true });

for (const raceName of Object.keys(RACES_DATA)) {
    const raceData = RACES_DATA[raceName];

    // Main Race Item
    const idRace = generateId();
    const raceDoc = {
        name: raceData.name,
        type: "race", // V2 Modular Item
        img: "icons/svg/mystery-man.svg",
        system: {
            baseAttributeBonus: raceData.baseAttributeBonus,
            description: `Raça Base: ${raceData.name}`
        },
        _id: idRace,
        _key: `!items!${idRace}`
    };
    writeJson(outRaces, sanitizeName(raceName), raceDoc);

    // Tribes as Subclasses / Features
    for (const tribe of raceData.tribes) {
        const idTribe = generateId();
        const tribeDoc = {
            name: `${raceData.name} — ${tribe.name}`,
            type: "subclass", // V2 Tribe
            img: "icons/svg/mystery-man.svg",
            system: {
                classIdentifier: raceData.name.toLowerCase(),
                description: `**Sub-raça:** ${tribe.name}\n\n**STATUS:** ${tribe.stats}\n\n**TRAITS:**\n${tribe.traits.map(t => `- **${t.name}**: ${t.effect}`).join('\n')}`
            },
            _id: idTribe,
            _key: `!items!${idTribe}`
        };
        writeJson(outRaces, sanitizeName(`${raceName}-${tribe.name}`), tribeDoc);
    }
}

console.log("Building Classes (Jobs)...");
fs.mkdirSync(outClasses, { recursive: true });

for (const c of CLASSES_DATA) {
    const id = generateId();
    const doc = {
        name: c.name,
        type: "class", // V2 Modular Item
        img: "icons/svg/combat.svg",
        system: {
            description: c.description,
            role: c.role,
            levels: 1, // Start at 1 when dragged
            xp: { value: 0, max: 1000 },
            primaryStat: c.primaryStat,
            hpFormula: c.hpFormula,
            gaugeType: c.gaugeType
        },
        _id: id,
        _key: `!items!${id}`
    };
    writeJson(outClasses, sanitizeName(c.name), doc);
}

console.log("Finished converting raw data into Source JSON packs.");
