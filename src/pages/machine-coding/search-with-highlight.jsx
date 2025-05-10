import { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const items = [
    "Apple",
    "Banana",
    "Orange",
    "Strawberry",
    "Blueberry",
    "Mango",
    "Pineapple",
    "Watermelon",
    "Kiwi",
    "Peach",
  ];

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setResults([]);
      return;
    }
    const filteredResults = items.filter((item) => item.toLowerCase().includes(term.toLowerCase()));

    setResults(filteredResults);
  };

  const highlightMatch = (text, searchTerm) => {
    if (!searchTerm) return text;

    const wordToCompare = text.toLowerCase(), // apple
      searchQuery = searchTerm.toLowerCase(); // app

    const commonIndex = wordToCompare.indexOf(searchQuery);
    if (commonIndex == -1) return text;

    const end = commonIndex + searchQuery.length;
    return (
      <>
        <span>{text.substring(0, commonIndex)}</span>
        <span className="text-yellow-500">{text.substring(commonIndex, end)}</span>
        <span>{text.substring(end)}</span>
      </>
    );
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {results.length > 0 && (
        <div className="mt-2 bg-gray-900 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto">
          {results.map((item, index) => {
            return (
              <li
                key={item}
                className="px-4 py-2 hover:bg-gray-800 cursor-pointer border-b border-gray-700 last:border-none"
              >
                {highlightMatch(item, searchTerm)}
              </li>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
