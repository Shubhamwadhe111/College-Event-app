import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Event } from '../../types';
import { Shield, Users, Calendar, Building2, Crown, TrendingUp, Activity, Database } from 'lucide-react';
import { toast } from 'react-toastify';

const NexusadminSuperAdminPanel: React.FC = () => {
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
    <div className="min-h-screen bg-gray-900">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Nexusadmin Super Control</h1>
              <p className="text-gray-400 mt-1">Ultimate system administration and oversight</p>
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
                  ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
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
              <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-xl bg-gradient-to-br from-blue-600/20 to-blue-700/20 border-blue-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-300 text-sm font-medium">Total Users</p>
                    <p className="text-4xl font-bold text-white mt-2">{users.length}</p>
                  </div>
                  <Users className="w-16 h-16 text-blue-400 opacity-50" />
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-xl bg-gradient-to-br from-emerald-600/20 to-emerald-700/20 border-emerald-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-300 text-sm font-medium">College Admins</p>
                    <p className="text-4xl font-bold text-white mt-2">{admins.length}</p>
                  </div>
                  <Building2 className="w-16 h-16 text-emerald-400 opacity-50" />
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-xl bg-gradient-to-br from-purple-600/20 to-purple-700/20 border-purple-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm font-medium">Total Events</p>
                    <p className="text-4xl font-bold text-white mt-2">{events.length}</p>
                  </div>
                  <Calendar className="w-16 h-16 text-purple-400 opacity-50" />
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-xl bg-gradient-to-br from-orange-600/20 to-orange-700/20 border-orange-500/30">
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
              <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-emerald-400" />
                  System Health
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-700 border border-gray-600 rounded-xl">
                    <span className="text-gray-300">Database Status</span>
                    <span className="text-emerald-400 font-semibold">✓ Online</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700 border border-gray-600 rounded-xl">
                    <span className="text-gray-300">Total Storage</span>
                    <span className="text-blue-400 font-semibold">{(JSON.stringify(users).length + JSON.stringify(events).length) / 1024} KB</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700 border border-gray-600 rounded-xl">
                    <span className="text-gray-300">Active Sessions</span>
                    <span className="text-purple-400 font-semibold">{localStorage.getItem('currentUser') ? '1' : '0'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                  Quick Stats
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-700 border border-gray-600 rounded-xl">
                    <span className="text-gray-300">Students</span>
                    <span className="text-blue-400 font-semibold">{students.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700 border border-gray-600 rounded-xl">
                    <span className="text-gray-300">Approved Organizers</span>
                    <span className="text-emerald-400 font-semibold">{organizers.filter(o => o.isApproved).length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700 border border-gray-600 rounded-xl">
                    <span className="text-gray-300">Pending Approvals</span>
                    <span className="text-yellow-400 font-semibold">{organizers.filter(o => !o.isApproved).length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6">All Users</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-yellow-500/20">
                    <th className="text-left py-4 px-4 text-yellow-400 font-semibold">Name</th>
                    <th className="text-left py-4 px-4 text-yellow-400 font-semibold">Email</th>
                    <th className="text-left py-4 px-4 text-yellow-400 font-semibold">Role</th>
                    <th className="text-left py-4 px-4 text-yellow-400 font-semibold">Status</th>
                    <th className="text-left py-4 px-4 text-yellow-400 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b border-gray-700/50 hover:bg-yellow-500/5">
                      <td className="py-4 px-4 text-white font-medium">{u.name}</td>
                      <td className="py-4 px-4 text-gray-300">{u.email}</td>
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

        {/* Admins Tab */}
        {activeTab === 'admins' && (
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6">College Administrators</h2>
            {admins.length === 0 ? (
              <p className="text-center text-gray-400 py-12">No college admins yet</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {admins.map(admin => (
                  <div key={admin.id} className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white">{admin.name}</h3>
                        <p className="text-gray-400 text-sm mt-1">{admin.email}</p>
                        <p className="text-gray-500 text-xs mt-1">College: {admin.college || 'Not specified'}</p>
                      </div>
                      <button
                        onClick={() => removeAdmin(admin.id)}
                        className="text-red-400 hover:text-red-300 px-3 py-1 hover:bg-red-500/10 rounded text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6">All Events</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-yellow-500/20">
                    <th className="text-left py-4 px-4 text-yellow-400 font-semibold">Event</th>
                    <th className="text-left py-4 px-4 text-yellow-400 font-semibold">Organizer</th>
                    <th className="text-left py-4 px-4 text-yellow-400 font-semibold">Date</th>
                    <th className="text-left py-4 px-4 text-yellow-400 font-semibold">Registered</th>
                    <th className="text-left py-4 px-4 text-yellow-400 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(event => (
                    <tr key={event.id} className="border-b border-gray-700/50 hover:bg-yellow-500/5">
                      <td className="py-4 px-4 text-white font-medium">{event.title}</td>
                      <td className="py-4 px-4 text-gray-300">{event.organizer}</td>
                      <td className="py-4 px-4 text-gray-300">{event.date}</td>
                      <td className="py-4 px-4 text-gray-300">{event.registered}/{event.capacity}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          event.status === 'upcoming' ? 'bg-emerald-500/20 text-emerald-300' :
                          event.status === 'ongoing' ? 'bg-blue-500/20 text-blue-300' :
                          'bg-gray-500/20 text-gray-300'
                        }`}>
                          {event.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Database className="w-6 h-6 text-yellow-400" />
                System Analytics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-700 border border-gray-600 rounded-xl">
                  <p className="text-gray-400 text-sm">User Growth</p>
                  <p className="text-3xl font-bold text-white mt-2">{users.length}</p>
                  <p className="text-emerald-400 text-xs mt-1">+{users.filter(u => {
                    const created = new Date(u.createdAt);
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return created > weekAgo;
                  }).length} this week</p>
                </div>
                <div className="p-4 bg-gray-700 border border-gray-600 rounded-xl">
                  <p className="text-gray-400 text-sm">Event Creation</p>
                  <p className="text-3xl font-bold text-white mt-2">{events.length}</p>
                  <p className="text-blue-400 text-xs mt-1">Total events created</p>
                </div>
                <div className="p-4 bg-gray-700 border border-gray-600 rounded-xl">
                  <p className="text-gray-400 text-sm">Total Registrations</p>
                  <p className="text-3xl font-bold text-white mt-2">{events.reduce((sum, e) => sum + e.registered, 0)}</p>
                  <p className="text-purple-400 text-xs mt-1">Across all events</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NexusadminSuperAdminPanel;