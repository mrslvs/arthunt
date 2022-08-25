const {scrapeArthuntSite} = require('./index.js');

scrapeArthuntSite().then((data) => {
    console.log(data);
})