'use strict';

const puppeteer = require('puppeteer');

const selector = '.eael-gallery-grid-item';

/**
 * @typedef ArtItem
 * @property {string} imageSource - Image URL
 * @property {string} author - Author's name
 * @property {string} name - Name of the art item
 * @property {string} type - Type of the art item
 * @property {float} height - Height of the art item
 * @property {float} width - Width of the art ttem
 */

/**
 * 
 * @param {string} url - URL address of art items 
 * @returns {ArtItem[]}
 */
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
 * @typedef {Object} ArtItemInformation
 * @property {string} name - Name of the art item
 * @property {string} type - Type of the art item
 * @property {float} height - Height of the art item
 * @property {float} width - Width of the art ttem
 */

 /**
  * 
  * @param {string} infoString - Unformatted string containing all of the basic information about an art item, e.g., "Dielo: FebruaryTyp: PrintRozmer: 29,7 x 42 cm"
  * @returns {ArtItemInformation}  
  */
function extractInfo(infoString){
    let name, type, rest;   
    let tmp = infoString.replaceAll(/ /g, ''); // remove all spaces

    [name, rest] = tmp.replace('Dielo:', '').split('Typ:');
    [type, rest] = rest.split('Rozmer:');
    let [height, width] = rest.replace('cm', '').replace(',', '.').split('x');
    
    height = parseFloat(height);
    width = parseFloat(width);

    return {name,type,height,width,};
}

// scrapeArt('https://www.arthunt.sk/diela/').then(data => {
//     console.log(data);
// })

console.log(extractInfo('Dielo: FebruaryTyp: PrintRozmer: 29,7 x 42 cm'));
