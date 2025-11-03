// NewsAPI service for fetching news articles
import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

/**
 * Fetch top headlines by category
 * @param {string} category - News category (e.g., general, business, sports)
 * @param {string} country - Country code (default: 'us')
 * @param {number} pageSize - Number of results per page (default: 100)
 * @returns {Promise<Array>} Array of articles
 */
export const fetchTopHeadlines = async (category = 'general', country = 'us', pageSize = 100) => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        country,
        category,
        pageSize,
        apiKey: API_KEY
      }
    });
    
    return response.data.articles || [];
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    throw new Error('Failed to fetch news articles. Please try again later.');
  }
};

/**
 * Search for news articles
 * @param {string} query - Search query
 * @param {number} pageSize - Number of results per page (default: 100)
 * @returns {Promise<Array>} Array of articles
 */
export const searchNews = async (query, pageSize = 100) => {
  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: query,
        pageSize,
        sortBy: 'publishedAt',
        apiKey: API_KEY
      }
    });
    
    return response.data.articles || [];
  } catch (error) {
    console.error('Error searching news:', error);
    throw new Error('Failed to search news articles. Please try again later.');
  }
};

/**
 * Generate a unique article ID based on article properties
 * @param {Object} article - News article object
 * @returns {string} Unique article ID
 */
export const generateArticleId = (article) => {
  // Create a unique ID from article URL or title
  const baseString = article.url || article.title || '';
  return btoa(baseString).replace(/[^a-zA-Z0-9]/g, '').substring(0, 50);
};
