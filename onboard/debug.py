import RPi.GPIO as GPIO
from time import sleep

GPIO.setmode(GPIO.BCM)

GPIO.setup(4,GPIO.OUT)
motor=GPIO.PWM(4,100)
motor.start(0)

# GPIO.setwarnings(False)

i = 14.5

while True:
    print(i)
    motor.ChangeDutyCycle(i)
    sleep(0.5)