import React, { useEffect, useState } from "react";

const Pagination = () => {
  const [appStatus, setAppStatus] = useState({
    loading: false,
    error: false,
    data: {},
  });

  const [activePage, setActivePage] = useState(1);

  const fetchdata = async (PN) => {
    setAppStatus((prev) => {
      return {
        ...prev,
        loading: true,
      };
    });
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${PN}`);
      const apiData = await res.json();
      setAppStatus((prev) => {
        return {
          ...prev,
          loading: false,
          data: {
            ...prev.data,
            [PN]: apiData,
          },
        };
      });
    } catch (e) {
      console.log(e);
    }
  };

  const masterFN = async () => {
    const sizeOFData = appStatus.data ? Object.keys(appStatus.data).length : 0;

    let pages = [];
    if (appStatus.data[activePage] && appStatus.data[activePage + 1]) return;

    if (sizeOFData < 3) {
      pages = [1, 2, 3];
    } else {
      pages = [activePage + 1, activePage + 2];
    }

    const unFulFilledpromises = pages.map((i) => fetchdata(i));
    await Promise.allSettled(unFulFilledpromises);
  };

  useEffect(() => {
    masterFN();
  }, [activePage]);

  return (
    <div className="min-h-screen p-8 flex flex-col items-center gap-8">
      {appStatus.loading && <div className="text-lg font-medium text-gray-600">Loading...</div>}

      {appStatus.error && <div className="text-lg font-medium text-red-500">Error loading data. Please try again.</div>}

      {appStatus.data[activePage] && (
        <>
          <div className="flex flex-col items-center h-[600px] gap-3 overflow-y-auto w-full max-w-2xl">
            {appStatus.data[activePage].map((item) => (
              <div
                key={item.id}
                className="border border-gray-700 bg-gray-900 rounded-lg p-4 w-full shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="text-white font-medium">{item.title}</h3>
              </div>
            ))}
          </div>

          <div className="flex gap-2 flex-wrap justify-center">
            {Array.from({ length: 10 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setActivePage(index + 1)}
                className={`
                w-10 h-10 rounded-lg flex justify-center items-center font-medium transition-all duration-200
                ${activePage === index + 1 ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
                ${appStatus.data[index + 1] ? "border-2 border-gray-200" : ""}
              `}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Pagination;
