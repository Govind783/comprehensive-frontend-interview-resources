import React, { useEffect, useState } from "react";

const GS = 3;
const TicTacToe = () => {
  const [board, setBoard] = useState(Array.from({ length: 9 }).map((i) => null));
  const [winningPattern, setWinningPattern] = useState([]);

  const [turn, setTurn] = useState("X");

  const takeTurnHandler = (index) => {
    setBoard((p) => {
      const prev = [...p];
      prev[index] = turn;
      return prev;
    });
    setTurn((p) => (p === "X" ? "O" : "X"));

    getWinner();
  };

  useEffect(() => {
    setWinningPattern(generateWinningPatterns());
  }, []);

  const generateWinningPatterns = () => {
    const wins = [];
    // rows
    for (let i = 0; i < GS; i++) {
      wins.push(Array.from({ length: GS }).map((_, j) => i * GS + j));
    }

    // cols

    for (let i = 0; i < GS; i++) {
      wins.push(Array.from({ length: GS }).map((_, j) => i + j * GS));
    }

    // diagonls, topleft to bottom right
    // TL -> BR -> 0 4 8
    // TR -->> BL -> 2 4 6
    wins.push(Array.from({ length: GS }).map((_, i) => i * GS + i));
    wins.push(Array.from({ length: GS }).map((_, i) => i * GS + (GS - 1 - i)));

    return wins;
  };


  const getWinner = () => {
    for (let i of winningPattern) {
      const firstMarking = board[i[0]];

      if (firstMarking && i.every((mark) => board[mark] == firstMarking)) {
        alert(`winner is ${firstMarking}`);
        // cleanup and reset the states and all
        return;
      }
    }

    if (board.every((i) => i)) {
      return alert("ITS A DRAW!");
    }
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <p> {getWinner()} </p>
      <div className={`grid grid-cols-${GS} w-full max-w-xl`}>
        {board.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                takeTurnHandler(index);
              }}
              className="flex w-28 h-28 rounded-md cursor-pointer justify-center items-center border border-slate-500 bg-gray-900 "
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TicTacToe;
