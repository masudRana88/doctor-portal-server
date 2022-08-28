const asyncHandler = require('express-async-handler');
const { Appoinment } = require('../Model/appoinmentModel');


// ========== create a appoinment =================

const createAppoinment = asyncHandler(async (req, res) => {
    const {email,userId,name,phone,time,date,serviceName} = req.body;
    const appoinment = await Appoinment.create({email,userId,name,phone,time,date,serviceName});
    if(appoinment.email){
        const doc = {
            email: appoinment.email,  
            userId: appoinment.userId,
            name: appoinment.name,
            phone: appoinment.phone,
            time: appoinment.time,
            date: appoinment.date,
            serviceName : appoinment.serviceName,
            _id : appoinment.id,
            message: "Appoinment successful"
        }
        res.status(201).json(doc);
    }
    else{
        res.send({
            email: "",  
            userId: "",
            name: "",
            phone: "",
            time: "",
            date: "",
            serviceName: "",
            _id : "",
            message: "Appoinment faild"
        })
    }
})

// ========== get UserAppoinment appoinment =================

const getUserAppoinment = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const appoinment = await Appoinment.find({userId});
    if(appoinment.length > 0){
        res.send(appoinment)
    }else{
        res.sendStatus(404)
    }
})

// ========== DELET a appoinment =================

const deleteAppoinment = asyncHandler(async (req, res) => {
    const id = req.params.appointmentId;
    if(id){
        const deleteDoc = await Appoinment.deleteOne({_id: id});
        if(deleteDoc.deletedCount > 0){
            res.send(deleteDoc)
        }
        res.sendStatus(404)
    }
    else{
        res.status(404)
    }
});

// ========== GET All appoinment a appoinment =================
const getAllAppoinment = asyncHandler(async (req, res) => {
    const allAppoinment = await Appoinment.find();
    if(allAppoinment.length > 0){
        res.send(allAppoinment)
    }else{
        res.sendStatus(404)
    }
})

// Exports =============

exports.createAppoinment = createAppoinment
exports.deleteAppoinment = deleteAppoinment
exports.getUserAppoinment = getUserAppoinment
exports.getAllAppoinment = getAllAppoinment