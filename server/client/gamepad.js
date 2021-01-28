const gamepadStatus = {
    connected: false
}

window.addEventListener("gamepadconnected", function(e) {
    console.log("Gamepad connected")
    gamepadStatus.connected = true

    //loop starten
    updateControls()
})

function updateControls() {
    if (gamepadStatus.connected == true) {
        const gamepad = navigator.getGamepads()[0];

        controls.servos.steer = sVaule(gamepad.axes[0])
        controls.servos.camX = sVaule(gamepad.axes[2])
        controls.servos.camY = sVaule(gamepad.axes[3])

        controls.esc = 14.5 - gamepad.buttons[7].value + gamepad.buttons[6].value

        socket.emit("controls", controls)

        setTimeout(() => {
            updateControls()
        }, 100);
    }
}

function sVaule(axe) {
    if (axe > 0.05 || axe < -0.05) {
        return Math.round(90 - (axe * 90))
    }
    else {
        return 90
    }
}

