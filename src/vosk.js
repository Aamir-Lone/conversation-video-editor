import { createModel, createRecognizer } from "vosk-browser";

let model = null;

(async () => {
  model = await createModel("https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip");
})();

export const transcribeAudio = async (audioBlob) => {
  if (!model) {
    console.error("Vosk model is still loading...");
    return "Model is still loading, please try again later.";
  }

  try {
    const recognizer = createRecognizer(model, 16000);
    const audioBuffer = await audioBlob.arrayBuffer();
    const int16Array = new Int16Array(audioBuffer);

    recognizer.acceptWaveform(int16Array);
    const result = recognizer.finalResult();

    return result.text;
  } catch (error) {
    console.error("Error transcribing audio:", error);
    return "Transcription failed.";
  }
};
