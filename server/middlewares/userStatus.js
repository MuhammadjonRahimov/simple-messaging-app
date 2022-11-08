const ErrorClass = require("../utilts/ErrorClass")
const userStatus = require("../utilts/userStatus")
const catchAsync = require("../utilts/asyncError")
const User = require("../models/User")
module.exports = catchAsync(async (req, res, next) => {
    
    const user = await User.findByPk(req.user.id)
    const {status} = user
    if (status === userStatus.STATUS_BLOCK) {
        return res.status(403).json({
            status: "fail",
            message: "User is blocked",
            error: null,
            data: null,
          });
        // return next(new ErrorClass("User is blocked", 403))
    } 
    next()
})