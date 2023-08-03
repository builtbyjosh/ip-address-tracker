import React from "react";

const InfoBar = ({ mapData }) => {
  const { city, region, postalCode, timezone } = mapData.location;
  return (
    <div className="flex flex-col md:flex-row center border rounded-xl p-6  bg-white">
      <div className="flex flex-col items-center px-4">
        <p className="text-gray-500">IP ADDRESS</p>
        <p className="text-lg font-bold">{mapData.ip}</p>
      </div>
      <div className="border-l"></div>
      <div className="flex flex-col items-center px-4">
        <p className="text-gray-500">LOCATION</p>
        <p className="text-lg font-bold">{`${city}, ${region}`}</p>
        <p className="text-lg font-bold">{postalCode}</p>
      </div>
      <div className="border-l"></div>
      <div className="flex flex-col items-center px-4">
        <p className="text-gray-500">TIMEZONE</p>
        <p className="text-lg font-bold">UTC {timezone}</p>
      </div>
      <div className="border-l"></div>
      <div className="flex flex-col items-center px-4">
        <p className="text-gray-500">ISP</p>
        <p className="text-lg font-bold">{mapData.isp}</p>
      </div>
    </div>
  );
};

export default InfoBar;
