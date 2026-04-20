import React, { useState } from "react";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { FaMapMarkedAlt } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import ContactCarousel from "./ContactCarousel";
import "swiper/css";
import "swiper/css/autoplay";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../../config";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${config.apiUrl}/api/contact/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      toast.success("Message Sent Successfully! We will contact you soon.", {
        position: "top-center",
        autoClose: 3000,
      });

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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="select-none min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <ToastContainer />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Get in Touch</h2>
          <p className="mt-4 text-xl text-gray-500">We'd love to hear from you. Our team is always here to help.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info Cards */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100 flex flex-col items-center text-center">
                <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 mb-6 font-bold">
                  <PiBuildingOfficeBold size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Our Office</h3>
                <p className="mt-2 text-gray-500 text-sm">MUMBAI, IND<br />Zip Code: 03875</p>
              </div>

              <div className="p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100 flex flex-col items-center text-center">
                <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600 mb-6 font-bold">
                  <IoMdCall size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Call Us</h3>
                <p className="mt-2 text-gray-500 text-sm">+91 96162 73393<br />Mon-Fri 9am-6pm</p>
              </div>
            </div>

            <div className="p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
               <div className="flex items-center gap-6 mb-4">
                  <div className="p-4 bg-violet-50 rounded-2xl text-violet-600 font-bold">
                    <FaMapMarkedAlt size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Visit Us</h3>
                    <p className="text-gray-500 text-sm">Experience our premium services in person.</p>
                  </div>
               </div>
               <div className="h-48 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 overflow-hidden">
                  <ContactCarousel />
               </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 md:p-12 border border-gray-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-50 rounded-full opacity-50 blur-3xl"></div>
            <div className="relative">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-gray-900 placeholder-gray-400"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-gray-900 placeholder-gray-400"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-gray-900 placeholder-gray-400"
                    placeholder="+91 00000 00000"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Your Message</label>
                  <textarea
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-gray-900 placeholder-gray-400 resize-none"
                    placeholder="Tell us how we can help..."
                    required
                  ></textarea>
                </div>

                <div className="flex items-start gap-3 text-sm text-gray-500 px-1">
                  <input type="checkbox" className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer" required />
                  <span>
                    I agree to the <a href="#" className="text-blue-600 font-semibold hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 font-semibold hover:underline">Privacy Policy</a>.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg shadow-lg shadow-blue-500/30 transform transition active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full font-bold"></div>
                  ) : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}