const ArtItem = require('./ArtItem');
const scrapeDataFunction = require('../art_item/scrape.js');

module.exports = {
    ArtItem: ArtItem,
    scrapeArthuntSite: scrapeDataFunction
}