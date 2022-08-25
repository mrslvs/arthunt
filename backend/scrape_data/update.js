require('../scrape_data/index.js').then((data) => {
    const newData = JSON.parse(data);
    console.log(newData);
});