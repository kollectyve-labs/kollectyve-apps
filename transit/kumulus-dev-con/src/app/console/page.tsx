"use client";

import React, { useState, useRef } from "react";
import Region from "../components/buttons/region";
import Header from "../components/dashcompo/header";
import { CustomSelectDemo } from "../components/buttons/dropdown";
import { ImageButton } from "../components/buttons/imageButton";
import SelectableButtons from "../components/buttons/osSelectButtons";
import { SearchInput } from "../components/buttons/search";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel } from '../components/select/select';
import { Button } from "@repo/ui/components/button";


const sizes: string[] = ['Nano', 'Micro', 'Small', 'Medium', 'Large', 'Custom'];

const tooltips: Record<"Nano" | "Micro" | "Small" | "Medium" | "Large" | "Custom", string> = {
  Nano: "2 vCPUs, 2GB RAM, 10GB Storage",
  Micro: "2 vCPUs, 4GB RAM, 20GB Storage",
  Small: "4 vCPUs, 8GB RAM, 80GB Storage",
  Medium: "8 vCPUs, 16GB RAM, 160GB Storage",
  Large: "16 vCPUs, 32GB RAM, 320GB Storage",
  Custom: "Define your own CPU, RAM, Storage, and optional GPU specs",
};

type Size = 'Nano' | 'Micro' | 'Small' | 'Medium' | 'Large' | 'Custom';

const specs: Record<Size, { vcpus: string; ram: string; storage: string }> = {
  Nano: { vcpus: '2', ram: '2GB', storage: '10GB' },
  Micro: { vcpus: '4', ram: '4GB', storage: '20GB' },
  Small: { vcpus: '6', ram: '8GB', storage: '50GB' },
  Medium: { vcpus: '8', ram: '16GB', storage: '100GB' },
  Large: { vcpus: '16', ram: '32GB', storage: '200GB' },
  Custom: { vcpus: 'N/A', ram: 'N/A', storage: 'N/A' },
};

interface VMRequest {
  username: string | null;
  sshKey: string | null;
  cpu: number;
  memory: string;
  disk: string;
}

