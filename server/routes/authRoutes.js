const authControllers = require("../controllers/authControllers")
const router = require("express").Router()
const {login, register, registerValidator: validator} = require("../middlewares/expressValidator")
const {isEmail} = require("../middlewares/customValidator")
router
    .post("/register",  register, validator, isEmail, authControllers.register )
    .post("/login", login, validator, authControllers.login)
module.exports = router