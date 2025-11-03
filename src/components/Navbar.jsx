// Navigation bar component with categories and authentication
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaNewspaper, FaSignInAlt, FaSignOutAlt, FaUser, FaSearch, FaTimes } from 'react-icons/fa';

const Navbar = ({ onSearch }) => {
  const { user, signInWithGoogle, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'General', path: '/' },
    { name: 'Business', path: '/category/business' },
    { name: 'Sports', path: '/category/sports' },
    { name: 'Technology', path: '/category/technology' },
    { name: 'Entertainment', path: '/category/entertainment' },
    { name: 'Health', path: '/category/health' },
    { name: 'Science', path: '/category/science' }
  ];

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      alert('Failed to sign in. Please try again.');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      alert('Failed to sign out. Please try again.');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Clear search when input is empty
    if (!value.trim() && onSearch) {
      onSearch('');
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      {/* Top Bar: Logo | Search Bar | User Info | Sign Out */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold hover:opacity-90 transition flex-shrink-0">
            <FaNewspaper className="text-3xl" />
            <span className="hidden lg:inline">NewsHub</span>
          </Link>

          {/* Search Bar - Center */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search news..."
                className="w-full px-4 py-2 pl-10 pr-10 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  aria-label="Clear search"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </form>

          {/* User Section - Right */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {user ? (
              <>
                {/* User Photo and Name */}
                <div className="flex items-center space-x-2 bg-blue-700 px-3 py-2 rounded-lg">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName} 
                      className="w-8 h-8 rounded-full border-2 border-white" 
                    />
                  ) : (
                    <FaUser className="text-lg" />
                  )}
                  <span className="hidden lg:inline font-medium text-sm">{user.displayName}</span>
                </div>
                
                {/* Sign Out Button */}
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition font-medium shadow-md"
                  aria-label="Sign out"
                >
                  <FaSignOutAlt className="text-lg" />
                  <span className="hidden sm:inline text-sm">Sign Out</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleSignIn}
                className="flex items-center space-x-2 bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition font-medium shadow-md whitespace-nowrap"
              >
                <FaSignInAlt />
                <span className="hidden sm:inline text-sm">Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="bg-blue-700 border-t border-blue-500">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide py-2">
            {categories.map((category) => {
              const isActive = location.pathname === category.path;
              return (
                <Link
                  key={category.name}
                  to={category.path}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition font-medium ${
                    isActive
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'hover:bg-blue-600 text-white'
                  }`}
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
