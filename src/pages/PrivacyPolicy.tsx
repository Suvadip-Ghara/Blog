import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy</title>
        <meta name="description" content="Learn about BioAI Nexus's privacy policy and how we protect your personal information." />
        <meta property="og:title" content="Privacy Policy" />
        <meta property="og:description" content="Understand our privacy practices and how we handle your data." />
        <meta property="og:type" content="website" />
      </Helmet>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
          Privacy Policy
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          At BioAI Nexus, we value your privacy and are committed to protecting your personal information.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          What We Collect
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Personal Information: Information you provide, like your name or any details shared with us.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Usage Data: Information about how you use our website, such as pages visited or time spent on the site.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          How We Use It
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          To improve our website and services.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          To provide a better experience for our users.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Your Data
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          We keep your data secure and do not share it with third parties unless required by law.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Cookies
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Our website uses cookies to enhance your experience. You can disable cookies in your browser settings if you prefer.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Policy Updates
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          We may update this policy from time to time. Please check this page for any changes.
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
        <Link to="/terms-and-conditions" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
          Read our Terms and Conditions
        </Link>
      </section>
    </>
  );
}