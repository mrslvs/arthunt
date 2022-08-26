// const {Client} = require('pg');
const {Pool} = require('pg');
require('dotenv').config({path: '../.env'});

const pool = new Pool({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
});

const insert = async function (tableName, tableStructure, values) {
    const client = await pool.connect();
    try{
        await client.query(`INSERT INTO ${tableName} (${tableStructure}) VALUES (${values});`);
    }catch(error){
        console.log(error);
    }finally{
        client.release();
    }
}

module.exports = {pool, insert};