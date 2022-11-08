const ErrorClass = require("../utilts/ErrorClass")

exports.isEmail = (req,res,next)=>{
    const {email} = req.body
    const isNotEmail = email.split("").find(e=>e==="@")
    if(!isNotEmail){
        let err = new ErrorClass("Email notog`ri kiritilgan", 403)
        err.isOperational = true
        return next(err)
    }
    next()
}