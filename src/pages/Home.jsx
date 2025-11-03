// Home page component with news fetching and filtering
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTopHeadlines, searchNews } from '../services/newsService';
import { generateArticleId } from '../services/newsService';
import { getBatchArticleVotes } from '../services/voteService';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import NewsList from '../components/NewsList';
import FilterSort from '../components/FilterSort';
import TopTrending from '../components/TopTrending';
import ArticleModal from '../components/ArticleModal';

const Home = ({ searchQuery }) => {
  const { category } = useParams();
  const { user, signInWithGoogle } = useAuth();
  
  const [articles, setArticles] = useState([]);
  const [votes, setVotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('highest-votes');
  const [dateRange, setDateRange] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch news articles
  useEffect(() => {
    fetchNews();
  }, [category]);

  // Handle search query changes
  useEffect(() => {
    if (searchQuery && searchQuery.trim()) {
      handleSearch(searchQuery);
    } else {
      fetchNews();
    }
  }, [searchQuery]);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    setIsSearching(false);

    try {
      // Fetch articles from NewsAPI
      const fetchedArticles = await fetchTopHeadlines(category || 'general');
      
      // Add unique IDs to articles
      const articlesWithIds = fetchedArticles.map(article => ({
        ...article,
        id: generateArticleId(article),
        category: category || 'general'
      }));

      setArticles(articlesWithIds);

      // Fetch votes for all articles
      const articleIds = articlesWithIds.map(a => a.id);
      const votesData = await getBatchArticleVotes(articleIds);
      setVotes(votesData);

    } catch (err) {
      setError(err.message || 'Failed to fetch news. Please try again later.');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setIsSearching(true);

    try {
      // Search articles from NewsAPI
      const fetchedArticles = await searchNews(query);
      
      // Add unique IDs to articles
      const articlesWithIds = fetchedArticles.map(article => ({
        ...article,
        id: generateArticleId(article),
        category: 'search'
      }));

      setArticles(articlesWithIds);

      // Fetch votes for all articles
      const articleIds = articlesWithIds.map(a => a.id);
      const votesData = await getBatchArticleVotes(articleIds);
      setVotes(votesData);

    } catch (err) {
      setError(err.message || 'Failed to fetch news. Please try again later.');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle vote update
  const handleVoteUpdate = (articleId, updatedVotes) => {
    setVotes(prev => ({
      ...prev,
      [articleId]: updatedVotes
    }));
  };

  // Handle read full article
  const handleReadFullArticle = async (article) => {
    // Check if user is logged in
    if (!user) {
      const shouldSignIn = window.confirm('You must be signed in to read the full article. Would you like to sign in now?');
      if (shouldSignIn) {
        try {
          await signInWithGoogle();
          // After successful sign-in, open the article
          setSelectedArticle(article);
        } catch (error) {
          alert('Failed to sign in. Please try again.');
        }
      }
      return;
    }

    // User is logged in, show article modal
    setSelectedArticle(article);
  };

  // Filter articles by date range
  const filterByDateRange = (articles) => {
    if (dateRange === 'all') return articles;

    const now = new Date();
    const filtered = articles.filter(article => {
      const publishDate = new Date(article.publishedAt);
      
      switch (dateRange) {
        case 'today':
          return publishDate.toDateString() === now.toDateString();
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return publishDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return publishDate >= monthAgo;
        default:
          return true;
      }
    });

    return filtered;
  };

  // Sort articles
  const sortArticles = (articles) => {
    const sorted = [...articles];

    switch (sortBy) {
      case 'highest-votes':
        // Sort by upvotes (desc), then by publishedAt (desc)
        sorted.sort((a, b) => {
          const aUpvotes = votes[a.id]?.upvotes || 0;
          const bUpvotes = votes[b.id]?.upvotes || 0;
          
          // First, compare upvotes
          if (bUpvotes !== aUpvotes) {
            return bUpvotes - aUpvotes;
          }
          
          // If upvotes are equal, compare by date (newest first)
          return new Date(b.publishedAt) - new Date(a.publishedAt);
        });
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
        break;
      default:
        break;
    }

    return sorted;
  };

  // Get top trending articles (top 3 by votes)
  const getTopTrending = () => {
    const articlesWithVotes = articles.map(article => ({
      ...article,
      votes: votes[article.id] || { upvotes: 0, downvotes: 0 }
    }));

    const sorted = articlesWithVotes.sort((a, b) => {
      const aVotes = a.votes.upvotes - a.votes.downvotes;
      const bVotes = b.votes.upvotes - b.votes.downvotes;
      return bVotes - aVotes;
    });

    return sorted.slice(0, 3);
  };

  // Apply filters and sorting
  const filteredArticles = filterByDateRange(articles);
  const sortedArticles = sortArticles(filteredArticles);
  const topTrending = getTopTrending();

  if (loading) {
    return <LoadingSpinner message="Loading news articles..." />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 text-lg font-semibold mb-4">{error}</p>
          <button
            onClick={fetchNews}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-2 capitalize">
        {isSearching ? `Search Results for "${searchQuery}"` : `${category || 'General'} News`}
      </h1>
      <p className="text-gray-600 mb-8">
        {isSearching 
          ? `Found ${sortedArticles.length} articles matching your search`
          : `Stay updated with the latest ${category || 'general'} news from around the world`
        }
      </p>

      {/* Top Trending Section - hide during search */}
      {!isSearching && topTrending.length > 0 && (
        <TopTrending articles={topTrending} onArticleClick={handleReadFullArticle} />
      )}

      {/* Filter and Sort */}
      <FilterSort
        sortBy={sortBy}
        onSortChange={setSortBy}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      {/* Articles Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{sortedArticles.length}</span> articles
        </p>
      </div>

      {/* News List */}
      <NewsList
        articles={sortedArticles}
        votes={votes}
        onVoteUpdate={handleVoteUpdate}
        onReadFullArticle={handleReadFullArticle}
      />

      {/* Article Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
};

export default Home;
