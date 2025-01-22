"use client"
import BlogLayout from '@/components/BlogLayout/page'
import MusicSection from '@/components/MusicSection/page'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import baseUrl from '@/components/services/baseUrl'

export default function CategoryPage() {
  const { category } = useParams();
  const [categoryData, setCategoryData] = useState(null);
 
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/news/category/${category}`);
        setCategoryData(response.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    if (category) {
      fetchCategoryData();
    }
  }, [category]);
  return (
    <div>
      <MusicSection data={categoryData} category={category} />
      <BlogLayout data={categoryData} />
    </div>
  );
}
