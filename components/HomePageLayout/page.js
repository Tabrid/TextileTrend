import Image from "next/image";
import React from "react";

const HomePageLayout = () => {
    const freshStories = [
        {
            id: 1,
            title: "Cover Girl Announces Star Shine Makeup Line Is Due for Next December",
            category: "Beauty",
            date: "September 29, 2021",
        },
        {
            id: 2,
            title: "Customer Engagement: New Strategy for the Economy",
            category: "Marketing",
            date: "September 29, 2021",
        },
        {
            id: 3,
            title: "Social Media Marketing for Franchises Is Meant for Women",
            category: "Social Media",
            date: "September 29, 2021",
        },
        {
            id: 4,
            title: "Mobile Marketing Is Said to Be the Future of E-Commerce",
            category: "Tech",
            date: "September 29, 2021",
        },
    ];

    const popularStories = [
        {
            id: 1,
            title: "Social Media Marketing for Franchises Is Meant for Women",
            category: "Marketing",
            date: "September 29, 2021",
        },
        {
            id: 2,
            title: "A Look at How Social Media & Mobile Gaming Can Increase Sales",
            category: "Tech",
            date: "September 29, 2021",
        },
        {
            id: 3,
            title: "The Secret to Your Company's Financial Health Is Very Important",
            category: "Finance",
            date: "September 29, 2021",
        },
    ];

    return (
        <div className="container mx-auto mt-6">
            {/* Header Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Column: Fresh Stories */}
                <div className="space-y-6">
                    <Image
                        width={600}
                        height={100}
                        src="https://i.ibb.co/WK3TZpP/rec-co-jpg.png"
                        alt="Fresh Stories"
                        className="w-full h-[100px] object-cover"
                    />

                    <div className="flex justify-end">
                        <div className="bg-white shadow-lg p-4 rounded-lg w-[70%]">
                            <h3 className="text-lg font-bold mb-4">Fresh Stories</h3>
                            {freshStories.map((story) => (
                                <div key={story.id} className="mb-4">
                                    <p className="text-xs text-red-500 font-bold">{story.category}</p>
                                    <h4 className="text-sm font-semibold">{story.title}</h4>
                                    <p className="text-xs text-gray-500">{story.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Center Column: Featured Story */}
                <div className="col-span-2 flex gap-3">
                    <div className="relative group  overflow-hidden shadow-lg w-[70%]">
                        <Image
                            width={600}
                            height={400}
                            src="https://i.ibb.co/F5CdhmQ/Container-1.png"
                            alt="Featured Story"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
                            <span className="bg-red-500 text-xs uppercase px-2 py-1 rounded text-white">
                                Exclusive
                            </span>
                            <h2 className="text-white text-2xl font-bold mt-2">
                                Social Media Marketing for Franchises Is Meant for Women
                            </h2>
                            <p className="text-gray-300 text-sm mt-2">
                                Trends and insights on how to expand your reach in the digital
                                space.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-6 w-[30%]">
                        {popularStories.map((story) => (
                            <div key={story.id} className="relative group overflow-hidden  shadow-md">
                                <Image
                                    width={300}
                                    height={200}
                                    src="https://i.ibb.co/F5CdhmQ/Container-1.png"
                                    alt={story.title}
                                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
                                    <p className="text-xs">{story.category}</p>
                                    <h4 className="text-sm font-semibold">{story.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Popular Stories */}
                <div className="space-y-6">
                    <Image
                        width={600}
                        height={100}
                        src="https://i.ibb.co/WK3TZpP/rec-co-jpg.png"
                        alt="Fresh Stories"
                        className="w-full h-[100px] object-cover"
                    />

                    <div className="bg-white shadow-lg p-4 rounded-lg w-[70%]">
                        <h3 className="text-lg font-bold mb-4">Popular</h3>
                        {popularStories.map((story) => (
                            <div key={story.id} className="mb-4">
                                <p className="text-xs text-red-500 font-bold">{story.category}</p>
                                <h4 className="text-sm font-semibold">{story.title}</h4>
                                <p className="text-xs text-gray-500">{story.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePageLayout;
