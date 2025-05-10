import React, { useRef, useState, useEffect } from "react";

// List of UPI handles for autocomplete
const BANK_UPI_HANDLES = [
  "okaxis",
  "BARODAMPAY",
  "rbl",
  "upi",
  "allbank",
  "aubank",
  "axisbank",
  "bandhan",
  "indus",
  "kbl",
  "federal",
  "sbi",
  "yesbank",
  "citi",
  "citigold",
  "dlb",
  "dbs",
  "freecharge",
  "hsbc",
  "icici",
  "kotak",
  "paytm",
  "ybl",
  "okhdfcbank",
  "okicici",
  "oksbi",
  "axl",
  "ibl",
  "sib",
];

const UpiAutocomplete = () => {
  const sourceOfTruth = useRef(BANK_UPI_HANDLES);
  const [filtered, setFiltered] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const inputRef = useRef(null);
  const [activeItem, setActiveItem] = useState(0);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.includes("@")) {
      const [_, domain] = value.split("@");

      if (domain && domain.length >= 1) {
        const matches = sourceOfTruth.current.filter((handle) => handle.toLowerCase().startsWith(domain.toLowerCase()));

        setFiltered(matches);

        if (matches.length > 0) {
          const bestMatch = matches[0];
          console.log(bestMatch);
          if (bestMatch.startsWith(domain)) {
            setSuggestion(bestMatch.substring(domain.length));
          }
        } else {
          setSuggestion("");
        }
      } else {
        setFiltered(sourceOfTruth.current);
        setSuggestion("");
      }
    } else {
      setFiltered([]);
      setSuggestion("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight" && suggestion) {
      e.preventDefault();
      const [first, second] = inputValue.split("@");
      if (second.length > 0) {
        const finalValue = `${first}@${filtered[0]}`;
        setInputValue(finalValue);
        setSuggestion("");
        setFiltered([]);
      }
    }
  };

  // useEffect(() => {
  //   const navigateItems = (e) => {
  //     if (!filtered.length) return;
  //     if (e.key === "ArrowUp") {
  //       setActiveItem((p) => Math.max(0, p - 1));
  //     } else if (e.key === "ArrowDown") {
  //       setActiveItem((p) => Math.min(filtered.length - 1, p + 1));
  //     }
  //   };

  //   document.addEventListener("keydown", navigateItems);

  //   return () => {
  //     document.removeEventListener("keydown", navigateItems);
  //   };
  // }, [filtered]);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-6">Enter UPI ID</h2>

      <div className="w-full space-y-4">
        {/* Custom input with ghost text suggestion */}
        <div className="relative w-full">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full p-2 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter UPI ID"
          />

          {suggestion && (
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none p-2 flex items-center">
              <div className="invisible">{inputValue}</div>
              <div className="text-gray-500">{suggestion}</div>
            </div>
          )}
        </div>

        {filtered.length > 0 && (
          <div className="max-h-60 overflow-y-auto border border-gray-800 rounded-md bg-gray-950">
            {filtered.map((item, index) => (
              <div
                key={item}
                // onClick={() => handleSelectItem(item)}
                className={`p-3 hover:bg-gray-800 cursor-pointer ${
                  index == activeItem ? "bg-blue-800" : ""
                } border-b border-gray-800 last:border-b-0`}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 text-sm text-gray-400">
        <p>Instructions:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Type @ followed by characters to see UPI handle suggestions</li>
          <li>Press → (right arrow) to accept the suggestion</li>
          <li>Click on any suggestion from the dropdown to select it</li>
        </ul>
      </div>
    </div>
  );
};

export default UpiAutocomplete;
