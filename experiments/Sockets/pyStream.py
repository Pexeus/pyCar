import cv2
import base64
import socketio
import json

sio = socketio.Client()

@sio.event
def connect():
    print("I'm connected!")

    cam = cv2.VideoCapture(0) # video capture source camera (Here webcam of laptop) 


    while(True):
        ret, frame = cam.read()                     # get frame from webcam
        res, frame = cv2.imencode('.jpg', frame)    # from image to binary buffer
        data = base64.b64encode(frame)              # convert to base64 format
        sio.emit('frame', data)    

    cap.release()

print("connectiong now")
sio.connect("http://localhost:80")
print('my sid is', sio.sid)