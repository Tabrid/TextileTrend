'use client';

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaFacebookSquare, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "@/public/images/Website-01.png";
import { useRouter } from "next/navigation";
import axios from "axios";
import baseUrl from "../services/baseUrl";
import Link from "next/link";

const Footer = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [news, setNews] = useState([]);
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!isChecked) {
      setMessage("You must accept the Privacy Policy.");
      return;
    }

    const response = await fetch(`${baseUrl}/api/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Subscription successful!");
      setEmail("");
      setIsChecked(false);
    } else {
      setMessage(data.error);
      setEmail("");
    }
  };
  const API_URL = `${baseUrl}/api/categories/status/true`;

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
        const response = await axios.get(`${baseUrl}/api/news/latest`);
        setNews(response.data.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchCategories();
    fetchNews();
  }, [API_URL]);

  const navigateToCategory = (slug) => {
    router.push(`/category/${slug}`);
  };

  return (
    <footer className="bg-white text-gray-700 py-8">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header with title */}
        <div className="border-b md:flex lg:flex justify-between items-center border-gray-300 pb-4 mb-4">
          <Image
            width={300}
            height={100}
            src={logo}
            alt="Fresh Stories"
            className="w-[250px] "
          />
          <nav className="flex flex-wrap space-x-4 mt-2 text-sm">
            {categories.length > 0 ? (
              categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => navigateToCategory(category.slug)}
                  className="text-gray-600 hover:underline hover:text-red-500"
                >
                  {category.name}
                </button>
              ))
            ) : (
              <div className="skeleton h-6 w-20 bg-gray-200"></div>
            )}
          </nav>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h2 className="text-lg font-semibold mb-4">About us</h2>
            <p className="text-sm">
              Stay updated with the latest trends, insights, and breaking news from the textile industry. Explore in-depth reports, expert analyses, and exclusive updates with just one click.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href={'https://www.facebook.com/textiletrend4u?mibextid=ZbWKwL'} className="text-black hover:text-gray-700">
                <FaFacebookSquare className="text-xl" />
              </Link>
              <Link href={'https://www.linkedin.com/company/textile-trend/posts/?feedView=all'} className="text-black hover:text-gray-700">
                <FaLinkedin className="text-xl" />
              </Link>
              <Link href={''} className="text-black hover:text-gray-700">
                <FaTwitter className="text-xl" />
              </Link>
              <Link href={''} className="text-black hover:text-gray-700">
                <FaYoutube className="text-xl" />
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Company</h2>
            <ul className="space-y-2">
              <li><a href="/about" className="text-sm hover:underline">About</a></li>
              <li><a href="/contact" className="text-sm hover:underline">Contact us</a></li>
            </ul>
          </div>

          {/* Latest Posts */}
          <div>
            <h2 className="text-lg font-semibold mb-4">The latest</h2>
            <ul className="space-y-3">
              {news?.length > 0 ? (
                news.slice(0, 3).map((newsItem) => (
                  <li key={newsItem._id}>
                    <a href={`/blog/${newsItem.slug}`} className="text-sm hover:underline">
                      {newsItem.title}
                    </a>
                  </li>
                ))
              ) : (
                <div className="skeleton h-6 w-40 bg-gray-200"></div>
              )}
            </ul>
          </div>

          {/* Subscription */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Subscribe</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email address"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
              >
                I WANT IN
              </button>
              <div className="text-sm mt-4">
                <input type="checkbox" id="privacy" className="mr-2" checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)} />
                <label htmlFor="privacy">
                  I have read and accept the{" "}
                  <Link href="/privacy-policy" className="text-blue-500 hover:underline">
                    Privacy Policy
                  </Link>.
                </label>
              </div>
            </form>
            {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
          </div>
        </div>
        <div className="text-center text-sm  mt-2 border-t border-gray-300 pt-4">
          ©2025 Textile Trend. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
