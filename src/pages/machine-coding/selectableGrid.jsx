import React, { useState } from "react";
const dummy = Array.from({ length: 70 }).map((i, index) => index);
const SelectableGrid = () => {
  const [data, _] = useState(dummy);
  const [isDragging, setIsDragging] = useState(false);
  const [selected, setSelected] = useState(new Set());
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="grid grid-cols-5 w-fit gap-2">
        {data.map((item) => {
          return (
            <div
              key={item}
              onMouseDown={() => {
                setIsDragging(true);
              }}
              onMouseUp={() => {
                setIsDragging(false);
              }}
              onMouseMove={() => {
                if (!isDragging || selected.size > 69) return;
                setSelected((p) => new Set(p.add(item)));
              }}
              className={`w-20 h-12  select-none flex justify-center rounded-sm items-center text-sm ${
                selected.has(item) ? "bg-green-600" : "bg-blue-900"
              }`}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectableGrid;
