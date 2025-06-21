import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiTrendingUp, FiBookmark, FiFolder, FiClock } from 'react-icons/fi';

const Sidebar = ({ isSidebarOpen }) => {
  const navigationItems = [
    { icon: <FiHome className="w-5 h-5" />, text: "Home", link: "/" },
    { icon: <FiTrendingUp className="w-5 h-5" />, text: "Trending", link: "/trending" },
    { icon: <FiBookmark className="w-5 h-5" />, text: "Subscriptions", link: "/subscriptions" },
    { icon: <FiFolder className="w-5 h-5" />, text: "Library", link: "/library" },
    { icon: <FiClock className="w-5 h-5" />, text: "History", link: "/history" }
  ];

  return (
    <>

      {/* Sidebar */}
      <aside className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-gray-900/50 backdrop-blur-xl border-r border-indigo-500/20 w-72 transform transition-all duration-500 z-50 ${
        isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
      }`}>
        <nav className="p-4">
          <ul className="space-y-2">
            {navigationItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.link}
                  className={`flex items-center space-x-4 p-3 rounded-xl transition-all duration-300 ${
                    window.location.pathname === item.link
                      ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/10 border border-indigo-500/30 shadow-lg' 
                      : 'hover:bg-gray-800/50'
                  }`}
                >
                  <span className={window.location.pathname === item.link ? "text-purple-400" : "text-gray-400"}>
                    {item.icon}
                  </span>
                  <span className={`text-sm ${window.location.pathname === item.link ? "font-medium text-white" : "text-gray-300"}`}>
                    {item.text}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar; 