'use strict';

const puppeteer = require('puppeteer');

const selector = '.card';

async function scrapeArt(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'domcontentloaded'});

    const cards = await page.$$eval(selector, (nodes) => {
        return nodes.map(node => {
            const src = node.querySelector('img').src;
            const species = node.querySelector('.species').textContent;

            return {
                src,
                species,
            }
        })
    })

    browser.close();

    return cards;
}

scrapeArt('https://learnwebcode.github.io/practice-requests/').then(data => {
    console.log(data);
})