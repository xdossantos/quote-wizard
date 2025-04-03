import React from "react";

const Skeleton = () => {
  return (
    <div className="w-[450px] flex flex-col items-center p-[25px] bg-white rounded-[10px] gap-[25px]">
      {/* Title Skeleton */}
      <div className="w-[150px] h-[28px] bg-gray-200 rounded animate-pulse" />

      {/* Description Skeleton */}
      <div className="w-full h-[22px] bg-gray-200 rounded animate-pulse" />

      {/* Amount Section */}
      <div className="w-full flex flex-col gap-[12px]">
        <div className="h-[1px] w-full bg-[#E3E8EE]" />
        <div className="flex items-center w-full">
          <div className="flex-1 h-[22px] bg-gray-200 rounded animate-pulse" />
          <div className="w-[100px] h-[22px] bg-gray-200 rounded animate-pulse ml-2" />
          <div className="w-[40px] h-[24px] bg-gray-200 rounded animate-pulse ml-[16px]" />
        </div>

        {/* Address Section */}
        <div className="h-[1px] w-full bg-[#E3E8EE]" />
        <div className="flex items-center w-full">
          <div className="flex-1 h-[22px] bg-gray-200 rounded animate-pulse" />
          <div className="w-[120px] h-[22px] bg-gray-200 rounded animate-pulse ml-2" />
          <div className="w-[40px] h-[24px] bg-gray-200 rounded animate-pulse ml-[16px]" />
        </div>

        {/* QR Code Skeleton */}
        <div className="flex flex-col items-center gap-[12px] pt-[12px]">
          <div className="w-[140px] h-[140px] bg-gray-200 rounded animate-pulse" />
          <div className="w-[200px] h-[16px] bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Timer Section */}
        <div className="h-[1px] w-full bg-[#E3E8EE]" />
        <div className="flex items-center w-full">
          <div className="flex-1 h-[22px] bg-gray-200 rounded animate-pulse" />
          <div className="w-[80px] h-[22px] bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-[1px] w-full bg-[#E3E8EE]" />
      </div>
    </div>
  );
};

export default Skeleton;
