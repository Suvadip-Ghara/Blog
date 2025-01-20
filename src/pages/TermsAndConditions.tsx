import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function TermsAndConditions() {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions</title>
        <meta name="description" content="Read the terms and conditions for using BioAI Nexus." />
        <meta property="og:title" content="Terms and Conditions" />
        <meta property="og:description" content="Understand the terms and conditions for using our website." />
        <meta property="og:type" content="website" />
      </Helmet>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
          Terms and Conditions
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Welcome to BioAI Nexus! By using our website, you agree to the following terms and conditions. Please read them carefully.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          1. Use of the Website
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          The content on this website is for informational purposes only.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          You agree not to misuse the website or its content in any way.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          2. Intellectual Property
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          All content, including text, images, and tools, is owned by BioAI Nexus.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          You may not copy, distribute, or modify any content without permission.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          3. User Responsibilities
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Ensure that the information you provide is accurate and lawful.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Do not engage in activities that harm the website, its content, or other users.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          4. Limitation of Liability
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          BioAI Nexus is not responsible for any errors, delays, or damages caused by using the website.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Use the information and tools at your own risk.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          5. Changes to Terms
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          We reserve the right to update these terms at any time. Updates will be posted on this page.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          By continuing to use the website, you agree to these terms. If you disagree, please stop using the site.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Disclaimer
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          The information provided on BioAI Nexus is for general informational purposes only. While we strive to keep the content accurate and up to date, we make no guarantees of any kind about the completeness, accuracy, reliability, or suitability of the information.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Use the information and tools on this website at your own risk.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          We are not liable for any errors, omissions, or outcomes resulting from the use of our website.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          This website may contain links to external sites. We are not responsible for the content or reliability of these sites.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          By using BioAI Nexus, you acknowledge that the content is provided "as is" and agree that we are not responsible for any decisions or actions you take based on it.
        </p>
        <Link to="/privacy-policy" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
          Read our Privacy Policy
        </Link>
      </section>
    </>
  );
}