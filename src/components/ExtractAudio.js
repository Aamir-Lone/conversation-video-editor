


import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({
  log: true,
  corePath: "https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js",
});

export const extractAudio = async (video) => {
  if (!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  }

  try {
    const inputName = "input.mp4";
    const outputName = "output.wav";

    ffmpeg.FS("writeFile", inputName, await fetchFile(video));

    await ffmpeg.run(
      "-i", inputName,
      "-ac", "1", // Convert to mono
      "-ar", "16000", // Ensure 16kHz sample rate (Deepgram requirement)
      "-c:a", "pcm_s16le", // 16-bit little-endian PCM format
      outputName
    );

    const data = ffmpeg.FS("readFile", outputName);
    const blob = new Blob([data.buffer], { type: "audio/wav" });

    ffmpeg.FS("unlink", inputName);
    ffmpeg.FS("unlink", outputName);

    return blob;
  } catch (error) {
    console.error("❌ Audio extraction failed:", error);
    return null;
  }
};
// ***************************************************************************************** */
