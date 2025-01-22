import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import baseUrl from "../services/baseUrl";

const CelebritySection = () => {
  const router = useRouter();
  const [celebrities, setCelebrities] = useState([]);
  useEffect(() => {
    const fetchCelebrities = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/news/category/tread-and-export`
        )
        const data = await response.json();
        setCelebrities(data);
      } catch (error) {
        console.error("Error fetching celebrities:", error);
      }
    }

    fetchCelebrities();
  }, []);
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
  const handleTitleClick = (slug) => {
    router.push(`/blog/${slug}`);
};
  return (
    <div className="bg-white py-8 px-10">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold">Tread & Export</h2>
        </div>

        {/* Highlighted Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {celebrities.slice(0, 2).map((article) => (
            <div
              key={article.id}
              className={` overflow-hidden shadow-sm  md:flex lg:flex block cursor-pointer `} 
              onClick={() => handleTitleClick(article.slug)}
            >
              <Image
                src={`${baseUrl}/${article.coverImage}`}
                alt={article.title}
                width={400}
                height={250}
                className="w-full md:w-7/12 lg:w-7/12 h-auto object-cover"
              />
              <div className="p-4">
                {article.category && (
                  <span className="text-red-500 text-xs font-bold uppercase">
                    {article.category}
                  </span>
                )}
                <h3 className="text-sm font-bold mt-2">{article.title}</h3>
                <p className="text-xs text-gray-500  flex items-center gap-4 mt-2">
                  By Admin - {article.createdAt &&   formatDate(article.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 mt-6 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {celebrities.slice(2,10).map((article) => (
            <div
              key={article.id}
              className={` overflow-hidden shadow-sm  cursor-pointer`}
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
                <p className="text-xs text-gray-500  flex items-center gap-4 mt-2">
                  By Admin - {article.createdAt &&    formatDate(article.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CelebritySection;
