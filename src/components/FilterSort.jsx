// Filter and sort component for news articles
import React from 'react';
import { FaFilter, FaSort } from 'react-icons/fa';

const FilterSort = ({ sortBy, onSortChange, dateRange, onDateRangeChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
        {/* Sort Dropdown */}
        <div className="flex items-center space-x-3">
          <FaSort className="text-blue-600 text-xl" />
          <label htmlFor="sort" className="font-semibold text-gray-700">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
          >
            <option value="highest-votes">Highest Votes</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Date Range Filter */}
        <div className="flex items-center space-x-3">
          <FaFilter className="text-blue-600 text-xl" />
          <label htmlFor="dateRange" className="font-semibold text-gray-700">
            Date Range:
          </label>
          <select
            id="dateRange"
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSort;
