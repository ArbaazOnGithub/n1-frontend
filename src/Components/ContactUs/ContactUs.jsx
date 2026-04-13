import React, { useState } from "react";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { FaMapMarkedAlt } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import ContactCarousel from "./ContactCarousel";
import "swiper/css";
import "swiper/css/autoplay";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page refresh

    try {
      const response = await fetch("http://localhost:8080/api/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      // Show success toast
      toast.success("Message Sent Successfully", {
        position: "top-center",
        autoClose: 3000,
      });

      // Reset form fields
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="select-none min-h-80 flex flex-col items-center justify-center bg-gray-200 p-4 w-full h-auto">
      <ToastContainer />

      {/* Header Section  */}
      <div className="block sm:block md:hidden lg:hidden w-full">
        <ContactCarousel />
      </div>

      <div className="hidden md:block lg:block w-full p-3">
        <div className="grid grid-cols-3 md:grid-cols-3 gap-20 text-center">
          <div className="text-center">
            <div className="mx-auto text-gray-600 flex justify-center">
              <PiBuildingOfficeBold size={60} />
            </div>
            <h5 className="text-sm font-semibold mt-1 text-black">Company Info</h5>
            <p className="text-xs text-gray-500">N1SOLUTION LLC</p>
            <p className="text-xs text-gray-500">MO.: +919616273393</p>
          </div>

          <div className="text-center">
            <div className="mx-auto text-gray-600 flex justify-center">
              <FaMapMarkedAlt size={60} />
            </div>
            <h5 className="text-sm font-semibold mt-1 text-black">Address</h5>
            <p className="text-xs text-gray-500">MUMBAI, IND</p>
            <p className="text-xs text-gray-500">Zip Code: 03875</p>
          </div>

          <div className="text-center">
            <div className="mx-auto text-gray-600 flex justify-center">
              <IoMdCall size={60} />
            </div>
            <h5 className="text-sm font-semibold mt-1 text-black">Contact Us</h5>
            <p className="text-xs text-gray-500">support@n1solution.com</p>
          </div>
        </div>
      </div>

      {/* Compact Form Section */}
      <div className="max-w-md w-full p-4 rounded-lg border-2 bg-gray-100 border-gray-800 mt-2">
        <h2 className="text-lg font-semibold text-center mb-2">Get in Touch</h2>

        {/* ✅ Correctly Handling Form Submit */}
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs text-gray-500">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-1.5 rounded-md bg-gray-700 border border-gray-600 text-white text-sm focus:ring-2 focus:ring-blue-400"
              placeholder="Your Name"
              required
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-1.5 rounded-md bg-gray-700 border border-gray-600 text-white text-sm focus:ring-2 focus:ring-blue-400"
              placeholder="name@example.com"
              required
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-1.5 rounded-md bg-gray-700 border border-gray-600 text-white text-sm focus:ring-2 focus:ring-blue-400"
              placeholder="+1 (123) 456-7890"
              required
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">Your Message</label>
            <textarea
              rows="2"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-1.5 rounded-md bg-gray-700 border border-gray-600 text-white text-sm focus:ring-2 focus:ring-blue-400"
              placeholder="Write your message..."
              required
            ></textarea>
          </div>

          <div className="flex items-center text-xs">
            <input type="checkbox" className="mr-2 accent-blue-500" required />
            <span className="text-gray-500">
              I agree to the{" "}
              <a href="#" className="text-blue-400 underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-400 underline">
                Privacy Policy
              </a>.
            </span>
          </div>

          {/* ✅ Correctly using the form submit event */}
          <div className="w-full text-center">
            <button
              type="submit"
              className="p-1 rounded bg-blue-700 hover:bg-blue-900 text-center text-white text-sm shadow-md transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}