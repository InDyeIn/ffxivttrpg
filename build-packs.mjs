import { compilePack } from '@foundryvtt/foundryvtt-cli';
import path from 'path';
import fs from 'fs';

async function build() {
    const packs = ['weapons', 'armors', 'consumables', 'races', 'classes'];

    for (const pack of packs) {
        console.log(`Compiling ${pack}...`);
        const srcPath = path.join(process.cwd(), `src/packs/${pack}`);
        const destPath = path.join(process.cwd(), `packs/${pack}`);

        // O Foundry CLI tem um bug do motor LevelDB (Iterator is not open) ao sobrescrever DBs antigas
        // A melhor prática é deletar a pasta do destPath antes de recompilar do zero.
        if (fs.existsSync(destPath)) {
            fs.rmSync(destPath, { recursive: true, force: true });
        }

        await compilePack(srcPath, destPath, { yaml: false });
    }

    console.log("All packs compiled successfully. You can now delete the helper scripts.");
}

build().catch(console.error);
