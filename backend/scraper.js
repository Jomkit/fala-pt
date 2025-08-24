import axios from 'axios';
import { load } from 'cheerio';
import { readJsonFile, writeJsonFile } from './util/rw.js';
import { argv } from "node:process";

/**
 * Parses vocab entries to easily manipulate later
 * 
 * @param {string} rawVocab - english and portuguese definition possibly with trailing url to audio clip
 * @returns {string}
 */
function cleanUpVocab(rawVocab) {
    // Clean up the closing bracket as well:
    const clean = rawVocab.match(/^(.*?)\s*\[(.*?)\]/);
    if (!clean) return [rawVocab.trim()]; // fallback if no brackets
    return [clean[1].trim(), clean[2].trim()];
    // ["a Alemanha", "Germany"]
}


/**
 * Scrapes a chapter for vocabulary at the end of each chapter,
 * organizing by header section
 * 
 * @param {int} lessonNumber
 * @returns {JSON} - JSON object with title, and vocab separated by category
 */
async function scrapeVocab(lessonNumber) {
    try {
        const { data: html } = await axios.get(`https://wisc.pb.unizin.org/portuguese/chapter/licao-${lessonNumber}/`);
        const $ = load(html);
        const title = $('title').map((_, elem) => $(elem).text()).get(0);
        const headers = $('h3').map((_, elem) => $(elem).next().is('ul') ?  $(elem).text() : null);
        const vocabGrouped = $('h3').next('ul').map((_, elem) => $(elem));
        
        let h, vg;
        const vocabOrganized = {
            "title": title,
            "vocab": {},
        };

        for(let i=0; i < headers.length; i++) {
            h = headers.get(i);
            vg = vocabGrouped.get(i).children("li").map((_, el) => $(el).text());

            vocabOrganized["vocab"][h] = vg.get().map(v => cleanUpVocab(v));
        }
        
        
        // writeJsonFile(`lesson-${lessonNumber}.json`, JSON.stringify(vocabOrganized, null, 2));
        return JSON.stringify(vocabOrganized, null, 2);
    } catch (e) {
        console.error(e);
    }

}

function saveVocabToJson(vocabulary, lessonNumber) {
    writeJsonFile(`lesson-${lessonNumber}.json`, vocabulary);
}

async function scrapeAndSaveVocab(lessonNumber) {
    scrapeVocab(lessonNumber).then( res => saveVocabToJson(res, lessonNumber));
}

const lessonArg = argv[2];
if(lessonArg) {
    console.log("Scraping vocabulary...");
    await scrapeAndSaveVocab(lessonArg);
    console.log("Finished scraping");
} else {
    console.log("No designated lesson number -- please choose a lesson number");
}