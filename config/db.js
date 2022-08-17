const mongoose = require('mongoose');

const connectToDB = async()=>{
    try{
        const conn= await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zgxio.mongodb.net/Doctor_Portal`)
        console.log(`MongoDB Connected ${conn.connection.host}`)
    }
    catch(error){
        console.log(`Error : ${error.message}`)
        process.exit(1)
    }
}


exports.connectToDB = connectToDB