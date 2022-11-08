const ErrorClass = require("../utilts/ErrorClass")
const catchAsync = require("../utilts/asyncError")

const errorController = (err,req,res,next)=>{
    console.log(err.name)
    console.log(err)
    console.log(err.stack)

    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"

    if(process.env.NODE_ENV==="PROD"){

        if(err.name === "SequelizeDatabaseError"){
            if(err.original.code === "22P02"){
                res.status(404).json({
                    status: "fail",
                    message: "ID noto`g`ri kiritilgan"
                })
            }
        }
        
        else if(err.name === "JsonWebTokenError"){
            res.status(401).json({
                status: "error",
                message: "Unauthorized"
            })
        }

        else if(err.name === "ErrorValidational"){
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
                error: err.errors.map(e=>e.msg)
            })
        }
        else if(err.isOperational){
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
                error: err.errors
            })
        }else{
            res.status(err.status).json({
                status: err.status,
                message: err.message
            })
    }}

    else if(process.env.NODE_ENV==="DEV"){

    res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            error:err.errors,
            stack: err.stack
        })}

}

module.exports = errorController