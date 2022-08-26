const {Client} = require('pg');
require('dotenv').config({path: '../.env'});

const client = new Client({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
});

const insert = async function (tableName, tableStructure, values) {
    try{
        await client.connect();
        await client.query(`INSERT INTO ${tableName} ${tableStructure} VALUES (${values})`);
    }catch(error){
        console.log(error);
    }finally{
        client.end();
    }
}

module.exports = {client, insert};