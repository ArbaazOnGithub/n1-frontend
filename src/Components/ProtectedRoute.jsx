import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
    let user = null;
    try {
        const storedUser = localStorage.getItem("user");
        user = storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
        console.error("Error parsing user from localStorage:", e);
        localStorage.removeItem("user");
    }

    // If no user is logged in, redirect to home
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // If a specific role is required but doesn't match and the user isn't an admin
    if (role && user.role !== role && user.role !== "ROLE_ADMIN") {
        return <Navigate to="/" replace />; 
    }

    return children;
};

export default ProtectedRoute;