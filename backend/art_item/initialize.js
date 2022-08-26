const {ArtItem, scrapeArthuntSite, downloadImage} = require('./index.js');
const {insert} = require('../database/index.js');
require('dotenv').config({path: '../.env'});

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

    artItemArray.forEach((art) => {
        insert(process.env.DATABASE_TABLE, process.env.DATABASE_STRUCTURE, art.persistQueryValues());
    })
})