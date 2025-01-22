'use client';
import React, { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { openDrawer } from "@/lib/slices/menuDrawerSlice";
import { useDispatch } from "react-redux";
import { openSearchDrawer } from "@/lib/slices/searchDrawerSlice";
import Image from "next/image";
import logo from "@/public/images/logo.jpg";
import { useRouter } from "next/navigation";
import baseUrl from "../services/baseUrl";

const Navbar = () => {
  const [dateTime, setDateTime] = useState("");
  const [time, setTime] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const API_URL = `${baseUrl}/api/categories`;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = async (query) => {
    if (!query.trim()) return; // Avoid fetching if the input is empty
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/news/search?title=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(data.success ? data.data : []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm) {
        fetchSearchResults(searchTerm);
      } else {
        setSearchResults([]);
      }
    }, 300); // Debounce the search API call by 300ms
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);
  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [API_URL]);

  useEffect(() => {
    // Debounced scroll handler to optimize performance
    let timeout = null;
    const handleScroll = () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        setScrolled(window.scrollY > 50); // Update scrolled state only after debounce
      }, 50); // 50ms debounce delay
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  useEffect(() => {
    // Update date and time every second
    const interval = setInterval(() => {
      const now = new Date();
      const dateOptions = {
        weekday: "long",
        month: "long",
        day: "numeric",
      };
      setDateTime(now.toLocaleDateString(undefined, dateOptions));
      setTime(
        now.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(interval); 
  }, []);
  const navigateToCategory = (slug) => {
    setSearchTerm("");
    router.push(`/category/${slug}`);
  };
  return (
    <div
      className={`${scrolled
        ? "bg-white shadow-lg py-2 sticky top-0 z-[9999]"
        : "bg-white py-4"
        } border-b border-gray-200  px-4 md:px-0 lg:px-0 transition-all duration-300 ease-in-out`}
    >
      {/* Top Bar */}
      {scrolled ? (
        <div className="flex justify-between items-center md:px-10 lg:px-10">
          <div className="md:hidden lg:hidden text-xl">
            <IoMenu onClick={() => dispatch(openDrawer())} />
          </div>
          <div>

            <Image
              width={600}
              height={100}
              src={logo}
              alt="Fresh Stories"
              className="w-[200px] h-full object-cover cursor-pointer"
              onClick={() => router.push("/")}
            />
          </div>
          <div className="md:hidden lg:hidden text-lg">
            <CiSearch onClick={() => dispatch(openSearchDrawer())} />
          </div>
          <nav className="space-x-4 items-center text-gray-600 text-sm hidden md:flex lg:flex">
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => navigateToCategory(category.slug)}
                className="hover:underline text-sm text-gray-600"
              >
                {category.name}
              </button>
            ))}
          </nav>
        </div>
      ) : (
        <div>
          <div className="container mx-auto px-2 md:px-8 py-4 flex justify-between items-center gap-3">
            {/* Search Section */}

            <div className="md:flex lg:flex items-center space-x-4 hidden">
              <div className="relative">
                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-400 rounded-full px-4 py-2 w-64 focus:outline-none focus:ring focus:ring-gray-300"
                />

                {/* Search Results */}
                {searchTerm && (
                  <div className="absolute top-12 left-0 w-[800px] bg-white border border-gray-200 rounded-lg shadow-md z-10">
                    {loading ? (
                      <p className="p-4 text-gray-500">Loading...</p>
                    ) : searchResults.length > 0 ? (
                      <ul className="grid grid-cols-2">
                        {searchResults.slice(0, 4).map((result) => (
                          <div
                            key={result._id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-2 items-center"
                            onClick={() => {
                              router.push(`/blog/${result.slug}`);
                            }}
                          >
                            <Image
                              width={100}
                              height={100}
                              src={`${baseUrl}/${result.coverImage}`}
                              alt={result.title}
                              className="w-16 h-16 object-cover"
                            />
                            {result.title}
                          </div>
                        ))}
                      </ul>
                    ) : (
                      <p className="p-4 text-gray-500">No results found.</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Logo Section */}
            <div className="md:hidden lg:hidden text-xl">
              <IoMenu onClick={() => dispatch(openDrawer())} />
            </div>
            <div>
              <Image
                width={600}
                height={100}
                src={logo}
                alt="Fresh Stories"
                className="w-[300px] h-full object-cover cursor-pointer"
                onClick={() => router.push("/")}
              />
            </div>
            <div className="md:hidden lg:hidden text-lg">
              <CiSearch onClick={() => dispatch(openSearchDrawer())} />
            </div>
            {/* Weather and Subscribe Section */}
            <div className="hidden md:block lg:block">
              <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-md">
                <span className="text-sm text-gray-500">{dateTime}</span>|
                <span className="text-sm text-gray-500">{time}</span>
              </div>
              <div className="flex justify-end items-center mt-2">
                <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="border-t border-gray-300 py-2 hidden md:block lg:block">
            <div className="container mx-auto px-4 md:px-8 flex justify-center">
              <nav className="flex space-x-4 text-gray-600 text-sm">
                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => navigateToCategory(category.slug)}
                    className="hover:underline text-sm text-gray-600"
                  >
                    {category.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
