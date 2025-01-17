import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { PlusCircle, Edit, Trash2, Eye, Star, Settings, BarChart } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export default function Admin() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [currentPost, setCurrentPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    published: false,
  });
  const [footerSettings, setFooterSettings] = useState({
    about: 'A modern blogging platform built with React and powered by Bolt.',
    socialLinks: {
      facebook: '',
      twitter: '',
      instagram: ''
    }
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data);
    } catch (error) {
      toast.error('Error fetching posts');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('posts')
        .insert([
          {
            ...currentPost,
            author_id: user.id,
            slug: currentPost.title.toLowerCase().replace(/\s+/g, '-'),
          },
        ]);

      if (error) throw error;
      toast.success('Post created successfully!');
      fetchPosts();
      setIsEditing(false);
      setCurrentPost({ title: '', content: '', excerpt: '', published: false });
    } catch (error) {
      toast.error('Error creating post');
    }
  };

  const handleFeaturePost = async (postId: string, featured: boolean) => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({ featured })
        .eq('id', postId);

      if (error) throw error;
      toast.success(featured ? 'Post featured!' : 'Post unfeatured');
      fetchPosts();
    } catch (error) {
      toast.error('Error updating post');
    }
  };

  const handleSaveFooter = async () => {
    try {
      const { error } = await supabase
        .from('settings')
        .upsert({ id: 'footer', settings: footerSettings });

      if (error) throw error;
      toast.success('Footer settings saved!');
    } catch (error) {
      toast.error('Error saving footer settings');
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Bolt Blog</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 rounded-lg ${
            activeTab === 'posts' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-lg ${
            activeTab === 'settings' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            Settings
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-lg ${
            activeTab === 'analytics' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            Analytics
          </button>
          </div>
        </div>

        {activeTab === 'posts' && (

        {isEditing ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Create New Post
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={currentPost.title}
                  onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Excerpt
                </label>
                <textarea
                  value={currentPost.excerpt}
                  onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Content
                </label>
                <MDEditor
                  value={currentPost.content}
                  onChange={(value) => setCurrentPost({ ...currentPost, content: value || '' })}
                  preview="edit"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={currentPost.published}
                  onChange={(e) => setCurrentPost({ ...currentPost, published: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="published" className="text-sm text-gray-700 dark:text-gray-300">
                  Publish immediately
                </label>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Post
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                        Loading posts...
                      </td>
                    </tr>
                  ) : posts.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                        No posts found. Create your first post!
                      </td>
                    </tr>
                  ) : (
                    posts.map((post) => (
                      <tr key={post.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                          {post.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            post.published
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          }`}>
                            {post.published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                          {format(new Date(post.created_at), 'MMM d, yyyy')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-3">
                            <button
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                              title="View"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300"
                              title="Edit"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                              title="Delete"
                            >
                                <Trash2 className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleFeaturePost(post.id, !post.featured)}
                                className={`text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 ${
                                post.featured ? 'text-yellow-500' : ''
                                }`}
                                title={post.featured ? 'Unfeature' : 'Feature'}
                              >
                                <Star className="w-5 h-5" fill={post.featured ? 'currentColor' : 'none'} />
                              </button>
                              </div>
                            </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Footer Settings</h2>
          <div className="space-y-6">
            <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              About Text
            </label>
            <textarea
              value={footerSettings.about}
              onChange={(e) => setFooterSettings({ ...footerSettings, about: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
              rows={3}
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Social Links
            </label>
            <div className="space-y-4">
              <input
              type="url"
              placeholder="Facebook URL"
              value={footerSettings.socialLinks.facebook}
              onChange={(e) => setFooterSettings({
                ...footerSettings,
                socialLinks: { ...footerSettings.socialLinks, facebook: e.target.value }
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
              />
              <input
              type="url"
              placeholder="Twitter URL"
              value={footerSettings.socialLinks.twitter}
              onChange={(e) => setFooterSettings({
                ...footerSettings,
                socialLinks: { ...footerSettings.socialLinks, twitter: e.target.value }
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
              />
              <input
              type="url"
              placeholder="Instagram URL"
              value={footerSettings.socialLinks.instagram}
              onChange={(e) => setFooterSettings({
                ...footerSettings,
                socialLinks: { ...footerSettings.socialLinks, instagram: e.target.value }
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
              />
            </div>
            </div>
            <button
            onClick={handleSaveFooter}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
            Save Footer Settings
            </button>
          </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
            <div key={post.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">{post.title}</h3>
              <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Views</span>
                <span className="font-medium">{post.views || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Comments</span>
                <span className="font-medium">{post.comments_count || 0}</span>
              </div>
              </div>
            </div>
            ))}
          </div>
          </div>
        )}
        </div>
      </>
  );
}