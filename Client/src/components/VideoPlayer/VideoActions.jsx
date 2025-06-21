import React, { useState } from "react";
import { FiThumbsUp, FiThumbsDown, FiShare2 } from 'react-icons/fi';
import axiosInstance from "../../utils/axiosInstance";

const VideoActions = ({ 
  isLiked, 
  isDisliked, 
  likeCount, 
  dislikeCount, 
  onLike, 
  onDislike, 
  onShare,
  isMobile = false 
}) => {
  const buttonSize = isMobile ? 'text-sm' : 'text-base';
  const iconSize = isMobile ? 'w-3 h-3' : 'w-4 h-4';
  const padding = isMobile ? 'px-2 py-1' : 'px-3 py-2';

  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(likeCount);

  const handleLike = async () => {
    try {
      const res = await axiosInstance.patch(`/like/video/${videoId}`);
      setLiked(res.data.data.liked);
      setLikes(res.data.data.totalLikes);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleLike}
        className={`flex items-center space-x-1 ${padding} rounded-lg transition-colors ${buttonSize} ${
          liked ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
      >
        <FiThumbsUp className={iconSize} />
        <span>{likes}</span>
      </button>
      <button
        onClick={onDislike}
        className={`flex items-center space-x-1 ${padding} rounded-lg transition-colors ${buttonSize} ${
          isDisliked ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
      >
        <FiThumbsDown className={iconSize} />
        <span>{dislikeCount}</span>
      </button>
      <button
        onClick={onShare}
        className={`flex items-center space-x-1 ${padding} bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors ${buttonSize}`}
      >
        <FiShare2 className={iconSize} />
        {!isMobile && <span>Share</span>}
      </button>
    </div>
  );
};

export default VideoActions; 