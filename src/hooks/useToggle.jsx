import { useState, useCallback } from "react";

export const useToggle = (initialState) => {
  const [toggle, setToggle] = useState(initialState);
  const memoizezFN = useCallback(() => {
    setToggle((p) => !p);
  }, []);

  return [toggle, memoizezFN];
};
