var bcrypt = require('bcryptjs');

const encriptPassWord = (password)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

const compearPassWord = (password,hash)=>{
    const result = bcrypt.compareSync(password, hash); 
    return result
}

exports.encriptPassWord = encriptPassWord
exports.compearPassWord = compearPassWord