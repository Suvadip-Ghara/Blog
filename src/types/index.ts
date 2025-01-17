export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image?: string;
  author_id: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  meta_title?: string;
  meta_description?: string;
  tags: string[];
  views: number;
}

export interface Author {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  author_name: string;
  content: string;
  created_at: string;
}

export interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}