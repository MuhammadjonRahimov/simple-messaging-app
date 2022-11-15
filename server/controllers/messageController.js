const { Op } = require("sequelize");

const Message = require("../models/Message");
const asyncError = require("../utilts/asyncError");
const ErrorClass = require("../utilts/ErrorClass");
const { sendNewMessage } = require("./wsController");

exports.getAllRecipients = asyncError(async (req, res, next) => {
  const { s } = req.params;

  const recipients = await Message.findAll({
    where: { recipient: { [Op.iLike]: `%${s}%` } },
    attributes: ["recipient"],
    group: ["recipient"],
  });

  res.status(200).json({
    status: "success",
    message: null,
    error: null,
    data: {
      recipients: recipients.map(m => ({
        label: m.recipient,
        value: m.recipient,
      })),
    },
  });
});

exports.getAll = asyncError(async (req, res, next) => {
  const { name } = req.params;
  const allMessages = await Message.findAll({
    where: {
      recipient: { [Op.eq]: name },
    },
    attributes: { exclude: ["recipient"] },
  });

  res.status(200).json({
    status: "success",
    message: "All messages",
    error: null,
    data: {
      messages: allMessages,
    },
  });
});

exports.create = asyncError(async (req, res, next) => {
  const newMsg = await Message.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Message sent",
    error: null,
    data: null,
  });
  sendNewMessage(req.body.recipient, {
    title: newMsg.title,
    sender: newMsg.sender,
    text: newMsg.text,
  });
});

// exports.deleteUsers = asyncError(async(req,res,next)=>{
//     const ids = req.body

//     await Message.destroy({where: {id: {[Op.in]: ids}}})

//     res.status(200).json({
//         status: "success",
//         message: `Succesfully deleted`,
//         error: null,
//         data: null
//     })

// })
