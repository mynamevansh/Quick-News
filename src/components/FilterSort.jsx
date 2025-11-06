// Filter and sort component for news articles
import React from 'react';
import { FaSort, FaCalendarAlt, FaTimes } from 'react-icons/fa';

const FilterSort = ({ 
  sortBy, 
  onSortChange, 
  selectedDate,
  onDateChange 
}) => {
  const handleClearDate = () => {
    onDateChange(null);
  };

  const hasDateFilter = selectedDate !== null && selectedDate !== '';

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
            name="sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
          >
            <option value="highest-votes">Highest Votes</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Date Filter */}
        <div className="flex items-center space-x-3 flex-wrap">
          <FaCalendarAlt className="text-blue-600 text-xl" />
          <label htmlFor="dateFilter" className="font-semibold text-gray-700">
            Filter by Date:
          </label>
          <input
            id="dateFilter"
            name="dateFilter"
            type="date"
            value={selectedDate || ''}
            onChange={(e) => onDateChange(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            placeholder="Select a date"
          />
          
          {/* Clear Date Button */}
          {hasDateFilter && (
            <button
              onClick={handleClearDate}
              className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition flex items-center space-x-1 text-sm"
              title="Clear date filter"
            >
              <FaTimes />
              <span>Clear Date</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSort;
