import { useCallback, useRef } from "react";

const useThrottle = (fn) => {
  const inThrottleRef = useRef(false);

  const throttleFn = (...args) => {
    if (!inThrottleRef.current) {
      fn.apply(this, args); 
      inThrottleRef.current = true;
      setTimeout(() => {
        inThrottleRef.current = false;
      }, 400); 
    }
  };

  return useCallback(throttleFn, [fn]);
};

export default useThrottle;
