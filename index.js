const express = require('express');
const cors = require('cors');
const {connectToDB} = require("./config/db")
require('dotenv').config()

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

connectToDB()

app.get("/", (req,res)=>{
    res.send("server is running");
});


app.listen(port, ()=>{
    console.log("server is running on port", port)
});