import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-8xl font-black text-blue-600 mb-4 animate-bounce">404</h1>
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Page Not Found</h2>
      <p className="text-lg text-slate-500 mb-8 max-w-lg">
        Oops! The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <button 
        onClick={() => navigate('/')}
        className="premium-button"
      >
        Return Home
      </button>
    </div>
  );
};

export default NotFoundPage;
