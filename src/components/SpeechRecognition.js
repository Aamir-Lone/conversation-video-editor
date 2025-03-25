// // Ensure SpeechRecognition is available in the browser
// window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// const recognition = new SpeechRecognition();
// recognition.continuous = false;  // Stops after one speech segment (set true for continuous)
// recognition.interimResults = true;  // Show partial results
// recognition.lang = "en-US";  // Set language

// export const startSpeechRecognition = (audioElement, onTranscriptUpdate) => {
//     recognition.onresult = (event) => {
//         let transcript = "";
//         for (let i = event.resultIndex; i < event.results.length; i++) {
//             transcript += event.results[i][0].transcript + " ";
//         }
//         console.log("Transcript:", transcript);
//         onTranscriptUpdate(transcript);  // Send transcript to UI
//     };

//     recognition.onerror = (event) => console.error("Speech Recognition Error:", event.error);

//     audioElement.play();  // Play the audio
//     recognition.start();  // Start listening
// };
// ********************************************************************************************************

import { transcribeAudio } from "./vosk";

export const startSpeechRecognition = async (audioUrl, setTranscript) => {
  try {
    const response = await fetch(audioUrl);
    const blob = await response.blob();
    const transcript = await transcribeAudio(blob);
    setTranscript(transcript.text);
  } catch (error) {
    console.error("Vosk transcription error:", error);
  }
};
