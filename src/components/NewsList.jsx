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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <NewsCard
          key={`${article.url}-${index}`}
          article={article}
          votes={votes[article.id] || { upvotes: 0, downvotes: 0 }}
          onVoteUpdate={onVoteUpdate}
          onReadFullArticle={onReadFullArticle}
        />
      ))}
    </div>
  );
};

export default NewsList;
