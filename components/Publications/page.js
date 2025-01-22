'use client'

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import Slider from "react-slick";
import baseUrl from "../services/baseUrl";

const Publications = () => {
  const router = useRouter();
  const [publicationsData, setPublicationsData] = useState([]);
  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/publications`
        );
        setPublicationsData(response.data);
      } catch (error) {
        console.error("Error fetching publications:", error);
      }
    };

    fetchPublications();
  }, []);

 
  const navigateToCategory = (slug) => {
    router.push(`/publication/${slug}`);
  };
  return (
    <div className=" py-8 px-6 md:px-10 lg:px-10">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Latest Publications</h2>
          <h1 className="text-red-500 hover:underline cursor-pointer" onClick={() => router.push("/publication")}>
            View More
          </h1>
        </div>

        {/* Carousel */}
        <Slider {...settings}>
          {publicationsData.map((publication) => (
            <div key={publication._id} className="p-2 relative cursor-pointer" onClick={() => navigateToCategory(publication.slug)}>
              <div className="bg-white rounded shadow overflow-hidden ">
                <div className="relative w-full h-[450px]">
                  <Image
                    src={`${baseUrl}/${publication.frontpage}`}
                    alt={publication.title}
                    className="w-full h-full object-cover"
                    width={300}
                    height={400}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
                </div>


              </div>
              <div className="p-4 text-center absolute bottom-4 left-0 right-0">
                <h1 className="bg-red-500 text-white py-2 px-4 rounded text-center">
                  {publication.title}
                </h1>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

// Custom Next Arrow
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} bg-black rounded-full `}
      style={{ ...style, display: "block", right: "10px" }}
      onClick={onClick}
    />
  );
}

// Custom Prev Arrow
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} bg-black rounded-full`}
      style={{ ...style, display: "block", left: "10px", zIndex: 1 }}
      onClick={onClick}
    />
  );
}

export default Publications;
