// require('./index.js').then((data) => {
//     const newData = JSON.parse(data);
//     console.log(newData);
// });
require('dotenv').config({path: '../.env'});
const {scrapeArthuntSite} = require('./index.js');

scrapeArthuntSite(process.env.ARTHUNT_SITE).then((data) => {
    // const newData = JSON.parse(data);
    console.log(data);
})