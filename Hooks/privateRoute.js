const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { User } = require('../Model/userModel');

const adminRoutes = asyncHandler(async(req,res,next)=>{
    try {
        const token = req.headers.token
        // console.log(token);
        if(token && token.startsWith("Bearer")){
            const jwtToken = token.split(" ")[1];
            const user = await jwt.verify(jwtToken, process.env.JWT_PASS)
            const newUser = await User.findById(user.id)
            if(user.isAdmin){  
                next()
            }else if(newUser && newUser.isAdmin){
                next()
            }
        }
    } catch (error) {
        res.status(401).json({message: "Unathorize access token!!"})
    }
})

exports.adminRoutes = adminRoutes