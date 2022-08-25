const ArtItem = require('./ArtItem');
// const scrapeDataFunction = require('../art_item/scrape.js');
const {scrapeArthuntSite, downloadImage} = require('./scrape.js');

module.exports = {
    ArtItem,
    scrapeArthuntSite,
    downloadImage
}