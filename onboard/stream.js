const { StreamCamera, Codec } = require("pi-camera-connect");
const io = require("socket.io-client")

async function init(config) {
    const socket = io(`http://${config.host}/`)
    
    const streamCamera = new StreamCamera({
        codec: Codec.MJPEG,
        fps: config.fps,
        width: config.width,
        height: config.height,
    });

    console.log("initiating camera...");
    await streamCamera.startCapture();
    console.log("camera ready!")

    while (true) {
        const buffer = await streamCamera.takeImage()
        const frame = new Buffer.from(buffer).toString('base64');

        socket.emit("frame", frame)
    }
}

module.exports = {
    init: function(config) {
        init(config)
    }
}