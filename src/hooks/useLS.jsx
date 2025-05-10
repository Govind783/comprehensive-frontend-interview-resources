import { useEffect, useState } from "react";

export const usePersistData = (key, initialValue) => {
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    try {
      const x = localStorage.getItem(key);
      setData(x ? JSON.parse(x) : []);
    } catch (e) {
      console.log("something went wrong while parsing", e);
      setData([]);
    }
  }, []);

  return data;
};

const SaveData = (key, val) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(val));
  }
};
