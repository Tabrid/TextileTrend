'use client'
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import baseUrl from "../services/baseUrl";
const ExclusiveContent = () => {
  const router = useRouter(); 
  const [breaking , setBreaking] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/news/type/breaking`
        );
        const data = await response.json();
        setBreaking(data);
      } catch (error) {
        console.error("Error fetching exclusive content:", error);
      }   
    }   
    fetchData();
  }, []); 
  // Data for articles
 
  const handleTitleClick = (slug) => {
    router.push(`/blog/${slug}`);
};
  return (
    <div className="bg-white py-8 px-10">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-[13px] text-center hidden md:block lg:block">Join or social media</h2>
          <h2 className="text-base lg:text-lg md:text-lg font-bold text-center">For even more exclusive content!</h2>
          <div className="lg:flex md:flex items-center space-x-4 hidden ">
            <FaFacebook className="text-red-500 cursor-pointer" size={20} />
            <FaTwitter className="text-red-500 cursor-pointer" size={20} />
            <FaTimes className="text-red-500 cursor-pointer" size={20} />
          </div>
        </div>

        {/* Highlighted Articles */}
        <div className="bg-white relative ">
        <div className="flex items-center mb-4 absolute top-0 left-10 z-10 ">
              <span className="bg-red-500 text-white text-sm font-bold px-5 py-3 ">Breaking</span>
            </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
            
            {breaking.slice(0, 4).map((article) => (
              <div
                key={article.id}
                className="relative group overflow-hidden  shadow-lg cursor-pointer"
                onClick={() => handleTitleClick(article.slug)}
              >
                <Image
                  width={300}
                  height={400}
                  src={`${baseUrl}/${article.coverImage}`}
                  alt={article.title}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0  p-4 text-white">
                  <span className="bg-red-500 text-xs uppercase px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <h3 className="mt-2 text-sm font-semibold">{article.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Smaller Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-5 md:mt-0 lg:mt-0">
          {breaking.slice(4, 12).map((article) => (
            <div
              key={article.id}
              className="bg-gray-100 p-4 rounded-lg shadow-sm flex flex-col-reverse md:flex-row  lg:flex-row gap-2 cursor-pointer"
              onClick={() => handleTitleClick(article.slug)}
            >
              <h3 className="text-sm font-bold mt-2"><span className="text-white bg-red-500 px-3 py-1 rounded self-start mr-2 mb-2  text-xs font-bold uppercase">
                {article.category}
              </span>{article.title}</h3>
              <Image
                src={`${baseUrl}/${article.coverImage}`}
                alt={article.title}
                width={100}
                height={100}
                className="w-full md:w-[100px] lg:w-[100px] h-[100px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExclusiveContent;
