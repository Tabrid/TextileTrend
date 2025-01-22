"use client";
import { openSearchDrawer, closeSearchDrawer } from "@/lib/slices/searchDrawerSlice";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import baseUrl from "../services/baseUrl";

const SearchDrawer = () => {
  const router = useRouter();
  const isOpen = useSelector((state) => state.searchDrawer.isOpen);
  const dispatch = useDispatch();
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

  return (
    <div>
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[9999999] h-full w-full md:w-96 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-black focus:outline-none"
          onClick={() => dispatch(closeSearchDrawer())}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        {/* Search Section */}
        <div className="p-6">
          <h2 className="text-lg font-bold text-center mb-4">Search</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Type to search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute top-2 right-3 text-gray-400 hover:text-black">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 15l5 5m-5-5a7 7 0 1114 0 7 7 0 01-14 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Search Results */}
        <div className="px-6 space-y-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : searchResults.length > 0 ? (
            searchResults.slice(0, 3).map((result) => (
              <div key={result._id} onClick={() => {
                router.push(`/blog/${result.slug}`);
              }}>
                <h3 className="text-sm text-gray-500">{new Date(result.createdAt).toLocaleDateString()}</h3>
                <p className="text-lg font-semibold">{result.title}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No results found.</p>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => dispatch(closeSearchDrawer())}
        ></div>
      )}
    </div>
  );
};

export default SearchDrawer;
