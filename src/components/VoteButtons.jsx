// Vote buttons component with upvote/downvote functionality
import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { castVote, getUserVote } from '../services/voteService';

const VoteButtons = ({ articleId, votes, onVoteUpdate }) => {
  const { user, signInWithGoogle } = useAuth();
  const [userVote, setUserVote] = useState(null);
  const [isVoting, setIsVoting] = useState(false);
  const [localVotes, setLocalVotes] = useState(votes);

  // Load user's vote when component mounts or user changes
  useEffect(() => {
    if (user && articleId) {
      loadUserVote();
    } else {
      setUserVote(null);
    }
  }, [user, articleId]);

  // Update local votes when prop changes
  useEffect(() => {
    setLocalVotes(votes);
  }, [votes]);

  const loadUserVote = async () => {
    try {
      const vote = await getUserVote(user.uid, articleId);
      setUserVote(vote);
    } catch (error) {
      console.error('Error loading user vote:', error);
    }
  };

  const handleVote = async (voteType) => {
    // Require authentication
    if (!user) {
      const shouldSignIn = window.confirm('You must be signed in to vote. Would you like to sign in now?');
      if (shouldSignIn) {
        try {
          await signInWithGoogle();
        } catch (error) {
          alert('Failed to sign in. Please try again.');
        }
      }
      return;
    }

    setIsVoting(true);

    try {
      // Cast vote and store in Firestore
      await castVote(user.uid, articleId, voteType);
      
      // Update user vote state for button highlighting
      if (userVote === voteType) {
        setUserVote(null);
      } else {
        setUserVote(voteType);
      }

      // Show alert that vote was recorded
      alert('Vote recorded! Refresh to see results.');
      
      // DO NOT update local votes or parent state
      // The new vote counts will only appear after page refresh
    } catch (error) {
      console.error('Error voting:', error);
      alert('Failed to cast vote. Please try again.');
    } finally {
      setIsVoting(false);
    }
  };

  const upvoteCount = localVotes?.upvotes || 0;
  const downvoteCount = localVotes?.downvotes || 0;
  const netVotes = upvoteCount - downvoteCount;

  return (
    <div className="flex items-center space-x-4">
      {/* Upvote Button */}
      <button
        onClick={() => handleVote('upvote')}
        disabled={isVoting}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
          userVote === 'upvote'
            ? 'bg-green-500 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-600'
        } ${isVoting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        title="Upvote"
      >
        <FaThumbsUp className="text-lg" />
        <span className="font-semibold">{upvoteCount}</span>
      </button>

      {/* Net Score */}
      <div className={`px-3 py-2 rounded-lg font-bold text-lg ${
        netVotes > 0 ? 'text-green-600' : netVotes < 0 ? 'text-red-600' : 'text-gray-600'
      }`}>
        {netVotes > 0 ? '+' : ''}{netVotes}
      </div>

      {/* Downvote Button */}
      <button
        onClick={() => handleVote('downvote')}
        disabled={isVoting}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
          userVote === 'downvote'
            ? 'bg-red-500 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600'
        } ${isVoting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        title="Downvote"
      >
        <FaThumbsDown className="text-lg" />
        <span className="font-semibold">{downvoteCount}</span>
      </button>
    </div>
  );
};

export default VoteButtons;
