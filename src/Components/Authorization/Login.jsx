// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import config from "@/config";
// import { jwtDecode } from "jwt-decode";
// import { AuthContext } from "../AuthContext";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch(`${config.apiUrl}/api/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//       }

//       const data = await response.json();
//       const decodedToken = jwtDecode(data.jwt);
//       const user = {
//         email: decodedToken.sub,
//         role: decodedToken.role,
//       };

//       login(data.jwt, user);
//       toast.success("Login successful");

//       if (user.role === "ROLE_ADMIN") {
//         navigate("/admin");
//       } else {
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       toast.error(`An error occurred during login: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="select-none fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
//       <div className="relative w-full sm:max-w-md bg-white rounded-lg shadow-lg dark:border dark:bg-gray-800 dark:border-gray-700 p-6">
//         <button
//           className="absolute rounded top-3 right-3 text-green-700 hover:text-red-500 bg-gray-100 hover:bg-red-200 w-10 h-10 flex items-center justify-center shadow-xl hover:shadow-2xl shadow-red-300 transition-all"
//           onClick={() => navigate("/")}
//         >
//           ✖
//         </button>
//         <h1 className="text-xl font-bold text-gray-900 dark:text-white text-center">
//           Sign in to your account
//         </h1>

//         <form className="space-y-4 mt-0" onSubmit={handleSubmit}>
//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
//               Your email
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
//               placeholder="name@company.com"
//               required
//             />
//           </div>
//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
//               placeholder="••••••••"
//               required
//             />
//           </div>
//           <div className="text-center">
//             <button
//               type="submit"
//               className="w-30 rounded text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-3 py-2.5"
//               disabled={loading}
//             >
//               {loading ? "Signing in..." : "Sign in"}
//             </button>
//           </div>
//         </form>

//         <p className="text-sm text-center text-gray-500 dark:text-gray-400">
//           Don’t have an account yet?{" "}
//           <button
//             type="button"
//             className="font-medium text-blue-600 hover:underline"
//             onClick={() => navigate("/register")}
//           >
//             Sign up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import config from "@/config";
import { jwtDecode } from "jwt-decode";
import  AuthContext  from "../AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${config.apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }

      const data = await response.json();
      const decodedToken = jwtDecode(data.jwt);
      const user = {
        email: decodedToken.sub,
        role: decodedToken.role,
      };

      // Store user data in localStorage
      localStorage.setItem("userEmail", data.email);
      
      login(data.jwt, user);
      toast.success("Login successful");

      if (user.role === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(`An error occurred during login: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="select-none fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <div className="relative w-full sm:max-w-md bg-white rounded-lg shadow-lg dark:border dark:bg-gray-800 dark:border-gray-700 p-6">
        <button
          className="absolute rounded top-3 right-3 text-green-700 hover:text-red-500 bg-gray-100 hover:bg-red-200 w-10 h-10 flex items-center justify-center shadow-xl hover:shadow-2xl shadow-red-300 transition-all"
          onClick={() => navigate("/")}
        >
          ✖
        </button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white text-center">
          Sign in to your account
        </h1>

        <form className="space-y-4 mt-0" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-30 rounded text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-3 py-2.5"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          Don't have an account yet?{" "}
          <button
            type="button"
            className="font-medium text-blue-600 hover:underline"
            onClick={() => navigate("/register")}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
