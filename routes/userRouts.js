const express = require('express')
const router = express.Router();
const { singUp, login } = require("../routesControler/userControler");



// create user
// Post request
// api link /user/singup
router.route("/singup").post(singUp)
router.route("/login").get(login)



module.exports = router