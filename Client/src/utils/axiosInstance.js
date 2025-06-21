// src/utils/axiosInstance.js
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/v1',  // base URL of your backend
  withCredentials: true, // allows sending cookies with requests
});

// Request Interceptor – attaches Authorization token
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
