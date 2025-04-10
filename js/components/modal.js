
/**
 * Modal Component
 * Handles opening, closing, and interaction with modals
 */

class ModalComponent {
  constructor() {
    // Create post modal elements
    this.createPostModal = document.getElementById('createPostModal');
    this.createPostBtn = document.querySelector('.create-post-btn');
    this.modalCloseBtn = document.querySelector('.modal-close');
    this.postForm = document.getElementById('postForm');
    this.postTitleInput = document.getElementById('postTitle');
    this.postContentTextarea = document.getElementById('postContent');
    this.postTagsInput = document.getElementById('postTags');
    this.saveDraftBtn = document.getElementById('saveDraft');
    
    // Editor toolbar elements
    this.toolbarButtons = document.querySelectorAll('.toolbar-btn');
    
    this.init();
  }
  
  /**
   * Initialize modal component
   */
  init() {
    if (!this.createPostModal) return;
    
    // Add event listener for opening modal
    if (this.createPostBtn) {
      this.createPostBtn.addEventListener('click', () => {
        this.openModal(this.createPostModal);
      });
    }
    
    // Add event listener for closing modal
    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', () => {
        this.closeModal(this.createPostModal);
      });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
      if (event.target === this.createPostModal) {
        this.closeModal(this.createPostModal);
      }
    });
    
    // Add event listener for form submission
    if (this.postForm) {
      this.postForm.addEventListener('submit', (event) => {
        event.preventDefault();
        this.submitPost();
      });
    }
    
    // Add event listener for saving draft
    if (this.saveDraftBtn) {
      this.saveDraftBtn.addEventListener('click', () => {
        this.saveDraft();
      });
    }
    
    // Add event listeners for toolbar buttons
    this.toolbarButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.handleToolbarAction(button.dataset.action);
      });
    });
    
    // Check for saved draft on load
    this.checkForSavedDraft();
  }
  
  /**
   * Open a modal
   * @param {HTMLElement} modal - The modal to open
   */
  openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent scrolling on body
  }
  
  /**
   * Close a modal
   * @param {HTMLElement} modal - The modal to close
   */
  closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = ''; // Restore scrolling on body
  }
  
  /**
   * Submit a new post
   */
  submitPost() {
    const title = this.postTitleInput.value.trim();
    const content = this.postContentTextarea.value.trim();
    const tagsInput = this.postTagsInput.value.trim();
    
    // Validate inputs
    if (!title || !content) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Process tags
    const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim().toLowerCase()) : [];
    
    // Create post object
    const post = {
      title,
      content,
      tags
    };
    
    // Submit to API
    TechShareAPI.createPost(post)
      .then(response => {
        console.log('Post created:', response.data);
        
        // Clear form
        this.postForm.reset();
        
        // Close modal
        this.closeModal(this.createPostModal);
        
        // Clear any saved drafts
        localStorage.removeItem('postDraft');
        
        // Show success message
        alert('Post published successfully!');
        
        // Reload feed to show new post
        if (window.feedComponent) {
          window.feedComponent.loadPosts();
        }
      })
      .catch(error => {
        console.error('Failed to create post:', error);
        alert('Failed to publish post. Please try again later.');
      });
  }
  
  /**
   * Save post draft to localStorage
   */
  saveDraft() {
    const title = this.postTitleInput.value.trim();
    const content = this.postContentTextarea.value.trim();
    const tags = this.postTagsInput.value.trim();
    
    // Skip if no content
    if (!title && !content && !tags) {
      return;
    }
    
    // Save draft
    const draft = {
      title,
      content,
      tags,
      savedAt: new Date().toISOString()
    };
    
    localStorage.setItem('postDraft', JSON.stringify(draft));
    
    // Show confirmation
    alert('Draft saved successfully!');
  }
  
  /**
   * Check for saved draft on load
   */
  checkForSavedDraft() {
    const draftJson = localStorage.getItem('postDraft');
    if (!draftJson) return;
    
    try {
      const draft = JSON.parse(draftJson);
      
      // Ask user if they want to restore draft
      const confirmRestore = confirm('We found a saved draft. Would you like to restore it?');
      
      if (confirmRestore) {
        // Restore draft
        this.postTitleInput.value = draft.title || '';
        this.postContentTextarea.value = draft.content || '';
        this.postTagsInput.value = draft.tags || '';
        
        // Open modal
        this.openModal(this.createPostModal);
      } else {
        // Remove draft
        localStorage.removeItem('postDraft');
      }
    } catch (error) {
      console.error('Failed to parse draft:', error);
      localStorage.removeItem('postDraft');
    }
  }
  
  /**
   * Handle toolbar button actions
   * @param {string} action - Action type
   */
  handleToolbarAction(action) {
    const textarea = this.postContentTextarea;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    let replacement = selectedText;
    let cursorOffset = 0;
    
    switch (action) {
      case 'bold':
        replacement = `**${selectedText}**`;
        cursorOffset = 2;
        break;
      case 'italic':
        replacement = `*${selectedText}*`;
        cursorOffset = 1;
        break;
      case 'link':
        if (selectedText) {
          replacement = `[${selectedText}](url)`;
          cursorOffset = 3;
        } else {
          replacement = `[text](url)`;
          cursorOffset = 0;
        }
        break;
      case 'code':
        if (selectedText.includes('\n')) {
          replacement = `\`\`\`\n${selectedText}\n\`\`\``;
        } else {
          replacement = `\`${selectedText}\``;
        }
        cursorOffset = 1;
        break;
      case 'image':
        replacement = `![alt text](image-url)`;
        cursorOffset = 0;
        break;
    }
    
    // Insert formatted text
    textarea.value = 
      textarea.value.substring(0, start) + 
      replacement + 
      textarea.value.substring(end);
    
    // Set cursor position
    if (start === end) {
      textarea.selectionStart = start + replacement.length;
      textarea.selectionEnd = start + replacement.length;
    } else {
      textarea.selectionStart = start;
      textarea.selectionEnd = start + replacement.length;
    }
    
    // Focus back on textarea
    textarea.focus();
  }
}

// Initialize modal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.modalComponent = new ModalComponent();
});
