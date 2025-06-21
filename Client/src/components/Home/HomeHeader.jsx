import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiSearch, FiMic, FiUpload } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { LogoutButton } from './index';

const HomeHeader = ({ 
  isSidebarOpen, 
  setIsSidebarOpen, 
  searchQuery, 
  setSearchQuery, 
  handleSearch, 
  handleVoiceSearch, 
  isListening, 
  isProfileMenuOpen, 
  setIsProfileMenuOpen, 
  handleLogout,
  profileMenuRef 
}) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-xl border-b border-indigo-500/20 z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 h-16">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-2 hover:bg-indigo-500/20 rounded-xl transition-all duration-300 hover:rotate-90"
          >
            <FiMenu className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-300" />
          </button>
          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent tracking-tighter">
            Stream<span className="font-extrabold">AI</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden sm:flex items-center flex-1 justify-center ml-10 max-w-2xl mx-4">
          <form onSubmit={handleSearch} className="w-full flex">
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="bg-gray-800 px-6 py-2 rounded-r-full hover:bg-gray-700 transition-colors"
            >
              <FiSearch className="w-5 h-5" />
            </button>
          </form>
          <button
            onClick={handleVoiceSearch}
            className={`ml-2 p-2 rounded-full hover:bg-gray-800 transition-colors ${
              isListening ? "text-red-500" : ""
            }`}
          >
            <FiMic className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Picture */}
        {isAuthenticated && user ? (
          <div className='flex items-center gap-10'>
            <div className='flex items-center gap-2'>
              <Link
                to={isAuthenticated ? "/upload" : "/login"}
                className="flex items-center gap-2 text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 transition"
              >
                <FiUpload />
                Upload Video
              </Link>
            </div>
            <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setIsProfileMenuOpen((prev) => !prev)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img
                src={user.avatar || "https://via.placeholder.com/40"}
                alt={user.username}
                className="w-10 h-10 rounded-full object-cover border-2 border-purple-500/50 hover:border-purple-500 transition-colors"
              />
              <p>{user.username}</p>
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-lg z-50 py-2 border border-gray-700">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-200 hover:bg-purple-600 hover:text-white rounded-t-xl transition-colors"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  Profile
                </Link>
                <LogoutButton className="w-full text-left px-4 py-2 hover:bg-red-600" />
              </div>
              )}
            </div>
          </div>
        ) : (
          <div className='flex items-center gap-2'>
            <Link
              to="/register"
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all transform hover:scale-[1.02]"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all transform hover:scale-[1.02]"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default HomeHeader; 