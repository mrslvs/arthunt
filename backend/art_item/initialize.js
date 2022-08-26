const {ArtItem, scrapeArthuntSite, downloadImage} = require('./index.js');

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
    
    // create instances of ArtItem & persist them
})