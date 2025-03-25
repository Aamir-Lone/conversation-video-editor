
// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const fs = require("fs");
// const axios = require("axios");

// const app = express();
// app.use(cors());

// const upload = multer({ dest: "uploads/" }); // Temporary folder for files
// const PORT = 5000;
// const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;

// app.post("/transcribe", upload.single("audio"), async (req, res) => {
//   try {
//     console.log("🔄 Received transcription request...");

//     if (!req.file) {
//       console.error("❌ No audio file received.");
//       return res.status(400).json({ error: "No audio file provided" });
//     }

//     console.log("📂 Processing file:", req.file.path);

//     const audioData = fs.readFileSync(req.file.path);
//     fs.unlinkSync(req.file.path); // Clean up temp file

//     console.log("📝 Sending audio to Deepgram API...");

//     const response = await axios.post(
//       "https://api.deepgram.com/v1/listen",
//       audioData,
//       {
//         headers: {
//           Authorization: `Token ${DEEPGRAM_API_KEY}`,
//           "Content-Type": "audio/wav",
//         },
//         params: {
//           model: "whisper",
//           smart_format: true,
//         },
//       }
//     );

//     console.log("✅ Deepgram response:", response.data);

//     // Send only necessary data
//     res.json({
//       results: response.data.results
//     });
//   } catch (error) {
//     console.error("❌ Deepgram API Error:", error.response?.data || error.message);
//     res.status(500).json({ error: error.response?.data || error.message });
//   }
// });

// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


//****************************************************************************************************** */

//code to request time stamps along with the transcript from deepgram


// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const fs = require("fs");
// const axios = require("axios");

// const app = express();
// const PORT = process.env.PORT || 5000;
// const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;

// app.use(cors());
// app.use(express.json());

// // File upload configuration
// const upload = multer({ dest: "uploads/" });

// // ✅ Deepgram API Connectivity Test (Fix 404 Issue)
// const testDeepgram = async () => {
//   try {
//     const response = await axios.get("https://api.deepgram.com/v1/me", {
//       headers: { Authorization: `Token ${DEEPGRAM_API_KEY}` },
//     });
//     console.log("✅ Deepgram is reachable. Account Info:", response.data);
//   } catch (error) {
//     console.error("❌ Deepgram test failed:", error.response?.data || error.message);
//   }
// };

// // Run API test on server start
// testDeepgram();

// // Function to handle transcription with retries
// const transcribeWithRetry = async (audioData, retries = 2) => {
//   for (let attempt = 1; attempt <= retries + 1; attempt++) {
//     try {
//       console.log(`📝 Transcription Attempt ${attempt}...`);
//       const response = await axios.post(
//         "https://api.deepgram.com/v1/listen",
//         audioData,
//         {
//           headers: {
//             Authorization: `Token ${DEEPGRAM_API_KEY}`,
//             "Content-Type": "audio/wav",
//           },
//           params: {
//             model: "whisper",
//             smart_format: true,
//           },
//           timeout: 30000, // ⏳ Increase timeout to 30 seconds
//         }
//       );
//       console.log("✅ Transcription Success:", response.data);
//       return response.data;
//     } catch (error) {
//       console.error(`❌ Transcription Failed (Attempt ${attempt}):`, error.message);
//       if (attempt === retries + 1) throw error; // Fail after retries
//     }
//   }
// };

// // Transcription API Route
// app.post("/transcribe", upload.single("audio"), async (req, res) => {
//   try {
//     console.log("🔄 Received transcription request...");

//     if (!req.file) {
//       console.error("❌ No audio file received.");
//       return res.status(400).json({ error: "No audio file provided" });
//     }

//     console.log("📂 Processing file:", req.file.path);
//     const audioData = fs.readFileSync(req.file.path);
//     fs.unlinkSync(req.file.path); // Clean up temp file

//     console.log("📝 Sending audio to Deepgram API...");
//     const result = await transcribeWithRetry(audioData);
//     res.json(result);
//   } catch (error) {
//     console.error("❌ Deepgram API Error:", error.response?.data || error.message);
//     res.status(500).json({ error: error.response?.data || error.message });
//   }
// });

