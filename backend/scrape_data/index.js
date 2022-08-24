'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const { info } = require('console');

const selector = '.eael-gallery-grid-item';

/**
 * @typedef {Object} ArtItemInformation
 * @property {string} name - Name of the art item
 * @property {string} type - Type of the art item
 * @property {float} height - Height of the art item
 * @property {float} width - Width of the art ttem
 */

 /**
  * 
  * @param {string} infoString - Unformatted string containing all of the basic information about an art item, e.g., "Dielo: ty alebo ja?Typ: Kombinovaná technikaRozmer: 40 x 40 cm"
  * @returns {ArtItemInformation}  
  */
  function extractInfo(infoString){
    let name, type, rest;
    let tmp = infoString.replaceAll(' ', ''); // fix U+00a0 character (no-break space)

    [name, rest] = tmp.replace('Dielo:', '').split('Typ:');
    [type, rest] = rest.split('Rozmer:');
    let [height, width] = rest.replace('cm', '').replace(',', '.').split('x');

    // trim white spaces (start & end)
    [name, type, height, width] = [name, type, height, width].map(str => str.trim());
    console.log(name);
    console.log(type);
    console.log(height);
    console.log(width);

    height = parseFloat(height);
    width = parseFloat(width);

    return {
        name,
        type,
        height,
        width,
    };
}

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
async function scrapeArthuntSite(url){
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
    
    const artItemArray = arts.map(art => {
        const {imageSource, author, infoString} = art;
        let tmp = extractInfo(infoString);

        return {imageSource, author, ...tmp};
    })

    return artItemArray;
}

scrapeArthuntSite('https://www.arthunt.sk/diela/').then(data => {
    console.log(data);
    const writeData = JSON.stringify(data);
    fs.writeFile('data.json', writeData, 'utf8');
})