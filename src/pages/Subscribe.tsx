import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';

export default function Subscribe() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Save subscription to a subscriptions table or send a confirmation email
      toast.success('Subscription successful!');
      setEmail('');
    } catch (error) {
      toast.error('Error subscribing');
    }
  };

  return (
    <>
      <Helmet>
        <title>Subscribe | BioAI Nexus</title>
        <meta name="description" content="Subscribe to BioAI Nexus for the latest updates." />
        <meta property="og:title" content="Subscribe" />
        <meta property="og:description" content="Subscribe to BioAI Nexus for the latest updates." />
        <meta property="og:type" content="website" />
      </Helmet>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
          Subscribe to BioAI Nexus
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </section>
    </>
  );
}