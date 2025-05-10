import React, { useEffect, useState } from "react";

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [masterCards, setMasterCards] = useState([]);

  useEffect(() => {
    const numOC = Array.from({ length: 9 }).map((_, index) => index);
    const finalCards = [...numOC, ...numOC].sort(() => Math.random() - 0.5);
    setCards(finalCards);
  }, []);

  const toggleHanlder = (index) => {
    if (masterCards.includes(cards[index])) return;
    if (flipped.length === 2) return;
    if (flipped.includes(index)) return;

    const tempFlipped = [...flipped, index];
    setFlipped(tempFlipped);
    if (tempFlipped.length == 2) {
      const [index1, index2] = tempFlipped;
      if (cards[index1] == cards[index2]) {
        setMasterCards((p) => [...p, cards[index1]]);
      }
      setTimeout(() => {
        setFlipped([]);
      }, 700);
    }
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="w-full max-w-2xl grid grid-cols-3 gap-2">
        {cards.map((item, index) => {
          const canShow = flipped.includes(index) || masterCards.includes(cards[index]);
          return (
            <div
              key={index}
              onClick={() => {
                toggleHanlder(index);
              }}
              className={`border border-gray-700 h-32 cursor-pointer rounded-md ${
                canShow ? "bg-green-600" : "bg-transparent"
              } flex justify-center items-center`}
            >
              {canShow ? item : "?"}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MemoryGame;
