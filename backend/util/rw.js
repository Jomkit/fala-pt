import * as fs from 'node:fs/promises';
import { resolve } from 'node:path';

export async function readJsonFile(fileName) {
    const filePath = resolve("./save-data", fileName);
    const contents = await fs.readFile(filePath, 'utf-8');
    console.log(contents);
}

export async function writeJsonFile(fileName, content) {
    try {
        const filePath = resolve("./save-data", fileName);
        await fs.writeFile(filePath, content, {encoding: 'utf-8'});
    } catch(e) {
        console.error(e);
    }
}