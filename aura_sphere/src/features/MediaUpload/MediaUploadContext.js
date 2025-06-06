import React, { createContext, useContext } from "react";

// PUBLIC_INTERFACE
/**
 * MediaUploadContext provides upload state and methods. Stub for future upload logic.
 */
export const MediaUploadContext = createContext({
  uploading: false,
  startUpload: () => {},
  cancelUpload: () => {},
});

export function useMediaUpload() {
  return useContext(MediaUploadContext);
}

// PUBLIC_INTERFACE
export function MediaUploadProvider({ children }) {
  // Stub values, add future upload logic here
  const uploadValue = {
    uploading: false,
    startUpload: () => {},
    cancelUpload: () => {},
  };

  return (
    <MediaUploadContext.Provider value={uploadValue}>
      {children}
    </MediaUploadContext.Provider>
  );
}
