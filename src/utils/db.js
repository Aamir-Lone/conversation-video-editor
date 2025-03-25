export const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("VideoEditorDB", 1);
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("transcriptions")) {
          db.createObjectStore("transcriptions", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("audio")) {
          db.createObjectStore("audio", { keyPath: "id" });
        }
      };
  
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };
  
  // Save transcription
  export const saveTranscription = async (id, transcription) => {
    const db = await openDB();
    const transaction = db.transaction("transcriptions", "readwrite");
    const store = transaction.objectStore("transcriptions");
    store.put({ id, transcription });
  };
  
  // Get transcription
  export const getTranscription = async (id) => {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction("transcriptions", "readonly");
      const store = transaction.objectStore("transcriptions");
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result?.transcription || null);
    });
  };
  
  // Save audio blob
  export const saveAudio = async (id, blob) => {
    const db = await openDB();
    const transaction = db.transaction("audio", "readwrite");
    const store = transaction.objectStore("audio");
    store.put({ id, blob });
  };
  
  // Get audio blob
  export const getAudio = async (id) => {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction("audio", "readonly");
      const store = transaction.objectStore("audio");
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result?.blob || null);
    });
  };
  