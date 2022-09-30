const express = require('express');
const app = express();
const port = 5000;

app.listen(port, ()=>{
    console.log('listening on port: ', port);
});


/*
require('dotenv').config({path:".env"});

console.log(process.env.JAMES);*/