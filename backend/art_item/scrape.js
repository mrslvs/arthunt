'use strict';

const puppeteer = require('puppeteer');
const crypto = require('crypto');
const fs = require('fs');
const request = require('request');
require('dotenv').config({path: '../.env'});

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

function getImagePath(imageURL){
    return imageURL.slice(imageURL.lastIndexOf('/') + 1);
}

/**
 * @typedef ArtItemPartial
 * @property {string} imageURL - Image URL
 * @property {string} author - Author's name
 * @property {string} name - Name of the art item
 * @property {string} type - Type of the art item
 * @property {float} height - Height of the art item
 * @property {float} width - Width of the art ttem
 */

/**
 * 
 * @returns {ArtItemPartial[]}
 */
async function scrapeArthuntSite(){
    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const url = process.env.ARTHUNT_SITE;
        await page.goto(url, {waitUntil: 'domcontentloaded'});

        const arts = await page.$$eval(selector, (nodes) => {
            return nodes.map(node => {
                const imageURL = node.querySelector('.gallery-item-thumbnail-wrap').querySelector('img').src;
                const author = node.querySelector('.fg-item-title').textContent;
                const infoString = node.querySelector('.fg-item-content').querySelector('p').textContent; // 'Dielo: FebruaryTyp: PrintRozmer: 29,7 x 42 cm'

                return {
                    imageURL,
                    author,
                    infoString,
                }
            })
        })

        browser.close();
        
        let tmp2 = [];

        const artItemArray = arts.map(art => {
            const {imageURL, author, infoString} = art;
            let tmp = extractInfo(infoString);

            let code = crypto.randomUUID().slice(-5);
            while(tmp2.includes(code)){
                code = crypto.randomUUID().slice(-5);
            }
            tmp2.push(code);

            const image = getImagePath(imageURL);
            
            return {imageURL, image, author, code, ...tmp};
        })

        return artItemArray;
    }catch(error){
        console.log(error);
    }
}

function downloadImage(url, image){
    return new Promise((resolve) => {
        request.head(url, function (err, res, body) {
            request(url).pipe(fs.createWriteStream(`../images/${image}`)).on('close', resolve);
        })
    })
}

module.exports = {
    scrapeArthuntSite,
    downloadImage
};


// module.exports = new Promise((resolve) => {
//     scrapeArthuntSite('https://www.arthunt.sk/diela/').then(data => {
//         resolve(JSON.stringify(data));
//     })
// })