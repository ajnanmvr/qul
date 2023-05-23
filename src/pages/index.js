import React, { useState } from "react";
import myData from "../../data/mydata.json";
import ItemList from "../components/ItemList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";


function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearchQueryChange(event) {
    setSearchQuery(event.target.value);
  }

  function handleClearSearch() {
    setSearchQuery("");
  }
const style= "background:red"
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center bg-[url('../../public/bg.png')] bg-cover bg-fixed">
      <div className="relative p-12 w-full sm:max-w-2xl sm:mx-auto ">
        <div className="flex justify-center">
          <img
            src="/qul-logo.png"
            alt="qul-logo"
            className="w-60 h-60 rounded-full mb-6"
          />
        </div>
        <div className="overflow-hidden z-0 rounded-full relative p-3">
          <form role="form" className="relative flex z-50 bg-white rounded-full">
            <input
              className="rounded-full flex-1 px-6 py-4 text-gray-700 focus:outline-none"
              type="text"
              placeholder="Enter Your Name Here.."
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
            {searchQuery && (
              <button
                type="button"
                className="m-4 text-gray-500 hover:text-red-700 focus:outline-none"
                onClick={handleClearSearch}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </form>
          <div className="glow glow-1 z-10 bg-orange-900 absolute" />
          <div className="glow glow-2 z-20 bg-yellow-600 absolute" />
          <div className="glow glow-3 z-30 bg-yellow-400 absolute" />
          <div className="glow glow-4 z-40 bg-green-800 absolute" />
        </div>
        {searchQuery && (
          <ItemList items={myData.items} searchQuery={searchQuery} maxSuggestions={2} />
        )}
      </div>
    </div>
  );
}

export default HomePage;
