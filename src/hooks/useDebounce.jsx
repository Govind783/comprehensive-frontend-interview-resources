import { useCallback, useRef } from "react";

export const useDebounce = (fn, timer) => {
  const timerID = useRef();

  const debounceFN = (...args) => {
    clearTimeout(timerID.current);
    timerID.current = setTimeout(() => {
      fn(...args);
    }, timer);
  };

  return useCallback(debounceFN, []);
};