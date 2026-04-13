// src/components/ui/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex mt-20 h-screen bg-gray-100 dark:bg-gray-900 ">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto p-4">
        <Outlet /> {/* This will render the nested routes */}
      </div>
    </div>
  );
};

export default AdminLayout;