'use client';

import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { FaFacebookSquare, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "@/public/images/logo.jpg";
import { useRouter } from "next/navigation";
import axios from "axios";
import baseUrl from "../services/baseUrl";

const Footer = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [news, setNews] = useState([]);
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
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/news`);
        setNews(response.data);
        console.log(response);
        
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
    fetchCategories();
  }, [API_URL]);
  const navigateToCategory = (slug) => {
    setSearchTerm("");
    router.push(`/category/${slug}`);
  };
  return (
    <footer className="bg-white text-gray-700 py-8 ">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header with title */}
        <div className="border-b md:flex lg:flex justify-between items-center border-gray-300 pb-4 mb-4">
          <div className="hidden md:block lg:block">
            <Image
              width={600}
              height={100}
              src={logo}
              alt="Fresh Stories"
              className="w-[200px] h-full object-cover"
            />
          </div>
          <div className="md:hidden lg:hidden flex justify-center">
            <Image
              width={600}
              height={100}
              src={logo}
              alt="Fresh Stories"
              className="w-[200px] h-full object-cover"
            />
          </div>
          <nav className="flex flex-wrap space-x-4 mt-2 text-sm">
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => navigateToCategory(category.slug)}
                className="text-gray-600  hover:underline hover:text-red-500"
              >
                {category.name}
              </button>
            ))}
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
                <FaFacebookSquare className="text-xl" />
              </a>
              <a href="#" className="text-black hover:text-gray-700">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-black hover:text-gray-700">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-black hover:text-gray-700">
                <FaYoutube className="text-xl" />
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
              {news?.slice(0, 3).map((newsItem) => (
                <li key={newsItem._id}>
                  <a href={`/blog/${newsItem.slug}`} className="text-sm hover:underline">
                    {newsItem.title}
                  </a>
                </li>
              ))}
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
