import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Create axios instance with default config
const authAxios = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 seconds timeout
});

// Add interceptor for auth token
authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Enhanced error handling function
const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    throw new Error(error.response.data?.message || 
                  error.response.data?.error || 
                  'Request failed with status code ' + error.response.status);
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error('No response received from server. Please check your network connection.');
  } else {
    // Something happened in setting up the request that triggered an Error
    throw new Error('Error setting up request: ' + error.message);
  }
};

// Register user
const register = async (userData) => {
  try {
    const response = await authAxios.post('/register', userData);
    if (response.data?.token) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Login user
const login = async (userData) => {
  try {
    const response = await authAxios.post('/login', userData);
    if (response.data?.token) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Send OTP for password reset
const sendOTP = async (email) => {
  try {
    const response = await authAxios.post('/send-otp', { email });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Verify OTP
const verifyOTP = async (email, otp) => {
  try {
    const response = await authAxios.post('/verify-otp', { email, otp });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Reset password
const resetPassword = async (email, otp, newPassword) => {
  try {
    const response = await authAxios.post('/reset-password', {
      email,
      otp,
      newPassword
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  // Optional: Make a call to invalidate the token on the server
  // return authAxios.post('/logout');
};

// Get current user
const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

const authService = {
  register,
  login,
  logout,
  sendOTP,
  verifyOTP,
  resetPassword,
  getCurrentUser,
};

export default authService;