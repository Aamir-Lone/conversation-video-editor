// import React, { useState, useEffect } from "react";
// // import { FFmpeg } from "@ffmpeg/ffmpeg";
// import { Button, Box, Typography, CircularProgress } from "@mui/material";
// import { FFmpeg } from '@ffmpeg/ffmpeg';
// const ffmpeg = new FFmpeg();


// // const ffmpeg = new FFmpeg();

// const ExtractAudio = ({ videos }) => {
//   const [audioFiles, setAudioFiles] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const loadFFmpeg = async () => {
//       if (!ffmpeg.isLoaded()) {
//         await ffmpeg.load();
//       }
//     };
//     loadFFmpeg();
//   }, []);

//   const extractAudio = async () => {
//     if (videos.length !== 2) {
//       alert("Please upload two videos first.");
//       return;
//     }

//     setLoading(true);
//     setAudioFiles([]);

//     const extractedAudios = [];

//     for (const video of videos) {
//       const fileName = video.name;
//       const audioFileName = fileName.replace(/\.[^.]+$/, ".mp3");

//       const reader = new FileReader();
//       reader.readAsArrayBuffer(video);

//       reader.onload = async () => {
//         ffmpeg.FS("writeFile", fileName, new Uint8Array(reader.result));
//         await ffmpeg.run("-i", fileName, "-q:a", "0", "-map", "a", audioFileName);
//         const audioData = ffmpeg.FS("readFile", audioFileName);

//         const audioBlob = new Blob([audioData.buffer], { type: "audio/mp3" });
//         const audioUrl = URL.createObjectURL(audioBlob);
//         extractedAudios.push({ name: audioFileName, url: audioUrl });

//         setAudioFiles([...extractedAudios]);
//       };
//     }

//     setLoading(false);
//   };

//   return (
//     <Box textAlign="center" mt={3}>
//       <Button variant="contained" color="primary" onClick={extractAudio} disabled={loading}>
//         {loading ? "Extracting..." : "Extract Audio"}
//       </Button>

//       {loading && <CircularProgress sx={{ mt: 2 }} />}

//       {audioFiles.length > 0 && (
//         <Box mt={2}>
//           {audioFiles.map((audio, index) => (
//             <Box key={index} mt={1}>
//               <Typography variant="body1">{audio.name}</Typography>
//               <audio controls src={audio.url} />
//             </Box>
//           ))}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default ExtractAudio;


//************************************************************************************************ */

// import React, { useState, useEffect } from "react";
// import { Button, Box, Typography, CircularProgress } from "@mui/material";
// import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

// const ExtractAudio = ({ videos }) => {
//   const [audioFiles, setAudioFiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  
//   const ffmpeg = createFFmpeg({ 
//     log: true,
//     corePath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js'
//   });

//   useEffect(() => {
//     const loadFFmpeg = async () => {
//       try {
//         await ffmpeg.load();
//         setFfmpegLoaded(true);
//         console.log("FFmpeg loaded successfully");
//       } catch (error) {
//         console.error("FFmpeg loading error:", error);
//       }
//     };
    
//     loadFFmpeg();
//   }, []);

//   const extractAudio = async () => {
//     if (videos.length !== 2) {
//       alert("Please upload two videos first.");
//       return;
//     }

//     if (!ffmpegLoaded) {
//       alert("FFmpeg is not loaded yet. Please wait.");
//       return;
//     }

//     setLoading(true);
//     setAudioFiles([]);

//     const extractedAudios = [];

//     try {
//       for (let i = 0; i < videos.length; i++) {
//         const video = videos[i];
//         const fileName = video.name;
//         const audioFileName = `audio_${i}.mp3`;

//         // Write the video file to FFmpeg's virtual file system
//         ffmpeg.FS('writeFile', fileName, await fetchFile(video));
        
//         // Run the FFmpeg command to extract audio
//         await ffmpeg.run('-i', fileName, '-q:a', '0', '-map', 'a', audioFileName);
        
//         // Read the output audio file
//         const audioData = ffmpeg.FS('readFile', audioFileName);
        
