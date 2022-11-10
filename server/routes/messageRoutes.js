const router = require("express").Router()
const messageController = require("../controllers/messageController")



router
	.get("/recipients/:s", messageController.getAllRecipients)
	.get("/:name", messageController.getAll)
	.post("/", messageController.create)


module.exports = router