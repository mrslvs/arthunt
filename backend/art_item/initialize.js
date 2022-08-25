const {scrapeArthuntSite, downloadImage} = require('./index.js');

scrapeArthuntSite().then((data) => {
    data.forEach(element => {
        downloadImage(element.imageURL, element.image);
    });
    
    // create instances of ArtItem & persist them
})