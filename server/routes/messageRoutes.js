const router = require("express").Router()
const messageController = require("../controllers/messageController")




const roleMiddleware = (...roles) => {

  return (req, res, next) => {

    let roles2;

    if (typeof roles === "string") {
      roles2 = [roles]
    } else {
      roles2 =roles
    }

    

    if (roles2.includes(req.user.role)) {
      next(new Error("sdfsdf", 403))
    } else {
      next()
    }
  }
  
  
}




router
.get("/recipients/:s", roleMiddleware("Admin", "Courier"), messageController.getAllRecipients)
.get("/:name", roleMiddleware("Courier"), messageController.getAll)
.post("/", messageController.create)


module.exports = router