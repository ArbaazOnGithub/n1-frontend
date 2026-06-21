import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "@/config";

const WEBSITE_TYPE_INFO = (
  <div>
    <strong>Static Websites:</strong> Display fixed content — fast, cheap, ideal for portfolios & landing pages.
    <br /><br />
    <strong>Dynamic Websites:</strong> Fetch & update data in real time — ideal for e-commerce, dashboards & apps.
  </div>
);

const ServiceForm = ({ selectedService, fields, onClose }) => {
  const [formData, setFormData] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateField = (field, value) => {
    if (!value || value === "Select") return `${field.label} is required.`;
    if (field.type === "email" && !/\S+@\S+\.\S+/.test(value)) return "Enter a valid email address.";
    if (field.type === "phone" && !/^\+?[\d\s\-()]{7,15}$/.test(value)) return "Enter a valid phone number.";
    return "";
  };

  const validateAll = () => {
    const errors = {};
    (fields || []).forEach((field) => {
      const err = validateField(field, formData[field.name]);
      if (err) errors[field.name] = err;
    });
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isFormValid = () =>
    (fields || []).every(
      (field) => formData[field.name] && formData[field.name] !== "Select"
    );

  const showDefinition = () => {
    toast.info(WEBSITE_TYPE_INFO, { position: "top-center", autoClose: 6000 });
  };

  const showSubmissionMessage = (serviceName) => {
    toast.success(
      <div className="text-center">
        <strong>Thank you for applying for {serviceName} service.</strong>
        <p className="text-sm mt-1">Our team will soon contact you.</p>
        <p className="text-sm mt-1">
          If it is urgent, call:{" "}
          <a href="tel:+919399285780" className="text-blue-500 underline font-semibold">
            +919399285780
          </a>
        </p>
      </div>,
      { position: "top-center", autoClose: 3000 }
    );
  };

  const handleSubmit = async (serviceName) => {
    if (!validateAll()) return;
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please log in to submit the form.");
        navigate("/login");
        return;
      }

      const orderDetails = Object.keys(formData).map((key) => ({
        name: key,
        value: formData[key],
      }));

      const response = await fetch(`${config.apiUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceType: serviceName,
          details: orderDetails,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }

      showSubmissionMessage(serviceName);
      setFormData({});

      // Navigate after the toast has had time to show
      setTimeout(() => {
        if (onClose) onClose();
        navigate("/");
      }, 3200);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="select-none p-6 bg-white/80 dark:bg-gray-900/50 backdrop-blur-xl rounded-xl shadow-2xl w-full border border-white/20 dark:border-gray-700/50">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
        {selectedService} Service
      </h2>

      {fields?.map((field) => {
        const isWebsiteType = field.name === "websiteType" || field.label?.toLowerCase().includes("type");
        return (
          <div key={field.name} className="mt-4">
            <div className="flex items-center gap-1.5 mb-1">
              <label
                htmlFor={`field-${field.name}`}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {field.label}
              </label>
              {isWebsiteType && (
                <button
                  type="button"
                  onClick={showDefinition}
                  className="text-blue-500 hover:text-blue-700 dark:text-blue-400 transition-colors"
                  aria-label="What does this mean?"
                  title="What's the difference?"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>

            {field.type === "select" ? (
              <select
                id={`field-${field.name}`}
                name={field.name}
                value={formData[field.name] || "Select"}
                onChange={handleChange}
                className={`w-full p-2.5 bg-gray-50 dark:bg-gray-700 border text-gray-900 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  fieldErrors[field.name]
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                <option value="Select">Select</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={`field-${field.name}`}
                type={field.type === "email" ? "email" : field.type === "phone" ? "tel" : "text"}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className={`w-full p-2.5 bg-gray-50 dark:bg-gray-700 border text-gray-900 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  fieldErrors[field.name]
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-600"
                }`}
                placeholder={`Enter ${field.label}`}
              />
            )}

            {/* Inline field error */}
            {fieldErrors[field.name] && (
              <p className="mt-1 text-xs text-red-500 dark:text-red-400 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {fieldErrors[field.name]}
              </p>
            )}
          </div>
        );
      })}

      <div className="w-full flex justify-center mt-6">
        <button
          id="service-form-submit-btn"
          className={`w-40 flex justify-center items-center gap-2 p-2.5 rounded-lg font-semibold shadow-md transition-all ${
            isFormValid() && !submitting
              ? "bg-blue-500 text-white hover:bg-blue-600 active:scale-95"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={() => handleSubmit(selectedService)}
          disabled={submitting}
        >
          {submitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
};

export default ServiceForm;
