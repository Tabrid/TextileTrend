'use client'
import BlogPageLayout from '@/components/BlogPageLayout/page'
import FeaturedArticle from '@/components/FeaturedArticle/page'
import baseUrl from '@/components/services/baseUrl';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function Blog() {
  const { blog } = useParams();
  const [categoryData, setCategoryData] = useState(null);
 
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/news/slug/${blog}`);
        setCategoryData(response.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    if (blog) {
      fetchCategoryData();
    }
  }, [blog]);

  
  return (
    <div>
      <FeaturedArticle data={categoryData}/>
      <BlogPageLayout  data={categoryData}/>
    </div>
  )
}

export default Blog