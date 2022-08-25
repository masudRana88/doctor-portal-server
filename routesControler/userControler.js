const asyncHandler = require('express-async-handler');
const { generateJWT } = require('../Hooks/jwtTocken');
const { encriptPassWord, compearPassWord } = require('../Hooks/passwordGen');
const { User } = require('../Model/userModel');

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
        const token = generateJWT(user.id)
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
    const token = generateJWT(user.id)
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
    const token = req.headers.token
    const uaerId = req.userID
    const id = uaerId.id
    const user = await User.findById(id);
    res.send({
            id : user._id,
            name: user.name,
            email: user.email,
            address : user.address,
            phone: user.phone,
            isAdmin : user.isAdmin,
            jwt : token,
            message : "Successfully Logged in!"
    })
})


exports.singUp = singUp
exports.updateUser = updateUser
exports.login = login
exports.loginWithJwt = loginWithJwt