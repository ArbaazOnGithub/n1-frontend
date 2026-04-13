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
    <div className="select-none border shadow rounded-3xl relative pt-12 grid-cols-1 sm:h-140  bg-white md:pt-20 md:h-140 lg:top-2 xl:pt-36 lg:pb-50 lg:h-170 lg:w-full xl:pb-30 2xl:pb-56">
     
      

      <div className="relative z-10">
        <div className="pt-10 pb-10 flex-col px-6 mx-auto  lg:pb-0 lg:px-15 lg:pt-0 max-w-7xl">
          <div className="w-full lg:w-2/3 lg:pb-0 lg:h-100 xl:w-1/2">
            <h5 className="lg:hidden font-sans text-base font-normal tracking-tight text-black text-opacity-70">
              Unlock your online potential.
            </h5>
            <h4 className="hidden lg:block font-sans text-base font-normal tracking-tight text-black text-opacity-70">
              Unlock your online potential.
            </h4>
            <p className="mt-6 tracking-tighter text-black">
              <span className="font-sans font-normal text-4xl lg:text-5xl">Transforming visions</span>
              <br />
              <span className="font-serif italic font-normal text-7xl lg:text-8xl"> into digital realities.</span>
            </p>
            <p className="mt-12 font-sans text-base font-normal leading-7 text-black text-opacity-70">
              Your success is our priority. We provide tailored solutions to help your business thrive.
              Feel free to explore our services. And if you have any suggestions for us, please contact us.
            </p>
              {/* New div with image in front */}
           <div className="hidden md:block lg:block absolute top-175 md:h-100 md:w-100 md:left-120 md:top-105 lg:top-3/6 lg:ml-90 lg:h-125 lg:w-125 transform -translate-y-1/2 z-10 ">
             <img
               src={frontImage}
               alt="Front Image"
               className="w-100 h-100  rounded-full border-4 border-white"
             />
            </div>

            <div className="flex items-center mt-5 space-x-3 sm:space-x-4">
            <button 
    onClick={() => scrollToSection("services")} 
    title="Our Services"
    className="
        overflow-hidden
        isolate
        inline-flex
        items-center
        justify-center
        px-3
        py-2.5
        font-sans
        text-base
        font-semibold
        transition-all
        duration-200
        border-2 border-green-500
        !rounded-full
        sm:leading-8
        bg-white
        sm:text-lg
        text-black
        hover:bg-opacity-90
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-secondary
    "
    role="button"
>
<svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.0416 4.9192C7.37507 4.51928 6.5271 4.99939 6.5271 5.77669L6.5271 18.2232C6.5271 19.0005 7.37507 19.4806 8.0416 19.0807L18.4137 12.8574C19.061 12.469 19.061 11.5308 18.4137 11.1424L8.0416 4.9192Z"
                  />
                </svg>
    Our Services
</button>


              <button
               onClick={() => scrollToSection("contact")} 
                className="
                   overflow-hidden
                   isolate
                   inline-flex
                   items-center
                   justify-center
                   px-4
                   py-2.5
        font-sans
        text-base
        font-semibold
        transition-all
        duration-200
        border-2 border-blue-600
        !rounded-full
        sm:leading-8
        bg-white
        sm:text-lg
        text-black
        hover:bg-opacity-90
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-secondary
                "
                role="button"
              >
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.0416 4.9192C7.37507 4.51928 6.5271 4.99939 6.5271 5.77669L6.5271 18.2232C6.5271 19.0005 7.37507 19.4806 8.0416 19.0807L18.4137 12.8574C19.061 12.469 19.061 11.5308 18.4137 11.1424L8.0416 4.9192Z"
                  />
                </svg>
                Contact Us
              </button>
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
