import React from "react";
import Marquee from "react-fast-marquee";
const Trending = () => {
    // Data for trending items
    const trendingItems = [
        {
            id: 1,
            category: "Trending",
            title: "Entrepreneurial Advertising: The Future Of Marketing",
            date: "October 2023",
        },
        {
            id: 2,
            category: "Trending",
            title: "10 Cool Startups that Will Change Your Perspective on Clothes & Fashion",
            date: "October 2023",
        },
        {
            id: 3,
            category: "Trending",
            title: "10 Outfits Inspired by Famous Art are Sold in London",
            date: "October 2023",
        },
    ];

    return (
        <div className="bg-white py-4 border-b border-gray-200">
            <div className="container mx-auto px-4 md:px-8">
                {/* Trending Header */}
                <div className="flex items-center space-x-4 mb-4">
                    <h2 className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded">
                        Trending
                    </h2>
                    <div className="flex overflow-x-auto space-x-8">
                        <Marquee>
                            {trendingItems.map((item) => (
                                <span
                                    key={item.id}
                                    className="text-sm text-gray-700 whitespace-nowrap hover:underline cursor-pointer"
                                >
                                    {item.title}
                                </span>
                            ))}
                        </Marquee>
                    </div>
                </div>

                {/* Trending Articles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-20 bg-gray-100 py-4">
                    {trendingItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-gray-100 rounded-lg shadow-sm w-full flex-shrink-0"
                        >
                            <div className="px-4 py-2">
                                
                                <h3 className="text-sm font-bold mb-2 ">{item.category && (
                                    <span className="bg-red-600 text-white text-xs font-bold inline-block px-2 py-1 rounded mb-2 mr-2">
                                        {item.category}
                                    </span>
                                )}{item.title}</h3>
                                {item.date && (
                                    <p className="text-xs text-gray-500">{item.date}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Trending;
