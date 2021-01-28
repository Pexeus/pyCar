//start.js
var spawn = require('child_process').spawn,
    py    = spawn('python', ["-u", 'debug.py']),
    data = [1,2,3,4,5,6,7,8,9],
    dataString = '';

py.stdout.on('data', function(data){
    console.log(data.toString());
    dataString += data.toString();
});

py.stderr.on('data', function(data){
    console.log(data.toString());
    dataString += data.toString();
});

function dispatch() {
    py.stdin.write("d\n");
    setInterval(() => {
        py.stdin.write("dadwadad\n");
    }, 100);
}

dispatch()


py.stdin.end();