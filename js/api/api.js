
/**
 * API service for TechShare application
 * Simulated API calls with mock data for demonstration
 */

const TechShareAPI = {
  /**
   * Delay to simulate network request
   * @type {number}
   */
  DELAY: 500,
  
  /**
   * Simulate an API request
   * @param {*} data - The data to return
   * @param {boolean} success - Whether the request should succeed
   * @param {number} delay - Custom delay in ms
   * @returns {Promise} Promise that resolves with the data
   */
  simulateRequest: function(data, success = true, delay = this.DELAY) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (success) {
          resolve({ data, success: true });
        } else {
          reject({ error: 'Request failed', success: false });
        }
      }, delay);
    });
  },
  
  /**
   * Get posts for the feed
   * @param {Object} options - Filter options
   * @returns {Promise} Promise with posts data
   */
  getPosts: function(options = {}) {
    const { filter = 'recommended', tags = [], time = 'today' } = options;
    
    // Mock posts data
    const posts = [
      {
        id: '1',
        title: 'Getting Started with React 18: New Features and Improvements',
        content: 'React 18 brings several exciting new features including automatic batching, concurrent rendering, and the new Suspense SSR architecture. In this post, we\'ll explore how these features can improve your application\'s performance and user experience.',
        author: {
          id: '101',
          name: 'Sarah Chen',
          avatar: 'assets/images/author1.jpg',
          role: 'Frontend Developer'
        },
        date: new Date(Date.now() - 3600000 * 2), // 2 hours ago
        likes: 42,
        comments: 18,
        bookmarks: 7,
        tags: ['react', 'javascript', 'webdev']
      },
      {
        id: '2',
        title: 'Optimizing CI/CD Pipelines for Large Scale Projects',
        content: 'Continuous Integration and Continuous Deployment pipelines are essential for modern development workflows, but they can become slow and inefficient as projects grow. This post shares practical strategies for optimizing your CI/CD pipelines to save time and resources.',
        author: {
          id: '102',
          name: 'Michael Rodriguez',
          avatar: 'assets/images/author2.jpg',
          role: 'DevOps Engineer'
        },
        date: new Date(Date.now() - 3600000 * 5), // 5 hours ago
        likes: 36,
        comments: 14,
        bookmarks: 22,
        tags: ['devops', 'cicd', 'productivity']
      },
      {
        id: '3',
        title: 'Practical Applications of Machine Learning in Everyday Products',
        content: 'Machine learning isn\'t just for data scientists and AI researchers. This post explores practical ways that developers are implementing ML features in common applications to enhance user experience and provide unique value.',
        author: {
          id: '103',
          name: 'Jessica Kim',
          avatar: 'assets/images/author3.jpg',
          role: 'Data Scientist'
        },
        date: new Date(Date.now() - 3600000 * 8), // 8 hours ago
        likes: 89,
        comments: 32,
        bookmarks: 41,
        tags: ['machinelearning', 'ai', 'python']
      },
      {
        id: '4',
        title: 'Building Accessible Web Applications: A Comprehensive Guide',
        content: 'Web accessibility is often overlooked, but it\'s a crucial aspect of web development. This post provides a comprehensive guide to creating accessible applications, covering semantic HTML, ARIA attributes, keyboard navigation, and testing tools.',
        author: {
          id: '104',
          name: 'Alex Johnson',
          avatar: 'assets/images/avatar.jpg',
          role: 'Accessibility Specialist'
        },
        date: new Date(Date.now() - 3600000 * 24), // 1 day ago
        likes: 67,
        comments: 23,
        bookmarks: 19,
        tags: ['accessibility', 'webdev', 'html', 'css']
      }
    ];
    
    // Filter posts based on options
    let filteredPosts = [...posts];
    
    // Filter by tags if provided
    if (tags.length > 0) {
      filteredPosts = filteredPosts.filter(post => 
        tags.some(tag => post.tags.includes(tag))
      );
    }
    
    // Sort based on filter type
    switch (filter) {
      case 'latest':
        filteredPosts.sort((a, b) => b.date - a.date);
        break;
      case 'popular':
        filteredPosts.sort((a, b) => b.likes - a.likes);
        break;
      case 'recommended':
      default:
        // Combine recency and popularity for recommended
        filteredPosts.sort((a, b) => {
          const aScore = a.likes * 0.7 + (Date.now() - a.date) * 0.3;
          const bScore = b.likes * 0.7 + (Date.now() - b.date) * 0.3;
          return bScore - aScore;
        });
        break;
    }
    
    return this.simulateRequest(filteredPosts);
  },
  
  /**
   * Get notifications for the current user
   * @returns {Promise} Promise with notifications data
   */
  getNotifications: function() {
    const notifications = [
      {
        id: '1',
        type: 'like',
        user: {
          name: 'Sarah Chen',
          avatar: 'assets/images/author1.jpg'
        },
        content: 'liked your post',
        target: 'Getting Started with TypeScript',
        date: new Date(Date.now() - 1800000) // 30 minutes ago
      },
      {
        id: '2',
        type: 'comment',
        user: {
          name: 'Michael Rodriguez',
          avatar: 'assets/images/author2.jpg'
        },
        content: 'commented on your post',
        target: 'Building RESTful APIs with Node.js',
        date: new Date(Date.now() - 3600000) // 1 hour ago
      },
      {
        id: '3',
        type: 'follow',
        user: {
          name: 'Jessica Kim',
          avatar: 'assets/images/author3.jpg'
        },
        content: 'started following you',
        date: new Date(Date.now() - 86400000) // 1 day ago
      }
    ];
    
    return this.simulateRequest(notifications);
  },
  
  /**
   * Create a new post
   * @param {Object} post - Post data
   * @returns {Promise} Promise with the created post
   */
  createPost: function(post) {
    const newPost = {
      id: TechShareHelpers.generateId(),
      author: {
        id: '104',
        name: 'Alex Johnson',
        avatar: 'assets/images/avatar.jpg',
        role: 'Full Stack Developer'
      },
      date: new Date(),
      likes: 0,
      comments: 0,
      bookmarks: 0,
      ...post
    };
    
    return this.simulateRequest(newPost);
  },
  
  /**
   * Get popular authors
   * @returns {Promise} Promise with popular authors data
   */
  getPopularAuthors: function() {
    const authors = [
      {
        id: '101',
        name: 'Sarah Chen',
        avatar: 'assets/images/author1.jpg',
        role: 'Frontend Developer',
        following: false
      },
      {
        id: '102',
        name: 'Michael Rodriguez',
        avatar: 'assets/images/author2.jpg',
        role: 'DevOps Engineer',
        following: false
      },
      {
        id: '103',
        name: 'Jessica Kim',
        avatar: 'assets/images/author3.jpg',
        role: 'Data Scientist',
        following: false
      }
    ];
    
    return this.simulateRequest(authors);
  },
  
  /**
   * Toggle following status for an author
   * @param {string} authorId - Author ID
   * @param {boolean} follow - Whether to follow or unfollow
   * @returns {Promise} Promise with the updated following status
   */
  toggleFollowAuthor: function(authorId, follow) {
    return this.simulateRequest({ authorId, following: follow });
  },
  
  /**
   * Get trending tags
   * @returns {Promise} Promise with trending tags data
   */
  getTrendingTags: function() {
    const tags = [
      { name: 'javascript', count: 1250 },
      { name: 'react', count: 876 },
      { name: 'webdev', count: 752 },
      { name: 'python', count: 697 },
      { name: 'ai', count: 543 },
      { name: 'machinelearning', count: 487 },
      { name: 'devops', count: 432 },
      { name: 'cloud', count: 398 }
    ];
    
    return this.simulateRequest(tags);
  },
  
  /**
   * Sign in user
   * @param {Object} credentials - User credentials
   * @returns {Promise} Promise with user data
   */
  signIn: function(credentials) {
    // Simulate authentication
    if (credentials.email && credentials.password) {
      const user = {
        id: '104',
        name: 'Alex Johnson',
        email: credentials.email,
        avatar: 'assets/images/avatar.jpg',
        reputation: 230,
        level: 2
      };
      
      return this.simulateRequest(user);
    }
    
    return this.simulateRequest(null, false);
  },
  
  /**
   * Log out current user
   * @returns {Promise} Promise indicating success
   */
  signOut: function() {
    return this.simulateRequest({ success: true });
  }
};

// Make API globally available
window.TechShareAPI = TechShareAPI;
