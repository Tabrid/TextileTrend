import React from "react";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaTimes } from "react-icons/fa";
const ExclusiveContent = () => {
  // Data for articles
  const articles = [
    {
      id: 1,
      category: "Celebrity",
      title: "The Definitive Guide to Marketing Your Business On Instagram",
      image: "https://i.ibb.co.com/9vfqqs0/Link.png ", // Replace with real image URL
    },
    {
      id: 2,
      category: "Finance",
      title: "Dell Will Invest $1 Billion in China's Tech in the Next 5 Years",
      image: "https://i.ibb.co.com/9vfqqs0/Link.png ", // Replace with real image URL
    },
    {
      id: 3,
      category: "Tech",
      title: "Discover the Newest Waterproof Smartphones that Come on Sale",
      image: "https://i.ibb.co.com/9vfqqs0/Link.png ", // Replace with real image URL
    },
    {
      id: 4,
      category: "Celebrity",
      title: "Now Is the Time to Think About Your Small-Business Success",
      image: "https://i.ibb.co.com/9vfqqs0/Link.png", // Replace with real image URL
    },
  ];


  const smallerArticles = [
    {
      id: 5,
      category: "Politics",
      title: "Expanding Peaceful Political Climate Gears up for this Election",
      image: "https://i.ibb.co.com/9vfqqs0/Link.png", // Replace with your image URL
    },
    {
      id: 6,
      category: "Politics",
      title: "Things You Didn’t Know About the American Past Politicians",
      image: "https://i.ibb.co.com/9vfqqs0/Link.png", // Replace with your image URL
    },
    {
      id: 7,
      category: "Tech",
      title: "The Hottest Wearable Tech and Smart Gadgets of 2021 Will Blow Your Mind",
      image: "https://i.ibb.co.com/9vfqqs0/Link.png", // Replace with your image URL
    },
    {
      id: 8,
      category: "Tech",
      title: "New Technology Will Help Keep Your Smart Home from Becoming Obsolete",
      image: "https://i.ibb.co.com/9vfqqs0/Link.png", // Replace with your image URL
    },
    {
      id: 9,
      category: "Politics",
      title: "New Harvard Student Candidates Presented Minutes Before Results",
      image: "https://i.ibb.co.com/9vfqqs0/Link.png", // Replace with your image URL
    },
    {
      id: 10,
      category: "Tech",
      title: "Apple Computers Climb the List of the Top Gadgets in Forbes Magazine",
      image: "https://i.ibb.co.com/9vfqqs0/Link.png", // Replace with your image URL
    },
    {
      id: 11,
      category: "Tech",
      title: "New Soundboard from Bose Review: Pricing is Not Always the Only Criteria",
      image: "https://i.ibb.co.com/9vfqqs0/Link.png", // Replace with your image URL
    },
    {
      id: 11,
      category: "Tech",
      title: "New Soundboard from Bose Review: Pricing is Not Always the Only Criteria",
      image: "https://i.ibb.co.com/9vfqqs0/Link.png", // Replace with your image URL
    },
  ];

  return (
    <div className="bg-white py-8 px-10">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-[13px] text-center">Join or social media</h2>
          <h2 className="text-lg font-bold text-center">For even more exclusive content!</h2>
          <div className="flex items-center space-x-4">
            <FaFacebook className="text-red-500 cursor-pointer" size={20} />
            <FaTwitter className="text-red-500 cursor-pointer" size={20} />
            <FaTimes className="text-red-500 cursor-pointer" size={20} />
          </div>
        </div>

        {/* Highlighted Articles */}
        <div className="bg-white relative p-6">
        <div className="flex items-center mb-4 absolute top-0 left-10 z-10 ">
              <span className="bg-red-500 text-white text-sm font-bold px-5 py-3 ">Breaking</span>
            </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
            
            {articles.map((article) => (
              <div
                key={article.id}
                className="relative group overflow-hidden  shadow-lg"
              >
                <Image
                  width={300}
                  height={400}
                  src={article.image}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {smallerArticles.map((article) => (
            <div
              key={article.id}
              className="bg-gray-100 p-4 rounded-lg shadow-sm flex gap-2"
            >
              <h3 className="text-sm font-bold mt-2"><span className="text-white bg-red-500 px-3 py-1 rounded self-start mr-2 mb-2  text-xs font-bold uppercase">
                {article.category}
              </span>{article.title}</h3>
              <Image
                src={article.image}
                alt={article.title}
                width={50}
                height={50}
                className="w-[100px] h-[100px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExclusiveContent;
