from flask import Flask, render_template, request, jsonify
import cv2
import numpy as np
import face_recognition
import os
from datetime import datetime

app = Flask(__name__)

path = 'C:/Users/heman/OneDrive/Desktop/FACE Recognition future/face--recognition/images attendance'
images = []
classNames = []
myList = os.listdir(path)
print(myList)

for cl in myList:
    curImg = cv2.imread(f'{path}/{cl}')
    images.append(curImg)
    classNames.append(os.path.splitext(cl)[0])
print(classNames)

def findEncodings(images):
    encodeList = []
    for img in images:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodeList.append(encode)
    return encodeList

def markAttendance(name):
    with open('C:/Users/heman/OneDrive/Desktop/FACE Recognition future/face--recognition/attendance.csv', 'r+') as f:
        myDataList = f.readlines()
        nameList = []
        for line in myDataList:
            entry = line.split(',')
            nameList.append(entry[0])
        if name not in nameList:
            now = datetime.now()
            dtstring = now.strftime('%H:%M:%S')
            f.writelines(f'\n{name},{dtstring}')

encodeListKnown = findEncodings(images)
print('Encoding Complete')

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/mark_attendance", methods=["POST"])
def mark_attendance():
    # Receive image file from the frontend
    image_file = request.files["image"]

    # Read the image file as a numpy array
    nparr = np.frombuffer(image_file.read(), np.uint8)

    # Decode the numpy array to an OpenCV image
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Resize the image
    imgS = cv2.resize(img, (0, 0), None, 0.25, 0.25)
    imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

    # Perform face recognition
    facesCurFrame = face_recognition.face_locations(imgS)
    encodesCurFrame = face_recognition.face_encodings(imgS, facesCurFrame)

    for encodeFace, faceLoc in zip(encodesCurFrame, facesCurFrame):
        matches = face_recognition.compare_faces(encodeListKnown, encodeFace)
        faceDis = face_recognition.face_distance(encodeListKnown, encodeFace)
        matchIndex = np.argmin(faceDis)

        if matches[matchIndex]:
            name = classNames[matchIndex].upper()
            markAttendance(name)
            return jsonify({"message": f"Attendance marked for student ID: {name}"}), 200

    return jsonify({"message": "Face not recognized"}), 400

if __name__ == "__main__":
    app.run(debug=True)
