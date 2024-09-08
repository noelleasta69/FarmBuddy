import axios from 'axios';

// Create an instance of axios with default options
const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // or your backend URL
  withCredentials: true // Ensure that cookies are sent with requests
});

export default apiClient;