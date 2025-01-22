'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import baseUrl from "../services/baseUrl";

const ExclusiveContent = () => {
  const router = useRouter();
  const [exclusive, setExclusive] = useState([]);
  useEffect(() => {
    const fetchExclusive = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/news/type/exclusive`
        );
        const data = await response.json();
        setExclusive(data);
      } catch (error) {
        console.error("Error fetching exclusive content:", error);
      }
    }
    fetchExclusive();
  }, []);

  const mainArticle = exclusive[0];
  const handleTitleClick = (slug) => {
    router.push(`/blog/${slug}`);
  };
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg md:mx-14 lg:mx-14 relative mt-10" >
      {/* Header */}
      <div className="flex items-center mb-6 absolute top-0 left-16 z-10">
        <span className="bg-red-500 text-white text-sm font-bold px-5 py-3 ">
          Exclusive content
        </span>
      </div>
      {/* Main Article */}
      <div className="md:flex lg:flex  mb-8 gap-8 ">
        <div className="w-full md:w-2/5 lg:w-2/5 relative group  overflow-hidden shadow-lg cursor-pointer " onClick={() => handleTitleClick(mainArticle?.slug)}>
          <div className="relative w-full h-full">
            <Image
              width={600}
              height={400}
              src={`${baseUrl}/${mainArticle?.coverImage}`}
              alt={mainArticle?.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-black opacity-50"></div>
          </div>

          <div className="absolute bottom-0 left-0 right-0  p-6 text-white">
            <span className="bg-red-500 text-xs uppercase px-2 py-1 rounded">
              {mainArticle?.category}
            </span>
            <h2 className="text-xl font-bold mt-2">{mainArticle?.title}</h2>
            <p className="text-sm mt-2">
              {mainArticle?.shortDescription
                ?.split(" ")
                .slice(0, 50)
                .join(" ") + (mainArticle?.shortDescription?.split(" ").length > 50 ? "..." : "")}
            </p>
          </div>
        </div>

        {/* Secondary Articles */}
        <div className="w-full md:w-3/5 lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 md:mt-0 lg:mt-0">
          {exclusive?.slice(1, 5).map((article) => (
            <div key={article.id} className="flex flex-col space-y-2 cursor-pointer" onClick={() => handleTitleClick(article.slug)}>
              <div className="relative group overflow-hidden  shadow-md">
                <Image
                  width={200}
                  height={150}
                  src={`${baseUrl}/${article.coverImage}`}
                  alt={article.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white text-sm">
                  <span className="bg-red-500 text-xs uppercase px-2 py-1 rounded">
                    {article.category}
                  </span>
                </div>
              </div>
              <h3 className="text-sm font-semibold">{article.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExclusiveContent;
