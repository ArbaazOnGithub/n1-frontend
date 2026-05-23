import React from 'react';
import './AssociatedCompanies.css';
import {
  FaGoogle,
  FaAmazon,
  FaMicrosoft,
  FaApple,
  FaFacebook,
  FaSpotify,
  FaAws,
  FaPaypal,
  FaStripe,
  FaNetworkWired,
  FaLightbulb
} from 'react-icons/fa';

const AssociatedCompanies = () => {
  const companies = [
    { name: 'Google', icon: <FaGoogle /> },
    { name: 'Amazon', icon: <FaAmazon /> },
    { 
      name: 'Turbonet', 
      icon: (
        <div className="flex items-center gap-1 font-bold tracking-tight text-3xl font-sans company-custom-logo">
          <FaNetworkWired className="text-4xl company-logo-icon-blue" />
          <span className="company-logo-text-main">turbo</span>
          <span className="company-logo-text-accent">net</span>
        </div>
      ) 
    },
    { name: 'Microsoft', icon: <FaMicrosoft /> },
    { name: 'Apple', icon: <FaApple /> },
    { 
      name: 'ideas 4 Transformations', 
      icon: (
        <div className="flex items-center gap-1.5 font-semibold tracking-tight text-2xl font-sans company-custom-logo">
          <FaLightbulb className="text-3xl company-logo-icon-amber" />
          <span className="company-logo-text-main">ideas</span>
          <span className="company-logo-text-purple">4</span>
          <span className="company-logo-text-accent font-bold">T</span>
        </div>
      ) 
    },
    { name: 'Facebook', icon: <FaFacebook /> },
    { name: 'Spotify', icon: <FaSpotify /> },
    { name: 'AWS', icon: <FaAws /> },
    { name: 'PayPal', icon: <FaPaypal /> },
    { name: 'Stripe', icon: <FaStripe /> }
  ];

  return (
    <div className="associated-companies-section py-16 bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="associated-companies-title text-center text-3xl font-bold text-gray-800 mb-2">
          Trusted By Industry Leaders
        </h2>
        <p className="associated-companies-subtitle text-center text-gray-500 max-w-2xl mx-auto">
          We collaborate with top companies to deliver exceptional solutions and push the boundaries of innovation.
        </p>
      </div>

      <div className="marquee-container relative flex overflow-x-hidden">
        {/* Left and Right Fade Masks */}
        <div className="marquee-fade-left pointer-events-none absolute inset-y-0 left-0 w-24 z-10"></div>
        <div className="marquee-fade-right pointer-events-none absolute inset-y-0 right-0 w-24 z-10"></div>

        <div className="marquee-content flex items-center py-4 whitespace-nowrap animate-marquee">
          {/* Render the list twice for seamless looping */}
          {[...companies, ...companies].map((company, index) => (
            <div
              key={index}
              className="company-logo-item mx-8 lg:mx-12 flex items-center justify-center text-gray-400 hover:text-blue-600 transition-colors duration-300 text-5xl lg:text-6xl"
              title={company.name}
            >
              {company.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssociatedCompanies;
