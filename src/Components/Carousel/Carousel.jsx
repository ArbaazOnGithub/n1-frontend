
import React, { useRef, useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../Cards/Card';
import config from '@/config';
import { serviceDetails } from '../ServiceData';

// Build the initial static services list from ServiceData so the carousel
// renders at 0ms with no dependency on the backend being awake.
const STATIC_SERVICES = Object.entries(serviceDetails).map(([name, detail]) => ({
  name,
  slug: detail.slug,
  description: detail.description,
  icon: detail.icon,
  imageUrl: null,
}));

const Carousel = () => {
  const aliceCarouselRef = useRef(null);
  // Start with static services — renders immediately, no spinner needed.
  const [services, setServices] = useState(STATIC_SERVICES);
  const navigate = useNavigate();

  useEffect(() => {
    // Silently fetch backend services in the background.
    // If the backend is awake, merge any new services not in the static list.
    fetch(`${config.apiUrl}/api/services`)
      .then((r) => {
        if (!r.ok) return;
        return r.json();
      })
      .then((data) => {
        if (!data || !Array.isArray(data)) return;
        // Merge: keep static services, append backend-only services
        const staticSlugs = new Set(STATIC_SERVICES.map((s) => s.slug));
        const backendOnly = data.filter(
          (s) => !staticSlugs.has(s.slug || s.name?.toLowerCase().replace(/ /g, '-'))
        );
        if (backendOnly.length > 0) {
          setServices((prev) => [...prev, ...backendOnly]);
        }
      })
      .catch(() => {
        // Backend is asleep — static services are already displayed, nothing to do.
      });
  }, []);

  const handleServiceClick = (service) => {
    if (!localStorage.getItem('token')) {
      toast.error("Please login to apply");
      navigate("/login");
      return;
    }
    const slug = service.slug || service.name.toLowerCase().replace(/ /g, '-');
    navigate(`/services/${slug}`, { state: { openForm: true } });
  };

  const items = services.map((service, index) => (
    <div key={index} className="flex justify-center">
      <Card
        title={service.name}
        description={service.description || "No description available."}
        image={service.imageUrl}
        onClick={() => handleServiceClick(service)}
      />
    </div>
  ));

  const responsive = {
    0: { items: 1 },
    576: { items: 2 },
    992: { items: 3 },
    1200: { items: 4 },
  };

  return (
    <div className="relative md:top-10">
      <p className='select-none font-serif italic font-normal text-4xl text-center lg:text-5xl'>Services</p>

      <div>
        <AliceCarousel
          mouseTracking
          items={items}
          responsive={responsive}
          disableDotsControls
          disableButtonsControls
          ref={aliceCarouselRef}
          infinite
          autoPlay={{ disableOnInteraction: false }}
          autoPlayInterval={2000}
        />
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
          <button className="custom-prev-button" onClick={() => aliceCarouselRef.current.slidePrev()}>&lt;</button>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
          <button className="custom-next-button" onClick={() => aliceCarouselRef.current.slideNext()}>&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;