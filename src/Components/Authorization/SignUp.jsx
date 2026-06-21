import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import config from "@/config";
import AuthContext from "../AuthContext";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    address: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      // Strip confirmPassword — backend doesn't need it
      const { confirmPassword, ...payload } = formData;

      const response = await fetch(`${config.apiUrl}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Safely parse error — backend may return JSON or plain text
        const text = await response.text();
        let message = "Registration failed. Please try again.";
        try {
          const json = JSON.parse(text);
          message = json.message || json.error || message;
        } catch {
          // Backend returned plain text or HTML — use a friendly fallback
          if (response.status === 409 || text.toLowerCase().includes("email already exists")) {
            message = "This email is already registered. Please sign in.";
          } else if (response.status === 500) {
            message = "Server error. Please try again later.";
          }
        }
        throw new Error(message);
      }

      toast.success("Account created successfully! Please sign in.");
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const EyeToggle = ({ show, onToggle }) => (
    <button
      type="button"
      onClick={onToggle}
      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
      aria-label={show ? "Hide password" : "Show password"}
    >
      {show ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )}
    </button>
  );

  return (
    <div className="select-none fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="relative w-full sm:max-w-md bg-white/80 dark:bg-gray-900/50 backdrop-blur-xl rounded-lg shadow-2xl border border-white/20 dark:border-gray-700/50 p-6 max-h-[90vh] overflow-y-auto">
        <button
          className="absolute rounded top-3 right-3 text-green-700 hover:text-red-500 bg-gray-100 hover:bg-red-200 w-10 h-10 flex items-center justify-center shadow-xl hover:shadow-2xl shadow-red-300 transition-all"
          onClick={() => navigate("/")}
          aria-label="Close"
        >
          ✖
        </button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white text-center">
          Create an account
        </h1>

        <form className="space-y-3 mt-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label htmlFor="signup-name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Your name
            </label>
            <input
              id="signup-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="John Doe"
              required
              autoComplete="name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="signup-email" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              id="signup-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="signup-password" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <div className="relative">
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="••••••••"
                required
                autoComplete="new-password"
              />
              <EyeToggle show={showPassword} onToggle={() => setShowPassword((v) => !v)} />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="signup-confirm-password" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="signup-confirm-password"
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
                  formData.confirmPassword && formData.password !== formData.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="••••••••"
                required
                autoComplete="new-password"
              />
              <EyeToggle show={showConfirm} onToggle={() => setShowConfirm((v) => !v)} />
            </div>
            {/* Live password match indicator */}
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">Passwords do not match.</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label htmlFor="signup-mobile" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Mobile
            </label>
            <input
              id="signup-mobile"
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="1234567890"
              required
              autoComplete="tel"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="signup-address" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Address
            </label>
            <input
              id="signup-address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="123 Main St"
              required
              autoComplete="street-address"
            />
          </div>

          {/* Submit */}
          <div className="w-full text-center pt-1">
            <button
              type="submit"
              id="signup-submit-btn"
              className="w-full flex justify-center items-center gap-2 rounded text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2.5 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              disabled={loading || (formData.confirmPassword && formData.password !== formData.confirmPassword)}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
          Already have an account?{" "}
          <button
            type="button"
            className="font-medium text-blue-600 hover:underline"
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
