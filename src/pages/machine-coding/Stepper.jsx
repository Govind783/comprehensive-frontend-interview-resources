import { Button } from "@/components/ui/button";
import { useCopy } from "@/hooks/useCopy";
import React, { useState } from "react";

const Stepper = () => {
  const [content] = useState([
    {
      title: "Step 1",
      content: "This is the first step where we begin our journey. Here we lay the foundation for what comes next.",
    },
    {
      title: "Step 2",
      content: "Moving forward to step two, we explore new possibilities and build upon our initial progress.",
    },
    {
      title: "Step 3",
      content: "The third step brings us closer to our goal, refining and improving what we have accomplished so far.",
    },
    {
      title: "Step 4",
      content: "Finally, we reach the last step where everything comes together for the final outcome.",
    },
  ]);

  const [activeStep, setActiveStep] = useState(0);
  const [copyText] = useCopy();

  return (
    <div className="w-full max-w-4xl mx-auto px-8 py-12">
      <div className="relative flex justify-between mb-16">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-800">
          <div
            className="h-full bg-white transition-all duration-300 ease-in-out"
            style={{ width: `${(activeStep / (content.length - 1)) * 100}%` }}
          />
        </div>

        {content.map((item, index) => (
          <div key={index} className="relative z-10">
            <div
              className={`
                w-28 py-2 px-3 text-center bg-black rounded-md transition-all duration-300
                ${index == activeStep && "bg-gray-800"}
              `}
            >
              {item.title}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 p-6 rounded-lg mb-8 min-h-32 transition-all duration-300">
        {content[activeStep].content}
      </div>

      <div className="flex justify-between">
        <Button
          disabled={activeStep === 0}
          onClick={() => setActiveStep((prev) => prev - 1)}
          className={`
            px-6 py-2 rounded-md border border-black transition-all duration-200
            ${activeStep === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-black hover:text-white"}
          `}
        >
          Previous
        </Button>

        <Button
          disabled={activeStep === content.length - 1}
          onClick={() => {
            setActiveStep((prev) => prev + 1);
            copyText(activeStep + 1);
          }}
          className={`
            px-6 py-2 rounded-md border border-black transition-all duration-200
            ${activeStep === content.length - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-black hover:text-white"}
          `}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Stepper;
