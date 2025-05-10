import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const GMeet = () => {
  const [p, setP] = useState(2);
  const addp = () => {
    setP((p) => p + 1);
  };
  const rp = () => {
    setP((p) => p - 1);
  };

  //   const colsGen = () => {
  //     if (p <= 1) {
  //       //   return "grid-template-col-1";
  //       return 1;
  //     } else if (p <= 2) {
  //       //   return "grid-template-col-2";
  //       return 2;
  //     } else if (p <= 5) {
  //       //   return "grid-template-col-3";
  //       return 3;
  //     } else if (p <= 9) {
  //       //   return "grid-template-col-4";
  //       return 4;
  //     }
  //     // return "grid-template-col-5";
  //     return 5;
  //   };
  const colsGen = () => Math.ceil(Math.sqrt(p)); // sahi hai bc logic

  return (
    <div>
      <div
        className={`w-screen h-[80vh] overflow-y-auto grid gap-10`}
        style={{
          gridTemplateColumns: `repeat(${colsGen()}, minmax(0, 1fr))`,
          // grid-template-columns: repeat(4, minmax(0, 1fr));
        }}
      >
        {Array.from({ length: p }).map((_, index) => {
          return (
            <div
              key={index}
              className="bg-slate-800 rounded-md border border-gray-800 flex relative aspect-video"
            ></div>
          );
        })}
      </div>
      <div className="flex items-center gap-4">
        <Button className="w-28" onClick={rp}>
          delete
        </Button>
        <Button className="w-28" onClick={addp}>
          add
        </Button>
      </div>
    </div>
  );
};

export default GMeet;
