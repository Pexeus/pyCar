const socket = io();

FRAMES = 0

socket.on('connect', function(){
    console.log("connected");
})

socket.on("ctrl_frame", frame => {
    document.getElementById("display").src = `data:image/jpeg;base64, ${frame}`
    FRAMES += 1
})

setInterval(() => {
    document.getElementById("fps").innerHTML = "FPS: " + FRAMES * 2
    FRAMES = 0
}, 500);