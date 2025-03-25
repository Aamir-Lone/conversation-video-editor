

// // import React, { useState, useEffect } from "react";
// // import { Button, Box, Typography, CircularProgress } from "@mui/material";
// // import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

// // const ffmpeg = createFFmpeg({
// //   log: true,
// //   corePath: "https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js"
// // });

// // let ffmpegLoadingPromise = null;

// // const ExtractAudio = ({ videos }) => {
// //   const [audioFiles, setAudioFiles] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [ffmpegReady, setFfmpegReady] = useState(false);

// //   useEffect(() => {
// //     // Load FFmpeg only once
// //     if (!ffmpegLoadingPromise) {
// //       ffmpegLoadingPromise = ffmpeg.load();
// //     }
    
// //     ffmpegLoadingPromise
// //       .then(() => {
// //         setFfmpegReady(true);
// //         console.log("FFmpeg loaded successfully");
// //       })
// //       .catch(err => {
// //         console.error("Error loading FFmpeg:", err);
// //         alert("Failed to load FFmpeg. Please try refreshing the page.");
// //       });
// //   }, []);

// //   const extractAudio = async () => {
// //     if (videos.length !== 2) {
// //       alert("Please upload two videos first.");
// //       return;
// //     }

// //     if (!ffmpegReady) {
// //       alert("FFmpeg is still loading. Please wait.");
// //       return;
// //     }

// //     setLoading(true);
// //     const newAudioFiles = [];

// //     try {
// //       for (let i = 0; i < videos.length; i++) {
// //         const video = videos[i];
// //         const inputName = `input_${i}.mp4`;
// //         const outputName = `output_${i}.mp3`;

// //         // Write the file to memory
// //         ffmpeg.FS('writeFile', inputName, await fetchFile(video));
        
// //         // Run the FFmpeg command
// //         await ffmpeg.run(
// //           '-i', inputName,
// //           '-vn', // Disable video
// //           '-acodec', 'libmp3lame',
// //           '-q:a', '2',
// //           outputName
// //         );
        
// //         // Read the result
// //         const data = ffmpeg.FS('readFile', outputName);
        
// //         // Create an audio element
// //         const blob = new Blob([data.buffer], { type: 'audio/mp3' });
// //         const url = URL.createObjectURL(blob);
        
// //         newAudioFiles.push({
// //           name: video.name.replace(/\.[^/.]+$/, "") + ".mp3",
// //           url: url
// //         });
        
// //         // Clean up files in memory
// //         ffmpeg.FS('unlink', inputName);
// //         ffmpeg.FS('unlink', outputName);
// //       }
      
// //       setAudioFiles(newAudioFiles);
// //     } catch (error) {
// //       console.error("Error extracting audio:", error);
// //       alert("An error occurred while extracting audio.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Box textAlign="center" mt={3}>
// //       <Button 
// //         variant="contained" 
// //         color="primary" 
// //         onClick={extractAudio} 
// //         disabled={loading || !ffmpegReady}
// //       >
// //         {!ffmpegReady ? "Loading FFmpeg..." : loading ? "Extracting..." : "Extract Audio"}
// //       </Button>

// //       {loading && <CircularProgress sx={{ mt: 2 }} />}

// //       {audioFiles.length > 0 && (
// //         <Box mt={2}>
// //           {audioFiles.map((audio, index) => (
// //             <Box key={index} mt={1}>
// //               <Typography variant="body1">{audio.name}</Typography>
// //               <audio controls src={audio.url} />
// //             </Box>
// //           ))}
// //         </Box>
// //       )}
// //     </Box>
// //   );
// // };

// // export default ExtractAudio;

// // ********************************************************************************************************************88
// // import React, { useState, useEffect } from "react";
// // import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

// // const ffmpeg = createFFmpeg({
// //   log: true,
// //   corePath: "https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js"
// // });

// // const ExtractAudio = ({ videos, onAudioExtracted }) => {
// //   const [ffmpegReady, setFfmpegReady] = useState(false);

// //   useEffect(() => {
// //     ffmpeg.load().then(() => setFfmpegReady(true)).catch(err => console.error("FFmpeg load error:", err));
// //   }, []);

// //   const extractAudio = async (video) => {
// //     if (!video) {
// //       alert("Please upload two videos first.");
// //       return;
// //     }

