import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Enable sending cookies
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accesstoken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response);
    return response;
  },
  async (error) => {
    console.error('API Error:', error.response || error);
    
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      const refreshtoken = localStorage.getItem('refreshtoken');
      if (refreshtoken) {
        try {
          const response = await api.post('/auth/refresh-token', { refreshtoken });
          const { accesstoken } = response.data;
          localStorage.setItem('accesstoken', accesstoken);
          
          // Retry the original request
          error.config.headers.Authorization = `Bearer ${accesstoken}`;
          return api(error.config);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          localStorage.removeItem('accesstoken');
          localStorage.removeItem('refreshtoken');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: async (userData) => {
    try {
      const formData = new FormData();
      Object.keys(userData).forEach(key => {
        if (key === 'profileImage' || key === 'coverImage') {
          if (userData[key]) {
            formData.append(key, userData[key]);
          }
        } else {
          formData.append(key, userData[key]);
        }
      });
      
      const response = await api.post('/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      console.log('Sending login request with:', credentials);
      const response = await api.post('/users/login', credentials);
      console.log('Login response received:', response);
      
      // Check if response has the expected structure
      if (!response?.data?.data?.accessToken) {
        throw new Error('Invalid response structure from server');
      }
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      // If the error is from the server, pass it through
      if (error.response?.data) {
        throw error;
      }
      // Otherwise, wrap it in a more descriptive error
      throw new Error(error.message || 'Failed to login');
    }
  },

  logout: async () => {
    try {
      const response = await api.post('/users/logout');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return response;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  refreshToken: async (refreshToken) => {
    try {
      const response = await api.post('/auth/refresh-token', { refreshToken });
      return response;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  }
};

export const userAPI = {
  getCurrentUser: async () => {
    try {
      const response = await api.get('/users/me');
      return response;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await api.patch('/users/me', userData);
      return response;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },

  updateAvatar: async (avatarFile) => {
    try {
      const formData = new FormData();
      formData.append('avatar', avatarFile);
      const response = await api.patch('/users/me/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      console.error('Update avatar error:', error);
      throw error;
    }
  },

  updateCoverImage: async (coverFile) => {
    try {
      const formData = new FormData();
      formData.append('coverImage', coverFile);
      const response = await api.patch('/users/me/cover', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      console.error('Update cover image error:', error);
      throw error;
    }
  }
};

export default api; 