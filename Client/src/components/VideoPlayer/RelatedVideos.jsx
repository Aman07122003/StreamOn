import React from 'react';
import { useNavigate } from 'react-router-dom';

const RelatedVideos = ({ 
  relatedVideos, 
  currentVideoId, 
  isMobile = false,
  showRelatedVideos = false,
  onToggleRelatedVideos = null 
}) => {
  const navigate = useNavigate();
  const filteredVideos = relatedVideos
    .filter(v => v._id !== currentVideoId)
    .slice(0, isMobile ? 5 : 10);

  const handleVideoClick = (videoId) => {
    navigate(`/watch?v=${videoId}`);
  };

  if (isMobile) {
    return (
      <div className="bg-gray-800 rounded-xl mb-4">
        <button
          onClick={onToggleRelatedVideos}
          className="w-full flex items-center justify-between p-4 text-left"
        >
          <span className="font-semibold">Related Videos</span>
          {showRelatedVideos ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
        
        {showRelatedVideos && (
          <div className="px-4 pb-4 space-y-3">
            {filteredVideos.map((relatedVideo) => (
              <div
                key={relatedVideo._id}
                onClick={() => handleVideoClick(relatedVideo._id)}
                className="cursor-pointer group"
              >
                <div className="flex space-x-3">
                  <div className="relative w-32 h-20 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={relatedVideo.thumbnail}
                      alt={relatedVideo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 px-1 py-0.5 rounded text-xs">
                      {relatedVideo.duration}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2 group-hover:text-purple-400 transition-colors">
                      {relatedVideo.title}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">
                      {relatedVideo.owner?.username}
                    </p>
                    <p className="text-xs text-gray-400">
                      {relatedVideo.views} views • {new Date(relatedVideo.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Related Videos</h3>
      <div className="space-y-4">
        {filteredVideos.map((relatedVideo) => (
          <div
            key={relatedVideo._id}
            onClick={() => handleVideoClick(relatedVideo._id)}
            className="cursor-pointer group"
          >
            <div className="flex space-x-3">
              <div className="relative w-40 h-24 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={relatedVideo.thumbnail}
                  alt={relatedVideo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute bottom-1 right-1 bg-black/80 px-1 py-0.5 rounded text-xs">
                  {relatedVideo.duration}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm line-clamp-2 group-hover:text-purple-400 transition-colors">
                  {relatedVideo.title}
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  {relatedVideo.owner?.username}
                </p>
                <p className="text-xs text-gray-400">
                  {relatedVideo.views} views • {new Date(relatedVideo.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedVideos; 