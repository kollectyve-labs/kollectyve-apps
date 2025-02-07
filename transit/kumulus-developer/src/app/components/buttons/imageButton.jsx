import React from 'react';

export function ImageButton({ text, ON, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-[180px] h-[40px] text-black font-bold 
        bg-white 
        hover:bg-gray-300 
        hover:shadow-md 
        transition-all ease-in-out 
        text-left
        duration-300
        ${ON ? 'border-r-4 border-[#6200ee]' : ''} 
        focus:outline-none`}
    >
      {text}
    </button>
  );
}
