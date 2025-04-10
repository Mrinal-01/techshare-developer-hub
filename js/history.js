
/**
 * History page JavaScript
 * Handles the browsing history functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize history filters
  initHistoryFilters();
  
  // Handle history item actions
  initHistoryItemActions();
  
  // Initialize clear history button
  initClearHistory();
});

/**
 * Initialize history filter tabs
 */
function initHistoryFilters() {
  const filterTabs = document.querySelectorAll('.history-filters .filter-tab');
  const historyItems = document.querySelectorAll('.history-item');
  
  if (!filterTabs.length) return;
  
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      filterTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Get filter value
      const filter = tab.dataset.filter;
      
      // Filter history items
      filterHistoryItems(filter);
    });
  });
  
  /**
   * Filter history items based on selected filter
   * @param {string} filter - The filter to apply
   */
  function filterHistoryItems(filter) {
    const timelineDates = document.querySelectorAll('.timeline-date');
    
    // In a real app, we would filter based on actual dates
    // This is a simplified version for demo purposes
    
    if (filter === 'all') {
      // Show all items and dates
      timelineDates.forEach(date => {
        date.style.display = 'block';
      });
      
      historyItems.forEach(item => {
        item.style.display = 'flex';
      });
    } else {
      // Filter based on date sections
      timelineDates.forEach(date => {
        const dateText = date.textContent.trim().toLowerCase();
        
        if (filter === 'today' && dateText === 'today') {
          date.style.display = 'block';
        } else if (filter === 'yesterday' && dateText === 'yesterday') {
          date.style.display = 'block';
        } else if (filter === 'week' && (dateText === 'today' || dateText === 'yesterday')) {
          date.style.display = 'block';
        } else if (filter === 'month') {
          date.style.display = 'block';
        } else {
          date.style.display = 'none';
        }
      });
      
      // Filter items based on their parent date section
      historyItems.forEach(item => {
        const parentDate = item.closest('.history-items').previousElementSibling;
        
        if (parentDate && parentDate.style.display === 'block') {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    }
    
    // Hide empty date sections
    timelineDates.forEach(date => {
      const nextItems = date.nextElementSibling;
      const visibleItems = nextItems.querySelectorAll('.history-item[style="display: flex;"]');
      
      if (visibleItems.length === 0) {
        date.style.display = 'none';
      }
    });
  }
}

/**
 * Initialize history item actions (view, remove)
 */
function initHistoryItemActions() {
  const historyItems = document.querySelectorAll('.history-item');
  
  historyItems.forEach(item => {
    // Get action buttons
    const viewBtn = item.querySelector('.history-action:first-child');
    const removeBtn = item.querySelector('.history-action:last-child');
    
    // Get item content
    const itemContent = item.querySelector('.history-content');
    
    // Add click event to item content (view post)
    if (itemContent) {
      itemContent.addEventListener('click', () => {
        // In a real app, this would navigate to the post
        // For demo purposes, just log to console
        const title = itemContent.querySelector('h4').textContent;
        console.log(`Viewing post: ${title}`);
      });
    }
    
    // Add click event to view button
    if (viewBtn) {
      viewBtn.addEventListener('click', () => {
        // In a real app, this would navigate to the post
        // For demo purposes, just log to console
        const title = item.querySelector('h4').textContent;
        console.log(`Viewing post: ${title}`);
      });
    }
    
    // Add click event to remove button
    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        // Animation for removal
        item.classList.add('removing');
        
        // Remove after animation
        setTimeout(() => {
          // Check if this is the last item in the section
          const parentItems = item.parentElement;
          const siblingItems = parentItems.querySelectorAll('.history-item:not(.removing)');
          
          // Remove the item
          item.remove();
          
          // If no more items in this section, hide the date heading
          if (siblingItems.length === 0) {
            const dateHeading = parentItems.previousElementSibling;
            if (dateHeading && dateHeading.classList.contains('timeline-date')) {
              dateHeading.style.display = 'none';
            }
          }
        }, 300);
      });
    }
  });
}

/**
 * Initialize clear history button
 */
function initClearHistory() {
  const clearBtn = document.querySelector('.clear-history-btn');
  
  if (!clearBtn) return;
  
  clearBtn.addEventListener('click', () => {
    // Confirm before clearing
    const confirmClear = confirm('Are you sure you want to clear your browsing history?');
    
    if (confirmClear) {
      // Get all history items and date headings
      const historyItems = document.querySelectorAll('.history-item');
      const dateHeadings = document.querySelectorAll('.timeline-date');
      
      // Add removing class to all items
      historyItems.forEach(item => {
        item.classList.add('removing');
      });
      
      // Remove all items and headings after animation
      setTimeout(() => {
        historyItems.forEach(item => item.remove());
        dateHeadings.forEach(heading => {
          heading.style.display = 'none';
        });
        
        // Show empty state
        const historyTimeline = document.querySelector('.history-timeline');
        if (historyTimeline) {
          historyTimeline.innerHTML = `
            <div class="empty-history">
              <div class="empty-icon">
                <i class="fas fa-history"></i>
              </div>
              <h3>No browsing history</h3>
              <p>Your browsing history will appear here as you view posts.</p>
            </div>
          `;
        }
      }, 300);
    }
  });
}
