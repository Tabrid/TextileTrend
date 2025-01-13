import React from "react";
import Image from "next/image";

const CelebritySection = () => {
  // Data for celebrity articles
  const articles = [
    {
      id: 1,
      category: "Exclusive",
      title: "Kristen Stewart Visits the Toronto Film Festival with New Boyfriend",
      image: "https://i.ibb.co/sPRGM7D/Link-1.png", // Replace with your image URL
      author: "Cara Buch",
      date: "September 23, 2021",
      highlight: true,
    },
    {
      id: 2,
      title: "Celebrity Make-up Artist Gary Meyers Shows you His Beauty Tricks",
      image: "https://i.ibb.co/sPRGM7D/Link-1.png", // Replace with your image URL
      author: "Dara Bush",
      date: "September 23, 2021",
    },
    {
      id: 3,
      title: "The Biggest Hollywood Celebrities Visit the Ranches of California",
      image: "https://i.ibb.co/sPRGM7D/Link-1.png", // Replace with your image URL
      author: "Zan Rush",
      date: "September 23, 2021",
    },
    {
      id: 4,
      title: "The Most Popular Celebrity Name List of the Millennium is Here",
      image: "https://i.ibb.co/sPRGM7D/Link-1.png", // Replace with your image URL
      author: "Zan Rush",
      date: "September 23, 2021",
    },
    {
      id: 5,
      title: "Fashion Finder: Biggest Shows, Parties and Celebrity for New Years",
      image: "https://i.ibb.co/sPRGM7D/Link-1.png", // Replace with your image URL
      author: "Zan Rush",
      date: "September 23, 2021",
    },
    {
      id: 6,
      title: "iTunes is Now the Second Biggest Name in Music World Giants",
      image: "https://i.ibb.co/sPRGM7D/Link-1.png", // Replace with your image URL
      author: "Zan Rush",
      date: "September 25, 2021",
    },
  ];

  return (
    <div className="bg-white py-8 px-10">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold">Celebrity</h2>
        </div>

        {/* Highlighted Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.slice(0, 2).map((article) => (
            <div
              key={article.id}
              className={` overflow-hidden shadow-sm   flex`}
            >
              <Image
                src={article.image}
                alt={article.title}
                width={400}
                height={250}
                className="w-full h-auto object-cover"
              />
              <div className="p-4">
                {article.category && (
                  <span className="text-red-500 text-xs font-bold uppercase">
                    {article.category}
                  </span>
                )}
                <h3 className="text-sm font-bold mt-2">{article.title}</h3>
                <p className="text-xs text-gray-500  flex items-center gap-4 mt-2">
                  <Image
                    src={'https://i.ibb.co/PcdSRWd/20241029-232300.jpg'}
                    alt={article.title}
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px] object-cover rounded-full"
                  /> {article.author} - {article.date}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 mt-6 md:grid-cols-4 gap-6">
          {articles.slice(2, ).map((article) => (
            <div
              key={article.id}
              className={` overflow-hidden shadow-sm `}
            >
              <Image
                src={article.image}
                alt={article.title}
                width={400}
                height={250}
                className="w-full h-auto object-cover"
              />
              <div className="p-4">
                {article.category && (
                  <span className="text-red-500 text-xs font-bold uppercase">
                    {article.category}
                  </span>
                )}
                <h3 className="text-sm font-bold mt-2">{article.title}</h3>
                <p className="text-xs text-gray-500  flex items-center gap-4 mt-2">
                  <Image
                    src={'https://i.ibb.co/PcdSRWd/20241029-232300.jpg'}
                    alt={article.title}
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px] object-cover rounded-full"
                  /> {article.author} - {article.date}
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
