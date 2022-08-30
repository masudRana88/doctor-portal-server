const jwt = require('jsonwebtoken');

const generateJWT = async(user) =>{
    
    const newUser ={
        id : user._id,
        email : user.email,
        isAdmin : user.isAdmin
    }
    // const 
    const token = await jwt.sign(newUser, process.env.JWT_PASS,{expiresIn: '30day'})
    const jwtToken = "Bearer "+ token
    return jwtToken
}




exports.generateJWT = generateJWT;
