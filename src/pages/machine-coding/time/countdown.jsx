import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect, useRef } from "react";

const CountdownTimer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalIDRef = useRef();

  const startTimer = () => {
    if (hours || minutes || seconds) setIsRunning((p) => true);
    else setIsRunning(false);

    if (intervalIDRef.current) {
      clearInterval(intervalIDRef.current);
      intervalIDRef.current = null;
      return;
    }

    intervalIDRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev > 0) return prev - 1;
        if (minutes > 0) {
          setMinutes((p) => p - 1);
          return 59;
        }

        if (hours > 0) {
          setHours((p) => p - 1);
          setMinutes(59);
          return 59;
        }
        clearInterval(intervalIDRef.current);
        setIsRunning(false);
        return 0;
      });
    }, 1000);
  };

  const formatter = () => {
    return `${hours}:${minutes}:${seconds}`;
  };

  console.log("running");

  return (
    <div className="flex flex-col items-center w-screen h-screen justify-center">
      <div className="max-w-xl flex flex-col w-full justify-center items-center">
        {isRunning ? (
          <p className="text-2xl font-semibold">{formatter()}</p>
        ) : (
          <div className="flex items-center justify-center gap-4">
            <Input value={hours} onChange={(e) => setHours(e.target.value)} />
            <Input value={minutes} onChange={(e) => setMinutes(e.target.value)} />
            <Input value={seconds} onChange={(e) => setSeconds(e.target.value)} />
          </div>
        )}

        <Button
          onClick={() => {
            startTimer();
          }}
          className={`rounded-3xl w-full mt-8 ${isRunning ? "!bg-red-60 text-white" : "!bg-white text-black"}`}
        >
          {isRunning ? "Stop timer" : "Start timer"}
        </Button>
      </div>
    </div>
  );
};

export default CountdownTimer;
