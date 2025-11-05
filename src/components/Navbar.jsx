// Navigation bar component with categories and authentication
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaNewspaper, FaSignInAlt, FaSignOutAlt, FaUser, FaSearch, FaTimes } from 'react-icons/fa';

const Navbar = ({ onSearch, onLogoClick }) => {
  const { user, signInWithGoogle, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchInput, setSearchInput] = useState('');

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
    if (searchInput.trim() && onSearch) {
      onSearch(searchInput.trim());
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    // Do NOT clear search results when input is cleared
    // Results stay until user performs a new search
  };

  const clearSearchInput = () => {
    setSearchInput('');
    // Do NOT clear search results, only clear the input field
  };

  const handleLogoClickInternal = (e) => {
    e.preventDefault();
    // Clear search input and results when logo is clicked
    setSearchInput('');
    
    // Check if already on homepage
    const isOnHomepage = location.pathname === '/';
    
    if (isOnHomepage) {
      // Already on home, refresh the page to reload general news
      window.location.reload();
    } else {
      // Navigate to home
      navigate('/');
    }
    
    // Trigger reset to general news
    if (onLogoClick) {
      onLogoClick();
    }
  };

  const handleCategoryClick = () => {
    // Clear search input and results when category is clicked
    setSearchInput('');
    if (onLogoClick) {
      onLogoClick();
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      {/* Top Bar: Logo | Search Bar | User Info | Sign Out */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <a
            href="/"
            onClick={handleLogoClickInternal}
            className="flex items-center space-x-2 text-2xl font-bold hover:opacity-90 transition flex-shrink-0 cursor-pointer"
          >
            <FaNewspaper className="text-3xl" />
            <span className="hidden lg:inline">NewsHub</span>
          </a>

          {/* Search Bar - Center */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-2xl mx-auto">
            <div className="relative">
              <input
                id="search"
                name="search"
                type="text"
                value={searchInput}
                onChange={handleSearchChange}
                placeholder="Search news..."
                className="w-full px-4 py-2 pl-10 pr-10 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              {searchInput && (
                <button
                  type="button"
                  onClick={clearSearchInput}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  aria-label="Clear search input"
                  title="Clear input (results will remain)"
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
                  <img 
                    src={user.photoURL || "https://placehold.co/40x40?text=User"} 
                    alt={user.displayName || "User"} 
                    className="w-8 h-8 rounded-full border-2 border-white"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/40x40?text=User";
                    }}
                  />
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
                  onClick={handleCategoryClick}
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
