import React, { useState } from "react";

const sampleItems = [
    "Nextcloud",
    "Jitsi Meet",
    "Cryptpad",
    "Mattermost",
    "Sandstorm.io",
    "Docker Swarm",
    "OpenNebula",
    "OpenStack"
];

  

export function OptionButton({text}) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedItem, setSelectedItem] = useState(null)

    const openDialog = () => setIsOpen(true)
    const closeDialog = () => {
        setIsOpen(false)
        setSelectedItem(null)
    }

    const filteredItems = sampleItems.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleItemClick = (item) => {
        setSelectedItem(item)
    }

  return (
        <>
      <button
        onClick={openDialog}
        className="border-2 text-center flex justify-center items-center cursor-pointer text-[#6200ee] font-semibold border-[#6200ee] rounded-lg h-12 w-[39%] transition-all duration-300 ease-in-out"
      >
        {text}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start flex-col">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Search and Select
                    </h3>
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                      />
                    </div>
                    <div className="mt-4 max-h-60 overflow-y-auto">
                      <ul className="divide-y divide-gray-200">
                        {filteredItems.map((item, index) => (
                          <li 
                            key={index} 
                            className={`py-2 px-2 cursor-pointer hover:bg-blue-50 transition-colors duration-150 ease-in-out ${selectedItem === item ? 'bg-blue-100' : ''}`}
                            onClick={() => handleItemClick(item)}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-black text-base font-medium text-black hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeDialog}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeDialog}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </>
  )
}