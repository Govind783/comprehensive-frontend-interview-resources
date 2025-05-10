import React, { useEffect, useRef, useState } from "react";
const arr = ["red", "yellow", "green"];

const R = () => {
  const [active, setActive] = useState("green");

  const intervalIdRef = useRef();
  // green - 5
  // yellow - 3
  // red - 1
  const start = () => {
    let timeSpent = 0;
    intervalIdRef.current = setInterval(() => {
      timeSpent++;
      if (timeSpent <= 5) {
        setActive("green");
      } else if (timeSpent <= 8) {
        setActive("yellow");
      } else if (timeSpent < 10) {
        setActive("red");
      } else if (timeSpent >= 10) {
        timeSpent = 0;
      }
    }, 1000);
  };

  useEffect(() => {
    start();

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 border border-gray-600 p-8 rounded-md">
        {arr.map((i) => {
          return (
            <div
              key={i}
              className="border border-gray-700 rounded-full w-10 h-10"
              style={{
                backgroundColor: i == active ? active : "transparent",
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default R;
