// root
//     /    \
//    c      d
//    |      |
//    a      o
//   / \     |
//  t   r    g

import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";

const createNode = () => ({
  children: {},
  isEndOfWord: false,
});

const createTrie = () => ({
  root: createNode(),
});

const makeTreeOutOf_Word = (trie, word) => {
  let current = trie.root;

  for (let char of word.toLowerCase()) {
    if (!current.children[char]) {
      current.children[char] = createNode();
    }
    current = current.children[char];
  }
  current.isEndOfWord = true;
  return trie;
};

const findAllWords = (trie, prefix) => {
  const words = [];
  let current = trie.root;

  for (let char of prefix.toLowerCase()) {
    if (!current.children[char]) {
      return words;
    }
    current = current.children[char];
  }

  const findWords = (node, curr) => {
    if (node.isEndOfWord) {
      words.push(curr);
    }
    for (let char in node.children) {
      findWords(node.children[char], curr + char);
    }
  };

  findWords(current, prefix.toLowerCase());
  return words;
};


const AutocompleteInput = () => {
  const [trie, setTrie] = useState();
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sampleWords = [
      "react",
      "redux",
      "router",
      "javascript",
      "typescript",
      "node",
      "express",
      "mongodb",
      "postgresql",
      "python",
      "django",
      "flask",
      "java",
      "spring",
      "kotlin",
      "swift",
      "angular",
      "vue",
      "next",
      "nuxt",
    ];
    console.log(createTrie(), "createTrie()");

    const newTrie = sampleWords.reduce((acc, word) => makeTreeOutOf_Word(acc, word), createTrie());
    console.log(newTrie);

    setTrie(newTrie);
    setIsLoading(false);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim()) {
      const matches = findAllWords(trie, value);
      setSuggestions(matches.slice(0, 5)); // Limitt to 5 suggestions
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (word) => {
    setInput(word);
    setSuggestions([]);
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="relative">
        <Input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Start typing to search..."
          className="w-full p-2 border rounded "
        />

        {suggestions.length > 0 && (
          <div className="absolute w-full mt-1 border border-gray-800  rounded shadow-lg">
            {suggestions.map((word, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(word)}
                className="p-2 hover:bg-gray-900 cursor-pointer"
              >
                {word}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AutocompleteInput;

