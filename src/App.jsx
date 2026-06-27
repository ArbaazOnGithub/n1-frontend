// src/App.js
import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import ProtectedRoute from "./Components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Components/AuthContext"; // Import AuthProvider
import config from "@/config";
import "./App.css";
import "./dark-theme.css";

// Lazy Loaded Components
const Home = lazy(() => import("./Components/Home"));
const Login = lazy(() => import("./Components/Authorization/Login"));
const SignUp = lazy(() => import("./Components/Authorization/SignUp"));
// const DashboardSummary = lazy(() => import("./Components/ui/Admin/Dashboard/DashboardSummary"));
// const AdminLayout = lazy(() => import("./Components/ui/AdminLayout"));
import DashboardSummary from "./Components/ui/Admin/Dashboard/DashboardSummary";
import AdminLayout from "./Components/ui/AdminLayout";
const Orders = lazy(() => import("./Components/ui/Admin/Orders/RecentOrdersTable"));
const Users = lazy(() => import("./Components/ui/Admin/Users/Users"));
const Services = lazy(() => import("./Components/ui/Admin/Services/Services"));
const AdminReviews = lazy(() => import("./Components/ui/Admin/Reviews/Reviews"));
const AdminInquiries = lazy(() => import("./Components/ui/Admin/ContactMessages/ContactMessages"));
const CustomerDashboard = lazy(() => import("./Pages/CustomerDashboard"));
const ServiceDetailPage = lazy(() => import("./Pages/ServiceDetailPage"));
const NotFoundPage = lazy(() => import("./Pages/NotFoundPage"));
const AdminChatPanel = lazy(() => import("./Components/ui/Admin/Chat/AdminChatPanel"));

const SpinnerFallback = () => (
  <div className="flex justify-center items-center h-screen w-full">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  // Silent backend pre-warmer: fires once on page load to start waking up the
  // Render free-tier JVM in the background. No UI impact whatsoever.
  useEffect(() => {
    fetch(`${config.apiUrl}/`, { method: "GET" }).catch(() => {
      // Intentionally swallow errors — this is a best-effort warm-up ping only.
    });
  }, []);

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
            <Route path="/login" element={<><Home /><Login /></>} />
            <Route path="/register" element={<><Home /><SignUp /></>} />
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
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="contact-messages" element={<AdminInquiries />} />
              <Route path="chat" element={<AdminChatPanel />} />
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