import React, { useEffect, useState } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";
import { useRouter } from "next/navigation";
import baseUrl from "../services/baseUrl";
import AutoChangingBanner1 from "../AutoChangingBanner1/page";
import AutoChangingBanner2 from "../AutoChangingBanner2/page";
import AutoChangingBanner6 from "../AutoChangingBanner6/page";

const Trending = () => {
    const API_URL = `${baseUrl}/api/news/type/trending`;
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [startIndex, setStartIndex] = useState(0);
    const router = useRouter();
    const [latestNews, setLatestNews] = useState([]);
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(API_URL);
                setNews(response.data);
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setIsLoading(false);
            }
        };
        const fetchLatestNews = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/news/latest`);
                setLatestNews(response.data.data);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchLatestNews();
        fetchNews();
        fetchNews();
    }, [API_URL]);

    function formatText(input) {
        return input
            .split("-")
            .map((word, index) =>
                index === 0
                    ? word.charAt(0).toUpperCase() + word.slice(1)
                    : word
            )
            .join(" ");
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
                            {isLoading
                                ? Array(2)
                                    .fill(null)
                                    .map((_, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-200 w-24 h-5 rounded-md ml-8 animate-pulse"
                                        ></div>
                                    ))
                                : news?.slice(0, 2).map((item) => (
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
                <div className="px-0 md:px-8 lg:px-10 bg-gray-100 md:py-4 lg:py-4 flex items-center gap-5">
                    <div className="w-full md:w-1/3 lg:w-1/3">
                        <AutoChangingBanner1 />
                    </div>
                    <div className="w-1/3 hidden md:flex lg:flex">
                        <AutoChangingBanner6 />
                    </div>
                    <div className="w-1/3 hidden md:flex lg:flex">
                        <AutoChangingBanner2 />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Trending;
