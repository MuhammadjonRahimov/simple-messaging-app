const { verify } = require("jsonwebtoken");
const ErrorClass = require("../utilts/ErrorClass")
const User = require("../models/User")
const catchAsync = require("../utilts/asyncError")
// const userStatus = require("../utilts/userStatus")

module.exports = catchAsync(  async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({
            status: "fail",
            message: "Unauthorized",
            error: null,
            data: null,
          });
        // return next(new ErrorClass("Unauthorized", 401))
    }
    const token = authHeader.slice(7)
    const user = verify(token, process.env.JWT_SECRET)
    

    if (!user) {
        return res.status(401).json({
            status: "fail",
            message: "Unauthorized",
            error: null,
            data: null,
          });
    }

    const userFromDB = await User.findByPk(user.id)

    if (!userFromDB) {
        return res.status(401).json({
            status: "fail",
            message: "Unauthorized",
            error: null,
            data: null,
          });
    }

  

    req.user = user
    next()
})