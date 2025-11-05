// NewsAPI service for fetching news articles
import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

/**
 * Fetch top headlines by category
 * @param {string} category - News category (e.g., general, business, sports)
 * @param {string} country - Country code (default: 'us')
 * @param {number} pageSize - Number of results per page (default: 100)
 * @param {Object} dateRange - Optional date range { from, to } in ISO format
 * @returns {Promise<Array>} Array of articles
 */
export const fetchTopHeadlines = async (category = 'general', country = 'us', pageSize = 100, dateRange = null) => {
  try {
    const params = {
      country,
      category,
      pageSize,
      apiKey: API_KEY
    };

    // Add date range parameters if provided
    if (dateRange?.from) {
      params.from = dateRange.from;
    }
    if (dateRange?.to) {
      params.to = dateRange.to;
    }

    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params
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
 * @param {Object} dateRange - Optional date range { from, to } in ISO format
 * @returns {Promise<Array>} Array of articles
 */
export const searchNews = async (query, pageSize = 100, dateRange = null) => {
  try {
    const params = {
      q: query,
      pageSize,
      sortBy: 'publishedAt',
      apiKey: API_KEY
    };

    // Add date range parameters if provided
    if (dateRange?.from) {
      params.from = dateRange.from;
    }
    if (dateRange?.to) {
      params.to = dateRange.to;
    }

    const response = await axios.get(`${BASE_URL}/everything`, {
      params
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

/**
 * Calculate date range for filter options
 * @param {string} rangeType - Type of range: 'today', '24hours', 'week', 'month', 'custom'
 * @param {Date} fromDate - Custom start date (optional)
 * @param {Date} toDate - Custom end date (optional)
 * @returns {Object|null} Date range { from, to } in ISO format or null
 */
export const calculateDateRange = (rangeType, fromDate = null, toDate = null) => {
  const now = new Date();
  const formatDate = (date) => date.toISOString();

  switch (rangeType) {
    case 'today':
    case '24hours':
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      return {
        from: formatDate(yesterday),
        to: formatDate(now)
      };

    case 'week':
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return {
        from: formatDate(weekAgo),
        to: formatDate(now)
      };

    case 'month':
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      return {
        from: formatDate(monthAgo),
        to: formatDate(now)
      };

    case 'custom':
      if (fromDate && toDate) {
        return {
          from: formatDate(new Date(fromDate)),
          to: formatDate(new Date(toDate))
        };
      }
      return null;

    case 'all':
    default:
      return null; // No date filter
  }
};
