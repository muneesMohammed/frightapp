// src/utils/axios.js
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your API base URL
});

// Add an interceptor to handle expired sessions
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Redirect to session expired page on 401 error
      window.location.href = '/session-expired';
    }
    return Promise.reject(error);
  }
);

export default api;
