import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";

//quesion being
// 3. Throttled Traffic Sensor
// Problem:
// You're designing a sensor system for monitoring cars passing through a traffic light.

// The system logs the number of cars every second.
// If no cars pass for 5 seconds, log: "No cars detected.".
// The system should stop logging after 30 seconds.

const max = 30;
const Sensor = () => {
  const timerIDRef = useRef();
  const [timerState, setTimerState] = useState(0);
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [carDetectedAtDisplay, setCarDetectedAtDisplay] = useState(null);

  const carDetectedAT = useRef(null);

  const toggleHandler = () => {
    if (timerIDRef.current) {
      clearInterval(timerIDRef.current);
      timerIDRef.current = null;
      setIsRunning(false);
      return;
    }
    setIsRunning(true);
    timerIDRef.current = setInterval(() => {
      setTimerState((p) => {
        if (p === 29) {
          clearInterval(timerIDRef.current);
          timerIDRef.current = null;
          setIsRunning(false);
          return p + 1;
        }

        const rightNow = Date.now();

        if (!carDetectedAT.current) {
          carDetectedAT.current = rightNow;
        } else {
          const diff = (rightNow - carDetectedAT.current) / 1000;
          if (diff >= 5) {
            setLogs((prevLogs) => [...prevLogs, "No cars detected."]);
            carDetectedAT.current = rightNow;
          }
        }

        return p + 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      clearInterval(timerIDRef.current);
      timerIDRef.current = null;
    };
  }, []);

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-900 text-gray-100">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-gray-700 border-b border-gray-600">
          <h2 className="text-xl font-bold">Traffic Sensor System</h2>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium">
              Status:{" "}
              <span className={isRunning ? "text-green-400" : "text-red-400"}>{isRunning ? "Running" : "Stopped"}</span>
            </div>
            <div className="text-sm font-medium">
              Time:{" "}
              <span className="text-yellow-300">
                {timerState}/{max}s
              </span>
            </div>
          </div>

          <div className="flex space-x-3 mb-6">
            <Button
              onClick={toggleHandler}
              className={`w-1/2 ${!isRunning ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
            >
              {!isRunning ? "Start" : "Stop"}
            </Button>
            <Button
              onClick={() => {
                const now = Date.now();
                carDetectedAT.current = now;
                setCarDetectedAtDisplay(new Date(now).toLocaleTimeString());
              }}
              className="w-1/2 bg-blue-600 hover:bg-blue-700"
              disabled={!isRunning}
            >
              Detect Car
            </Button>
          </div>

          {carDetectedAtDisplay && (
            <div className="mb-4 text-sm text-green-300">
              Car detected at: <span className="font-mono">{carDetectedAtDisplay}</span>
            </div>
          )}

          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2 border-b border-gray-600 pb-1">System Logs</h3>
            <div className="bg-gray-900 rounded p-3 h-64 overflow-y-auto">
              {logs.length === 0 ? (
                <p className="text-gray-500 italic">No logs yet...</p>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="py-1 border-b border-gray-800 text-sm">
                    <span className="text-gray-400">[{index + 1}]</span> {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {timerState === max && (
          <div className="p-3 bg-yellow-500 text-black text-center font-semibold">
            Monitoring completed - 30 second limit reached
          </div>
        )}
      </div>
    </div>
  );
};

export default Sensor;
