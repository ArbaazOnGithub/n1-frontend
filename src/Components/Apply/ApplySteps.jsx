import React, { useState, useRef } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import HeroImage from '../../assets/Img/Howtoapply1.jpg';
import { FaUserPlus } from "react-icons/fa";
import { PiCards } from "react-icons/pi";
import { SiGoogleforms } from "react-icons/si";
import { TbHandClick } from "react-icons/tb";

const ApplySteps = () => {
    const aliceCarouselRef = useRef(null);
    const [currentStep, setCurrentStep] = useState(0);

    const applyStepsData = [
        {
            icon: <FaUserPlus size={40} />,
            title: "Step 1: Login or Register",
            description: "If you're a new user, register for an account. Otherwise, log in.",
        },
        {
            icon: <PiCards size={40} />,
            title: "Step 2: Choose a Service",
            description: "Browse our services and select the one that meets your needs.",
        },
        {
            icon: <SiGoogleforms size={40} />,
            title: "Step 3: Fill Up the Form",
            description: "Provide the necessary information in the application form.",
        },
        {
            icon: <TbHandClick size={40} />,
            title: "Step 4: Click Apply",
            description: "Submit your application by clicking the 'Apply' button.",
        },
    ];

    const items = applyStepsData.map((step, index) => (
        <div key={index} className="flex justify-center items-center h-full px-4">
            <div className="relative w-full max-w-md p-6 border bg-white border-gray-200 shadow-xl rounded-xl">
                <div className="absolute top-0 right-0 h-6 w-6 border-t-4 border-r-4 border-blue-500"></div>
                <div className="absolute bottom-0 left-0 h-6 w-6 border-b-4 border-l-4 border-green-500 "></div>
                <span className="absolute right-4 top-4 rounded-full px-3 py-2 bg-green-300 text-green-700 font-medium text-sm">
                    {index + 1}
                </span>
                <div className="mt-4 text-blue-900">
                    {step.icon}
                    <h5 className="mt-4 text-xl font-bold text-gray-300">{step.title}</h5>
                    <p className="mt-2 text-sm">{step.description}</p>
                </div>
            </div>
        </div>
    ));

    const responsive = {
        0: { items: 1 },
    };

    const nextSlide = () => {
        aliceCarouselRef.current.slideNext();
        setCurrentStep(prev => Math.min(prev + 1, applyStepsData.length - 1));
    };

    const prevSlide = () => {
        aliceCarouselRef.current.slidePrev();
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };

    return (
        <section className="select-none py-18 shadow-2xl">
            <p className='font-serif italic font-normal text-4xl z-10 ml-4 lg:text-black lg:ml-12 text-center lg:text-left'>How to apply for the Service?</p>
            <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center">

                <div className="lg:w-1/2 lg:pr-16 mb-12 lg:mb-0 w-full px-4">
                    <img
                        src={HeroImage}
                        alt="Hero Image"
                        className="w-full rounded-lg"
                    />
                </div>

                <div className="lg:w-1/2 relative w-full px-4">
                    <AliceCarousel
                        mouseTracking
                        items={items}
                        responsive={responsive}
                        disableDotsControls
                        disableButtonsControls
                        ref={aliceCarouselRef}
                    />
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
                        <button className="prev-button" onClick={prevSlide} disabled={currentStep === 0}>&lt;</button>
                    </div>
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
                        <button className="next-button" onClick={nextSlide} disabled={currentStep === applyStepsData.length - 1}>&gt;</button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ApplySteps;