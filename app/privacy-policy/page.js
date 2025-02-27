"use client"

import baseUrl from '@/components/services/baseUrl';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function PrivacyPolicy() {
  const [content, setContent] = useState("");
  // Fetch the about page content
  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/privacy-policy`);
        setContent(data.content); // Assuming `content` contains the About page text
        console.log(data.content);
        
      } catch (error) {
        console.error("Error fetching about content:", error);
      }
    };

    fetchAboutContent();
  }, []);
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center mb-8">Privacy Policy</h1>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl  p-4 rounded-md "
          ></div>
          {/* <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">
              At Textile Trend, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              We may collect personal information such as your name, email address, and phone number when you voluntarily submit it to us.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect to provide, maintain, and improve our services, as well as to communicate with you about updates and offers.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">Cookies</h2>
            <p className="text-gray-700 mb-4">
              We use cookies to enhance your experience on our site. You can choose to disable cookies through your browser settings, but this may affect your ability to use certain features.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">Third-Party Links</h2>
            <p className="text-gray-700 mb-4">
              Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of these sites.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">Changes to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@textiletrend.com" className="text-blue-500">info@textiletrend.net</a>.
            </p>
          </div> */}
        </div>
      </div>
    );
  }