const {client} = require('./index');

client.connect();

client.query(`SELECT * FROM person`, (err, res) => {
    if(!err){
        console.log(res.rows);
    }else{
        console.log(err.message);
    }
})