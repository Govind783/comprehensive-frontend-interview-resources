import React, { useEffect, useRef, useState } from "react";

const R = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [leftWidth, setLeftWidth] = useState(50);
  const parentContienrRef = useRef();
  const resett = () => {
    console.log('ssss');
    
    setIsDragging(false);
  };

  const startDragging = () => {
    setIsDragging(true);
  };

  const resizeHadnler = (e) => {
    if (!isDragging) return;

    const parentContainerDimensions = parentContienrRef.current.getBoundingClientRect();
    // console.log(parentContainerDimensions, ';parentContainerDimensions');
    const mouseXCords = e.clientX - parentContainerDimensions.left; // L, left
    const width = (mouseXCords / parentContainerDimensions.width) * 100; // W, width,  L first, more like LBW
    if (width > 1 && width < 99.9) {
      setLeftWidth(width);
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", resizeHadnler);
    document.addEventListener("mouseup", resett);

    return () => {
      document.removeEventListener("mousemove", resizeHadnler);
      document.removeEventListener("mouseup", resett);
    };
  }, [isDragging]);

  return (
    <div ref={parentContienrRef} className=" w-full flex h-screen items-center">
     <div className="flex w-full">
     <div
        className="bg-gray-800 h-96"
        style={{
          width: `${leftWidth}%`,
        }}
      ></div>
      <div
        className="bg-white w-[8px] cursor-pointer hover:bg-gray-300 h-96"
        style={{
          left: `${leftWidth}%`,
        }}
        onMouseDown={startDragging}
      ></div>
      <div
        className="bg-gray-500 h-96"
        style={{
          width: `${100 - leftWidth}%`,
        }}
      ></div>
     </div>
    </div>
  );
};

export default R;
