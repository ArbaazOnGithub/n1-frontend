import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { findServiceBySlug } from "../Components/ServiceData";
import ServiceForm from "../Components/Forms/ServiceForm";
import config from "@/config";

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = findServiceBySlug(slug);

  const [showForm, setShowForm] = useState(false);
  const [backendService, setBackendService] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [relatedReviews, setRelatedReviews] = useState([]);

  useEffect(() => {
    if (!service) return;
    // Fetch backend service to get dynamic fields
    fetch(`${config.apiUrl}/api/services`)
      .then((r) => r.json())
      .then((services) => {
        const match = services.find(
          (s) => s.name.toLowerCase() === service.slug.replace(/-/g, " ").toLowerCase()
            || s.name.toLowerCase().includes(service.icon)
        );
        if (!match) {
          // Try matching by first word
          const found = services.find((s) =>
            slug.split("-").some((word) => s.name.toLowerCase().includes(word))
          );
          setBackendService(found || null);
        } else {
          setBackendService(match);
        }
      })
      .catch(console.error);

    // Fetch reviews for this service
    fetch(`${config.apiUrl}/api/reviews`)
      .then((r) => r.json())
      .then((reviews) => {
        const filtered = reviews.filter((r) =>
          r.serviceName?.toLowerCase().includes(slug.replace(/-/g, " ").split(" ")[0].toLowerCase())
        );
        setRelatedReviews(filtered.slice(0, 3));
      })
      .catch(console.error);
  }, [slug, service]);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <h2 className="text-2xl font-bold text-slate-700">Service not found.</h2>
        <button onClick={() => navigate("/")} className="mt-4 premium-button">
          ← Back to Home
        </button>
      </div>
    );
  }

  const StarDisplay = ({ value }) => (
    <span className="text-amber-400">
      {"★".repeat(value)}{"☆".repeat(5 - value)}
    </span>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Hero Banner */}
      <div className={`bg-gradient-to-r ${service.color} py-20 px-6 text-white relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,white,transparent_60%)]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-white/70 hover:text-white transition text-sm"
          >
            ← Back
          </button>
          <div className="text-6xl mb-4">{service.icon}</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">{service.tagline}</h1>
          <p className="text-lg text-white/80 max-w-2xl">{service.description}</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-8 bg-white text-slate-800 font-bold px-8 py-3 rounded-full hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Apply for {slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} →
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* Features Grid */}
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">✅ What's Included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.features.map((feat, i) => (
              <div key={i} className="glass-card rounded-xl p-5 flex items-start gap-3 service-hover-card">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                  {i + 1}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">{feat}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="glass-card rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">🚀 How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Apply", desc: "Fill out the service form with your requirements." },
              { step: "2", title: "Consult", desc: "Our team will contact you within 24 hours to discuss the project." },
              { step: "3", title: "Deliver", desc: "We execute and deliver results with regular progress updates." },
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${service.color} text-white text-2xl font-extrabold flex items-center justify-center mx-auto mb-3`}>
                  {step.step}
                </div>
                <h3 className="font-bold text-slate-800 text-lg">{step.title}</h3>
                <p className="text-slate-500 text-sm mt-1">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Accordion */}
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">❓ Frequently Asked Questions</h2>
          <div className="space-y-3">
            {service.faqs.map((faq, i) => (
              <div key={i} className="glass-card rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-slate-800 hover:bg-blue-50/50 transition"
                >
                  {faq.q}
                  <span className={`text-blue-500 transition-transform ${openFaq === i ? "rotate-180" : ""}`}>▼</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Related Reviews */}
        {relatedReviews.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">⭐ Client Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedReviews.map((r) => (
                <div key={r.id} className="glass-card rounded-xl p-5 service-hover-card">
                  <StarDisplay value={r.rating} />
                  <p className="text-slate-700 text-sm mt-2 italic">"{r.comment}"</p>
                  <p className="text-xs text-slate-400 mt-3 font-medium">{r.user?.name || "Customer"}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className={`bg-gradient-to-r ${service.color} rounded-2xl p-10 text-center text-white`}>
          <h2 className="text-3xl font-extrabold mb-3">Ready to Get Started?</h2>
          <p className="text-white/80 mb-6">Fill out our quick form and we'll be in touch within 24 hours.</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-white text-slate-800 font-bold px-10 py-3 rounded-full hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Service Form Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-500 flex items-center justify-center transition font-bold"
            >
              ✕
            </button>
            <ServiceForm
              selectedService={backendService?.name || slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
              fields={backendService?.fields || []}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetailPage;
