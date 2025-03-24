import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import VideoUpload from "./components/videoUpload";
import ExtractAudio from "./components/ExtractAudio";

function App() {
  const [uploadedVideos, setUploadedVideos] = useState([]);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Browser-Based Conversation Video Editor
      </Typography>
      <VideoUpload onFilesSelected={setUploadedVideos} />
      <ExtractAudio videos={uploadedVideos} />
    </Container>
  );
}

export default App;
