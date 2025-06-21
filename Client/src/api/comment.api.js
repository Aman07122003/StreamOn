import axios from 'axios';

const API_BASE = '/api/v1/comment';

export const getComments = (videoId) => {
  return axios.get(`${API_BASE}/get/${videoId}`);
};

export const addComment = (videoId, content, token) => {
  return axios.post(
    `${API_BASE}/add/${videoId}`,
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const updateComment = (commentId, content, token) => {
  return axios.patch(
    `${API_BASE}/${commentId}`,
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const deleteComment = (commentId, token) => {
  return axios.delete(`${API_BASE}/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
