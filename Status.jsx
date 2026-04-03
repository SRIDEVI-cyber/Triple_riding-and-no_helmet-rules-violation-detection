import { useEffect, useState } from "react";
import axios from "axios";

function Status() {
  const [status, setStatus] = useState("Idle");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/status");
        setStatus(res.data.status);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStatus();

    const interval = setInterval(fetchStatus, 2000); // refresh every 2 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="status-page">
      <h1>Status</h1>
      <p>Video Processing Status</p>

      <div className="status-box">
        <h3>Current Status</h3>
        <p className="status-text">{status}</p>
      </div>
    </div>
  );
}

export default Status;