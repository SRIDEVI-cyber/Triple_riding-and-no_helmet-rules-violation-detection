@app.route("/upload", methods=["POST"])
def upload_video():
    global status

    file = request.files["video"]

    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(UPLOAD_FOLDER, "output.mp4")

    file.save(input_path)

    status = "Processing"

    cap = cv2.VideoCapture(input_path)

    frame_width = int(cap.get(3))
    frame_height = int(cap.get(4))

    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, 20.0, (frame_width, frame_height))

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        results = model(frame)
        annotated_frame = results[0].plot()

        out.write(annotated_frame)

    cap.release()
    out.release()

    status = "Completed"

    return jsonify({
        "video_url": "http://127.0.0.1:5000/video/output.mp4"
    })