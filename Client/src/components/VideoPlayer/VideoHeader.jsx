import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const VideoHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-xl border-b border-indigo-500/20 z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 h-16">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
          Stream<span className="font-extrabold">AI</span>
        </div>
        <div className="w-20"></div>
      </div>
    </header>
  );
};

export default VideoHeader; 