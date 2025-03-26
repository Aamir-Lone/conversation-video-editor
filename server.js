

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const axios = require("axios");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 5000;
const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;

app.use(cors());
app.use(express.json());

// Ensure required directories exist
const TRANSCRIPTION_DIR = "transcriptions";
const AUDIO_DIR = "audio";

[TRANSCRIPTION_DIR, AUDIO_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});

// Configure file upload
const upload = multer({ dest: "uploads/" });

// ✅ Deepgram API Connectivity Test
const testDeepgram = async () => {
  try {
    const response = await axios.get("https://api.deepgram.com/v1/me", {
      headers: { Authorization: `Token ${DEEPGRAM_API_KEY}` },
    });
    console.log("✅ Deepgram is reachable. Account Info:", response.data);
  } catch (error) {
    console.error("❌ Deepgram test failed:", error.response?.data || error.message);
  }
};

// Run API test on server start
testDeepgram();

// Function to generate a unique filename
const generateUniqueFilename = (originalName) => {
  const timestamp = Date.now();
  const randomString = crypto.randomBytes(4).toString("hex"); // 8-character unique identifier
  return `${path.basename(originalName, path.extname(originalName))}_${timestamp}_${randomString}.wav`;
};

// Function to handle transcription with retries
const transcribeWithRetry = async (audioPath, retries = 2) => {
  if (!fs.existsSync(audioPath)) {
    throw new Error(`Audio file not found: ${audioPath}`);
  }

  const stats = fs.statSync(audioPath);
  if (stats.size === 0) {
    throw new Error(`Audio file is empty: ${audioPath}`);
  }

  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      console.log(`📝 Transcription Attempt ${attempt} for ${audioPath}...`);

      const response = await axios.post(
        "https://api.deepgram.com/v1/listen",
        fs.createReadStream(audioPath), // ✅ Stream the file instead of reading it fully into memory
        {
          headers: {
            Authorization: `Token ${DEEPGRAM_API_KEY}`,
            "Content-Type": "audio/wav",
          },
          params: {
            model: "nova", // ✅ Changed from "whisper" to "nova" (Whisper might not be available)
            smart_format: true,
          },
          timeout: 120000, // ⏳ Increased timeout to 120 seconds
        }
      );

      console.log("✅ Transcription Success:", response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ Transcription Failed (Attempt ${attempt}):`, error.response?.data || error.message);
      if (attempt === retries + 1) throw error; // Fail after retries
    }
  }
};

// Transcription API Route
app.post("/transcribe", upload.single("audio"), async (req, res) => {
  try {
    console.log("🔄 Received transcription request...");

    if (!req.file) {
      console.error("❌ No audio file received.");
      return res.status(400).json({ error: "No audio file provided" });
    }

    // Generate a unique filename
    const originalFileName = req.file.originalname.replace(/\s+/g, "_"); // Remove spaces
    const uniqueFilename = generateUniqueFilename(originalFileName);
    const savedAudioPath = path.join(AUDIO_DIR, uniqueFilename);

    // Move the uploaded file to permanent storage
    fs.renameSync(req.file.path, savedAudioPath);
    console.log(`🎵 Audio file saved: ${savedAudioPath} (Size: ${fs.statSync(savedAudioPath).size} bytes)`);

    console.log("📝 Sending audio to Deepgram API...");
    const result = await transcribeWithRetry(savedAudioPath);

    // ✅ Save transcription to a uniquely named file
    const transcriptFilename = `${path.basename(uniqueFilename, ".wav")}.json`;
    const transcriptPath = path.join(TRANSCRIPTION_DIR, transcriptFilename);
    fs.writeFileSync(transcriptPath, JSON.stringify(result, null, 2));
    console.log("💾 Transcription saved:", transcriptPath);

    res.json({ transcription: result, audioPath: savedAudioPath, transcriptPath });
  } catch (error) {
    console.error("❌ Deepgram API Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
