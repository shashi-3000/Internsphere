import axios from 'axios';

// Create a pre-configured instance of axios
const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1', // The base URL for  backend
});


// An "interceptor" is a function that runs before every request is sent.
api.interceptors.request.use(
    (config) => {
        // 1. Get the token from localStorage
        const token = localStorage.getItem('accessToken');
        
        // 2. If the token exists, add it to the Authorization header
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        // 3. Send the request on its way
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
