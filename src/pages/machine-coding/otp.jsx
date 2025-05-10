import { Input } from "@/components/ui/input";
import React, { useRef, useState } from "react";

const Otp = () => {
  const [nums, setNums] = useState(Array.from({ length: 4 }).fill(""));
  const inputsRef = useRef({});
  const [activeIndex, setActiveIndex] = useState(0);
  const onChangeHanlder = (strokes, index) => {
    setNums((p) => {
      const prev = [...p];
      prev[index] = strokes;
      return prev;
    });
    if (index < 3) {
      setActiveIndex((p) => p + 1);
      inputsRef.current[index + 1].focus();
    }
  };
  // can sure handle a lot of things like pasting a full otp as 3489 and populating all boxes individually by looping and adding nums on each index of input
  // can make it more dynamic by number of inputs like 4 digit otp or 6 or 3digit otp
  // keyboard navigation 
  // seperator icons
  // and a lot more thinggs

  return (
    <div className="m-20">
      <div className="flex items-center gap-2">
        {nums.map((item, index) => {
          return (
            <Input
              onKeyDown={(e) => {
                const key = e.key;
                if (key === "Backspace" || key === "Delete") {
                  e.preventDefault();
                  setNums((prev) => {
                    const prevState = [...prev];
                    prevState[index] = "";
                    if (index > 0) {
                      setActiveIndex((p) => p - 1);
                      inputsRef.current[index - 1].focus();
                    }
                    return prevState;
                  });
                  if (!index) return;
                  // if (!nums[index]) {
                  //   e.preventDefault();

                  //   setActiveIndex((p) => p - 1);
                  //   inputsRef.current[index - 1].focus();
                  // }
                }
              }}
              key={index}
              // type='number'
              maxLength={1}
              onChange={(e) => onChangeHanlder(e.target.value, index)}
              value={nums[index]}
              ref={(el) => {
                if (el) {
                  inputsRef.current[index] = el;
                }
              }}
              className={`w-20 h-20 !border-gray-500 text-center text-3xl ${
                index === activeIndex && "!border-2 !border-white"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Otp;
