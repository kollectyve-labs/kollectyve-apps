import React, { useState, useEffect } from "react";
import { OptionButton } from "./options";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@repo/ui/components/hover-card";


export function SearchInput({ activeMarketplace, onMarketplaceChange }) { 
  const [clicked, setClicked] = useState(false);
  const [localSelectedMarketplace, setLocalSelectedMarketplace] = useState(activeMarketplace || null); // Local state

  useEffect(() => {
    setLocalSelectedMarketplace(activeMarketplace || null); // Update local state when activeMarketplace prop changes
  }, [activeMarketplace]);

  const handleButtonClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
  };

  const handleOptionClick = (marketplace) => {
    if (localSelectedMarketplace === marketplace) {
      setLocalSelectedMarketplace(null); // Deselect if already selected
      onMarketplaceChange(null); // Inform parent
    } else {
      setLocalSelectedMarketplace(marketplace);
      onMarketplaceChange(marketplace); // Inform parent
    }
  };

  return (
    <div className={`flex pt-12 w-[100%] overflow-auto flex-col ${localSelectedMarketplace}`}>
      <div className="flex gap-4">
        <div className="flex border-2 border-gray-300 h-12 rounded-md w-[50%] items-center max-w-sm px-3 py-2 space-x-2">
          <SearchIcon className="h-4 text-gray-400 w-4 shrink-0" />
          <input
            type="search"
            placeholder="Search..."
            className="bg-transparent border-0 h-8 p-0 text-gray-900 text-sm w-full focus:outline-none focus:ring-0 placeholder:text-gray-500"
          />
        </div>

        <OptionButton text="Explore all options"></OptionButton>
      </div>

      <div className="text-[1.25em] text-black font-semibold mt-4">
        Recommended Marketplaces
      </div>

      <div className="flex flex-row flex-wrap h-[120px] w-[100%] gap-2 mt-2">
        <div
          onClick={() => handleOptionClick("wordpress")}
          className={`h-[56px]  w-[320px] border-2 px-2 flex items-center justify-start gap-2 border-gray-400 rounded-lg transition-all duration-500 ease-in-out ${
            localSelectedMarketplace === "wordpress"
              ? "bg-gray-400 text-white"
              : "hover:border-indigo-600 hover:text-indigo-600"
          } cursor-pointer`}
        >
          <img
            className="h-[40px] w-[40px] mr-2 object-fit"
            src="/images/wordpress.png"
            alt="Logo of the wordpress marketplace"
          />
          <div className="text-[1em] text-gray-600 font-medium my-auto">
            Wordpress on...
          </div>
          <div className="text-[#6200ee] cursor-pointer hover:underline my-auto">
          <HoverCard>
    <HoverCardTrigger>Info</HoverCardTrigger>
    <HoverCardContent>
      <div className="text-gray-700 text-sm">
        <p>
          <strong>WordPress</strong> is a powerful content management system (CMS) that powers over <strong>43% of the web</strong>.  
        </p>
        <p className="mt-2">
          It is open-source and allows users to build websites, blogs, and even e-commerce stores with <strong>plugins</strong> and <strong>themes</strong>.
        </p>
        <p className="mt-2">
          <strong>Key Features:</strong>
        </p>
        <ul className="list-disc list-inside">
          <li>Highly customizable</li>
          <li>SEO-friendly</li>
          <li>Huge plugin ecosystem</li>
          <li>Supports e-commerce with WooCommerce</li>
        </ul>
        <p className="mt-2">
          Learn more at <a href="https://wordpress.org" target="_blank" className="text-blue-500 hover:underline">WordPress.org</a>.
        </p>
      </div>
    </HoverCardContent>
  </HoverCard>

          </div>
        </div>

        <div
          // onClick={() => handleOptionClick("odoo")}
  className={`group relative h-[56px] w-[320px] border-2 px-2 flex gap-2 border-gray-400 rounded-lg transition-all duration-500 ease-in-out ${
    localSelectedMarketplace === "odoo"
      ? "bg-gray-400 text-white"
      : "hover:border-indigo-600 hover:text-indigo-600"
  } cursor-pointer`}
>
  <img
    className="max-w-16"
    src="/images/odoo.png"
    alt="Logo of the odoo docker marketplace"
  />
  <div className="text-[1em] text-gray-600 font-medium my-auto">
    ODOO Docker
  </div>
  <div className="text-[#6200ee] cursor-pointer hover:underline my-auto">
  <HoverCard>
    <HoverCardTrigger>Info</HoverCardTrigger>
    <HoverCardContent className="z-50">
      <div className="text-gray-700 text-sm">
        <p>
          <strong>Odoo</strong> is an open-source suite of business applications that includes <strong>CRM, eCommerce, accounting, inventory, and more</strong>.
        </p>
        <p className="mt-2">
          Running Odoo in <strong>Docker</strong> allows for easy deployment, scalability, and containerized management.
        </p>
        <p className="mt-2">
          <strong>Key Features:</strong>
        </p>
        <ul className="list-disc list-inside">
          <li>Modular and customizable ERP system</li>
          <li>Scalable with Docker containers</li>
          <li>Supports PostgreSQL database</li>
          <li>Community and Enterprise editions available</li>
        </ul>
        <p className="mt-2">
          Learn more at <a href="https://www.odoo.com" target="_blank" className="text-blue-500 hover:underline">Odoo.com</a>.
        </p>
      </div>
    </HoverCardContent>
  </HoverCard>
  </div>
  
  {/* Tooltip Span */}
  <span
    className="bg-gray-800 rounded-lg shadow-md text-sm text-white -translate-x-1/2 absolute duration-300 group-hover:opacity-100 left-1/2 mt-2 opacity-0 pointer-events-none px-3 py-1 top-full transition-opacity whitespace-nowrap z-30"
  >
    In the works
  </span>
</div>


<div
  // onClick={() => handleOptionClick("libreoffice")}
  className={`group relative h-[56px] w-[320px] border-2 px-2 flex items-center justify-start gap-2 border-gray-400 rounded-lg transition-all duration-500 ease-in-out ${
    localSelectedMarketplace === "libreoffice"
      ? "bg-gray-400 text-white"
      : "hover:border-indigo-600 hover:text-indigo-600"
  } cursor-pointer`}
>
  <img
    className="h-[40px] w-[40px] mr-2 object-fit"
    src="/images/libreoffice.webp"
    alt="Logo of the libre office marketplace"
  />
  <div className="text-[1em] text-gray-600 font-medium my-auto">
    LibreOffice on...
  </div>
  <div className="text-[#6200ee] cursor-pointer hover:underline my-auto">
  <HoverCard className="z-50">
    <HoverCardTrigger>Info</HoverCardTrigger>
    <HoverCardContent>
      <div className="text-gray-700 text-sm">
        <p>
          <strong>LibreOffice</strong> is a <strong>free and open-source office suite</strong> that includes applications for <strong>word processing, spreadsheets, presentations, and more</strong>.
        </p>
        <p className="mt-2">
          It is a powerful alternative to Microsoft Office, supporting <strong>ODF (OpenDocument Format)</strong> and various proprietary formats.
        </p>
        <p className="mt-2">
          <strong>Key Features:</strong>
        </p>
        <ul className="list-disc list-inside">
          <li>Includes Writer (Word), Calc (Excel), Impress (PowerPoint), and more</li>
          <li>Supports multiple file formats, including DOCX, XLSX, and PPTX</li>
          <li>Available on Windows, macOS, and Linux</li>
          <li>Community-driven with regular updates</li>
        </ul>
        <p className="mt-2">
          Learn more at <a href="https://www.libreoffice.org" target="_blank" className="text-blue-500 hover:underline">LibreOffice.org</a>.
        </p>
      </div>
    </HoverCardContent>
  </HoverCard>
  </div>

  {/* Tooltip Span */}
  <span
    className="bg-gray-800 rounded-lg shadow-md text-sm text-white -translate-x-1/2 absolute duration-300 group-hover:opacity-100 left-1/2 mt-2 opacity-0 pointer-events-none px-3 py-1 top-full transition-opacity whitespace-nowrap z-40">
    In the works
  </span>
</div>


        {/* <div
          // onClick={() => handleOptionClick("moodle")}
          className={`h-[56px]  w-[320px] border-2 px-2 flex items-center justify-start gap-2 border-gray-400 rounded-lg transition-all duration-500 ease-in-out ${
            localSelectedMarketplace === "moodle"
              ? "bg-gray-400 text-white"
              : "hover:border-indigo-600 hover:text-indigo-600"
          } cursor-pointer`}
        >
          <img
            className="h-[40px] w-[40px] mr-2 object-fit"
            src="/images/moodle.png"
            alt="Logo of the moodle marketplace"
          />
          <div className="text-[1em] text-gray-600 font-medium my-auto">
            Moodle on...
          </div>
          <div className="text-[#6200ee] cursor-pointer hover:underline my-auto">
            info
          </div>
        </div> */}

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
      className="h-4 text-gray-400 w-4 shrink-0"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}