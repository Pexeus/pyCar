const { StreamCamera, Codec } = require("pi-camera-connect");
const io = require("socket.io-client")

const HOST = "http://192.168.60.100/"
const socket = io(HOST)

async function init(config) {
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

init({
    fps: 30,
    width: 1280,
    height: 720,
    rate: 4000000 //irg machts das nasty af
})