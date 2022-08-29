require('dotenv').config({path: './.env'});
const PORT = process.env.APP_PORT;


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
    console.log("post request received");
    const {code} = req.body;
    console.log(req.body);
    io.emit('foundEvent', code);
    res.status(200).send('your code is valid or invalid.. we decide');
})

io.on('connection', (socket) => {
  console.log('a user connected');

//   socket.broadcast.emit('hi clients');

    // io.emit('foundEvent', 'tu bude h45h');

//   socket.on('code', msg => {
//     console.log('received code: ' + msg);
//   })
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});






// const fs = require('fs');


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