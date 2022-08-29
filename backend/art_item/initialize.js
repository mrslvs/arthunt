const {ArtItem, scrapeArthuntSite, downloadImage} = require('./index.js');
const {insert} = require('../database/index.js');
require('dotenv').config({path: '../.env'});
const fs = require('fs');

let artItemArray = [];

scrapeArthuntSite().then((data) => {
    data.forEach(art => {
        downloadImage(art.imageURL, art.image);

        const tmp = new ArtItem(
            art.name, 
            art.author, 
            art.type, 
            art.imageURL, 
            art.image, 
            art.height, 
            art.width, 
            art.code
        );

        artItemArray.push(tmp);

    });

    // artItemArray.forEach((art) => {
    //     insert(process.env.DATABASE_TABLE, process.env.DATABASE_STRUCTURE, art.persistQueryValues());
    // })

    let artItemPublicData = [];
    let artItemComparisonData = [];
    artItemArray.forEach(art => {
        const tmpObject = art.getPublicData();
        const tmpObject2 = art.getComparisonData();

        artItemPublicData.push(tmpObject);
        artItemComparisonData.push(tmpObject2);
    })

    fs.writeFileSync('../public.json', JSON.stringify(artItemPublicData), 'utf8');
    fs.writeFileSync('../comparison.json', JSON.stringify(artItemComparisonData), 'utf8');
})