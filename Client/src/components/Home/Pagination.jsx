import React from 'react';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex justify-center">
      <div className="flex space-x-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination; 