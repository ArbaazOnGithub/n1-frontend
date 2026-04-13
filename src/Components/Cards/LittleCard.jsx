import React from "react";

const LittleCard = (props) => {
  return (
    <div className=" select-none h-30 w-30 p-1 border shadow rounded-lg border-b-blue-300 border-t-cyan-200 bg-white flex flex-col items-center justify-between">
      {/* Icon from props */}
      {props.icon && <props.icon className="text-4xl text-blue-500 mt-3" />}
      {/* Title from props */}
      <p className="m-2 text-sm font-semibold text-gray-700 text-center">{props.title}</p>
    </div>
  );
};

export default LittleCard;
