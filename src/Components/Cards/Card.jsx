import React from "react";
import { useNavigate } from "react-router-dom";
import { findServiceByName } from "../ServiceData";

const Card = (props) => {
  const navigate = useNavigate();
  const serviceInfo = findServiceByName(props.title);
  const slug = serviceInfo?.slug;

  return (
    <div
      className="cards w-60 flex flex-col border border-slate-100 shadow-2xl hover:shadow-blue-200/50 hover:-translate-y-1 rounded-xl bg-white min-h-[21rem] cursor-pointer relative transition-all duration-300"
    >
      {/* Top-Right Border Decoration */}
      <div className="absolute top-0 right-0 h-4 w-4 border-t-4 border-r-4 border-green-500"></div>

      {/* Bottom-Left Border Decoration */}
      <div className="absolute bottom-0 left-0 h-4 w-4 border-b-4 border-l-4 border-blue-500"></div>

      {/* Dynamic Image */}
      <div>
        <img
          src={props.image}
          alt={props.alt || "Card Image"}
          className="select-none object-cover object-center rounded-t-xl w-full h-48"
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-col py-3 px-3 pb-4 flex-grow">
        <div className="select-none flex justify-between">
          <h3 className="font-bold text-black truncate">{props.title}</h3>
        </div>
        <div className="flex gap-2 mt-auto pt-3">
          {slug && (
            <button
              onClick={(e) => { e.stopPropagation(); navigate(`/services/${slug}`); }}
              className="flex-1 text-xs font-semibold px-2 py-1.5 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 transition"
            >
              Learn More
            </button>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); props.onClick && props.onClick(); }}
            className="flex-1 text-xs font-semibold px-2 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:opacity-90 transition"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
