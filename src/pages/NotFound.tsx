import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Bolt Blog</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </>
  );
}