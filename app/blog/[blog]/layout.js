import baseUrl from '@/components/services/baseUrl';

async function fetchBlogData(slug) {
  try {
    const response = await fetch(`${baseUrl}/api/news/slug/${slug}`);
    if (!response.ok) throw new Error("Failed to fetch blog data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching blog metadata:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { blog } = params;
  const categoryData = await fetchBlogData(blog);

  if (!categoryData) {
    return {
      title: 'Error Loading Blog',
      description: 'There was an error loading this blog post.',
    };
  }

  return {
    metadataBase: new URL("https://textiletrend.net"),
    title: categoryData.title || 'Blog Page',
    description: categoryData.shortDescription || 'Explore the latest blog content',
    openGraph: {
      title: categoryData.title || 'Blog Page',
      description: categoryData.shortDescription || 'Explore the latest blog content',
      url: `https://textiletrend.net/blog/${categoryData.slug}`,
      type: 'article',
      images: [
        {
          url: `${baseUrl}/${categoryData.coverImage}` || '/default-image.jpg',
          alt: categoryData.title || 'Blog Page',
          width: 1200, 
          height: 630,
        },
      ],
    },
  };
}

export default function BlogLayout({ children }) {
  return <>{children}</>;
}
