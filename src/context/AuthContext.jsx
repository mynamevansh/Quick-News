// Authentication context to manage user state globally
import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthChange, signInWithGoogle as signIn, signOutUser } from '../services/authService';

const AuthContext = createContext();

/**
 * Custom hook to use auth context
 * @returns {Object} Auth context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

/**
 * Auth Provider component to wrap the app
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes (persists user session)
    const unsubscribe = onAuthChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  /**
   * Sign in with Google
   */
  const signInWithGoogle = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  /**
   * Sign out the current user
   */
  const signOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
