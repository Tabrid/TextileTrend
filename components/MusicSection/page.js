import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import baseUrl from "../services/baseUrl";

const MusicSection = ({ category ,data }) => {
    const router = useRouter();
    function formatTitle(text) {
        return text
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }
    const handleTitleClick = (slug) => {
        router.push(`/blog/${slug}`);
    };
    return (
        <div className="bg-white p-0 md:p-8 lg:p-8 ">
            <h1 className="text-4xl font-bold text-center mb-6">{category &&    formatTitle(category)}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data?.slice(0,4).map((article) => (
                    <div
                        key={article._id}
                        className="bg-white shadow-md group rounded-lg overflow-hidden relative cursor-pointer" onClick={() => handleTitleClick(article.slug)}
                    >
                        <div className="relative">
                            <Image
                                width={1000}
                                height={1000}
                                src={`${baseUrl}/${article.coverImage}`}
                                alt={article.title}
                                className="w-full h-[400px] object-cover  group-hover:scale-105 transition-transform duration-300"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
                        </div>
                        <div className="p-4 absolute bottom-0 left-0 right-0">
                            <span className="text-white bg-red-500 px-2 py-1 text-sm font-semibold uppercase">
                                {article.category &&   formatTitle(article.category)}
                            </span>
                            <h2 className="mt-2 font-semibold text-lg text-white">{article.title}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MusicSection;
