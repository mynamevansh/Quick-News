// Article modal component for reading full article
import React from 'react';
import { FaTimes, FaExternalLinkAlt } from 'react-icons/fa';

const ArticleModal = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-800 flex-grow pr-4">
            {article.title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 transition text-2xl flex-shrink-0"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image */}
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}

          {/* Source and Date */}
          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <span className="font-semibold">{article.source?.name || 'Unknown Source'}</span>
            <span>{new Date(article.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {article.description}
          </p>

          {/* Content */}
          {article.content && (
            <div className="text-gray-800 mb-6 leading-relaxed">
              <p>{article.content}</p>
            </div>
          )}

          {/* Author */}
          {article.author && (
            <p className="text-sm text-gray-600 mb-6">
              <span className="font-semibold">Author:</span> {article.author}
            </p>
          )}

          {/* Read on Source Website Button */}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            <span>Read Full Article on {article.source?.name || 'Source Website'}</span>
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;
