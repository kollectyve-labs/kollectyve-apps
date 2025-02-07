import { useState, useRef, useEffect } from 'react';

function SelectableButtons({ isActive }) {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedDistribution, setSelectedDistribution] = useState('');
    const [selectedVersion, setSelectedVersion] = useState('');
    const dropdownRef = useRef(null);

    // Toggle dropdown visibility
    const toggleDropdown = () => setIsOpen(!isOpen);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Data for each distribution versions
    const versions = {
        Ubuntu: ['20.04 LTS', '22.04 LTS', '23.04'],
        Debian: ['10 (Buster)', '11 (Bullseye)', '12 (Bookworm)'],
        Fedora: ['Fedora 36', 'Fedora 37', 'Fedora 38'],
    };

  // Handle the selection of a version
  const handleSelectVersion = (version) => {
    setSelectedVersion(version);
    setIsOpen(false);
  };

  // Handle selecting a distribution
  const handleSelectDistribution = (distribution) => {
    setSelectedDistribution(distribution);
    setSelectedVersion(''); // Reset the selected version
    setIsOpen(false); // Close dropdown
  };

  // Determine button border color based on selected distribution
  const getButtonBorderColor = (distribution) => {
    return selectedDistribution === distribution ? '#6200ee' : 'gray';
  };

  // Get the list of versions to display based on the selected distribution
  const getVersionsToDisplay = () => {
    if (selectedDistribution) {
      return versions[selectedDistribution];
    }
    return [];
  };

    return (

        <div className="flex pt-12 h-[270px] flex-col" ref={dropdownRef} >
        {/* Buttons for selecting Linux distributions */}
        <div className="flex gap-4">
          <button
            className={`w-[110px] h-[110px] text-[1em] font-semibold text-black flex flex-col items-center rounded-lg border-2 shadow-sm
            transition-all ease-in-out duration-300 
            hover:border-[#6200ee] hover:scale-105 ${
              selectedDistribution === 'Ubuntu' ? 'border-[#6200ee]' : 'border-gray-400'
            }`}
            onClick={() => handleSelectDistribution('Ubuntu')}>

                <svg className="w-[90px] h-[90px] mx-auto" viewBox="0 0 76 76" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#000000" d="M50.6667,14.25C53.29,14.25 55.4167,16.3767 55.4167,19C55.4167,21.6234 53.29,23.75 50.6667,23.75C48.0433,23.75 45.9167,21.6234 45.9167,19C45.9167,16.3767 48.0433,14.25 50.6667,14.25Z M49.0833,52.25C51.7067,52.25 53.8333,54.3767 53.8333,57C53.8333,59.6234 51.7067,61.75 49.0833,61.75C46.46,61.75 44.3333,59.6234 44.3333,57C44.3333,54.3767 46.46,52.25 49.0833,52.25Z M17.4167,33.25C20.04,33.25 22.1667,35.3767 22.1667,38C22.1667,40.6234 20.04,42.75 17.4167,42.75C14.7933,42.75 12.6667,40.6234 12.6667,38C12.6667,35.3767 14.7933,33.25 17.4167,33.25Z M24.5417,38C24.5417,35.0403 22.7371,32.5021 20.1681,31.4257C22.8433,24.1723 29.8176,19 38,19C39.9455,19 41.8228,19.2924 43.5902,19.8357C44.0039,23.3769 47.0143,26.125 50.6667,26.125C51.3414,26.125 51.9943,26.0312 52.613,25.8559C55.3524,29.1486 57,33.3819 57,38C57,42.8346 55.1943,47.2475 52.2205,50.601C51.2739,50.1361 50.2091,49.875 49.0833,49.875C45.2878,49.875 42.1854,52.8429 41.9702,56.5846C40.6898,56.8568 39.3616,57 38,57C29.8176,57 22.8433,51.8277 20.1681,44.5743C22.7371,43.4979 24.5417,40.9597 24.5417,38Z M38,26.9167C31.8788,26.9167 26.9167,31.8789 26.9167,38C26.9167,44.1212 31.8788,49.0833 38,49.0833C44.1211,49.0833 49.0833,44.1212 49.0833,38C49.0833,31.8789 44.1212,26.9167 38,26.9167Z" />
                </svg>
            <div className="mx-auto">Ubuntu</div>
          </button>
  
          <button
            className={`w-[110px] h-[110px] text-[1em] font-semibold text-black flex flex-col items-center gap-3 rounded-lg border-2 shadow-sm 
            transition-all ease-in-out duration-300 
            hover:border-[#6200ee] hover:scale-105 ${
              selectedDistribution === 'Debian' ? 'border-[#6200ee]' : 'border-gray-400'
            }`}
            onClick={() => handleSelectDistribution('Debian')}
          >
            <img className="w-[55px] h-[55px] mx-auto mt-4" src="/images/debian.png" alt="Debian logo" />
            <div className="mx-auto">Debian</div>
          </button>
  
          <button
            className={`w-[110px] h-[110px] text-[1em] font-semibold text-black flex flex-col items-center gap-3 rounded-lg border-2 shadow-sm 
            transition-all ease-in-out duration-300 
            hover:border-[#6200ee] hover:scale-105 ${
              selectedDistribution === 'Fedora' ? 'border-[#6200ee]' : 'border-gray-400'
            }`}
            onClick={() => handleSelectDistribution('Fedora')}
          >
            <img className="w-[55px] h-[55px] mx-auto mt-4" src="/images/fedora.png" alt="Fedora logo" />
            <div className="mx-auto">Fedora</div>
          </button>
        </div>
  
        
        {selectedDistribution && (
          <div className="mt-4">
            <button
              className="w-[365px] h-[60px] px-4 py-2 text-left flex items-center justify-between bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={toggleDropdown}
            >
              {selectedVersion || `Select a ${selectedDistribution} Version`}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z" />
              </svg>
            </button>
            {isOpen && (
              <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <div className="py-1">
                  {/* Display versions of the selected distribution */}
                  {getVersionsToDisplay().map((version) => (
                    <div
                      key={version}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSelectVersion(version)}
                    >
                      {version}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

export default SelectableButtons;
