import { useRef, useEffect } from "react";

const areTheySame = (prevV, newV) => {
  if (prevV === null) return false;
  if (prevV.length !== newV.length) return false;

  for (let i = 0; i < prevV.length; i++) {
    if (prevV[i] !== newV[i]) return false;
  }
  return true;
};

export const useCustomMemo2 = (cb, deps) => {
  const cache = useRef(null);

  // the deps have changed
  if (!cache.current || !areTheySame(cache.current.deps, deps)) {
    cache.current = {
      value: cb(),
      deps,
    };
  }

  useEffect(() => {
    return () => {
      cache.current = null;
    };
  }, []);

  return cache.current.value;
};

const hooks = [];
let idx = 0;

export const customUseRef = (initial) => {
  if (!hooks[idx]) {
    hooks[idx] = { current: initial };
  }

  return hooks[idx++];
};
