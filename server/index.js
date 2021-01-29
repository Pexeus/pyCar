const fs = require("fs")
const express = require("express")
const app = express();

FRAMES = 0

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static("./client"))
app.use(express.json())

app.get("/config", (req, res) => {
  res.end(fs.readFileSync("./config.json"))
})

app.post("/frame", (req, res) => {
  io.sockets.emit("ctrl_frame", req.body.data)

  FRAMES += 1

  res.end("ok")
})

app.post("/config", (req, res) => {
  const config = req.body

  const jsonData = JSON.stringify(config)
  fs.writeFileSync("./config.json", jsonData)

  console.log(config);
  io.sockets.emit("conf_set", config)

  res.end("ok")
})

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

  client.on("conf_remote", conf => {
    const jsonData = JSON.stringify(conf)
    fs.writeFileSync("./config.json", jsonData)
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
