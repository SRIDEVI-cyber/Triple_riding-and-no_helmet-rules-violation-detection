import { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false); // 🔥 loading state

  const handleUpload = async () => {
    if (!file) {
      alert("Select file first");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);

    try {
      setLoading(true); // 🔥 start loading
      setVideoUrl("");  // clear old video

      const res = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData
      );

      setVideoUrl(res.data.video_url); // set new video
      alert("Processing Completed!");
    } catch (err) {
      console.error(err);
      alert("Error uploading");
    } finally {
      setLoading(false); // 🔥 stop loading
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Traffic Video</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <div className="btns">
        <button onClick={handleUpload}>
          Upload & Detect
        </button>
      </div>

      {/* 🔥 SHOW PROCESSING */}
      {loading && (
        <p style={{ color: "blue", marginTop: "10px" }}>
          Processing... Please wait ⏳
        </p>
      )}

      {/* 🔥 SHOW VIDEO */}
      {videoUrl && !loading && (
        <div style={{ marginTop: "20px" }}>
          <h3>Processed Video:</h3>
          <video width="500" controls key={videoUrl}>
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
};

export default Upload;