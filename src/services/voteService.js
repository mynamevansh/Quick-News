// Firestore service for managing votes
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  increment, 
  collection,
  query,
  getDocs
} from 'firebase/firestore';
import { db } from '../config/firebase';

const VOTES_COLLECTION = 'articleVotes';
const USER_VOTES_COLLECTION = 'userVotes';

/**
 * Get vote data for an article
 * @param {string} articleId - Unique article ID
 * @returns {Promise<Object>} Vote data { upvotes, downvotes }
 */
export const getArticleVotes = async (articleId) => {
  try {
    const docRef = doc(db, VOTES_COLLECTION, articleId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    }
    
    // Initialize if doesn't exist
    return { upvotes: 0, downvotes: 0 };
  } catch (error) {
    console.error('Error getting article votes:', error);
    return { upvotes: 0, downvotes: 0 };
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
    const docRef = doc(db, USER_VOTES_COLLECTION, `${userId}_${articleId}`);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().voteType;
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
 * @returns {Promise<Object>} Updated vote counts
 */
export const castVote = async (userId, articleId, voteType) => {
  try {
    const userVoteRef = doc(db, USER_VOTES_COLLECTION, `${userId}_${articleId}`);
    const articleVoteRef = doc(db, VOTES_COLLECTION, articleId);
    
    // Get current user vote
    const currentVote = await getUserVote(userId, articleId);
    
    // Initialize article votes if not exists
    const articleVoteSnap = await getDoc(articleVoteRef);
    if (!articleVoteSnap.exists()) {
      await setDoc(articleVoteRef, { upvotes: 0, downvotes: 0 });
    }
    
    // Handle vote logic
    if (currentVote === voteType) {
      // Remove vote (user clicked same button)
      await setDoc(userVoteRef, { voteType: null });
      
      if (voteType === 'upvote') {
        await updateDoc(articleVoteRef, { upvotes: increment(-1) });
      } else {
        await updateDoc(articleVoteRef, { downvotes: increment(-1) });
      }
    } else if (currentVote === null) {
      // Add new vote
      await setDoc(userVoteRef, { voteType, userId, articleId, timestamp: new Date() });
      
      if (voteType === 'upvote') {
        await updateDoc(articleVoteRef, { upvotes: increment(1) });
      } else {
        await updateDoc(articleVoteRef, { downvotes: increment(1) });
      }
    } else {
      // Change vote
      await setDoc(userVoteRef, { voteType, userId, articleId, timestamp: new Date() });
      
      if (voteType === 'upvote') {
        await updateDoc(articleVoteRef, { 
          upvotes: increment(1),
          downvotes: increment(-1)
        });
      } else {
        await updateDoc(articleVoteRef, { 
          upvotes: increment(-1),
          downvotes: increment(1)
        });
      }
    }
    
    // Get updated votes
    return await getArticleVotes(articleId);
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
