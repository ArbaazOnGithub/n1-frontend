import React from "react";
import { useNavigate } from "react-router-dom";
import ServiceForm from "../Forms/ServiceForm";
import ReviewSection from "../ReviewSection";
import { useState } from "react";

// Static rich content for each service keyed by service name
export const serviceDetails = {
  "Web Development": {
    slug: "web-development",
    tagline: "Stunning Websites That Drive Results",
    description:
      "We craft high-performance, visually stunning websites tailored to your brand. From simple landing pages to complex web applications, our team delivers pixel-perfect, responsive solutions that convert visitors into customers.",
    features: [
      "Custom responsive design for all devices",
      "Static & dynamic website development",
      "E-commerce integration (Shopify, WooCommerce)",
      "SEO-ready code structure",
      "Fast load times & performance optimization",
      "CMS integration (WordPress, Strapi)",
    ],
    faqs: [
      { q: "How long does it take to build a website?", a: "Typically 2–6 weeks depending on complexity." },
      { q: "Will my website be mobile-friendly?", a: "Yes, all our websites are fully responsive." },
      { q: "Do you provide post-launch support?", a: "Yes, we offer maintenance packages." },
    ],
    icon: "🌐",
    color: "from-blue-500 to-cyan-500",
  },
  "SEO": {
    slug: "seo",
    tagline: "Rank Higher. Get Found. Grow Faster.",
    description:
      "Our data-driven SEO strategies put your business at the top of search results. We audit, optimize, and monitor your site to deliver sustainable organic traffic growth and maximize your online visibility.",
    features: [
      "Complete SEO site audit",
      "Keyword research & content strategy",
      "On-page & technical SEO optimization",
      "Link building campaigns",
      "Monthly ranking reports",
      "Local SEO optimization",
    ],
    faqs: [
      { q: "How long until I see results?", a: "SEO typically shows results in 3–6 months." },
      { q: "Do you guarantee first-page rankings?", a: "We guarantee best efforts; no ethical agency can guarantee rankings." },
      { q: "What do monthly reports include?", a: "Keyword rankings, traffic analysis, and recommended actions." },
    ],
    icon: "📈",
    color: "from-green-500 to-emerald-500",
  },
  "Logo Design": {
    slug: "logo-design",
    tagline: "Your Brand Identity, Perfected",
    description:
      "A great logo tells your brand's story at a glance. Our creative designers work closely with you to create a unique, versatile logo that stands out across all media — print, web, and social.",
    features: [
      "3+ unique logo concepts",
      "Unlimited revisions until you're 100% satisfied",
      "Delivery in all formats (PNG, SVG, PDF, AI)",
      "Full brand color palette & typography guide",
      "Social media kit included",
      "Commercial usage rights",
    ],
    faqs: [
      { q: "How many revisions do I get?", a: "Unlimited revisions until you're satisfied." },
      { q: "What file formats will I receive?", a: "PNG, SVG, PDF, and AI source files." },
      { q: "How long does the process take?", a: "Initial concepts within 3–5 business days." },
    ],
    icon: "🎨",
    color: "from-violet-500 to-purple-500",
  },
  "Google Ads": {
    slug: "google-ads",
    tagline: "Instant Visibility. Maximum ROI.",
    description:
      "Stop wasting money on poorly managed ad campaigns. Our certified Google Ads specialists create, optimize, and scale campaigns that bring you real leads and measurable ROI.",
    features: [
      "Google Search & Display campaigns",
      "Shopping Ads for e-commerce",
      "Remarketing & audience targeting",
      "A/B ad copy testing",
      "Conversion tracking setup",
      "Weekly performance reports",
    ],
    faqs: [
      { q: "What's the minimum budget?", a: "We recommend at least ₹10,000/month ad spend." },
      { q: "How quickly can I see results?", a: "Usually within the first week of going live." },
      { q: "Do you handle the billing?", a: "Ad spend goes directly to Google; we charge a management fee." },
    ],
    icon: "📢",
    color: "from-orange-500 to-amber-500",
  },
  "Google Map Listing": {
    slug: "google-map-listing",
    tagline: "Put Your Business on the Map",
    description:
      "Local customers are searching for your services right now. We optimize your Google Business Profile to ensure you appear in local searches, Google Maps, and the coveted Local Pack.",
    features: [
      "Google Business Profile setup & verification",
      "Category & attribute optimization",
      "Photo & post management",
      "Review response strategy",
      "Citation building for local SEO",
      "Monthly insights report",
    ],
    faqs: [
      { q: "What is Google Business Profile?", a: "It's your free listing on Google Search and Maps." },
      { q: "Can you help if my listing was suspended?", a: "Yes, we handle reinstatement cases." },
      { q: "How long until my listing is verified?", a: "Typically 3–14 days via Google's process." },
    ],
    icon: "📍",
    color: "from-red-500 to-rose-500",
  },
  "Web Hosting": {
    slug: "web-hosting",
    tagline: "Fast, Secure & Reliable Hosting",
    description:
      "Your website deserves a home that's always online and lightning fast. We provide managed hosting solutions with 99.9% uptime, SSL certificates, and daily backups so you can focus on your business.",
    features: [
      "99.9% uptime guarantee",
      "Free SSL certificate",
      "Daily automated backups",
      "cPanel access",
      "Email hosting included",
      "24/7 technical support",
    ],
    faqs: [
      { q: "What is the uptime guarantee?", a: "We guarantee 99.9% uptime with SLA." },
      { q: "Can I migrate my existing website?", a: "Yes, we provide free website migration." },
      { q: "Is SSL included?", a: "Yes, SSL is free with all hosting plans." },
    ],
    icon: "🖥️",
    color: "from-sky-500 to-blue-500",
  },
  "Data Entry": {
    slug: "data-entry",
    tagline: "Accurate, Fast & Confidential Data Services",
    description:
      "Free up your team from tedious data tasks. Our trained professionals deliver accurate data entry, cleansing, and management services with quick turnaround and strict confidentiality.",
    features: [
      "Online & offline data entry",
      "Data cleansing & deduplication",
      "Excel, CRM, and database entry",
      "Scanned document digitization",
      "99.9% accuracy guarantee",
      "NDA & data confidentiality",
    ],
    faqs: [
      { q: "How do you ensure accuracy?", a: "We use a double-verification process for all entries." },
      { q: "Is my data secure?", a: "Yes, we sign NDAs and use secure file transfer methods." },
      { q: "What's the turnaround time?", a: "Depends on volume; we provide an estimate upfront." },
    ],
    icon: "📊",
    color: "from-teal-500 to-cyan-500",
  },
  "Tele Calling": {
    slug: "tele-calling",
    tagline: "Professional Calling. Real Connections.",
    description:
      "Our trained tele-callers represent your brand professionally, whether for lead generation, customer follow-up, surveys, or appointment setting. We speak your customers' language.",
    features: [
      "Lead generation calls",
      "Customer follow-up & retention",
      "Survey & feedback collection",
      "Appointment scheduling",
      "Bilingual callers (English & Hindi)",
      "Daily call reports",
    ],
    faqs: [
      { q: "What languages do your callers speak?", a: "English and Hindi; regional languages available on request." },
      { q: "Do I get call recordings?", a: "Yes, recordings are available for quality assurance." },
      { q: "What is the minimum commitment?", a: "We offer flexible monthly packages." },
    ],
    icon: "📞",
    color: "from-pink-500 to-fuchsia-500",
  },
};

// Helper to find service details by slug
export const findServiceBySlug = (slug) =>
  Object.values(serviceDetails).find((s) => s.slug === slug);

// Helper to find service details by name (for the carousel)
export const findServiceByName = (name) => serviceDetails[name];
