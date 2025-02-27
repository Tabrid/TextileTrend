"use client";

import baseUrl from '@/components/services/baseUrl';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const About = () => {
  const [content, setContent] = useState("");
  // Fetch the about page content
  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/about`);
        setContent(data.content); // Assuming `content` contains the About page text
      } catch (error) {
        console.error("Error fetching about content:", error);
      }
    };

    fetchAboutContent();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-100 flex  justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl w-full p-6 sm:p-10">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">About Textile Trend</h1>
        <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl  p-4 rounded-md text-lg text-white"
          ></div>
        <div className="mt-8 flex justify-center">
          <a
            href="/contact"
            className="px-6 py-3 text-white bg-red-600 rounded-lg shadow hover:bg-red-500 transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
