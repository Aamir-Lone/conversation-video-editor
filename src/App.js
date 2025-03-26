
import React, { useState, useEffect, useRef } from "react";
import VideoUpload from "./components/videoUpload";
import { extractAudio } from "./components/ExtractAudio";
import { transcribeAudio } from "./utils/TranscribeAudio";
import { loadModels, detectFaces } from "./components/FaceDetection";
import "./App.css"; // Make sure to include styles

function App() {
  const [videos, setVideos] = useState([]); // Stores the uploaded videos
  const [processing, setProcessing] = useState(false);
  const [audioFiles, setAudioFiles] = useState([]);
  const [transcriptions, setTranscriptions] = useState([]);
  const [faceDetected, setFaceDetected] = useState([false, false]);

  const videoRefs = useRef([]); // Stores references to video elements
  const canvasRefs = useRef([]); // Stores references to canvas elements

  useEffect(() => {
    loadModels(); // Load face detection models once
  }, []);

  const processVideos = async () => {
    if (videos.length !== 2) {
      console.error("❌ Please upload exactly 2 videos.");
      return;
    }

    setProcessing(true);
    console.log("🔄 Processing started...");

    let newAudioFiles = [];
    let newTranscriptions = [];
    let newFaceDetected = [];

    for (let i = 0; i < videos.length; i++) {
      const video = videoRefs.current[i];

      // ✅ Ensure video is loaded before processing
      if (!video) {
        console.error(`❌ Video ${i + 1} element is missing.`);
        continue;
      }

      // ✅ Detect Faces
      console.log(`🔍 Running face detection for Video ${i + 1}...`);
      const faceDetectionResult = await detectFaces(video, canvasRefs.current[i]);
      newFaceDetected[i] = faceDetectionResult;

      // ✅ Extract Audio
      console.log(`🎵 Extracting audio from Video ${i + 1}...`);
      const audioBlob = await extractAudio(videos[i]);
      newAudioFiles[i] = audioBlob;

      // ✅ Transcribe Audio
      console.log(`📝 Transcribing audio for Video ${i + 1}...`);
      if (audioBlob) {
        const transcriptionResult = await transcribeAudio(audioBlob);
        newTranscriptions[i] = transcriptionResult.transcriptText || "❌ No transcription found";
      } else {
        newTranscriptions[i] = "❌ Audio extraction failed";
      }
    }

    setFaceDetected(newFaceDetected);
    setAudioFiles(newAudioFiles);
    setTranscriptions(newTranscriptions);
    setProcessing(false);
    console.log("✅ Processing completed.");
  };

  return (
    <div className="app-container">
      <h1>Conversation Video Editor</h1>

      {/* Video Upload Section */}
      <VideoUpload videos={videos} setVideos={setVideos} />

      {/* Process Button */}
      {videos.length === 2 && (
        <button
          onClick={processVideos}
          disabled={processing}
          className="process-button"
        >
          {processing ? "Processing..." : "Process Video"}
        </button>
      )}

      {/* Display Uploaded Videos */}
      {videos.length > 0 && (
        <div className="video-grid">
          {videos.map((video, index) => (
            <div className="video-container" key={index}>
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={URL.createObjectURL(video)}
                width="320"
                height="180"
                controls
              />
              <canvas ref={(el) => (canvasRefs.current[index] = el)} width="320" height="180" />
              <p>{faceDetected[index] ? "✅ Face Detected" : "❌ No Face Detected"}</p>
            </div>
          ))}
        </div>
      )}

      {/* Display Transcriptions */}
      {transcriptions.length > 0 && (
        <div className="transcription-section">
          <h3>Transcriptions</h3>
          {transcriptions.map((text, index) => (
            <p key={index}>
              <strong>Video {index + 1}:</strong> {text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
