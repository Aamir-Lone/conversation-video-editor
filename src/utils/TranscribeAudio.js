// import { createClient } from "@deepgram/sdk";

// const DEEPGRAM_API_KEY = process.env.REACT_APP_DEEPGRAM_API_KEY;

// console.log("Deepgram API Key:", DEEPGRAM_API_KEY);


// if (!DEEPGRAM_API_KEY) {
//   throw new Error("🚨 Deepgram API key is missing! Check your .env file.");
// }

// // ✅ Use the correct initialization method for Deepgram v3
// const deepgram = createClient(DEEPGRAM_API_KEY);

// export const transcribeAudio = async (audioBlob) => {
//   try {
//     console.log("🔄 Fetching audio file for transcription...");

//     // Convert Blob to ArrayBuffer
//     const audioBuffer = await audioBlob.arrayBuffer();

//     // ✅ Use Deepgram v3 API format
//     const response = await deepgram.listen.prerecorded.transcribe(
//       {
//         buffer: audioBuffer,
//         mimetype: "audio/wav",
//       },
//       {
//         model: "whisper",
//         smart_format: true,
//       }
//     );

//     if (!response || !response.results) {
//       throw new Error("❌ Invalid transcription response.");
//     }

//     console.log("✅ Transcription successful:", response.results);
//     return response.results;
//   } catch (error) {
//     console.error("❌ Deepgram Transcription Error:", error);
//     return null;
//   }
// };
//************************************************************************************************** */

// export const transcribeAudio = async (audioBlob) => {
//     try {
//       console.log("🔄 Fetching audio file for transcription...");
  
//       // Convert Blob to Base64
//       const reader = new FileReader();
//       reader.readAsDataURL(audioBlob);
  
//       const audioBase64 = await new Promise((resolve) => {
//         reader.onloadend = () => resolve(reader.result);
//       });
  
//       // ✅ Send to your proxy server instead of Deepgram API
//       const response = await fetch("http://localhost:5000/transcribe", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ audio: audioBase64 }),
//       });
  
//       const data = await response.json();
  
//       if (!data || !data.results) {
//         throw new Error("❌ Invalid transcription response.");
//       }
  
//       console.log("✅ Transcription successful:", data.results);
//       return data.results;
//     } catch (error) {
//       console.error("❌ Transcription Error:", error);
//       return null;
//     }
//   };
  



// export const transcribeAudio = async (audioBlob) => {
//     console.log("🔄 Fetching audio file for transcription...");
  
//     // Save the extracted audio to test it manually
//     const audioURL = URL.createObjectURL(audioBlob);
//     console.log("🎵 Extracted Audio URL:", audioURL);
    
//     const formData = new FormData();
//     formData.append("audio", audioBlob, "audio.wav");
  
//     try {
//       const response = await fetch("http://localhost:5000/transcribe", {
//         method: "POST",
//         body: formData,
//       });
  
//       if (!response.ok) {
//         throw new Error("❌ Failed to get transcription.");
//       }
  
//       const data = await response.json();
//       console.log("✅ Deepgram Transcription:", data);
//       return data;
//     } catch (error) {
//       console.error("❌ Transcription Error:", error);
//       return null;
//     }
//   };
  


export const transcribeAudio = async (audioBlob) => {
    console.log("🔄 Fetching audio file for transcription...");
  
    // Save the extracted audio to test it manually
    const audioURL = URL.createObjectURL(audioBlob);
    console.log("🎵 Extracted Audio URL:", audioURL);
    
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.wav");
  
    try {
      const response = await fetch("http://localhost:5000/transcribe", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("❌ Failed to get transcription.");
      }
  
      const data = await response.json();
      console.log("✅ Deepgram Transcription:", data);
      
      return data; // Return full response for processing in App.js
    } catch (error) {
      console.error("❌ Transcription Error:", error);
      return null;
    }
  };
  