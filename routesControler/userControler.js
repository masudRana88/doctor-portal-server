const asyncHandler = require('express-async-handler');
const { generateJWT } = require('../Hooks/jwtTocken');
const { encriptPassWord, compearPassWord } = require('../Hooks/passwordGen');
const { User } = require('../Model/userModel');
const jwt = require('jsonwebtoken');
// ====================
//       User SingUp
// ====================
const singUp = asyncHandler(async(req,res)=>{
    const body = req.body
    const {password, email,name} = body;
    const sentNullUser=(m)=>{
        return {
            id : "",
            name: "",
            email: "",
            isAdmin : false,
            jwt: "",
            message : m,
            address : null,
            phone: null,
        }
    }
    // Chack name
    if(!name){
        res.status(400).json(sentNullUser("Please Enter your name"));
    }
    // Chack email
    if(!email){
        res.status(400).json(sentNullUser("Please Enter your Email"));
    }
    // Chack password
    if(!password){
        res.status(400).json(sentNullUser("Please Enter your password"));
    }
    // Chack is Exiest
    const isExiest = await User.findOne({email: email})
    if(isExiest){
        res.status(400).json(sentNullUser("This user is already Exiest"));
    }
    else{
        const encriptPass = encriptPassWord(password);
        const user =  await User.create({email, password:encriptPass, name})
        await user.save()
        const token = generateJWT(user)
        res.send({
            id : user._id,
            name: user.name,
            email: user.email,
            address : user.address,
            phone: user.phone,
            isAdmin : user.isAdmin,
            jwt: token,
            message: "sing Up seccessfully"
        })
    }
})
// ====================
//       User Update
//      post request
// ====================

const updateUser = asyncHandler(async (req, res) => {
    let {email,name,phone,address,id}= req.body;
    const user = await User.findOne({email});
    if(user.isAdmin || user._id == id){
        name = name || user.name;
        phone = phone || user.phone;
        address = address || user.address;
        const doc = await user.update({ name, phone, address});
        if(doc.acknowledged){
            const newUser = await User.findOne({email});
            res.send({
                email: newUser.email,
                name: newUser.name,
                phone: newUser.phone,
                address: newUser.address,
            })
        }
    }else{
        res.sendStatus(403).send({message: "user can not be update!!"})
    }
})

// ====================
//       User login
//      post request
// ====================
const login = asyncHandler(async(req,res)=>{
    const body = req.body;
    const {password, email} = body
    const sentNullUser=(m)=>{
        return {
            id : "",
            name: "",
            email: "",
            isAdmin : false,
            jwt: "",
            message : m,
            address : null,
            phone: null,
        }
    }
    const user = await User.findOne({email})
    if(!user){
        res.send(sentNullUser("User is not found"))
    }
    const validUser = compearPassWord(password,user.password);
    const token = await generateJWT(user)
    if(validUser){
        res.status(200).json({
            id : user._id,
            name: user.name,
            email: user.email,
            address : user.address,
            phone: user.phone,
            isAdmin : user.isAdmin,
            jwt: token,
            message : "Successfully Logged in!"
        })
    }else{
        res.send(sentNullUser("User password is not valid !"))
    }
})


// ================================
//       User login With jwt
// =================================
const loginWithJwt = asyncHandler(async(req,res)=>{
    try {
        const token = req.headers.token
        if(token && token.startsWith("Bearer")){
            const jwtToken = token.split(" ")[1];
            const decode = await jwt.verify(jwtToken, process.env.JWT_PASS)
            const {id} = decode
            const user = await User.findById(id)
            if(decode.email === user.email){
                res.status(200).json({
                    id : user._id,
                    name: user.name,
                    email: user.email,
                    address : user.address,
                    phone: user.phone,
                    isAdmin : user.isAdmin,
                    jwt: token,
                    message : "Successfully Logged in!"
                })
            }
        }
    } catch (error) {
        res.status(401).json({message: "Unathorize access token!!"})
    }
})
// ================================
//       get all users 
// =================================
const getAllUsers = asyncHandler(async(req,res)=>{
    try {
        const users = await User.find({}).select("-password").select("-__v")
        res.send(users)
    } catch (error) {
        res.status(401).json({message: "Unathorize access token!!"})
    }
})


exports.singUp = singUp
exports.updateUser = updateUser
exports.login = login
exports.loginWithJwt = loginWithJwt
exports.getAllUsers = getAllUsers