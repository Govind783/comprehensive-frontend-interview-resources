import { Button } from "@/components/ui/button";
import { Delete, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
const arr = ["7", "8", "9", "/", "4", "5", "6", "x", "1", "2", "3", "-", "0", ".", "=", "+"];
const Calculator = () => {
  const [res, setRes] = useState("");
  const [listOfOps, setListOfOps] = useState("");

  const operation = (char, numsTillThere, nextNumAfterOperator) => {
    if (char == "+") return Number(numsTillThere) + Number(nextNumAfterOperator);
    if (char == "-") return Number(numsTillThere) - Number(nextNumAfterOperator);
    if (char == "x") return Number(numsTillThere) * Number(nextNumAfterOperator);

    if (char == "/") return Number(numsTillThere) / Number(nextNumAfterOperator);
  };

  const calclateHadler = () => {
    let tempResultOfCurrCalc = "";
    for (let i = 0; i < listOfOps.length; i++) {
      if (isNaN(listOfOps[i])) {
        // it has found an opeartoer so calc till index of op - 1 and store it

        if (!isNaN(listOfOps[i + 1])) {
          // this case is if the user has done something like 52 * 3 then yes i + 1 which is 3 its evaluation on isNan is falsy and hence go in if blocks but if he has done someting like 52/+ then this makes no sense right hence u return earlu
          const performOpearationRes = operation(listOfOps[i], tempResultOfCurrCalc, listOfOps[i + 1]);
          tempResultOfCurrCalc = performOpearationRes;
          i += 1;
          continue; // to skip the curr iteration and to avoid adding tempResultOfCurrCalc += listOfOps[i]; since ur doing that on LN 26
        } else {
          setRes("Invalid opeartion");
          return;
        }
      }
      tempResultOfCurrCalc += listOfOps[i];
    }
    setRes(tempResultOfCurrCalc);
  };

  useEffect(() => {
    const addwithKeyStroke = (e) => {
      const keyPressed = e.key;
      if (arr.some((i) => i == keyPressed) && keyPressed !== "=") {
        setListOfOps((p) => p + keyPressed);
        setRes((p) => p + keyPressed);
      }
    };
    document.addEventListener("keydown", addwithKeyStroke);

    return () => {
      document.removeEventListener("keydown", addwithKeyStroke);
    };
  }, []);

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="max-w-md w-full border border-gray-700 rounded-md p-8">
        <div className="flex flex-col gap-5">
          <div className="bg-gray-900 border border-slate-700 h-10 rounded-md pl-4 pt-2 mx-4 mt-5">{res}</div>
          <div className="w-full max-w-2xl grid grid-cols-4 gap-x-4 gap-y-4 justify-items-center">
            {arr.map((item) => {
              return (
                <p
                  key={item}
                  onClick={() => {
                    if (item === "=") {
                      calclateHadler();
                    } else {
                      setListOfOps((p) => p + item);
                      setRes((p) => p + item);
                    }
                  }}
                  className="bg-gray-900 rounded-md active:bg-gray-700 transition-all ease-in-out duration-300 cursor-pointer flex justify-center w-10 h-10 items-center border border-slate-500"
                >
                  {" "}
                  {item}{" "}
                </p>
              );
            })}
          </div>

          <div className="w-full flex justify-center items-center">
            <Button onClick={calclateHadler} className="w-full">
              Calc
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setListOfOps((p) => (p.length > 1 ? p.slice(0, -1) : p));
                setRes((p) => (p.length > 1 ? p.slice(0, -1) : p));
              }}
              className="w-full"
            >
              back <Delete />
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setListOfOps("");
                setRes("");
              }}
              className="w-full"
            >
              back <Trash />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
