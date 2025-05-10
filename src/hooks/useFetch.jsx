import { useCallback, useState } from "react";

export const useFetch = () => {
  const [appStatus, setAppStatus] = useState({
    // data: [],
    loading: false,
    error: false,
  });

  const fetchData = async (URL) => {
    if (!URL) return;
    try {
      setAppStatus((p) => {
        return {
          ...p,
          loading: true,
        };
      });
      const response = await fetch(URL);
      const data = await response.json();
      if (response.ok) {
        setAppStatus((p) => {
          return {
            ...p,
            loading: false,
          };
        });
        return data;
      }
    } catch (e) {
      console.log("err", e);

      // call senetry/some error logging service
      setAppStatus((p) => {
        return {
          ...p,
          error: e,
        };
      });
    }
  };

  return {
    loading: appStatus.loading,
    error: appStatus.error,
    fetchData: useCallback(fetchData, []),
  };
};
