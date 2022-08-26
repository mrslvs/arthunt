const {Pool} = require('pg');
require('dotenv').config({path: '../.env'});
const fs = require('fs');

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
        await client.query(`INSERT INTO ${tableName} (${tableStructure}) VALUES (${values})`);
    }catch(error){
        console.log(error);
    }finally{
        client.release();
    }
}

async function exportPublicData(tableName, tableStructure){
    const client = await pool.connect()
    try{
        const data = await client.query(`SELECT id, ${tableStructure} FROM ${tableName}`);
        // console.log(data.rows);
        let dataArray = [];
        data.rows.forEach(row => {
            const {id, name, author, type, imageURL, image, height, width, searchPhrase, found} = row;
            const artObj = {
                id,
                name,
                author,
                type,
                imageURL,
                image,
                height,
                width,
                searchPhrase,
                found
            };

            dataArray.push(artObj);
        })

        fs.writeFileSync('./public.json', JSON.stringify(dataArray), 'utf8');

        return true;
        }catch(error){
            console.log(error);
            return false;
        }finally{
            client.release();
        }
}

module.exports = {
    insert,
    exportPublicData
};