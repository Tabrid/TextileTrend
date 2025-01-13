import Image from "next/image";
import React from "react";

const ExclusiveContent = () => {
  const mainArticle = {
    title: "10 Outfits Inspired by Famous Art are Sold in London",
    description:
      "Find people with high expectations and a low tolerance for excuses. They'll have higher expectations for you than you have for yourself. Don't flatter yourself.",
    tag: "Exclusive",
    image: "https://i.ibb.co/nwHWNBx/Container.png", // Replace with your main image URL
  };

  const secondaryArticles = [
    {
      id: 1,
      category: "Marketing",
      tag: "Exclusive",
      title: "Customer Engagement: New Strategy for the Economy",
      image: "https://i.ibb.co/fqBRVGw/Link-2.png", // Replace with your image URL
    },
    {
      id: 2,
      category: "Finance",
      tag: "Exclusive",
      title: "Things to Look For in a Financial Trading Platform Environment",
      image: "https://i.ibb.co/fqBRVGw/Link-2.png", // Replace with your image URL
    },
    {
      id: 3,
      category: "Politics",
      tag: "Exclusive",
      title: "New Harvard Student Candidates Presented Minutes Before Results",
      image: "https://i.ibb.co/fqBRVGw/Link-2.png", // Replace with your image URL
    },
    {
      id: 4,
      category: "Tech",
      tag: "Exclusive",
      title: "New Soundboard from Bose Review: Pricing is Not Always the Only Criteria",
      image: "https://i.ibb.co/fqBRVGw/Link-2.png", // Replace with your image URL
    },
  ];

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg mx-14 relative mt-10" >
      {/* Header */}
      <div className="flex items-center mb-6 absolute top-0 left-16 z-10">
        <span className="bg-red-500 text-white text-sm font-bold px-5 py-3 ">
          Exclusive content
        </span>
      </div>
      {/* Main Article */}
      <div className="flex mb-8 gap-8 ">
        <div className=" w-2/5 relative group  overflow-hidden shadow-lg">
          <Image
            width={600}
            height={400}
            src={mainArticle.image}
            alt={mainArticle.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 left-0 right-0  p-6 text-white">
            <span className="bg-red-500 text-xs uppercase px-2 py-1 rounded">
              {mainArticle.tag}
            </span>
            <h2 className="text-xl font-bold mt-2">{mainArticle.title}</h2>
            <p className="text-sm mt-2">{mainArticle.description}</p>
          </div>
        </div>

        {/* Secondary Articles */}
        <div className="w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {secondaryArticles.map((article) => (
            <div key={article.id} className="flex flex-col space-y-2">
              <div className="relative group overflow-hidden  shadow-md">
                <Image
                  width={200}
                  height={150}
                  src={article.image}
                  alt={article.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white text-sm">
                  <span className="bg-red-500 text-xs uppercase px-2 py-1 rounded">
                    {article.tag}
                  </span>
                </div>
              </div>
              <p className="text-gray-500 text-xs uppercase">{article.category}</p>
              <h3 className="text-sm font-semibold">{article.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExclusiveContent;
