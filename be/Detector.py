import cv2
from PIL import Image
from geopy.geocoders import Nominatim
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib


def send_email(to_email):
    from_email = "missing_person_alert@yahoo.com"
    password = "Sid1234567@"  
    subject = "Missing Person Detected"
    message = "The Missing person you reported has been detected. Please reach out to the nearest Police station or wait for our call. "
    to_email= "vaibhavkambar123@gmail.com"

    msg = MIMEMultipart()
    msg["From"] = from_email
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(message, "plain"))

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(from_email, password)
    text = msg.as_string()
    server.sendmail(from_email, to_email , text)
    server.quit()

def main_app(name, latitude, longitude, to_email):
    
    geolocator = Nominatim(user_agent="missing_person_app")

    face_cascade = cv2.CascadeClassifier('./data/haarcascade_frontalface_default.xml')
    recognizer = cv2.face_LBPHFaceRecognizer.create()
    recognizer.read(f"./data/classifiers/{name}_classifier.xml")
    cap = cv2.VideoCapture(0)
    pred = 0
    
    while True:
        ret, frame = cap.read()
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)

        for (x, y, w, h) in faces:
            roi_gray = gray[y:y+h, x:x+w]
            id, confidence = recognizer.predict(roi_gray)
            confidence = 100 - int(confidence)
            pred = 0

            if confidence > 50:
                pred += 1
                text = name.upper()
                font = cv2.FONT_HERSHEY_PLAIN
                frame = cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                frame = cv2.putText(frame, text, (x, y - 4), font, 1, (0, 255, 0), 1, cv2.LINE_AA)
                location = geolocator.reverse((latitude, longitude), exactly_one=True)
                if location:
                    frame = cv2.putText(frame, location.address, (x, y -18), font, 1, (0, 255, 0), 1, cv2.LINE_AA)
                
            else:
                pred += -1
                text = "UnknownFace"
                font = cv2.FONT_HERSHEY_PLAIN
                frame = cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 2)
                frame = cv2.putText(frame, text, (x, y - 4), font, 1, (0, 0, 255), 1, cv2.LINE_AA)

        cv2.imshow("image", frame)

        if cv2.waitKey(20) & 0xFF == ord('q'):
                print(pred)
                if pred > 0 : 
                    dim =(124,124)
                    img = cv2.imread(f".\\data\\{name}\\{pred}{name}.jpg", cv2.IMREAD_UNCHANGED)
                    resized = cv2.resize(img, dim, interpolation = cv2.INTER_AREA)
                    cv2.imwrite(f".\\data\\{name}\\50{name}.jpg", resized)
                    Image1 = Image.open(f".\\2.png") 
                      
                    # make a copy the image so that the  
                    # original image does not get affected 
                    Image1copy = Image1.copy() 
                    Image2 = Image.open(f".\\data\\{name}\\50{name}.jpg") 
                    Image2copy = Image2.copy() 
                      
                    # paste image giving dimensions 
                    Image1copy.paste(Image2copy, (195, 114)) 
                      
                    # save the image  
                    Image1copy.save("end.png") 
                    frame = cv2.imread("end.png", 1)
                    
                    cv2.imshow("Result",frame)
                    cv2.waitKey(5000)
                    
                break
    if pred>0:
        send_email(to_email="vaibhavkambar123@gmail.com")
       
    cap.release()
    cv2.destroyAllWindows()
