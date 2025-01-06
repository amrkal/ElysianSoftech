import axios from 'axios';

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/',  // Replace with your backend URL
  timeout: 5000,  // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});



// Optionally, you can add response interceptors to handle responses globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login page)
    }
    return Promise.reject(error);
  }
);