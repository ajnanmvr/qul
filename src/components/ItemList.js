import { useState } from 'react';

export default function ItemList({ items, searchQuery, maxSuggestions }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null); // To track which item is expanded

  const uniqueItems = new Set();
  const filteredItems = [];

  items.forEach((item) => {
    if (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !uniqueItems.has(item.name)
    ) {
      uniqueItems.add(item.name);
      filteredItems.push(item);
    }
  });

  const handleItemClick = (item) => {
    // Toggle description visibility for the clicked item
    setExpandedItem(expandedItem === item.name ? null : item.name);
  };

  const handleShowAllSuggestions = () => {
    setShowAllSuggestions(true);
  };

  return (
    <ul className="flex justify-center mt-4 flex-wrap">
      {(showAllSuggestions
        ? filteredItems
        : filteredItems.slice(0, maxSuggestions)
      ).map((item) => (
        <li
          key={item.name}
          className="cursor-pointer hover:bg-green-900 py-2 px-4 bg-green-800 font-semibold text-white rounded-full m-1"
        >
          <div
            onClick={() => handleItemClick(item)}
            className="flex justify-between items-center"
          >
            <h2>{item.name}</h2>
            <span className="ml-2">
              {expandedItem === item.name ? '▲' : '▼'}
            </span>
          </div>
          {/* Conditionally render description based on whether the item is expanded */}
          {expandedItem === item.name && (
            <div className="mt-2 p-2 bg-gray-100 text-gray-800 rounded-lg">
              <p className="font-bold">Programme: {item.programme}</p>
              {item.position && (
                <p>
                  Position: <span className="font-semibold">{item.position}</span>
                </p>
              )}
              {item.grade && (
                <p>
                  Grade: <span className="font-semibold">{item.grade}</span>
                </p>
              )}
              {item.description && (
                <p className="mt-2">
                  Description: <span>{item.description}</span>
                </p>
              )}
            </div>
          )}
        </li>
      ))}
      <br />
      {!showAllSuggestions && (
        <li>
          <button
            className="cursor-pointer hover:bg-red-700 hover:text-white py-2 px-4 bg-yellow-500 font-semibold text-black rounded-full m-1"
            onClick={handleShowAllSuggestions}
          >
            Show All Suggestions
          </button>
        </li>
      )}
    </ul>
  );
}
