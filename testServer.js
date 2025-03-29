
//this is to test whether deepgram server is working or not
const axios = require("axios");

const testDeepgram = async () => {
  try {
    const response = await axios.get("https://api.deepgram.com/v1/projects", {
      headers: {
        Authorization: "Token 5a9995a0b14f408164613a050a6cca54f077831b",
      },
    });
    console.log("✅ Deepgram Test Successful:", response.data);
  } catch (error) {
    console.error("❌ Deepgram Test Failed:", error.message);
  }
};

testDeepgram();
