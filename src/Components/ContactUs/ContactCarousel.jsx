import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { PiBuildingOfficeBold } from "react-icons/pi";
import { FaMapMarkedAlt } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";

const ContactCarousel = () => {
  const swiperRef = React.useRef(null);

  return (
    <div
      className="w-full p-3"
      onMouseEnter={() => swiperRef.current.autoplay.stop()}
      onMouseLeave={() => swiperRef.current.autoplay.start()}
    >
      <Swiper
        modules={[Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        <SwiperSlide>
          <div className="flex flex-col items-center text-center">
            <PiBuildingOfficeBold className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600" />
            <h3 className="text-sm font-semibold mt-2 text-black">Company Info</h3>
            <p className="text-xs text-gray-500">N1SOLUTION LLC</p>
            <p className="text-xs text-gray-500">MO.: +919616273393</p>
          </div>
        </SwiperSlide>
        
        <SwiperSlide>
          <div className="flex flex-col items-center text-center">
            <FaMapMarkedAlt className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600" />
            <h5 className="text-sm font-semibold mt-2 text-black">Address</h5>
            <p className="text-xs text-gray-500">MUMBAI, IND</p>
            <p className="text-xs text-gray-500">Zip Code: 03875</p>
          </div>
        </SwiperSlide>
        
        <SwiperSlide>
          <div className="flex flex-col items-center text-center">
            <IoMdCall className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600" />
            <h5 className="text-sm font-semibold mt-2 text-black">Contact Us</h5>
            <p className="text-xs text-gray-500">support@n1solution.com</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ContactCarousel;
