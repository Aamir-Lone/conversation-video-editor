

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
      
//       return data; // Return full response for processing in App.js
//     } catch (error) {
//       console.error("❌ Transcription Error:", error);
//       return null;
//     }
//   };
  //***************************************************************** */

  export const transcribeAudio = async (audioBlob) => {
    console.log("🔄 Fetching audio file for transcription...");
  
    // Create a temporary URL for debugging
    const audioURL = URL.createObjectURL(audioBlob);
    console.log("🎵 Extracted Audio URL:", audioURL);
  
    // Prepare FormData
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.wav");
  
    try {
      // Send request to backend
      const response = await fetch("http://localhost:5000/transcribe", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`❌ Failed to get transcription. Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("✅ Full Transcription Response:", data);
  
      // Validate if transcription exists in response
      if (!data.transcription || !data.transcription.results) {
        console.error("❌ Unexpected transcription format:", data);
        return { error: "Invalid transcription response" };
      }
  
      // Extract transcript text from Deepgram API response
      const transcriptText = data.transcription.results.channels?.[0]?.alternatives?.[0]?.transcript || "";
  
      if (!transcriptText) {
        console.warn("⚠️ No transcription text found in response.");
        return { error: "No transcription found" };
      }
  
      console.log("📝 Extracted Transcription:", transcriptText);
  
      // ✅ Return structured data including transcription
      return {
        success: true,
        transcriptText,
        audioPath: data.audioPath,
        transcriptPath: data.transcriptPath,
      };
  
    } catch (error) {
      console.error("❌ Transcription Error:", error.message);
      return { error: error.message };
    }
  };
  