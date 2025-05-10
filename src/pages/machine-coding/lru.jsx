import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";

const R = () => {
  const [data1, setData1] = useState({});
  const [cacheStatus, setCacheStatus] = useState({});
  const cache = useRef(new Map());

  const get = (key) => {
    if (!cache.current.has(key)) return false;

    const value = cache.current.get(key);
    cache.current.delete(key);
    cache.current.set(key, value);
    return value;
  };

  const set = (key, value) => {
    if (cache.current.has(key)) {
      cache.current.delete(key);
    }

    if (cache.current.size >= 3) {
      const firstKey = cache.current.keys().next().value;
      cache.current.delete(firstKey);
    }

    cache.current.set(key, value);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold text-center mb-4">LRU Cache Fetcher</h1>

        {Array.from({ length: 7 }).map((_, index) => {
          const page = index + 1;
          const cacheHit = cacheStatus[page] === "hit";
          const cacheMiss = cacheStatus[page] === "miss";

          return (
            <div
              key={index}
              className="bg-gray-900 rounded-lg p-4 shadow-lg border border-gray-800 space-y-2"
            >
              <div className="flex justify-between items-center">
                <Button
                  // className="bg-blue-600 hover:bg-blue-700"
                  onClick={async () => {
                    const cached = get(page);
                    if (cached) {
                      setCacheStatus((prev) => ({ ...prev, [page]: "hit" }));
                      return;
                    }

                    setCacheStatus((prev) => ({ ...prev, [page]: "miss" }));

                    const res = await fetch(
                      `https://jsonplaceholder.typicode.com/posts?_page=${page}`
                    );
                    const data = await res.json();

                    setData1((prev) => ({
                      ...prev,
                      [page]: data,
                    }));
                    set(page, data);
                  }}
                >
                  Fetch Page {page}
                </Button>

                <span
                  className={`text-sm font-medium px-2 py-1 rounded ${
                    cacheHit
                      ? "text-green-400 bg-green-900"
                      : cacheMiss
                      ? "text-yellow-400 bg-yellow-900"
                      : "text-gray-400"
                  }`}
                >
                  {cacheHit
                    ? "Cache Hit"
                    : cacheMiss
                    ? "Cache Miss"
                    : "Not Fetched"}
                </span>
              </div>

              <div className="text-sm text-gray-300 bg-gray-800 p-3 rounded overflow-x-auto max-h-40">
                {data1[page] ? (
                  <pre>{JSON.stringify(data1[page].slice(0, 2), null, 2)}</pre>
                ) : (
                  <span className="italic text-gray-500">No data</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default R;
