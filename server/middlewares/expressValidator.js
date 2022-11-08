const {body, validationResult} = require("express-validator")
const ErrorClass = require("../utilts/ErrorClass")
exports.login = [
    body("email").notEmpty().withMessage("email bo`sh bo`lmasligi kerak"),
    body("password").notEmpty().withMessage("password bo`sh bo`lmasligi kerak")]

exports.register = [
    body("name").notEmpty().withMessage("Username bo`sh bo`lmasligi kerak"),
    body("password").notEmpty().withMessage("password bo`sh bo`lmasligi kerak"),
    body("email").notEmpty().withMessage("email bo`sh bo`lmasligi kerak")]

exports.registerValidator = (req,res,next)=>{
    const errorValidat = validationResult(req)
    if(!errorValidat.isEmpty()){
        let err = new ErrorClass("castError", 403)
        err.name = "ErrorValidational"
        err.errors = errorValidat.errors
        return next(err)
    }
    next()
}