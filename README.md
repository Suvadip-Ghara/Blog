# Bolt Blog Platform

A modern, SEO-optimized blogging platform built with React, TypeScript, and Supabase, designed for deployment on Netlify.

## Features

- 🎨 Modern, responsive design with dark mode support
- 📱 Mobile-first approach with a clean, intuitive interface
- 🔍 SEO optimization with React Helmet
- 📝 Rich text editor for blog posts
- 👤 Secure admin panel for content management
- 📊 Basic analytics for post performance
- 💬 Comment system with spam prevention
- 📧 Newsletter subscription system
- 🌐 Social media integration

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment on Netlify

1. Create a new site on Netlify
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables:
   - Add your Supabase credentials as environment variables
5. Deploy!

## Database Schema

The application uses Supabase with the following tables:

- `posts`: Blog posts with metadata
- `authors`: User information
- `comments`: Post comments
- `settings`: Site configuration

## Tech Stack

- React with TypeScript
- Tailwind CSS for styling
- Supabase for backend
- React Router for navigation
- React Markdown for content rendering
- React Helmet for SEO