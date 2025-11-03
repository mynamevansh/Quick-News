// Main App component with routing
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:category" element={<Home />} />
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
