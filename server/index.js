
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // This is for req.body

/**********
 * ROUTES *
 **********/

// INSERTS:

// Add Currency
app.post("/addCurrency", (req, res) =>{
    try {
        const {name, last_modified, price} = req.body;
        const newCurrency = pool.query(
            `INSERT INTO currency (name, last_modified, price)
            VALUES ($1, $2, $3)`,
            [name, last_modified, price]
        );
        res.json(newCurrency.rows[0]); // Gave error but inserted well.
    } catch (error) {
        console.log(error);     
    }
});

// Add Bank
app.post("/addBank", async (req, res) => {
    try {
        const {name} = req.body;
        const newBank = await pool.query(
            'INSERT INTO bank (name) VALUES ($1) RETURNING *', 
            [name]
        );
        res.json(newBank.rows[0]);
    } catch (error) {
        console.log(error);
    }
});

// Add User
app.post("/addUser", async (req, res) => {
    try {
        const {id_end_user, name, lastname, dob, 
            email, username, password} = req.body;
        const newUser = await pool.query(
            `INSERT INTO end_user 
            (id_end_user, name, lastname, dob, email, username, password) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, 
            [id_end_user, name, lastname, dob, email, username, password]
        );
        res.json(newUser.rows[0]);
    } catch (error) {
        console.log(error);
    }
})

// Add account
app.post("/addAccount", (req, res) =>{
    try {
        //const {id_account, id_end_user, id_bank, }
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, ()=>{
    console.log('listening on port: ', port);
});


/*
require('dotenv').config({path:".env"});

console.log(process.env.JAMES);*/