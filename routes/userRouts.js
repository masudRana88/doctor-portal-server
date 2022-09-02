const express = require('express');
const { adminRoutes } = require('../Hooks/privateRoute');
const router = express.Router();
const { singUp, login, loginWithJwt, updateUser, getAllUsers, deleteUser, updateIsAdmin } = require("../routesControler/userControler");



// create user
// Post request
// api link /user/singup
router.route("/singup").post(singUp)

// Update user
// Post request
// api link /user/update
router.route("/update").post(updateUser)


// Update user to admin or admin to user
// Post request
// api link /user/update/type
router.route("/update/type").post(adminRoutes,updateIsAdmin)

// Delete user
// Delete request
// api link /user/delete/:id
router.route("/delete/:id").delete(adminRoutes,deleteUser)

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