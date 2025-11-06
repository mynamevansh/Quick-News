// News card component to display individual article
import React from 'react';
import { FaClock, FaExternalLinkAlt } from 'react-icons/fa';
import VoteButtons from './VoteButtons';
import { useAuth } from '../context/AuthContext';
import { getProxiedImageUrl, handleImageError } from '../utils/imageUtils';

const NewsCard = ({ article, votes, onVoteUpdate, onReadFullArticle }) => {
  const { user } = useAuth();

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle "Read Full Article" click
  const handleReadClick = () => {
    if (onReadFullArticle) {
      onReadFullArticle(article);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
      {/* Article Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          loading="lazy"
          src={getProxiedImageUrl(article.urlToImage, 'No+Image', '400x250')}
          alt={article.title || 'News image'}
          className="rounded-lg w-full h-64 object-cover"
          onError={(e) => handleImageError(e, 'Image+Unavailable', '400x250')}
        />

        {/* Category Badge */}
        {article.category && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
            {article.category}
          </div>
        )}
      </div>

      {/* Article Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Source */}
        <div className="text-sm text-gray-500 font-medium mb-2">
          {article.source?.name || 'Unknown Source'}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-blue-600 transition">
          {article.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
          {article.description || 'No description available.'}
        </p>

        {/* Date */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <FaClock className="mr-2" />
          <span>{formatDate(article.publishedAt)}</span>
        </div>

        {/* Vote Buttons */}
        <div className="mb-4">
          <VoteButtons
            articleId={article.id || article.url} // fallback to URL if no id
            votes={votes}
            onVoteUpdate={onVoteUpdate}
          />
        </div>

        {/* Read Full Article Button */}
        <button
          onClick={handleReadClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center space-x-2"
        >
          <span>Read Full Article</span>
          <FaExternalLinkAlt />
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
