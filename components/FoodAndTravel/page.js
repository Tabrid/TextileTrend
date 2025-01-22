'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import baseUrl from "../services/baseUrl";

const FoodAndTravel = () => {
  const router = useRouter();
  const [sustainability, setSustainability] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/news/category/sustainability`
        );
        const data = await response.json();
        setSustainability(data);
      } catch (error) {
        console.error("Error fetching exclusive content:", error);
      }
    }
    fetchData();
  }, []);
  const articles = [
    {
      id: 1,
      category: "Exclusive",
      title: "Kristen Stewart Visits the Toronto Film Festival with New Boyfriend",
      image: "https://i.ibb.co/bKhbyxg/Link-4.png", // Replace with your image URL
      author: "Cara Buch",
      date: "September 23, 2021",
      highlight: true,
    },
    {
      id: 2,
      title: "Celebrity Make-up Artist Gary Meyers Shows you His Beauty Tricks",
      image: "https://i.ibb.co/bKhbyxg/Link-4.png", // Replace with your image URL
      author: "Dara Bush",
      date: "September 23, 2021",
    },
    {
      id: 3,
      title: "The Biggest Hollywood Celebrities Visit the Ranches of California",
      image: "https://i.ibb.co/bKhbyxg/Link-4.png", // Replace with your image URL
      author: "Zan Rush",
      date: "September 23, 2021",
    },
    {
      id: 4,
      title: "The Most Popular Celebrity Name List of the Millennium is Here",
      image: "https://i.ibb.co/bKhbyxg/Link-4.png", // Replace with your image URL
      author: "Zan Rush",
      date: "September 23, 2021",
    },
  ];

  const smallerArticles = [
    {
      id: 1,
      title: "The Best Pork Kebabs With Grilled Plums and Couscous Is Found in Poland",
      image: "https://i.ibb.co/bKhbyxg/Link-4.png", // Replace with real image URL
    },
    {
      id: 2,
      title: "Ultimate Guide to Vienna’s Coffee Renaissance Packed in One Weekend",
      image: "https://i.ibb.co/bKhbyxg/Link-4.png", // Replace with real image URL
    },
    {
      id: 3,
      title: "10 Things You Should Know Before You Visit South America’s Jungles",
      image: "https://i.ibb.co/bKhbyxg/Link-4.png", // Replace with real image URL
    },
    {
      id: 4,
      title: "Vacation Bucket List: The Top 10 Trips of a Lifetime You Should Take",
      image: "https://i.ibb.co/bKhbyxg/Link-4.png", // Replace with real image URL
    },
    {
      id: 5,
      title: "The Cliffs of Moher Reach 1 Million Visitors Every Year Since 2014",
      tag: "Exclusive",
      image: "https://i.ibb.co/bKhbyxg/Link-4.png", // Replace with real image URL
    },
    {
      id: 6,
      title: "The 25 Best Cities You Can Find in Italy to Satisfy the Love for Pizza",
      tag: "Exclusive",
      image: "https://i.ibb.co/bKhbyxg/Link-4.png", // Replace with real image URL
    },
    {
      id: 7,
      title: "Now Is the Time to Think About Your Small-Business Success",
      image: "https://i.ibb.co/bKhbyxg/Link-4.png", // Replace with real image URL
    },
    {
      id: 8,
      title: "Program Will Lend $10M to Detroit Minority Businesses",
      image: "https://i.ibb.co/bKhbyxg/Link-4.png", // Replace with real image URL
    },
  ];
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
    <div className="bg-white px-10 mt-10">
      {/* Header */}
      <div className="flex justify-between items-center border-b-4 border-[#EC3535]  pb-2 mb-6">
        <h2 className="text-2xl font-bold">Sustainability</h2>
        <h1  className="text-red-500 text-sm font-semibold hover:underline cursor-pointer" onClick={()=>router.push('/category/sustainability')}>
          VIEW ALL →
        </h1>
      </div>

      {/* Featured Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {sustainability.slice(0, 4).map((article) => (
          <div
            key={article.id}
            className={` overflow-hidden shadow-sm cursor-pointer`}
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

      {/* Smaller Articles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sustainability.slice(4, 12).map((article) => (
          <div key={article.id} className="flex space-x-3 cursor-pointer" onClick={() => handleTitleClick(article.slug)}>
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
    </div>
  );
};

export default FoodAndTravel;
