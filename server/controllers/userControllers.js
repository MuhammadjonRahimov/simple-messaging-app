const {Op} = require("sequelize")

const UserModel = require("../models/User")
const asyncError = require("../utilts/asyncError")
const ErrorClass = require("../utilts/ErrorClass")

exports.allUsers = asyncError(async(req,res,next)=>{
    const allUsers = await UserModel.findAndCountAll({attributes: ["id","email", "status", "name", "lastLoginTime", "createdAt"]})

    res.status(200).json({
        status: "succesfull",
        message: "Barcha userlar ro`yhati",
        error: null,
        content: allUsers.rows,
        usersCount: allUsers.count
    })
})

exports.updateStatusUser = asyncError(async(req,res,next)=>{
    const {ids, status} = req.body

    await UserModel.update({ status }, { where: { id: { [Op.in]: ids } } })
    
    if (ids.includes(req.user.id)&&status==="blocked") {
       return res.status(403).json({
            status: "success",
            message: status==="active"? "Unblocked": "Blocked",
            error: null,
            data: null
        })
        
    }
    

    res.status(200).json({
        status: "success",
        message: status==="active"? "Unblocked": "Blocked",
        error: null,
        data: null
    })
    
})

    exports.deleteUsers = asyncError(async(req,res,next)=>{
        const ids = req.body

    
        await UserModel.destroy({where: {id: {[Op.in]: ids}}})
        
        res.status(200).json({
            status: "success",
            message: `Succesfully deleted`,
            error: null,
            data: null
        })
    
    })