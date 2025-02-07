import React, { useState } from "react";
import { OptionButton } from "./options";

export function SearchInput({ test }) {
  const [clicked, setClicked] = useState(false);

  const handleButtonClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
  };

  const [clickedOption, setClickedOption] = useState(null); 

  const handleOptionClick = (id) => {
    setClickedOption((prev) => (prev === id ? null : id)); 
  };


  return (
    <div className={`flex pt-12 w-[70%] flex-col ${test}`}>
      <div className="flex gap-4 ">
        <div className="flex w-[60%] max-w-sm h-12 items-center space-x-2 rounded-md border-2 border-gray-300 px-3 py-2">
          <SearchIcon className="h-4 w-4 shrink-0 text-gray-400" />
          <input
            type="search"
            placeholder="Search..."
            className="h-8 w-full border-0 bg-transparent p-0 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-0"
          />
        </div>

       <OptionButton text="Explore all options">
       </OptionButton>

      </div>

      <div className="text-[1.25em] mt-4 font-semibold text-black">
        Recommended Marketplaces
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 h-[120px] w-[100%] ">
        <div 
        onClick={() => handleOptionClick(1)}
        className={`h-[56px] w-[100%] border-2 px-2 flex gap-2 border-gray-400 rounded-lg transition-all duration-500 ease-in-out ${
          clickedOption === 1
            ? "bg-gray-400 text-white"
            : "hover:border-indigo-600 hover:text-indigo-600"
        } cursor-pointer`}
      >
          <img
            className="max-w-16"
            src="/images/odoo.png"
            alt="Logo of the odoo docker marketplace"
          />
          <div className="text-[1em] my-auto font-medium text-gray-600">ODOO Docker</div>
          <div className="text-[#6200ee] my-auto hover:underline cursor-pointer">
            info
          </div>
        </div>

        <div    
            onClick={() => handleOptionClick(2)}
            className={`h-[56px] w-[100%] border-2 px-2 flex items-center justify-start gap-2 border-gray-400 rounded-lg transition-all duration-500 ease-in-out ${
            clickedOption === 2
            ? "bg-gray-400 text-white"
            : "hover:border-indigo-600 hover:text-indigo-600"
            } cursor-pointer`}>
          <img
            className="h-[40px] w-[40px] object-fit mr-2"
            src="/images/libreoffice.webp"
            alt="Logo of the libre office marketplace"
          />
          <div className="text-[1em] my-auto font-medium text-gray-600">Libre Office on...</div>
          <div className="text-[#6200ee] my-auto hover:underline cursor-pointer">
            info
          </div>
        </div>

        <div 
         onClick={() => handleOptionClick(3)}
         className={`h-[56px] w-[100%] border-2 px-2 flex items-center justify-start gap-2 border-gray-400 rounded-lg transition-all duration-500 ease-in-out ${
           clickedOption === 3
             ? "bg-gray-400 text-white"
             : "hover:border-indigo-600 hover:text-indigo-600"
         } cursor-pointer`}>
          <img
            className="h-[40px] w-[40px] object-fit mr-2"
            src="/images/moodle.png"
            alt="Logo of the moodle marketplace"
          />
          <div className="text-[1em] my-auto font-medium text-gray-600">Moodle on...</div>
          <div className="text-[#6200ee] my-auto hover:underline cursor-pointer">
            info
          </div>
        </div>

        <div className="h-[56px] w-[100%] border-2 border-gray-400 rounded-lg"></div>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0 text-gray-400"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
