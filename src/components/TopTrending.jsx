// Top Trending component to show most upvoted articles
import React from 'react';
import { FaFire } from 'react-icons/fa';

const TopTrending = ({ articles, onArticleClick }) => {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-lg p-6 mb-8 text-white">
      <div className="flex items-center space-x-3 mb-4">
        <FaFire className="text-3xl animate-pulse" />
        <h2 className="text-2xl font-bold">Top Trending Articles</h2>
      </div>

      <div className="space-y-4">
        {articles.map((article, index) => {
          const netVotes =
            (article.votes?.upvotes || 0) - (article.votes?.downvotes || 0);

          return (
            <div
              key={`trending-${article.url || article.title || 'article'}-${index}`}
              onClick={() => onArticleClick(article)}
              role="button"
              tabIndex="0"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 cursor-pointer transition backdrop-blur-sm"
            >
              <div className="flex items-start space-x-4">
                {/* Rank */}
                <div className="text-4xl font-bold opacity-50">
                  #{index + 1}
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <span>{article.source?.name}</span>
                    <span className="bg-white bg-opacity-30 px-3 py-1 rounded-full font-semibold">
                      {netVotes > 0 ? '+' : ''}
                      {netVotes} votes
                    </span>
                  </div>
                </div>

                {/* Thumbnail */}
                <img
                  loading="lazy"
                  src={article.urlToImage || 'https://placehold.co/80x80?text=No+Image'}
                  alt={article.title || 'Article Image'}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/80x80?text=No+Image';
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopTrending;
