import RPi.GPIO as GPIO
import time
import argparse
import socketio
import json

# getting remote server IP
ap = argparse.ArgumentParser()
ap.add_argument("-s", "--server", required=True,
    help="IP of Server")
args = vars(ap.parse_args())

# Initiating Socket
sio = socketio.Client()

# Initiating GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

servoStatus = {"steer":90, "camX":90, "camY":90, "camEnabled": True}

# Setting Servo Pins
sSteer_Pin = 17
sCamX_Pin = 27
sCamY_Pin = 22
ESC_Pin = 4

# Initiating LED
LED_Pin = 24
GPIO.setup(LED_Pin,GPIO.OUT)

# Initiate Servo
def newServo(pin):
    GPIO.setup(pin, GPIO.OUT)
    GPIO.output(pin, True)
    servo = GPIO.PWM(pin, 50)
    servo.start(0)

    print("servo registered on pin", pin)

    servo.ChangeDutyCycle(90 / 18 + 2)

    return servo

def testServo(servo):
    duty = 45 / 18 + 2
    time.sleep(0.5)
    duty = 145 / 18 + 2
    time.sleep(0.5)
    duty = 90 / 18 + 2
    servo.ChangeDutyCycle(90 / 18 + 2)

def newESC(pin):
    GPIO.setup(pin,GPIO.OUT)
    esc = GPIO.PWM(pin,100)
    esc.start(0)

    print("ESC registered on pin", pin)
    return esc

def blink():
    if GPIO.input(LED_Pin) == 1:
        GPIO.output(LED_Pin,GPIO.LOW)
    else:
        GPIO.output(LED_Pin,GPIO.HIGH)

# Set angle to servo
def updateAngle(servo, ctrl, name):
    angle = ctrl["servos"][name]

    if angle != 90 or servoStatus[name] != 90:
        duty = angle / 18 + 2
        servo.ChangeDutyCycle(duty)
        servoStatus[name] = angle

def updateThrust(esc, thrust):
    esc.ChangeDutyCycle(thrust)

def toggleCam(enable):
    if enable != servoStatus["camEnabled"]:

        print("toggling:", enable)

        servoStatus["camEnabled"] = enable

        if enable == True:
            sCamX.start(0)
            sCamY.start(0)

            sCamY.ChangeDutyCycle(90 / 18 + 2)
            sCamX.ChangeDutyCycle(90 / 18 + 2)
        else:
            sCamY.ChangeDutyCycle(90 / 18 + 2)
            sCamX.ChangeDutyCycle(90 / 18 + 2)

            time.sleep(.3)

            sCamY.stop()
            sCamX.stop()


@sio.event
def controls(ctrl):
    updateAngle(sSteer, ctrl, "steer")
    updateAngle(sCamX, ctrl, "camX")
    updateAngle(sCamY, ctrl, "camY")

    updateThrust(ESC, ctrl["esc"])

    # buggt nach reinitialisierung
    # toggleCam(ctrl["cam"])

    blink()



     

# Registring Servos
sSteer = newServo(sSteer_Pin)
sCamX = newServo(sCamX_Pin)
sCamY = newServo(sCamY_Pin)

# Registring ESC
ESC = newESC(ESC_Pin)

# Waiting for remote server
while True:
    print("connecting to " + args["server"] + "...")
    try:
        sio.connect("http://" + args["server"] + ":3000")
        break
    except:
        print("connection to remote server at " + args["server"] +  " failed")
        time.sleep(1)

print("controls operational")