import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';

export default function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark-mode');
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark-mode' : ''}`}>
      <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-xl font-bold text-white">
                BioAI Nexus
              </Link>
              <nav className="space-x-4">
                <Link to="/" className="text-white hover:text-gray-300">
                  Home
                </Link>
                <Link to="/bioinformatics" className="text-white hover:text-gray-300">
                  Bioinformatics
                </Link>
                <Link to="/biotechnology" className="text-white hover:text-gray-300">
                  Biotechnology
                </Link>
                <Link to="/ai" className="text-white hover:text-gray-300">
                  AI
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="text-white hover:text-gray-300"
              >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
              <Link to="/admin" className="text-white hover:text-gray-300">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <footer className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="text-white">
              &copy; {new Date().getFullYear()} BioAI Nexus. All rights reserved.
            </div>
            <nav className="space-x-4">
              <Link to="/privacy-policy" className="text-white hover:text-gray-300">
                Privacy Policy
              </Link>
              <Link to="/terms-and-conditions" className="text-white hover:text-gray-300">
                Terms and Conditions
              </Link>
              <Link to="/feedback" className="text-white hover:text-gray-300">
                Feedback
              </Link>
              <Link to="/subscribe" className="text-white hover:text-gray-300">
                Subscribe
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
