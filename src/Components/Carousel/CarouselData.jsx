import img1 from "../../assets/Img/webdevlopment1.jpg";
import img2 from "../../assets/Img/SEO1.jpg";
import img3 from "../../assets/Img/GoogleMyBusiness1.jpg";
import img4 from "../../assets/Img/webhosting1.jpg";
import img5 from "../../assets/Img/logodesign1.jpg";
import ServiceForm from "../Forms/ServiceForm";

export const CarouselData = [
    {
        title: "Web Development",
        description: "This is the description for Card 1.",
        image: img1, // Use imported variable
        onclick:()=>{<ServiceForm/>},
    },
    {
        title: "SEO",
        description: "This is the description for Card 2.",
        image: img2,
    },
    {
        title: "Google Map Listing",
        description: "This is the description for Card 3.",
        image: img3,
    },
    {
        title: "Web Hosting",
        description: "This is the description for Card 4.",
        image: img4,
    },
    {
        title: "Logo Designing",
        description: "This is the description for Card 4.",
        image: img5,
    },
   
];


