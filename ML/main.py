import cv2
import pytesseract

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'


def check(roll_number):
    video = cv2.VideoCapture('./static/files/' + roll_number + '.mp4')
    while True:
        ret, frame = video.read()
        if not ret:
            break

        # Convert the frame to grayscale
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Use Pytesseract to extract text from the grayscale frame
        text = pytesseract.image_to_string(gray)
        print(text)
        if(roll_number in text):
            print("Authenticated")
            return True

# check();
