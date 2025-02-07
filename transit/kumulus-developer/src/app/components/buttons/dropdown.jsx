import React, { useState, useRef, useEffect } from 'react'

export function CustomSelectDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')
  const dropdownRef = useRef(null)

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleSelect = (value) => {
    setSelectedValue(value)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const dataCenters = ['Africa Data Centres', 'Teraco', 'MainOne', 'GloDatacenter', 'Senegal Data Center'];

  return (
    <div className="relative w-[95%]" ref={dropdownRef}>
      <button
        className="w-full h-[60%] px-4 py-2 text-left flex justify-between bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={toggleDropdown}
      >
        {selectedValue || 'Select a Data Center'}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z"/></svg>
      </button>
      {isOpen && (
        <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <div className="py-1">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500">dataCenters</div>
            {dataCenters.map((fruit) => (
              <div
                key={fruit}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(fruit)}
              >
                {fruit}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}