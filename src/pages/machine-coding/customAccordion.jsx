import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";

const CustomAccordion = () => {
  const [data, setData] = useState([
    {
      header: "Header 01",
      content: "Content 01",
    },
    {
      header: "Header 02",
      content: "Content 02",
    },
    {
      header: "Header 03",
      content: "Content 03",
    },
    {
      header: "Header 04",
      content: "Content 04",
    },
  ]);
  const [active, setActive] = useState(null);

  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <div className="h-full max-w-lg w-full flex flex-col items-center justify-center">
        {data.map((item, index) => {
          return (
            <div className="w-full my-2" key={index}>
              <div
                onClick={() => setActive((prev) => (prev === index ? false : index))}
                className="flex justify-between items-center cursor-pointer h-12 w-full border-b border-gray-600"
              >
                <p className=""> {item.header} </p>
                <ChevronDown
                  className={`w-6 h-6 transition-all ease-linear duration-150 ${
                    index === active ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
              <div
                className={`grid transition-all duration-200 ease-out ${
                  index === active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="py-4">{item.content}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomAccordion;
