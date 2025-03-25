import { Model, KaldiRecognizer } from "vosk-browser";

// Load the Vosk model (Ensure the model files are served correctly)
const MODEL_URL = "/vosk-model-small-en-us-0.15";  // Place model in `public/`

let model = null;

export const loadVoskModel = async () => {
  if (!model) {
    model = new Model(MODEL_URL);
    await model.load();
  }
  return model;
};

export const transcribeAudio = async (audioBlob) => {
  const model = await loadVoskModel();
  const recognizer = new KaldiRecognizer(model, 16000);

  const audioContext = new AudioContext();
  const buffer = await audioBlob.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(buffer);
  const channelData = audioBuffer.getChannelData(0); // Convert stereo to mono

  recognizer.acceptWaveform(channelData);
  return recognizer.finalResult();
};
