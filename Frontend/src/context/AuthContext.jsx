// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import { logIn } from '@/apiCalls/authCalls'; // Import your login function

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // State to track if the user is authenticated (token/cookie check)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    // State to handle initial loading (checking cookies/token on mount)
    const [isLoading, setIsLoading] = useState(true);
    
    // State to store user data if needed
    const [user, setUser] = useState(null);

    // 💡 NOTE: In a real app with HTTP-only cookies (as implied by withCredentials: true), 
    // we would check the backend/cookie here in useEffect to confirm auth status.
    // For this example, we start authenticated after a successful login API call.
    useEffect(() => {
        // Assume initial check is fast or done by the backend on first load.
        // If a cookie exists and is valid, the user is authenticated.
        // Since we can't check the cookie, we default to false and set to true on successful login.
        setIsLoading(false); 
    }, []);


    const login = async (credentials) => {
        try {
            setIsLoading(true);
            const response = await logIn(credentials);
            
            // Assuming successful response means the backend set the cookie and authorized the user.
            setIsAuthenticated(true);
            setUser(response.user); // Store user details if provided by the backend
            
            return response;
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
            throw error; // Propagate error for UI feedback
        } finally {
            setIsLoading(false);
        }
    };
    
    const logout = () => {
        // You would typically call a backend logout API here to clear the cookie.
        // For now, we clear the local state:
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};