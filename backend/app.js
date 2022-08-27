const express = require('express');
require('dotenv').config({path: './.env'});
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

const PORT = process.env.APP_PORT;

app.use(express.json()); // parse response body
app.use(bodyParser.urlencoded({extended: false})); // parse GET/POST body received from client
app.use(express.static('../frontend/'))

// use middleware
app.use((req, res, next) => {
    // request
    // response
    // next = has to be executed to allow request to travel on to another middleware
    console.log("Someone visited page");
    next();
})

app.get('/test', (req,res) => {
    console.log('get request received and handled');
    const data = JSON.parse(fs.readFileSync('./public.json', 'utf8'));

    res.json(data);
    // res.status(200).send('<h1>hi<h1>');
})

app.post('/', (req,res) =>{
    console.log('post request received and handled');
    console.log(req.body);
    res.status(201).send('created ;)');
})

app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));