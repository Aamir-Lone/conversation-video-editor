import React, { useEffect, useRef } from "react";
import { loadModels, detectFaces } from "./FaceDetection"; // Import face detection logic

const FaceTracker = ({ video1Src, video2Src }) => {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);

  useEffect(() => {
    const loadAndDetect = async () => {
      await loadModels();
      detectFaces(videoRef1.current, canvasRef1.current);
      detectFaces(videoRef2.current, canvasRef2.current);
    };

    if (videoRef1.current && videoRef2.current) {
      videoRef1.current.onloadeddata = loadAndDetect;
      videoRef2.current.onloadeddata = loadAndDetect;
    }
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
      <div>
        <video ref={videoRef1} src={video1Src} playsInline autoPlay muted />
        <canvas ref={canvasRef1} />
      </div>
      <div>
        <video ref={videoRef2} src={video2Src} playsInline autoPlay muted />
        <canvas ref={canvasRef2} />
      </div>
    </div>
  );
};

export default FaceTracker;
