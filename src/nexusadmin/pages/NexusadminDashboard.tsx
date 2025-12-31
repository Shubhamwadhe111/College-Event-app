import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Event } from '../../types';
import { Shield, Users, Calendar, CheckCircle, XCircle, TrendingUp, Activity } from 'lucide-react';
import { toast } from 'react-toastify';
import { adminAPI } from '../../services/api';

const NexusadminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [usersData, eventsData] = await Promise.all([
        adminAPI.getUsers(),
        adminAPI.getEvents(),
      ]);
      setUsers(usersData);
      setEvents(eventsData);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const approveOrganizer = async (organizerId: string, approve: boolean) => {
    try {
      const action = approve ? 'approve' : 'reject';
      if (user) {
        await adminAPI.approveOrganizer(parseInt(organizerId), action, parseInt(user.id));
        toast.success(`Organizer ${action}d successfully`);
        loadData();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update organizer status');
    }
  };

  const students = users.filter(u => u.role === 'student');
  const organizers = users.filter(u => u.role === 'organizer');
  const pendingOrganizers = organizers.filter(o => o.approvalStatus === 'pending');
  const approvedOrganizers = organizers.filter(o => o.approvalStatus === 'approved');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to Nexusadmin</h1>
        <p className="text-purple-100">
          Administrative control center for {user?.name}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Students</p>
              <p className="text-3xl font-bold text-white mt-2">{students.length}</p>
            </div>
            <Users className="w-12 h-12 text-blue-400 opacity-60" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Organizers</p>
              <p className="text-3xl font-bold text-white mt-2">{organizers.length}</p>
              <p className="text-gray-500 text-xs mt-1">{pendingOrganizers.length} pending</p>
            </div>
            <Shield className="w-12 h-12 text-purple-400 opacity-60" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Events</p>
              <p className="text-3xl font-bold text-white mt-2">{events.length}</p>
            </div>
            <Calendar className="w-12 h-12 text-green-400 opacity-60" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">System Health</p>
              <p className="text-3xl font-bold text-green-400 mt-2">100%</p>
            </div>
            <Activity className="w-12 h-12 text-green-400 opacity-60" />
          </div>
        </div>
      </div>

      {/* Pending Approvals */}
      {pendingOrganizers.length > 0 && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-yellow-400" />
            Pending Organizer Approvals ({pendingOrganizers.length})
          </h2>
          <div className="space-y-3">
            {pendingOrganizers.map(org => (
              <div key={org.id} className="flex items-center justify-between p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                <div>
                  <p className="font-semibold text-white text-lg">{org.name}</p>
                  <p className="text-sm text-gray-400">{org.email}</p>
                  <p className="text-xs text-gray-500 mt-1">ID: {org.studentId}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => approveOrganizer(org.id, true)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => approveOrganizer(org.id, false)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            Quick Stats
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
              <span className="text-gray-300">Approved Organizers</span>
              <span className="text-green-400 font-semibold">{approvedOrganizers.length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
              <span className="text-gray-300">Pending Approvals</span>
              <span className="text-yellow-400 font-semibold">{pendingOrganizers.length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
              <span className="text-gray-300">Active Events</span>
              <span className="text-purple-400 font-semibold">
                {events.filter(e => e.status === 'upcoming' || e.status === 'ongoing').length}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
              <span className="text-gray-300">Total Users</span>
              <span className="text-blue-400 font-semibold">{users.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="p-3 bg-gray-700 rounded-lg">
              <p className="text-white text-sm">System initialized</p>
              <p className="text-gray-400 text-xs">Nexusadmin portal active</p>
            </div>
            <div className="p-3 bg-gray-700 rounded-lg">
              <p className="text-white text-sm">{users.length} users registered</p>
              <p className="text-gray-400 text-xs">Total user count</p>
            </div>
            <div className="p-3 bg-gray-700 rounded-lg">
              <p className="text-white text-sm">{events.length} events created</p>
              <p className="text-gray-400 text-xs">Total event count</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NexusadminDashboard;