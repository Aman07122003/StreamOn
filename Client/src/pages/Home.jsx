import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import {
  HomeHeader,
  Sidebar,
  SortOptions,
  VideoGrid,
  Pagination
} from '../components/Home';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slice/authSlice';

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState(-1);
  const [isLoadingVideos, setIsLoadingVideos] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const profileMenuRef = useRef(null);
  const dispatch = useDispatch();
  const isAuthenticatedRedux = useSelector((state) => state.auth.isAuthenticated);
  const userRedux = useSelector((state) => state.auth.user);

  
  useEffect(() => {
    if (isAuthenticatedRedux !== null) {
      fetchVideos();
    }
  }, [currentPage, sortBy, sortOrder, searchQuery, isAuthenticatedRedux]);

  useEffect(() => {
    if (!isAuthenticatedRedux && !isLoading) {
      navigate('/');
    }
  }, [isAuthenticatedRedux, isLoading]);
  

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    }
    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  const fetchVideos = async () => {
    try {
      setIsLoadingVideos(true);
      const response = await axiosInstance.get('/videos/', {
        params: {
          page: currentPage,
          limit: 12,
          sortBy,
          sortOrder,
          search: searchQuery
        }
      });
      
      setVideos(response.data.data);
      setTotalPages(Math.ceil(response.data.total / 12));
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setIsLoadingVideos(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchVideos();
  };

  const handleSort = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };


  const handleVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice search is not supported in your browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setCurrentPage(1);
      fetchVideos();
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  if (isLoading || isLoadingVideos) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <HomeHeader
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        handleVoiceSearch={handleVoiceSearch}
        isListening={isListening}
        isAuthenticated={isAuthenticatedRedux}
        user={userRedux}
        isProfileMenuOpen={isProfileMenuOpen}
        setIsProfileMenuOpen={setIsProfileMenuOpen}
        profileMenuRef={profileMenuRef}
      />

      <Sidebar isSidebarOpen={isSidebarOpen} />

      {/* Main Content */}
      <main className={`pt-16 ${isSidebarOpen ? 'ml-0 sm:ml-72' : 'ml-0'} transition-all duration-500`}>
        <div className="container mx-auto px-10 py-8">
          <SortOptions sortBy={sortBy} handleSort={handleSort} />
          
          <VideoGrid videos={videos} isLoadingVideos={isLoadingVideos} />
          
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            setCurrentPage={setCurrentPage} 
          />
        </div>
      </main>
    </div>
  );
};

export default Home; 