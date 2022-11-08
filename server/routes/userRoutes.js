const router = require("express").Router();
const userControllers = require("../controllers/userControllers");
router
  .get("/", userControllers.allUsers)
  .put("/all", userControllers.deleteUsers)
  .put("/status/all", userControllers.updateStatusUser);
module.exports = router;
