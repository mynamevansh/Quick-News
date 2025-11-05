// News list component with filtering and sorting
import React from 'react';
import NewsCard from './NewsCard';

const NewsList = ({ articles, votes, onVoteUpdate, onReadFullArticle }) => {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-xl">No articles found.</p>
      </div>
    );
  }

  // ✅ Filter: only include articles with valid images
  const filteredArticles = articles.filter(
    (article) => article.urlToImage && article.urlToImage.trim() !== ""
  );

  // Sort by upvotes (optional, from before)
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    const netVotesA = (votes[a.url]?.upvotes || 0) - (votes[a.url]?.downvotes || 0);
    const netVotesB = (votes[b.url]?.upvotes || 0) - (votes[b.url]?.downvotes || 0);
    return netVotesB - netVotesA; // highest first
  });

  if (sortedArticles.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-xl">No articles with images found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedArticles.map((article, index) => (
        <NewsCard
          key={`${article.url || article.title || 'article'}-${index}`}
          article={article}
          votes={votes[article.url || article.title] || { upvotes: 0, downvotes: 0 }}
          onVoteUpdate={onVoteUpdate}
          onReadFullArticle={onReadFullArticle}
        />
      ))}
    </div>
  );
};

export default NewsList;
