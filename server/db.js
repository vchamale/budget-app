const Pool = require('pg').Pool;
require('dotenv').config({path:".env"});


const pool = new Pool({
    user: "postgres",
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE
});

module.exports = pool;