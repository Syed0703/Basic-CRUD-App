const express = require('express');
// const mongoose = require('mongoose');
const user = require('./database');

const app = express();

// app.use(cors());
app.use(express.json());

const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.listen(port , () => {
    console.log(`Server Started at port: ${port}`)
})
