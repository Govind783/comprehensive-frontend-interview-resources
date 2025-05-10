import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const R = () => {
  const [newitem, setNewItem] = useState("");
  const [items, setItems] = useState({
    todo: ["complete x", "complete y"],
    completed: ["FINISHED 1", "FINISHED 2"],
  });
  const [currentlyDragging, setCurrentlyDragging] = useState(null);

  const dropHandler = (currentlyAT) => {
    if (!currentlyDragging) return;

    const { item, box } = currentlyDragging;
    if (box === currentlyAT) return;
    setItems((prev) => {
      const prevState = structuredClone(prev);
      const newSource = prevState[box].filter((i) => i !== item);
      prevState[box] = newSource;
      prevState[currentlyAT].push(item);
      return prevState;
    });
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <div className="max-w-4xl w-full">
        <div className="w-full">
          <Input value={newitem} className='mb-4' onChange={(e) => setNewItem(e.target.value)} placeholder="please enter the task" />
          <Button
            onClick={() => {
              setItems((prev) => {
                const prevState = structuredClone(prev);
                prevState.todo.push(newitem);
                return prevState;
              });
              setNewItem("");
            }}
          >
            Submit
          </Button>
        </div>
      </div>

      <div className="flex max-w-4xl mt-8 items-center gap-8 w-full">
        {Object.keys(items).map((box) => {
          return (
            <div
              onDrop={() => {
                dropHandler(box);
              }}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              className="w-1/2 h-full bg-gray-900 border border-gray-700 rounded-md p-8"
            >
              {items[box].map((item) => {
                return (
                  <p
                    key={item}
                    draggable
                    onDragStart={() => {
                      setCurrentlyDragging({ item, box });
                    }}
                    onDragEnd={() => setCurrentlyDragging(false)}
                    className="bg-blue-900 rounded-md p-4 flex items-center w-full my-4"
                  >
                    {" "}
                    {item}{" "}
                  </p>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default R;
