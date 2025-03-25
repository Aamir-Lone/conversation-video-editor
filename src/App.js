// // // import React, { useState } from "react";
// // // import { Container, Typography } from "@mui/material";
// // // import VideoUpload from "./components/videoUpload";
// // // // import ExtractAudio from "./components/ExtractAudio";

// // // function App() {
// // //   // const [uploadedVideos, setUploadedVideos] = useState([]);

// // //   return (
// // //     <Container maxWidth="md" sx={{ mt: 5 }}>
// // //       <Typography variant="h4" gutterBottom>
// // //         Browser-Based Conversation Video Editor
// // //       </Typography>
// // //       <VideoUpload onFilesSelected={setUploadedVideos} />
// // //       {/* <ExtractAudio videos={uploadedVideos} /> */}
// // //     </Container>
// // //   );
// // // }

// // // export default App;
// // // import React, { useState } from "react";
// // // import VideoUpload from "./components/videoUpload";

// // // function App() {
// // //   const [videos, setVideos] = useState([]);

// // //   return (
// // //     <div>
// // //       <h1>Conversation Video Editor</h1>
// // //       <VideoUpload videos={videos} setVideos={setVideos} />
// // //     </div>
// // //   );
// // // }

// // // export default App;
// // ///****************************************** */
// // import React, { useState } from "react";
// // import VideoUpload from "./components/videoUpload";
// // import ExtractAudio from "./components/ExtractAudio";

// // function App() {
// //   const [videos, setVideos] = useState([]);
// //   const [processing, setProcessing] = useState(false);
// //   const [audioUrls, setAudioUrls] = useState([]);

// //   const processVideos = async () => {
// //     if (videos.length !== 2) {
// //       alert("Please upload exactly two videos.");
// //       return;
// //     }

// //     setProcessing(true);
// //     const audio1 = await ExtractAudio(videos[0]);
// //     const audio2 = await ExtractAudio(videos[1]);

// //     if (audio1 && audio2) {
// //       setAudioUrls([audio1, audio2]);
// //     } else {
// //       alert("Audio extraction failed.");
// //     }
// //     setProcessing(false);
// //   };

// //   return (
// //     <div style={{ textAlign: "center", padding: "20px" }}>
// //       <h1>Conversation Video Editor</h1>
// //       <VideoUpload videos={videos} setVideos={setVideos} />

// //       {videos.length === 2 && (
// //         <button onClick={processVideos} disabled={processing} style={{ marginTop: "20px", padding: "10px 20px" }}>
// //           {processing ? "Processing..." : "Process Video"}
// //         </button>
// //       )}

// //       {audioUrls.length > 0 && (
// //         <div>
// //           <h3>Extracted Audio</h3>
// //           {audioUrls.map((url, index) => (
// //             <audio key={index} controls>
// //               <source src={url} type="audio/wav" />
// //               Your browser does not support the audio element.
// //             </audio>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default App;
// //*************************************8 */
// import React, { useState } from "react";
// import VideoUpload from "./components/videoUpload";
// import { extractAudio } from "./components/ExtractAudio"; // Import function

// function App() {
//   const [videos, setVideos] = useState([]);
//   const [processing, setProcessing] = useState(false);
//   const [audioUrls, setAudioUrls] = useState([]);

//   const processVideos = async () => {
//     if (videos.length !== 2) {
//       alert("Please upload exactly two videos.");
//       return;
//     }

//     setProcessing(true);

//     const audio1 = await extractAudio(videos[0]); // Call function properly
//     const audio2 = await extractAudio(videos[1]);

//     if (audio1 && audio2) {
//       setAudioUrls([audio1, audio2]);
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

//       {audioUrls.length > 0 && (
//         <div>
//           <h3>Extracted Audio</h3>
//           {audioUrls.map((url, index) => (
//             <audio key={index} controls>
//               <source src={url} type="audio/wav" />
//               Your browser does not support the audio element.
//             </audio>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
//***************************************************** */
// import React, { useState } from "react";
// import VideoUpload from "./components/videoUpload";
// import { extractAudio } from "./components/ExtractAudio";
// import { transcribeAudio } from "./utils/TranscribeAudio"; // Import transcription function

// function App() {
//   const [videos, setVideos] = useState([]);
//   const [processing, setProcessing] = useState(false);
//   const [audioUrls, setAudioUrls] = useState([]);
//   const [transcriptions, setTranscriptions] = useState([]);

//   const processVideos = async () => {
//     if (videos.length !== 2) {
//       alert("Please upload exactly two videos.");
//       return;
//     }

//     setProcessing(true);
//     setTranscriptions([]); // Reset previous transcriptions

//     const audio1 = await extractAudio(videos[0]);
//     const audio2 = await extractAudio(videos[1]);

//     if (audio1 && audio2) {
//       setAudioUrls([audio1, audio2]);

//       // Transcribe the audio clips
//       const text1 = await transcribeAudio(audio1);
//       const text2 = await transcribeAudio(audio2);

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

//       {audioUrls.length > 0 && (
//         <div>
//           <h3>Extracted Audio</h3>
//           {audioUrls.map((url, index) => (
//             <div key={index}>
//               <audio controls>
//                 <source src={url} type="audio/wav" />
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
//************************************************************************************** */

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
//       const text1 = await transcribeAudio(audio1);
//       const text2 = await transcribeAudio(audio2);

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



import React, { useState } from "react";
import VideoUpload from "./components/videoUpload";
import { extractAudio } from "./components/ExtractAudio";
import { transcribeAudio } from "./utils/TranscribeAudio";

function App() {
  const [videos, setVideos] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [audioBlobs, setAudioBlobs] = useState([]);
  const [transcriptions, setTranscriptions] = useState([]);

  const processVideos = async () => {
    if (videos.length !== 2) {
      alert("Please upload exactly two videos.");
      return;
    }

    setProcessing(true);
    setTranscriptions([]);

    const audio1 = await extractAudio(videos[0]);
    const audio2 = await extractAudio(videos[1]);

    if (audio1 && audio2) {
      setAudioBlobs([audio1, audio2]);

      // Transcribe the extracted audio blobs
      const response1 = await transcribeAudio(audio1);
      const response2 = await transcribeAudio(audio2);

      // Extract text safely
      const text1 = response1?.results?.channels[0]?.alternatives[0]?.transcript || "Transcription failed.";
      const text2 = response2?.results?.channels[0]?.alternatives[0]?.transcript || "Transcription failed.";

      setTranscriptions([text1, text2]);
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
              <p><strong>Transcription:</strong> {transcriptions[index] || "Transcribing..."}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
