// import React, { useState } from "react";
// import ExtractAudio from "./ExtractAudio";
// import transcribeAudio from "../utils/TranscribeAudio";

// const VideoUpload = () => {
//   const [videos, setVideos] = useState([null, null]);
//   const [processing, setProcessing] = useState(false);
//   const [audioUrls, setAudioUrls] = useState([null, null]);
//   const [transcripts, setTranscripts] = useState(["", ""]);

//   const handleFileUpload = (index, file) => {
//     const updatedVideos = [...videos];
//     updatedVideos[index] = file;
//     setVideos(updatedVideos);
//   };

//   const processVideos = async () => {
//     setProcessing(true);

//     try {
//       console.log("Starting audio extraction...");

//       const audio1 = await ExtractAudio.extractAudio(videos[0]);
//       const audio2 = await ExtractAudio.extractAudio(videos[1]);

//       setAudioUrls([audio1, audio2]);

//       if (audio1 && audio2) {
//         console.log("Audio extracted. Starting transcription...");

//         const transcript1 = await transcribeAudio(audio1);
//         const transcript2 = await transcribeAudio(audio2);

//         setTranscripts([transcript1, transcript2]);
//       } else {
//         console.error("Audio extraction failed for one or both videos.");
//       }
//     } catch (error) {
//       console.error("Processing error:", error);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept="video/*" onChange={(e) => handleFileUpload(0, e.target.files[0])} />
//       <input type="file" accept="video/*" onChange={(e) => handleFileUpload(1, e.target.files[0])} />

//       <button onClick={processVideos} disabled={processing}>
//         {processing ? "Processing..." : "Process Videos"}
//       </button>

//       {audioUrls[0] && <audio controls src={audioUrls[0]} />}
//       {audioUrls[1] && <audio controls src={audioUrls[1]} />}

//       {transcripts[0] && <p>Transcript 1: {transcripts[0]}</p>}
//       {transcripts[1] && <p>Transcript 2: {transcripts[1]}</p>}
//     </div>
//   );
// };

// export default VideoUpload;
//********************************************************************************************** */

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Box, Typography } from "@mui/material";

const VideoUpload = ({ videos, setVideos }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length + videos.length > 2) {
        alert("You can only upload two videos.");
        return;
      }
      setVideos([...videos, ...acceptedFiles]);
    },
    [videos, setVideos]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: "video/mp4, video/webm",
    onDrop,
    multiple: true,
    maxFiles: 2,
  });

  return (
    <Box textAlign="center" mt={2}>
      <Typography variant="h5">Upload Two Videos</Typography>
      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed #ccc",
          padding: "20px",
          cursor: "pointer",
          marginTop: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <input {...getInputProps()} />
        <Typography>Drag & Drop videos here or click to select</Typography>
      </Box>

      {videos.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">Uploaded Videos:</Typography>
          {videos.map((video, index) => (
            <Typography key={index}>{video.name}</Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default VideoUpload;
