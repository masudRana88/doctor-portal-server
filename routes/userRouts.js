const express = require('express');
const { adminRoutes } = require('../Hooks/privateRoute');
const router = express.Router();
const { singUp, login, loginWithJwt, updateUser, getAllUsers } = require("../routesControler/userControler");



// create user
// Post request
// api link /user/singup
router.route("/singup").post(singUp)

// Update user
// Post request
// api link /user/update
router.route("/update").post(updateUser)

// login user
// post request
// api link /user/login
router.route("/login").post(login)

// login user with JWT token
// get request
// api link /user/login/token
router.route("/login/token").get(loginWithJwt)

// get all user 
// get request
// api link /user/get/all
router.route("/get/all").get(adminRoutes,getAllUsers)


module.exports = router