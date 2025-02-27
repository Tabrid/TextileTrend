'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import baseUrl from "../services/baseUrl";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const FoodAndTravel = ({ category }) => {
  const router = useRouter();
  const [sustainability, setSustainability] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(4); // Start from the 5th article

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/news/category/${category.slug}`
        );
        const data = await response.json();
        setSustainability(data);
      } catch (error) {
        console.error("Error fetching exclusive content:", error);
      }
    };
    fetchData();
  }, [category]);

  const handleTitleClick = (slug) => {
    router.push(`/blog/${slug}`);
  };

  const handleNext = () => {
    if (visibleIndex + 4 < sustainability.length) {
      setVisibleIndex(visibleIndex + 4);
    }
  };

  const handlePrev = () => {
    if (visibleIndex - 4 >= 4) {
      setVisibleIndex(visibleIndex - 4);
    }
  };

  function formatDate(inputDate) {
    if (!inputDate) {
      console.error('Invalid date input:', inputDate);
      return 'Invalid Date'; // Return a fallback value
    }

    const date = new Date(inputDate);

    if (isNaN(date.getTime())) {
      console.error('Unable to parse date:', inputDate);
      return 'Invalid Date'; // Return a fallback value
    }

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  return (
    <div className="bg-white px-10 mt-10">
      {/* Header */}
      <div className="flex justify-between items-center border-b-4 border-[#EC3535]  pb-2 mb-6">
        <h2 className="text-2xl font-bold">{category.name}</h2>
        <h1 className="text-red-500 text-sm font-semibold hover:underline cursor-pointer" onClick={() => router.push(`/category/${category.slug}`)}>
          VIEW ALL →
        </h1>
      </div>

      {/* Featured Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {sustainability.slice(0, 4).map((article) => (
          <div
            key={article.id}
            className={`overflow-hidden shadow-sm cursor-pointer`}
            onClick={() => handleTitleClick(article.slug)}
          >
            <Image
              src={`${baseUrl}/${article.coverImage}`}
              alt={article.title}
              width={400}
              height={250}
              className="w-full h-[250px] object-cover"
            />
            <div className="p-4">
              {article.category && (
                <span className="text-red-500 text-xs font-bold uppercase">
                  {article.category}
                </span>
              )}
              <h3 className="text-sm font-bold mt-2">{article.title}</h3>
              <p className="text-xs text-gray-500 flex items-center gap-4 mt-2">
                By {article?.creator ? article.creator : 'Admin'}  - {article.createdAt && formatDate(article.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Smaller Articles */}
      <div className="flex items-center gap-2">
        {visibleIndex > 4 && (
          <FaArrowLeft
            className="text-2xl text-red-500 cursor-pointer hidden md:block lg:block"
            onClick={handlePrev}
          />
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sustainability.slice(visibleIndex, visibleIndex + 4).map((article) => (
            <div
              key={article.id}
              className="flex space-x-3 cursor-pointer"
              onClick={() => handleTitleClick(article.slug)}
            >
              <Image
                width={100}
                height={100}
                src={`${baseUrl}/${article.coverImage}`}
                alt={article.title}
                className="w-16 h-16 object-cover "
              />
              <div className="flex flex-col">
                {article.category && (
                  <span className="text-red-500 text-xs uppercase font-bold mb-1">
                    {article.category}
                  </span>
                )}
                <p className="text-sm font-semibold">{article.title}</p>
              </div>
            </div>
          ))}
        </div>
        {visibleIndex + 4 < sustainability.length && (
          <FaArrowRight
            className="text-2xl text-red-500 cursor-pointer hidden md:block lg:block"
            onClick={handleNext}
          />
        )}
      </div>
    </div>
  );
};
export default FoodAndTravel;
