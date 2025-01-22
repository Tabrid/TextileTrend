import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import baseUrl from "../services/baseUrl";

const AutoChangingBanner3 = () => {
  const API_URL = `${baseUrl}/api/banners`;
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false); // State to handle animation

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data.length > 0) {
          setImages(response.data[0].images); // Set images from the first index
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, [API_URL]);

  useEffect(() => {
    if (images.length > 1) { // Only apply animation and interval if there are multiple images
      const interval = setInterval(() => {
        setAnimate(true); // Start animation
        setTimeout(() => {
          setAnimate(false); // Reset animation
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 500); // Transition duration (match CSS duration)
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval); // Cleanup on component unmount
    }
  }, [images]);

  return (
    <div className="relative overflow-hidden w-full h-[100px]">
      {images.length > 0 ? (
        <div
          className={`w-full h-full transition-transform duration-500 ease-in-out ${
            images.length > 1 && animate ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <Image
            width={800}
            height={100}
            src={`${baseUrl}/${images[currentIndex].url.replace(/\\/g, "/")}`}
            alt="Auto Changing Banner"
            className="w-full h-[100px] object-cover"
          />
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default AutoChangingBanner3;
