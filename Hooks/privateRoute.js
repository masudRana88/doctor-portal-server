const asyncHandler = require('express-async-handler');
const { User } = require('../Model/userModel');

const adminRoutes = asyncHandler(async(req,res,next)=>{

    const id = req.userId;
    const user = await User.findById("id")
    if(user.isAdmin){
        next()
    }else{
        res.status(401)
    }

})

exports.adminRoutes = adminRoutes