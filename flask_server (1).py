from flask import Flask, request, Response, jsonify
from flask_cors import CORS
import cv2
from ultralytics import YOLO
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

model = YOLO(r"C:\project\runs\detect\train9\weights\best.pt")

def generate_frames(video_path):
    cap = cv2.VideoCapture(video_path)

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        results = model(frame)

        for result in results:
            for box in result.boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                cls = int(box.cls[0])
                conf = float(box.conf[0])

                color = (0, 255, 0) if cls == 0 else (0, 0, 255)
                cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
                cv2.putText(
                    frame,
                    f"{model.names[cls]} {conf:.2f}",
                    (x1, y1 - 5),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.5,
                    color,
                    2
                )

        _, buffer = cv2.imencode(".jpg", frame)
        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n\r\n" + buffer.tobytes() + b"\r\n"
        )

    cap.release()

@app.route("/upload", methods=["POST"])
def upload_video():
    if "video" not in request.files:
        return jsonify({"success": False, "message": "No file part"})

    file = request.files["video"]
    if file.filename == "":
        return jsonify({"success": False, "message": "No selected file"})

    path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(path)

    return jsonify({"success": True, "filename": file.filename})

@app.route("/video/<filename>")
def video_stream(filename):
    path = os.path.join(UPLOAD_FOLDER, filename)
    return Response(
        generate_frames(path),
        mimetype="multipart/x-mixed-replace; boundary=frame"
    )

if __name__ == "__main__":
    app.run(debug=True)
