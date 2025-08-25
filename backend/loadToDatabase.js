import { readJsonFile } from "./util/rw.js";

/**
 * Read json file of lesson vocab scraped from the wisconsin university
 * online textbook for portuguese and parse it to prepare to load to sqlite
 * 
 * @param {integer} lessonNumber - the lesson number to read the vocabulary from
 * 
 * @returns {Array} vocabPrepared - an array of objects with attributes according to 
 *                                  vocabulary model
 */
async function organizeVocabulary(lessonNumber) {
    const file = `lesson-${lessonNumber}.json`;
    const contents = await readJsonFile(file);

    // console.log(Object.values(contents.vocab));
    const keys = Object.keys(contents.vocab);
    const values = Object.values(contents.vocab);

    const vocab = [];

    for(let v of keys) {
        // console.log(`category `, v);

        console.log(v.split(" ")[0]);
        

        for(let d of values){
            vocab
        }
    }
}

organizeVocabulary(1);

// const bulkVocabulary = await vocabulary.bulkCreate();