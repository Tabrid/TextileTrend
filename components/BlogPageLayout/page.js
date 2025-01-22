'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaPinterestP, FaWhatsapp } from "react-icons/fa";
import parse from 'html-react-parser';
import { useRouter } from "next/navigation";
import AutoChangingBanner5 from "../AutoChangingBanner5/page";
import baseUrl from "../services/baseUrl";
const BlogPageLayout = ({ data }) => {
    const router = useRouter();
    const [popular, setPopular] = useState([]);
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
    const handleTitleClick = (slug) => {
        router.push(`/blog/${slug}`);
    };
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
    return (
        <div className="bg-gray-100 md:p-8 lg:p-8 p-0">
            <div className="container  grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Blog Content */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                        <div>{data?.description ? <p>{parse(data?.description)}</p> : <p>No content available.</p>}</div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:sticky lg:top-8 h-fit overflow-y-auto">
                    {/* Share Widget */}
                    <div className="bg-white py-8 px-4 rounded-lg shadow">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                            SHARE POST:
                        </h3>
                        <div className="flex justify-center space-x-4">
                            <button className="bg-red-500 text-white p-3 rounded-lg shadow hover:bg-red-600">
                                <FaFacebookF />
                            </button>
                            <button className="bg-red-500 text-white p-3 rounded-lg shadow hover:bg-red-600">
                                <FaTwitter />
                            </button>
                            <button className="bg-red-500 text-white p-3 rounded-lg shadow hover:bg-red-600">
                                <FaPinterestP />
                            </button>
                            <button className="bg-red-500 text-white p-3 rounded-lg shadow hover:bg-red-600">
                                <FaWhatsapp />
                            </button>
                        </div>
                    </div>

                    {/* Subscribe Widget */}
                    <div className="bg-white p-4 rounded-lg shadow my-4">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Subscribe</h3>
                        <form>
                            {/* Email Input */}
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-red-500 text-white font-semibold p-3 rounded-lg hover:bg-red-600 flex justify-center items-center"
                            >
                                I WANT IN
                                <span className="ml-2">→</span>
                            </button>

                            {/* Privacy Policy */}
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

                    {/* Advertisement Widget */}
                    <div className="bg-white p-4 rounded-lg shadow mb-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Advertisement</h3>
                        <AutoChangingBanner5/>
                    </div>

                    {/* Popular Posts */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Popular</h3>
                        <div>
                            {popular.slice(0, 4).map((story) => (
                                <div key={story._id} className="relative group overflow-hidden mt-2  shadow-md cursor-pointer" onClick={() => handleTitleClick(story.slug)}>
                                    <Image
                                        width={300}
                                        height={200}
                                        src={`${baseUrl}/${story.coverImage}`}
                                        alt={story.title}
                                        className="w-full md:h-32 lg:h-32 h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
                                        <p className="text-xs">{story.category && formatTitle(story.category)}</p>
                                        <h4 className="text-sm font-semibold">{story.title}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPageLayout;
