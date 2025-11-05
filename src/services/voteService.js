// Firestore service for managing votes
import { 
  doc, 
  setDoc, 
  getDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';

const VOTES_COLLECTION = 'articleVotes';

/**
 * Get vote data for an article
 * @param {string} articleId - Unique article ID
 * @returns {Promise<Object>} Vote data { upvotes, downvotes, voters }
 */
export const getArticleVotes = async (articleId) => {
  try {
    const docRef = doc(db, VOTES_COLLECTION, articleId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    }
    
    // Initialize if doesn't exist
    return { upvotes: 0, downvotes: 0, voters: {} };
  } catch (error) {
    console.error('Error getting article votes:', error);
    return { upvotes: 0, downvotes: 0, voters: {} };
  }
};

/**
 * Get user's vote for a specific article
 * @param {string} userId - User ID
 * @param {string} articleId - Article ID
 * @returns {Promise<string|null>} 'upvote', 'downvote', or null
 */
export const getUserVote = async (userId, articleId) => {
  try {
    const articleVoteRef = doc(db, VOTES_COLLECTION, articleId);
    const articleVoteSnap = await getDoc(articleVoteRef);
    
    if (articleVoteSnap.exists()) {
      const data = articleVoteSnap.data();
      return data.voters?.[userId] || null;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user vote:', error);
    return null;
  }
};

/**
 * Cast a vote (upvote or downvote) on an article
 * @param {string} userId - User ID
 * @param {string} articleId - Article ID
 * @param {string} voteType - 'upvote' or 'downvote'
 * @returns {Promise<Object>} Vote recorded status
 */
export const castVote = async (userId, articleId, voteType) => {
  try {
    const articleVoteRef = doc(db, VOTES_COLLECTION, articleId);
    
    // Get current article data
    const articleVoteSnap = await getDoc(articleVoteRef);
    let articleData = articleVoteSnap.exists() 
      ? articleVoteSnap.data() 
      : { upvotes: 0, downvotes: 0, voters: {} };
    
    // Get user's current vote from voters object
    const currentVote = articleData.voters?.[userId] || null;
    
    // Handle vote logic
    if (currentVote === voteType) {
      // User is removing their vote
      const updatedVoters = { ...articleData.voters };
      delete updatedVoters[userId];
      
      await setDoc(articleVoteRef, {
        upvotes: voteType === 'upvote' ? articleData.upvotes - 1 : articleData.upvotes,
        downvotes: voteType === 'downvote' ? articleData.downvotes - 1 : articleData.downvotes,
        voters: updatedVoters
      });
    } else if (currentVote === null) {
      // User is casting a new vote
      await setDoc(articleVoteRef, {
        upvotes: voteType === 'upvote' ? articleData.upvotes + 1 : articleData.upvotes,
        downvotes: voteType === 'downvote' ? articleData.downvotes + 1 : articleData.downvotes,
        voters: {
          ...articleData.voters,
          [userId]: voteType
        }
      });
    } else {
      // User is changing their vote
      await setDoc(articleVoteRef, {
        upvotes: voteType === 'upvote' 
          ? articleData.upvotes + 1 
          : articleData.upvotes - 1,
        downvotes: voteType === 'downvote' 
          ? articleData.downvotes + 1 
          : articleData.downvotes - 1,
        voters: {
          ...articleData.voters,
          [userId]: voteType
        }
      });
    }
    
    // Return success status (don't fetch updated votes)
    return { success: true };
  } catch (error) {
    console.error('Error casting vote:', error);
    throw error;
  }
};

/**
 * Get all votes for multiple articles at once (for batch loading)
 * @param {Array<string>} articleIds - Array of article IDs
 * @returns {Promise<Object>} Object mapping articleId to vote data
 */
export const getBatchArticleVotes = async (articleIds) => {
  try {
    const votesMap = {};
    
    const promises = articleIds.map(async (articleId) => {
      const votes = await getArticleVotes(articleId);
      votesMap[articleId] = votes;
    });
    
    await Promise.all(promises);
    return votesMap;
  } catch (error) {
    console.error('Error getting batch votes:', error);
    return {};
  }
};
