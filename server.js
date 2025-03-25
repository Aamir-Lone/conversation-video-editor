// // // require("dotenv").config();
// // // const express = require("express");
// // // const cors = require("cors");
// // // const axios = require("axios");

// // // const app = express();
// // // app.use(cors());
// // // app.use(express.json());

// // // const PORT = 5000; // Change if needed

// // // const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;

// // // if (!DEEPGRAM_API_KEY) {
// // //   console.error("🚨 Deepgram API key is missing! Check your .env file.");
// // //   process.exit(1);
// // // }

// // // app.post("/transcribe", async (req, res) => {
// // //   try {
// // //     const { audio } = req.body;
// // //     if (!audio) return res.status(400).json({ error: "No audio file provided" });

// // //     console.log("🔄 Sending audio for transcription...");

// // //     const response = await axios.post(
// // //       "https://api.deepgram.com/v1/listen",
// // //       audio,
// // //       {
// // //         headers: {
// // //           Authorization: `Token ${DEEPGRAM_API_KEY}`,
// // //           "Content-Type": "audio/wav",
// // //         },
// // //         params: {
// // //           model: "whisper",
// // //           smart_format: true,
// // //         },
// // //       }
// // //     );

// // //     res.json(response.data);
// // //   } catch (error) {
// // //     console.error("❌ Deepgram API Error:", error.response?.data || error.message);
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



// // require("dotenv").config();
// // const express = require("express");
// // const cors = require("cors");
// // const axios = require("axios");

// // const app = express();
// // app.use(cors());

// // // ✅ Increase the request body size limit
// // app.use(express.json({ limit: "100mb" })); // Adjust as needed
// // app.use(express.urlencoded({ extended: true, limit: "100mb" }));

// // const PORT = 5000;
// // const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;

// // if (!DEEPGRAM_API_KEY) {
// //   console.error("🚨 Deepgram API key is missing! Check your .env file.");
// //   process.exit(1);
// // }

// // app.post("/transcribe", async (req, res) => {
// //   try {
// //     const { audio } = req.body;
// //     if (!audio) return res.status(400).json({ error: "No audio file provided" });

// //     console.log("🔄 Sending audio for transcription...");

// //     const response = await axios.post(
// //       "https://api.deepgram.com/v1/listen",
// //       audio,
// //       {
// //         headers: {
// //           Authorization: `Token ${DEEPGRAM_API_KEY}`,
// //           "Content-Type": "audio/wav",
// //         },
// //         params: {
// //           model: "whisper",
// //           smart_format: true,
// //         },
// //       }
// //     );

// //     res.json(response.data);
// //   } catch (error) {
// //     console.error("❌ Deepgram API Error:", error.response?.data || error.message);
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




// // require("dotenv").config();
// // const express = require("express");
// // const cors = require("cors");
// // const axios = require("axios");

// // const app = express();
// // app.use(cors());

// // // ✅ Increase the request body size limit
// // app.use(express.json({ limit: "100mb" }));
// // app.use(express.urlencoded({ extended: true, limit: "100mb" }));

// // const PORT = 5000;
// // const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;

// // if (!DEEPGRAM_API_KEY) {
// //   console.error("🚨 Deepgram API key is missing! Check your .env file.");
// //   process.exit(1);
// // }

// // app.post("/transcribe", async (req, res) => {
// //   try {
// //     console.log("🔄 Received transcription request...");

// //     const { audio } = req.body;
// //     if (!audio) {
// //       console.error("❌ No audio file received in request.");
// //       return res.status(400).json({ error: "No audio file provided" });
// //     }

// //     console.log("📝 Sending audio to Deepgram API...");

// //     const response = await axios.post(
// //       "https://api.deepgram.com/v1/listen",
// //       audio,
// //       {
// //         headers: {
// //           Authorization: `Token ${DEEPGRAM_API_KEY}`,
// //           "Content-Type": "audio/wav",
// //         },
// //         params: {
// //           model: "whisper",
// //           smart_format: true,
// //         },
// //       }
// //     );

// //     console.log("✅ Deepgram response received:", response.data);

// //     res.json(response.data);
// //   } catch (error) {
// //     console.error("❌ Deepgram API Error:", error.response?.data || error.message);
// //     res.status(500).json({ error: error.response?.data || error.message });
// //   }
// // });

// // app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));





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
//     res.json(response.data);
//   } catch (error) {
//     console.error("❌ Deepgram API Error:", error.response?.data || error.message);
//     res.status(500).json({ error: error.response?.data || error.message });
//   }
// });

// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));





require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const axios = require("axios");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" }); // Temporary folder for files
const PORT = 5000;
const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;

app.post("/transcribe", upload.single("audio"), async (req, res) => {
  try {
    console.log("🔄 Received transcription request...");

    if (!req.file) {
      console.error("❌ No audio file received.");
      return res.status(400).json({ error: "No audio file provided" });
    }

    console.log("📂 Processing file:", req.file.path);

    const audioData = fs.readFileSync(req.file.path);
    fs.unlinkSync(req.file.path); // Clean up temp file

    console.log("📝 Sending audio to Deepgram API...");

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
      }
    );

    console.log("✅ Deepgram response:", response.data);

    // Send only necessary data
    res.json({
      results: response.data.results
    });
  } catch (error) {
    console.error("❌ Deepgram API Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
