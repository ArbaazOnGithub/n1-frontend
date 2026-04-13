// src/components/LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import useAuth as a named export

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Destructure logout from useAuth

  const handleLogout = () => {
    logout(); // Clear the user's session
    navigate('/'); // Navigate to the home page
  };

  return (
    <button  className="rounded text-md shadow-md bg-red-500 text-white font-semibold px-3 py-2 hover:opacity-80 transition"
    onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;