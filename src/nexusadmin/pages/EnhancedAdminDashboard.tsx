import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  TrendingUp,
  BarChart3,
  Activity,
  Eye,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import PortalLink from '../../components/PortalLink';

const EnhancedAdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const stats = {
    totalEvents: 156,
    pendingApprovals: 12,
    upcomingEvents: 8,
    activeOrganizers: 24,
    totalParticipants: 2847,
    thisMonthEvents: 23,
    approvedEvents: 134,
    rejectedEvents: 10
  };

  const recentEvents = [
    {
      id: 1,
      title: 'Tech Innovation Summit 2024',
      organizer: 'John Smith',
      date: '2024-01-15',
      status: 'pending',
      participants: 150
    },
    {
      id: 2,
      title: 'Cultural Fest - Spring Edition',
      organizer: 'Sarah Johnson',
      date: '2024-01-20',
      status: 'approved',
      participants: 300
    },
    {
      id: 3,
      title: 'Career Development Workshop',
      organizer: 'Mike Wilson',
      date: '2024-01-18',
      status: 'pending',
      participants: 75
    }
  ];

  const [notifications] = useState([
    {
      id: 1,
      type: 'approval',
      message: 'New event request from John Smith',
      time: '5 minutes ago',
      unread: true
    },
    {
      id: 2,
      type: 'update',
      message: 'Cultural Fest details updated',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      type: 'system',
      message: 'Monthly report generated',
      time: '2 hours ago',
      unread: false
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle size={16} />;
      case 'pending': return <Clock size={16} />;
      case 'rejected': return <XCircle size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-400">
              Here's what's happening in your college today
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <RefreshCw size={16} />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download size={16} />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Events</p>
              <p className="text-3xl font-bold text-white">{stats.totalEvents}</p>
              <p className="text-green-400 text-sm flex items-center gap-1 mt-1">
                <TrendingUp size={12} />
                +12% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Calendar size={24} color="white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pending Approvals</p>
              <p className="text-3xl font-bold text-white">{stats.pendingApprovals}</p>
              <p className="text-yellow-400 text-sm flex items-center gap-1 mt-1">
                <AlertCircle size={12} />
                Needs attention
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
              <Clock size={24} color="white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div>
            <p className="text-gray-400 text-sm">Active Organizers</p>
            <p className="text-3xl font-bold text-white">{stats.activeOrganizers}</p>
            <p className="text-green-400 text-sm flex items-center gap-1 mt-1">
              <Users size={12} />
              +3 new this week
            </p>
          </div>
          <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
            <Users size={24} color="white" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Participants</p>
              <p className="text-3xl font-bold text-white">{stats.totalParticipants.toLocaleString()}</p>
              <p className="text-green-400 text-sm flex items-center gap-1 mt-1">
                <Activity size={12} />
                +8% engagement
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <BarChart3 size={24} color="white" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Events */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Events</h2>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                <Filter size={14} />
                Filter
              </button>
              <PortalLink 
                to="/events"
                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Eye size={14} />
                View All
              </PortalLink>
            </div>
          </div>

          <div className="space-y-4">
            {recentEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getStatusColor(event.status) }}
                  />
                  <div>
                    <h3 className="text-white font-medium">{event.title}</h3>
                    <p className="text-gray-400 text-sm">
                      by {event.organizer} • {event.date} • {event.participants} participants
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span 
                    className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: `${getStatusColor(event.status)}20`,
                      color: getStatusColor(event.status)
                    }}
                  >
                    {getStatusIcon(event.status)}
                    {event.status}
                  </span>
                  {event.status === 'pending' && (
                    <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors">
                      Review
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications & Quick Actions */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Notifications</h2>
              <PortalLink 
                to="/notifications"
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                View All
              </PortalLink>
            </div>

            <div className="space-y-3">
              {notifications.slice(0, 3).map((notification) => (
                <div key={notification.id} className="flex items-start gap-3 p-3 bg-gray-700 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-blue-500' : 'bg-gray-500'}`} />
                  <div className="flex-1">
                    <p className="text-white text-sm">{notification.message}</p>
                    <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
            
            <div className="space-y-3">
              <PortalLink 
                to="/approvals"
                className="flex items-center gap-3 p-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
              >
                <Clock size={20} color="white" />
                <div>
                  <p className="text-white font-medium">Review Approvals</p>
                  <p className="text-yellow-100 text-sm">{stats.pendingApprovals} pending</p>
                </div>
              </PortalLink>

              <PortalLink 
                to="/organizers"
                className="flex items-center gap-3 p-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                <Users size={20} color="white" />
                <div>
                  <p className="text-white font-medium">Manage Organizers</p>
                  <p className="text-green-100 text-sm">{stats.activeOrganizers} active</p>
                </div>
              </PortalLink>

              <PortalLink 
                to="/analytics"
                className="flex items-center gap-3 p-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                <BarChart3 size={20} color="white" />
                <div>
                  <p className="text-white font-medium">View Analytics</p>
                  <p className="text-purple-100 text-sm">Monthly reports</p>
                </div>
              </PortalLink>
            </div>
          </div>
        </div>
      </div>

      {/* Event Status Overview */}
      <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-6">Event Status Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle size={32} color="white" />
            </div>
            <p className="text-2xl font-bold text-white">{stats.approvedEvents}</p>
            <p className="text-gray-400">Approved Events</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock size={32} color="white" />
            </div>
            <p className="text-2xl font-bold text-white">{stats.pendingApprovals}</p>
            <p className="text-gray-400">Pending Approval</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <XCircle size={32} color="white" />
            </div>
            <p className="text-2xl font-bold text-white">{stats.rejectedEvents}</p>
            <p className="text-gray-400">Rejected Events</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAdminDashboard;