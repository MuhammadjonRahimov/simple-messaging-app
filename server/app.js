const http = require("http");
const express = require("express");
const errorController = require("./controllers/errorControllers");

// ROUTES

const messageRoutes = require("./routes/messageRoutes");
// ERROR CLASS
const ErrorClass = require("./utilts/ErrorClass");
// CREATE SERVER
const app = express();
const WebSocket = require("ws");
const server = http.createServer(app);
const wss = new WebSocket.Server({
  server,
  path: "/ws",
});

// MIDDLEWARES
app.use(express.json());
app.use(require("cors")());
// WEB SOCKET

// const clients = new Set();
const wsController = require("./controllers/wsController");

wss.on("connection", (ws, req) => {
  const name = req.url.split("?")[1].split("=")[1];
  wsController.socketCollection[name] = ws;

  ws.on("error", e => {
    console.log(e);
  });
});

app.use("/api/v1/messages", messageRoutes);
app.use(express.static(__dirname + "/build"));

// app.get("*", (req, res) => {
//   res.sendFile(__dirname + "/build/index.html");
// });

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

module.exports = server;
