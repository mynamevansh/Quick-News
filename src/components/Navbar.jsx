// Navigation bar component with categories and authentication
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaNewspaper, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const { user, signInWithGoogle, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      {/* Top Bar with Logo and Auth */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold hover:opacity-90 transition">
            <FaNewspaper className="text-3xl" />
            <span>NewsHub</span>
          </Link>

          {/* Auth Button */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-blue-700 px-4 py-2 rounded-lg">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full" />
                  ) : (
                    <FaUser className="text-xl" />
                  )}
                  <span className="hidden md:inline font-medium">{user.displayName}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition font-medium"
                >
                  <FaSignOutAlt />
                  <span className="hidden md:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                className="flex items-center space-x-2 bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition font-medium shadow-md"
              >
                <FaSignInAlt />
                <span>Sign In with Google</span>
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
