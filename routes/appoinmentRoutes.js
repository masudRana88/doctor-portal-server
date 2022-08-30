const express = require('express');
const { adminRoutes } = require('../Hooks/privateRoute');
const { createAppoinment, getUserAppoinment, deleteAppoinment, getAllAppoinment, updateAllAppoinmentStatus } = require('../routesControler/appoinmentControler');
const router = express.Router();

// create a appoinment
// Post request
// api link /appointment/create
router.route("/create").post(createAppoinment)

// get user appoinment by user id
// get request
// api link /appointment/:userId
router.route("/:userId").get(getUserAppoinment)

// DELET user appoinment by appoinment id
// delete request
// api link /appointment/delete/:userId
router.route("/delete/:appointmentId").delete(deleteAppoinment);

// get All appoinment
// gat request
// Admin routes
// api link /appointment/get/all
router.route("/get/all/").get(adminRoutes,getAllAppoinment);
// Update appoinment status
// put request
// Admin routes
// api link /appointment/update/status/:id
router.route("/update/status/:id").put(adminRoutes,updateAllAppoinmentStatus);



module.exports = router