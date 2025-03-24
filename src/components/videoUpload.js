import React, { useState } from "react";
//import { Box, Button, Typography } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";

const VideoUpload = ({ onFilesSelected }) => {
  const [videos, setVideos] = useState([]);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length !== 2) {
      alert("Please upload exactly two videos.");
      return;
    }
    setVideos(acceptedFiles);
    onFilesSelected(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "video/mp4,video/webm",
    multiple: true,
    onDrop,
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "2px dashed #1976d2",
        padding: 3,
        textAlign: "center",
        cursor: "pointer",
        borderRadius: 2,
        bgcolor: "#f5f5f5",
      }}
    >
      <input {...getInputProps()} />
      <Typography variant="h6">Drag & drop two videos here, or click to select files</Typography>
      {videos.length > 0 && (
        <Box mt={2}>
          {videos.map((file, index) => (
            <Typography key={index} variant="body1">
              {file.name}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default VideoUpload;
