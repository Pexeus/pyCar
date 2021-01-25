import socketio
import time

# sio = socketio.Client(logger=True, engineio_logger=True)

sio = socketio.Client()

@sio.event
def connect():
    print("I'm connected!")

    while True:
        print("emitting message...")
        sio.emit('message', {'foo': 'bar'})
        time.sleep(2)

@sio.event
def connect_error():
    print("The connection failed!")

@sio.event
def disconnect():
    print("I'm disconnected!")


@sio.event
def log(data):
    print(data)


print("connectiong now")
sio.connect("http://localhost:80")
print('my sid is', sio.sid)