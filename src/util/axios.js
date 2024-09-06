import axios from 'axios';

const instance = axios.create({
    baseURL: `http://localhost:8080`,
    withCredentials: true
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      //console.log(token);
    }
    return config;
  },  error => {
    if (error.response && error.response.status === 404) {
        // Redirect or show a specific message for 404 errors
        alert('IP Address not found.');
    }
    return Promise.reject(error);
});

export default instance;