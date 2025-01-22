'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import baseUrl from "../services/baseUrl";


const BlogLayout = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items per page
    const totalPages = Math.ceil(data?.length / itemsPerPage);

    const router = useRouter();

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Intl.DateTimeFormat("en-US", options).format(date);
    }

    const handleTitleClick = (slug) => {
        router.push(`/blog/${slug}`);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Paginated data
    const paginatedData = data?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const [popular, setPopular] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchPopular = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/news/type/popular`);
                const data = await response.json();
                setPopular(data);
            } catch (error) {
                console.error("Error fetching popular stories:", error);
            }
        };
        fetchPopular();
    }, []);

    // Handler for navigating left
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? popular.length - 1 : prevIndex - 1));
    };

    // Handler for navigating right
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === popular.length - 1 ? 0 : prevIndex + 1));
    };

    if (popular.length === 0) {
        return <div>Loading...</div>;
    }

    const currentPost = popular[currentIndex];
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
        <div className="bg-gray-100 md:p-8 lg:p-8 p-1">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Articles Section */}
                <div className="lg:col-span-2">
                    {paginatedData?.map((article) => (
                        <div
                            key={article._id}
                            className="md:flex lg:flex items-start space-x-4 group cursor-pointer bg-white p-4 rounded-lg shadow mb-6"
                        >
                            <div className="md:w-1/2 lg:w-1/2 w-full">
                                <Image
                                    width={800}
                                    height={100}
                                    src={`${baseUrl}/${article.coverImage}`}
                                    alt={article.title}
                                    className="w-full h-72 object-cover rounded-md"
                                />
                            </div>
                            <div className="md:w-1/2 lg:w-1/2 w-full md:mt-10 lg:mt-10 mt-4 space-y-3">
                                <h2
                                    className="text-2xl font-bold text-gray-800 group-hover:text-red-500"
                                    style={{ fontFamily: "PT Serif" }}
                                    onClick={() => handleTitleClick(article.slug)}
                                >
                                    {article.title}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Admin -
                                    {
                                        article.createdAt ? formatDate(article.createdAt) : ' '
                                    }

                                </p>
                                <p className="text-sm text-gray-600 mt-2">
                                    Find insights with high expectations and a lot of relevance...
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar Section */}
                <div className="lg:sticky lg:top-8 h-fit overflow-y-auto">
                    {/* Popular Section */}
                    <div className="overflow-hidden relative">
                        <div className="absolute top-0 left-10 bg-red-500 text-white text-sm font-bold uppercase px-4 py-2 z-10">
                            Popular
                        </div>
                        <div className="relative w-full h-[500px]">
                            <Image
                                src={`${baseUrl}/${currentPost.coverImage}`}// Replace with your actual key for the image URL
                                alt={currentPost.title}
                                layout="fill"
                                objectFit="cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                        </div>
                        <div className="absolute top-4 right-4 flex space-x-2">
                            <button
                                onClick={handlePrev}
                                className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                            >
                                <FaChevronLeft />
                            </button>
                            <button
                                onClick={handleNext}
                                className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                        <div className="p-4 absolute bottom-0 left-0 right-0">
                            <h3 className="text-lg font-bold text-white p-2 rounded">{currentPost.title}</h3>
                            <p className="text-sm text-white mt-2 p-2">By : Admin - {
                                currentPost.createdAt ? formatDate(currentPost.createdAt) : ' '
                            }</p>
                        </div>
                    </div>

                    {/* Subscribe Section */}
                    <div className="bg-white p-4 rounded-lg shadow my-4">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Subscribe</h3>
                        <form>
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-red-500 text-white font-semibold p-3 rounded-lg hover:bg-red-600 flex justify-center items-center"
                            >
                                I WANT IN
                                <span className="ml-2">→</span>
                            </button>
                            <div className="flex items-center mt-4">
                                <input
                                    type="checkbox"
                                    id="privacy-policy"
                                    className="mr-2"
                                    required
                                />
                                <label htmlFor="privacy-policy" className="text-sm text-gray-600">
                                    Ive read and accept the{" "}
                                    <a href="#" className="text-red-500 underline">
                                        Privacy Policy
                                    </a>
                                    .
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 rounded-full ${currentPage === index + 1 ? "bg-red-500 text-white" : "bg-gray-300"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BlogLayout;
