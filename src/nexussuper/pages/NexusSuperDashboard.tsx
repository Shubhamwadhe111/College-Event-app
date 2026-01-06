import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Event } from '../../types';
import { Crown, Users, Calendar, Building2, Zap, TrendingUp, Activity, Database, Shield } from 'lucide-react';
import { toast } from 'react-toastify';

const NexusSuperDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'admins' | 'events' | 'analytics'>('overview');

  useEffect(() => {
    if (!user || user.role !== 'master') {
      navigate('/login');
      toast.error('Master Admin access required');
      return;
    }
    loadData();
  }, [user, navigate]);

  const loadData = () => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
      setUsers(storedUsers);
      setEvents(storedEvents);
    } catch (error) {
      console.error("Failed to parse data from localStorage", error);
      toast.error("Failed to load data. It might be corrupted.");
      setUsers([]);
      setEvents([]);
    }
  };

  const makeAdmin = (userId: string) => {
    if (window.confirm('Make this user a College Admin?')) {
      const updated = users.map(u =>
        u.id === userId ? { ...u, role: 'admin' as const } : u
      );
      setUsers(updated);
      localStorage.setItem('users', JSON.stringify(updated));
      toast.success('User promoted to Admin');
    }
  };

  const removeAdmin = (userId: string) => {
    if (window.confirm('Remove admin privileges from this user?')) {
      const updated = users.map(u =>
        u.id === userId ? { ...u, role: 'student' as const } : u
      );
      setUsers(updated);
      localStorage.setItem('users', JSON.stringify(updated));
      toast.success('Admin privileges removed');
    }
  };

  const deleteUser = (userId: string) => {
    if (window.confirm('Permanently delete this user?')) {
      const updated = users.filter(u => u.id !== userId);
      setUsers(updated);
      localStorage.setItem('users', JSON.stringify(updated));
      toast.success('User deleted');
    }
  };

  const students = users.filter(u => u.role === 'student');
  const organizers = users.filter(u => u.role === 'organizer');
  const admins = users.filter(u => u.role === 'admin');

  return (
    <div className="min-h-screen">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center relative">
              <Crown className="w-8 h-8 text-white" />
              <Zap className="w-4 h-4 text-yellow-200 absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">NexusSuper Command Center</h1>
              <p className="text-yellow-200 mt-1">Ultimate system control and oversight</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {['overview', 'users', 'admins', 'events', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all capitalize ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                  : 'bg-yellow-800/30 text-yellow-200 hover:bg-yellow-700/50 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/20 border border-blue-500/30 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-300 text-sm font-medium">Total Users</p>
                    <p className="text-4xl font-bold text-white mt-2">{users.length}</p>
                  </div>
                  <Users className="w-16 h-16 text-blue-400 opacity-50" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-700/20 border border-emerald-500/30 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-300 text-sm font-medium">College Admins</p>
                    <p className="text-4xl font-bold text-white mt-2">{admins.length}</p>
                  </div>
                  <Building2 className="w-16 h-16 text-emerald-400 opacity-50" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-600/20 to-purple-700/20 border border-purple-500/30 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm font-medium">Total Events</p>
                    <p className="text-4xl font-bold text-white mt-2">{events.length}</p>
                  </div>
                  <Calendar className="w-16 h-16 text-purple-400 opacity-50" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-600/20 to-orange-700/20 border border-orange-500/30 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-300 text-sm font-medium">Organizers</p>
                    <p className="text-4xl font-bold text-white mt-2">{organizers.length}</p>
                  </div>
                  <Shield className="w-16 h-16 text-orange-400 opacity-50" />
                </div>
              </div>
            </div>

            {/* System Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-yellow-800/30 to-orange-800/30 border border-yellow-600/30 rounded-2xl p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-yellow-400" />
                  System Health
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-yellow-700/20 border border-yellow-600/30 rounded-xl">
                    <span className="text-yellow-200">Database Status</span>
                    <span className="text-emerald-400 font-semibold">✓ Online</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-700/20 border border-yellow-600/30 rounded-xl">
                    <span className="text-yellow-200">Total Storage</span>
                    <span className="text-blue-400 font-semibold">{(JSON.stringify(users).length + JSON.stringify(events).length) / 1024} KB</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-700/20 border border-yellow-600/30 rounded-xl">
                    <span className="text-yellow-200">Active Sessions</span>
                    <span className="text-purple-400 font-semibold">{localStorage.getItem('currentUser') ? '1' : '0'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-800/30 to-orange-800/30 border border-yellow-600/30 rounded-2xl p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-orange-400" />
                  Quick Stats
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-orange-700/20 border border-orange-600/30 rounded-xl">
                    <span className="text-orange-200">Students</span>
                    <span className="text-blue-400 font-semibold">{students.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-700/20 border border-orange-600/30 rounded-xl">
                    <span className="text-orange-200">Approved Organizers</span>
                    <span className="text-emerald-400 font-semibold">{organizers.filter(o => o.isApproved).length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-700/20 border border-orange-600/30 rounded-xl">
                    <span className="text-orange-200">Pending Approvals</span>
                    <span className="text-yellow-400 font-semibold">{organizers.filter(o => !o.isApproved).length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-gradient-to-br from-yellow-800/30 to-orange-800/30 border border-yellow-600/30 rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6">All Users</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-yellow-500/20">
                    <th className="text-left py-4 px-4 text-yellow-300 font-semibold">Name</th>
                    <th className="text-left py-4 px-4 text-yellow-300 font-semibold">Email</th>
                    <th className="text-left py-4 px-4 text-yellow-300 font-semibold">Role</th>
                    <th className="text-left py-4 px-4 text-yellow-300 font-semibold">Status</th>
                    <th className="text-left py-4 px-4 text-yellow-300 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b border-yellow-700/30 hover:bg-yellow-500/10">
                      <td className="py-4 px-4 text-white font-medium">{u.name}</td>
                      <td className="py-4 px-4 text-yellow-200">{u.email}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          u.role === 'master' ? 'bg-yellow-500/20 text-yellow-300' :
                          u.role === 'admin' ? 'bg-purple-500/20 text-purple-300' :
                          u.role === 'organizer' ? 'bg-emerald-500/20 text-emerald-300' :
                          'bg-blue-500/20 text-blue-300'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {u.role === 'organizer' && (
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            u.isApproved ? 'bg-emerald-500/20 text-emerald-300' : 'bg-yellow-500/20 text-yellow-300'
                          }`}>
                            {u.isApproved ? 'Approved' : 'Pending'}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          {u.role !== 'master' && u.role !== 'admin' && (
                            <button
                              onClick={() => makeAdmin(u.id)}
                              className="text-purple-400 hover:text-purple-300 px-3 py-1 hover:bg-purple-500/10 rounded text-sm"
                            >
                              Make Admin
                            </button>
                          )}
                          {u.role === 'admin' && (
                            <button
                              onClick={() => removeAdmin(u.id)}
                              className="text-yellow-400 hover:text-yellow-300 px-3 py-1 hover:bg-yellow-500/10 rounded text-sm"
                            >
                              Remove Admin
                            </button>
                          )}
                          {u.role !== 'master' && (
                            <button
                              onClick={() => deleteUser(u.id)}
                              className="text-red-400 hover:text-red-300 px-3 py-1 hover:bg-red-500/10 rounded text-sm"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Other tabs similar to above but with NexusSuper styling */}
      </div>
    </div>
  );
};

export default NexusSuperDashboard;