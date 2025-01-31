const { query } = require('express');
const {Client} = require('pg');

const client = new Client({
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: '5432',
    database: 'cookierecipe',
});

client.connect()
    .then(()=>{
        console.log("Connected to db");
    })
    .catch((error) =>{
        console.error(error);
    });

module.exports = {
    query: (text, params) => client.query(text, params),
};

