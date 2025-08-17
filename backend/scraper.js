import axios from 'axios';
import { load } from 'cheerio';

try {
    const { data: html } = await axios.get('https://wisc.pb.unizin.org/portuguese/chapter/licao-1/');
    const $ = load(html);
    const title = $('title').map((_, elem) => $(elem).text());
    const headers = $('h3').map((_, elem) => $(elem).next().is('ul') ?  $(elem).text() : null);
    // const vocab = $('li').map((_, elem) => $(elem).text());
    const vocab = $('h3').next('ul').children("li").map((_, elem) => $(elem).text());
    console.log(title.get(0));
    console.log(headers.get());
    // console.log(vocab.get());
} catch (e) {
    console.error(e);
}