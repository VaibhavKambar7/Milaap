import cv2
from PIL import Image
from geopy.geocoders import Nominatim

def main_app(name, latitude, longitude, to_email):
    geolocator = Nominatim(user_agent="missing_person_app")

    face_cascade = cv2.CascadeClassifier('./data/haarcascade_frontalface_default.xml')
    recognizer = cv2.face.LBPHFaceRecognizer_create()
    recognizer.read(f"./data/classifiers/{name}_classifier.xml")
    cap = cv2.VideoCapture(0)
    pred = 0
    successful_faces = 0
    # target_faces = 5
    target_faces = 15

    while True:
        ret, frame = cap.read()
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)

        for (x, y, w, h) in faces:
            roi_gray = gray[y:y+h, x:x+w] 
            id, confidence = recognizer.predict(roi_gray)
            confidence = 100 - int(confidence)

            if confidence > 50:
                pred += 1
                print(f"Pred: {pred}")  # Print pred to console
                text = name.upper()
                font = cv2.FONT_HERSHEY_PLAIN
                frame = cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                frame = cv2.putText(frame, text, (x, y - 4), font, 1, (0, 255, 0), 1, cv2.LINE_AA)
                location = geolocator.reverse((latitude, longitude), exactly_one=True)
                if location:
                    frame = cv2.putText(frame, location.address, (x, y -18), font, 1, (0, 255, 0), 1, cv2.LINE_AA)
                
                successful_faces += 1
                if successful_faces >= target_faces:
                    # send_email(to_email)
                    cap.release()  # Release the camera object
                    cv2.destroyAllWindows()  # Close any open OpenCV windows
                    return name  # Return the result of face recognition

        cv2.imshow("image", frame)

        if cv2.waitKey(20) & 0xFF == ord('q'):
            break

    # if successful_faces >= target_faces:
        # send_email(to_email)

    cap.release()
    cv2.destroyAllWindows()