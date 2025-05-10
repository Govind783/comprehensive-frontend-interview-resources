import React, { useEffect, useRef, useState } from "react";

const PR = () => {
  const [bars, setBars] = useState([]);
  const [widths, setWidths] = useState({});
  const maxBars = useRef(10);
  const barsSdditionRef = useRef();
  const barFillRef = useRef();

  useEffect(() => {
    barsSdditionRef.current = setInterval(() => {
      setBars((prev) => {
        if (prev.length === maxBars.current) {
          clearInterval(barsSdditionRef.current);
          return prev;
        }
        return [...prev, bars.length];
      });
    }, bars.length || 1 * 200);

    barFillRef.current = setInterval(() => {
      setWidths((prev) => {
        const len = Object.keys(prev).length;
        if (len === maxBars.current) {
          clearInterval(barFillRef.current);
          return prev;
        }
        return { ...prev, [len]: "100%" };
      });
    }, bars.length || 1 * 300);

    return () => {
      clearInterval(barFillRef.current);
      clearInterval(barsSdditionRef.current);
    };
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="px-20 flex flex-col gap-6 mt-20">
        {bars.map((_, index) => {
          return (
            <>
              <p key={index} className="border border-gray-700 relative h-8 rounded-md">
                <div
                  className="transition-all h-8 rounded-md top-0 left-0 absolute ease-linear duration-500 bg-gray-500"
                  style={{
                    width: widths[index] || "0%",
                  }}
                ></div>
              </p>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default PR;
