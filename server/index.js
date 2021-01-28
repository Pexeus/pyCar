const { fips } = require("crypto");
const express = require("express")
const app = express();

FRAMES = 0

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static("./client"))

io.on('connection', client => {
  console.log("conected to client");
  console.log(client.handshake.headers);

  client.on("controls", controls => {
    io.sockets.emit("car_controls", controls)
  })

  client.on("ctrl_restart", () => {
    console.log("dispatching restart...");
    io.sockets.emit("car_restart")
  })

  client.on("frame", frame => {
    io.sockets.emit("ctrl_frame", frame)

    FRAMES += 1
  })
});

setInterval(() => {
  if (FRAMES != 0) {
    //console.log("FPS: " + FRAMES);

    FRAMES = 0
  }
}, 1000);

server.listen(80, () =>{
  console.log("server online");
});