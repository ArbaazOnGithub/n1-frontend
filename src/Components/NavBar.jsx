import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from '../assets/Img/Logo.png';
import { toast } from "react-toastify";
import  AuthContext  from "./AuthContext"; // Import AuthContext
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
                onClick={() => scrollToSection("contact")}
                className="block text-gray-700 hover:text-blue-900 font-medium px-4 py-2"
              >
                Contacts
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;



















// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Logo from '../assets/Img/Logo.png';
// import AuthModal from "./Authorization/AuthModal";
// import { toast, ToastContainer } from "react-toastify";
// import { jwtDecode } from "jwt-decode"; // Import jwt-decode
// import config from "@/config";

// const NavBar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Default to false
//   const [loading, setLoading] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         const currentTime = Date.now() / 1000;
//         if (decodedToken.exp < currentTime) {
//           // Token is expired
//           localStorage.removeItem("token");
//           localStorage.removeItem("isLoggedIn");
//           localStorage.removeItem("user");
//           setIsLoggedIn(false);
//         } else {
//           setIsLoggedIn(true);
//           setUser(JSON.parse(localStorage.getItem("user")));
//         }
//       } catch (error) {
//         console.error("Error decoding token:", error);
//         localStorage.removeItem("token");
//         localStorage.removeItem("isLoggedIn");
//         localStorage.removeItem("user");
//         setIsLoggedIn(false);
//       }
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("user"); // Clear user data
//     setIsLoggedIn(false);
//     setUser(null);
//     navigate("/");
//   };

//   const toggleMenu = () => setIsOpen(!isOpen);

//   const scrollToSection = (sectionId) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       window.scrollTo({ top: section.offsetTop - 70, behavior: "smooth" });
//     }
//   };

//   const openLoginModal = () => {
//     navigate("/login"); // Navigate to /login route
//   };

//   const openSignupModal = () => {
//     navigate("/register"); // Navigate to /register route
//   };

//   const closeModal = () => {
//     navigate("/"); // Navigate back to home when modal is closed
//   };

//   const isAdminDashboard = location.pathname.startsWith("/admin");

//   const handleToggleDashboard = () => {
//     if (isAdminDashboard) {
//       navigate("/"); // Redirect to normal user side
//     } else {
//       navigate("/admin"); // Redirect to admin side
//     }
//   };

//   const handleToggleForm = () => {
//     navigate(isLogin ? "/register" : "/login"); // Toggle between /login and /register
//   };

//   // Handle Sign In
//   const handleSignIn = async (credentials) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${config.apiUrl}/api/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(credentials),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//       }

//       const data = await response.json();
//       const decodedToken = jwtDecode(data.jwt); // Decode the JWT token
//       const user = {
//         email: decodedToken.sub,
//         name: data.name, // Assuming the backend returns the user's name in the response
//         role: decodedToken.role, // Extract role from the token
//       };

//       // Store the token and user data in local storage
//       localStorage.setItem("token", data.jwt); // Store the JWT token
//       localStorage.setItem("isLoggedIn", "true");
//       localStorage.setItem("user", JSON.stringify(user)); // Save user data

//       setIsLoggedIn(true);
//       setUser(user);
//       closeModal();
//       toast.success("Login successful");

//       // Redirect based on role
//       if (user.role === "ROLE_ADMIN") {
//         navigate("/admin"); // Redirect to admin dashboard
//       } else {
//         navigate("/"); // Redirect to user dashboard
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       toast.error(`An error occurred during login: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle Sign Up
//   const handleSignUp = async (userData) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${config.apiUrl}/api/users/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json(); // Parse the JSON error response
//         throw new Error(errorData.message); // Extract the "message" field
//       }

//       const data = await response.json();
//       const decodedToken = jwtDecode(data.jwt); // Decode the JWT token
//       const user = {
//         email: decodedToken.sub,
//         name: data.name, // Assuming the backend returns the user's name in the response
//         role: decodedToken.role, // Extract role from the token
//       };

//       // Store the token and user data in local storage
//       localStorage.setItem("token", data.jwt); // Store the JWT token
//       localStorage.setItem("isLoggedIn", "true");
//       localStorage.setItem("user", JSON.stringify(user)); // Save user data

//       setIsLoggedIn(true);
//       setUser(user);
//       toast.success("Registration successful");

//       // Navigate back to the login form
//       navigate("/login");
//     } catch (error) {
//       console.error("Error during registration:", error);
//       toast.error(error.message); // Display the error message in a toast
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <nav className="bg-white rounded-xl shadow-md fixed w-full top-0 z-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:p-3">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex-shrink-0 select-none">
//               <img src={Logo} className="h-15 w-15" alt="Logo" />
//             </div>

//             {!isAdminDashboard && (
//               <div className="hidden sm:flex space-x-10">
//                 <button onClick={() => scrollToSection("services")} className="text-gray-700 hover:text-blue-900 font-medium px-4 py-2">
//                   Services
//                 </button>
//                 <button onClick={() => scrollToSection("apply")} className="text-gray-700 hover:text-blue-900 font-medium px-4 py-2">
//                   How To Apply?
//                 </button>
//                 <button onClick={() => scrollToSection("contact")} className="text-gray-700 hover:text-blue-900 font-medium px-4 py-2">
//                   Contacts
//                 </button>
//               </div>
//             )}

//             {isAdminDashboard && (
//               <div className="hidden sm:flex space-x-10">
//                 <h1 className="text-gray-700 font-medium px-4 py-2">Welcome Admin {user?.email}</h1> {/* Display user's name */}
//               </div>
//             )}

//             <div className="hidden sm:flex space-x-4">
//               {isLoggedIn && (
//                 <button
//                   className="rounded text-md shadow-md bg-green-500 text-white font-semibold px-3 py-2 hover:opacity-80 transition"
//                   onClick={handleToggleDashboard}
//                 >
//                   {isAdminDashboard ? "Normal User Side" : "Admin Dashboard"}
//                 </button>
//               )}
//               {isLoggedIn ? (
//                 <button
//                   className="rounded text-md shadow-md bg-red-500 text-white font-semibold px-3 py-2 hover:opacity-80 transition"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </button>
//               ) : (
//                 !isAdminDashboard && (
//                   <>
//                     <button
//                       className="rounded text-md shadow-md bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-3 py-2  hover:opacity-80 transition"
//                       onClick={openLoginModal}
//                     >
//                       Login
//                     </button>
//                     <button
//                       className="rounded text-md shadow-md bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold px-3 py-2 hover:opacity-80 transition"
//                       onClick={openSignupModal}
//                     >
//                       Register
//                     </button>
//                   </>
//                 )
//               )}
//             </div>

//             <div className="sm:hidden">
//               <button
//                 onClick={toggleMenu}
//                 className="text-gray-700 hover:text-blue-900 focus:outline-none"
//               >
//                 {isOpen ? "✖" : "☰"}
//               </button>
//             </div>
//           </div>

//           {isOpen && !isAdminDashboard && (
//             <div className="sm:hidden">
//               <button onClick={() => scrollToSection("services")} className="block text-gray-700 hover:text-blue-900 font-medium px-4 py-2">
//                 Services
//               </button>
//               <button onClick={() => scrollToSection("apply")} className="block text-gray-700 hover:text-blue-900 font-medium px-4 py-2">
//                 How To Apply?
//               </button>
//               <button onClick={() => scrollToSection("contact")} className="block text-gray-700 hover:text-blue-900 font-medium px-4 py-2">
//                 Contacts
//               </button>
//             </div>
//           )}
//         </div>
//       </nav>
//     </>
//   );
// };

// export default NavBar;