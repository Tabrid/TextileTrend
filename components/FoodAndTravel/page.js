import Image from "next/image";
import React from "react";

const FoodAndTravel = () => {
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

  return (
    <div className="bg-white px-10 mt-10">
      {/* Header */}
      <div className="flex justify-between items-center border-b-4 border-[#EC3535]  pb-2 mb-6">
        <h2 className="text-2xl font-bold">Food & travel</h2>
        <a href="#" className="text-red-500 text-sm font-semibold hover:underline">
          VIEW ALL →
        </a>
      </div>

      {/* Featured Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {articles.map((article) => (
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

      {/* Smaller Articles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {smallerArticles.map((article) => (
          <div key={article.id} className="flex space-x-3">
            <Image
              width={100}
              height={100}
              src={article.image}
              alt={article.title}
              className="w-16 h-16 object-cover "
            />
            <div className="flex flex-col">
              {article.tag && (
                <span className="text-red-500 text-xs uppercase font-bold mb-1">
                  {article.tag}
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
