const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL, 
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false, 
});

client.connect()
    .then(() => {
        console.log("Connected to db");
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });

module.exports = {
    query: (text, params) => client.query(text, params),
};
