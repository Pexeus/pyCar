const gamepadStatus = {
    connected: false
}

const camControls = {
    lastActive: Date.now()
}

window.addEventListener("gamepadconnected", function(e) {
    console.log("Gamepad connected")
    gamepadStatus.connected = true

    //loop starten
    updateControls()
})

function checkCamActivity() {
    if (camControls.lastActive + 3000 < Date.now()) {
        controls.cam = false
    }
    else {
        controls.cam = true
    }
}

function updateControls() {
    if (gamepadStatus.connected == true) {
        const gamepad = navigator.getGamepads()[0];

        controls.servos.steer = sVauleReverse(gamepad.axes[0])
        controls.servos.camX = sVaule(gamepad.axes[2])
        controls.servos.camY = sVaule(gamepad.axes[3])

        if (controls.servos.camX != 90 || controls.servos.camY != 90) {
            camControls.lastActive = Date.now()
        }

        controls.esc = 14.5 - gamepad.buttons[7].value + gamepad.buttons[6].value

        socket.emit("controls", controls)

        setTimeout(() => {
            updateControls()
            checkCamActivity()
        }, 100);
    }
}

function sVauleReverse(axe) {
    if (axe > 0.1 || axe < -0.1) {
        return Math.round(90 - (-axe * 60))
    }
    else {
        return 90
    }
}

function sVaule(axe) {
    if (axe > 0.03 || axe < -0.03) {
        return Math.round(90 - (axe * 90))
    }
    else {
        return 90
    }
}

