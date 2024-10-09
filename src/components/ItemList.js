import { useState } from 'react';

export default function ItemList({ items, searchQuery, maxSuggestions }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

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
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleShowAllSuggestions = () => {
    setShowAllSuggestions(true);
  };

  const handleLike = () => {
    setLikeCount((prevCount) => prevCount + 1);
  };

  const handleDislike = () => {
    setDislikeCount((prevCount) => prevCount + 1);
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
          onClick={() => handleItemClick(item)}
        >
          <h2>{item.name}</h2>
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
      {selectedItem && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-100 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full border-green-800">
            <h2 className="text-2xl font-bold text-center mb-9">{selectedItem.name}</h2>
            <div className="space-y-2">
              {items
                .filter((item) => item.name.includes(selectedItem.name))
                .map((item) => (
                  <div key={item.id} className="flex items-center pt-3">
                    <div className="w-4 h-4 rounded-full bg-green-800 text-black mr-2" />
                    <div>
                      <p className="text-gray-800 font-bold">{item.programme}</p>
                      {item.position && item.grade ? (
                        <p className="text-gray-800">
                          <span className="font-semibold p-0.5 pl-2 pr-2 bg-slate-200 rounded-md">{item.position}</span> with{' '}
                          <span className="font-semibold p-0.5 pl-2 pr-2 bg-slate-200 rounded-md">{item.grade}</span> grade
                        </p>
                      ) : (
                        <>
                          {item.position && (
                            <p className="text-gray-800">
                              Position: <span className="font-semibold p-0.5 pl-2 pr-2 bg-slate-200 rounded-md">{item.position}</span>
                            </p>
                          )}
                          {item.grade && (
                            <p className="text-gray-800">
                              Grade: <span className="font-semibold p-0.5 pl-2 pr-2 bg-slate-200 rounded-md">{item.grade}</span>
                            </p>
                          )}
                        </>
                      )}
                    </div>
                    <div className="ml-auto flex items-center">
                      <button
                        onClick={handleLike}
                        className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md ml-2 hover:bg-green-600"
                      >
                        Like
                      </button>
                      <button
                        onClick={handleDislike}
                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md ml-2 hover:bg-red-600"
                      >
                        Dislike
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-zinc-500">
                Likes: {likeCount} | Dislikes: {dislikeCount}
              </p>
            </div>
            <div className="flex justify-center mt-4 flex-col">
              <p className="text-zinc-500 text-sm text-center m-5">
                Designed and Developed by <br />
                <span className="font-semibold text-lg">JDSA Media Wing</span>
              </p>
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-green-800 text-white font-bold rounded-md hover:bg-green-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </ul>
  );
}
