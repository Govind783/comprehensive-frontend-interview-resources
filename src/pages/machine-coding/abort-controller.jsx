import React, { useRef } from "react";

const R = () => {
  const controller = useRef(new AbortController());
  const fetchData = async (PN) => {
    if (controller.current) {
      controller.current.abort();
    }
    controller.current = new AbortController();

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${PN}&limit=10`, {
        signal: controller.current.signal, // Attach the signal
      });
      const data = await res.json();
      console.log("Fetched Data:", data);
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Previous API call cancelled:", PN);
      } else {
        console.error(err);
      }
    }
  };

  const handleSearch = (query) => {
    fetchData(query);
  };

  handleSearch("1"); //Cancels
  setTimeout(() => handleSearch("2"), 100); // Cancels
  setTimeout(() => handleSearch("3"), 200); // succeeeds

  return <div>R</div>;
};

export default R;
