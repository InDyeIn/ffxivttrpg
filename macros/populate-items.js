/**
 * FFXIV TTRPG — Populate Items Compendiums
 * 
 * Uso: Executar esta macro como GM.
 * Ela vai popular os Compendiums "ffxivttrpg.weapons", "ffxivttrpg.armors" e "ffxivttrpg.consumables"
 */

const modulePath = "systems/ffxivttrpg/module/data/items-data.mjs";
const itemsModule = await import(`../../../${modulePath}`);
if (!itemsModule) {
    ui.notifications.error("Could not load Items Data.");
    return;
}

const { WEAPONS_DATA, ARMORS_DATA, CONSUMABLES_DATA } = itemsModule;

async function populateCompendium(packName, dataList, type, mapDataFunc) {
    const pack = game.packs.get(`ffxivttrpg.${packName}`);
    if (!pack) {
        ui.notifications.error(`Pack ffxivttrpg.${packName} not found.`);
        return;
    }

    ui.notifications.info(`Clearing and populating ${packName}...`);
    const index = await pack.getIndex();
    for (const doc of index) {
        const item = await pack.getDocument(doc._id);
        await item.delete();
    }

    const createdItems = [];
    for (const itemData of dataList) {
        const mappedData = mapDataFunc(itemData);
        const itemDoc = new Item.implementation({
            name: itemData.name,
            type: type,
            system: mappedData
        });
        const created = await pack.importDocument(itemDoc);
        createdItems.push(created);
    }

    ui.notifications.info(`Successfully created ${createdItems.length} items in ${packName}!`);
}

function mapWeapon(data) {
    return {
        weaponType: data.weaponType,
        roles: data.roles,
        damage: {
            formula: data.formula,
            type: "physical",
            attribute: data.damageAttr
        },
        defense: data.defense,
        speed: data.speed,
        price: data.price,
        rarity: data.rarity,
        equipped: false
    };
}

function mapArmor(data) {
    return {
        armorType: data.armorType,
        roles: data.roles,
        defense: data.defense,
        magicDefense: data.magicDefense,
        speed: data.speed,
        price: data.price,
        rarity: data.rarity,
        equipped: false
    };
}

function mapConsumable(data) {
    return {
        consumableType: data.consumableType,
        effect: data.effect,
        price: data.price,
        quantity: 1,
        uses: {
            value: data.uses,
            max: data.uses,
            autoDestroy: data.autoDestroy
        }
    };
}

// Execute the functions
await populateCompendium("weapons", WEAPONS_DATA, "weapon", mapWeapon);
await populateCompendium("armors", ARMORS_DATA, "armor", mapArmor);
await populateCompendium("consumables", CONSUMABLES_DATA, "consumable", mapConsumable);
