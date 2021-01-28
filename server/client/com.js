function restartCar() {
    console.log("dispatching command...");
    socket.emit("ctrl_restart")
}