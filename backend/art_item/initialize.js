const {scrapeArthuntSite, downloadImage} = require('./index.js');

scrapeArthuntSite().then((data) => {
    // console.log(data);

    data.forEach(element => {
        // console.log(element.image);
        downloadImage(element.imageURL, element.image);
    });

    // downloadImage(data[0].imageURL, data[0].image);
    // Promise.all()
})