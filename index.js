'use strict';

const puppeteer = require('puppeteer');

const selector = '.eael-gallery-grid-item';

async function scrapeArt(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'domcontentloaded'});

    const arts = await page.$$eval(selector, (nodes) => {
        return nodes.map(node => {
            const imageSource = node.querySelector('.gallery-item-thumbnail-wrap').querySelector('img').src;
            const author = node.querySelector('.fg-item-title').textContent;
            const infoString = node.querySelector('.fg-item-content').querySelector('p').textContent; // 'Dielo: FebruaryTyp: PrintRozmer: 29,7 x 42 cm'

            return {
                imageSource,
                author,
                infoString,
            }
        })
    })

    browser.close();

    return arts;
}

 /**
  * 
  * @param {string} infoString unformatted string containing all of the basic information about an art item, e.g., "Dielo: FebruaryTyp: PrintRozmer: 29,7 x 42 cm"
  * @returns {Object} 
  */
function extractInfo(infoString){
    let name;
    let type;
    let dimensions;
    let rest;   
    let tmp = infoString.replaceAll(/ /g, ''); // remove all spaces

    [name, rest] = tmp.replace('Dielo:', '').split('Typ:');
    [type, rest] = rest.split('Rozmer:');
    let [height, width] = rest.replace('cm', '').replace(',', '.').split('x');
    
    height = parseFloat(height);
    width = parseFloat(width);

    dimensions = {height, width,};

    return {name,type,dimensions,};
}

// scrapeArt('https://www.arthunt.sk/diela/').then(data => {
//     console.log(data);
// })

console.log(extractInfo('Dielo: FebruaryTyp: PrintRozmer: 29,7 x 42 cm'));
