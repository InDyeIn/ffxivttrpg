/**
 * FFXIV TTRPG — Populate Races Compendium
 * 
 * Uso: Executar esta macro como GM.
 * Ela vai popular o Compendium "ffxivttrpg.races" com as 7 raças (14 tribos) e seus Traits.
 */

const modulePath = "systems/ffxivttrpg/module/data/races-data.mjs";
const racesModule = await import(`../../../${modulePath}`);
if (!racesModule) {
    ui.notifications.error("Could not load Races Data.");
    return;
}

const { RACES_DATA } = racesModule;
const packName = "races";
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

// FFXIV's 7 Races, each with 2 Tribes. We will create "Trait" items for each tribe.
for (const raceKey of Object.keys(RACES_DATA)) {
    const raceData = RACES_DATA[raceKey];

    for (const tribe of raceData.tribes) {

        // We'll create one major item representing the Tribe itself
        const tribeItem = new Item.implementation({
            name: `${raceData.name} - ${tribe.name}`,
            type: "trait",
            system: {
                traitType: "racial",
                race: raceData.name,
                tribe: tribe.name,
                passive: true,
                effect: `Atributos Bônus: ${tribe.stats}`
            }
        });
        await pack.importDocument(tribeItem);
        createdItems.push(tribeItem);

        // And then create specific traits as sub-items for the compendium
        for (const trait of tribe.traits) {
            const traitItem = new Item.implementation({
                name: `${trait.name} (${tribe.name})`,
                type: "trait",
                system: {
                    traitType: "racial",
                    race: raceData.name,
                    tribe: tribe.name,
                    passive: true,
                    effect: trait.effect
                }
            });
            await pack.importDocument(traitItem);
            createdItems.push(traitItem);
        }
    }
}

ui.notifications.info(`Successfully created ${createdItems.length} trait/race items in ${packName}!`);