const Console: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string>("OS");
  const [hovered, setHovered] = useState<keyof typeof tooltips | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size>('Nano'); 
  const [selectedOS, setSelectedOS] = useState<string | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [clickedMarketPlace, setClickedMarketPlace] = useState<string | null>(null);

  const [errorMessage, setErrorMessage] = useState('');

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const [selected, setSelected] = useState<string | null>(null);

  const [customSpecs, setCustomSpecs] = useState({
    vcpus: "2",
    ram: "2GB",
    storage: "10GB",
  });

  const handleCustomSpecsChange = (type: string, value: string) => {
    setCustomSpecs((prev) => ({ ...prev, [type]: value }));
  };

  const handleSelectionChange = (os: string , version: string) => {
    setSelectedOS(os);
    setSelectedVersion(version);
  };

  const handleMarketplaceClick = (marketplace: string) => {
    setClickedMarketPlace(marketplace);
    setActiveButton('Marketplace');
  };

  const handleMarketplaceChange = (marketplace: string | null) => {
    setClickedMarketPlace(marketplace);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {

    let missingFields = [];

    if (!selectedOS && activeButton === "OS") {
      missingFields.push("Operating System");
    }
    if (!selectedVersion && activeButton === "OS") {
      missingFields.push("Operating System Version");
    }
    if (!clickedMarketPlace && activeButton === "Marketplace") {
      missingFields.push("Marketplace Item");
    }

    if (selectedSize === "Custom") {
      if (!customSpecs.vcpus) {
        missingFields.push("Custom vCPUs");
      }
      if (!customSpecs.ram) {
        missingFields.push("Custom RAM");
      }
      if (!customSpecs.storage) {
        missingFields.push("Custom Storage");
      }
    }

    if (missingFields.length > 0) {
      setErrorMessage(`Please fill in the following missing information: ${missingFields.join(", ")}`);
      return;
    }

    setErrorMessage("");

    let VMRequest: VMRequest;
    if (selectedSize === "Custom") {
      VMRequest = {
        username: null,
        sshKey: null,
        cpu: parseInt(customSpecs.vcpus),
        memory: customSpecs.ram,
        disk: customSpecs.storage,
      };
    } else {
      VMRequest = {
        username: null,
        sshKey: null,
        cpu: parseInt(specs[selectedSize].vcpus),
        memory: specs[selectedSize].ram,
        disk: specs[selectedSize].storage,
      };
    }

    let VMversion;
    if (activeButton === "OS") {
      VMversion = {
        OS: selectedOS,
        version: selectedVersion,
        marketplace: null,
      };
    } else if (activeButton === "Marketplace") {
      VMversion = {
        OS: selectedOS,
        version: selectedVersion,
        marketplace: clickedMarketPlace,
      };
    } else {
        VMversion = {
            OS: null,
            version: null,
            marketplace: null,
        };
    }

    console.log(JSON.stringify({ VMRequest, VMversion }, null, 2));

    try {
      const response = await fetch('/api/createVM', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ VMRequest, VMversion }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to create VM.');
        throw new Error('Failed to create VM');
      }

      const data = await response.json();
      console.log('VM created:', data);
      // Handle success (e.g., show a success message)

    } catch (error) {
      console.error('Error creating VM:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="w-[90%] h-[100%] bg-[#f0f2f5] p-5 overflow-y-scroll">
    <Header Title="Virtual Machine Creation" />

    <div className="flex flex-row between justify-between">
      <div className="bg-white w-[100%] p-6 flex">
        <div className="flex flex-col">
          <h2 className="font-bold text-[1.5em] text-black pb-4">
            Choose an Image
          </h2>
          <div className="flex flex-col gap-2">
            {["OS", "Marketplace", "Backups", "Custom Images"].map((btn) => (
              <ImageButton
                key={btn}
                text={btn}
                ON={activeButton === btn}
                onClick={() => handleButtonClick(btn)}
              />
            ))}
          </div>
        </div>
  
          <div className="w-[5%]"></div>
  
          {activeButton === "OS" && <SelectableButtons
            activeOS={selectedOS}
            activeVersion={selectedVersion}
            onSelectionChange={handleSelectionChange}
          />}
  
          {activeButton === "Marketplace" && (
            <SearchInput
              activeMarketplace={clickedMarketPlace}
              onMarketplaceChange={handleMarketplaceChange}
            />
          )}
        </div>
      </div>
  
      <div className="bg-white px-6  w-[100%] h-fit mt-4 flex max-[1200px]:flex-col rounded-lg mb-6">
        <div className="w-[69%] h-[100%] flex flex-col max-[1200px]:w-[100%] ">
          <h2 className="font-bold py-6 text-[1.5em] text-black pb-4">Choose Size</h2>
          <div className="w-[95%] h-[60px] border-2 border-[#6200ee] flex rounded-lg">
            {sizes.map((size, index) => (
              <div
                key={size}
                className={`h-full w-[20%] text-[1.125em] font-sans font-medium flex justify-center items-center cursor-pointer transition-all duration-300 ease-in-out
                  ${index !== sizes.length - 1 ? 'border-r-2 border-[#6200ee]' : ''} 
                  ${selected === size ? 'bg-[#6200ee] text-white' : 'bg-transparent'} 
                  hover:border-gray-400`}
                onClick={() => {
                  setSelected(size);
                  setSelectedSize(size as Size); // Cast string to Size
                }}
              >
                {size}
              </div>
            ))}
          </div>
          <p className="text-gray-700 text-[1.25em] w-[90%] pb-8 font-medium pt-4">
            Our decentralized cloud platform provides flexible compute options for any workload.  
            Whether you need the efficiency of a{" "}
            {(Object.keys(tooltips) as Array<keyof typeof tooltips>).map((size, index, arr) => (
              <span
                key={size}
                className="relative text-[#6200ee] font-semibold cursor-pointer"
                onMouseEnter={() => setHovered(size)}
                onMouseLeave={() => setHovered(null)}
              >
                {size}
                {index !== arr.length - 1 && ","} {/* Adds commas between items */}
                {hovered === size && (
                  <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg shadow-md whitespace-nowrap z-50">
                    {tooltips[size]}
                  </span>
                )}
              </span>
            ))}. Start small with a <span className="text-[#6200ee] font-semibold">Nano</span> instance or scale up to <span className="text-[#6200ee] font-semibold">Large</span> for high-performance tasks.  
            If standard configurations don’t fit, our <span className="text-[#6200ee] font-semibold">Custom</span> option lets you fine-tune CPU, memory, and storage to your needs.
          </p>
        </div>
        {/* Selected Size Specifications */}
        <div className="w-[2px] bg-[#6200ee]  max-[1200px]:h-[2px] max-[1200px]:w-full ">
          <div className="h-full max-[1200px]:h-[2px] max-[1200px]:w-full  "></div>
        </div>
        {/* <div className="h-[2px]  bg-[#6200ee] ">
          <div className="w-[100px"></div> 
        </div> */}
        {selectedSize && (
          
          <div className="mt-6 pb-6">
            <h4 className="font-semibold text-[1.5em] text-black pl-6 pb-4 ">Specifications for <strong className="text-[#6200ee]">{selectedSize} </strong></h4>
            <div className="pl-6 font-medium text-[2em]">
              {selectedSize === "Custom" ? (
                <div className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="vcpus" className="text-lg font-medium">vCPUs</label>
                    <select
                      id="vcpus"
                      value={customSpecs.vcpus}
                      onChange={(e) => handleCustomSpecsChange("vcpus", e.target.value)}
                      className="w-[180px] ml-2 p-2 border rounded-lg mt-2"
                    >
                      <option value="2">2 vCPUs</option>
                      <option value="4">4 vCPUs</option>
                      <option value="8">8 vCPUs</option>
                      <option value="16">16 vCPUs</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="ram" className="text-lg font-medium">RAM</label>
                    <select
                      id="ram"
                    
                      value={customSpecs.ram}
                      onChange={(e) => handleCustomSpecsChange("ram", e.target.value)}
                      className="w-[180px] ml-2 p-2 border rounded-lg mt-2"
                    >
                      <option value="2GB">2GB</option>
                      <option value="4GB">4GB</option>
                      <option value="8GB">8GB</option>
                      <option value="16GB">16GB</option>
                      <option value="32GB">32GB</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="storage" className="text-lg font-medium">Storage</label>
                    <select
                      id="storage"
                      value={customSpecs.storage}
                      onChange={(e) => handleCustomSpecsChange("storage", e.target.value)}
                      className="w-[180px] ml-2 p-2 border rounded-lg mt-2"
                    >
                      <option value="10GB">10GB</option>
                      <option value="20GB">20GB</option>
                      <option value="50GB">50GB</option>
                      <option value="100GB">100GB</option>
                      <option value="200GB">200GB</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div>
                  <h4 className="mr-auto">{specs[selectedSize as Size].vcpus} vCPUs</h4>
                  <h4 className="mr-auto">{specs[selectedSize as Size].ram} RAM</h4>
                  <h4 className="mr-auto">{specs[selectedSize as Size].storage} Storage</h4>
                </div>
              )}
            </div>
          </div>
        )}
      </div>



<div className="py-[2px] rounded-lg flex flex-row place-content-between align-middle">
  <h2 className="font-bold text-[1.5em] text-red-500 pb-4">
  {errorMessage}
  </h2>
        {/* <button
          className="inline-flex ml-auto items-center justify-center rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 active:bg-[#6200ee] active:shadow-none disabled:opacity-50"
          onClick={handleSubmit} >
    Submit
  </button> */}
  <Button
    onClick={() => {}}
    size="default"
    variant="default"
  > Submit </Button>
</div>
    </div>
  );
};

export default Console;
