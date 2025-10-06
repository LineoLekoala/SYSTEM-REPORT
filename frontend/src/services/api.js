// src/services/api.js
import axios from 'axios';

// Create an Axios instance with the base URL of your backend
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // change 5000 to your backend port if different
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add a request interceptor to include auth token if needed
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // assuming you store JWT token in localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
