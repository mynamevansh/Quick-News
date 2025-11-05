// Filter and sort component for news articles
import React, { useState } from 'react';
import { FaFilter, FaSort, FaCalendarAlt, FaTimes } from 'react-icons/fa';

const FilterSort = ({ 
  sortBy, 
  onSortChange, 
  dateRange, 
  onDateRangeChange,
  customFromDate,
  customToDate,
  onCustomDateChange 
}) => {
  const [showCustomRange, setShowCustomRange] = useState(false);

  const handleDateRangeChange = (value) => {
    if (value === 'custom') {
      setShowCustomRange(true);
    } else {
      setShowCustomRange(false);
      onDateRangeChange(value);
    }
  };

  const handleApplyCustomRange = () => {
    if (customFromDate && customToDate) {
      onDateRangeChange('custom');
    } else {
      alert('Please select both start and end dates');
    }
  };

  const handleClearCustomRange = () => {
    setShowCustomRange(false);
    onCustomDateChange(null, null);
    onDateRangeChange('all');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col space-y-4">
        {/* First Row: Sort and Date Range */}
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

          {/* Date Range Filter */}
          <div className="flex items-center space-x-3">
            <FaFilter className="text-blue-600 text-xl" />
            <label htmlFor="dateRange" className="font-semibold text-gray-700">
              Date Range:
            </label>
            <select
              id="dateRange"
              name="dateRange"
              value={dateRange === 'custom' ? 'custom' : dateRange}
              onChange={(e) => handleDateRangeChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
            >
              <option value="all">All Dates</option>
              <option value="24hours">Past 24 Hours</option>
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
        </div>

        {/* Second Row: Custom Date Range Inputs (shown when custom is selected) */}
        {showCustomRange && (
          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <FaCalendarAlt className="text-blue-600 text-xl hidden md:block" />
            
            <div className="flex flex-col">
              <label htmlFor="fromDate" className="text-sm font-semibold text-gray-700 mb-1">
                From:
              </label>
              <input
                id="fromDate"
                name="fromDate"
                type="date"
                value={customFromDate || ''}
                onChange={(e) => onCustomDateChange(e.target.value, customToDate)}
                max={customToDate || new Date().toISOString().split('T')[0]}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="toDate" className="text-sm font-semibold text-gray-700 mb-1">
                To:
              </label>
              <input
                id="toDate"
                name="toDate"
                type="date"
                value={customToDate || ''}
                onChange={(e) => onCustomDateChange(customFromDate, e.target.value)}
                min={customFromDate || ''}
                max={new Date().toISOString().split('T')[0]}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex space-x-2 md:mt-6">
              <button
                onClick={handleApplyCustomRange}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
              >
                Apply
              </button>
              <button
                onClick={handleClearCustomRange}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition flex items-center space-x-1"
              >
                <FaTimes />
                <span>Clear</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSort;
