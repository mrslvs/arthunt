const {ArtItem, createArtItems} = require('./art_item/index.js');
require('dotenv').config({path: './.env'});
const fs = require('fs');

const PORT = process.env.PORT || process.env.APP_PORT;


createArtItems().then((artItemArray) => {
    // START Server
    const express = require('express');
    const app = express();

    const http = require('http');
    const server = http.createServer(app);
    
    const {Server} = require('socket.io');
    const io = new Server(server);
    
    
    app.use(express.static(`${process.env.ROOT_FOLDER}/frontend/`));
    
    // let publicData = JSON.parse(fs.readFileSync(`${process.env.ROOT_FOLDER}/backend/public.json`));
    
    app.get('/data', (req,res, next) => {
        let publicData = [];
        artItemArray.forEach(art => {
            const tmp = art.getPublicData();
            publicData.push(tmp);
        });

        res.json(JSON.stringify(publicData));
    })    

    // POST
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({extended: false})); // parse GET/POST body received from client
    
    app.post('/', (req, res) => {
        const {code} = req.body;
        console.log("Received code: " + code);

        let foundArt;
        artItemArray.forEach(art => {
            if(art.isCodeEqual(code)){
                foundArt = art;
            }
        });
        
        if(foundArt){
            foundArt.markAsFound();
            io.emit('foundArt', foundArt.getId());
            res.status(200).sendFile(`${process.env.ROOT_FOLDER}/frontend/success.html`);
        }else{
            res.status(404).sendFile(`${process.env.ROOT_FOLDER}/frontend/something_wrong.html`);
        }        
    })

    io.on('connection', (socket) => {
        console.log('a user connected');
    });

    server.listen(PORT, () => {
        console.log(`Server has started`);
    });

})