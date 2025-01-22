'use client';

import { closeDrawer, openDrawer } from "@/lib/slices/menuDrawerSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import baseUrl from "../services/baseUrl";

const DrawerMenu = () => {
  const [categories, setCategories] = useState([]);
  const isOpen = useSelector((state) => state.menuDrawer.isOpen);
  const dispatch = useDispatch();
  const router = useRouter();
  const API_URL = `${baseUrl}/api/categories`;
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
  const navigateToCategory = (slug) => {
    router.push(`/category/${slug}`);
  };
  return (
    <div>
      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full z-[9999999] w-64 bg-black text-white transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 focus:outline-none"
          onClick={() => dispatch(closeDrawer())}
        >
          <svg
            className="w-6 h-6 text-white"
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

        {/* Menu Items */}
        <div className="mt-16 px-6 space-y-6">
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => navigateToCategory(category.slug)}
              className="block  hover:text-gray-400"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => dispatch(closeDrawer())}
        ></div>
      )}
    </div>
  );
};

export default DrawerMenu;
