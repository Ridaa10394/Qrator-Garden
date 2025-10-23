// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import { logIn, getCurrentUser } from '@/apiCalls/authCalls'; // Import your login and session check
import axios from 'axios';

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
        // On mount, try to confirm existing session by calling the backend.
        // This should return the current user if the cookie is present and valid.
        const checkSession = async () => {
            try {
                const res = await getCurrentUser();
                if (res && res.user) {
                    setUser(res.user);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } catch (err) {
                // Not authenticated
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkSession();
    }, []);


    const login = async (credentials) => {
        try {
            setIsLoading(true);
            const response = await logIn(credentials);

            // If server exposed a token in the response (EXPOSE_TOKEN=true), use it as a fallback
            if (response && response.token) {
                // Store token in memory and set default Authorization header for axios
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
            }

            // If server returned user, set authenticated state
            if (response && response.user) {
                setIsAuthenticated(true);
                setUser(response.user);
            } else {
                // If no explicit user returned but a token is present, consider authenticated
                if (response && response.token) {
                    setIsAuthenticated(true);
                }
            }

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