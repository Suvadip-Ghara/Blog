import { useState, useEffect, ChangeEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, TrendingUp, Clock, Loader2, Dna, Brain, Microscope } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Post } from '../types';
import toast from 'react-hot-toast';

interface PostWithAuthor extends Post {
  author: {
    full_name: string;
  };
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredPosts, setFeaturedPosts] = useState<PostWithAuthor[]>([]);
  const [recentPosts, setRecentPosts] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        // Fetch featured posts
        const { data: featured, error: featuredError } = await supabase
          .from('posts')
          .select('*, author:author_id(*)')
          .eq('published', true)
          .order('views', { ascending: false })
          .limit(2);

        if (featuredError) throw featuredError;

        // Fetch recent posts
        const { data: recent, error: recentError } = await supabase
          .from('posts')
          .select('*, author:author_id(*)')
          .eq('published', true)
          .order('created_at', { ascending: false })
          .limit(6);

        if (recentError) throw recentError;

        setFeaturedPosts(featured as PostWithAuthor[] || []);
        setRecentPosts(recent as PostWithAuthor[] || []);
      } catch (error) {
        toast.error('Failed to load posts');
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <>
        <Helmet>
        <title>BioAi Nexus - Biotechnology & AI Research Blog</title>
        <meta name="description" content="Explore the intersection of biotechnology and artificial intelligence at BioAi Nexus. Stay updated with cutting-edge research and innovations." />
        <meta property="og:title" content="BioAi Nexus - Where Biotechnology Meets AI" />
        <meta property="og:description" content="Discover groundbreaking research and insights at the convergence of biotechnology and artificial intelligence." />
        <meta property="og:type" content="website" />
        </Helmet>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-24 mb-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6bTEyIDEyYzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnptLTI0IDBjMy4zMSAwIDYgMi42OSA2IDZzLTIuNjkgNi02IDYtNi0yLjY5LTYtNiAyLjY5LTYgNi02eiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] bg-center"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
          <div className="flex justify-center items-center gap-4 mb-6">
            <Dna className="w-16 h-16 text-blue-300" />
            <Brain className="w-16 h-16 text-purple-300" />
            <Microscope className="w-16 h-16 text-indigo-300" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to BioAi Nexus
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Exploring the Future at the Intersection of Biotechnology and Artificial Intelligence
          </p>
          
          {/* Search Box */}
          <div className="max-w-2xl mx-auto relative">
            <input
            type="text"
            placeholder="Search research articles..."
                value={searchQuery}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-full text-gray-900 bg-white/95 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

        {/* Loading State */}
        {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
        )}

        {!loading && (
        <>
          {/* Featured Posts */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-8 h-8" />
            Featured Posts
          </h2>
          <Link
            to="/blog"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {featuredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
                {post.featured_image && (
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-64 object-cover"
                />
                )}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <Clock className="w-4 h-4" />
                    {new Date(post.created_at).toLocaleDateString()}
                    {post.tags && post.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                      {tag}
                    </span>
                    ))}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    By {post.author?.full_name}
                  </span>
                  <Link
                    to={`/post/${post.slug}`}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

        {/* Recent Posts */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Clock className="w-8 h-8" />
          Recent Posts
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {post.featured_image && (
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            )}
            <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {post.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
              {new Date(post.created_at).toLocaleDateString()}
              </span>
              <Link
              to={`/post/${post.slug}`}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
              Read more
              </Link>
            </div>
            </div>
          </article>
          ))}
        </div>
        </section>
      </>
      )}
    </>
  );
}