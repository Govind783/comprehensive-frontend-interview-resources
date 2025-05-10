import React, { useState } from "react";

const R = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const eachItemHeight = 100;
  const totalItems = 10000;
  const windowHeight = 500;
  const scrollPos = Math.floor(scrollTop / eachItemHeight);
  const atOnce = 10;

  const items = Array.from({ length: atOnce }).map((item, index) => {
    const calcIndex = index + scrollPos;
    return {
      id: calcIndex,
      top: calcIndex * eachItemHeight,
    };
  });
  return (
    <div className="w-screen h-screen flex flex-col gap-10 justify-center items-center">
      <p className="text-xl font-semibold text-gray-300">Infinite scrolling on 10,000 items virtualized, (No library)</p>
      <div
        className="bg-gray-800 rounded-md p-8 relative overflow-auto"
        style={{
          height: windowHeight,
          width: windowHeight
        }}
        onScroll={(e) => setScrollTop(e.target.scrollTop)}
      >
        <div
          className="abolute flex justify-center"
          style={{
            height: totalItems * eachItemHeight,
          }}
        >
          {items.map((i) => {
            return (
              <div
                key={i.id}
                style={{
                  top: i.top,
                }}
                className="bg-gray-800 border absolute w-60 flex justify-center items-center border-gray-600 rounded-md p-4"
              >
                {i.id}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default R;
