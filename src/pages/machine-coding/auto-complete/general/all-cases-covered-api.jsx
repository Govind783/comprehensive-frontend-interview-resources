import { Input } from "@/components/ui/input";
import React, { useCallback, useEffect, useRef, useState } from "react";

const AutoCompleteMoreCasesCovered = () => {
  // cache
  // debounce
  // up down
  // oytisde cl;ick

  const cache = useRef(new Map());
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const timerID = useRef();
  const [activeItem, setActiveItem] = useState(0);
  const activeItemRef = useRef([]);
  const [showItems, SetShowItems] = useState(false);

  const debounce = (fn) => {
    return function (...args) {
      clearTimeout(timerID.current);
      timerID.current = setTimeout(() => {
        fn(...args);
      }, 400);
    };
  };
  const onChangeHandler = (strokes) => {
    // here either return form cache or if not cahce make api call below
    if (cache.current.has(strokes)) {
      setData(cache.current.get(strokes));
      return;
    }

    fetchData(strokes);
  };
  const fetchData = async (strokes) => {
    try {
      const response = await fetch(`https://dummyjson.com/recipes/search?q=${strokes}`);
      const apiData = await response.json();
      const finalData = apiData.recipes.map((i) => i?.name);

      setData(finalData);
      cache.current.set(strokes, finalData);
    } catch (err) {
      console.log(err);
    }
  };

  const optimizedChangeHandler = debounce(onChangeHandler);

  useEffect(() => {
    const navigateItems = (e) => {
      console.log("hete", e.key);

      if (!showItems) return;
      if (e.key === "ArrowUp") {
        setActiveItem((p) => Math.max(0, p - 1));
      } else if (e.key === "ArrowDown") {
        setActiveItem((p) => Math.min(data.length - 1, p + 1));
      }
    };

    document.addEventListener("keydown", navigateItems);

    return () => {
      document.removeEventListener("keydown", navigateItems);
    };
  }, [showItems, data]);

  useEffect(() => {
    if (activeItemRef.current[activeItem]) {
      activeItemRef.current[activeItem].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeItem]);

  return (
    <div className="flex w-screen h-screen justify-center items-center flex-col">
      <p className="text-xl font-semibold">Search for Reciepe</p>
      <div className="w-full max-w-xl">
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            optimizedChangeHandler(e.target.value);
          }}
          onFocus={() => {
            SetShowItems(true);
          }}
          onBlur={() => {
            SetShowItems(false);
          }}
        />
        <div className="max-h-[400px] h-full overflow-y-auto w-full">
          {data.map((item, index) => {
            return (
              <p
                ref={(el) => {
                  if (el) {
                    // console.log(el, 'e');

                    activeItemRef.current[index] = el;
                  }
                }}
                key={item}
                className={`bg-gray-700 rounded-md p-4 w-full my-2 h-11 transition-all ${
                  activeItem == index && "bg-blue-800"
                } ease-out duration-300 hover:bg-gray-800`}
              >
                {" "}
                {item}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AutoCompleteMoreCasesCovered;
