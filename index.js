const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User'); 
require('dotenv').config()


app.use(express.json());

const corsOption = {
  origin: 'http://127.0.0.1:5173/',
  optionsSuccessStatus: 200,
}

app.use(cors());

mongoose.connect(process.env.MONGO_URL); 

app.get('/test', (req,res) => {
    res.json('test ok');
});  

app.post('/register', (req,res) => {
   const {name , email , password} = req.body;

   User.create({
    name,
    email,
    password,
   })

    res.json({name,email,password});
})
 
app.listen(4000); 