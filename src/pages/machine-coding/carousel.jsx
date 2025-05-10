import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

const Carousel = () => {
  const [images, _] = useState([
    "https://picsum.photos/400/300?random=1",
    "https://picsum.photos/400/300?random=2",
    "https://picsum.photos/400/300?random=3",
    "https://picsum.photos/400/300?random=4",
  ]);
  const [active, setActive] = useState(0);

  const forward = () => {
    setActive((p) => (p < images.length - 1 ? p + 1 : 0));
  };

  const backward = () => {
    setActive((p) => (p ? p - 1 : 0));
  };
  useEffect(() => {
    const navigate = (e) => {
      if (e.key === "ArrowRight") {
        forward();
      } else if (e.key === "ArrowLeft") {
        backward();
      }
    };
    document.addEventListener("keydown", navigate);

    return () => {
      document.removeEventListener("keydown", navigate);
    };
  }, []);

  return (
    <div className="flex w-screen flex-col h-screen justify-center items-center">
      <div className="flex w-[24rem] overflow-hidden items-center">
        <Button
          variant={"secondary"}
          disabled={!active}
          onClick={() => {
            backward();
          }}
        >
          Prev
        </Button>
        <div className="flex items-center overflow-hidden">
          {images.map((item) => {
            return (
              <img
                src={item}
                key={item}
                style={{
                  transform: `translateX(-${active * 100}%)`,
                }}
                className="transition-transform ease-in-out duration-300"
              />
            );
          })}
        </div>
        <Button
          disabled={active === images.length}
          onClick={() => {
            forward();
          }}
        >
          Next
        </Button>
      </div>
      <div>
        <div className="flex items-center justify-center mt-4 gap-4">
          {images.map((_, index) => {
            return (
              <p
                key={index}
                onClick={() => {
                  setActive(index);
                }}
                className={`${
                  index == active ? "bg-gray-200" : "bg-gray-600"
                } cursor-pointer rounded-full w-2 h-2 hover:bg-gray-200 transition-all ease-linear duration-200`}
              >
                {" "}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
