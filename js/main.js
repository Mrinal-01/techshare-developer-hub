
/**
 * Main JavaScript file for TechShare
 * Initializes the application and handles global functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize sidebar toggle
  initSidebar();
  
  // Initialize cookie consent
  initCookieConsent();
  
  // Initialize dropdown menus
  initDropdowns();
  
  // Initialize author follow buttons
  initAuthorFollowButtons();
  
  // Initialize theme toggle
  initThemeToggle();
  
  // Initialize logout functionality
  initLogout();
  
  // Load authors and tags
  loadSidebarContent();
  
  // Generate post placeholders
  generatePosts();
});

/**
 * Initialize sidebar functionality
 */
function initSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  
  if (!sidebar || !sidebarToggle) return;
  
  // Toggle sidebar on button click
  sidebarToggle.addEventListener('click', () => {
    if (TechShareHelpers.isMobile()) {
      sidebar.classList.toggle('show');
    } else {
      sidebar.classList.toggle('collapsed');
    }
  });
  
  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (event) => {
    if (TechShareHelpers.isMobile() && 
        sidebar.classList.contains('show') && 
        !sidebar.contains(event.target) && 
        event.target !== sidebarToggle) {
      sidebar.classList.remove('show');
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', TechShareHelpers.debounce(() => {
    if (!TechShareHelpers.isMobile() && sidebar.classList.contains('show')) {
      sidebar.classList.remove('show');
    }
  }));
}

/**
 * Initialize cookie consent banner
 */
function initCookieConsent() {
  const cookieConsent = document.getElementById('cookieConsent');
  const acceptCookiesBtn = document.getElementById('acceptCookies');
  const customizeCookiesBtn = document.getElementById('customizeCookies');
  
  if (!cookieConsent) return;
  
  // Check if user has already accepted cookies
  const cookiesAccepted = TechShareHelpers.getCookie('cookies-accepted');
  
  if (!cookiesAccepted) {
    // Show cookie consent after a short delay
    setTimeout(() => {
      cookieConsent.classList.add('show');
    }, 1000);
    
    // Handle accept cookies button
    if (acceptCookiesBtn) {
      acceptCookiesBtn.addEventListener('click', () => {
        TechShareHelpers.setCookie('cookies-accepted', 'true', 365);
        cookieConsent.classList.remove('show');
      });
    }
    
    // Handle customize cookies button (would open more detailed settings in a real app)
    if (customizeCookiesBtn) {
      customizeCookiesBtn.addEventListener('click', () => {
        alert('Cookie preferences would open here in a real application.');
      });
    }
  }
}

/**
 * Initialize dropdown menus
 */
function initDropdowns() {
  const userDropdown = document.querySelector('.user-dropdown');
  const userBtn = document.querySelector('.user-btn');
  
  if (userDropdown && userBtn) {
    userBtn.addEventListener('click', () => {
      TechShareHelpers.toggleDropdown(userDropdown);
    });
  }
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (event) => {
    const dropdowns = document.querySelectorAll('.show-dropdown');
    dropdowns.forEach(dropdown => {
      const button = dropdown.querySelector('button');
      if (!dropdown.contains(event.target) && 
          (!button || !button.contains(event.target))) {
        dropdown.classList.remove('show-dropdown');
      }
    });
  });
}

/**
 * Initialize author follow buttons
 */
function initAuthorFollowButtons() {
  const followButtons = document.querySelectorAll('.follow-btn');
  
  followButtons.forEach(button => {
    button.addEventListener('click', () => {
      const authorItem = button.closest('.author-item');
      const authorName = authorItem.querySelector('h4').textContent;
      
      if (button.classList.contains('following')) {
        button.classList.remove('following');
        button.textContent = 'Follow';
        
        // Show unfollow message
        alert(`You unfollowed ${authorName}`);
      } else {
        button.classList.add('following');
        button.textContent = 'Following';
        
        // Show follow message
        alert(`You are now following ${authorName}`);
      }
    });
  });
}

/**
 * Initialize theme toggle
 */
function initThemeToggle() {
  const themeToggle = document.getElementById('toggleTheme');
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
  const themeText = themeToggle ? themeToggle.querySelector('span') : null;
  
  if (!themeToggle) return;
  
  // Check for saved theme preference
  const savedTheme = TechShareHelpers.getFromLocalStorage('theme');
  
  // Set initial theme
  if (savedTheme === 'dark' || 
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark-mode');
    updateThemeToggle(true);
  }
  
  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    
    // Save theme preference
    TechShareHelpers.saveToLocalStorage('theme', isDarkMode ? 'dark' : 'light');
    
    // Update toggle button
    updateThemeToggle(isDarkMode);
  });
  
  /**
   * Update theme toggle button appearance
   * @param {boolean} isDarkMode - Whether dark mode is active
   */
  function updateThemeToggle(isDarkMode) {
    if (themeIcon) {
      themeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    if (themeText) {
      themeText.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
    }
  }
}

