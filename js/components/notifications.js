
/**
 * Notification Component
 * Handles displaying and managing notifications
 */

class NotificationsComponent {
  constructor() {
    this.notificationDropdown = document.querySelector('.notifications-dropdown');
    this.notificationBtn = document.querySelector('.notifications-btn');
    this.notificationBadge = document.querySelector('.notification-badge');
    this.notificationList = document.querySelector('.notification-list');
    
    this.notifications = [];
    this.unreadCount = 0;
    
    this.init();
  }
  
  /**
   * Initialize the notifications component
   */
  init() {
    if (!this.notificationDropdown) return;
    
    // Add event listener to toggle dropdown
    this.notificationBtn.addEventListener('click', () => {
      TechShareHelpers.toggleDropdown(this.notificationDropdown);
      
      // Mark as read when opened
      if (this.notificationDropdown.classList.contains('show-dropdown')) {
        this.markAllAsRead();
      }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
      if (!this.notificationDropdown.contains(event.target) && 
          !this.notificationBtn.contains(event.target)) {
        this.notificationDropdown.classList.remove('show-dropdown');
      }
    });
    
    // Load notifications
    this.loadNotifications();
  }
  
  /**
   * Load notifications from API
   */
  loadNotifications() {
    TechShareAPI.getNotifications()
      .then(response => {
        this.notifications = response.data;
        this.unreadCount = this.notifications.length;
        this.updateBadge();
        this.renderNotifications();
      })
      .catch(error => {
        console.error('Failed to load notifications:', error);
      });
  }
  
  /**
   * Update the notification badge count
   */
  updateBadge() {
    if (this.unreadCount > 0) {
      this.notificationBadge.textContent = this.unreadCount > 9 ? '9+' : this.unreadCount;
      this.notificationBadge.style.display = 'flex';
    } else {
      this.notificationBadge.style.display = 'none';
    }
  }
  
  /**
   * Mark all notifications as read
   */
  markAllAsRead() {
    this.unreadCount = 0;
    this.updateBadge();
    
    // Update UI to show all notifications as read
    const unreadItems = this.notificationList.querySelectorAll('.notification-item.unread');
    unreadItems.forEach(item => {
      item.classList.remove('unread');
    });
  }
  
  /**
   * Render notifications in the dropdown
   */
  renderNotifications() {
    if (!this.notificationList) return;
    
    // Clear current notifications
    this.notificationList.innerHTML = '';
    
    if (this.notifications.length === 0) {
      this.notificationList.innerHTML = `
        <div class="notification-empty">
          <p>No notifications yet</p>
        </div>
      `;
      return;
    }
    
    // Create notification items
    this.notifications.forEach(notification => {
      const notificationItem = document.createElement('div');
      notificationItem.className = 'notification-item unread';
      
      let icon;
      switch (notification.type) {
        case 'like':
          icon = '<i class="fas fa-heart"></i>';
          break;
        case 'comment':
          icon = '<i class="fas fa-comment"></i>';
          break;
        case 'follow':
          icon = '<i class="fas fa-user-plus"></i>';
          break;
        default:
          icon = '<i class="fas fa-bell"></i>';
      }
      
      let content = `
        <div class="notification-icon ${notification.type}">
          ${icon}
        </div>
        <div class="notification-content">
          <div class="notification-header">
            <img src="${notification.user.avatar}" alt="${notification.user.name}" class="notification-avatar">
            <div class="notification-text">
              <span class="notification-user">${notification.user.name}</span>
              <span class="notification-action">${notification.content}</span>
              ${notification.target ? `<span class="notification-target">"${notification.target}"</span>` : ''}
            </div>
          </div>
          <div class="notification-meta">
            <span class="notification-time">${TechShareHelpers.formatDate(notification.date)}</span>
          </div>
        </div>
      `;
      
      notificationItem.innerHTML = content;
      this.notificationList.appendChild(notificationItem);
    });
  }
  
  /**
   * Add a new notification
   * @param {Object} notification - Notification data
   */
  addNotification(notification) {
    this.notifications.unshift(notification);
    this.unreadCount++;
    this.updateBadge();
    this.renderNotifications();
  }
}

// Initialize notifications when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.notificationsComponent = new NotificationsComponent();
});
