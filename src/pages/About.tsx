import { Helmet } from 'react-helmet-async';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About BioAI Nexus</title>
        <meta name="description" content="Learn more about BioAI Nexus, your go-to platform for cutting-edge solutions in bioinformatics, science, and technology." />
        <meta property="og:title" content="About BioAI Nexus" />
        <meta property="og:description" content="Discover our mission, team, and the innovative solutions we provide." />
        <meta property="og:type" content="website" />
      </Helmet>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
          About BioAI Nexus
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Welcome to BioAI Nexus, your go-to platform for cutting-edge solutions in bioinformatics, science, and technology. Our mission is to simplify complex concepts, share the latest developments in the world of science and artificial intelligence (AI), and provide practical solutions to everyday technology challenges.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Whether you're navigating bioinformatics tools, exploring AI applications, or solving computer installation issues, BioAI Nexus is here to guide you step by step. We aim to empower researchers, tech enthusiasts, and curious minds by offering insights, tutorials, and problem-solving resources tailored to your needs.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Stay updated with the latest trends in science and technology, discover innovative tools, and tackle tech challenges with ease. At BioAI Nexus, we believe in bridging the gap between science, technology, and accessibility. Let's innovate and grow together!
        </p>
      </section>
    </>
  );
}