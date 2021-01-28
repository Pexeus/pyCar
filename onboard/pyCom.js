var express = require( "express" );
const ioClient = require("socket.io-client")

async function init(host) {
    const remoteSocket = ioClient(`http://${host}/`)
    const app = express();

    app.get("/", (req, res) => {
        res.end("pyCom online")
    })

    const server = require('http').createServer(app);
    const io = require('socket.io')(server);

    
    remoteSocket.on("car_controls", data => {
        io.sockets.emit("controls", data)
    })

    server.listen(3000, () =>{
        console.log("pyCom online");
    });
}

module.exports = {
    init: function(host) {
        init(host)
    }
}