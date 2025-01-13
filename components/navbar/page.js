import React from "react";

const Navbar = () => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-[9999]">
      {/* Top Bar */}
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        {/* Search Section */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-400 rounded-full px-4 py-2 w-64 focus:outline-none focus:ring focus:ring-gray-300"
            />
            <button className="absolute top-1/2 right-3 transform -translate-y-1/2">
              <i className="fas fa-search text-gray-500"></i>
            </button>
          </div>
        </div>

        {/* Logo Section */}
        <div>
          <h1 className="text-red-600 text-5xl font-bold">Textile Trend</h1>
        </div>

        {/* Weather and Subscribe Section */}
        <div className="">
          <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-md">
            <i className="fas fa-moon text-gray-500"></i>
            <span className="text-sm font-medium">7.2°</span>
            <span className="text-sm text-gray-500">New York</span>
            <span className="text-sm text-gray-500">Sunday, November 24, 2024</span>
          </div>
          <div className="flex justify-end items-center mt-2">
            <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-300 py-2">
        <div className="container mx-auto px-4 md:px-8 flex justify-center">
          <nav className="flex space-x-4 text-gray-600 text-sm">
            <a href="#" className="hover:underline">Music</a>
            <a href="#" className="hover:underline">Celebrity</a>
            <a href="#" className="hover:underline">Politics</a>
            <a href="#" className="hover:underline">Finance</a>
            <a href="#" className="hover:underline">Travel</a>
            <a href="#" className="hover:underline">Food</a>
            <a href="#" className="hover:underline">Marketing</a>
            <a href="#" className="hover:underline">Tech</a>
            <a href="#" className="hover:underline">Makeup</a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
