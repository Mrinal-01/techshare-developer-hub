
/**
 * Feed Component
 * Handles displaying and filtering posts in the feed
 */

class FeedComponent {
  constructor() {
    this.feedContent = document.getElementById('feedContent');
    this.filterTabs = document.querySelectorAll('.filter-tab');
    this.viewButtons = document.querySelectorAll('.view-btn');
    this.filterDropdown = document.querySelector('.filter-dropdown');
    this.filterBtn = document.querySelector('.filter-btn');
    this.applyFiltersBtn = document.getElementById('applyFilters');
    this.clearFiltersBtn = document.getElementById('clearFilters');
    
    this.currentFilter = 'recommended';
    this.currentView = 'card';
    this.selectedTags = [];
    this.timeFilter = 'today';
    
    this.posts = [];
    
    this.init();
  }
  
  /**
   * Initialize the feed component
   */
  init() {
    if (!this.feedContent) return;
    
    // Load posts with default filters
    this.loadPosts();
    
    // Add event listeners for filter tabs
    this.filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.setActiveFilter(tab.dataset.filter);
      });
    });
    
    // Add event listeners for view toggle
    this.viewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.setActiveView(btn.dataset.view);
      });
    });
    
    // Add event listener for filter dropdown
    if (this.filterBtn) {
      this.filterBtn.addEventListener('click', () => {
        TechShareHelpers.toggleDropdown(this.filterDropdown);
      });
    }
    
    // Add event listener for applying filters
    if (this.applyFiltersBtn) {
      this.applyFiltersBtn.addEventListener('click', () => {
        this.applyFilters();
        this.filterDropdown.classList.remove('show-dropdown');
      });
    }
    
    // Add event listener for clearing filters
    if (this.clearFiltersBtn) {
      this.clearFiltersBtn.addEventListener('click', () => {
        this.clearFilters();
      });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
      if (this.filterDropdown && 
          !this.filterDropdown.contains(event.target) && 
          !this.filterBtn.contains(event.target)) {
        this.filterDropdown.classList.remove('show-dropdown');
      }
    });
  }
  
  /**
   * Load posts from API based on current filters
   */
  loadPosts() {
    if (!this.feedContent) return;
    
    // Show loading state
    this.feedContent.innerHTML = `
      <div class="loading-posts">
        <div class="loading-spinner"></div>
        <p>Loading posts...</p>
      </div>
    `;
    
    // Get posts from API
    TechShareAPI.getPosts({
      filter: this.currentFilter,
      tags: this.selectedTags,
      time: this.timeFilter
    })
    .then(response => {
      this.posts = response.data;
      this.renderPosts();
    })
    .catch(error => {
      console.error('Failed to load posts:', error);
      this.feedContent.innerHTML = `
        <div class="error-message">
          <p>Failed to load posts. Please try again later.</p>
          <button class="btn btn-primary retry-btn">Retry</button>
        </div>
      `;
      
      const retryBtn = this.feedContent.querySelector('.retry-btn');
      if (retryBtn) {
        retryBtn.addEventListener('click', () => this.loadPosts());
      }
    });
  }
  
  /**
   * Render posts in the feed
   */
  renderPosts() {
    if (!this.feedContent) return;
    
    // Clear current content
    this.feedContent.innerHTML = '';
    
    if (this.posts.length === 0) {
      this.feedContent.innerHTML = `
        <div class="empty-feed">
          <div class="empty-feed-icon">
            <i class="fas fa-inbox"></i>
          </div>
          <h3>No posts found</h3>
          <p>Try adjusting your filters or check back later for new content.</p>
        </div>
      `;
      return;
    }
    
    // Apply view class to container
    this.feedContent.className = `feed-content feed-${this.currentView}-view`;
    
    // Create post cards
    this.posts.forEach(post => {
      const postCard = document.createElement('div');
      postCard.className = 'post-card';
      postCard.dataset.postId = post.id;
      
      const truncatedContent = TechShareHelpers.truncateString(post.content, 150);
      const formattedDate = TechShareHelpers.formatDate(post.date);
      
      let tagsHtml = '';
      if (post.tags && post.tags.length > 0) {
        tagsHtml = post.tags.map(tag => `<a href="#" class="tag">#${tag}</a>`).join('');
      }
      
      postCard.innerHTML = `
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
      
      // Add event listeners for post actions
      const likeBtn = postCard.querySelector('.like-btn');
      const bookmarkBtn = postCard.querySelector('.bookmark-btn');
      const commentBtn = postCard.querySelector('.comment-btn');
      const shareBtn = postCard.querySelector('.share-btn');
      
      likeBtn.addEventListener('click', () => this.handleLike(post.id, likeBtn));
      bookmarkBtn.addEventListener('click', () => this.handleBookmark(post.id, bookmarkBtn));
      commentBtn.addEventListener('click', () => this.handleComment(post.id));
      shareBtn.addEventListener('click', () => this.handleShare(post.id));
      
      // Add event listeners for tags
      const tagElements = postCard.querySelectorAll('.tag');
      tagElements.forEach(tag => {
        tag.addEventListener('click', (e) => {
          e.preventDefault();
          const tagName = tag.textContent.substring(1); // Remove # character
          this.addTagFilter(tagName);
        });
      });
      
      this.feedContent.appendChild(postCard);
    });
  }
  
  /**
   * Set active filter tab
   * @param {string} filter - Filter type
   */
  setActiveFilter(filter) {
    this.currentFilter = filter;
    
    // Update active filter tab
    this.filterTabs.forEach(tab => {
      if (tab.dataset.filter === filter) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    
    // Reload posts with new filter
    this.loadPosts();
  }
  
  /**
   * Set active view
   * @param {string} view - View type (card or list)
   */
  setActiveView(view) {
    this.currentView = view;
    
    // Update active view button
    this.viewButtons.forEach(btn => {
      if (btn.dataset.view === view) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    
    // Re-render posts with new view
    this.renderPosts();
  }
  
  /**
   * Apply selected filters
   */
  applyFilters() {
    // Get selected tags
    const selectedTagInputs = document.querySelectorAll('input[name="tag"]:checked');
    this.selectedTags = Array.from(selectedTagInputs).map(input => input.value);
    
    // Get time filter
    const selectedTimeInput = document.querySelector('input[name="time"]:checked');
    if (selectedTimeInput) {
      this.timeFilter = selectedTimeInput.value;
    }
    
    // Reload posts with new filters
    this.loadPosts();
  }
  
  /**
   * Clear all filters
   */
  clearFilters() {
    // Uncheck all tag checkboxes
    const tagInputs = document.querySelectorAll('input[name="tag"]');
    tagInputs.forEach(input => {
      input.checked = false;
    });
    
    // Reset time filter to 'today'
    const todayInput = document.querySelector('input[name="time"][value="today"]');
    if (todayInput) {
      todayInput.checked = true;
    }
    
    // Reset filter values
    this.selectedTags = [];
    this.timeFilter = 'today';
    
    // Reload posts
    this.loadPosts();
  }
  
  /**
   * Add a tag to the filter
   * @param {string} tag - Tag name
   */
  addTagFilter(tag) {
    // Find checkbox for this tag
    const tagInput = document.querySelector(`input[name="tag"][value="${tag}"]`);
    if (tagInput) {
      tagInput.checked = true;
      
      // If not already in selectedTags, add it
      if (!this.selectedTags.includes(tag)) {
        this.selectedTags.push(tag);
      }
      
      // Apply filters
      this.applyFilters();
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  
  /**
   * Handle like button click
   * @param {string} postId - Post ID
   * @param {Element} button - Like button element
   */
  handleLike(postId, button) {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return;
    
    const icon = button.querySelector('i');
    const countSpan = button.querySelector('span');
    
    // Toggle like state
    if (icon.classList.contains('fas')) {
      // Unlike
      icon.classList.replace('fas', 'far');
      post.likes--;
    } else {
      // Like
      icon.classList.replace('far', 'fas');
      post.likes++;
      
      // Add animation
      button.classList.add('liked');
      setTimeout(() => {
        button.classList.remove('liked');
      }, 1000);
    }
    
    // Update count
    countSpan.textContent = post.likes;
  }
  
  /**
   * Handle bookmark button click
   * @param {string} postId - Post ID
   * @param {Element} button - Bookmark button element
   */
  handleBookmark(postId, button) {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return;
    
    const icon = button.querySelector('i');
    const countSpan = button.querySelector('span');
    
    // Toggle bookmark state
    if (icon.classList.contains('fas')) {
      // Remove bookmark
      icon.classList.replace('fas', 'far');
      post.bookmarks--;
    } else {
      // Add bookmark
      icon.classList.replace('far', 'fas');
      post.bookmarks++;
    }
    
    // Update count
    countSpan.textContent = post.bookmarks;
  }
  
  /**
   * Handle comment button click
   * @param {string} postId - Post ID
   */
  handleComment(postId) {
    // In a real application, this would open a comment form or navigate to the post detail page
    console.log(`Open comment form for post ${postId}`);
  }
  
  /**
   * Handle share button click
   * @param {string} postId - Post ID
   */
  handleShare(postId) {
    // In a real application, this would open a share dialog
    console.log(`Share post ${postId}`);
  }
}

// Initialize feed when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.feedComponent = new FeedComponent();
});
