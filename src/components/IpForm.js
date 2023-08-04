import React from "react";
import iconArrow from "../images/icon-arrow.svg";

const IpForm = ({ mapData, setipAddress }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const newIpAddress = e.target.elements.search.value;
    setipAddress(newIpAddress);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="relative mx-auto sm:w-full lg:w-1/2 my-5">
        <input
          type="search"
          name="search"
          className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-xl focus:outline-none"
          defaultValue={mapData.ip}
          required
        />
        <button
          type="submit"
          className="absolute top-0 right-0 p-2.5 h-full text-sm  text-white bg-very-dark-gray rounded-r-lg border  hover:bg-dark-gray "
        >
          <img src={iconArrow} alt="Arrow Icon" className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

export default IpForm;
