import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from '../assets/Img/Logo.png';
import { toast } from "react-toastify";
import AuthContext from "./AuthContext"; // Import AuthContext
import config from "@/config";
import LogoutButton from "./Authorization/LogoutButton";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, user, login, logout } = useContext(AuthContext); // Use AuthContext
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({ top: section.offsetTop - 70, behavior: "smooth" });
    }
  };


  const openLoginModal = () => {
    navigate("/login"); // Navigate to /login route
  };

  const openSignupModal = () => {
    navigate("/register"); // Navigate to /register route
  };

  const isAdminDashboard = location.pathname.startsWith("/admin");

  const handleToggleDashboard = () => {
    if (isAdminDashboard) {
      navigate("/"); // Redirect to normal user side
    } else {
      navigate("/admin"); // Redirect to admin side
    }
  };



  return (
    <>
      <nav className="bg-white rounded-xl shadow-md fixed w-full top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:p-3">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 select-none">
              <img src={Logo} className="h-15 w-15" alt="Logo" />
            </div>

            {/* Normal User Side Links */}
            {!isAdminDashboard && (
              <div className="hidden sm:flex items-center space-x-10">
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-slate-600 hover:text-blue-600 font-medium px-4 py-2 transition-colors"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection("apply")}
                  className="text-slate-600 hover:text-blue-600 font-medium px-4 py-2 transition-colors"
                >
                  Process
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-slate-600 hover:text-blue-600 font-medium px-4 py-2 transition-colors"
                >
                  Contact
                </button>
                {isLoggedIn && (
                  <button
                    onClick={() => navigate("/my-orders")}
                    className="text-slate-600 hover:text-blue-600 font-medium px-4 py-2 transition-colors border-l border-slate-200"
                  >
                    My Orders
                  </button>
                )}
              </div>
            )}

            {/* Admin Dashboard Welcome Message */}
            {isAdminDashboard && (
              <div className="hidden sm:flex space-x-10">
                <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                    Welcome&nbsp;
                  </span>
                  {user?.email}
                </h1>

              </div>
            )}

            {/* Login/Logout Buttons */}
            <div className="hidden sm:flex space-x-4">
              {isLoggedIn && user?.role === "ROLE_ADMIN" && (
                <button
                  className="rounded text-md shadow-md bg-green-500 text-white font-semibold px-3 py-2 hover:opacity-80 transition"
                  onClick={handleToggleDashboard}
                >
                  {isAdminDashboard ? "Normal User Side" : "Admin Dashboard"}
                </button>

              )}
              {isLoggedIn ? (
                <LogoutButton />

              ) : (
                !isAdminDashboard && (
                  <>
                    <button
                      className="rounded text-md shadow-md bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-3 py-2 hover:opacity-80 transition"
                      onClick={openLoginModal}
                    >
                      Login
                    </button>
                    <button
                      className="rounded text-md shadow-md bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold px-3 py-2 hover:opacity-80 transition"
                      onClick={openSignupModal}
                    >
                      Register
                    </button>
                  </>
                )
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-blue-900 focus:outline-none"
              >
                {isOpen ? "✖" : "☰"}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && !isAdminDashboard && (
            <div className="sm:hidden">

              <button
                onClick={() => scrollToSection("services")}
                className="block text-gray-700 hover:text-blue-900 font-medium px-4 py-2"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("apply")}
                className="block text-gray-700 hover:text-blue-900 font-medium px-4 py-2"
              >
                How To Apply?
              </button>
              <button
                onClick={() => { toggleMenu(); scrollToSection("contact"); }}
                className="block w-full text-left text-gray-700 hover:text-blue-900 font-medium px-4 py-2"
              >
                Contacts
              </button>

              <div className="border-t border-gray-200 my-2"></div>
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => { toggleMenu(); navigate("/my-orders"); }}
                    className="block w-full text-left text-gray-700 hover:text-blue-900 font-medium px-4 py-2"
                  >
                    My Orders
                  </button>
                  <div className="px-4 py-2 flex w-full">
                    <LogoutButton />
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { toggleMenu(); openLoginModal(); }}
                    className="block w-full text-left text-gray-700 hover:text-blue-900 font-medium px-4 py-2"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => { toggleMenu(); openSignupModal(); }}
                    className="block w-full text-left text-blue-600 hover:text-blue-900 font-bold px-4 py-2"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;



