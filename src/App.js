

// import React, { useState } from "react";
// import VideoUpload from "./components/videoUpload";
// import { extractAudio } from "./components/ExtractAudio";
// import { transcribeAudio } from "./utils/TranscribeAudio";

// function App() {
//   const [videos, setVideos] = useState([]);
//   const [processing, setProcessing] = useState(false);
//   const [audioBlobs, setAudioBlobs] = useState([]);
//   const [transcriptions, setTranscriptions] = useState([]);

//   const processVideos = async () => {
//     if (videos.length !== 2) {
//       alert("Please upload exactly two videos.");
//       return;
//     }

//     setProcessing(true);
//     setTranscriptions([]);

//     const audio1 = await extractAudio(videos[0]);
//     const audio2 = await extractAudio(videos[1]);

//     if (audio1 && audio2) {
//       setAudioBlobs([audio1, audio2]);

//       // Transcribe the extracted audio blobs
//       const response1 = await transcribeAudio(audio1);
//       const response2 = await transcribeAudio(audio2);

//       // Extract text safely
//       const text1 = response1?.results?.channels[0]?.alternatives[0]?.transcript || "Transcription failed.";
//       const text2 = response2?.results?.channels[0]?.alternatives[0]?.transcript || "Transcription failed.";

//       setTranscriptions([text1, text2]);
//     } else {
//       alert("Audio extraction failed.");
//     }

//     setProcessing(false);
//   };

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h1>Conversation Video Editor</h1>
//       <VideoUpload videos={videos} setVideos={setVideos} />

//       {videos.length === 2 && (
//         <button onClick={processVideos} disabled={processing} style={{ marginTop: "20px", padding: "10px 20px" }}>
//           {processing ? "Processing..." : "Process Video"}
//         </button>
//       )}

//       {audioBlobs.length > 0 && (
//         <div>
//           <h3>Extracted Audio</h3>
//           {audioBlobs.map((blob, index) => (
//             <div key={index}>
//               <audio controls>
//                 <source src={URL.createObjectURL(blob)} type="audio/wav" />
//                 Your browser does not support the audio element.
//               </audio>
//               <p><strong>Transcription:</strong> {transcriptions[index] || "Transcribing..."}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
//****************************************************************************************************************** */

//code to store audio files and transcript in index db


// import React, { useState, useEffect } from "react";
// import VideoUpload from "./components/videoUpload";
// import { extractAudio } from "./components/ExtractAudio";
// import { transcribeAudio } from "./utils/TranscribeAudio";
// import { saveAudio, saveTranscription, getAudio, getTranscription } from "./utils/db";

// function App() {
//   const [videos, setVideos] = useState([]);
//   const [processing, setProcessing] = useState(false);
//   const [audioBlobs, setAudioBlobs] = useState([]);
//   const [transcriptions, setTranscriptions] = useState([]);

//   // Load stored data from IndexedDB on mount
//   useEffect(() => {
//     const loadStoredData = async () => {
//       const audio1 = await getAudio("audio1");
//       const audio2 = await getAudio("audio2");
//       const text1 = await getTranscription("transcription1");
//       const text2 = await getTranscription("transcription2");

//       if (audio1 && audio2) {
//         setAudioBlobs([audio1, audio2]);
//       }
//       if (text1 && text2) {
//         setTranscriptions([text1, text2]);
//       }
//     };

//     loadStoredData();
//   }, []);

//   const processVideos = async () => {
//     if (videos.length !== 2) {
//       alert("Please upload exactly two videos.");
//       return;
//     }

//     setProcessing(true);
//     setTranscriptions([]); 

//     const audio1 = await extractAudio(videos[0]);
//     const audio2 = await extractAudio(videos[1]);

//     if (audio1 && audio2) {
//       setAudioBlobs([audio1, audio2]);

//       // Save audio blobs to IndexedDB
//       await saveAudio("audio1", audio1);
//       await saveAudio("audio2", audio2);

//       // Transcribe the extracted audio blobs
//       const text1 = await transcribeAudio(audio1);
//       const text2 = await transcribeAudio(audio2);

//       setTranscriptions([text1, text2]);

//       // Save transcriptions to IndexedDB
//       await saveTranscription("transcription1", text1);
//       await saveTranscription("transcription2", text2);
//     } else {
//       alert("Audio extraction failed.");
//     }

