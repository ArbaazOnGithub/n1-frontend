import React from 'react';
import './AssociatedCompanies.css';
import {
  FaNetworkWired,
  FaLightbulb,
  FaChartLine,
  FaLeaf,
} from 'react-icons/fa';

const companies = [
  {
    name: 'Turbonet',
    icon: (
      <div className="flex items-center gap-1 font-bold tracking-tight text-3xl font-sans company-custom-logo">
        <FaNetworkWired className="text-4xl company-logo-icon-blue" />
        <span className="company-logo-text-main">turbo</span>
        <span className="company-logo-text-accent">net</span>
      </div>
    ),
  },
  {
    name: 'ideas 4 Transformations',
    icon: (
      <div className="flex items-center gap-1.5 font-semibold tracking-tight text-2xl font-sans company-custom-logo">
        <FaLightbulb className="text-3xl company-logo-icon-amber" />
        <span className="company-logo-text-main">ideas</span>
        <span className="company-logo-text-purple">4</span>
        <span className="company-logo-text-accent font-bold">T</span>
      </div>
    ),
  },
  {
    name: 'BondsIndia',
    icon: (
      <div className="flex items-center gap-1.5 font-bold tracking-tight text-2xl font-sans company-custom-logo">
        <FaChartLine className="text-3xl company-logo-icon-orange" />
        <span className="company-logo-text-bondsorange">BONDS</span>
        <span className="company-logo-text-bondsteal">INDIA</span>
        <span className="company-logo-text-bondsteal text-xs align-top mt-0.5">®</span>
      </div>
    ),
  },
  {
    name: 'Santech Digital Solutions',
    icon: (
      <div className="flex flex-col items-center justify-center company-custom-logo">
        <span className="font-black tracking-widest text-2xl company-logo-text-santech-gray leading-none">
          SANTECH
        </span>
        <span className="font-bold tracking-[0.2em] text-xs company-logo-text-santech-red uppercase leading-none mt-0.5">
          Digital Solutions
        </span>
      </div>
    ),
  },
  {
    name: 'Galaxy Dry Fruits',
    icon: (
      <div className="flex flex-col items-center justify-center company-custom-logo gdf-badge">
        <span className="font-bold tracking-[0.15em] text-[9px] company-logo-text-gdf-purple uppercase leading-none mb-0.5">
          Galaxy Dry Fruits
        </span>
        <div className="flex items-center gap-0.5 leading-none">
          <span className="font-black text-3xl company-logo-text-gdf-magenta leading-none">G</span>
          <span className="font-black text-3xl company-logo-text-gdf-green leading-none">D</span>
          <span className="font-black text-3xl company-logo-text-gdf-orange leading-none">F</span>
        </div>
        <div className="flex items-center gap-0.5 mt-0.5">
          <FaLeaf className="text-xs company-logo-text-gdf-green" />
          <span className="font-semibold tracking-[0.12em] text-[8px] company-logo-text-gdf-blue uppercase leading-none">
            House of Quality
          </span>
        </div>
      </div>
    ),
  },
];

const AssociatedCompanies = () => {
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
              aria-label={company.name}
              tabIndex={index < companies.length ? 0 : -1}
              onFocus={(e) => e.currentTarget.closest('.marquee-container').classList.add('paused')}
              onBlur={(e) => e.currentTarget.closest('.marquee-container').classList.remove('paused')}
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
