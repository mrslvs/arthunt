const {ArtItem, scrapeArthuntSite, downloadImage} = require('./art_item/index.js');
require('dotenv').config({path: './.env'});
const fs = require('fs');

const PORT = process.env.APP_PORT;
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

    let artItemPublicData = [];
    let artItemComparisonData = [];
    artItemArray.forEach(art => {
        const tmpObject = art.getPublicData();
        const tmpObject2 = art.getComparisonData();

        artItemPublicData.push(tmpObject);
        artItemComparisonData.push(tmpObject2);
    })

    fs.writeFileSync('./public.json', JSON.stringify(artItemPublicData), 'utf8');
    fs.writeFileSync('./comparison.json', JSON.stringify(artItemComparisonData), 'utf8');
}).then(() => {
    const express = require('express');
    const app = express();

    const http = require('http');
    const server = http.createServer(app);

    const {Server} = require('socket.io');
    const io = new Server(server);

    app.use(express.static('../frontend/'));

    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({extended: false})); // parse GET/POST body received from client
    
    app.post('/', (req, res) => {
        const {code} = req.body;
        console.log("Received code: " + code);
        let foundId;

        // handle code comparison

        io.emit('foundEvent', code);
        res.status(200).send('your code is valid or invalid.. we decide');
    })

    io.on('connection', (socket) => {
    console.log('a user connected');
    });

    server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
    });
})


// --------------------------------------------------------------------------------------------------
// // const initialize = require('./art_item/initialize.js');

// require('dotenv').config({path: './.env'});
// const PORT = process.env.APP_PORT;


// const {ArtItem, scrapeArthuntSite, downloadImage} = require('./art_item/index.js');
// const fs = require('fs');

// let artItemArray = [];
// scrapeArthuntSite().then((data) => {
//     data.forEach(art => {
//         downloadImage(art.imageURL, art.image);

//         const tmp = new ArtItem(
//             art.name, 
//             art.author, 
//             art.type, 
//             art.imageURL, 
//             art.image, 
//             art.height, 
//             art.width, 
//             art.code
//         );

//         artItemArray.push(tmp);
//     });

//     let artItemPublicData = [];
//     let artItemComparisonData = [];
//     artItemArray.forEach(art => {
//         const tmpObject = art.getPublicData();
//         const tmpObject2 = art.getComparisonData();

//         artItemPublicData.push(tmpObject);
//         artItemComparisonData.push(tmpObject2);
//     })

//     fs.writeFileSync('public.json', JSON.stringify(artItemPublicData), 'utf8');
//     fs.writeFileSync('comparison.json', JSON.stringify(artItemComparisonData), 'utf8');
// })


//------------------------------------------------------------------------------------------------------------------------------

    // const express = require('express');
    // const app = express();

    // const http = require('http');
    // const server = http.createServer(app);

    // const {Server} = require('socket.io');
    // const io = new Server(server);

    // app.use(express.static('../frontend/'));

    // const fs = require('fs');
    // const ArtItems = JSON.parse(fs.readFileSync('./public.json', 'utf8'));

    // const bodyParser = require('body-parser');
    // app.use(bodyParser.urlencoded({extended: false})); // parse GET/POST body received from client
    // app.post('/', (req, res) => {
    //     const {code} = req.body;
    //     console.log("Received code: " + code);
    //     let foundId;

    //     ArtItems.forEach(art => {
    //         if(art.code === code){
    //             foundId = art.id;
    //         }
    //     })

    //     io.emit('foundEvent', code);
    //     res.status(200).send('your code is valid or invalid.. we decide');
    // })

    // io.on('connection', (socket) => {
    // console.log('a user connected');
    // });

    // server.listen(PORT, () => {
    // console.log(`listening on ${PORT}`);
    // });





// ===================================================================
// const wss = new websocket.Server({server: app});
// const PORT = process.env.APP_PORT;

// app.use(express.json()); // parse response JSON body
// app.use(bodyParser.urlencoded({extended: false})); // parse GET/POST body received from client
// app.use(express.static('../frontend/'))

// wss.on('connection', function connection(ws) {
//     console.log("a new client connected to WSS");
//     ws.send('welcome new client!');
    
//     ws.on('message', function incoming(message){
//         console.log('received: %s', message)
//     })
// })

// // use middleware
// app.use((req, res, next) => {
//     console.log("Someone visited page");
//     next();
// })

// // app.get('/test', (req,res) => {
//     //     console.log('get request received and handled');
//     //     const data = JSON.parse(fs.readFileSync('./public.json', 'utf8'));
    
//     //     res.json(data);
// //     // res.status(200).send('<h1>hi<h1>');
// // })

// app.post('/', (req,res) =>{
//     console.log('post request received and handled');
//     console.log(req.body);
//     res.status(201).send('created ;)');
// })

// app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
// ===================================================================