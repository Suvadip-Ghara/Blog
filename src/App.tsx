import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Home from './pages/Home';
import Post from './pages/Post';
import Admin from './pages/Admin';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:slug" element={<Post />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <Toaster position="bottom-right" />
      </Router>
    </HelmetProvider>
  );
}