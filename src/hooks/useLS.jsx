import { useState, useEffect } from "react";

function useLS(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (err) {
      console.warn("useLS: Error reading localStorage", err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn("useLS: Error writing to localStorage", err);
    }
  }, [key, value]);

  return [value, setValue];
}


// example usage
// const [theme, setTheme] = useLS('theme', 'dark');
