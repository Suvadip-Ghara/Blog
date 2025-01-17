import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us | Bolt Blog</title>
        <meta name="description" content="Get in touch with the Bolt Blog team" />
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Contact Us</h1>
        {/* Contact form will be implemented here */}
        <p className="text-gray-600 dark:text-gray-300">Contact form coming soon.</p>
      </div>
    </>
  );
}