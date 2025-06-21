import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

const videoService = {
  getAllVideos: async (params = {}) => {
    try {
      const response = await axios.get(`${API_URL}/videos`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }
  },

  getVideoById: async (videoId) => {
    try {
      const response = await axios.get(`${API_URL}/videos/${videoId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching video:', error);
      throw error;
    }
  },

  publishVideo: async (videoData) => {
    try {
      const response = await axios.post(`${API_URL}/videos`, videoData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error publishing video:', error);
      throw error;
    }
  },

  updateVideo: async (videoId, videoData) => {
    try {
      const response = await axios.patch(`${API_URL}/videos/${videoId}`, videoData);
      return response.data;
    } catch (error) {
      console.error('Error updating video:', error);
      throw error;
    }
  },

  deleteVideo: async (videoId) => {
    try {
      const response = await axios.delete(`${API_URL}/videos/${videoId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting video:', error);
      throw error;
    }
  },

  togglePublishStatus: async (videoId) => {
    try {
      const response = await axios.patch(`${API_URL}/videos/toggle/publish/${videoId}`);
      return response.data;
    } catch (error) {
      console.error('Error toggling publish status:', error);
      throw error;
    }
  },

  updateView: async (videoId) => {
    try {
      const response = await axios.patch(`${API_URL}/videos/view/${videoId}`);
      return response.data;
    } catch (error) {
      console.error('Error updating view:', error);
      throw error;
    }
  },

  getAllVideosByOption: async (params = {}) => {
    try {
      const response = await axios.get(`${API_URL}/videos/all/option`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching videos by option:', error);
      throw error;
    }
  },

  likeVideo: async (videoId) => {
    try {
      const response = await axios.post(`${API_URL}/videos/${videoId}/like`);
      return response.data;
    } catch (error) {
      console.error('Error liking video:', error);
      throw error;
    }
  },

  unlikeVideo: async (videoId) => {
    try {
      const response = await axios.delete(`${API_URL}/videos/${videoId}/like`);
      return response.data;
    } catch (error) {
      console.error('Error unliking video:', error);
      throw error;
    }
  },

  addComment: async (videoId, comment) => {
    try {
      const response = await axios.post(`${API_URL}/videos/${videoId}/comments`, { content: comment });
      return response.data;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  },

  getComments: async (videoId) => {
    try {
      const response = await axios.get(`${API_URL}/videos/${videoId}/comments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  },

  deleteComment: async (videoId, commentId) => {
    try {
      const response = await axios.delete(`${API_URL}/videos/${videoId}/comments/${commentId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }
};

export default videoService; 