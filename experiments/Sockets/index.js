const express = require("express")
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static("./client"))

io.on('connection', client => {
  console.log("conected to client");
  console.log(client.handshake.headers);

  client.on("message", data => {
    console.log("message from client:");
    console.log(data);
  })
});

server.listen(80, () =>{
  console.log("server online");
});