import { useState } from "react";

function Region({flag, Place}) {
    const [isPressed, setIsPressed] = useState(false);

    const handleToggle = () => {
        setIsPressed(!isPressed);
      };

    return(
        <button
        onClick={handleToggle}
        className={`
          w-[180px] h-[40px] border border-gray-300 rounded-md px-4 py-2 
          flex gap-[10px] items-center 
          transition-all duration-300 ease-in-out
          hover:scale-105 hover:shadow-md
          ${isPressed ? 'bg-gray-100 scale-95' : 'bg-white'}
        `}
        aria-label={`Toggle ${Place}`}
        aria-pressed={isPressed}
      >
        <img 
          className="w-[22px] h-[16.5px] object-cover" 
          src={flag} 
          alt={`Flag of ${Place}`} 
        />
        <h6 className="font-medium text-[0.875em] text-black">{Place}</h6>
      </button>
    );
  }

export default Region;