// //     if (!ffmpegReady) {
// //       alert("FFmpeg is still loading.");
// //       return;
// //     }

// //     try {
// //       const inputName = "input.mp4";
// //       const outputName = "output.wav"; // WAV format for Vosk

// //       ffmpeg.FS("writeFile", inputName, await fetchFile(video));
// //       await ffmpeg.run(
// //         "-i", inputName,
// //         "-ac", "1", // Mono audio
// //         "-ar", "16000", // Required for Vosk
// //         "-acodec", "pcm_s16le",
// //         outputName
// //       );

// //       const data = ffmpeg.FS("readFile", outputName);
// //       const blob = new Blob([data.buffer], { type: "audio/wav" });
// //       const url = URL.createObjectURL(blob);

// //       ffmpeg.FS("unlink", inputName);
// //       ffmpeg.FS("unlink", outputName);

// //       return url;
// //     } catch (error) {
// //       console.error("Audio extraction failed:", error);
// //       return null;
// //     }
// //   };

// //   return null; // No UI elements here anymore
// // };

// // export default ExtractAudio;
// //888*********************************************************************************

// import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

// const ffmpeg = createFFmpeg({
//   log: true,
//   corePath: "https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js",
// });

// let isFFmpegLoaded = false;

// const loadFFmpeg = async () => {
//   if (!isFFmpegLoaded) {
//     await ffmpeg.load();
//     isFFmpegLoaded = true;
//   }
// };

// // const extractAudio = async (videoFile) => {
// //   if (!videoFile) {
// //     alert("Please upload a video first.");
// //     return null;
// //   }

// //   try {
// //     await loadFFmpeg();

// //     const inputName = "input.mp4";
// //     const outputName = "output.wav"; // WAV format for Vosk

// //     ffmpeg.FS("writeFile", inputName, await fetchFile(videoFile));
// //     await ffmpeg.run(
// //       "-i", inputName,
// //       "-ac", "1", // Mono audio
// //       "-ar", "16000", // Required for Vosk
// //       "-acodec", "pcm_s16le",
// //       outputName
// //     );

// //     const data = ffmpeg.FS("readFile", outputName);
// //     const blob = new Blob([data.buffer], { type: "audio/wav" });
// //     const url = URL.createObjectURL(blob);

// //     ffmpeg.FS("unlink", inputName);
// //     ffmpeg.FS("unlink", outputName);

// //     return url;
// //   } catch (error) {
// //     console.error("Audio extraction failed:", error);
// //     return null;
// //   }
// // };

// const extractAudio = async (video) => {
//   if (!video) {
//     console.error("No video file provided.");
//     return null;
//   }

//   if (!ffmpegReady) {
//     console.error("FFmpeg is still loading.");
//     return null;
//   }

//   try {
//     console.log("Extracting audio...");
    
//     const inputName = "input.mp4";
//     const outputName = "output.wav";

//     ffmpeg.FS("writeFile", inputName, await fetchFile(video));
//     await ffmpeg.run(
//       "-i", inputName,
//       "-ac", "1",
//       "-ar", "16000",
//       "-acodec", "pcm_s16le",
//       outputName
//     );

//     const data = ffmpeg.FS("readFile", outputName);
//     const blob = new Blob([data.buffer], { type: "audio/wav" });
//     const url = URL.createObjectURL(blob);

//     console.log("Audio extracted successfully:", url);

//     return url;  // ✅ Ensure this URL is returned
//   } catch (error) {
//     console.error("Audio extraction failed:", error);
//     return null;
//   }
// };

// export default extractAudio;
//****************************************************************************** */

// import React, { useState, useEffect } from "react";
// import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

// const ffmpeg = createFFmpeg({
//   log: true,
//   corePath: "https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js"
// });

// const ExtractAudio = () => {
//   const [ffmpegReady, setFfmpegReady] = useState(false);

//   useEffect(() => {
//     // const loadFFmpeg = async () => {
//     //   await ffmpeg.load();
//     //   setFfmpegReady(true);
//     // };

//     loadFFmpeg().catch(err => console.error("FFmpeg load error:", err));
//   }, []);

//   const extractAudio = async (video) => {
//     if (!video) {
//       console.error("No video file provided.");
//       return null;
//     }

//     if (!ffmpegReady) {
//       console.error("FFmpeg is still loading.");
//       return null;
//     }

