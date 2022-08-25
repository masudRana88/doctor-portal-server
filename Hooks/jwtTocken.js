const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')

const generateJWT = (id) =>{
    const token = jwt.sign({id}, process.env.JWT_PASS,{expiresIn: '30day'})
    const jwtToken = "Bearer "+ token
    return jwtToken
}

const getIdFormJwt = asyncHandler(async (req,res,next)=>{
    try {
        const token = req.headers.token
        if(token && token.startsWith("Bearer")){
            const jwtToken = token.split(" ")[1];
            const decoded = await jwt.verify(jwtToken, process.env.JWT_PASS)
            req.userID = decoded;
            next()
        }
    } catch (error) {
        res.status(401).json({message: "Unathorize access token!!"})
    }
})


exports.generateJWT = generateJWT;
exports.getIdFormJwt = getIdFormJwt
