// Date utility functions for consistent date handling across the backend
// All dates are stored and compared in YYYY-MM-DD format (local date)
// 
// TIMEZONE HANDLING STRATEGY:
// - All dates are stored as DATE type (not TIMESTAMP) in PostgreSQL
// - Frontend sends dates in YYYY-MM-DD format
// - Backend normalizes all incoming dates to YYYY-MM-DD
// - No timezone conversions needed - we only care about the calendar date
// - This ensures buses are available regardless of user's timezone

/**
 * Get today's date in YYYY-MM-DD format
 */
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Format a date to YYYY-MM-DD
 */
const formatDate = (date) => {
  if (!date) return getTodayDate();
  if (typeof date === 'string') {
    // If already in YYYY-MM-DD format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return date;
    }
    // Handle ISO strings
    return date.split('T')[0];
  }
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Check if a date is in the past
 */
const isDatePast = (dateString) => {
  const today = getTodayDate();
  return dateString < today;
};

/**
 * Check if a date is valid
 */
const isValidDate = (dateString) => {
  if (!dateString) return false;
  // Check format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return false;
  // Check if it's a valid date
  const date = new Date(dateString + 'T00:00:00');
  return date instanceof Date && !isNaN(date);
};

/**
 * Normalize date input to YYYY-MM-DD format
 * Handles various input formats and timezones
 */
const normalizeDate = (input) => {
  if (!input) return getTodayDate();
  
  // If already in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
    return input;
  }
  
  // Handle ISO strings or other formats
  try {
    const date = new Date(input);
    if (isNaN(date)) return getTodayDate();
    return formatDate(date);
  } catch (error) {
    console.error('Error normalizing date:', error);
    return getTodayDate();
  }
};

module.exports = {
  getTodayDate,
  formatDate,
  isDatePast,
  isValidDate,
  normalizeDate
};
