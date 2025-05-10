import { useRef, useEffect } from "react";

function useCallbackSimple(callback, dependencies) {
  // useCallback is essentially useMemo that memoizes a function
  return useMemo(() => callback, dependencies);
}

// if the interviewer still says no implement a custom one, then the below one should do the job

const areTheySame = (prevV, newV) => {
  if (prevV === null) return false;
  if (prevV.length !== newV.length) return false;

  for (let i = 0; i < prevV.length; i++) {
    if (prevV[i] !== newV[i]) return false;
  }
  return true;
};

export const useCustomCallback = (callback, deps) => {
  const cache = useRef(null);

  // the deps have changed
  if (!cache.current || !areTheySame(cache.current.deps, deps)) {
    cache.current = {
      fn: callback,
      deps,
    };
  }

  useEffect(() => {
    return () => {
      cache.current = null;
    };
  }, []);

  return cache.current.fn;
};
