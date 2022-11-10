const express = require("express");
const errorController = require("./controllers/errorControllers");


// ROUTES

const messageRoutes = require("./routes/messageRoutes");
// ERROR CLASS
const ErrorClass = require("./utilts/ErrorClass");
// CREATE SERVER
const app = express();
// MIDDLEWARES
app.use(express.json());
app.use(require("cors")());




app.use("/api/v1/messages", messageRoutes);

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
