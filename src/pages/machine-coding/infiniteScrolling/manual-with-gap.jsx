import React, { useState } from "react";

const ManualInfiniteWithGap = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const atOnce = 10,
    eachItemHeight = 50,
    windowSize = 400,
    allItems = 10000;
  const gap = 30; // adjust this value as needed
  const scrollPos = Math.floor(scrollTop / (eachItemHeight + gap));

  const items = Array.from({ length: atOnce }).map((_, index) => {
    const calcIndexTop = index + scrollPos;
    return {
      id: calcIndexTop,
      top: calcIndexTop * (eachItemHeight + gap),
    };
  });

  return (
    <div
      className="relative w-[400px] rounded-md bg-gray-700 p-4 overflow-y-auto"
      onScroll={(e) => {
        setScrollTop(e.target.scrollTop);
      }}
      style={{
        height: windowSize,
      }}
    >
      <div
        className="absolute"
        style={{
          height: allItems * (eachItemHeight + gap),
        }}
      >
        {items.map((item) => {
          return (
            <div
              key={item.id}
              className="bg-gray-900 rounded-md px-4 py-2 w-80 absolute h-10"
              style={{
                height: eachItemHeight,
                top: item.top,
              }}
            >
              {item.id}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManualInfiniteWithGap;
