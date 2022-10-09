
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
app.post("/addCurrency", async (req, res) =>{
    try {
        const {name, price} = req.body;
        const newCurrency = pool.query(
            `INSERT INTO currency (name, price)
            VALUES ($1, $2) RETURNING *`,
            [name, price]
        );
        res.json(newCurrency.rows);
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
        const {name, lastname, dob, 
            email, password} = req.body;
        const newUser = await pool.query(
            `INSERT INTO end_user 
            (name, lastname, dob, email, password) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
            [name, lastname, dob, email, password]
        );
        res.json(newUser.rows);
    } catch (error) {
        console.log(error);
    }
});

// Add account
app.post("/addAccount", async (req, res) =>{
    try {
        const {id_account, id_end_user, id_bank, id_account_type, 
            id_currency, balance} = req.body;
        const newAccount = await pool.query(
            `INSERT INTO account (id_account, id_end_user, id_bank, id_account_type, id_currency, balance)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [id_account, id_end_user, id_bank, id_account_type, id_currency, balance]
        );
        res.json(newAccount.rows[0]); 
    } catch (error) {
        console.log(error);
    }
});

// Add Category

app.post("/addCategory", async (req, res) => {
    const {name} = req.body;
    const addCategory = await pool.query(
        `INSERT INTO category (name) VALUES ($1) RETURNING *`,
        [name]
    );
    res.json(addCategory.rows[0]); 
});

// Pending add Transaction here:
app.post("/addTransaction", async (req, res) => {
    const {date_transaction, id_account, id_transaction_type, 
        id_category, description, id_currency, ammount} = req.body;
    const newTransaction = await pool.query(
        `INSERT INTO transaction (date_transaction, id_account, id_transaction_type, id_category, description, id_currency, ammount)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, 
        [date_transaction, id_account, id_transaction_type, id_category, description, id_currency, ammount]
    );
    res.json(newTransaction.rows[0]); 
})
// SELECT ALL

// Select all accounts:
app.get("/accounts", async (req, res) => {
    try {
    
      const accounts = await pool.query("SELECT * FROM account");
      res.json(accounts.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

app.listen(port, ()=>{
    console.log('listening on port: ', port);
});


