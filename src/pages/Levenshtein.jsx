import React, { useState } from "react";

var levenshtein = function (a, b, memo = {}) {
  let key = `${a}-${b}`;
  if (key in memo) return memo[key];

  if (!a.length) return b.length;
  if (!b.length) return a.length;

  if (a[0] === b[0]) return levenshtein(a.slice(1), b.slice(1), memo);

  let insert = levenshtein(a, b.slice(1), memo);
  let remove = levenshtein(a.slice(1), b, memo);
  let replace = levenshtein(a.slice(1), b.slice(1), memo);

  return (memo[key] = 1 + Math.min(insert, remove, replace));
};

const LevenshteinTest = () => {
  const testCases = [
    ["cat", "kat"],
    ["kitten", "kitte"],
    ["sunday", "saturday"],
    ["hello", "yellow"],
    ["", "hi"],
    ["hi", ""],
    ["book", "back"],
    ["javascript", "java"],
    ["intention", "execution"],
    ["same", "same"],
    ["ab", "abc"],
    ["lund", "land"],
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Levenshtein Distance Test Cases</h2>
      {testCases.map(([str1, str2], index) => (
        <div key={index} className="mb-2">
          <code>
            Distance between "{str1}" and "{str2}": {levenshtein(str1, str2)}
          </code>
        </div>
      ))}
    </div>
  );
};

export default LevenshteinTest;
