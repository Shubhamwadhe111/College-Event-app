import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { Users, Search, Trash2, Eye, Download, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';
import { adminAPI } from '../../services/api';
import { exportUsersToPDF, exportOrganizersToPDF } from '../../utils/pdfExport';

const NexusadminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filterRole, setFilterRole] = useState<'all' | 'student' | 'organizer' | 'admin'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const usersData = await adminAPI.getUsers();
      setUsers(usersData);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await adminAPI.deleteUser(userId);
        toast.success('User deleted successfully');
        loadUsers();
      } catch (error: any) {
        toast.error(error.message || 'Failed to delete user');
      }
    }
  };

  const changeUserRole = async (userId: string, newRole: 'student' | 'organizer' | 'admin') => {
    if (window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      try {
        await adminAPI.changeUserRole(userId, newRole);
        toast.success('User role updated successfully');
        loadUsers();
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
        loadUsers();
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
    exportUsersToPDF(users, 'Nexusadmin - All Users Report');
    toast.success('Users exported to PDF');
  };

  const exportStudents = () => {
    const students = users.filter(u => u.role === 'student');
    exportUsersToPDF(students, 'Nexusadmin - Students Report');
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

  // Filter users based on search term and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.studentId && user.studentId.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRole = filterRole === 'all' || user.role === filterRole;

    return matchesSearch && matchesRole;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-purple-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">User Management</h1>
            <p className="text-gray-400">Manage all system users from Nexusadmin</p>
          </div>
        </div>
        <button
          onClick={loadUsers}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Search and Actions Bar */}
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex gap-3 flex-wrap items-center">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as any)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="organizer">Organizers</option>
            <option value="admin">Admins</option>
          </select>

          <button
            onClick={exportAllUsers}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export All
          </button>

          {selectedUsers.length > 0 && (
            <button
              onClick={bulkDeleteUsers}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete ({selectedUsers.length})
            </button>
          )}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        {filteredUsers.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No users found</p>
            <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="text-left py-4 px-4 text-purple-400 font-semibold w-12">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers(filteredUsers.map(u => u.id));
                        } else {
                          setSelectedUsers([]);
                        }
                      }}
                      className="w-4 h-4 text-purple-600 bg-gray-600 border-gray-500 rounded focus:ring-purple-500"
                    />
                  </th>
                  <th className="text-left py-4 px-4 text-purple-400 font-semibold">Name</th>
                  <th className="text-left py-4 px-4 text-purple-400 font-semibold">Email</th>
                  <th className="text-left py-4 px-4 text-purple-400 font-semibold">ID</th>
                  <th className="text-left py-4 px-4 text-purple-400 font-semibold">Role</th>
                  <th className="text-left py-4 px-4 text-purple-400 font-semibold">Status</th>
                  <th className="text-left py-4 px-4 text-purple-400 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleUserSelection(user.id)}
                        className="w-4 h-4 text-purple-600 bg-gray-600 border-gray-500 rounded focus:ring-purple-500"
                      />
                    </td>
                    <td className="py-4 px-4 text-white font-medium">{user.name}</td>
                    <td className="py-4 px-4 text-gray-300">{user.email}</td>
                    <td className="py-4 px-4 text-gray-300">{user.studentId}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'admin' ? 'bg-purple-500/20 text-purple-300' :
                        user.role === 'organizer' ? 'bg-green-500/20 text-green-300' :
                        'bg-blue-500/20 text-blue-300'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {user.role === 'organizer' && (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.approvalStatus === 'approved' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {user.approvalStatus === 'approved' ? 'Approved' : 'Pending'}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => viewUserDetails(user)}
                          className="text-blue-400 hover:text-blue-300 p-2 hover:bg-blue-500/10 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <select
                          value={user.role}
                          onChange={(e) => changeUserRole(user.id, e.target.value as any)}
                          className="px-3 py-1 bg-gray-700 border border-gray-600 text-white rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="student">Student</option>
                          <option value="organizer">Organizer</option>
                          <option value="admin">Admin</option>
                        </select>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded transition-colors"
                          title="Delete User"
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

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowUserModal(false)}>
          <div className="bg-gray-800 rounded-xl shadow-2xl p-8 max-w-2xl w-full border border-gray-700" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">User Details</h2>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-white text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                  <p className="text-gray-400 text-sm font-medium mb-1">Name</p>
                  <p className="text-white font-semibold text-lg">{selectedUser.name}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                  <p className="text-gray-400 text-sm font-medium mb-1">Email</p>
                  <p className="text-white font-semibold text-lg">{selectedUser.email}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                  <p className="text-gray-400 text-sm font-medium mb-1">Student/Staff ID</p>
                  <p className="text-white font-semibold text-lg">{selectedUser.studentId}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                  <p className="text-gray-400 text-sm font-medium mb-1">Role</p>
                  <p className="text-white font-semibold text-lg capitalize">{selectedUser.role}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                  <p className="text-gray-400 text-sm font-medium mb-1">Department</p>
                  <p className="text-white font-semibold text-lg">{selectedUser.department || 'N/A'}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                  <p className="text-gray-400 text-sm font-medium mb-1">College</p>
                  <p className="text-white font-semibold text-lg">{selectedUser.college || 'N/A'}</p>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => {
                    setShowUserModal(false);
                    deleteUser(selectedUser.id);
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete User
                </button>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NexusadminUsers;