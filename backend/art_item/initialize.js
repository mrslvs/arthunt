const {ArtItem, scrapeArthuntSite, downloadImage} = require('./index.js');
const {client} = require('../database/index.js');
require('dotenv').config({path: '../.env'});

let artItemArray = [];
const databaseStructure = `("name", author, "type", imageURL, image, height, width, searchPhrase, code, "found")`;
client.connect();

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

        client.query(`INSERT INTO ${process.env.DATABASE_TABLE} ${databaseStructure} VALUES ${tmp.persistQueryValues()}`, (err, res) => {
            if(!err){
                console.log(`Persisted ArtItem`);
            }else{
                console.log(err.message);
            }
        })

        artItemArray.push(tmp);
    });
    
    // create instances of ArtItem & persist them
})

client.end();