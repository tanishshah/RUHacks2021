#Tanish Shah
#SecureAndSafe Local Code

#imports
import cv2
from datetime import datetime
import serial
import time
import mongoengine
from mongoengine import *
from connect import *
import google.cloud.storage
import os

#upload image to GCP
def uploadImage(img):
    storage_client = gcpLink()
    bucket = storage_client.get_bucket('secureandsafe')
    blob=bucket.blob('u'+img)
    blob.upload_from_filename(img)
    
#code to take image
def takeImage():
    camera = cv2.VideoCapture(0)
    working, image = camera.read()
    if(working):
        num = str(datetime.now())
        num = num.replace(" ","_")
        num = num.replace("-","_")
        num = num.replace(".","_")
        num = num.replace(":","_")
        num = str("log" + num +".png")
        cv2.imwrite(num,image)
    else:
        print("not working")
    cv2.destroyAllWindows()
    camera.release()
    return num

#DB stuff
#none of the accessing will be done from the hardware side. All of that will be done via the web
#Part 1 working with users
class User(Document):
    username = StringField(unique=True, required=True)
    password = StringField(required=True)
    meta = {
        "indexes":["username"]
    }
def createUser():
    Username = input("What would you like your username to be? ")
    Password = input("What would you like your password to be? ")
    user = User(
        username = Username,
        password = Password
    ).save()
def validateUser():
    Username = input("Enter your username: ")
    Password = input("Please enter your password: ")
    user = User.objects(username =Username, password = Password).get()
    return user

#Part 2 The entry
class systemEvent(Document):
    trigger = StringField(required=True)
    user = StringField(required=True)
    date = StringField(required=True)
    image = ImageField()
    
#signal will be the code that is recieved from the serial monitor
def sendSystemEvent(signal,u,img):
    system = systemEvent(trigger = signal, date = str(datetime.now()),user=u, image=img).save()

#working with the arduino
#code to read serial data
def runHardware():
    ser = serial.Serial("COM3",9600)
    time.sleep(2)
    while 1:
        line = ser.readline()
        if line:
            string = line.decode()
            s = str(string)
            s.replace(" ","")
            if s != "":
                n = takeImage()
                sendSystemEvent(s,user.username,n)
                uploadImage(n)

#main code
#connect to the database         
connectToDB()

#main loop                       
cont = "Y"
while cont == "Y":
    try:
        existing = input("Do you have an exisiting account Y/N? ").upper()
        if(existing == "N"):
            createUser()
        user = validateUser()
        runHardware()
    except:
        print("sorry something went wrong")
        cont = input("If you would like to try again pres Y ").upper()


