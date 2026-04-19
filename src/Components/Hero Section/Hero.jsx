import React from "react";
//import heroImage from "../../assets/Img/Hero Section3.jpg"; // Adjust the path as per your file structure
import frontImage from "../../assets/Img/Hero Section61.jpg"; // Replace with the actual path to your image

export default function Hero() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 70,
            behavior: "smooth"
        });
    }
};
  return (
    <div className="select-none border shadow rounded-3xl relative bg-white overflow-hidden py-16 lg:py-32 xl:py-40">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-15">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h4 className="font-sans text-base font-medium tracking-wide text-blue-600 uppercase mb-4">
              Unlock your online potential.
            </h4>
            <p className="tracking-tighter text-slate-900 leading-tight">
              <span className="font-sans font-bold text-4xl lg:text-5xl xl:text-6xl block mb-2">Transforming visions</span>
              <span className="font-serif italic font-normal text-5xl lg:text-6xl xl:text-7xl block text-blue-600 pb-2">into digital realities.</span>
            </p>
            <p className="mt-8 font-sans text-lg font-normal leading-relaxed text-slate-600 max-w-lg">
              Your success is our priority. We provide tailored solutions to help your business thrive.
              Feel free to explore our services. And if you have any suggestions for us, please contact us.
            </p>

            <div className="flex flex-wrap items-center mt-10 gap-4">
              <button 
                onClick={() => scrollToSection("services")} 
                title="Our Services"
                className="premium-button flex items-center"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.0416 4.9192C7.37507 4.51928 6.5271 4.99939 6.5271 5.77669L6.5271 18.2232C6.5271 19.0005 7.37507 19.4806 8.0416 19.0807L18.4137 12.8574C19.061 12.469 19.061 11.5308 18.4137 11.1424L8.0416 4.9192Z"/>
                </svg>
                Our Services
              </button>

              <button
                onClick={() => scrollToSection("contact")} 
                className="premium-button-outline flex items-center"
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="hidden md:flex w-full lg:w-1/2 justify-center lg:justify-end items-center relative mt-12 lg:mt-0">
             <div className="relative w-72 h-72 lg:w-96 lg:h-96 xl:w-[450px] xl:h-[450px] rounded-full p-2 bg-gradient-to-tr from-blue-100 to-violet-100 shadow-2xl animate-float">
               <img
                 src={frontImage}
                 alt="Hero Display"
                 loading="lazy"
                 className="w-full h-full object-cover rounded-full border-4 border-white"
               />
             </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}



















// import React from "react";
// import heroImage from "../../assets/Img/Hero Section3.jpg"; // Adjust the path as per your file structure
// import frontImage from "../../assets/Img/Hero Section6.jpg"; // Replace with the actual path to your image

// export default function Hero() {
//   return (
//     <div className="border shadow rounded-3xl relative pt-12 pb-12 bg-white xl:pt-36 sm:pb-16 lg:pb-32 xl:pb-30 2xl:pb-56">
     
//       {/* New div with image in front */}
//       <div className="absolute right-10 top-1/2 transform -translate-y-1/2 z-10">
//         <img
//           src={frontImage}
//           alt="Front Image"
//           className="w-120 h-120 rounded-full border-4 border-white "
//         />
//       </div>

//       <div className="relative z-10">
//         <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
//           <div className="w-full lg:w-2/3 xl:w-1/2">
//             <h4 className="font-sans text-base font-normal tracking-tight text-black text-opacity-70">
//               Unlock your online potential.
//             </h4>
//             <p className="mt-6 tracking-tighter text-black">
//               <span className="font-sans font-normal text-5xl">Transforming visions</span>
//               <br />
//               <span className="font-serif italic font-normal text-8xl"> into digital realities.</span>
//             </p>
//             <p className="mt-12 font-sans text-base font-normal leading-7 text-black text-opacity-70">
//               Your success is our priority. We provide tailored solutions to help your business thrive.
//               Feel free to explore our services. And if you have any suggestions for us, please contact us.
//             </p>

//             <div className="flex items-center mt-5 space-x-3 sm:space-x-4">
//               <a
//                 href="#"
//                 title=""
//                 className="
//                   inline-flex
//                   items-center
//                   justify-center
//                   px-5
//                   py-2
//                   font-sans
//                   text-base
//                   font-semibold
//                   transition-all
//                   duration-200
//                   border-2 border-green
//                   rounded-full
//                   sm:leading-8
//                   bg-white
//                   sm:text-lg
//                   text-black
//                   hover:bg-opacity-90
//                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-secondary
//                 "
//                 role="button"
//               >
//                 Our Services
//               </a>

//               <a
//                 href="#"
//                 title=""
//                 className="
//                   inline-flex
//                   items-center
//                   justify-center
//                   px-5
//                   py-2
//                   font-sans
//                   text-base
//                   font-semibold
//                   transition-all
//                   duration-200
//                   bg-transparent
//                   border-2
//                   rounded-full
//                   sm:leading-8
//                   text-black
//                   border-primary
//                   hover:bg-white
//                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
//                   hover:text-black
//                   sm:text-lg
//                   focus:ring-offset-secondary
//                 "
//                 role="button"
//               >
//                 <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
//                   <path
//                     fillRule="evenodd"
//                     clipRule="evenodd"
//                     d="M8.0416 4.9192C7.37507 4.51928 6.5271 4.99939 6.5271 5.77669L6.5271 18.2232C6.5271 19.0005 7.37507 19.4806 8.0416 19.0807L18.4137 12.8574C19.061 12.469 19.061 11.5308 18.4137 11.1424L8.0416 4.9192Z"
//                   />
//                 </svg>
//                 Contact Us
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
