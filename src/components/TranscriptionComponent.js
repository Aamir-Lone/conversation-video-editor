// import React, { useState, useEffect } from "react";
// import { Box, Button, Typography, CircularProgress, Tabs, Tab, Paper } from "@mui/material";

// const TranscriptionComponent = ({ audioFiles }) => {
//   const [transcriptions, setTranscriptions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState(0);
//   const [modelLoaded, setModelLoaded] = useState(false);
//   const [voskLoaded, setVoskLoaded] = useState(false);

//   // Load Vosk when component mounts
//   useEffect(() => {
//     const loadVosk = async () => {
//       try {
//         window.vosk = await import('vosk-browser');
//         setVoskLoaded(true);
//         console.log("Vosk loaded successfully");
//       } catch (error) {
//         console.error("Failed to load Vosk:", error);
//       }
//     };
//     loadVosk();
//   }, []);

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   const loadModel = async () => {
//     if (!window.vosk) {
//       alert('Vosk library not loaded');
//       return false;
//     }

//     try {
//       if (!window.voskModel) {
//         setLoading(true);
//         console.log("Loading model...");
        
//         // Initialize the recognizer with the model
//         const modelUrl = '/models/vosk-model-small-en-us-0.15';
//         window.voskModel = await window.vosk.createModel(modelUrl);
        
//         setModelLoaded(true);
//         console.log("Model loaded successfully");
//       }
//       return true;
//     } catch (error) {
//       console.error("Failed to load model:", error);
//       alert('Failed to load speech recognition model');
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const transcribeAudio = async () => {
//     if (!audioFiles || !audioFiles.length) {
//       alert('Please extract audio files first');
//       return;
//     }

//     // Load model if not already loaded
//     const isModelReady = modelLoaded || await loadModel();
//     if (!isModelReady) return;

//     setLoading(true);
//     setTranscriptions([]);
    
//     try {
//       const results = await Promise.all(
//         audioFiles.map(async (audio) => {
//           try {
//             // Convert audio to the format needed by Vosk
//             const audioData = await fetchAudioData(audio.url);
//             const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//             const audioBuffer = await audioContext.decodeAudioData(audioData);
            
//             // Get PCM data
//             const pcm = getAudioPCM(audioBuffer);
            
//             // Create a recognizer
//             const recognizer = new window.vosk.Recognizer({
//               model: window.voskModel,
//               sampleRate: audioBuffer.sampleRate
//             });
            
//             // Process chunks of audio data
//             const chunkSize = 4096;
//             for (let i = 0; i < pcm.length; i += chunkSize) {
//               const chunk = pcm.subarray(i, i + chunkSize);
//               recognizer.acceptWaveform(chunk);
//             }
            
//             // Get final result
//             const result = recognizer.finalResult();
//             recognizer.free();
            
//             return {
//               name: audio.name,
//               transcript: result.text
//             };
//           } catch (error) {
//             console.error('Error transcribing audio:', error);
//             return {
//               name: audio.name,
//               transcript: 'Error transcribing audio: ' + error.message
//             };
//           }
//         })
//       );

//       setTranscriptions(results);
//     } catch (error) {
//       console.error('Transcription error:', error);
//       alert('Error during transcription.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function to fetch audio data
//   const fetchAudioData = async (url) => {
//     const response = await fetch(url);
//     return await response.arrayBuffer();
//   };

//   // Helper function to convert AudioBuffer to PCM
//   const getAudioPCM = (audioBuffer) => {
//     // Get only first channel of audio
//     const channel = audioBuffer.getChannelData(0);
    
//     // Convert float32 to int16
//     const int16Array = new Int16Array(channel.length);
//     for (let i = 0; i < channel.length; i++) {
//       int16Array[i] = Math.max(-32768, Math.min(32767, channel[i] * 32768));
//     }
    
//     return int16Array;
//   };

//   return (
//     <Box mt={4}>
//       <Typography variant="h5" gutterBottom>
//         Transcribe Audio
//       </Typography>
      
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={transcribeAudio}
//         disabled={loading || !audioFiles || !audioFiles.length || !voskLoaded}
//         sx={{ mb: 2 }}
//       >
//         {loading ? 
//           (modelLoaded ? "Transcribing..." : "Loading Model...") : 
//           (modelLoaded ? "Start Transcription" : "Load Model & Transcribe")}
//       </Button>
      
//       {loading && <CircularProgress size={24} sx={{ ml: 2 }} />}
      
//       {!voskLoaded && (
//         <Typography color="info" variant="body2" gutterBottom>
//           Loading speech recognition engine...
//         </Typography>
//       )}
      
//       {transcriptions.length > 0 && (
//         <Box mt={2}>
//           <Tabs value={activeTab} onChange={handleTabChange}>
//             {transcriptions.map((t, index) => (
//               <Tab key={index} label={`Audio ${index + 1}`} />
//             ))}
//           </Tabs>
          
//           {transcriptions.map((transcription, index) => (
//             <Box
//               key={index}
//               role="tabpanel"
//               hidden={activeTab !== index}
//               sx={{ mt: 2 }}
//             >
//               {activeTab === index && (
//                 <Paper elevation={2} sx={{ p: 2 }}>
//                   <Typography variant="subtitle1" gutterBottom>
//                     {transcription.name}
//                   </Typography>
//                   <Typography variant="body1" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
//                     {transcription.transcript}
//                   </Typography>
//                 </Paper>
//               )}
//             </Box>
//           ))}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default TranscriptionComponent;