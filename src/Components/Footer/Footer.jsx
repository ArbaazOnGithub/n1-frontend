import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import social media icons
import Logo from '../../assets/Img/Logo.png'; // Import your logo image

const Footer = () => {
  const services = [
    { name: 'Web Development', link: '/service1' },
    { name: 'SEO', link: '/service2' },
    { name: 'Web Hosting', link: '/service3' },
    { name: 'Google Ads', link: '/service4' },
    { name: 'Digital Marketing', link: '/service4' },
    // Add more services as needed
  ];

  return (
    <footer className="select-none bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row justify-between items-center">

        {/* Left: Logo & Slogan */}
        <div className="mr-2 mb-6 lg:mb-0 flex items-center">
          <img src={Logo} alt="Your Logo" className="h-20 mr-5" /> {/* Adjust height as needed */}
          <div className='mt-1'>
            <h3 className="font-bold text-xl">N1Solution</h3>
            <p className="text-sm">Always here to help you.</p>
          </div>
        </div>

        {/* Center: Services Links */}
        <div className="hidden lg:block mb-6 lg:mb-0 lg:w-4/5 text-center">
          <h4 className="font-bold mb-2 mr-12">Our Services</h4>
          <ul className="flex flex-col mr-20 lg:flex-row justify-center space-y-4 lg:space-y-0 lg:space-x-6">
            {services.map((service) => (
              <li key={service.name}>
                <h6 href={service.link} className="hover:text-gray-300">
                  {service.name}
                </h6>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Social Media Links */}
        <div>
          <h4 className="font-bold mb-2 ml-5">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-4 text-gray-400">
        &copy; {new Date().getFullYear()} N1Solution. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;