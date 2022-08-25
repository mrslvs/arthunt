// require('./scrape.js').then((data) => {
//     // export data
//     // const newData = JSON.parse(data);
//     // console.log(newData);
//     module.exports = new Promise((resolve) => resolve(data));
// });
const scrapeDataFunction = require('./scrape.js');

module.exports = {
    scrapeArthuntSite: scrapeDataFunction
}