import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Download,
  MapPin,
  User,
  MoreHorizontal
} from 'lucide-react';
import PortalLink from '../../components/PortalLink';

const EnhancedEventsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Tech Innovation Summit 2024',
      organizer: 'John Smith',
      date: '2024-01-15',
      time: '10:00 AM',
      location: 'Main Auditorium',
      status: 'pending',
      participants: 150,
      maxParticipants: 200,
      category: 'Technology',
      description: 'A comprehensive summit on latest technology trends and innovations.',
      submittedDate: '2024-01-10'
    },
    {
      id: 2,
      title: 'Cultural Fest - Spring Edition',
      organizer: 'Sarah Johnson',
      date: '2024-01-20',
      time: '2:00 PM',
      location: 'College Ground',
      status: 'approved',
      participants: 300,
      maxParticipants: 500,
      category: 'Cultural',
      description: 'Annual cultural festival celebrating diversity and talent.',
      submittedDate: '2024-01-08'
    },
    {
      id: 3,
      title: 'Career Development Workshop',
      organizer: 'Mike Wilson',
      date: '2024-01-18',
      time: '11:00 AM',
      location: 'Conference Hall',
      status: 'approved',
      participants: 75,
      maxParticipants: 100,
      category: 'Professional',
      description: 'Workshop on career planning and professional development.',
      submittedDate: '2024-01-12'
    },
    {
      id: 4,
      title: 'Sports Tournament',
      organizer: 'Alex Brown',
      date: '2024-01-25',
      time: '9:00 AM',
      location: 'Sports Complex',
      status: 'rejected',
      participants: 0,
      maxParticipants: 300,
      category: 'Sports',
      description: 'Inter-college sports tournament with multiple events.',
      submittedDate: '2024-01-14',
      rejectionReason: 'Insufficient safety measures outlined'
    }
  ]);

  const tabs = [
    { id: 'all', label: 'All Events', count: events.length },
    { id: 'pending', label: 'Pending Approval', count: events.filter(e => e.status === 'pending').length },
    { id: 'approved', label: 'Approved', count: events.filter(e => e.status === 'approved').length },
    { id: 'rejected', label: 'Rejected', count: events.filter(e => e.status === 'rejected').length }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const filteredEvents = events.filter(event => {
    const matchesTab = activeTab === 'all' || event.status === activeTab;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleApprove = (eventId: number) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, status: 'approved' } : event
    ));
  };

  const handleReject = (eventId: number) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, status: 'rejected' } : event
    ));
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Events Management</h1>
            <p className="text-gray-400">Manage all college events and approvals</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <Download size={16} />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus size={16} />
              Create Event
            </button>
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
            placeholder="Search events, organizers, or categories..."
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

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                  <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                    {getStatusIcon(event.status)}
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                  <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                    {event.category}
                  </span>
                </div>

                <p className="text-gray-400 mb-4">{event.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-300">
                    <User size={16} />
                    <span className="text-sm">{event.organizer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar size={16} />
                    <span className="text-sm">{event.date} at {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin size={16} />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Users size={16} />
                    <span className="text-sm">{event.participants}/{event.maxParticipants} participants</span>
                  </div>
                </div>

                {event.status === 'rejected' && event.rejectionReason && (
                  <div className="bg-red-900/20 border border-red-800 rounded-lg p-3 mb-4">
                    <p className="text-red-400 text-sm">
                      <strong>Rejection Reason:</strong> {event.rejectionReason}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Clock size={14} />
                  <span>Submitted on {event.submittedDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                  <Eye size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                  <Edit size={16} />
                </button>
                {event.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => handleApprove(event.id)}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleReject(event.id)}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Reject
                    </button>
                  </>
                )}
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>

            {/* Progress Bar for Participants */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-400 mb-1">
                <span>Registration Progress</span>
                <span>{Math.round((event.participants / event.maxParticipants) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar size={48} className="mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-medium text-gray-400 mb-2">No events found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default EnhancedEventsPage;