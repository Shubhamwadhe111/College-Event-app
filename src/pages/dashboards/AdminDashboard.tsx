import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useEvents } from '../../contexts/EventContext';
import { 
  Calendar, 
  Users, 
  FileText, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  BarChart3,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { events } = useEvents();

  // Mock data for admin dashboard
  const stats = {
    totalEvents: events.length,
    pendingApprovals: 8,
    activeOrganizers: 25,
    totalStudents: 1250,
    thisMonthEvents: 12,
    approvedEvents: events.length - 3,
    rejectedEvents: 3
  };

  const pendingApprovals = [
    { id: 1, title: 'Tech Innovation Summit', organizer: 'John Doe', date: '2024-02-15', type: 'Technical' },
    { id: 2, title: 'Cultural Night 2024', organizer: 'Jane Smith', date: '2024-02-20', type: 'Cultural' },
    { id: 3, title: 'Sports Championship', organizer: 'Mike Johnson', date: '2024-02-25', type: 'Sports' }
  ];

  const recentActivity = [
    { action: 'Approved event "AI Workshop"', time: '2 hours ago', type: 'approval' },
    { action: 'New organizer registration from Sarah Wilson', time: '4 hours ago', type: 'registration' },
    { action: 'Rejected event "Unauthorized Party"', time: '1 day ago', type: 'rejection' },
    { action: 'Event "Data Science Bootcamp" completed', time: '2 days ago', type: 'completion' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-blue-100">
          Welcome back, {user?.name}! Manage your college events and oversee organizer activities.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Events</p>
              <p className="text-2xl font-bold text-white">{stats.totalEvents}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Pending Approvals</p>
              <p className="text-2xl font-bold text-white">{stats.pendingApprovals}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Active Organizers</p>
              <p className="text-2xl font-bold text-white">{stats.activeOrganizers}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Students</p>
              <p className="text-2xl font-bold text-white">{stats.totalStudents}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions & Pending Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/nexusadmin/approvals"
              className="flex items-center justify-between p-3 bg-yellow-600 bg-opacity-20 border border-yellow-600 rounded-lg hover:bg-opacity-30 transition-all duration-200"
            >
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-yellow-500 mr-3" />
                <span className="text-white">Review Approvals</span>
                <span className="ml-2 bg-yellow-600 text-white text-xs px-2 py-1 rounded-full">
                  {stats.pendingApprovals}
                </span>
              </div>
            </Link>
            
            <Link
              to="/nexusadmin/events"
              className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-blue-500 mr-3" />
                <span className="text-white">Manage Events</span>
              </div>
            </Link>
            
            <Link
              to="/nexusadmin/organizers"
              className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              <div className="flex items-center">
                <Users className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-white">Manage Organizers</span>
              </div>
            </Link>
            
            <Link
              to="/nexusadmin/analytics"
              className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              <div className="flex items-center">
                <BarChart3 className="w-5 h-5 text-purple-500 mr-3" />
                <span className="text-white">View Analytics</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-4">Pending Approvals</h2>
          <div className="space-y-3">
            {pendingApprovals.map((approval) => (
              <div key={approval.id} className="p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-white">{approval.title}</h3>
                  <span className="text-xs bg-yellow-600 text-white px-2 py-1 rounded-full">
                    {approval.type}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-2">by {approval.organizer}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(approval.date).toLocaleDateString()}
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-green-500 hover:text-green-400">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button className="text-red-500 hover:text-red-400">
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/nexusadmin/approvals"
            className="block text-center text-blue-400 hover:text-blue-300 mt-4 text-sm"
          >
            View all pending approvals →
          </Link>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Event Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-gray-300">Approved</span>
              </div>
              <span className="text-white font-semibold">{stats.approvedEvents}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-gray-300">Pending</span>
              </div>
              <span className="text-white font-semibold">{stats.pendingApprovals}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <XCircle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-gray-300">Rejected</span>
              </div>
              <span className="text-white font-semibold">{stats.rejectedEvents}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-700 rounded-lg">
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  activity.type === 'approval' ? 'bg-green-500' :
                  activity.type === 'rejection' ? 'bg-red-500' :
                  activity.type === 'registration' ? 'bg-blue-500' :
                  'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.action}</p>
                  <p className="text-gray-400 text-xs">{activity.time}</p>
                </div>
                <Activity className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;