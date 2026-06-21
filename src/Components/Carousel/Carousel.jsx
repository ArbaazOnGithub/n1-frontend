
import React, { useRef, useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../Cards/Card';
import config from '@/config';

const Carousel = () => {
  const aliceCarouselRef = useRef(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/services`);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }

        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleServiceClick = (service) => {
    if (!localStorage.getItem('token')) {
      toast.error("Please login to apply");
      navigate("/login");
      return;
    }
    // Navigate to the service detail page and signal it to auto-open the form
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

  if (loading) {
    return <div>Loading services...</div>;
  }

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