//         // Create a blob URL for the audio
//         const audioBlob = new Blob([audioData.buffer], { type: 'audio/mp3' });
//         const audioUrl = URL.createObjectURL(audioBlob);
        
//         extractedAudios.push({ 
//           name: video.name.replace(/\.[^.]+$/, ".mp3"), 
//           url: audioUrl 
//         });
//       }
      
//       setAudioFiles(extractedAudios);
//     } catch (error) {
//       console.error("Error during audio extraction:", error);
//       alert("An error occurred during audio extraction");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box textAlign="center" mt={3}>
//       <Button 
//         variant="contained" 
//         color="primary" 
//         onClick={extractAudio} 
//         disabled={loading || !ffmpegLoaded}
//       >
//         {!ffmpegLoaded ? "Loading FFmpeg..." : loading ? "Extracting..." : "Extract Audio"}
//       </Button>

//       {loading && <CircularProgress sx={{ mt: 2 }} />}

//       {audioFiles.length > 0 && (
//         <Box mt={2}>
//           {audioFiles.map((audio, index) => (
//             <Box key={index} mt={1}>
//               <Typography variant="body1">{audio.name}</Typography>
//               <audio controls src={audio.url} />
//             </Box>
//           ))}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default ExtractAudio;

//*************************************************************************************************************** */

import React, { useState, useEffect } from "react";
import { Button, Box, Typography, CircularProgress } from "@mui/material";
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({
  log: true,
  corePath: "https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js"
});

let ffmpegLoadingPromise = null;

const ExtractAudio = ({ videos }) => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ffmpegReady, setFfmpegReady] = useState(false);

  useEffect(() => {
    // Load FFmpeg only once
    if (!ffmpegLoadingPromise) {
      ffmpegLoadingPromise = ffmpeg.load();
    }
    
    ffmpegLoadingPromise
      .then(() => {
        setFfmpegReady(true);
        console.log("FFmpeg loaded successfully");
      })
      .catch(err => {
        console.error("Error loading FFmpeg:", err);
        alert("Failed to load FFmpeg. Please try refreshing the page.");
      });
  }, []);

  const extractAudio = async () => {
    if (videos.length !== 2) {
      alert("Please upload two videos first.");
      return;
    }

    if (!ffmpegReady) {
      alert("FFmpeg is still loading. Please wait.");
      return;
    }

    setLoading(true);
    const newAudioFiles = [];

    try {
      for (let i = 0; i < videos.length; i++) {
        const video = videos[i];
        const inputName = `input_${i}.mp4`;
        const outputName = `output_${i}.mp3`;

        // Write the file to memory
        ffmpeg.FS('writeFile', inputName, await fetchFile(video));
        
        // Run the FFmpeg command
        await ffmpeg.run(
          '-i', inputName,
          '-vn', // Disable video
          '-acodec', 'libmp3lame',
          '-q:a', '2',
          outputName
        );
        
        // Read the result
        const data = ffmpeg.FS('readFile', outputName);
        
        // Create an audio element
        const blob = new Blob([data.buffer], { type: 'audio/mp3' });
        const url = URL.createObjectURL(blob);
        
        newAudioFiles.push({
          name: video.name.replace(/\.[^/.]+$/, "") + ".mp3",
          url: url
        });
        
        // Clean up files in memory
        ffmpeg.FS('unlink', inputName);
        ffmpeg.FS('unlink', outputName);
      }
      
      setAudioFiles(newAudioFiles);
    } catch (error) {
      console.error("Error extracting audio:", error);
      alert("An error occurred while extracting audio.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box textAlign="center" mt={3}>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={extractAudio} 
        disabled={loading || !ffmpegReady}
      >
        {!ffmpegReady ? "Loading FFmpeg..." : loading ? "Extracting..." : "Extract Audio"}
      </Button>

      {loading && <CircularProgress sx={{ mt: 2 }} />}

      {audioFiles.length > 0 && (
        <Box mt={2}>
          {audioFiles.map((audio, index) => (
            <Box key={index} mt={1}>
              <Typography variant="body1">{audio.name}</Typography>
              <audio controls src={audio.url} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ExtractAudio;