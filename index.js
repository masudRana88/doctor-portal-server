const express = require('express');
const cors = require('cors');
const {connectToDB} = require("./config/db")
require('dotenv').config()
const userRouts = require('./routes/userRouts')
const appoinmentRoutes = require("./routes/appoinmentRoutes")

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

connectToDB()

app.get("/", (req,res)=>{
    res.send("server is running");
});

// ========== User Api =========
// Sing up user >
// Login user >
// Login user with jwt >
// update user >
// get all user (only admin)
// delete user by id (only admin)
// delete all user (only admin) 
app.use("/user", userRouts)


// ========== Appointment Api =========
// user can make a appointment >
// user can get appointment >
// user can delete appointment >
// admin can get all appointment (only admin) 
app.use("/appointment", appoinmentRoutes)

app.listen(port, ()=>{
    console.log("server is running on port", port)
});