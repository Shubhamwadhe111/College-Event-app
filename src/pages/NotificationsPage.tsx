import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Bell, Check, Trash2, Calendar, User, AlertCircle, CheckCircle, Info, Settings } from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'event' | 'approval' | 'reminder' | 'system' | 'registration';
  isRead: boolean;
  timestamp: string;
  actionUrl?: string;
  metadata?: {
    eventId?: number;
    eventTitle?: string;
    status?: string;
  };
}

const NotificationsPage: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  useEffect(() => {
    // Simulate loading notifications
    const loadNotifications = async () => {
      setLoading(true);
      
      // Mock data - in real app, this would come from API
      const mockNotifications: Notification[] = [
        {
          id: 1,
          title: "Event Registration Confirmed",
          message: "Your registration for 'Tech Innovation Summit 2024' has been confirmed. Event starts on February 15, 2024 at 9:00 AM.",
          type: 'registration',
          isRead: false,
          timestamp: '2024-02-10T10:30:00Z',
          actionUrl: '/events/1',
          metadata: {
            eventId: 1,
            eventTitle: 'Tech Innovation Summit 2024',
            status: 'confirmed'
          }
        },
        {
          id: 2,
          title: "Event Approved",
          message: "Your event 'Photography Workshop' has been approved by the admin. It will be visible to students for registration.",
          type: 'approval',
          isRead: false,
          timestamp: '2024-02-09T14:15:00Z',
          actionUrl: '/my-events',
          metadata: {
            eventId: 3,
            eventTitle: 'Photography Workshop',
            status: 'approved'
          }
        },
        {
          id: 3,
          title: "Event Reminder",
          message: "Don't forget! 'Cultural Fest - Rangoli Competition' is tomorrow at 2:00 PM in Central Courtyard.",
          type: 'reminder',
          isRead: true,
          timestamp: '2024-02-08T09:00:00Z',
          actionUrl: '/events/2',
          metadata: {
            eventId: 2,
            eventTitle: 'Cultural Fest - Rangoli Competition'
          }
        },
        {
          id: 4,
          title: "System Maintenance Notice",
          message: "The system will undergo maintenance on February 12, 2024 from 2:00 AM to 6:00 AM. Some features may be temporarily unavailable.",
          type: 'system',
          isRead: true,
          timestamp: '2024-02-07T16:45:00Z'
        },
        {
          id: 5,
          title: "New Event Available",
          message: "A new event 'Guest Lecture on AI' has been posted. Check it out and register if interested!",
          type: 'event',
          isRead: true,
          timestamp: '2024-02-06T11:20:00Z',
          actionUrl: '/events/6'
        },
        {
          id: 6,
          title: "Event Pending Approval",
          message: "Your event 'Coding Bootcamp' is pending admin approval. You will be notified once it's reviewed.",
          type: 'approval',
          isRead: true,
          timestamp: '2024-02-05T13:30:00Z',
          actionUrl: '/my-events',
          metadata: {
            eventId: 4,
            eventTitle: 'Coding Bootcamp',
            status: 'pending'
          }
        }
      ];

      setNotifications(mockNotifications);
      setLoading(false);
    };

    loadNotifications();
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <Calendar className="text-blue-400" size={20} />;
      case 'approval':
        return <CheckCircle className="text-green-400" size={20} />;
      case 'reminder':
        return <Bell className="text-yellow-400" size={20} />;
      case 'system':
        return <Settings className="text-gray-400" size={20} />;
      case 'registration':
        return <User className="text-emerald-400" size={20} />;
      default:
        return <Info className="text-gray-400" size={20} />;
    }
  };

  const getNotificationTypeColor = (type: string) => {
    switch (type) {
      case 'event':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'approval':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'reminder':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'system':
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      case 'registration':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'read') return notification.isRead;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Notifications
              </h1>
              <p className="text-gray-300 text-lg">
                Stay updated with your personal notifications and updates
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="btn btn-secondary"
              >
                <Check size={16} />
                Mark All Read
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Bell className="text-emerald-400" size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{notifications.length}</div>
                <div className="text-sm text-gray-400">Total Notifications</div>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <AlertCircle className="text-yellow-400" size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{unreadCount}</div>
                <div className="text-sm text-gray-400">Unread</div>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle className="text-green-400" size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{notifications.length - unreadCount}</div>
                <div className="text-sm text-gray-400">Read</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex gap-2 bg-gray-800/50 p-2 rounded-lg backdrop-blur-sm border border-gray-700/50">
            {[
              { key: 'all', label: 'All' },
              { key: 'unread', label: `Unread (${unreadCount})` },
              { key: 'read', label: 'Read' }
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key as any)}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  filter === filterOption.key
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-20">
              <Bell size={64} className="mx-auto text-gray-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No notifications found
              </h3>
              <p className="text-gray-500">
                {filter === 'unread' 
                  ? "You're all caught up! No unread notifications."
                  : filter === 'read'
                  ? "No read notifications."
                  : "You don't have any notifications yet."
                }
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`card hover:scale-[1.02] transition-all duration-300 ${
                  !notification.isRead ? 'border-l-4 border-emerald-500 bg-emerald-500/5' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`text-lg font-semibold ${
                            !notification.isRead ? 'text-white' : 'text-gray-300'
                          }`}>
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-gray-300 mb-3 leading-relaxed">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>{formatTimestamp(notification.timestamp)}</span>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getNotificationTypeColor(notification.type)}`}>
                            {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 ml-4">
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 text-gray-400 hover:text-emerald-400 transition-colors"
                          title="Mark as read"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                        title="Delete notification"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Action Link */}
                  {notification.actionUrl && (
                    <div className="mt-4 pt-4 border-t border-gray-700/50">
                      <a 
                        href={notification.actionUrl}
                        className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                      >
                        View Details →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;