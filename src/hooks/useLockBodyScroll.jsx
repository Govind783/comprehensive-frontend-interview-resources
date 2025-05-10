import { useCallback } from "react";

export const useLockBodyScroll = () => {
  const toggleScroll = (shouldLock) => {    
    if (shouldLock) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };
  return useCallback(toggleScroll, []);
};
