import { useEffect } from "react";

export const useOutisdeLast = (ref, cb) => {
  useEffect(() => {
    const exec = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      cb();
    };

    document.addEventListener("mousedown", exec);

    return () => {
      document.removeEventListener("mousedown", exec);
    };
  }, []);
};
