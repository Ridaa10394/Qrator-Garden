// src/components/ProtectedRoute.jsx (or defined within App.jsx as shown before)

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 

const ProtectedRoute = ({ children }) => {
    // Access the global state
    const { isAuthenticated, isLoading } = useContext(AuthContext); 
    
    // 1. Show loading while checking initial state
    if (isLoading) {
        return <div>Loading user session...</div>; 
    }

    // 2. The IF/ELSE condition:
    // If the user is NOT authenticated, redirect them to the login page.
    if (!isAuthenticated) {
        // 'replace' ensures the user can't navigate back to the private route using the browser back button
        return <Navigate to="/login" replace />; 
    }

    // 3. If authenticated (the ELSE condition), render the children (the protected page)
    return children;
};

export default ProtectedRoute;