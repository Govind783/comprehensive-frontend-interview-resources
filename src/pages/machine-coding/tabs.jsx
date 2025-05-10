import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const R = () => {
  const [tabs, setTabs] = useState({
    1: {
      desc: "hey tab one content",
      nam: "",
    },
    2: {
      desc: "hey tab tow content",
      nam: "",
    },
    3: {
      desc: "hey tab three content",
      nam: "",
    },
  });
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-center gap-16">
          {Object.keys(tabs).map((item) => {
            return (
              <div key={item}>
                <p
                  onClick={() => setActiveTab(item)}
                  className={`border border-gray-600 cursor-pointer w-28 flex justify-center items-center rounded-md p-3 ${
                    item == activeTab && "bg-white text-black"
                  }`}
                >
                  {" "}
                  TAB {item}{" "}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center items-center rounded-md w-full h-96 border border-gray-600 mt-5">
          <div>
            <p> {tabs[activeTab].desc} </p>
            <Input
              className="mt-4 !border-gray-500"
              placeholder='type something...'
              onChange={(e) => {
                setTabs((prev) => {
                  const prevState = { ...prev };
                  prevState[activeTab].nam = e.target.value;
                  return prevState;
                });
              }}
              value={tabs[activeTab].nam}
            />
            <p className="text-sm text-gray-500">input value will be persisted across tabs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default R;
