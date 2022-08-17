const asyncHandler = require('express-async-handler');
const { generateJWT } = require('../Hooks/jwtTocken');
const { encriptPassWord, compearPassWord } = require('../Hooks/passwordGen');
const { User } = require('../Model/userModel');

// Create user
const singUp = asyncHandler(async(req,res)=>{
    const body = req.body
    const {password, email,name} = body;
    
    // Chack name
    if(!name){
        res.status(400).json({message: "Please Enter your name"});
    }
    // Chack email
    if(!email){
        res.status(400).json({message: "Please Enter your Email"});
    }
    // Chack password
    if(!password){
        res.status(400).json({message: "Please Enter your password"});
    }
    // Chack is Exiest
    const isExiest = await User.findOne({email: email})
    if(isExiest){
        console.log(isExiest)
        res.status(400).json({message: "This user is already Exiest"});
    }
    else{
        const encriptPass = encriptPassWord(password);
        const user =  await User.create({email, password:encriptPass, name})
        await user.save()
        const token = generateJWT(user.id)
        res.send({
            id : user._id,
            name: user.name,
            email: user.email,
            isAdmin : user.isAdmin,
            jwt: token
        })
    }
})

const login = asyncHandler(async(req,res)=>{
    // res.send({message: "working"})
    const body = req.body;
    const {password, email} = body
    // res.send(body)
    const user = await User.findOne({email})
    // res.send(user)
    if(!user){
        res.send({message: "User is not found"})
    }
    const validUser = compearPassWord(password,user.password);
    const token = generateJWT(user.id)
    if(validUser){
        res.status(200).json({
            id : user._id,
            name: user.name,
            email: user.email,
            isAdmin : user.isAdmin,
            jwt: token
        })
    }else{
        res.send({message: "Password is not valid"})
    }
})

exports.singUp = singUp
exports.login = login