// // Start Server
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));






// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const fs = require("fs");
// const axios = require("axios");
// const path = require("path");

// const app = express();
// const PORT = process.env.PORT || 5000;
// const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;

// app.use(cors());
// app.use(express.json());

// // Ensure 'transcriptions/' directory exists
// const TRANSCRIPTION_DIR = "transcriptions";
// if (!fs.existsSync(TRANSCRIPTION_DIR)) {
//   fs.mkdirSync(TRANSCRIPTION_DIR);
// }

// // File upload configuration
// const upload = multer({ dest: "uploads/" });

// // ✅ Deepgram API Connectivity Test (Fix 404 Issue)
// const testDeepgram = async () => {
//   try {
//     const response = await axios.get("https://api.deepgram.com/v1/me", {
//       headers: { Authorization: `Token ${DEEPGRAM_API_KEY}` },
//     });
//     console.log("✅ Deepgram is reachable. Account Info:", response.data);
//   } catch (error) {
//     console.error("❌ Deepgram test failed:", error.response?.data || error.message);
//   }
// };

// // Run API test on server start
// testDeepgram();

// // Function to handle transcription with retries
// const transcribeWithRetry = async (audioData, retries = 2) => {
//   for (let attempt = 1; attempt <= retries + 1; attempt++) {
//     try {
//       console.log(`📝 Transcription Attempt ${attempt}...`);
//       const response = await axios.post(
//         "https://api.deepgram.com/v1/listen",
//         audioData,
//         {
//           headers: {
//             Authorization: `Token ${DEEPGRAM_API_KEY}`,
//             "Content-Type": "audio/wav",
//           },
//           params: {
//             model: "whisper",
//             smart_format: true,
//           },
//           timeout: 30000, // ⏳ Increase timeout to 30 seconds
//         }
//       );
//       console.log("✅ Transcription Success:", response.data);
//       return response.data;
//     } catch (error) {
//       console.error(`❌ Transcription Failed (Attempt ${attempt}):`, error.message);
//       if (attempt === retries + 1) throw error; // Fail after retries
//     }
//   }
// };

// // Transcription API Route
// app.post("/transcribe", upload.single("audio"), async (req, res) => {
//   try {
//     console.log("🔄 Received transcription request...");

//     if (!req.file) {
//       console.error("❌ No audio file received.");
//       return res.status(400).json({ error: "No audio file provided" });
//     }

//     console.log("📂 Processing file:", req.file.path);
//     const audioData = fs.readFileSync(req.file.path);
//     fs.unlinkSync(req.file.path); // Delete temp file

//     console.log("📝 Sending audio to Deepgram API...");
//     const result = await transcribeWithRetry(audioData);

//     // ✅ Save transcription to a file
//     const transcriptPath = path.join(TRANSCRIPTION_DIR, `${req.file.filename}.json`);
//     fs.writeFileSync(transcriptPath, JSON.stringify(result, null, 2));
//     console.log("💾 Transcription saved:", transcriptPath);

//     res.json(result);
//   } catch (error) {
//     console.error("❌ Deepgram API Error:", error.response?.data || error.message);
//     res.status(500).json({ error: error.response?.data || error.message });
//   }
// });

// // Start Server
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//****************************************************************************************** */



require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const axios = require("axios");
const path = require("path");
const crypto = require("crypto"); // To generate unique filenames

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
  const audioData = fs.readFileSync(audioPath);

  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      console.log(`📝 Transcription Attempt ${attempt} for ${audioPath}...`);
      const response = await axios.post(
        "https://api.deepgram.com/v1/listen",
        audioData,
        {
          headers: {
            Authorization: `Token ${DEEPGRAM_API_KEY}`,
            "Content-Type": "audio/wav",
          },
          params: {
            model: "whisper",
            smart_format: true,
          },
          timeout: 60000, // ⏳ Increase timeout to 30 seconds
        }
      );
      console.log("✅ Transcription Success:", response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ Transcription Failed (Attempt ${attempt}):`, error.message);
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
    console.log("🎵 Audio file saved:", savedAudioPath);

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
