'use client';
import baseUrl from '@/components/services/baseUrl';
import { useEffect, useState } from 'react';

// Static imports
import AutoChangingBanner3 from '@/components/AutoChangingBanner3/page';
import AutoChangingBanner4 from '@/components/AutoChangingBanner4/page';
import Exclusive from '@/components/Exclusive/page';
import FoodAndTravel from '@/components/FoodAndTravel/page';
import HomePageLayout from '@/components/HomePageLayout/page';
import Publications from '@/components/Publications/page';
import Trending from '@/components/Trending/page';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const API_URL = `${baseUrl}/api/categories/status/true`;
  
  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [API_URL]);

  return (
    <main className="overflow-x-hidden">
      <Trending />
      <HomePageLayout />
      {categories.map((category, index) => (
        <div key={category._id || index}>
          <FoodAndTravel category={category} />
        </div>
      ))}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 my-14 md:mx-20 lg:mx-20">
        <AutoChangingBanner3 />
        <AutoChangingBanner4 />
      </div>
      <Exclusive />
      <Publications />
    </main>
  );
}