//     setProcessing(false);
//   };

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h1>Conversation Video Editor</h1>
//       <VideoUpload videos={videos} setVideos={setVideos} />

//       {videos.length === 2 && (
//         <button onClick={processVideos} disabled={processing} style={{ marginTop: "20px", padding: "10px 20px" }}>
//           {processing ? "Processing..." : "Process Video"}
//         </button>
//       )}

//       {audioBlobs.length > 0 && (
//         <div>
//           <h3>Extracted Audio</h3>
//           {audioBlobs.map((blob, index) => (
//             <div key={index}>
//               <audio controls>
//                 <source src={URL.createObjectURL(blob)} type="audio/wav" />
//                 Your browser does not support the audio element.
//               </audio>
//               <p><strong>Transcription:</strong> {transcriptions[index] || "Transcribing..."}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
//8************************************************************************************************


import React, { useState, useEffect } from "react";
import VideoUpload from "./components/videoUpload";
import { extractAudio } from "./components/ExtractAudio";
import { transcribeAudio } from "./utils/TranscribeAudio";
import { saveAudio, saveTranscription, getAudio, getTranscription } from "./utils/db";

function App() {
  const [videos, setVideos] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [audioBlobs, setAudioBlobs] = useState([]);
  const [transcriptions, setTranscriptions] = useState([]);
  const [statuses, setStatuses] = useState([]); // Status messages for each transcription

  // Load stored data from IndexedDB on mount
  useEffect(() => {
    const loadStoredData = async () => {
      const audio1 = await getAudio("audio1");
      const audio2 = await getAudio("audio2");
      const text1 = await getTranscription("transcription1");
      const text2 = await getTranscription("transcription2");

      if (audio1 && audio2) {
        setAudioBlobs([audio1, audio2]);
      }
      if (text1 && text2) {
        setTranscriptions([text1, text2]);
        setStatuses(["✅ Transcription Successful", "✅ Transcription Successful"]);
      }
    };

    loadStoredData();
  }, []);

  const processVideos = async () => {
    if (videos.length !== 2) {
      alert("Please upload exactly two videos.");
      return;
    }

    setProcessing(true);
    setTranscriptions([]); 
    setStatuses(["Transcribing...", "Transcribing..."]);

    const audio1 = await extractAudio(videos[0]);
    const audio2 = await extractAudio(videos[1]);

    if (audio1 && audio2) {
      setAudioBlobs([audio1, audio2]);

      // Save audio blobs to IndexedDB
      await saveAudio("audio1", audio1);
      await saveAudio("audio2", audio2);

      // Transcribe the extracted audio blobs
      const result1 = await transcribeAudio(audio1);
      const result2 = await transcribeAudio(audio2);

      // Handle transcription results
      if (result1.error) {
        setTranscriptions((prev) => [...prev, "❌ Transcription Failed"]);
        setStatuses((prev) => [...prev, "❌ Transcription Failed"]);
      } else {
        setTranscriptions((prev) => [...prev, result1.transcriptText]);
        setStatuses((prev) => [...prev, "✅ Transcription Successful"]);
        await saveTranscription("transcription1", result1.transcriptText);
      }

      if (result2.error) {
        setTranscriptions((prev) => [...prev, "❌ Transcription Failed"]);
        setStatuses((prev) => [...prev, "❌ Transcription Failed"]);
      } else {
        setTranscriptions((prev) => [...prev, result2.transcriptText]);
        setStatuses((prev) => [...prev, "✅ Transcription Successful"]);
        await saveTranscription("transcription2", result2.transcriptText);
      }
    } else {
      alert("Audio extraction failed.");
    }

    setProcessing(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Conversation Video Editor</h1>
      <VideoUpload videos={videos} setVideos={setVideos} />

      {videos.length === 2 && (
        <button onClick={processVideos} disabled={processing} style={{ marginTop: "20px", padding: "10px 20px" }}>
          {processing ? "Processing..." : "Process Video"}
        </button>
      )}

      {audioBlobs.length > 0 && (
        <div>
          <h3>Extracted Audio</h3>
          {audioBlobs.map((blob, index) => (
            <div key={index}>
              <audio controls>
                <source src={URL.createObjectURL(blob)} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
              <p><strong>Status:</strong> {statuses[index] || "Transcribing..."}</p>
              <p><strong>Transcription:</strong> {transcriptions[index] || "Waiting for transcription..."}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
