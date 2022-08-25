require('./scrape.js').then((data) => {
    const newData = JSON.parse(data);
    console.log(newData);
});