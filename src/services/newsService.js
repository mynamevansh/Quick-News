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
    // If date range is specified, use /everything endpoint as /top-headlines has date limitations
    if (dateRange?.from || dateRange?.to) {
      return await fetchArticlesByDate(category, dateRange, pageSize);
    }

    const params = {
      country,
      category,
      pageSize,
      apiKey: API_KEY
    };

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
 * Fetch articles by date using /everything endpoint
 * @param {string} category - News category
 * @param {Object} dateRange - Date range { from, to } in ISO format
 * @param {number} pageSize - Number of results per page
 * @returns {Promise<Array>} Array of articles
 */
export const fetchArticlesByDate = async (category = 'general', dateRange, pageSize = 100) => {
  try {
    const params = {
      language: 'en',
      sortBy: 'publishedAt',
      pageSize,
      apiKey: API_KEY
    };

    // Add category as search query for better filtering
    if (category && category !== 'general') {
      params.q = category;
    } else {
      // For general, get popular topics
      params.q = 'news OR world OR politics OR technology OR business';
    }

    // Add date range parameters
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
    console.error('Error fetching articles by date:', error);
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
 * Calculate date range for a specific date (00:00:00 to 23:59:59)
 * @param {string} selectedDate - Selected date in YYYY-MM-DD format
 * @returns {Object|null} Date range { from, to } in ISO format or null
 */
export const calculateDateRange = (selectedDate = null) => {
  // No date selected - return null (fetch all dates)
  if (!selectedDate) {
    return null;
  }

  const formatDate = (date) => date.toISOString();
  
  // Single date selection - get entire day (00:00:00 to 23:59:59)
  const startDate = new Date(selectedDate);
  const endDate = new Date(selectedDate);
  
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);
  
  return {
    from: formatDate(startDate),
    to: formatDate(endDate)
  };
};
