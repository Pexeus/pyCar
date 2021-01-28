const controls = {
    servos: {
        steer: 90,
        camX: 90,
        camY: 90,
    },
    esc: 14.5
}

document.addEventListener('keydown', event => {
    if (event.keyCode == 39 && controls.servos.steer < 180) {
        controls.servos.steer += 10
    }
    if (event.keyCode == 37 && controls.servos.steer > 0) {
        controls.servos.steer -= 10
    }

    socket.emit("controls", controls)
    console.log(event.keyCode);
});