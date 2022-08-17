const express = require('express');
const cors = require('cors');
const {connectToDB} = require("./config/db")
require('dotenv').config()
const userRouts = require('./routes/userRouts')

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

connectToDB()

app.get("/", (req,res)=>{
    res.send("server is running");
});

// ========== User Api =========
// create user
// get user
// get all user
// delete user by id (only admin)
// delete all user (only admin) 
app.use("/user", userRouts)

app.listen(port, ()=>{
    console.log("server is running on port", port)
});