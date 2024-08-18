import { Loader } from "lucide-react";
import React from "react";

function StatusCard({ title, icon, value, isLoading, bgColor, iconColor }) {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-lg bg-gray-50 py-3">
      <p className="text-sm text-gray-500">{title}</p>
      <div className="flex items-center gap-2 text-2xl font-bold">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className={`rounded-full p-2.5 ${bgColor}`}>
              {React.cloneElement(icon, { className: iconColor })}
            </div>
            {value}
          </>
        )}
      </div>
    </div>
  );
}

export default StatusCard;
