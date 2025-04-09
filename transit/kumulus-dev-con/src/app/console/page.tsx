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
import { Textarea } from "@repo/ui/components/textarea";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ui/components/alert-dialog";

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
        "type": null,
        "deploymentId":"my-id"
      };
    } else if (activeButton === "Marketplace") {
      VMversion = {
        "type": clickedMarketPlace,
        "deploymentId":"my-id"
      };
    } else {
        VMversion = {
          "type": null,
          "deploymentId": null
        };
    }

    console.log(JSON.stringify({VMversion }, null, 2));

    try {
      const response = await fetch('http://localhost:8800/create-app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ VMversion }),
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
    <div className="bg-[#f0f2f5] h-[100%] p-5 w-[90%] overflow-y-scroll">
    <Header Title="Virtual Machine Creation" />

    <div className="flex flex-row justify-between between">
      <div className="flex bg-white p-6 w-[100%]">
        <div className="flex flex-col">
          <h2 className="text-[1.5em] text-black font-bold pb-4">
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
  
      <div className="flex bg-white h-fit rounded-lg w-[100%] max-[1200px]:flex-col mb-6 mt-4 px-6">
        <div className="flex flex-col h-[100%] w-[69%] max-[1200px]:w-[100%]">
          <h2 className="text-[1.5em] text-black font-bold pb-4 py-6">Choose Size</h2>
          <div className="flex border-[#6200ee] border-2 h-[60px] rounded-lg w-[95%]">
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
          <p className="text-[1.25em] text-gray-700 w-[90%] font-medium pb-8 pt-4">
            Our decentralized cloud platform provides flexible compute options for any workload.  
            Whether you need the efficiency of a{" "}
            {(Object.keys(tooltips) as Array<keyof typeof tooltips>).map((size, index, arr) => (
              <span
                key={size}
                className="text-[#6200ee] cursor-pointer font-semibold relative"
                onMouseEnter={() => setHovered(size)}
                onMouseLeave={() => setHovered(null)}
              >
                {size}
                {index !== arr.length - 1 && ","} {/* Adds commas between items */}
                {hovered === size && (
                  <span className="bg-gray-800 rounded-lg shadow-md text-sm text-white -translate-x-1/2 absolute left-1/2 mt-2 px-3 py-1 top-full whitespace-nowrap z-50">
                    {tooltips[size]}
                  </span>
                )}
              </span>
            ))}. Start small with a <span className="text-[#6200ee] font-semibold">Nano</span> instance or scale up to <span className="text-[#6200ee] font-semibold">Large</span> for high-performance tasks.  
            If standard configurations don’t fit, our <span className="text-[#6200ee] font-semibold">Custom</span> option lets you fine-tune CPU, memory, and storage to your needs.
          </p>
        </div>
        {/* Selected Size Specifications */}
        <div className="bg-[#6200ee] w-[2px] max-[1200px]:h-[2px] max-[1200px]:w-full">
          <div className="h-full max-[1200px]:h-[2px] max-[1200px]:w-full"></div>
        </div>
        {/* <div className="bg-[#6200ee] h-[2px]">
          <div className="w-[100px"></div> 
        </div> */}
        {selectedSize && (
          
          <div className="mt-6 pb-6">
            <h4 className="text-[1.5em] text-black font-semibold pb-4 pl-6">Specifications for <strong className="text-[#6200ee]">{selectedSize} </strong></h4>
            <div className="text-[2em] font-medium pl-6">
              {selectedSize === "Custom" ? (
                <div className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="vcpus" className="text-lg font-medium">vCPUs</label>
                    <select
                      id="vcpus"
                      value={customSpecs.vcpus}
                      onChange={(e) => handleCustomSpecsChange("vcpus", e.target.value)}
                      className="border p-2 rounded-lg w-[180px] ml-2 mt-2"
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
                      className="border p-2 rounded-lg w-[180px] ml-2 mt-2"
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
                      className="border p-2 rounded-lg w-[180px] ml-2 mt-2"
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



<div className="flex flex-row align-middle rounded-lg place-content-between py-[2px]">
  <h2 className="text-[1.5em] text-red-500 font-bold pb-4">
  {errorMessage}
  </h2>
        {/* <button
          className="bg-black justify-center rounded-lg text-sm text-white active:bg-[#6200ee] active:scale-95 active:shadow-none disabled:opacity-50 duration-300 font-medium hover:scale-105 hover:shadow-lg inline-flex items-center ml-auto px-6 py-3 transition-all"
          onClick={handleSubmit} >
    Submit
  </button> */}
  {/* <Button
    onClick={() => {}}
    size="default"
    variant="default"
  > Submit </Button> */}

<AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-black text-white hover:bg-gray-900">Submit</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to finalize the VM creation?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will complete the Kumulus virtual machine setup. Once confirmed, 
            the VM will be provisioned and changes may not be reversible. Please follow these steps:
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">
            <strong>Step 1:</strong> If you don't have an SSH key, run the following command to generate one:
          </p>
          <pre className="bg-gray-100 p-2 rounded-md text-sm text-gray-800">
            ssh-keygen -t rsa -b 2048 -N "" -f ~/.ssh/id_rsa
          </pre>

          <p className="text-sm font-medium text-gray-700 mt-2">
            <strong>Step 2:</strong> After generating your SSH key, run this command to display your public key:
          </p>
          <pre className="bg-gray-100 p-2 rounded-md text-sm text-gray-800">
            cat ~/.ssh/id_rsa.pub
          </pre>

          <p className="text-sm font-medium text-gray-700 mt-2">
            <strong>Step 3:</strong> Copy the SSH public key from the output of the above command and paste it below:
          </p>

          <Textarea
            id="ssh-key"
            className="mt-2 block w-full h-32 border border-gray-300 rounded-lg p-2"
            placeholder="Paste your SSH public key here..."
            // value={sshKey}
            // onChange={(e) => setSshKey(e.target.value)} // Update SSH key on change
          />

        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Confirm Creation</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

</div>
    </div>
  );
};

export default Console;
