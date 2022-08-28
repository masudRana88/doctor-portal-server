const mongoose = require("mongoose");

const appoinmentModel = mongoose.Schema({
    name : {type: String, required: true},
    email : {type: String, required: true},
    phone : {type: Number, required: true},
    date : {type: String, required: true},
    time : {type: String, required: true},
    status : {type: String, default: 'panding'},
    serviceName : {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId , required: true},
})

const Appoinment = mongoose.model("appoinment", appoinmentModel)

exports.Appoinment = Appoinment