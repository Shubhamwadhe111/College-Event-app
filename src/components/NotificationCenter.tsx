import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, X, CheckCheck, Trash2 } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';
import { useAuth } from '../contexts/AuthContext';

const NotificationCenter: React.FC = () => {
  const { user } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, clearAll } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter notifications for current user
  const userNotifications = user 
    ? notifications.filter(n => n.userId === user.id)
    : [];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'info':
        return 'ℹ️';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      default:
        return '🔔';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return '#10b981';
      case 'info':
        return '#3b82f6';
      case 'warning':
        return '#f59e0b';
      case 'error':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (!user) return null;

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'relative',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
      >
        <Bell size={24} color="white" />
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              background: '#ef4444',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: 'bold',
              border: '2px solid #1f2937',
            }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '8px',
            width: '400px',
            maxWidth: '90vw',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            zIndex: 1000,
            maxHeight: '600px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>
              Notifications
            </h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: '#667eea',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                  title="Mark all as read"
                >
                  <CheckCheck size={16} />
                  Mark all read
                </button>
              )}
              {userNotifications.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm('Clear all notifications?')) {
                      clearAll();
                    }
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                  title="Clear all"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div
            style={{
              overflowY: 'auto',
              maxHeight: '500px',
            }}
          >
            {userNotifications.length === 0 ? (
              <div
                style={{
                  padding: '40px 20px',
                  textAlign: 'center',
                  color: '#9ca3af',
                }}
              >
                <Bell size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                <p style={{ margin: 0, fontSize: '14px' }}>No notifications yet</p>
              </div>
            ) : (
              userNotifications.map((notification) => (
                <div
                  key={notification.id}
                  style={{
                    padding: '16px',
                    borderBottom: '1px solid #f3f4f6',
                    background: notification.read ? 'white' : '#f0f4ff',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = notification.read ? '#f9fafb' : '#e0e7ff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = notification.read ? 'white' : '#f0f4ff';
                  }}
                  onClick={() => {
                    if (!notification.read) {
                      markAsRead(notification.id);
                    }
                    if (notification.link) {
                      setIsOpen(false);
                    }
                  }}
                >
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div
                      style={{
                        fontSize: '24px',
                        flexShrink: 0,
                      }}
                    >
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'start',
                          marginBottom: '4px',
                        }}
                      >
                        <h4
                          style={{
                            margin: 0,
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: '#1f2937',
                          }}
                        >
                          {notification.title}
                        </h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '2px',
                            color: '#9ca3af',
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p
                        style={{
                          margin: '0 0 8px 0',
                          fontSize: '13px',
                          color: '#6b7280',
                          lineHeight: '1.4',
                        }}
                      >
                        {notification.message}
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '11px',
                            color: '#9ca3af',
                          }}
                        >
                          {formatTime(notification.createdAt)}
                        </span>
                        {notification.link && (
                          <Link
                            to={notification.link}
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsOpen(false);
                            }}
                            style={{
                              fontSize: '12px',
                              color: '#667eea',
                              textDecoration: 'none',
                              fontWeight: '600',
                            }}
                          >
                            View →
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                  {!notification.read && (
                    <div
                      style={{
                        position: 'absolute',
                        left: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: getNotificationColor(notification.type),
                      }}
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
