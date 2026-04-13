// import React, { useRef, useState, useEffect } from 'react';
// import AliceCarousel from 'react-alice-carousel';
// import 'react-alice-carousel/lib/alice-carousel.css';
// import Card from '../Cards/Card';
// import ServiceForm from '../Forms/ServiceForm';
// import config from '@/config'; // Import your config file

// const Carousel = () => {
//   const aliceCarouselRef = useRef(null);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedService, setSelectedService] = useState(null);
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch services from the API
//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Get the JWT token from local storage

//         if (!token) {
//           throw new Error('No authentication token found');
//         }

//         const response = await fetch(`${config.apiUrl}/api/services`, {
//           headers: {
//             'Authorization': `Bearer ${token}`, // Include the token in the request headers
//           },
//         });

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//         }

//         const data = await response.json();
//         setServices(data); // Set the fetched services
//       } catch (error) {
//         console.error('Error fetching services:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchServices();
//   }, []);

//   // Render carousel items
//   const items = services.map((service, index) => (
//     <div key={index} className="flex justify-center">
//       <Card
//         title={service.name}
//         description={service.description || "No description available."}
//         image={service.imageUrl} // Use the image URL from the API
//         onClick={() => {
//           setSelectedService(service); // Set the selected service
//           setShowForm(true); // Show the form
//         }}
//       />
//     </div>
//   ));

//   const responsive = {
//     0: { items: 1 },
//     576: { items: 2 },
//     992: { items: 3 },
//     1200: { items: 4 },
//   };

//   if (loading) {
//     return <div>Loading services...</div>;
//   }

//   return (
//     <div className="relative md:top-10">
//       <p className='select-none font-serif italic font-normal text-4xl text-center lg:text-5xl'>Services</p>

//       <div className={`${showForm ? 'blur-sm pointer-events-none' : ''}`}>
//         <AliceCarousel
//           mouseTracking
//           items={items}
//           responsive={responsive}
//           disableDotsControls
//           disableButtonsControls
//           ref={aliceCarouselRef}
//           infinite
//           autoPlay={{ disableOnInteraction: false }}
//           autoPlayInterval={2000}
//         />
//         <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
//           <button className="custom-prev-button" onClick={() => aliceCarouselRef.current.slidePrev()}>&lt;</button>
//         </div>
//         <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
//           <button className="custom-next-button" onClick={() => aliceCarouselRef.current.slideNext()}>&gt;</button>
//         </div>
//       </div>

//       {/* Dynamic Service Form Modal */}
//       {showForm && selectedService && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="relative bg-white p-0 rounded-lg shadow-lg mx-auto w-full max-w-lg sm:max-w-2xl">
//             {/* Close Button */}
//             <button
//               className="absolute rounded top-3 right-3 text-green-700 hover:text-red-500 bg-gray-100 hover:bg-red-200 w-10 h-10 flex items-center justify-center shadow-xl hover:shadow-2xl shadow-red-300 transition-all"
//               onClick={() => setShowForm(false)}
//             >
//               &times;
//             </button>

//             {/* Pass Selected Service to Form */}
//             <ServiceForm selectedService={selectedService.name} fields={selectedService.fields} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Carousel;


import React, { useRef, useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Card from '../Cards/Card';
import ServiceForm from '../Forms/ServiceForm';
import config from '@/config'; // Import your config file

const Carousel = () => {
  const aliceCarouselRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch services from the API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/services`);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }

        const data = await response.json();
        setServices(data); // Set the fetched services
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Render carousel items
  const items = services.map((service, index) => (
    <div key={index} className="flex justify-center">
      <Card
        title={service.name}
        description={service.description || "No description available."}
        image={service.imageUrl} // Use the image URL from the API
        onClick={() => {
          setSelectedService(service); // Set the selected service
          setShowForm(true); // Show the form
        }}
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

      <div className={`${showForm ? 'blur-sm pointer-events-none' : ''}`}>
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

      {/* Dynamic Service Form Modal */}
      {showForm && selectedService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white p-0 rounded-lg shadow-lg mx-auto w-full max-w-lg sm:max-w-2xl">
            {/* Close Button */}
            <button
              className="absolute rounded top-3 right-3 text-green-700 hover:text-red-500 bg-gray-100 hover:bg-red-200 w-10 h-10 flex items-center justify-center shadow-xl hover:shadow-2xl shadow-red-300 transition-all"
              onClick={() => setShowForm(false)}
            >
              &times;
            </button>

            {/* Pass Selected Service to Form */}
            <ServiceForm selectedService={selectedService.name} fields={selectedService.fields} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;