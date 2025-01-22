'use client';
import baseUrl from '@/components/services/baseUrl';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Publication = () => {
    const [publicationsData, setPublicationsData] = useState([]);
    const[segmentData, setSegmentData] = useState(null);
    const { publication } = useParams();
    useEffect(() => {
        const fetchSegments = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}/api/publications/publications/${publication}`
                );
                setSegmentData(response.data.data);
            } catch (error) {
                console.error("Error fetching segments:", error);
            }
        }
    
        fetchSegments();
    }, [publication]);

    console.log(publication);
    
    console.log(segmentData);
    
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
    return ( 
        <div className="bg-gray-100 min-h-screen md:p-6 lg:p-6">
            <div className=" mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header Section */}
                <div className="lg:p-6 md:p-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{segmentData?.title}</h1>
                    <iframe
                        src={segmentData?.link}
                        className="w-full lg:h-[600px]  md:h-[500px]  rounded-lg border border-gray-300"
                        frameBorder="0"
                        allowFullScreen
                        title="Textile Today July 2024 Issue">
                    </iframe>
                    <button className="mt-4 md:px-6 lg:px-6 px-4 lg:py-2 md:py-2 py-1 bg-red-500 text-white font-semibold rounded hover:bg-red-700">
                        Download Full Magazine
                    </button>
                </div>

                {/* Segments Section */}
                <div className="p-6 bg-gray-50">
                    <h2 className="md:text-xl lg:text-xl  font-semibold text-gray-700 mb-4">Segments of Our E-Magazine:</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {
                            publicationsData?.slice(0, 3).map((publication) => (
                                <PublicationCard
                                    key={publication._id}
                                    title={publication.title}
                                    imgSrc={publication.imgSrc}
                                    downloadLink={publication.downloadLink}
                                    slug={publication.slug}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Publication;


const PublicationCard = ({ title, slug}) => {
    const router = useRouter();
    const navigateToCategory = (slug) => {
        router.push(`/publication/${slug}`);
      };
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer" onClick={() => navigateToCategory(slug)}>
            <iframe
                src="https://publuu.com/flip-book/763147/1694091"
                className="w-full md:h-[400px] lg:h-[500px] rounded-lg border border-gray-300"
                frameBorder="0"
                allowFullScreen
                title="Textile Today July 2024 Issue">
            </iframe>
            <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
                <button
                    className="md:px-4 lg:px=4 px-2 md:py-2 lg:py-2 py-1 bg-red-500 text-white font-medium rounded hover:bg-red-700"
                >
                    Download
                </button>
            </div>
        </div>
    );
};



