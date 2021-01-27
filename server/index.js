const express = require("express")
const app = express();

FRAMES = 0

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

  client.on("frame", frame => {
    const b64 = Buffer.from(frame, 'base64').toString()
    io.sockets.emit("broadcast", b64)

    FRAMES += 1
  })
});

setInterval(() => {
  console.clear()
  console.log("FPS: " + FRAMES);

  FRAMES = 0
}, 1000);

server.listen(80, () =>{
  console.log("server online");
});