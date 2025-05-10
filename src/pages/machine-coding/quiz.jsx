import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import React, { useState } from "react";

const RetryAPIBasic = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeAnswer, setActiveAnswer] = useState("");
  const [resiultOfQuiz, setResiultOfQuiz] = useState({});

  const [questions, setQuestions] = useState([
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: "4",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      answer: "Pacific",
    },
    {
      question: "Who wrote 'To be, or not to be'?",
      options: ["Shakespeare", "Hemingway", "Tolkien", "Twain"],
      answer: "Shakespeare",
    },
  ]);

  const [answers, setAnswers] = useState(Array.from({ length: questions.length }).map((i) => ""));
  const selectSpecificAnswer = (answer) => {
    setActiveAnswer(answer);
    setAnswers((p) => {
      p[activeIndex] = answer;
      return p;
    });
  };

  const judge = () => {
    const correct = [],
      wrong = [];

    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === questions[i].answer) {
        correct.push(answers[i]);
      } else {
        wrong.push(answers[i]);
      }
    }
    console.log(correct);

    setResiultOfQuiz({
      correct,
      wrong,
    });
    return;
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="w-[30rem] flex flex-col items-center">
        <div className="border border-gray-800 rounded-md p-4 w-full">
          {activeIndex < questions.length ? (
            <>
              <p className="text-lg  text-center font-semibold">{questions[activeIndex].question}</p>

              <div className="mt-10">
                {questions[activeIndex].options.map((item) => {
                  return (
                    <div
                      onClick={() => {
                        selectSpecificAnswer(item);
                      }}
                      key={item}
                      className={`flex items-center gap-2 px-4 h-10 text-gray-400 hover:bg-gray-800 cursor-pointer rounded-md w-full`}
                    >
                      <Check className={`${activeAnswer === item ? "opacity-100" : "opacity-0"}`} />
                      {item}
                    </div>
                  );
                })}
              </div>
              <Button
                className="w-full mt-4"
                onClick={() => {
                  if (activeIndex < questions.length) {
                    setActiveIndex((p) => p + 1);
                  }
                  setActiveAnswer("");
                }}
              >
                Next
              </Button>
            </>
          ) : (
            <div className="flex flex-col gap-4 items-center">
              <Button onClick={judge} className="w-full">
                Calculate
              </Button>

              <div className="w-full p-4 bg-gray-900 border border-gray-700 rounded-lg text-sm">
                <h2 className="text-xl font-semibold text-center mb-4 text-white">Your Result</h2>

                <div className="mb-2">
                  <p className="text-green-400 font-medium">
                    Correct Answers ({resiultOfQuiz.correct?.length || 0})
                  </p>
                  <ul className="list-disc list-inside text-white pl-4 mt-3">
                    {resiultOfQuiz.correct?.map((ans, idx) => (
                      <li key={`correct-${idx}`}>{ans}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-red-400 font-medium mt-6"> Wrong Answers ({resiultOfQuiz.wrong?.length || 0})</p>
                  <ul className="list-disc list-inside text-white pl-4 mt-3">
                    {resiultOfQuiz.wrong?.map((ans, idx) => (
                      <li key={`wrong-${idx}`}>{ans || <span className="italic text-gray-400">(unanswered)</span>}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RetryAPIBasic;
