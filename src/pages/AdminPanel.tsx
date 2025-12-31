import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Event } from '../types';
import { Shield, Users, Calendar, Trash2, CheckCircle, XCircle, RefreshCw, Search, Download, Eye, BarChart3 } from 'lucide-react';
import { toast } from 'react-toastify';
import { exportUsersToPDF, exportOrganizersToPDF } from '../utils/pdfExport';
import { adminAPI } from '../services/api';

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'organizers' | 'events' | 'analytics'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'pending'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      toast.error('Admin access required');
      return;
    }
    loadData();
  }, [user, navigate]);

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
      toast.error(error.message || 'Failed to load admin data');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await adminAPI.deleteUser(userId);
        toast.success('User deleted successfully');
        loadData();
      } catch (error: any) {
        toast.error(error.message || 'Failed to delete user');
      }
    }
  };

  const deleteEvent = async (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await adminAPI.deleteEvent(eventId);
        toast.success('Event deleted successfully');
        loadData();
      } catch (error: any) {
        toast.error(error.message || 'Failed to delete event');
      }
    }
  };

  const approveOrganizer = async (organizerId: string, approve: boolean) => {
    try {
        const action = approve ? 'approve' : 'reject';
        if(user){
            await adminAPI.approveOrganizer(parseInt(organizerId), action, parseInt(user.id));
            toast.success(`Organizer ${action}d successfully`);
            loadData();
        }
    } catch (error: any) {
        toast.error(error.message || 'Failed to update organizer status');
    }
  };

  const changeUserRole = async (userId: string, newRole: 'student' | 'organizer' | 'admin') => {
      if (window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
        try {
            await adminAPI.changeUserRole(userId, newRole);
            toast.success('User role updated successfully');
            loadData();
        } catch (error: any) {
            toast.error(error.message || 'Failed to change user role');
        }
      }
  };

  const bulkDeleteUsers = async () => {
    if (selectedUsers.length === 0) {
      toast.error('No users selected');
      return;
    }
    if (window.confirm(`Delete ${selectedUsers.length} selected users?`)) {
        try {
            await Promise.all(selectedUsers.map(id => adminAPI.deleteUser(id)));
            toast.success(`${selectedUsers.length} users deleted`);
            setSelectedUsers([]);
            loadData();
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete users');
        }
    }
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const exportAllUsers = () => {
    exportUsersToPDF(users, 'All Users Report');
    toast.success('Users exported to PDF');
  };

  const exportStudents = () => {
    const students = users.filter(u => u.role === 'student');
    exportUsersToPDF(students, 'Students Report');
    toast.success('Students exported to PDF');
  };

  const exportOrganizers = () => {
    const organizers = users.filter(u => u.role === 'organizer');
    exportOrganizersToPDF(organizers as any);
    toast.success('Organizers exported to PDF');
  };

  const viewUserDetails = (user: User) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const students = users.filter(u => u.role === 'student');
  const organizers = users.filter(u => u.role === 'organizer');
  const pendingOrganizers = organizers.filter(o => o.approvalStatus === 'pending');
  const approvedOrganizers = organizers.filter(o => o.approvalStatus === 'approved');

  // Client-side filtering for now. For larger datasets, this should be done on the backend.
  const filteredStudents = students.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.studentId && u.studentId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredOrganizers = organizers.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.studentId && u.studentId.toLowerCase().includes(searchTerm.toLowerCase()));

    if (filterStatus === 'approved') return matchesSearch && u.approvalStatus === 'approved';
    if (filterStatus === 'pending') return matchesSearch && u.approvalStatus === 'pending';
    return matchesSearch;
  });

  const filteredEvents = events.filter(e =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
      padding: '2rem 0'
    }}>
      <div className="container">
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
          animation: 'fadeIn 1s ease-out'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: 'white'
          }}>
            <Shield size={32} />
          </div>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 900,
            color: 'white',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            College Admin Panel
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Approve organizers, manage users, and monitor college events
          </p>
        </div>

          {/* Search and Actions Bar */}
          <div className="flex gap-3 flex-wrap items-center">
            <button
              onClick={loadData}
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users, events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10 w-full"
              />
            </div>
            <button
              onClick={exportAllUsers}
              className="btn-primary flex items-center gap-2"
              style={{ color: '#ffffff' }}
            >
              <Download className="w-4 h-4" />
              Export All
            </button>
            {selectedUsers.length > 0 && (
              <button
                onClick={bulkDeleteUsers}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                style={{ color: '#ffffff' }}
              >
                <Trash2 className="w-4 h-4" />
                Delete ({selectedUsers.length})
              </button>
            )}
          </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === 'overview'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-black hover:bg-gray-200'
              }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === 'students'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-black hover:bg-gray-200'
              }`}
          >
            Students ({students.length})
          </button>
          <button
            onClick={() => setActiveTab('organizers')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === 'organizers'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-black hover:bg-gray-200'
              }`}
          >
            Organizers ({organizers.length})
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === 'events'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-black hover:bg-gray-200'
              }`}
          >
            Events ({events.length})
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === 'analytics'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-black hover:bg-gray-200'
              }`}
          >
            <BarChart3 className="w-4 h-4 inline mr-2" />
            Analytics
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm font-medium">Total Students</p>
                    <p className="text-4xl font-bold text-white mt-2">{students.length}</p>
                  </div>
                  <Users className="w-16 h-16 text-white/60" />
                </div>
              </div>

              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm font-medium">Total Organizers</p>
                    <p className="text-4xl font-bold text-white mt-2">{organizers.length}</p>
                    <p className="text-white/60 text-xs mt-1">{pendingOrganizers.length} pending</p>
                  </div>
                  <Shield className="w-16 h-16 text-white/60" />
                </div>
              </div>

              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm font-medium">Total Events</p>
                    <p className="text-4xl font-bold text-white mt-2">{events.length}</p>
                  </div>
                  <Calendar className="w-16 h-16 text-white/60" />
                </div>
              </div>
            </div>

            {/* Pending Approvals */}
            {pendingOrganizers.length > 0 && (
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 mb-6 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-yellow-400" />
                  Pending Organizer Approvals ({pendingOrganizers.length})
                </h2>
                <div className="space-y-3">
                  {pendingOrganizers.map(org => (
                    <div key={org.id} className="flex items-center justify-between p-4 backdrop-blur-sm bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                      <div>
                        <p className="font-semibold text-white text-lg">{org.name}</p>
                        <p className="text-sm text-white/70">{org.email}</p>
                        <p className="text-xs text-white/60 mt-1">ID: {org.studentId}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => approveOrganizer(org.id, true)}
                          className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => approveOrganizer(org.id, false)}
                          className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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

            {/* Quick Stats */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-4">System Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-white/70 text-sm">Approved Organizers</p>
                  <p className="text-2xl font-bold text-emerald-400">{approvedOrganizers.length}</p>
                </div>
                <div className="p-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-white/70 text-sm">Pending Approvals</p>
                  <p className="text-2xl font-bold text-yellow-400">{pendingOrganizers.length}</p>
                </div>
                <div className="p-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-white/70 text-sm">Active Events</p>
                  <p className="text-2xl font-bold text-purple-400">{events.filter(e => e.status === 'upcoming' || e.status === 'ongoing').length}</p>
                </div>
                <div className="p-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-white/70 text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-blue-400">{users.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Students Management</h2>
              <button
                onClick={exportStudents}
                className="btn-primary flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Students
              </button>
            </div>
            {filteredStudents.length === 0 ? (
              <p className="text-center text-gray-400 py-12">No students found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-emerald-500/20">
                      <th className="text-left py-4 px-4 text-emerald-400 font-semibold w-12">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedUsers(filteredStudents.map(s => s.id));
                            } else {
                              setSelectedUsers([]);
                            }
                          }}
                          className="w-4 h-4"
                        />
                      </th>
                      <th className="text-left py-4 px-4 text-emerald-400 font-semibold">Name</th>
                      <th className="text-left py-4 px-4 text-emerald-400 font-semibold">Email</th>
                      <th className="text-left py-4 px-4 text-emerald-400 font-semibold">Student ID</th>
                      <th className="text-left py-4 px-4 text-emerald-400 font-semibold">Department</th>
                      <th className="text-left py-4 px-4 text-emerald-400 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map(student => (
                      <tr key={student.id} className="border-b border-gray-700/50 hover:bg-emerald-500/5 transition-colors">
                        <td className="py-4 px-4">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(student.id)}
                            onChange={() => toggleUserSelection(student.id)}
                            className="w-4 h-4"
                          />
                        </td>
                        <td className="py-4 px-4 text-white font-medium">{student.name}</td>
                        <td className="py-4 px-4 text-gray-300">{student.email}</td>
                        <td className="py-4 px-4 text-gray-300">{student.studentId}</td>
                        <td className="py-4 px-4 text-gray-300">{student.department || 'N/A'}</td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => viewUserDetails(student)}
                              className="text-blue-400 hover:text-blue-300 px-2 py-1 hover:bg-blue-500/10 rounded"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <select
                              value={student.role}
                              onChange={(e) => changeUserRole(student.id, e.target.value as any)}
                              className="px-3 py-1 bg-gray-700 text-white rounded text-sm"
                            >
                              <option value="student">Student</option>
                              <option value="organizer">Organizer</option>
                              <option value="admin">Admin</option>
                            </select>
                            <button
                              onClick={() => deleteUser(student.id)}
                              className="text-red-400 hover:text-red-300 flex items-center gap-1 px-3 py-1 hover:bg-red-500/10 rounded transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Organizers Tab */}
        {activeTab === 'organizers' && (
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">
            {/* Filter and Export Bar */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                >
                  <option value="all" className="bg-gray-800">All Organizers</option>
                  <option value="approved" className="bg-gray-800">Approved Only</option>
                  <option value="pending" className="bg-gray-800">Pending Only</option>
                </select>
              </div>
              <button
                onClick={exportOrganizers}
                className="btn-primary flex items-center gap-2"
                style={{ color: '#ffffff', backgroundColor: '#059669' }}
              >
                <Download className="w-4 h-4" />
                Export Organizers
              </button>
            </div>

            {/* Pending */}
            {pendingOrganizers.length > 0 && filterStatus !== 'approved' && (
              <div className="card p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Pending Approvals</h2>
                <div className="space-y-3">
                  {filteredOrganizers.filter(o => !o.isApproved).map(org => (
                    <div key={org.id} className="flex items-center justify-between p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <div>
                        <p className="font-semibold text-white text-lg">{org.name}</p>
                        <p className="text-sm text-gray-400">{org.email}</p>
                        <p className="text-xs text-gray-500 mt-1">ID: {org.studentId}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => approveOrganizer(org.id, true)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-2"
                          style={{ color: '#ffffff', backgroundColor: '#059669' }}
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => approveOrganizer(org.id, false)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2"
                          style={{ color: '#ffffff', backgroundColor: '#dc2626' }}
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

            {/* Approved */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Approved Organizers</h2>
              {filteredOrganizers.filter(o => o.isApproved).length === 0 ? (
                <p className="text-center text-gray-400 py-12">No approved organizers yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-emerald-500/20">
                        <th className="text-left py-4 px-4 text-emerald-400 font-semibold">Name</th>
                        <th className="text-left py-4 px-4 text-emerald-400 font-semibold">Email</th>
                        <th className="text-left py-4 px-4 text-emerald-400 font-semibold">ID</th>
                        <th className="text-left py-4 px-4 text-emerald-400 font-semibold">Status</th>
                        <th className="text-left py-4 px-4 text-emerald-400 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrganizers.filter(o => o.isApproved).map(org => (
                        <tr key={org.id} className="border-b border-gray-700/50 hover:bg-emerald-500/5 transition-colors">
                          <td className="py-4 px-4 text-white font-medium">{org.name}</td>
                          <td className="py-4 px-4 text-gray-300">{org.email}</td>
                          <td className="py-4 px-4 text-gray-300">{org.studentId}</td>
                          <td className="py-4 px-4">
                            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold">
                              Approved
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => approveOrganizer(org.id, false)}
                                className="text-yellow-400 hover:text-yellow-300 px-3 py-1 hover:bg-yellow-500/10 rounded text-sm"
                              >
                                Revoke
                              </button>
                              <button
                                onClick={() => deleteUser(org.id)}
                                className="text-red-400 hover:text-red-300 flex items-center gap-1 px-3 py-1 hover:bg-red-500/10 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Events Management</h2>
            {filteredEvents.length === 0 ? (
              <p className="text-center text-white/70 py-12">No events created yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-4 px-4 text-white/80 font-semibold">Event Title</th>
                      <th className="text-left py-4 px-4 text-white/80 font-semibold">Organizer</th>
                      <th className="text-left py-4 px-4 text-white/80 font-semibold">Date</th>
                      <th className="text-left py-4 px-4 text-white/80 font-semibold">Category</th>
                      <th className="text-left py-4 px-4 text-white/80 font-semibold">Status</th>
                      <th className="text-left py-4 px-4 text-white/80 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEvents.map(event => (
                      <tr key={event.id} className="border-b border-gray-700/50 hover:bg-emerald-500/5 transition-colors">
                        <td className="py-4 px-4 text-white font-medium">{event.title}</td>
                        <td className="py-4 px-4 text-gray-300">{event.organizer}</td>
                        <td className="py-4 px-4 text-gray-300">{event.date}</td>
                        <td className="py-4 px-4 text-gray-300">{event.category}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${event.status === 'upcoming' ? 'bg-emerald-500/20 text-emerald-300' :
                              event.status === 'ongoing' ? 'bg-teal-500/20 text-teal-300' :
                                'bg-gray-500/20 text-gray-300'
                            }`}>
                            {event.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => deleteEvent(event.id)}
                            className="text-red-400 hover:text-red-300 flex items-center gap-1 px-3 py-1 hover:bg-red-500/10 rounded transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">System Analytics</h2>

            {/* User Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="backdrop-blur-sm bg-white/10 border border-white/20 p-6 rounded-xl">
                <p className="text-white/80 text-sm">Total Users</p>
                <p className="text-4xl font-bold text-white mt-2">{users.length}</p>
              </div>
              <div className="backdrop-blur-sm bg-white/10 border border-white/20 p-6 rounded-xl">
                <p className="text-white/80 text-sm">Students</p>
                <p className="text-4xl font-bold text-white mt-2">{students.length}</p>
                <p className="text-white/60 text-xs mt-1">{users.length > 0 ? ((students.length / users.length) * 100).toFixed(1) : 0}% of total</p>
              </div>
              <div className="backdrop-blur-sm bg-white/10 border border-white/20 p-6 rounded-xl">
                <p className="text-white/80 text-sm">Organizers</p>
                <p className="text-4xl font-bold text-white mt-2">{organizers.length}</p>
                <p className="text-white/60 text-xs mt-1">{approvedOrganizers.length} approved</p>
              </div>
              <div className="backdrop-blur-sm bg-white/10 border border-white/20 p-6 rounded-xl">
                <p className="text-white/80 text-sm">Total Events</p>
                <p className="text-4xl font-bold text-white mt-2">{events.length}</p>
              </div>
            </div>

            {/* Event Statistics */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Event Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="backdrop-blur-sm bg-white/5 border border-white/10 p-4 rounded-xl">
                  <p className="text-white/70 text-sm">Upcoming Events</p>
                  <p className="text-3xl font-bold text-emerald-400 mt-2">
                    {events.filter(e => e.status === 'upcoming').length}
                  </p>
                </div>
                <div className="backdrop-blur-sm bg-white/5 border border-white/10 p-4 rounded-xl">
                  <p className="text-white/70 text-sm">Ongoing Events</p>
                  <p className="text-3xl font-bold text-teal-400 mt-2">
                    {events.filter(e => e.status === 'ongoing').length}
                  </p>
                </div>
                <div className="backdrop-blur-sm bg-white/5 border border-white/10 p-4 rounded-xl">
                  <p className="text-white/70 text-sm">Completed Events</p>
                  <p className="text-3xl font-bold text-gray-400 mt-2">
                    {events.filter(e => e.status === 'completed').length}
                  </p>
                </div>
              </div>
            </div>

              {/* Top Events by Registration */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Top Events by Registration</h3>
                <div className="space-y-3">
                  {events
                    .sort((a, b) => (b.registered || 0) - (a.registered || 0))
                    .slice(0, 5)
                    .map((event, index) => (
                      <div key={event.id} className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="text-white font-semibold">{event.title}</p>
                            <p className="text-gray-400 text-sm">{event.category} • {event.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-emerald-400">{event.registered || 0}</p>
                          <p className="text-gray-400 text-sm">registrations</p>
                        </div>
                      </div>
                    ))}
                  {events.length === 0 && (
                    <p className="text-center text-gray-400 py-8">No events data available</p>
                  )}
                </div>
              </div>
            </div>
        )}

        <>
          {/* User Details Modal */}
          {showUserModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowUserModal(false)}>
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full border border-gray-200" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-600 text-sm font-medium mb-1">Name</p>
                    <p className="text-gray-900 font-semibold text-lg">{selectedUser.name}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-600 text-sm font-medium mb-1">Email</p>
                    <p className="text-gray-900 font-semibold text-lg">{selectedUser.email}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-600 text-sm font-medium mb-1">Student/Staff ID</p>
                    <p className="text-gray-900 font-semibold text-lg">{selectedUser.studentId}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-600 text-sm font-medium mb-1">Role</p>
                    <p className="text-gray-900 font-semibold text-lg capitalize">{selectedUser.role}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-600 text-sm font-medium mb-1">Department</p>
                    <p className="text-gray-900 font-semibold text-lg">{selectedUser.department || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-600 text-sm font-medium mb-1">College</p>
                    <p className="text-gray-900 font-semibold text-lg">{selectedUser.college || 'N/A'}</p>
                  </div>
                  {selectedUser.year && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-gray-600 text-sm font-medium mb-1">Year</p>
                      <p className="text-gray-900 font-semibold text-lg">{selectedUser.year}</p>
                    </div>
                  )}
                  {selectedUser.role === 'organizer' && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-gray-600 text-sm font-medium mb-1">Approval Status</p>
                      <p className={`font-semibold text-lg ${selectedUser.isApproved ? 'text-green-600' : 'text-yellow-600'}`}>
                        {selectedUser.isApproved ? 'Approved' : 'Pending'}
                      </p>
                    </div>
                  )}
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-600 text-sm font-medium mb-1">Registered Events</p>
                    <p className="text-gray-900 font-semibold text-lg">{selectedUser.registeredEvents?.length || 0}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-600 text-sm font-medium mb-1">Member Since</p>
                    <p className="text-gray-900 font-semibold text-lg">
                      {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    onClick={() => {
                      setShowUserModal(false);
                      deleteUser(selectedUser.id);
                    }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete User
                  </button>
                  <button
                    onClick={() => setShowUserModal(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        </>
      </div>
    </div>
  );
};

export default AdminPanel;
