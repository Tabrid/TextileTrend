'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaPinterestP, FaWhatsapp } from "react-icons/fa";
import parse from 'html-react-parser';
import { useRouter } from "next/navigation";
import AutoChangingBanner5 from "../AutoChangingBanner5/page";
import baseUrl from "../services/baseUrl";
import Link from "next/link";
const BlogPageLayout = ({ data }) => {
    const router = useRouter();
    const [popular, setPopular] = useState([]);
    const [email, setEmail] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.includes("@")) {
            setMessage("Please enter a valid email address.");
            return;
        }

        if (!isChecked) {
            setMessage("You must accept the Privacy Policy.");
            return;
        }

        const response = await fetch(`${baseUrl}/api/subscribe`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (response.ok) {
            setMessage("Subscription successful!");
            setEmail("");
            setIsChecked(false);
        } else {
            setMessage(data.error);
            setEmail("");
        }
    };
    const postUrl = typeof window !== "undefined" ? window.location.href : ""; // Get the current page URL
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
    const shareOnFacebook = () => {
        const appId = "588951087305384"; // Replace with your actual App ID
        if (!appId) {
            console.error("Facebook App ID is required.");
            return;
        }

        if (typeof window !== "undefined") {
            const postUrl = encodeURIComponent(window.location.href);
            const shareUrl = `https://www.facebook.com/dialog/share?app_id=${appId}&display=popup&href=${postUrl}&quote=${encodeURIComponent("Check this out!")}`;

            window.open(shareUrl, "_blank", "width=600,height=400,noopener,noreferrer");
        }
    };



    const shareOnTwitter = () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(data?.title + " - " + data?.shortDescription)}&url=${encodeURIComponent(postUrl)}`;
        window.open(url, "_blank");
    };

    const shareOnWhatsapp = () => {
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(data?.title + " - " + data?.shortDescription + " " + postUrl)}`;
        window.open(url, "_blank");
    };
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
                            <button onClick={shareOnFacebook} className="bg-blue-600 text-white p-3 rounded-lg shadow hover:bg-blue-700">
                                <FaFacebookF />
                            </button>
                            <button onClick={shareOnTwitter} className="bg-blue-400 text-white p-3 rounded-lg shadow hover:bg-blue-500">
                                <FaTwitter />
                            </button>
                            <button onClick={shareOnWhatsapp} className="bg-green-500 text-white p-3 rounded-lg shadow hover:bg-green-600">
                                <FaWhatsapp />
                            </button>
                        </div>
                    </div>

                    {/* Subscribe Widget */}
                    <div className="bg-white p-4 rounded-lg shadow my-4">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Subscribe</h3>
                        <form onSubmit={handleSubmit}>
                            {/* Email Input */}
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                    checked={isChecked}
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                />
                                <label htmlFor="privacy-policy" className="text-sm text-gray-600">
                                    Ive read and accept the{" "}
                                    <Link href="/privacy-policy" className="text-red-500 underline">
                                        Privacy Policy
                                    </Link>
                                    .
                                </label>
                            </div>
                        </form>
                        {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
                    </div>

                    {/* Advertisement Widget */}
                    <div className="bg-white p-4 rounded-lg shadow mb-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Advertisement</h3>
                        <AutoChangingBanner5 />
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