//     try {
//       console.log("Extracting audio...");
      
//       const inputName = "input.mp4";
//       const outputName = "output.wav";

//       ffmpeg.FS("writeFile", inputName, await fetchFile(video));
//       await ffmpeg.run(
//         "-i", inputName,
//         "-ac", "1",
//         "-ar", "16000",
//         "-acodec", "pcm_s16le",
//         outputName
//       );

//       const data = ffmpeg.FS("readFile", outputName);
//       const blob = new Blob([data.buffer], { type: "audio/wav" });
//       const url = URL.createObjectURL(blob);

//       console.log("Audio extracted successfully:", url);

//       return url;
//     } catch (error) {
//       console.error("Audio extraction failed:", error);
//       return null;
//     }
//   };

//   return { extractAudio };
// };

// export default ExtractAudio;
//********************************************************************** */

// import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

// const ffmpeg = createFFmpeg({
//   log: true,
//   corePath: "https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js",
// });

// export const extractAudio = async (video) => {
//   if (!ffmpeg.isLoaded()) {
//     await ffmpeg.load();
//   }

//   try {
//     const inputName = "input.mp4";
//     const outputName = "output.wav"; // WAV format for Vosk

//     ffmpeg.FS("writeFile", inputName, await fetchFile(video));
//     await ffmpeg.run(
//       "-i", inputName,
//       "-ac", "1", // Mono audio
//       "-ar", "16000", // Required for Vosk
//       "-acodec", "pcm_s16le",
//       outputName
//     );

//     const data = ffmpeg.FS("readFile", outputName);
//     const blob = new Blob([data.buffer], { type: "audio/wav" });
//     const url = URL.createObjectURL(blob);

//     ffmpeg.FS("unlink", inputName);
//     ffmpeg.FS("unlink", outputName);

//     return url;
//   } catch (error) {
//     console.error("Audio extraction failed:", error);
//     return null;
//   }
// };
//***************************************************************** */

// //********************************************************************************* */
// import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

// const ffmpeg = createFFmpeg({
//   log: true,
//   corePath: "https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js",
// });

// export const extractAudio = async (video) => {
//   try {
//     if (!ffmpeg.isLoaded()) {
//       console.log("Loading FFmpeg...");
//       await ffmpeg.load();
//       console.log("FFmpeg loaded successfully.");
//     }

//     const inputName = "input.mp4";
//     const outputName = "output.wav";

//     // Write video file to FFmpeg virtual filesystem
//     ffmpeg.FS("writeFile", inputName, await fetchFile(video));

//     // Run FFmpeg command to extract audio
//     await ffmpeg.run(
//       "-i", inputName,   // Input video
//       "-vn",            // Disable video
//       "-ac", "1",       // Convert to mono
//       "-ar", "16000",   // Required for transcription models
//       "-acodec", "pcm_s16le", // Output format PCM 16-bit
//       outputName
//     );

//     console.log("Audio extraction complete.");

//     // Read the extracted audio file
//     const data = ffmpeg.FS("readFile", outputName);
//     const audioBlob = new Blob([data.buffer], { type: "audio/wav" });

//     // Clean up FFmpeg virtual file system
//     ffmpeg.FS("unlink", inputName);
//     ffmpeg.FS("unlink", outputName);

//     return audioBlob; // Return the extracted audio as a Blob
//   } catch (error) {
//     console.error("❌ Audio extraction failed:", error);
//     return null;
//   }
// };



import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({
  log: true,
  corePath: "https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js",
});

export const extractAudio = async (video) => {
  if (!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  }

  try {
    const inputName = "input.mp4";
    const outputName = "output.wav";

    ffmpeg.FS("writeFile", inputName, await fetchFile(video));

    await ffmpeg.run(
      "-i", inputName,
      "-ac", "1", // Convert to mono
      "-ar", "16000", // Ensure 16kHz sample rate (Deepgram requirement)
      "-c:a", "pcm_s16le", // 16-bit little-endian PCM format
      outputName
    );

    const data = ffmpeg.FS("readFile", outputName);
    const blob = new Blob([data.buffer], { type: "audio/wav" });

    ffmpeg.FS("unlink", inputName);
    ffmpeg.FS("unlink", outputName);

    return blob;
  } catch (error) {
    console.error("❌ Audio extraction failed:", error);
    return null;
  }
};
