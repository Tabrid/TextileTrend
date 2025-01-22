import React from "react";
import Image from "next/image";
import baseUrl from "../services/baseUrl";
const FeaturedArticle = ({ data }) => {
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
    
    return (
        <div className="">
            <div className="relative bg-gray-100 md:m-10 lg:m-10 m-4">
                {/* Background Image */}
                <div className="relative w-full h-[500px]">
                    <Image
                        width={600}
                        height={100}
                        src={`${baseUrl}/${data?.coverImage}`}
                        alt="Featured Article"
                        className="rounded-lg w-full h-full object-cover"
                    />
                </div>

                {/* Overlay Content */}
                <div className="absolute  inset-0 bg-black bg-opacity-50 flex flex-col justify-center gap-7 items-center text-center p-6">
                    <span className="text-white font-bold text-sm uppercase tracking-wider">{data?.category &&   formatTitle(data?.category)}</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 md:w-2/3 lg:w-2/3 w-full" style={{ fontFamily: 'PT Serif' }}>
                        {data?.title}
                    </h1>

                </div>
            </div>
            <div className=" flex justify-center ">
                <div className=" my-2 flex flex-col md:flex-row lg:flex-row ">
                    <span className="text-sm text-center font-bold">By: Admin</span>
                    <span className="mx-4 hidden md:block lg:block">|</span>
                    <span className="text-sm text-center font-bold mb-3">Date: {  data?.createdAt &&    formatDate(data?.createdAt)}</span>
                </div>
            </div>
        </div>
    );
};

export default FeaturedArticle;
