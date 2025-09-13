import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api'; // We use our api messenger
import { useNavigate } from 'react-router-dom';

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // To handle initial auth check
    const navigate = useNavigate();

    // This effect runs once when the app starts
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            // If a token exists, we try to fetch the user's profile
            api.get('/users/profile')
                .then(response => {
                    // If successful, we set the user in our state
                    setUser(response.data.data);
                })
                .catch(() => {
                    // If the token is invalid, we clear it
                    localStorage.removeItem('accessToken');
                    setUser(null);
                })
                .finally(() => setLoading(false)); // Auth check is complete
        } else {
            setLoading(false); // No token, auth check is complete
        }
    }, []);

    // --- Core Authentication Functions ---

    const signup = async (userData) => {
        try {
            // Use our api service to send signup request
            return await api.post('/users/signup', userData);
        } catch (error) {
            console.error("Signup failed:", error.response?.data);
            throw error;
        }
    };

    const login = async (credentials) => {
        try {
            const response = await api.post('/users/login', credentials);
            const { accessToken, user: userData } = response.data.data;
            
            // Save token to local storage
            localStorage.setItem('accessToken', accessToken);
            // Set user data in our state
            setUser(userData);
            
            // Redirect the user based on their profile status
            if (userData.profileId) {
                navigate('/profile'); // User has a profile, go to their dashboard/profile
            } else {
                navigate('/register'); // New user, send them to the UserTypeSelection page
            }
        } catch (error) {
            console.error("Login failed:", error.response?.data);
            throw error;
        }
    };

    const logout = () => {
        // Here you would also call your backend's /logout endpoint
        localStorage.removeItem('accessToken');
        setUser(null);
        navigate('/login');
    };

    // The value provided to all consuming components
    const value = { user, loading, signup, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// 3. Create a custom hook for easy access
export const useAuth = () => {
    return useContext(AuthContext);
};