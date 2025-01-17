/*
  # Initial Blog Platform Schema

  1. New Tables
    - authors: Store user information for blog authors
    - posts: Store blog posts with metadata
    - comments: Store post comments
    - subscribers: Store newsletter subscribers
    - tags: Store post tags
    - post_tags: Junction table for posts and tags

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated and anonymous users
*/

-- Create authors table
CREATE TABLE IF NOT EXISTS authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  avatar_url text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text NOT NULL,
  featured_image text,
  author_id uuid REFERENCES authors(id) NOT NULL,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  meta_title text,
  meta_description text,
  views integer DEFAULT 0
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) NOT NULL,
  author_name text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create post_tags junction table
CREATE TABLE IF NOT EXISTS post_tags (
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Enable RLS
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Authors policies
CREATE POLICY "Authors are viewable by everyone"
  ON authors FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authors can be created by authenticated users"
  ON authors FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Authors can update their own profile"
  ON authors FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Posts policies
CREATE POLICY "Published posts are viewable by everyone"
  ON posts FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Authors can view all their posts"
  ON posts FOR SELECT
  TO authenticated
  USING (author_id = auth.uid());

CREATE POLICY "Authors can create posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Authors can update their own posts"
  ON posts FOR UPDATE
  TO authenticated
  USING (author_id = auth.uid())
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Authors can delete their own posts"
  ON posts FOR DELETE
  TO authenticated
  USING (author_id = auth.uid());

-- Comments policies
CREATE POLICY "Comments are viewable by everyone"
  ON comments FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create comments"
  ON comments FOR INSERT
  TO public
  WITH CHECK (true);

-- Subscribers policies
CREATE POLICY "Anyone can subscribe"
  ON subscribers FOR INSERT
  TO public
  WITH CHECK (true);

-- Tags policies
CREATE POLICY "Tags are viewable by everyone"
  ON tags FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authors can create tags"
  ON tags FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Post tags policies
CREATE POLICY "Post tags are viewable by everyone"
  ON post_tags FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authors can manage post tags"
  ON post_tags FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM posts
    WHERE posts.id = post_tags.post_id
    AND posts.author_id = auth.uid()
  ));