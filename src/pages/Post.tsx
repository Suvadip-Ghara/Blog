import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

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
}

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ author_name: '', content: '' });
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [likes, setLikes] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    generateCaptcha();
    fetchPost();
    fetchComments();
    fetchLikes();
    checkBookmark();
  }, [slug]);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    setCaptchaValue(`${num1} + ${num2} = ?`);
    setCaptchaAnswer((num1 + num2).toString());
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this post: ${post?.title}`;

    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
      return;
    }

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*, authors(*)')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      toast.error('Error fetching post');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', post?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      toast.error('Error fetching comments');
    }
  };

  const fetchLikes = async () => {
    try {
      const { data, error } = await supabase
        .from('likes')
        .select('*')
        .eq('post_id', post?.id);

      if (error) throw error;
      setLikes(data ? data.length : 0);
    } catch (error) {
      toast.error('Error fetching likes');
    }
  };

  const checkBookmark = async () => {
    try {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('post_id', post?.id)
        .eq('user_id', 'current_user_id'); // Replace with actual user ID

      if (error) throw error;
      setBookmarked(data && data.length > 0);
    } catch (error) {
      toast.error('Error checking bookmark');
    }
  };

  const handleLike = async () => {
    try {
      const { error } = await supabase
        .from('likes')
        .insert([{ post_id: post?.id, user_id: 'current_user_id' }]); // Replace with actual user ID

      if (error) throw error;
      setLikes(likes + 1);
    } catch (error) {
      toast.error('Error liking post');
    }
  };

  const handleBookmark = async () => {
    try {
      if (bookmarked) {
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('post_id', post?.id)
          .eq('user_id', 'current_user_id'); // Replace with actual user ID

        if (error) throw error;
        setBookmarked(false);
      } else {
        const { error } = await supabase
          .from('bookmarks')
          .insert([{ post_id: post?.id, user_id: 'current_user_id' }]); // Replace with actual user ID

        if (error) throw error;
        setBookmarked(true);
      }
    } catch (error) {
      toast.error('Error bookmarking post');
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userCaptcha = (e.target as HTMLFormElement).captcha.value;

    if (userCaptcha !== captchaAnswer) {
      toast.error('Incorrect CAPTCHA answer');
      generateCaptcha();
      return;
    }

    try {
      const { error } = await supabase
        .from('comments')
        .insert([{ ...newComment, post_id: post?.id }]);

      if (error) throw error;
      toast.success('Comment added successfully!');
      setNewComment({ author_name: '', content: '' });
      generateCaptcha();
      fetchComments();
    } catch (error) {
      toast.error('Error adding comment');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Post not found</h1>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | BioAI Nexus</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.featured_image} />
        <link rel="canonical" href={`https://bioai-nexus.netlify.app/post/${post.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "image": post.featured_image,
            "datePublished": post.created_at,
            "author": {
              "@type": "Person",
              "name": post.authors?.full_name,
            },
            "publisher": {
              "@type": "Organization",
              "name": "BioAI Nexus",
              "logo": {
                "@type": "ImageObject",
                "url": "https://bioai-nexus.netlify.app/logo.png",
              },
            },
          })}
        </script>
      </Helmet>

      <article className="max-w-4xl mx-auto px-4 py-8">
        {post.featured_image && (
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        )}

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
          <div className="flex items-center gap-2">
            <span>{post.authors?.full_name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{format(new Date(post.created_at), 'MMMM d, yyyy')}</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleShare('facebook')}
              className="hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="Share on Facebook"
            >
              <span>Facebook</span>
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="hover:text-blue-400 dark:hover:text-blue-300"
              aria-label="Share on Twitter"
            >
              <span>Twitter</span>
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="hover:text-blue-700 dark:hover:text-blue-500"
              aria-label="Share on LinkedIn"
            >
              <span>LinkedIn</span>
            </button>
            <button
              onClick={() => handleShare('copy')}
              className="hover:text-gray-800 dark:hover:text-gray-200"
              aria-label="Copy link"
            >
              <span>Copy</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
          >
            <span>Like</span>
            <span>{likes}</span>
          </button>
          <button
            onClick={handleBookmark}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400"
          >
            <span>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>
        </div>

        <div className="prose dark:prose-invert max-w-none mb-12">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Comments Section */}
        <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
            Comments ({comments.length})
          </h2>

          <form onSubmit={handleCommentSubmit} className="mb-8">
            <div className="mb-4">
              <label htmlFor="author_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="author_name"
                value={newComment.author_name}
                onChange={(e) => setNewComment({ ...newComment, author_name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Comment
              </label>
              <textarea
                id="content"
                value={newComment.content}
                onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                rows={4}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="captcha" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {captchaValue} (Please solve this simple math problem)
              </label>
              <input
                type="text"
                id="captcha"
                name="captcha"
                className="w-32 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Post Comment
            </button>
          </form>

          <div className="space-y-8">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {comment.author_name}
                  </h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {format(new Date(comment.created_at), 'MMM d, yyyy')}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}