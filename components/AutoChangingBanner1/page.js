import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import baseUrl from "../services/baseUrl";

const AutoChangingBanner1 = () => {
  const API_URL = `${baseUrl}/api/banners/frontend`;
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data.length > 0) {
          setImages(response.data[0].images); 
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, [API_URL]);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setAnimate(true); 
        setTimeout(() => {
          setAnimate(false); 
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 500); 
      }, 5000); 
      return () => clearInterval(interval); 
    }
  }, [images]);

  return (
    <div className="relative overflow-hidden w-full h-[100px]">
      {images.length > 0 ? (
        <div
          className={`w-full h-full transition-transform duration-500 ease-in-out ${images.length > 1 && animate ? "translate-x-full" : "translate-x-0"
            }`}
        >
          <a href={images[currentIndex].link}>
            <Image
              width={800}
              height={100}
              src={`${baseUrl}/${images[currentIndex].url.replace(/\\/g, "/")}`}
              alt="Auto Changing Banner"
              className="w-full h-[100px] object-cover"
            />
          </a>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default AutoChangingBanner1;
