// Main App component with routing
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleLogoClick = () => {
    // Clear search and trigger reset to general news
    setSearchQuery('');
    setResetTrigger(prev => prev + 1); // Increment to trigger re-fetch
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar onSearch={handleSearch} onLogoClick={handleLogoClick} />
          <main>
            <Routes>
              <Route path="/" element={<Home searchQuery={searchQuery} resetTrigger={resetTrigger} />} />
              <Route path="/category/:category" element={<Home searchQuery={searchQuery} resetTrigger={resetTrigger} />} />
            </Routes>
          </main>
          
          {/* Footer */}
          <footer className="bg-gray-800 text-white py-8 mt-16">
            <div className="container mx-auto px-4 text-center">
              <p className="text-gray-400">
                &copy; {new Date().getFullYear()} NewsHub. Built with React, Firebase, and NewsAPI.org
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Stay informed with the latest news from around the world
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
