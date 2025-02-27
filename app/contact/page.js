'use client';

import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedin, FaFacebook } from 'react-icons/fa';
import baseUrl from '@/components/services/baseUrl';

const Contact = () => {
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    // Fetch contact information from the API
    const fetchContactInfo = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/contacts`);
        const data = await response.json();
        setContactInfo(data);
      } catch (error) {
        console.error('Error fetching contact information:', error);
      }
    };

    fetchContactInfo();
  }, []);

  if (!contactInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading contact information...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl w-full p-6 sm:p-10">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">Contact Us</h1>
        <div className="text-gray-600 mb-4">
          <div className="mb-2 flex flex-col sm:flex-row items-start sm:items-center">
            <div className="flex gap-2 items-center">
              <FaEnvelope className="text-red-600 mr-2" />
              <span className="whitespace-nowrap">Email:</span>
            </div>
            <div className="ml-2 flex flex-col sm:flex-row">
              {contactInfo?.emails?.map((email, index) => (
                <a
                  key={index}
                  href={`mailto:${email}`}
                  className="text-red-600 hover:underline sm:ml-2 mt-1 sm:mt-0"
                >
                  {email}
                </a>
              ))}
            </div>
          </div>
          <p className="mb-2 flex items-center">
            <FaPhoneAlt className="text-red-600 mr-2" />
            <span>Phone:</span>
            {contactInfo?.phones?.map((phone, index) => (
              <a
                key={index}
                href={`tel:${phone}`}
                className="ml-2 text-red-600 hover:underline"
              >
                {phone}
              </a>
            ))}
          </p>
          <p className="mb-4 flex items-center">
            <FaMapMarkerAlt className="text-red-600 mr-2" />
            <span>Address:</span>
            <span className="ml-2">{contactInfo.address}</span>
          </p>
          <p className="mb-2 flex items-center">
            <FaLinkedin className="text-red-600 mr-2" />
            <span>LinkedIn:</span>
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-red-600 hover:underline"
            >
              Textile Trend on LinkedIn
            </a>
          </p>
          <p className="mb-2 flex items-center">
            <FaFacebook className="text-red-600 mr-2" />
            <span>Facebook:</span>
            <a
              href={contactInfo.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-red-600 hover:underline"
            >
              Textile Trend on Facebook
            </a>
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Us Here</h2>
          <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.762688914182!2d90.35475951543123!3d23.755745394514407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7b546c1b3c7%3A0x9c8bd5c0e52d4a6f!2sBosila%20City%20Developers%20Ltd.!5e0!3m2!1sen!2sbd!4v1690732181074!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
