

import { FaceLandmarker, FilesetResolver, DrawingUtils } from "@mediapipe/tasks-vision";

let faceLandmarker = null;
let runningMode = "VIDEO";

export const loadModels = async () => {
  try {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "/models/face_landmarker.task", // Ensure this path is correct
      },
      runningMode: runningMode,
      numFaces: 1,
    });

    console.log("✅ Face Landmarker model loaded successfully.");
  } catch (error) {
    console.error("❌ Error loading Face Landmarker model:", error);
  }
};

export const detectFaces = async (videoElement, canvasElement) => {
  if (!faceLandmarker) {
    console.error("❌ Face Landmarker model not loaded.");
    return false;
  }

  if (!videoElement || !canvasElement) {
    console.error("❌ Missing video or canvas element.");
    return false;
  }

  const ctx = canvasElement.getContext("2d");
  if (!ctx) {
    console.error("❌ Unable to get 2D context from canvas.");
    return false;
  }

  // Ensure the video is ready
  await new Promise((resolve) => {
    if (videoElement.readyState >= 2) {
      resolve();
    } else {
      videoElement.onloadeddata = resolve;
    }
  });

  console.log("🎥 Video loaded. Running face detection...");

  const drawingUtils = new DrawingUtils(ctx);

  try {
    const results = faceLandmarker.detectForVideo(videoElement, performance.now());

    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

    if (results.faceLandmarks.length > 0) {
      results.faceLandmarks.forEach((landmarks) => {
        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_TESSELATION, {
          color: "#C0C0C070",
          lineWidth: 1,
        });
        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, { color: "#FF3030" });
        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, { color: "#30FF30" });
        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_FACE_OVAL, { color: "#E0E0E0" });
        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LIPS, { color: "#E0E0E0" });

        // Bounding box calculation
        const xMin = Math.min(...landmarks.map((p) => p.x)) * canvasElement.width;
        const yMin = Math.min(...landmarks.map((p) => p.y)) * canvasElement.height;
        const xMax = Math.max(...landmarks.map((p) => p.x)) * canvasElement.width;
        const yMax = Math.max(...landmarks.map((p) => p.y)) * canvasElement.height;

        // Draw bounding box
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(xMin, yMin, xMax - xMin, yMax - yMin);
      });

      console.log("✅ Face detected.");
      return true;
    } else {
      console.warn("❌ No face detected.");
      return false;
    }
  } catch (error) {
    console.error("⚠️ Error in face detection:", error);
    return false;
  }
};
