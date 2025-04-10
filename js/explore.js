
/**
 * Explore page JavaScript
 * Handles explore page functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize explore page interactions
  initExploreInteractions();
  
  // Initialize follow buttons
  initFollowButtons();
  
  // Initialize trending posts
  initTrendingPosts();
});

/**
 * Initialize explore page interactions
 */
function initExploreInteractions() {
  // Topic card hover effects
  const topicCards = document.querySelectorAll('.topic-card');
  
  topicCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('hover');
    });
    
    card.addEventListener('mouseleave', () => {
      card.classList.remove('hover');
    });
    
    // Add click event to explore button
    const exploreBtn = card.querySelector('.btn');
    if (exploreBtn) {
      exploreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const topicName = card.querySelector('h3').textContent;
        
        // In a real app, this would navigate to the topic page
        // For demo purposes, just log to console
        console.log(`Exploring topic: ${topicName}`);
      });
    }
  });
  
  // Add click event for trending posts
  const trendingPosts = document.querySelectorAll('.trending-post');
  
  trendingPosts.forEach(post => {
    post.addEventListener('click', () => {
      const postTitle = post.querySelector('h3').textContent;
      
      // In a real app, this would navigate to the post
      // For demo purposes, just log to console
      console.log(`Viewing trending post: ${postTitle}`);
    });
  });
}

/**
 * Initialize follow buttons for authors
 */
function initFollowButtons() {
  const followButtons = document.querySelectorAll('.author-card .follow-btn');
  
  followButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent card click
      
      const authorCard = button.closest('.author-card');
      const authorName = authorCard.querySelector('h3').textContent;
      
      if (button.classList.contains('following')) {
        // Unfollow
        button.classList.remove('following');
        button.textContent = 'Follow';
        
        // Send unfollow API request (in a real app)
        console.log(`Unfollowed ${authorName}`);
      } else {
        // Follow
        button.classList.add('following');
        button.textContent = 'Following';
        
        // Send follow API request (in a real app)
        console.log(`Followed ${authorName}`);
        
        // Show notification
        showFollowNotification(authorName);
      }
    });
  });
  
  // Author card click
  const authorCards = document.querySelectorAll('.author-card');
  
  authorCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.follow-btn')) {
        const authorName = card.querySelector('h3').textContent;
        
        // In a real app, this would navigate to author profile
        // For demo purposes, just log to console
        console.log(`Viewing author profile: ${authorName}`);
      }
    });
  });
}

/**
 * Show notification when following an author
 * @param {string} authorName - Name of the author
 */
function showFollowNotification(authorName) {
  // Check if notifications component exists
  if (window.notificationsComponent) {
    // Create notification object
    const notification = {
      id: TechShareHelpers.generateId(),
      type: 'follow',
      user: {
        name: authorName,
        avatar: getAuthorImage(authorName)
      },
      content: 'You started following',
      date: new Date()
    };
    
    // Add notification
    window.notificationsComponent.addNotification(notification);
  }
  
  // Helper to get author image based on name
  function getAuthorImage(name) {
    if (name === 'Sarah Chen') {
      return 'assets/images/author1.jpg';
    } else if (name === 'Michael Rodriguez') {
      return 'assets/images/author2.jpg';
    } else if (name === 'Jessica Kim') {
      return 'assets/images/author3.jpg';
    } else {
      return 'assets/images/avatar.jpg';
    }
  }
}

/**
 * Initialize trending posts interactions
 */
function initTrendingPosts() {
  const trendingPosts = document.querySelectorAll('.trending-post');
  
  // Add hover effects
  trendingPosts.forEach(post => {
    post.addEventListener('mouseenter', () => {
      post.classList.add('hover');
    });
    
    post.addEventListener('mouseleave', () => {
      post.classList.remove('hover');
    });
  });
  
  // Highlight first post
  if (trendingPosts.length > 0) {
    trendingPosts[0].classList.add('featured');
  }
}
