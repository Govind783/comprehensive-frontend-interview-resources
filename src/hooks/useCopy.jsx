import { useCallback, useState } from "react";

export const useCopy = () => {
  const copyText = useCallback((text) => navigator.clipboard.writeText(text), []);
  return [copyText];
};
