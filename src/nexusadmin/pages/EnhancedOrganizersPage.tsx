import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  CheckCircle, 
  XCircle, 
  Clock,
  Mail,
  Phone,
  Building,
  User,
  MoreHorizontal,
  UserCheck,
  UserX,
  Calendar
} from 'lucide-react';
import PortalLink from '../../components/PortalLink';

const EnhancedOrganizersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [organizers, setOrganizers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@college.edu',
      phone: '+1 234-567-8901',
      department: 'Computer Science',
      designation: 'Assistant Professor',
      status: 'active',
      eventsCreated: 12,
      totalParticipants: 450,
      joinedDate: '2023-08-15',
      lastActive: '2024-01-14',
      approvalStatus: 'approved'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@college.edu',
      phone: '+1 234-567-8902',
      department: 'Cultural Affairs',
      designation: 'Event Coordinator',
      status: 'active',
      eventsCreated: 8,
      totalParticipants: 680,
      joinedDate: '2023-09-20',
      lastActive: '2024-01-13',
      approvalStatus: 'approved'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.wilson@college.edu',
      phone: '+1 234-567-8903',
      department: 'Career Services',
      designation: 'Career Counselor',
      status: 'pending',
      eventsCreated: 0,
      totalParticipants: 0,
      joinedDate: '2024-01-10',
      lastActive: '2024-01-10',
      approvalStatus: 'pending'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@college.edu',
      phone: '+1 234-567-8904',
      department: 'Sports',
      designation: 'Sports Coordinator',
      status: 'inactive',
      eventsCreated: 5,
      totalParticipants: 200,
      joinedDate: '2023-07-10',
      lastActive: '2023-12-15',
      approvalStatus: 'approved'
    }
  ]);

  const tabs = [
    { id: 'all', label: 'All Organizers', count: organizers.length },
    { id: 'active', label: 'Active', count: organizers.filter(o => o.status === 'active').length },
    { id: 'pending', label: 'Pending Approval', count: organizers.filter(o => o.approvalStatus === 'pending').length },
    { id: 'inactive', label: 'Inactive', count: organizers.filter(o => o.status === 'inactive').length }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} />;
      case 'pending': return <Clock size={16} />;
      case 'inactive': return <XCircle size={16} />;
      default: return <User size={16} />;
    }
  };

  const filteredOrganizers = organizers.filter(organizer => {
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'pending' && organizer.approvalStatus === 'pending') ||
                      (activeTab !== 'pending' && organizer.status === activeTab);
    const matchesSearch = organizer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         organizer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         organizer.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleApprove = (organizerId: number) => {
    setOrganizers(organizers.map(organizer => 
      organizer.id === organizerId 
        ? { ...organizer, approvalStatus: 'approved', status: 'active' } 
        : organizer
    ));
  };

  const handleReject = (organizerId: number) => {
    setOrganizers(organizers.map(organizer => 
      organizer.id === organizerId 
        ? { ...organizer, approvalStatus: 'rejected', status: 'inactive' } 
        : organizer
    ));
  };

  const handleToggleStatus = (organizerId: number) => {
    setOrganizers(organizers.map(organizer => 
      organizer.id === organizerId 
        ? { ...organizer, status: organizer.status === 'active' ? 'inactive' : 'active' } 
        : organizer
    ));
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Organizers Management</h1>
            <p className="text-gray-400">Manage event organizers and their permissions</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus size={16} />
              Add Organizer
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Organizers</p>
              <p className="text-3xl font-bold text-white">{organizers.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Users size={24} color="white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Organizers</p>
              <p className="text-3xl font-bold text-white">{organizers.filter(o => o.status === 'active').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <UserCheck size={24} color="white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pending Approval</p>
              <p className="text-3xl font-bold text-white">{organizers.filter(o => o.approvalStatus === 'pending').length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
              <Clock size={24} color="white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Events Created</p>
              <p className="text-3xl font-bold text-white">{organizers.reduce((sum, o) => sum + o.eventsCreated, 0)}</p>
            </div>
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <Calendar size={24} color="white" />
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

      {/* Search and Filters */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search organizers by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
          <Filter size={16} />
          Filters
        </button>
      </div>

      {/* Organizers List */}
      <div className="space-y-4">
        {filteredOrganizers.map((organizer) => (
          <div key={organizer.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {organizer.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">{organizer.name}</h3>
                    <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(organizer.status)}`}>
                      {getStatusIcon(organizer.status)}
                      {organizer.status.charAt(0).toUpperCase() + organizer.status.slice(1)}
                    </span>
                    {organizer.approvalStatus === 'pending' && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium border border-yellow-200">
                        Pending Approval
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Mail size={16} />
                      <span className="text-sm">{organizer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Phone size={16} />
                      <span className="text-sm">{organizer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Building size={16} />
                      <span className="text-sm">{organizer.department}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    <span>Designation: {organizer.designation}</span>
                    <span>Events Created: {organizer.eventsCreated}</span>
                    <span>Total Participants: {organizer.totalParticipants}</span>
                    <span>Joined: {organizer.joinedDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                  <Eye size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                  <Edit size={16} />
                </button>
                
                {organizer.approvalStatus === 'pending' && (
                  <>
                    <button 
                      onClick={() => handleApprove(organizer.id)}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleReject(organizer.id)}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Reject
                    </button>
                  </>
                )}
                
                {organizer.approvalStatus === 'approved' && (
                  <button 
                    onClick={() => handleToggleStatus(organizer.id)}
                    className={`px-3 py-1 text-white text-sm rounded-lg transition-colors ${
                      organizer.status === 'active' 
                        ? 'bg-red-600 hover:bg-red-700' 
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {organizer.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                )}
                
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrganizers.length === 0 && (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-medium text-gray-400 mb-2">No organizers found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default EnhancedOrganizersPage;