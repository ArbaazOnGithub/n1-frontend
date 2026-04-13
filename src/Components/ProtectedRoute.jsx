import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
    const user = JSON.parse(localStorage.getItem("user"));

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