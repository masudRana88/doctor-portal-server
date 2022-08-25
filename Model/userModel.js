const mongoos = require("mongoose");

const userModel = mongoos.Schema({
    name : {type: String, required: true},
    email : {type: String, required: true},
    password: {type: String, required: true},
    address: {type: String, default: null},
    phone : {type: Number, default: null},
    isAdmin : {type: Boolean, required: true, default: false},
})

const User = mongoos.model("User", userModel)

exports.User = User