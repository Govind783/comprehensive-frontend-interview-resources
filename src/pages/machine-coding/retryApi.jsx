import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";

const R = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const intervalId = useRef();
  const max = useRef(5);

  const fetchDataHelper = async (URL) => {
    try {
      const res = await fetch(URL);
      const result = await res.json();
      if (res.ok) {
        return {
          success: true,
          result,
        };
      }
    } catch (err) {
      return {
        success: false,
        err,
      };
    }
  };
  const executeCall = async (URL, Source) => {
    const firstTry = await fetchDataHelper(URL);
    if (firstTry.success) {
      if (Source == 1) setData(firstTry.result);
      if (Source == 2) setData2(firstTry.result);
      return;
    }

    intervalId.current = setInterval(async () => {
      const { success, err, result } = await fetchDataHelper(URL);
      console.log(max.current);
      if (max.current == 0) {
        clearInterval(intervalId.current);
        intervalId.current = null;
        return;
      }
      if (!success) {
        if (Source == 1) {
          setData((p) => [...p, err]);
        } else {
          setData2((p) => [...p, err]);
        }
      }

      if (success) {
        if (Source == 1) {
          setData((p) => [...p, result]);
        } else {
          setData2((p) => [...p, result]);
        }
      }

      max.current--;
    }, 800);
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center flex-col">
      <Button
        onClick={() => {
          executeCall("https://jsonplaceholder.typicode.com/posts?_page=1", 1);
        }}
      >
        Fetch for 1
      </Button>
      <br />
      {JSON.stringify(data, null, 2)}

      <br />

      <Button
        onClick={() => {
          executeCall("http://localhost:8000", 2);
        }}
      >
        Fetch for 2
      </Button>
      <br />
      {JSON.stringify(data2, null, 2)}
    </div>
  );
};

export default R;
