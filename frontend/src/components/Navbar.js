import React, { useState } from 'react';
import { IoMdSettings } from 'react-icons/io'; // Ensure you have this import
import { FaAngleDown, FaAngleRight } from 'react-icons/fa'; // Ensure this import too

const Navbar = () => {
  const [settingDropdown, setSettingDropdown] = useState(false); // State to control dropdown
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control sidebar
  
  // Function for handling the logout button
  const handleLogout = () => {
    console.log('User logged out');
  };

  // Toggle Sidebar visibility (assuming toggleSideBar function is for that purpose)
  const toggleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log(isSidebarOpen ? 'Sidebar opened' : 'Sidebar closed');
  };

  return (
    <nav className="relative w-full bg-[#4B49AC] px-4 flex items-center justify-between py-3" aria-label="Global">
      <div className="flex items-center">
        {/* Sidebar toggle button for mobile view */}
        <div className="md:hidden" onClick={toggleSideBar}>
          <button
            type="button"
            className="hs-collapse-toggle size-8 flex justify-center items-center text-sm font-semibold rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            data-hs-collapse="#navbar-collapse-with-animation"
            aria-controls="navbar-collapse-with-animation"
            aria-label="Toggle navigation"
          >
            <svg className="hs-collapse-open:hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
            <svg className="hs-collapse-open:block hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18" />
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Settings dropdown */}
      <div
        className="relative"
        onMouseEnter={() => setSettingDropdown(true)}
        onMouseLeave={() => setSettingDropdown(false)}
      >
        <div className="flex items-center justify-center text-xl font-semibold cursor-pointer">
          <IoMdSettings className="pr-1 mt-[2px] text-white" />
          <div className="text-lg text-white">Setting</div>
          {settingDropdown ? (
            <FaAngleDown className="text-end text-sm mt-1 mx-4 text-white" />
          ) : (
            <FaAngleRight className="text-end text-sm mt-1 mx-4 text-white" />
          )}
        </div>

        {/* Dropdown Content */}
        {settingDropdown && (
          <div className="absolute text-white flex items-center shadow-lg bg-gradient-to-r from-[#4c4f6a] to-[#767ca3] rounded-md border-[1px] right-3 p-4 min-w-80">
            <div className="w-1/3 ml-5">
              <button
                onClick={handleLogout}
                className="flex items-center text-[16px] px-3 py-1 font-medium text-white bg-gray-800 rounded-full hover:scale-110 transform transition-transform duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
