import { Helmet } from 'react-helmet-async';

export default function Disclaimer() {
  return (
    <>
      <Helmet>
        <title>Disclaimer</title>
        <meta name="description" content="Read the disclaimer for BioAI Nexus." />
        <meta property="og:title" content="Disclaimer" />
        <meta property="og:description" content="Understand the disclaimer for using our website." />
        <meta property="og:type" content="website" />
      </Helmet>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
          Disclaimer
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          The information provided on BioAI Nexus is for general informational purposes only. While we strive to keep the content accurate and up to date, we make no guarantees of any kind about the completeness, accuracy, reliability, or suitability of the information.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Key Points
        </h2>
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
      </section>
    </>
  );
}