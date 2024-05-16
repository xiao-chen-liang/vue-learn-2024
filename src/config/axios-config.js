// src/axios-config.js
import axios from 'axios';

// Create an Axios instance
// const instance = axios.create({
//   baseURL: 'https://api.example.com', // Your API base URL
// });

const instance = axios.create();

// Add a request interceptor
instance.interceptors.request.use(
  config => {
    // Get the token from localStorage
    const token = localStorage.getItem('userToken');
    if (token) {
      // If the token exists, add it to the headers
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response && error.response.status === 401) {
        console.log(error.response.data.token)
        alert(error.response.data.token)
        // this.$message.error(error.response.data.token)
      // Handle token expiration, e.g., redirect to login page
      localStorage.removeItem('userToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export default instance;