/**
 * Initialize logout functionality
 */
function initLogout() {
  const logoutBtn = document.getElementById('logoutBtn');
  
  if (!logoutBtn) return;
  
  logoutBtn.addEventListener('click', (event) => {
    event.preventDefault();
    
    // Confirm logout
    const confirmLogout = confirm('Are you sure you want to log out?');
    
    if (confirmLogout) {
      // Call logout API (in a real app)
      TechShareAPI.signOut()
        .then(() => {
          // Redirect to login page (in a real app)
          alert('You have been logged out successfully.');
          // window.location.href = 'login.html';
        })
        .catch(error => {
          console.error('Logout failed:', error);
          alert('Logout failed. Please try again.');
        });
    }
  });
}

/**
 * Load sidebar content (authors and tags)
 */
function loadSidebarContent() {
  // Load popular authors
  TechShareAPI.getPopularAuthors()
    .then(response => {
      console.log('Authors loaded:', response.data);
      // In a real app, we would use this data to render the authors in the sidebar
    })
    .catch(error => {
      console.error('Failed to load authors:', error);
    });
  
  // Load trending tags
  TechShareAPI.getTrendingTags()
    .then(response => {
      console.log('Tags loaded:', response.data);
      // In a real app, we would use this data to render the tags in the sidebar
    })
    .catch(error => {
      console.error('Failed to load tags:', error);
    });
}

/**
 * Generate posts for the feed
 * This is a temporary function to show posts until the Feed component is fully loaded
 */
function generatePosts() {
  const feedContent = document.getElementById('feedContent');
  
  if (!feedContent) return;
  
  // Skip if Feed component is active
  if (window.feedComponent) return;
  
  // Sample post data
  const posts = [
    {
      id: '1',
      title: 'Getting Started with React 18: New Features and Improvements',
      content: 'React 18 brings several exciting new features including automatic batching, concurrent rendering, and the new Suspense SSR architecture. In this post, we\'ll explore how these features can improve your application\'s performance and user experience.',
      author: {
        name: 'Sarah Chen',
        avatar: 'assets/images/author1.jpg'
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
        name: 'Michael Rodriguez',
        avatar: 'assets/images/author2.jpg'
      },
      date: new Date(Date.now() - 3600000 * 5), // 5 hours ago
      likes: 36,
      comments: 14,
      bookmarks: 22,
      tags: ['devops', 'cicd', 'productivity']
    }
  ];
  
  // Clear current content
  feedContent.innerHTML = '';
  
  // Create post cards
  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.className = 'post-card';
    
    const truncatedContent = TechShareHelpers.truncateString(post.content, 150);
    const formattedDate = TechShareHelpers.formatDate(post.date);
    
    let tagsHtml = '';
    if (post.tags && post.tags.length > 0) {
      tagsHtml = post.tags.map(tag => `<a href="#" class="tag">#${tag}</a>`).join('');
    }
    
    postElement.innerHTML = `
      <div class="post-header">
        <img src="${post.author.avatar}" alt="${post.author.name}" class="author-avatar">
        <div class="post-meta">
          <div class="author-name">${post.author.name}</div>
          <div class="post-date">${formattedDate}</div>
        </div>
      </div>
      <h2 class="post-title">${post.title}</h2>
      <div class="post-content">
        <p>${truncatedContent}</p>
      </div>
      <div class="post-footer">
        <div class="post-actions">
          <button class="post-action like-btn" title="Like">
            <i class="far fa-heart"></i>
            <span>${post.likes}</span>
          </button>
          <button class="post-action comment-btn" title="Comment">
            <i class="far fa-comment"></i>
            <span>${post.comments}</span>
          </button>
          <button class="post-action bookmark-btn" title="Bookmark">
            <i class="far fa-bookmark"></i>
            <span>${post.bookmarks}</span>
          </button>
          <button class="post-action share-btn" title="Share">
            <i class="far fa-share-square"></i>
          </button>
        </div>
        <div class="post-tags">
          ${tagsHtml}
        </div>
      </div>
    `;
    
    feedContent.appendChild(postElement);
  });
}
