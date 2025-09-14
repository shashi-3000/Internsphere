
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import api from '../services/api';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [profile, setProfile] = useState(null);
//     const [hasProfile, setHasProfile] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     const fetchProfile = async () => {
//         try {
//             console.log('🧠 AuthContext: Fetching profile from API...');
//             const response = await api.get('/users/profile');
//             console.log('✅ AuthContext: API returned profile data:', response.data.data);
            
//             // FIXED: Properly destructure the API response
//             const { user: userData, profile: profileData, hasProfile: hasProfileFlag } = response.data.data;
            
//             setUser(userData);
//             setProfile(profileData);
//             setHasProfile(hasProfileFlag);
            
//             console.log('📊 AuthContext: Set user:', userData);
//             console.log('📊 AuthContext: Set profile:', profileData);
//             console.log('📊 AuthContext: Has profile:', hasProfileFlag);
            
//         } catch (error) {
//             console.error('❌ AuthContext: Failed to fetch profile.', error);
//             localStorage.removeItem('accessToken');
//             setUser(null);
//             setProfile(null);
//             setHasProfile(false);
//         }
//     };

//     useEffect(() => {
//         const token = localStorage.getItem('accessToken');
//         if (token) {
//             fetchProfile().finally(() => setLoading(false));
//         } else {
//             setLoading(false);
//         }
//     }, []);

//     const signup = async (userData) => {
//         return await api.post('/users/signup', userData);
//     };

//     const login = async (credentials) => {
//         const response = await api.post('/users/login', credentials);
//         const { accessToken, user: userData } = response.data.data;
//         localStorage.setItem('accessToken', accessToken);
//         setUser(userData);
        
//         // After login, fetch the complete profile
//         setTimeout(() => {
//             fetchProfile();
//         }, 100);
        
//         // Navigate based on whether user has completed their profile
//         if (userData.userType && userData.profileId) {
//             navigate('/profile');
//         } else {
//             navigate('/register');
//         }
//     };

//     const logout = async () => {
//         try {
//             // Call the logout API to clear refresh token
//             await api.post('/users/logout');
//         } catch (error) {
//             console.error('Logout API error:', error);
//         }
        
//         localStorage.removeItem('accessToken');
//         setUser(null);
//         setProfile(null);
//         setHasProfile(false);
//         navigate('/login');
//     };

//     const refreshUser = async () => {
//         console.log('🔄 AuthContext: refreshUser function called.');
//         await fetchProfile();
//     };

//     // FIXED: Provide all the necessary values to components
//     const value = { 
//         user, 
//         profile, 
//         hasProfile, 
//         loading, 
//         signup, 
//         login, 
//         logout, 
//         refreshUser 
//     };

//     return (
//         <AuthContext.Provider value={value}>
//             {!loading && children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     return useContext(AuthContext);
// };

import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [hasProfile, setHasProfile] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchProfile = async () => {
        try {
            console.log('🧠 AuthContext: Fetching profile from API...');
            const response = await api.get('/users/profile');
            console.log('✅ AuthContext: API returned profile data:', response.data.data);
            
            // FIXED: Properly destructure the API response
            const { user: userData, profile: profileData, hasProfile: hasProfileFlag } = response.data.data;
            
            setUser(userData);
            setProfile(profileData);
            setHasProfile(hasProfileFlag);
            
            console.log('📊 AuthContext: Set user:', userData);
            console.log('📊 AuthContext: Set profile:', profileData);
            console.log('📊 AuthContext: Has profile:', hasProfileFlag);
            
        } catch (error) {
            console.error('❌ AuthContext: Failed to fetch profile.', error);
            localStorage.removeItem('accessToken');
            setUser(null);
            setProfile(null);
            setHasProfile(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            fetchProfile().finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const signup = async (userData) => {
        return await api.post('/users/signup', userData);
    };

    const login = async (credentials) => {
        const response = await api.post('/users/login', credentials);
        const { accessToken, user: userData } = response.data.data;
        localStorage.setItem('accessToken', accessToken);
        setUser(userData);
        
        // After login, fetch the complete profile
        setTimeout(() => {
            fetchProfile();
        }, 100);
        
        // Always redirect to home page after login
        navigate('/');
    };

    const logout = async () => {
        try {
            // Call the logout API to clear refresh token
            await api.post('/users/logout');
        } catch (error) {
            console.error('Logout API error:', error);
        }
        
        localStorage.removeItem('accessToken');
        setUser(null);
        setProfile(null);
        setHasProfile(false);
        navigate('/login');
    };

    const refreshUser = async () => {
        console.log('🔄 AuthContext: refreshUser function called.');
        await fetchProfile();
    };

    // FIXED: Provide all the necessary values to components
    const value = { 
        user, 
        profile, 
        hasProfile, 
        loading, 
        signup, 
        login, 
        logout, 
        refreshUser 
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};