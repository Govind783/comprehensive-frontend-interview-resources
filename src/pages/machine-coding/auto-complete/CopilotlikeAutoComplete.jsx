import { useRef, useState, useEffect } from "react";
const sourceOfTruth = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
  "kiwi",
  "lemon",
  "mango",
  "nectarine",
  "orange",
  "pear",
  "pineapple",
  "plum",
  "strawberry",
];

const CopilotlikeAutoComplete = () => {
  const [probableSuggestion, setProbableSuggestion] = useState("");
  const mockEditorRef = useRef(null);
  const timerIDRef = useRef();

  const debounce = (fn) => {
    return function (...args) {
      clearTimeout(timerIDRef.current);
      timerIDRef.current = setTimeout(() => {
        fn(...args);
      }, 100);
    };
  };

  const onChangeHandler = () => {
    if (!mockEditorRef.current) return;

    const editorsCurrentValue = Array.from(mockEditorRef.current.childNodes)
      .filter((node) => node.nodeType === Node.TEXT_NODE)
      .map((i) => i.nodeValue)
      .join("");

    if (!editorsCurrentValue) {
      clearSuggestionHandler();
      return;
    }

    const editorValueInWords = editorsCurrentValue.split(/\s+/);
    const lastWord = editorValueInWords[editorValueInWords.length - 1];

    if (!lastWord) return;

    const matchingWords = sourceOfTruth.filter((i) => i.toLowerCase().startsWith(lastWord.toLowerCase()));

    if (!matchingWords.length) {
      clearSuggestionHandler();
      return;
    }

    const [firstMatching] = matchingWords;

    if (!firstMatching) return;
    const remainingString = firstMatching.substring(lastWord.length);
    setProbableSuggestion(remainingString);
    if (!remainingString) return;

    clearSuggestionHandler();
    const shadowSpan = document.createElement("span");
    shadowSpan.innerText = remainingString;
    shadowSpan.className = "text-gray-400";
    mockEditorRef.current.appendChild(shadowSpan);
  };

  const accceptSuggestionHandler = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      mockEditorRef.current.innerText += probableSuggestion.substring(mockEditorRef.current.innerText.length);
      clearSuggestionHandler();
      setProbableSuggestion("");

      if (mockEditorRef.current) {
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(mockEditorRef.current);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  };

  const clearSuggestionHandler = () => {
    document.querySelectorAll(".text-gray-400").forEach((i) => i.remove());
  };
  const optimizedAutomComplete = debounce(onChangeHandler);
  return (
    <div className="flex w-screen h-screen justify-center flex-col gap-10 items-center">
      <div className="font-semibold text-center text-gray-500">
      <p className="text-2xl">Type a fruit name, apple for example 🍎 </p>
      <p className="text-lg">and upon auto-compplete press Tab</p>
      </div>
      <div
        contentEditable="true"
        ref={mockEditorRef}
        className="border border-gray-500 w-96 h-96 rounded-md p-4"
        onInput={optimizedAutomComplete}
        onKeyDown={accceptSuggestionHandler}
      ></div>
    </div>
  );
};

export default CopilotlikeAutoComplete;
