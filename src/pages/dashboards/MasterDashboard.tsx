import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Globe, 
  Database, 
  Shield, 
  Activity, 
  TrendingUp, 
  Users, 
  Calendar, 
  Server,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Settings,
  Monitor
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MasterDashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data for master admin dashboard
  const systemStats = {
    totalColleges: 15,
    totalAdmins: 45,
    totalEvents: 1250,
    totalUsers: 25000,
    systemUptime: '99.9%',
    activeConnections: 1847,
    dataStorage: '2.4 TB',
    monthlyGrowth: '+12%'
  };

  const collegeStats = [
    { name: 'MIT College', events: 85, users: 2500, status: 'active', growth: '+8%' },
    { name: 'Stanford University', events: 120, users: 3200, status: 'active', growth: '+15%' },
    { name: 'Harvard College', events: 95, users: 2800, status: 'active', growth: '+5%' },
    { name: 'Berkeley Institute', events: 78, users: 2100, status: 'maintenance', growth: '+3%' }
  ];

  const systemAlerts = [
    { type: 'warning', message: 'High server load detected on Server-03', time: '5 min ago' },
    { type: 'info', message: 'Database backup completed successfully', time: '1 hour ago' },
    { type: 'success', message: 'New college "Tech Institute" added to system', time: '2 hours ago' },
    { type: 'error', message: 'Failed login attempts from IP 192.168.1.100', time: '3 hours ago' }
  ];

  const recentActivity = [
    { action: 'New admin registered for "City College"', time: '10 min ago', type: 'admin' },
    { action: 'System backup initiated', time: '30 min ago', type: 'system' },
    { action: 'Global analytics report generated', time: '1 hour ago', type: 'report' },
    { action: 'Security scan completed - No threats found', time: '2 hours ago', type: 'security' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Master Control Dashboard</h1>
        <p className="text-purple-100">
          Welcome back, {user?.name}! You have complete control over the entire event management ecosystem.
        </p>
      </div>

      {/* System Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center">
            <Globe className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Colleges</p>
              <p className="text-2xl font-bold text-white">{systemStats.totalColleges}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Admins</p>
              <p className="text-2xl font-bold text-white">{systemStats.totalAdmins}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Global Events</p>
              <p className="text-2xl font-bold text-white">{systemStats.totalEvents}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-white">{systemStats.totalUsers.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Health & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-4">System Health</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Server className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-300">System Uptime</span>
              </div>
              <span className="text-green-400 font-semibold">{systemStats.systemUptime}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Activity className="w-5 h-5 text-blue-500 mr-3" />
                <span className="text-gray-300">Active Connections</span>
              </div>
              <span className="text-white font-semibold">{systemStats.activeConnections}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Database className="w-5 h-5 text-purple-500 mr-3" />
                <span className="text-gray-300">Data Storage</span>
              </div>
              <span className="text-white font-semibold">{systemStats.dataStorage}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-300">Monthly Growth</span>
              </div>
              <span className="text-green-400 font-semibold">{systemStats.monthlyGrowth}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-4">Master Controls</h2>
          <div className="space-y-3">
            <Link
              to="/nexussuper/system"
              className="flex items-center justify-between p-3 bg-red-600 bg-opacity-20 border border-red-600 rounded-lg hover:bg-opacity-30 transition-all duration-200"
            >
              <div className="flex items-center">
                <Database className="w-5 h-5 text-red-500 mr-3" />
                <span className="text-white">System Control</span>
              </div>
            </Link>
            
            <Link
              to="/nexussuper/analytics"
              className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              <div className="flex items-center">
                <BarChart3 className="w-5 h-5 text-purple-500 mr-3" />
                <span className="text-white">Global Analytics</span>
              </div>
            </Link>
            
            <Link
              to="/nexussuper/colleges"
              className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              <div className="flex items-center">
                <Globe className="w-5 h-5 text-blue-500 mr-3" />
                <span className="text-white">Manage Colleges</span>
              </div>
            </Link>
            
            <Link
              to="/nexussuper/users"
              className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-white">Master Users</span>
              </div>
            </Link>
            
            <Link
              to="/nexussuper/settings"
              className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              <div className="flex items-center">
                <Settings className="w-5 h-5 text-yellow-500 mr-3" />
                <span className="text-white">System Settings</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* College Overview */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-lg font-semibold text-white mb-4">College Overview</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 font-medium py-2">College</th>
                <th className="text-left text-gray-400 font-medium py-2">Events</th>
                <th className="text-left text-gray-400 font-medium py-2">Users</th>
                <th className="text-left text-gray-400 font-medium py-2">Status</th>
                <th className="text-left text-gray-400 font-medium py-2">Growth</th>
              </tr>
            </thead>
            <tbody>
              {collegeStats.map((college, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-3 text-white">{college.name}</td>
                  <td className="py-3 text-gray-300">{college.events}</td>
                  <td className="py-3 text-gray-300">{college.users.toLocaleString()}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      college.status === 'active' 
                        ? 'bg-green-600 text-green-100' 
                        : 'bg-yellow-600 text-yellow-100'
                    }`}>
                      {college.status}
                    </span>
                  </td>
                  <td className="py-3 text-green-400">{college.growth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Alerts & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Alerts */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-4">System Alerts</h2>
          <div className="space-y-3">
            {systemAlerts.map((alert, index) => (
              <div key={index} className="flex items-start p-3 bg-gray-700 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                  alert.type === 'error' ? 'bg-red-500' :
                  alert.type === 'warning' ? 'bg-yellow-500' :
                  alert.type === 'success' ? 'bg-green-500' :
                  'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-white text-sm">{alert.message}</p>
                  <p className="text-gray-400 text-xs">{alert.time}</p>
                </div>
                {alert.type === 'error' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                {alert.type === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                {alert.type === 'warning' && <Clock className="w-4 h-4 text-yellow-500" />}
                {alert.type === 'info' && <Monitor className="w-4 h-4 text-blue-500" />}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-700 rounded-lg">
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  activity.type === 'admin' ? 'bg-blue-500' :
                  activity.type === 'system' ? 'bg-purple-500' :
                  activity.type === 'report' ? 'bg-green-500' :
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

export default MasterDashboard;