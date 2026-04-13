import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "@/config"; // Import your config file

const ServiceForm = ({ selectedService, fields, onClose }) => {
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid = () => {
    const requiredFields = fields?.map((field) => field.name) || [];
    return requiredFields.every((field) => formData[field] && formData[field] !== "Select");
  };

  const showDefinition = () => {
    toast.info(
      <div>
         <strong>Static Websites:</strong>   {/* Display fixed content. */}
        <a
          href="https://example-static-site.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Example
        </a>
        <br />
        <br />
         <strong>Dynamic Websites:</strong>   {/* Fetch and update data in real time. */}
        <a
          href="https://example-dynamic-site.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Example
        </a>
      </div>,
      { position: "top-center", autoClose: 4000 }
    );
  };

  const showSubmissionMessage = (serviceName) => {
    toast(
      <div className="text-center">
        <strong>Thank you for applying for {serviceName} service.</strong>
        <p>Our team will soon contact you.</p>
        <p>
          If it is urgent, call:{" "}
          <a href="tel:+919399285780" className="text-blue-500 underline">
            +919399285780
          </a>
        </p>
      </div>,
      {
        position: "top-center",
        autoClose: 2000,
        className: "flex justify-center items-center fixed inset-0 bg-white shadow-lg p-6 rounded-lg",
      }
    );
  };
//commented below code for user name and mobile number in the order table 
  // const handleSubmit = async (serviceName) => {
  //   setSubmitting(true);
  //   try {
  //     const token = localStorage.getItem('token'); // Get the JWT token from local storage
  
  //     if (!token) {
  //       throw new Error('Please log in to submit the form.');
  //     }
  
  //     // Convert form data to OrderDetail format
  //     const orderDetails = Object.keys(formData).map((key) => ({
  //       name: key,
  //       value: formData[key],
  //     }));
  
  //     // Send the order data to the backend
  //     const response = await fetch(`${config.apiUrl}/api/orders`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${token}`, // Include the token in the request headers
  //       },
  //       body: JSON.stringify({
  //         serviceType: serviceName, // Pass the service name
  //         details: orderDetails, // Pass the form data as order details
  //       }),
  //     });
  
  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
  //     }
  
  //     // Show success message
  //     showSubmissionMessage(serviceName);
  //     setFormData({});
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     if (!localStorage.getItem('token')) {
  //       toast.error("Please log in to submit the form.");
  //     } else {
  //       toast.error("Failed to submit the form. Please try again.");
  //     }
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleSubmit = async (serviceName) => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token'); // Get the JWT token
      
      if (!token) {
        throw new Error('Please log in to submit the form.');
      }
      
      // Convert form data to OrderDetail format
      const orderDetails = Object.keys(formData).map((key) => ({
        name: key,
        value: formData[key],
      }));
      
      // Send the order data to the backend
      const response = await fetch(`${config.apiUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
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
      
      // Show success message
      showSubmissionMessage(serviceName);
      setFormData({});
    } catch (error) {
      console.error("Error submitting form:", error);
      if (!localStorage.getItem('token')) {
        toast.error("Please log in to submit the form.");
      } else {
        toast.error("Failed to submit the form. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };




  return (
    <div className="select-none p-5 bg-white rounded-lg shadow-lg w-full">


      <h2 className="text-2xl font-bold text-center">{selectedService} Service</h2>

      {fields?.map((field) => (
        <div key={field.name} className="mt-2">
          <label className="block text-gray-700">{field.label}</label>
          {field.type === "select" ? (
            <select
              name={field.name}
              value={formData[field.name] || "Select"}
              onChange={handleChange}
              className="w-full p-2 border rounded"
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
              type="text"
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder={`Enter ${field.label}`}
            />
          )}
        </div>
      ))}

      <div className="w-full flex justify-center mt-4">
        <button
          className={`w-30 p-2 rounded font-semibold shadow-md transition ${isFormValid() && !submitting
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          onClick={() => isFormValid() && handleSubmit(selectedService)}
          disabled={!isFormValid() || submitting}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default ServiceForm;
