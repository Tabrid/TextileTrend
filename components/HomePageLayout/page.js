'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import AutoChangingBanner1 from "../AutoChangingBanner1/page";
import AutoChangingBanner2 from "../AutoChangingBanner2/page";
import baseUrl from "../services/baseUrl";

const HomePageLayout = () => {
    const router = useRouter();
    const [fresh, setFresh] = useState([]);
    const [popular, setPopular] = useState([]);
    const [trending, setTrending] = useState({});
    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/news/type/trending`);
                const data = await response.json();
                setTrending(data[0]);
            } catch (error) {
                console.error("Error fetching trending stories:", error);
            }
        }
        fetchTrending();
    }, [])
    console.log(trending);

    useEffect(() => {
        const fetchFresh = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/news/type/fresh-stories`);
                const data = await response.json();
                setFresh(data);
            } catch (error) {
                console.error("Error fetching fresh stories:", error);
            }
        }
        fetchFresh();
    }, [])

    useEffect(() => {
        const fetchPopular = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/news/type/popular`);
                const data = await response.json();
                setPopular(data);
            } catch (error) {
                console.error("Error fetching popular stories:", error);
            }
        }
        fetchPopular();
    }, [])

    function formatTitle(text) {
        if (typeof text !== 'string') {
            console.error('Invalid input to formatTitle:', text);
            return '';
        }
        return text
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
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
        <div className="container mx-auto mt-6">
            {/* Header Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Column: Fresh Stories */}
                <div className="hidden md:block lg:block space-y-6">
                    <AutoChangingBanner1 />

                    <div className="flex justify-end">
                        <div className="bg-white shadow-lg p-4 rounded-lg w-[70%]">
                            <h3 className="text-lg font-bold mb-4">Fresh Stories</h3>
                            {fresh?.slice(0, 4).map((story) => (
                                <div key={story._id} className="mb-4">
                                    <p className="text-xs text-red-500 font-bold ">{story.category &&  formatTitle(story.category)}</p>
                                    <h4 className="text-sm font-semibold hover:underline hover:text-red-600 cursor-pointer" onClick={() => handleTitleClick(story.slug)}>{story.title}</h4>
                                    <p className="text-xs text-gray-500">{ story.createdAt &&   formatDate(story.createdAt)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Center Column: Featured Story */}
                <div className="col-span-2 flex flex-col md:flex-row lg:flex-row  gap-3">
                    <div className="relative group  overflow-hidden shadow-lg md:w-[70%] lg:w-[70%] w-full  ">
                        <Image
                            width={600}
                            height={400}
                            src={`${baseUrl}/${trending.coverImage}`}
                            alt="Featured Story"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
                            <span className="bg-red-500 text-xs uppercase px-2 py-1 rounded text-white">
                                {trending?.category &&    formatTitle(trending?.category)}
                            </span>
                            <h2 className="text-white text-2xl font-bold mt-2">
                                {trending?.title}
                            </h2>
                            <p className="text-gray-300 text-sm mt-2">
                                {trending?.shortDescription}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-6 md:w-[30%] lg:w-[30%] w-full h-fit ">
                        {popular.slice(0, 4).map((story) => (
                            <div key={story._id} className="relative group overflow-hidden  shadow-md cursor-pointer" onClick={() => handleTitleClick(story.slug)}>
                                <Image
                                    width={300}
                                    height={200}
                                    src={`${baseUrl}/${story.coverImage}`}
                                    alt={story.title}
                                    className="w-full md:h-32 lg:h-32 h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
                                    <p className="text-xs">{story.category &&   formatTitle(story.category)}</p>
                                    <h4 className="text-sm font-semibold">{story.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Popular Stories */}
                <div className="ml-7 md:ml-0 lg:ml-0">
                    <div className="space-y-6">
                        <AutoChangingBanner2 />

                        <div className="bg-white shadow-lg p-4 rounded-lg md:w-[70%] lg:w-[70%] w-full">
                            <h3 className="text-lg font-bold mb-4">Popular</h3>
                            {popular.slice(0, 4).map((story) => (
                                <div key={story._id} className="mb-4">
                                    <p className="text-xs text-red-500 font-bold ">{story.category &&   formatTitle(story.category)}</p>
                                    <h4 className="text-sm font-semibold hover:underline hover:text-red-600 cursor-pointer" onClick={() => handleTitleClick(story.slug)}>{story.title}</h4>
                                    <p className="text-xs text-gray-500">{story.createdAt &&    formatDate(story.createdAt)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePageLayout;
