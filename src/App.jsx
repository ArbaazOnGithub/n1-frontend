// src/App.js
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import ProtectedRoute from "./Components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Components/AuthContext"; // Import AuthProvider
import "./App.css";

// Lazy Loaded Components
const Home = lazy(() => import("./Components/Home"));
const Login = lazy(() => import("./Components/Authorization/Login"));
const SignUp = lazy(() => import("./Components/Authorization/SignUp"));
const DashboardSummary = lazy(() => import("./Components/ui/Admin/Dashboard/DashboardSummary"));
const Orders = lazy(() => import("./Components/ui/Admin/Orders/RecentOrdersTable"));
const Users = lazy(() => import("./Components/ui/Admin/Users/Users"));
const Services = lazy(() => import("./Components/ui/Admin/Services/Services"));
const AdminLayout = lazy(() => import("./Components/ui/AdminLayout"));
const CustomerDashboard = lazy(() => import("./Pages/CustomerDashboard"));
const ServiceDetailPage = lazy(() => import("./Pages/ServiceDetailPage"));
const NotFoundPage = lazy(() => import("./Pages/NotFoundPage"));

const SpinnerFallback = () => (
  <div className="flex justify-center items-center h-screen w-full">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="z-70">
          <ToastContainer />
        </div>
        <NavBar />
        <Suspense fallback={<SpinnerFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
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
            {/* 404 Catch-All Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;