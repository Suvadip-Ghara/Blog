import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | Bolt Blog</title>
        <meta name="description" content="Learn more about Bolt Blog and our mission" />
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">About Us</h1>
        <div className="prose dark:prose-invert">
          <p>Welcome to Bolt Blog, a modern blogging platform built with React and powered by Bolt.</p>
        </div>
      </div>
    </>
  );
}