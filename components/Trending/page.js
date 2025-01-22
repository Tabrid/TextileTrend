import React, { useEffect, useState } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import baseUrl from "../services/baseUrl";

const Trending = () => {
    const API_URL = `${baseUrl}/api/news/type/trending`;
    const [news, setNews] = useState([]);
    const [startIndex, setStartIndex] = useState(0); // Added state to track starting index
    const router = useRouter();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(API_URL);
                setNews(response.data);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        fetchNews();
    }, [API_URL]);

    console.log(news);

    function formatText(input) {
        return input
            .split('-')
            .map((word, index) =>
                index === 0
                    ? word.charAt(0).toUpperCase() + word.slice(1)
                    : word
            )
            .join(' ');
    }

    const handleTitleClick = (slug) => {
        router.push(`/blog/${slug}`);
    };

    const handlePrev = () => {
        setStartIndex((prevIndex) =>
            prevIndex === 0 ? news.length - 3 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setStartIndex((prevIndex) =>
            prevIndex + 3 >= news.length ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="bg-white py-4 border-b border-gray-200">
            <div className="container mx-auto px-4 md:px-8">
                {/* Trending Header */}
                <div className="flex items-center space-x-4 mb-4">
                    <h2 className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded">
                        Trending
                    </h2>
                    <div className="flex overflow-x-auto">
                        <Marquee>
                            {news?.slice(0, 2).map((item) => (
                                <span
                                    key={item._id}
                                    onClick={() => handleTitleClick(item.slug)}
                                    className="text-sm hover:text-red-600 text-gray-700 whitespace-nowrap hover:underline cursor-pointer ml-8"
                                >
                                    {item.title}
                                </span>
                            ))}
                        </Marquee>
                    </div>
                </div>
                {/* Trending Articles */}
                <div className="px-20 bg-gray-100 py-4 hidden md:flex lg:flex items-center gap-2">
                    <FaArrowLeft
                        className="text-red-600 text-2xl cursor-pointer"
                        onClick={handlePrev} // Added functionality to navigate left
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 transition-transform duration-500 ease-in-out transform">
                        {news
                            ?.slice(startIndex, startIndex + 3)
                            .map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-gray-100 rounded-lg shadow-sm w-full flex-shrink-0"
                                >
                                    <div className="px-4 py-2">
                                        <h3 className="text-sm font-bold mb-2">
                                            {item.category && (
                                                <span className="bg-red-600 text-white text-xs font-bold inline-block px-2 py-1 rounded mb-2 mr-2">
                                                    {formatText(item.category)}
                                                </span>
                                            )}
                                            <span
                                                onClick={() =>
                                                    handleTitleClick(item.slug)
                                                }
                                                className="hover:underline cursor-pointer"
                                            >
                                                {item.title}
                                            </span>
                                        </h3>
                                        {item.date && (
                                            <p className="text-xs text-gray-500">
                                                {item.date}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                    <FaArrowRight
                        className="text-red-600 text-2xl cursor-pointer"
                        onClick={handleNext} // Added functionality to navigate right
                    />
                </div>
            </div>
        </div>
    );
};

export default Trending;
