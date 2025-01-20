import { Helmet } from 'react-helmet-async';

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us</title>
        <meta name="description" content="Get in touch with the BioAI Nexus team for your queries, collaborations, or feedback." />
        <meta property="og:title" content="Contact BioAI Nexus" />
        <meta property="og:description" content="Reach out to us for any inquiries or collaborations." />
        <meta property="og:type" content="website" />
      </Helmet>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
          Contact Us
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          We’re a team of three passionate individuals dedicated to providing bioinformatics and technology solutions. Feel free to reach out to any of us for your queries, collaborations, or feedback.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Suvadip Ghara, PG Scholar
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Division of Fish Genetics and Biotechnology, College of Fisheries, Sher-e-Kashmir University of Agricultural Sciences and Technology of Kashmir, Jammu and Kashmir-India.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              📧 Email: suvadipgha20@gmail.com
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Shreyam Mandal, PG Scholar
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Department of Aquaculture, College of Fisheries, CAU(Imphal), Lembucherra, Tripura
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              📧 Email: shreyammandal006@gmail.com
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Sayan Biswas, PG Scholar
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Department of Aquaculture, College of Fisheries Science, Kamdhenu University, Veraval, Gandhinagar, India.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              📧 Email: sbiswas9051688@gmail.com
            </p>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            General Inquiry
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            📧 Email: suvadipgha20@gmail.com
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            🌐 Website: suvadipghara.com
          </p>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-8">
          Let’s work together to create innovative solutions!
        </p>
      </section>
    </>
  );
}