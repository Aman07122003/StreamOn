import React from 'react';
import { Link } from 'react-router-dom';

const CARD_WIDTH = '320px'; // You can adjust this value for your grid
const CARD_HEIGHT = '340px'; // Adjust for desired card height
const THUMB_HEIGHT = '180px'; // Fixed thumbnail height

const VideoCard = ({ video }) => {
  return (
    <Link
        to={`/watch?v=${video._id}`}
        className="group"
        style={{ width: CARD_WIDTH, minWidth: CARD_WIDTH, maxWidth: CARD_WIDTH }}
      >
      <div
        className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 transition-colors duration-200 flex flex-col group-hover:border-purple-400"
        style={{ height: CARD_HEIGHT }}
      >
        <div
          className="relative bg-gray-700"
          style={{ height: THUMB_HEIGHT, minHeight: THUMB_HEIGHT, maxHeight: THUMB_HEIGHT }}
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-80"
            style={{ height: THUMB_HEIGHT, minHeight: THUMB_HEIGHT, maxHeight: THUMB_HEIGHT }}
          />
          <div className="absolute inset-0 pointer-events-none group-hover:bg-black/10 transition-colors duration-200" />
          <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-0.5 rounded text-xs text-gray-100 font-semibold shadow-md">
            {video.duration}
          </div>
        </div>
        <div className="flex gap-3 p-4 flex-1 min-h-0">
          <img
            src={video.owner?.avatar || 'https://via.placeholder.com/40'}
            alt={video.owner?.username}
            className="w-10 h-10 rounded-full border-2 border-gray-700 object-cover shadow-sm flex-shrink-0"
          />
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h3 className="font-semibold text-base text-gray-100 line-clamp-2 truncate transition-colors duration-200 group-hover:text-purple-400" title={video.title}>
              {video.title}
            </h3>
            <p className="text-sm text-gray-300 mt-1 truncate" title={video.owner?.username}>{video.owner?.username}</p>
            <p className="text-xs text-gray-400 mt-0.5 truncate">
              {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard; 