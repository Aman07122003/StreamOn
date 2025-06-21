import React from 'react';
import VideoActions from './VideoActions';

const VideoDetails = ({ 
  video, 
  isLiked, 
  isDisliked, 
  likeCount, 
  dislikeCount, 
  onLike, 
  onDislike, 
  onShare,
  isMobile = false 
}) => {
  const titleSize = isMobile ? 'text-xl' : 'text-2xl';
  const textSize = isMobile ? 'text-sm' : 'text-base';
  const padding = isMobile ? 'p-4' : 'p-6';
  const margin = isMobile ? 'mb-4' : 'mb-6';

  return (
    <div className={`bg-gray-800 rounded-xl ${padding} ${margin}`}>
      <h1 className={`${titleSize} font-bold mb-4`}>{video.title}</h1>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className={`text-gray-400 ${textSize}`}>{video.views} views</span>
            <span className="text-gray-400">•</span>
            <span className={`text-gray-400 ${textSize}`}>
              {new Date(video.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <VideoActions
          isLiked={isLiked}
          isDisliked={isDisliked}
          likeCount={likeCount}
          dislikeCount={dislikeCount}
          onLike={onLike}
          onDislike={onDislike}
          onShare={onShare}
          isMobile={isMobile}
        />
      </div>

      {/* Channel Info */}
      <div className={`flex items-center space-x-4 p-4 bg-gray-700 rounded-lg ${isMobile ? 'mb-3' : 'mb-4'}`}>
        <img
          src={video.owner?.avatar || "https://via.placeholder.com/60"}
          alt={video.owner?.username}
          className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-full`}
        />
        <div>
          <h3 className={`font-semibold ${isMobile ? 'text-sm' : 'text-base'}`}>
            {video.owner?.username}
          </h3>
          <p className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>
            {video.owner?.subscribers || 0} subscribers
          </p>
        </div>
      </div>

      {/* Description */}
      <div className={`p-4 bg-gray-700 rounded-lg ${isMobile ? '' : 'mt-4'}`}>
        <p className={`text-gray-300 whitespace-pre-wrap ${isMobile ? 'text-sm' : 'text-base'}`}>
          {video.description}
        </p>
      </div>
    </div>
  );
};

export default VideoDetails; 