import React, { useEffect, useRef, useState } from "react";

const GridDeselect = () => {
  const [board, setBoard] = useState(Array.from({ length: 9 }));
  const [slected, setSelected] = useState([]);
  const timer = useRef();

  const revert = () => {
    clearTimeout(timer.current);
    timer.current = setInterval(() => {
      setSelected((prev) => {
        const prevState = [...prev];
        prevState.shift();
        if (!prevState.length) {
          clearInterval(timer.current);
        }
        return prevState;
      });
    }, 300);
  };

  useEffect(() => {
    if (slected.length === 9) revert();
  }, [slected]);

  useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-xl grid grid-cols-3 gap-4">
        {board.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                if (!slected.includes(index)) {
                  setSelected((p) => [...p, index]);
                }
              }}
              className={`rounded-md flex justify-center h-32 gap-4 items-center w-full ${
                slected.includes(index) ? "bg-green-900" : "bg-gray-900"
              }`}
            >
              {index}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GridDeselect;
