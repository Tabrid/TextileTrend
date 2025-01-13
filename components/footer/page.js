import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-8 ">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header with title */}
        <div className="border-b flex justify-between items-center border-gray-300 pb-4 mb-4">
          <h1 className="text-2xl font-semibold">Textile Trend</h1>
          <nav className="flex flex-wrap space-x-4 mt-2 text-sm">
            <a href="#" className="hover:underline">Music</a>
            <a href="#" className="hover:underline">Celebrity</a>
            <a href="#" className="hover:underline">Politics</a>
            <a href="#" className="hover:underline">Photos</a>
            <a href="#" className="hover:underline">Travel</a>
            <a href="#" className="hover:underline">Food</a>
            <a href="#" className="hover:underline">Marketing</a>
            <a href="#" className="hover:underline">Tech</a>
            <a href="#" className="hover:underline">Makeup</a>
          </nav>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h2 className="text-lg font-semibold mb-4">About us</h2>
            <p className="text-sm">
              Each template in our ever-growing studio library can be added and
              moved around within any page effortlessly with one click.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-black hover:text-gray-700">
                <i className="fab fa-facebook-square text-xl"></i>
              </a>
              <a href="#" className="text-black hover:text-gray-700">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-black hover:text-gray-700">
                <i className="fab fa-x-twitter text-xl"></i>
              </a>
              <a href="#" className="text-black hover:text-gray-700">
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Company</h2>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:underline">About</a></li>
              <li><a href="#" className="text-sm hover:underline">Contact us</a></li>
              <li><a href="#" className="text-sm hover:underline">Subscription Plans</a></li>
              <li><a href="#" className="text-sm hover:underline">My Account</a></li>
            </ul>
          </div>

          {/* Latest Posts */}
          <div>
            <h2 className="text-lg font-semibold mb-4">The latest</h2>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm hover:underline">
                  Social Media Marketing for Panchaless is Meant for Women
                </a>
                <p className="text-xs text-gray-500">Marketing - September 23, 2023</p>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  A Look at How Social Media & Mobile Gaming Can Increase Sales
                </a>
                <p className="text-xs text-gray-500">Travel - September 25, 2023</p>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  Cover Girl Announces Star Shine Makeup Line is Due for Next December
                </a>
                <p className="text-xs text-gray-500">Makeup - September 26, 2023</p>
              </li>
            </ul>
          </div>

          {/* Subscription */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Subscribe</h2>
            <form>
              <input
                type="email"
                placeholder="Email address"
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
              >
                I WANT IN
              </button>
              <div className="text-sm mt-4">
                <input type="checkbox" id="privacy" className="mr-2" />
                <label htmlFor="privacy">
                  I have read and accept the{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    Privacy Policy
                  </a>.
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
