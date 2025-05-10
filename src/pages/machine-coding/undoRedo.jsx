import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";

const R = () => {
  const track = useRef(new Map());
  const index = useRef(0);
  const [counter, setCounter] = useState(0);
  const set = (val) => {
    track.current.set(index.current++, val);
  };
  const undo = () => {
    const curr = index.current;
    if (track.current.has(curr - 1)) {
      setCounter(track.current.get(--index.current));
    }
  };

  const redo = () => {
    const curr = index.current;
    if (track.current.has(curr + 1)) {
      setCounter(track.current.get(++index.current));
    }
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="max-w-xl w-full h-96 border flex flex-col items-center justify-center border-gray-800 rounded-md p-4">
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl font-semibold">{counter}</p>
          <Button
            variant="secondary"
            onClick={() => {
              setCounter((p) => p + 1);
              set(counter + 1);
            }}
          >
            Increment
          </Button>
        </div>
        <div className="flex items-center mt-6 gap-4 w-full">
          <Button className="w-1/2" onClick={undo}>
            Undo
          </Button>
          <Button className="w-1/2" onClick={redo}>
            Redo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default R;
