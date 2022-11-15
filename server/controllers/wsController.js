const socketCollection = {};

const sendNewMessage = (username, data) => {
  const recipient = socketCollection[username];
  if (recipient) {
    recipient.send(JSON.stringify(data));
  }
};

module.exports = {
  socketCollection,
  sendNewMessage,
};

// ws.on("message", data => {
//   const dataObj = JSON.parse(data);
//   console.log(clients);
//   const recipient = clients[dataObj.recipient];
//   recipient.send(`${dataObj.text}`);
// });
