import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";

const StopWatch = () => {
  const intervalidRef = useRef();
  const [timer, setTimer] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const toggle = () => {
    if (intervalidRef.current) {
      clearInterval(intervalidRef.current);
      intervalidRef.current = null;
      setIsRunning(false);
      return;
    }
    intervalidRef.current = setInterval(() => {
      setTimer((t) => t + 10);
    }, 10);
    setIsRunning(true);
  };

  const lap = () => {
    if (isRunning) setLaps((prev) => [...prev, timer]);
  };

  //   const format = () => {
  //     // 60 secds make 1 min
  //     // 1000ms make 1s
  //     // 60k ms will make 1min
  //     // const mins = Math.floor(timer / 60);
  //     // return `${String(mins).padStart(2, '0')}:${String(timer % 60).padStart(2, '0')}`;

  //   };
  const format = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const mins = Math.floor((time / 60000) % 60);
    const ms = Math.floor((time / 10) % 100);
    return `${String(mins).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(ms).padStart(2, "0")}`;
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <p className="text-xl font-semibold mb-4">{format(timer)}</p>
      <div className="flex gap-2">
        <Button onClick={toggle}>{isRunning ? "Pause" : "Start"}</Button>
        <Button onClick={lap} disabled={!isRunning}>
          Lap
        </Button>
      </div>
      <div className="mt-4">
        {laps.map((lapTime, index) => (
          <p key={index} className="text-sm">
            Lap {index + 1}: {format(lapTime)}
          </p>
        ))}
      </div>
    </div>
  );
};

export default StopWatch;
