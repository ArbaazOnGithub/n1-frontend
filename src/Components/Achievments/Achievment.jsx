import React from 'react';
import { HiSquaresPlus } from "react-icons/hi2";
import { LuCircleCheckBig } from "react-icons/lu";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { FaAmazonPay } from "react-icons/fa6";

const Achievment = () => {
    return (
        <section className="select-none py-10 md:20  bg-gray-100"> {/* Adjust padding and background color */}
            <div className="container mx-auto text-center"> {/* Center content */}
                <h1 className="text-4xl font-bold mb-8">Make it all happen with freelancers</h1>
                <div className="flex flex-wrap justify-center gap-x-25"> {/* Responsive grid */}                   
                    <div className="flex w-80 mt-4 text-right "> {/* Adjust width for responsiveness */}
                        <div className="flex items-center justify-center w-30 h-16 rounded-full  mb-4   bg-gray-200 border border-gray-300 
                      shadow-[12px_12px_24px_#a1a1a1,-12px_-12px_24px_#ffffff] "> {/* Icon container */}
                            {/* Replace with your icon component or image */}
                            <LuCircleCheckBig size={30} />
                        </div>
                        <p className="font-normal mb-2 mt-3 text-xl ml-2 text-center">Enjoy a simple, easy-to-use matching experience</p>
                    </div>
                    <div className="flex w-80 mt-4 text-right "> {/* Adjust width for responsiveness */}
                        <div className="flex items-center justify-center w-30 h-16 rounded-full bg-gray-200 mb-4   border border-gray-300 
                      shadow-[12px_12px_24px_#a1a1a1,-12px_-12px_24px_#ffffff] "> {/* Icon container */}
                            {/* Replace with your icon component or image */}
                            <MdOutlineDoubleArrow size={30} />
                        </div>
                        <p className="font-normal mb-2 mt-3 text-xl ml-2 text-center">Get quality work done quickly and within budget</p>
                    </div>
                    <div className="flex w-80 mt-4 text-right "> {/* Adjust width for responsiveness */}
                        <div className="flex items-center justify-center w-18 h-16 rounded-full bg-gray-200 mb-4   border border-gray-300 
                      shadow-[12px_12px_24px_#a1a1a1,-12px_-12px_24px_#ffffff] "> {/* Icon container */}
                            {/* Replace with your icon component or image */}
                            <FaAmazonPay size={30} />
                        </div>
                        <p className="font-normal mb-2 mt-3 text-xl ml-2 text-center">Only pay when you’re happy</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Achievment;