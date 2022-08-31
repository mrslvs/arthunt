const {ArtItem} = require('./art_item/index.js');
require('dotenv').config({path: './.env'});
const fs = require('fs');

const PORT = process.env.PORT || process.env.APP_PORT;
let artItemArray = [];
    // START Server
    const express = require('express');
    const app = express();

    const http = require('http');
    const server = http.createServer(app);

    const {Server} = require('socket.io');
    const io = new Server(server);


    app.use(express.static(`${process.env.ROOT_FOLDER}/frontend/`));

    let publicData = JSON.parse(fs.readFileSync(`${process.env.ROOT_FOLDER}/backend/public.json`));
    
    app.get('/data', (req,res, next) => {
        res.json(JSON.stringify(publicData));
    })    

    // POST
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({extended: false})); // parse GET/POST body received from client
    
    app.post('/', (req, res) => {
        const {code} = req.body;
        console.log("Received code: " + code);

        // --------- handle code comparison ---------
        let comparisonData = JSON.parse(fs.readFileSync(`${process.env.ROOT_FOLDER}/backend/comparison.json`));
        let foundArtId;
        comparisonData.forEach(art => {
            if(art.code === code && !art.found){
                foundArtId = art.id;
                art.found = !art.found;
            }
        });

        fs.writeFileSync(`${process.env.ROOT_FOLDER}/backend/comparison.json`, JSON.stringify(comparisonData), 'utf8');

        publicData = JSON.parse(fs.readFileSync(`${process.env.ROOT_FOLDER}/backend/public.json`));
        publicData.forEach(art => {
            if(art.id == foundArtId){
                art.found = !art.found;
            }
        })
        fs.writeFileSync(`${process.env.ROOT_FOLDER}/backend/public.json`, JSON.stringify(publicData), 'utf8');


        if(foundArtId){
            io.emit('foundArt', foundArtId);
            res.status(200).sendFile(`${process.env.ROOT_FOLDER}/frontend/success.html`);
        }else{
            res.status(404).sendFile(`${process.env.ROOT_FOLDER}/frontend/something_wrong.html`);
        }
        
    })

    io.on('connection', (socket) => {
    console.log('a user connected');
    });

    server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
    });