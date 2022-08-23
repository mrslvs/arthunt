'use strict';

const puppeteer = require('puppeteer');

const selector = '.eael-gallery-grid-item';

async function scrapeArt(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'domcontentloaded'});

    // const cards = await page.$$eval(selector, (nodes) => {
    //     return nodes.map(node => {
    //         const src = node.querySelector('img').src;
    //         const species = node.querySelector('.species').textContent;

    //         return {
    //             src,
    //             species,
    //         }
    //     })
    // })

    const arts = await page.$$eval(selector, (nodes) => {
        return nodes.map(node => {
            const imageSource = node.querySelector('.gallery-item-thumbnail-wrap').querySelector('img').src;
            const author = node.querySelector('.fg-item-title').textContent;
            const info = node.querySelector('.fg-item-content').querySelector('p').textContent;

            return {
                imageSource,
                author,
                info,
            }
        })
    })

    browser.close();

    return arts;
}

scrapeArt('https://www.arthunt.sk/diela/').then(data => {
    console.log(data);
})