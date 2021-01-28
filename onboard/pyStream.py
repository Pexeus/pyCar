import cv2
import base64
import socketio
import json
import argparse

ap = argparse.ArgumentParser()
ap.add_argument("-s", "--server", required=True,
    help="IP of Server")
args = vars(ap.parse_args())

sio = socketio.Client()

@sio.event
def connect():
    print("connected to " + args["server"])

    cam = cv2.VideoCapture(0) # video capture source camera (Here webcam of laptop) 


    while(True):
        ret, frame = cam.read()                    
        res, frame = cv2.imencode('.jpg', frame)    
        data = base64.b64encode(frame)              
        sio.emit('frame', data)    

    cap.release()

print("connecting to " + args["server"] + "...")
sio.connect("http://" + args["server"] + ":80")