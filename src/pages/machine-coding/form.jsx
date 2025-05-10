import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const Form = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [hasTypedPostError, setHasTypedPostError] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputeChangeHanlder = (strokes, source) => {
    setInputs((prev) => {
      const prevState = { ...prev };
      prevState[source] = strokes;
      return prevState;
    });
    if (!hasTypedPostError) setHasTypedPostError(true);
  };

  const submitHanlder = (e) => {
    e.preventDefault();
    setErrors({
      name: "",
      email: "",
      password: "",
    });

    if (inputs.name.length < 6) {
      setErrors((prev) => {
        return {
          ...prev,
          name: "name but be atleast 6 chars",
        };
      });
      // return;
    }

    if (!inputs.email.includes("@")) {
      setErrors((prev) => {
        return {
          ...prev,
          email: "Invalid email",
        };
      });
      // return;
    }

    if (!inputs.password.includes("123")) {
      setErrors((prev) => {
        return {
          ...prev,
          password: "PLEASE ENTER STRONG PASS",
        };
      });
      // return;
    }
  };
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="flex flex-col max-w-lg p-8 rounded-md w-full border border-gray-600 justify-center items-center gap-8">
        {Object.keys(inputs).map((item) => {
          return (
            <div key={item} className="w-full">
              <label htmlFor={item} className="text-[13px] text-gray-500 mb-1">
                {" "}
                {item}
              </label>
              <Input
                id={item}
                value={inputs[item]}
                onChange={(e) => inputeChangeHanlder(e.target.value, item)}
                placeholder={`please type your ${item}`}
                className='!border-gray-600'
              />
              {errors[item] && hasTypedPostError && <p className="text-red-500 text-xs">{errors[item]} </p>}
            </div>
          );
        })}
        <Button className="w-full" onClick={submitHanlder}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Form;
