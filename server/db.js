const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "Admin123.",
    host: "localhost",
    port: 5432,
    database: "budget_db"
});

module.exports = pool;