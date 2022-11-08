const express = require("express");
const errorController = require("./controllers/errorControllers");
const authMiddleware = require("./middlewares/authToken");
const statusMiddleware = require("./middlewares/userStatus");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
// ERROR CLASS
const ErrorClass = require("./utilts/ErrorClass");
// CREATE SERVER
const app = express();
// MIDDLEWARES
app.use(express.json());
app.use(require("cors")());




// ROADS
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", authMiddleware, statusMiddleware, userRoutes);

app.use(express.static(__dirname+"/build"));


app.get("*", (req, res) => {
    res.sendFile(__dirname+"/build/index.html");
});
  


// WRONG PATHS
app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: "fail",
    message: `Path ${req.path} not exists`,
    error: null,
    data: null,
  });
  // return next(new ErrorClass(`Path ${req.path} not exists`, 404));
});
// ERROR MIDDLEAWARES
app.use(errorController);

module.exports = app;
