const express = require('express');
const cors = require('cors');
const userModel = require('./database');
const { Mongoose } = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;

app.get('/data', async (req, res) => {
    try{
        const data = await userModel.find()
        res.json(data);
    }
    catch(error){
        res.status(500).json({message : error.message})
    }
})

app.post('/data', async (req,res) => {
    const { name, age, city } = req.body;
    try{
        const newUser = new userModel({ name, age, city })
        await newUser.save()
        res.status(201).json(newUser)
    }
    catch(error){
        console.log(erroe)
        res.status(500).json({message : error.message})
    }
})

app.listen(port , () => {
    console.log(`Server Started at port: ${port}`)
})
