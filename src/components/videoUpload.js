

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Box, Typography } from "@mui/material";

const VideoUpload = ({ videos, setVideos }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length + videos.length > 2) {
        alert("You can only upload two videos.");
        return;
      }
      setVideos([...videos, ...acceptedFiles]);
    },
    [videos, setVideos]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: "video/mp4, video/webm",
    onDrop,
    multiple: true,
    maxFiles: 2,
  });

  return (
    <Box textAlign="center" mt={2}>
      <Typography variant="h5">Upload Two Videos</Typography>
      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed #ccc",
          padding: "20px",
          cursor: "pointer",
          marginTop: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <input {...getInputProps()} />
        <Typography>Drag & Drop videos here or click to select</Typography>
      </Box>

      {videos.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">Uploaded Videos:</Typography>
          {videos.map((video, index) => (
            <Typography key={index}>{video.name}</Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default VideoUpload;
//****************************************************************************** */

