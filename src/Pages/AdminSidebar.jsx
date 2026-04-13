import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUsers, FaBoxOpen, FaCog } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-5">
      <p className="text-2xl font-semibold mb-5 text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-violet-400">Admin Panel</p>
      <nav>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-700 transition ${isActive ? "bg-gray-700" : ""}`
              }
            >
              <FaHome /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-700 transition ${isActive ? "bg-gray-700" : ""}`
              }
            >
              <FaUsers /> Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-700 transition ${isActive ? "bg-gray-700" : ""}`
              }
            >
              <FaBoxOpen /> Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/services"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-700 transition ${isActive ? "bg-gray-700" : ""}`
              }
            >
              <FaCog /> Services
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
