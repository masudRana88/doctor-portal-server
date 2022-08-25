const express = require('express');
const { getIdFormJwt } = require('../Hooks/jwtTocken');
const router = express.Router();
const { singUp, login, loginWithJwt, updateUser } = require("../routesControler/userControler");



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

// login user with jwt
// GET request
// api link /user/login/token
router.route("/login/token").get(getIdFormJwt, loginWithJwt)

module.exports = router