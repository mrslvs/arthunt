'use strict';

const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json()); // use middleware

app.listen(PORT, ()=>{
    console.log(`Listening on http://localhost:${PORT}`)
});

app.post('/art', (req,res) => {
    const {code} = req.body;

    if(!code){
        res.status(418).send({
            message: 'Missing code'
        })
        return;
    }

    if(code === codeArt){
        res.status(200).send({
            message: 'You have found yourself an art! Congratulations!'
        })
    }else{
        res.status(400).send({
            message: 'Incorrect code'
        })
    }  
})