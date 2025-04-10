
/**
 * Utility functions for the TechShare application
 */

const TechShareHelpers = {
  /**
   * Format a date to a readable string
   * @param {string|Date} date - The date to format
   * @returns {string} Formatted date string
   */
  formatDate: function(date) {
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now - d);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        if (diffMinutes === 0) {
          return 'Just now';
        }
        return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
      }
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else {
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }
  },
  
  /**
   * Truncate a string to a specific length
   * @param {string} str - String to truncate
   * @param {number} length - Max length
   * @returns {string} Truncated string
   */
  truncateString: function(str, length = 100) {
    if (!str || str.length <= length) return str;
    return str.slice(0, length) + '...';
  },
  
  /**
   * Toggle a class on an element
   * @param {Element} element - The DOM element
   * @param {string} className - The class to toggle
   */
  toggleClass: function(element, className) {
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    } else {
      element.classList.add(className);
    }
  },
  
  /**
   * Toggle dropdown visibility
   * @param {Element} dropdown - The dropdown container element
   */
  toggleDropdown: function(dropdown) {
    // Close any open dropdowns first
    document.querySelectorAll('.show-dropdown').forEach(openDropdown => {
      if (openDropdown !== dropdown) {
        openDropdown.classList.remove('show-dropdown');
      }
    });
    
    // Toggle the current dropdown
    dropdown.classList.toggle('show-dropdown');
  },
  
  /**
   * Generate a unique ID
   * @returns {string} A unique ID
   */
  generateId: function() {
    return '_' + Math.random().toString(36).substr(2, 9);
  },
  
  /**
   * Create HTML element from HTML string
   * @param {string} htmlString - The HTML string to convert
   * @returns {DocumentFragment} Document fragment containing the elements
   */
  createElementFromHTML: function(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  },
  
  /**
   * Detect if device is mobile
   * @returns {boolean} True if mobile device
   */
  isMobile: function() {
    return window.innerWidth < 768;
  },
  
  /**
   * Save data to localStorage
   * @param {string} key - The key to store under
   * @param {*} data - The data to store
   */
  saveToLocalStorage: function(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  },
  
  /**
   * Get data from localStorage
   * @param {string} key - The key to retrieve
   * @param {*} defaultValue - Default value if key doesn't exist
   * @returns {*} The stored data or default value
   */
  getFromLocalStorage: function(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('Error getting from localStorage', e);
      return defaultValue;
    }
  },
  
  /**
   * Debounce function to limit how often a function can be called
   * @param {Function} func - The function to debounce
   * @param {number} delay - Delay in milliseconds
   * @returns {Function} Debounced function
   */
  debounce: function(func, delay = 300) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  },
  
  /**
   * Get a cookie by name
   * @param {string} name - Name of the cookie
   * @returns {string|null} Cookie value or null if not found
   */
  getCookie: function(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  },
  
  /**
   * Set a cookie
   * @param {string} name - Cookie name
   * @param {string} value - Cookie value
   * @param {number} days - Days until expiration
   */
  setCookie: function(name, value, days = 30) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  }
};

// Make helpers globally available
window.TechShareHelpers = TechShareHelpers;
