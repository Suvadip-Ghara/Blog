import { Link } from 'react-router-dom';
import { Moon, Sun, Menu, X, Search, Facebook, Twitter, Instagram, Dna, Brain } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-gray-800 dark:text-white">
              <div className="flex items-center">
                <Dna className="w-8 h-8 text-blue-600" />
                <Brain className="w-8 h-8 text-indigo-600 -ml-2" />
              </div>
              BioAi Nexus
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Home
              </Link>
              <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                About
              </Link>
              <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Contact
              </Link>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-4">
              <Link to="/" className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Home
              </Link>
              <Link to="/about" className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                About
              </Link>
              <Link to="/contact" className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Contact
              </Link>
            </div>
          )}
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow-inner mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">About BioAi Nexus</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Exploring the intersection of biotechnology and artificial intelligence. Join us on a journey through cutting-edge research and innovations.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    Terms of Use
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Newsletter</h3>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-300">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} BioAi Nexus. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
