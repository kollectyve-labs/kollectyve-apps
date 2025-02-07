"use client"; 

import Region from "../components/buttons/region";
import Header from "../components/dashcompo/header";
// import usFlag from "next/image";
// import snFlag from "../images/sn.png";
// import frFlag from "../images/fr.png";
import { CustomSelectDemo } from "../components/buttons/dropdown";
import { ImageButton } from "../components/buttons/imageButton";
import { useState } from "react";
import React from "react";
import SelectableButtons from "../components/buttons/osSelectButtons";
import { SearchInput } from "../components/buttons/search";

const sizes: string[] = ['Small', 'Medium', 'Large', 'Extra-Large', 'Huge'];


const Console: React.FC = () => {
    const [activeButton, setActiveButton] = useState<string>("OS");
  
    const handleButtonClick = (buttonName: string) => {
      setActiveButton(buttonName);
      
      
      
    };
    const [selected, setSelected] = useState<string | null>(null);
  
    return (
      <div className="w-[90%] h-[100%] bg-[#f0f2f5] p-5 overflow-y-scroll">
        <Header Title="Virtual Machine Creation" />
  
        <div className="bg-white p-6 w-[100%] rounded-lg mb-6">
          <h2 className="font-bold text-[1.5em] text-black pb-[6px]">
            Create a Virtual Machine
          </h2>
          <p className="text-[1em] text-black pb-6">
            Set up and deploy your virtual machine on our decentralized cloud computing platform in minutes.
          </p>
  
          <div className="flex flex-col">
            <h2 className="font-bold text-[1.5em] text-black pb-4">
              Choose Region
            </h2>
            <div className="flex flex-wrap gap-6 max-w-[808px]">
              <Region flag="/images/usFlag.png" Place="New York" />
              <Region flag="/images/usFlag.png" Place="San Francisco" />
              <Region flag="/images/sn.png" Place="Dakar" />
              <Region flag="/images/sn.png" Place="Mbour" />
              <Region flag="/images/fr.png" Place="Paris" />
              <Region flag="/images/fr.png" Place="Lille" />
              <Region flag="/images/usFlag.png" Place="New York" />
              <Region flag="/images/usFlag.png" Place="San Francisco" />
              <Region flag="/images/usFlag.png" Place="Dakar" />
            </div>
          </div>
        </div>
  
        <div className="flex flex-row between justify-between">
          <div className="bg-white w-[39%] p-6 rounded-lg">
            <h2 className="font-bold text-[1.5em] text-black pb-4">
              Choose Datacenter
            </h2>
            <CustomSelectDemo />
          </div>
  
          <div className="bg-white w-[59%] p-6 flex">
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
  
            {activeButton === "OS" && <SelectableButtons isActive={undefined} />}
  
            {activeButton === "Marketplace" && (
              <SearchInput test={undefined}  />
            )}
          </div>
        </div>
  
        <div className="bg-white px-6 w-[100%] h-[360px] mt-4 flex rounded-lg mb-6">
          <div className="w-[70%] h-[100%] border-r-2 border-[#6200ee]">
            <h2 className="font-bold py-6 text-[1.5em] text-black pb-4">
                  Choose Size
            </h2>
          <div className="w-[95%] h-[60px] border-2 border-[#6200ee] flex rounded-lg">
          {sizes.map((size, index) => (
        <div
          key={size}
          className={`h-full w-[20%] text-[1.125em] font-sans font-medium flex justify-center items-center cursor-pointer transition-transform duration-200 
            ${index !== sizes.length - 1 ? 'border-r-2 border-[#6200ee]' : ''} 
            ${selected === size ? 'bg-gray-200' : 'bg-transparent'} 
            hover:scale-[1.05]`}
          onClick={() => setSelected(size)}
        >
          {size}
        </div>
      ))}
          </div>
          </div>

        </div>
      </div>
    );
  };
  
  export default Console;