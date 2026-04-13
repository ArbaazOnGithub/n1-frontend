import React from "react";

const Card = (props) => {
  return (
    <div
      className="cards w-60 flex flex-col border shadow-2xl hover:scale-90 rounded-xl bg-white min-h-[19rem] cursor-pointer relative"
      onClick={props.onClick} // Trigger form when clicked
    >
      {/* Top-Right Border Decoration */}
      <div className="absolute top-0 right-0 h-4 w-4 border-t-4 border-r-4  border-green-500"></div>

      {/* Bottom-Left Border Decoration */}
      <div className="absolute bottom-0 left-0 h-4 w-4 border-b-4 border-l-4 border-blue-500 "></div>

      {/* Dynamic Image */}
      <div >
        <img
          src={props.image} // Dynamic image from props
          alt={props.alt || "Card Image"} // Alt text with fallback
          className="select-none object-cover object-center rounded-t-xl w-full h-48"
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-col py-3 px-3 pb-10 h-24">
        <div className="select-none flex justify-between">
          <h3 className="font-bold text-black truncate">{props.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
