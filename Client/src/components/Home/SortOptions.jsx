import React from 'react';

const SortOptions = ({ sortBy, handleSort }) => {
  const sortOptions = [
    { key: "createdAt", label: "Latest" },
    { key: "views", label: "Most Viewed" },
    { key: "likes", label: "Most Liked" }
  ];

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {sortOptions.map((option) => (
        <button
          key={option.key}
          onClick={() => handleSort(option.key)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            sortBy === option.key
              ? "bg-purple-500 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SortOptions; 