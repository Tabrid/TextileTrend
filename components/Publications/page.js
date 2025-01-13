import Image from "next/image";
import React from "react";
import Slider from "react-slick";

const Publications = () => {
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

  // Publication data
  const publications = [
    {
      id: 1,
      image: "https://i.ibb.co/VDHhthM/38-proyectos-agropecuarios-1024x576.jpg",
      title: "May 2024",
    },
    {
      id: 2,
      image: "https://i.ibb.co/VDHhthM/38-proyectos-agropecuarios-1024x576.jpg",
      title: "April 2024",
    },
    {
      id: 3,
      image: "https://i.ibb.co/VDHhthM/38-proyectos-agropecuarios-1024x576.jpg",
      title: "March 2024",
    },
    {
      id: 4,
      image: "https://i.ibb.co/VDHhthM/38-proyectos-agropecuarios-1024x576.jpg",
      title: "February 2024",
    },
  ];

  return (
    <div className=" py-8 px-10">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Latest Publications</h2>
          <a href="#" className="text-red-500 hover:underline">
            View More
          </a>
        </div>

        {/* Carousel */}
        <Slider {...settings}>
          {publications.map((publication) => (
            <div key={publication.id} className="p-2 relative">
              <div className="bg-white rounded shadow overflow-hidden ">
                <div className="relative w-full h-80">
                  <Image
                    src={publication.image}
                    alt={publication.title}
                    className="w-full h-full object-cover"
                    width={300}
                    height={400}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
                </div>


              </div>
              <div className="p-4 text-center absolute bottom-4 right-[30%]">
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
