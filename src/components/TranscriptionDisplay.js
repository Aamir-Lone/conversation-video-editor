import React, { useState } from "react";
import { transcribeAudio } from "../utils/TranscribeAudio";

const TranscriptionDisplay = ({ audioBlob }) => {
  const [transcription, setTranscription] = useState(null);
  const [status, setStatus] = useState("Waiting for transcription...");

  const handleTranscription = async () => {
    setStatus("Transcribing...");
    
    const result = await transcribeAudio(audioBlob);

    if (result.error) {
      setStatus("❌ Transcription Failed");
      setTranscription(null);
    } else {
      setStatus("✅ Transcription Successful");
      setTranscription(result.transcriptText);
    }
  };

  return (
    <div>
      <button onClick={handleTranscription}>Transcribe Audio</button>
      <p>{status}</p>
      {transcription && <p><strong>Transcription:</strong> {transcription}</p>}
    </div>
  );
};

export default TranscriptionDisplay;
