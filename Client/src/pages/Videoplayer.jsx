import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';


import {
  VideoHeader,
  VideoPlayer,
  VideoDetails,
  RelatedVideos,
  CommentSection
} from '../components/VideoPlayer';

const Videoplayer = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const videoId = searchParams.get('v');
  
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [showRelatedVideos, setShowRelatedVideos] = useState(false);

  useEffect(() => {
    if (videoId) {
      fetchVideoData();
      fetchComments();
      fetchRelatedVideos();
    }
  }, [videoId]);

  const fetchVideoData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/videos/${videoId}`);
      setVideo(response.data.data);
      setLikeCount(response.data.data.likes || 0);
      setDislikeCount(response.data.data.dislikes || 0);
    } catch (err) {
      setError('Failed to load video');
      console.error('Error fetching video:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`/comment/get/${videoId}`);
      const validComments = (response.data.comments || []).filter(c => c && c.content);
      setComments(validComments);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };
  

  const fetchRelatedVideos = async () => {
    try {
      const response = await axiosInstance.get('/videos?limit=10');
      setRelatedVideos(response.data.data || []);
    } catch (err) {
      console.error('Error fetching related videos:', err);
    }
  };

  const handleLike = async () => {
    try {
      if (isLiked) {
        await axiosInstance.delete(`/videos/${videoId}/like`);
        setLikeCount(prev => prev - 1);
        setIsLiked(false);
      } else {
        await axiosInstance.post(`/videos/${videoId}/like`);
        setLikeCount(prev => prev + 1);
        setIsLiked(true);
        if (isDisliked) {
          setDislikeCount(prev => prev - 1);
          setIsDisliked(false);
        }
      }
    } catch (err) {
      console.error('Error handling like:', err);
    }
  };

  const handleDislike = async () => {
    try {
      if (isDisliked) {
        await axiosInstance.delete(`/videos/${videoId}/dislike`);
        setDislikeCount(prev => prev - 1);
        setIsDisliked(false);
      } else {
        await axiosInstance.post(`/videos/${videoId}/dislike`);
        setDislikeCount(prev => prev + 1);
        setIsDisliked(true);
        if (isLiked) {
          setLikeCount(prev => prev - 1);
          setIsLiked(false);
        }
      }
    } catch (err) {
      console.error('Error handling dislike:', err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
  
    try {
      const response = await axiosInstance.post(`/comment/get/${videoId}`, {
        content: newComment
      });
      setComments(prev => [response.data.comment, ...prev]);
      setNewComment('');
    } catch (err) {
      console.error('Error posting comment:', err.response?.data || err.message);
    }
  };
  

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleToggleRelatedVideos = () => {
    setShowRelatedVideos(!showRelatedVideos);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Video not found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <VideoHeader />

      <div className="pt-16 mx-auto max-w-7xl">
        <div className="block lg:hidden">
          <div className="px-2 sm:px-4">
            <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-lg">
              <VideoPlayer key={video?._id || video?.videoFile} video={video} />
            </div>
            <div className="flex flex-col gap-6 py-6">
              <VideoDetails
                video={video}
                isLiked={isLiked}
                isDisliked={isDisliked}
                likeCount={likeCount}
                dislikeCount={dislikeCount}
                onLike={handleLike}
                onDislike={handleDislike}
                onShare={handleShare}
                isMobile={true}
              />
              <CommentSection 
                videoId={videoId} 
                isMobile={true}
              />
              <RelatedVideos
                relatedVideos={relatedVideos}
                currentVideoId={videoId}
                isMobile={true}
                showRelatedVideos={showRelatedVideos}
                onToggleRelatedVideos={handleToggleRelatedVideos}
              />
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:px-6 lg:py-10 gap-10">
          <div className="w-full lg:w-[70%] flex flex-col gap-8">
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-xl">
              <VideoPlayer key={video?._id || video?.videoFile} video={video} />
            </div>
            <VideoDetails
              video={video}
              isLiked={isLiked}
              isDisliked={isDisliked}
              likeCount={likeCount}
              dislikeCount={dislikeCount}
              onLike={handleLike}
              onDislike={handleDislike}
              onShare={handleShare}
            />
            <div className='w-full'><CommentSection videoId={videoId} /></div>
          </div>
          {/* Insert this here */}
          <div className="w-full lg:w-[30%] flex flex-col gap-6">
            <RelatedVideos 
              relatedVideos={relatedVideos} 
              currentVideoId={videoId} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videoplayer;