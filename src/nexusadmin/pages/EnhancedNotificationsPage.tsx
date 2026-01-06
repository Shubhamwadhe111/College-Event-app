import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Filter, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  XCircle,
  Clock,
  User,
  Calendar,
  Settings,
  Trash2,
  Mail,
  Send,
  Plus,
  Eye,
  Archive
} from 'lucide-react';

const EnhancedNotificationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'approval',
      title: 'New Event Approval Request',
      message: 'John Smith has submitted a new event "Tech Innovation Summit 2024" for approval.',
      timestamp: '2024-01-15T10:30:00Z',
      read: false,
      priority: 'high',
      sender: 'System',
      category: 'Event Management',
      actionRequired: true,
      relatedId: 'event_123'
    },
    {
      id: 2,
      type: 'update',
      title: 'Event Details Updated',
      message: 'Sarah Johnson has updated the details for "Cultural Fest - Spring Edition".',
      timestamp: '2024-01-15T09:15:00Z',
      read: false,
      priority: 'medium',
      sender: 'Sarah Johnson',
      category: 'Event Management',
      actionRequired: false,
      relatedId: 'event_124'
    },
    {
      id: 3,
      type: 'system',
      title: 'Monthly Report Generated',
      message: 'Your monthly analytics report for December 2023 is now available for download.',
      timestamp: '2024-01-15T08:00:00Z',
      read: true,
      priority: 'low',
      sender: 'System',
      category: 'Reports',
      actionRequired: false,
      relatedId: 'report_dec_2023'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Event Capacity Warning',
      message: 'The event "Career Development Workshop" is approaching full capacity (95% filled).',
      timestamp: '2024-01-14T16:45:00Z',
      read: true,
      priority: 'medium',
      sender: 'System',
      category: 'Event Management',
      actionRequired: true,
      relatedId: 'event_125'
    },
    {
      id: 5,
      type: 'success',
      title: 'Event Successfully Approved',
      message: 'The event "Student Leadership Summit" has been approved and is now live.',
      timestamp: '2024-01-14T14:20:00Z',
      read: true,
      priority: 'low',
      sender: 'System',
      category: 'Event Management',
      actionRequired: false,
      relatedId: 'event_126'
    },
    {
      id: 6,
      type: 'organizer',
      title: 'New Organizer Registration',
      message: 'Emily Davis has applied to become an event organizer and requires approval.',
      timestamp: '2024-01-14T11:30:00Z',
      read: false,
      priority: 'high',
      sender: 'System',
      category: 'User Management',
      actionRequired: true,
      relatedId: 'organizer_456'
    }
  ]);

  const tabs = [
    { id: 'all', label: 'All Notifications', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'action', label: 'Action Required', count: notifications.filter(n => n.actionRequired).length },
    { id: 'high', label: 'High Priority', count: notifications.filter(n => n.priority === 'high').length }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'approval': return <Clock size={20} className="text-yellow-400" />;
      case 'update': return <Info size={20} className="text-blue-400" />;
      case 'system': return <Settings size={20} className="text-gray-400" />;
      case 'warning': return <AlertCircle size={20} className="text-orange-400" />;
      case 'success': return <CheckCircle size={20} className="text-green-400" />;
      case 'organizer': return <User size={20} className="text-purple-400" />;
      default: return <Bell size={20} className="text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-900/10';
      case 'medium': return 'border-l-yellow-500 bg-yellow-900/10';
      case 'low': return 'border-l-green-500 bg-green-900/10';
      default: return 'border-l-gray-500 bg-gray-900/10';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'unread' && !notification.read) ||
                      (activeTab === 'action' && notification.actionRequired) ||
                      (activeTab === 'high' && notification.priority === 'high');
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleMarkAsRead = (notificationId: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true } 
        : notification
    ));
  };

  const handleMarkAsUnread = (notificationId: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: false } 
        : notification
    ));
  };

  const handleDelete = (notificationId: number) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  };

  const handleBulkAction = (action: string) => {
    if (action === 'markRead') {
      setNotifications(notifications.map(notification => 
        selectedNotifications.includes(notification.id) 
          ? { ...notification, read: true } 
          : notification
      ));
    } else if (action === 'delete') {
      setNotifications(notifications.filter(notification => 
        !selectedNotifications.includes(notification.id)
      ));
    }
    setSelectedNotifications([]);
  };

  const toggleSelectNotification = (notificationId: number) => {
    setSelectedNotifications(prev => 
      prev.includes(notificationId) 
        ? prev.filter(id => id !== notificationId)
        : [...prev, notificationId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Notifications Center</h1>
            <p className="text-gray-400">Stay updated with all college event activities</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus size={16} />
              Create Notification
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <Settings size={16} />
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Notifications</p>
              <p className="text-3xl font-bold text-white">{notifications.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Bell size={24} color="white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Unread</p>
              <p className="text-3xl font-bold text-white">{notifications.filter(n => !n.read).length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
              <Mail size={24} color="white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Action Required</p>
              <p className="text-3xl font-bold text-white">{notifications.filter(n => n.actionRequired).length}</p>
            </div>
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
              <AlertCircle size={24} color="white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">High Priority</p>
              <p className="text-3xl font-bold text-white">{notifications.filter(n => n.priority === 'high').length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <AlertCircle size={24} color="white" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-700">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.label}
                <span className="ml-2 bg-gray-700 text-gray-300 py-1 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Search and Bulk Actions */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
          <Filter size={16} />
          Filters
        </button>
        
        {selectedNotifications.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">{selectedNotifications.length} selected</span>
            <button 
              onClick={() => handleBulkAction('markRead')}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              Mark as Read
            </button>
            <button 
              onClick={() => handleBulkAction('delete')}
              className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`bg-gray-800 rounded-lg border-l-4 border border-gray-700 p-6 ${getPriorityColor(notification.priority)} ${!notification.read ? 'ring-1 ring-blue-500/20' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <input
                  type="checkbox"
                  checked={selectedNotifications.includes(notification.id)}
                  onChange={() => toggleSelectNotification(notification.id)}
                  className="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
                
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`text-lg font-semibold ${notification.read ? 'text-gray-300' : 'text-white'}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      )}
                      {notification.actionRequired && (
                        <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full">
                          Action Required
                        </span>
                      )}
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                        notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {notification.priority.toUpperCase()}
                      </span>
                    </div>
                    
                    <p className={`mb-3 ${notification.read ? 'text-gray-400' : 'text-gray-300'}`}>
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{notification.sender}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{formatTimestamp(notification.timestamp)}</span>
                      </div>
                      <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                        {notification.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <button 
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                  title="View Details"
                >
                  <Eye size={16} />
                </button>
                
                {notification.read ? (
                  <button 
                    onClick={() => handleMarkAsUnread(notification.id)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                    title="Mark as Unread"
                  >
                    <Mail size={16} />
                  </button>
                ) : (
                  <button 
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                    title="Mark as Read"
                  >
                    <CheckCircle size={16} />
                  </button>
                )}
                
                <button 
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                  title="Archive"
                >
                  <Archive size={16} />
                </button>
                
                <button 
                  onClick={() => handleDelete(notification.id)}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {notification.actionRequired && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Take Action
                  </button>
                  <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                    Remind Later
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <Bell size={48} className="mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-medium text-gray-400 mb-2">No notifications found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default EnhancedNotificationsPage;