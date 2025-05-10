import React, { useEffect, useRef, useState } from "react";

const R = () => {
  const intervalId = useRef();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    intervalId.current = setInterval(() => {
      setProgress((p) => {
        if (p < 100) return p + 10;
        else {
          intervalId.current = null;
          clearInterval(intervalId);
          return p;
        }
      });
    }, 200);
    
    // or a diff style
    // setInterval(() => {
    //   setProgress((p) => {
    //     if (p < 100) return p + 1;
    //     else {
    //       intervalId.current = null;
    //       clearInterval(intervalId.current);
    //       return p;
    //     }
    //   });
    // }, 30);
    

    return () => {
      intervalId.current = null;
      clearInterval(intervalId);
    };
  }, []);

  
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="w-full max-w-2xl h-80">
        <div
          className="h-10 bg-white rounded-md transition-all ease-in-out duration-300 flex justify-center items-center text-black font-semibold"
          style={{
            width: `${progress}%`,
          }}
        >
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default R;
