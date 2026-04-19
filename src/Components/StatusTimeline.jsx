import React from "react";

const StatusTimeline = ({ currentStatus }) => {
  const statuses = ["Pending", "In Progress", "Completed"];
  
  const getStatusIndex = (status) => {
    const s = status?.toLowerCase();
    if (s === "pending") return 0;
    if (s === "in progress") return 1;
    if (s === "completed") return 2;
    return -1; // For cancelled or unknown
  };

  const currentIndex = getStatusIndex(currentStatus);
  const isCancelled = currentStatus?.toLowerCase() === "cancelled";

  return (
    <div className="w-full py-6">
      <div className="relative flex items-center justify-between">
        {/* Progress Line Background */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
        
        {/* Active Progress Line */}
        {!isCancelled && currentIndex >= 0 && (
          <div 
            className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 -translate-y-1/2 z-0 transition-all duration-700 ease-in-out"
            style={{ width: `${(currentIndex / (statuses.length - 1)) * 100}%` }}
          ></div>
        )}

        {statuses.map((status, index) => {
          const isActive = index <= currentIndex && !isCancelled;
          const isCurrent = index === currentIndex && !isCancelled;
          
          return (
            <div key={status} className="relative z-10 flex flex-col items-center">
              {/* Dot */}
              <div 
                className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                  isActive 
                    ? "bg-white border-blue-500 scale-125" 
                    : "bg-white border-slate-300"
                } ${isCurrent ? "ring-4 ring-blue-100" : ""}`}
              >
                {isActive && (
                  <div className="w-full h-full rounded-full bg-blue-500 scale-50"></div>
                )}
              </div>
              
              {/* Label */}
              <span 
                className={`absolute -bottom-6 whitespace-nowrap text-[10px] font-bold uppercase tracking-wider transition-colors duration-500 ${
                  isActive ? "text-blue-600" : "text-slate-400"
                }`}
              >
                {status}
              </span>
            </div>
          );
        })}
      </div>

      {isCancelled && (
        <div className="mt-8 text-center">
          <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-100 uppercase tracking-widest">
            Order Cancelled
          </span>
        </div>
      )}
    </div>
  );
};

export default StatusTimeline;
