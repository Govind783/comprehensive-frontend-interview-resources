import React, { useEffect, useState } from "react";

const max = 80;

const debounce = (fn) => {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, 200);
  };
};

const R = () => {
  const [val, setVal] = useState("");
  const [width, setWidth] = useState(0);

  // const onChangeHandler = () => {
  //   setWidth((val.length / max) * 100);
  // };
  // const debouncedProgressFN = debounce(onChangeHandler);

  useEffect(() => {
    setWidth((val.length / max) * 100)
  }, [val])
  
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="flex flex-col w-full max-w-xl justify-center">
        <div className="relative">
          <div className={` rounded pl-[2px] top-[17px] w-full h-4 relative border-b border-neutral-500`}>
            <div
              className={`absolute rounded-md ${
                width < 50 ? "bg-white" : width < 80 ? "bg-yellow-500" : width < 95 ? "bg-yellow-600" : "bg-red-900"
              }
          h-full transition-all ease-in duration-300
          `}
              style={{
                width: `${width}%`,
              }}
            ></div>
          </div>

          <textarea
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
              //   debouncedProgressFN();
            }}
            maxLength={max}
            className="flex min-h-28 w-full pt-[23px] rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-500 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300"
          />
        </div>
      </div>
    </div>
  );
};

export default R;
