import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";


const CommentSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const currentUser = useSelector((state) => state.auth.user);
  const [content, setContent] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const textareaRef = useRef(null);

  const fetchComments = async () => {
    if (!hasMore) return;
    
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/comment/get/${videoId}?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      
      const newComments = res.data.data || [];
      setComments(prev => page === 1 ? newComments : [...prev, ...newComments]);
      setHasMore(newComments.length === limit);
    } catch (err) {
      console.error("Failed to fetch comments", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!content.trim() || posting) return;
    
    try {
      setPosting(true);
      await axiosInstance.post(
        `/comment/add/${videoId}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setContent("");
      setPage(1); // Reset to first page to show new comment
    } catch (err) {
      console.error("Failed to post comment", err);
    } finally {
      setPosting(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    
    try {
      await axiosInstance.delete(`/comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  const handleLike = async (commentId, liked) => {
    try {
      // Optimistic UI update
      setComments(prev => prev.map(comment => {
        if (comment._id === commentId) {
          const updated = { ...comment };
          
          // Remove existing like/dislike if user changes their vote
          if (comment.userLiked === liked) {
            updated.likesCount -= liked ? 1 : 0;
            updated.disLikesCount -= liked ? 0 : 1;
            updated.userLiked = null;
          } else {
            // Add new vote
            if (liked) {
              updated.likesCount += 1;
              // Remove previous dislike if existed
              if (comment.userLiked === false) updated.disLikesCount -= 1;
            } else {
              updated.disLikesCount += 1;
              // Remove previous like if existed
              if (comment.userLiked === true) updated.likesCount -= 1;
            }
            updated.userLiked = liked;
          }
          return updated;
        }
        return comment;
      }));

      await axiosInstance.patch(
        `/like/comment/${commentId}`,
        { liked },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    } catch (err) {
      console.error("Failed to like/dislike", err);
      // Revert on error
      fetchComments();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  useEffect(() => {
    fetchComments();
  }, [page]);

  useEffect(() => {
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        150
      )}px`;
    }
  }, [content]);

  return (
    <div className="max-w-full mx-auto p-4 bg-gray-800 rounded-lg shadow-sm">
      <h3 className="text-xl font-bold mb-4 pb-2 text-bg-gray-700 border-b">Comments ({comments.length})</h3>

      {/* Add Comment */}
      <div className="flex gap-3 mb-6">
        <img 
          src={currentUser.avatar}
          alt="avatar" 
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            placeholder="Add a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-3 bg-gray-700 border border-bg-gray-700 rounded-lg resize-none"
          />
          <div className="flex justify-end mt-2">
            <button 
              onClick={handleAddComment}
              disabled={posting || !content.trim()}
              className={`px-4 py-2 rounded-full font-medium ${
                posting || !content.trim()
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {posting ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {loading && page === 1 ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : comments.length === 0 ? (
          <p className="text-center py-6 text-gray-500">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="flex items-start gap-4 p-4 bg-gray-800 rounded-xl shadow-sm group">
              {/* Avatar */}
              <img
                src={comment.owner.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-gray-600"
              />

              {/* Comment Content */}
              <div className="flex-1 space-y-2">
                {/* Header */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{comment.owner.fullName}</span>
                    <span className="text-xs text-gray-400">@{comment.owner.username}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </div>
                </div>

                {/* Body */}
                <p className="text-sm text-gray-200 leading-relaxed">{comment.content}</p>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={() => handleLike(comment._id, true)}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm transition-colors ${
                      comment.userLiked === true
                        ? "text-blue-400 bg-gray-700"
                        : "text-gray-400 hover:text-blue-400 hover:bg-gray-700"
                    }`}
                  >
                    👍 {comment.likesCount}
                  </button>

                  <button
                    onClick={() => handleLike(comment._id, false)}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm transition-colors ${
                      comment.userLiked === false
                        ? "text-blue-400 bg-gray-400"
                        : "text-gray-400 hover:text-blue-400 hover:bg-gray-700"
                    }`}
                  >
                    👎 {comment.disLikesCount}
                  </button>

                  {comment.isOwner && (
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="ml-auto text-sm text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>

          ))
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          {loading && page > 1 ? (
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
          ) : hasMore ? (
            <button
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium"
            >
              Load more comments
            </button>
          ) : comments.length > 0 ? (
            <p className="text-gray-500 text-sm">No more comments to load</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;