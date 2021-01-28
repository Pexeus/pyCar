const stream = require("./stream")
const pyCom = require("./pyCom")

const io = require("socket.io-client")
const spawn = require("child_process").spawn

const host = "192.168.60.100"

async function init(host) {
    initController()
    pyCom.init(host)

    stream.init({   
        host: host,
        fps: 30,
        width: 1280,
        height: 720,
    })
}

async function initController() {
    const controller = spawn("python", ["-u", "./controller.py", "--server", "localhost"])

    controller.stdout.on('data', function (data) {
        console.log("[ controller ] " +  data.toString());
    });

    controller.stderr.on('data', function (data) {
        console.log("[ controller ERROR ] " +  data.toString());
    });
}

init(host)