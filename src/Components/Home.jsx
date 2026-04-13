import React, { useState, useEffect, useRef } from 'react';
import Hero from './Hero Section/Hero';
import LittleCard from './Cards/LittleCard';
import { MdComputer, MdOutlineWeb, MdAddCall } from "react-icons/md";
import { FaSortAmountUpAlt, FaRegObjectGroup } from "react-icons/fa";
import { SiGoogleads, SiGooglemaps, SiMonkeytype } from "react-icons/si";
import Carousel from './Carousel/Carousel';
import { CarouselData } from './Carousel/CarouselData';
import ApplySteps from './Apply/ApplySteps';
import Footer from './Footer/Footer';
import Achievment from './Achievments/Achievment';
import ContactUs from './ContactUs/ContactUs';
import ReviewSection from './ReviewSection';
import ChatWidget from './ChatWidget';

const Home = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    } else {
                        entry.target.classList.remove("visible"); // Remove class when out of view
                    }
                });
            },
            { threshold: 0.8 } // Adjust threshold for effect trigger
        );

        document.querySelectorAll(".littlecard, .achivment").forEach((el) => {
            observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    return (
        <>  

            
            <div>
                <Hero/>
            </div>

            {/* Little Cards Section */}
            <div className=''>
                <div className="littlecard mt-20 grid grid-cols-3 md:mt-35 md:ml-15 md:grid-cols-4 lg:grid-cols-8 lg:mt-20 gap-4">
                    {/* Little Cards */}
                    <LittleCard icon={MdComputer} title="Web Development" />
                    <LittleCard icon={FaSortAmountUpAlt} title="SEO" />
                    <LittleCard icon={FaRegObjectGroup} title="Logo Design" />
                    <LittleCard icon={SiGoogleads} title="Google Ads" />
                    <LittleCard icon={SiGooglemaps} title="Google Map Listing" />
                    <LittleCard icon={MdOutlineWeb} title="web Hosting" />
                    <div className='hidden lg:block md:block  '>
                        <LittleCard icon={SiMonkeytype} title="Data Entry" />
                    </div>
                    <div className='hidden lg:block md:block  '>
                        <LittleCard icon={MdAddCall} title="Tele Calling" />
                    </div>
                </div>
            </div>

            <div className='carousel m-5' id='services'>
                <Carousel sectionName="Services" CarouselData={CarouselData} />
            </div>
            <div className='applysteps' id='apply'>
                <ApplySteps />
            </div>
            <div className='achivment' id='achivment'>
                <Achievment />
            </div>

            {/* Reviews Section */}
            <ReviewSection />

            <div className='contact' id='contact'>
                <ContactUs />
            </div>
            {/* Footer Section */}
            <div>
                <Footer />
            </div>

            {/* Floating Chat Widget */}
            <ChatWidget />
        </>
        
    );
};

export default Home;