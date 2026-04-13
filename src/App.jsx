// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Login from "./Components/Authorization/Login";
import SignUp from "./Components/Authorization/SignUp";
import DashboardSummary from "./Components/ui/Admin/Dashboard/DashboardSummary";
import Orders from "./Components/ui/Admin/Orders/RecentOrdersTable";
import Users from "./Components/ui/Admin/Users/Users";
import Services from "./Components/ui/Admin/Services/Services";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminLayout from "./Components/ui/AdminLayout";
import CustomerDashboard from "./Pages/CustomerDashboard";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Components/AuthContext"; // Import AuthProvider
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="z-70">
          <ToastContainer />
        </div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/my-orders" element={
            <ProtectedRoute role="ROLE_USER">
              <CustomerDashboard />
            </ProtectedRoute>
          } />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="ROLE_ADMIN">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* Nested routes under /admin */}
            <Route index element={<DashboardSummary />} /> {/* Default route for /admin */}
            <Route path="orders" element={<Orders />} />
            <Route path="users" element={<Users />} />
            <Route path="services" element={<Services />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;