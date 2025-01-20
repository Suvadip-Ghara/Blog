import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string;
  created_at: string;
  authors: {
    full_name: string;
  };
  slug: string;
  published: boolean;
  publish_date: string;
}

export default function Admin() {
  const [navItems, setNavItems] = useState(['Home', 'Bioinformatics', 'Biotechnology', 'AI']);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<Post>({
    id: '',
    title: '',
    excerpt: '',
    content: '',
    featured_image: '',
    created_at: '',
    authors: { full_name: '' },
    slug: '',
    published: false,
    publish_date: '',
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [settings, setSettings] = useState({
    siteTitle: '',
    siteDescription: '',
    ogTitle: '',
    ogDescription: '',
    favicon: '',
  });

  useEffect(() => {
    // Initialize Google Analytics
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=YOUR_GOOGLE_ANALYTICS_ID';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'YOUR_GOOGLE_ANALYTICS_ID');
    };
  }, []);

  const addNavItem = () => {
    const newItem = prompt('Enter new navigation item:');
    if (newItem) {
      setNavItems([...navItems, newItem]);
    }
  };

  const removeNavItem = (index: number) => {
    const updatedItems = navItems.filter((_, i) => i !== index);
    setNavItems(updatedItems);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([{ ...newPost, featured_image: selectedImage ? selectedImage.name : '' }]);

      if (error) throw error;
      toast.success('Post added successfully!');
      setNewPost({
        id: '',
        title: '',
        excerpt: '',
        content: '',
        featured_image: '',
        created_at: '',
        authors: { full_name: '' },
        slug: '',
        published: false,
        publish_date: '',
      });
      setSelectedImage(null);
    } catch (error) {
      toast.error('Error adding post');
    }
  };

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings to a settings table or local storage
    toast.success('Settings saved successfully!');
  };

  return (
    <>
      <Helmet>
        <title>Admin Panel</title>
        <meta name="description" content="Admin panel for managing the website." />
        <meta property="og:title" content="Admin Panel" />
        <meta property="og:description" content="Manage the website from the admin panel." />
        <meta property="og:type" content="website" />
      </Helmet>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
          Admin Panel
        </h1>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Navigation Items
          </h2>
          <ul className="list-disc list-inside">
            {navItems.map((item, index) => (
              <li key={index} className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                {item}
                <button
                  onClick={() => removeNavItem(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={addNavItem}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Navigation Item
          </button>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Add New Post
          </h2>
          <form onSubmit={handlePostSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                value={newPost.excerpt}
                onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                rows={4}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Content
              </label>
              <textarea
                id="content"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                rows={8}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="featured_image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Featured Image
              </label>
              <input
                type="file"
                id="featured_image"
                onChange={handleImageUpload}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="publish_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Publish Date
              </label>
              <DatePicker
                selected={newPost.publish_date ? new Date(newPost.publish_date) : null}
                onChange={(date: Date | null) => setNewPost({ ...newPost, publish_date: date ? date.toISOString() : '' })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Post
            </button>
          </form>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Settings
          </h2>
          <form onSubmit={handleSettingsSubmit}>
            <div className="mb-4">
              <label htmlFor="siteTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Site Title
              </label>
              <input
                type="text"
                id="siteTitle"
                value={settings.siteTitle}
                onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Site Description
              </label>
              <textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                rows={4}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ogTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Open Graph Title
              </label>
              <input
                type="text"
                id="ogTitle"
                value={settings.ogTitle}
                onChange={(e) => setSettings({ ...settings, ogTitle: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ogDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Open Graph Description
              </label>
              <textarea
                id="ogDescription"
                value={settings.ogDescription}
                onChange={(e) => setSettings({ ...settings, ogDescription: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                rows={4}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="favicon" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Favicon
              </label>
              <input
                type="file"
                id="favicon"
                onChange={(e) => setSettings({ ...settings, favicon: e.target.files ? e.target.files[0].name : '' })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Settings
            </button>
          </form>
        </div>
      </section>
    </>
  );
}