import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Search,
  Filter,
  Calendar,
  User,
  MapPin,
  Users,
  FileText,
  Eye,
  Download,
  MessageSquare,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

interface Comment {
  author: string;
  message: string;
  date: string;
}

interface BaseApprovalRequest {
  id: number;
  type: 'event' | 'organizer';
  title: string;
  organizer: string;
  organizerEmail: string;
  submittedDate: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  priority: 'high' | 'medium' | 'low';
  documents: string[];
  comments: Comment[];
}

interface EventApprovalRequest extends BaseApprovalRequest {
  type: 'event';
  eventDate: string;
  eventTime: string;
  location: string;
  expectedParticipants: number;
  category: string;
  budget: number;
}

interface OrganizerApprovalRequest extends BaseApprovalRequest {
  type: 'organizer';
  department: string;
  designation: string;
  experience: string;
}

type ApprovalRequest = EventApprovalRequest | OrganizerApprovalRequest;

const EnhancedApprovalsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);
  
  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>([
    {
      id: 1,
      type: 'event',
      title: 'Tech Innovation Summit 2024',
      organizer: 'John Smith',
      organizerEmail: 'john.smith@college.edu',
      submittedDate: '2024-01-10',
      eventDate: '2024-01-25',
      eventTime: '10:00 AM',
      location: 'Main Auditorium',
      expectedParticipants: 200,
      category: 'Technology',
      description: 'A comprehensive summit featuring the latest innovations in technology, including AI, blockchain, and IoT. The event will include keynote speakers from leading tech companies and interactive workshops.',
      budget: 15000,
      status: 'pending',
      priority: 'high',
      documents: ['event-proposal.pdf', 'budget-breakdown.xlsx', 'speaker-list.pdf'],
      comments: []
    },
    {
      id: 2,
      type: 'organizer',
      title: 'New Organizer Application',
      organizer: 'Emily Davis',
      organizerEmail: 'emily.davis@college.edu',
      submittedDate: '2024-01-12',
      department: 'Sports Department',
      designation: 'Sports Coordinator',
      experience: '5 years in event management',
      description: 'Experienced sports coordinator looking to organize inter-college sports events and tournaments.',
      status: 'pending',
      priority: 'medium',
      documents: ['resume.pdf', 'recommendation-letter.pdf'],
      comments: []
    },
    {
      id: 3,
      type: 'event',
      title: 'Cultural Night 2024',
      organizer: 'Sarah Johnson',
      organizerEmail: 'sarah.johnson@college.edu',
      submittedDate: '2024-01-08',
      eventDate: '2024-02-14',
      eventTime: '6:00 PM',
      location: 'College Auditorium',
      expectedParticipants: 500,
      category: 'Cultural',
      description: 'Annual cultural night featuring performances by students including dance, music, drama, and poetry.',
      budget: 25000,
      status: 'approved',
      priority: 'high',
      documents: ['event-proposal.pdf', 'performance-schedule.pdf'],
      comments: [
        { author: 'Admin', message: 'Great event proposal. Approved with full budget allocation.', date: '2024-01-09' }
      ]
    },
    {
      id: 4,
      type: 'event',
      title: 'Startup Pitch Competition',
      organizer: 'Mike Wilson',
      organizerEmail: 'mike.wilson@college.edu',
      submittedDate: '2024-01-14',
      eventDate: '2024-02-20',
      eventTime: '2:00 PM',
      location: 'Innovation Hub',
      expectedParticipants: 100,
      category: 'Business',
      description: 'Competition for student startups to pitch their ideas to industry experts and investors.',
      budget: 8000,
      status: 'rejected',
      priority: 'medium',
      documents: ['pitch-guidelines.pdf'],
      comments: [
        { author: 'Admin', message: 'Budget allocation exceeds department limits. Please revise and resubmit.', date: '2024-01-15' }
      ]
    }
  ]);

  const tabs = [
    { id: 'pending', label: 'Pending Review', count: approvalRequests.filter(r => r.status === 'pending').length },
    { id: 'approved', label: 'Approved', count: approvalRequests.filter(r => r.status === 'approved').length },
    { id: 'rejected', label: 'Rejected', count: approvalRequests.filter(r => r.status === 'rejected').length },
    { id: 'all', label: 'All Requests', count: approvalRequests.length }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-400 bg-green-900/20 border-green-800';
      case 'pending': return 'text-yellow-400 bg-yellow-900/20 border-yellow-800';
      case 'rejected': return 'text-red-400 bg-red-900/20 border-red-800';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-900/20';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20';
      case 'low': return 'text-green-400 bg-green-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
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

  const filteredRequests = approvalRequests.filter(request => {
    const matchesTab = activeTab === 'all' || request.status === activeTab;
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (request.type === 'event' && (request as EventApprovalRequest).category?.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (request.type === 'organizer' && (request as OrganizerApprovalRequest).department?.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const handleApprove = (requestId: number, comment: string = '') => {
    setApprovalRequests(requests => requests.map(request => 
      request.id === requestId 
        ? { 
            ...request, 
            status: 'approved' as const,
            comments: [...request.comments, { author: 'Admin', message: comment || 'Request approved', date: new Date().toISOString().split('T')[0] }]
          } 
        : request
    ));
  };

  const handleReject = (requestId: number, comment: string = '') => {
    setApprovalRequests(requests => requests.map(request => 
      request.id === requestId 
        ? { 
            ...request, 
            status: 'rejected' as const,
            comments: [...request.comments, { author: 'Admin', message: comment || 'Request rejected', date: new Date().toISOString().split('T')[0] }]
          } 
        : request
    ));
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Approval Requests</h1>
            <p className="text-gray-400">Review and manage event and organizer approval requests</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <Download size={16} />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pending Reviews</p>
              <p className="text-3xl font-bold text-white">{approvalRequests.filter(r => r.status === 'pending').length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
              <Clock size={24} color="white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Approved Today</p>
              <p className="text-3xl font-bold text-white">3</p>
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} color="white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">High Priority</p>
              <p className="text-3xl font-bold text-white">{approvalRequests.filter(r => r.priority === 'high' && r.status === 'pending').length}</p>
            </div>
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
              <AlertCircle size={24} color="white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg. Review Time</p>
              <p className="text-3xl font-bold text-white">2.5</p>
              <p className="text-gray-400 text-xs">days</p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText size={24} color="white" />
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
            placeholder="Search requests by title, organizer, or category..."
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

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">{request.title}</h3>
                    <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                      {request.priority.toUpperCase()} PRIORITY
                    </span>
                    <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                      {request.type.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-gray-400 mb-4">{request.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <User size={16} />
                      <span className="text-sm">{request.organizer}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar size={16} />
                      <span className="text-sm">Submitted: {request.submittedDate}</span>
                    </div>
                    {request.type === 'event' && (
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar size={16} />
                        <span className="text-sm">Event: {(request as EventApprovalRequest).eventDate}</span>
                      </div>
                    )}
                    {request.type === 'event' && (
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin size={16} />
                        <span className="text-sm">{(request as EventApprovalRequest).location}</span>
                      </div>
                    )}
                    {request.type === 'event' && (
                      <div className="flex items-center gap-2 text-gray-300">
                        <Users size={16} />
                        <span className="text-sm">{(request as EventApprovalRequest).expectedParticipants} expected</span>
                      </div>
                    )}
                    {request.type === 'event' && (
                      <div className="flex items-center gap-2 text-gray-300">
                        <span className="text-sm">Budget: ${(request as EventApprovalRequest).budget.toLocaleString()}</span>
                      </div>
                    )}
                    {request.type === 'organizer' && (
                      <div className="flex items-center gap-2 text-gray-300">
                        <span className="text-sm">Department: {(request as OrganizerApprovalRequest).department}</span>
                      </div>
                    )}
                    {request.type === 'organizer' && (
                      <div className="flex items-center gap-2 text-gray-300">
                        <span className="text-sm">Designation: {(request as OrganizerApprovalRequest).designation}</span>
                      </div>
                    )}
                  </div>

                  {request.documents && request.documents.length > 0 && (
                    <div className="mb-4">
                      <p className="text-gray-400 text-sm mb-2">Attached Documents:</p>
                      <div className="flex flex-wrap gap-2">
                        {request.documents.map((doc, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button 
                    onClick={() => setSelectedRequest(selectedRequest === request.id ? null : request.id)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Eye size={16} />
                  </button>
                  
                  {request.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => handleApprove(request.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <ThumbsUp size={14} />
                        Approve
                      </button>
                      <button 
                        onClick={() => handleReject(request.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <ThumbsDown size={14} />
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Comments Section */}
              {request.comments.length > 0 && (
                <div className="border-t border-gray-700 pt-4">
                  <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                    <MessageSquare size={16} />
                    Comments
                  </h4>
                  <div className="space-y-2">
                    {request.comments.map((comment, index) => (
                      <div key={index} className="bg-gray-700 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-blue-400 font-medium text-sm">{comment.author}</span>
                          <span className="text-gray-400 text-xs">{comment.date}</span>
                        </div>
                        <p className="text-gray-300 text-sm">{comment.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Expanded Details */}
            {selectedRequest === request.id && (
              <div className="border-t border-gray-700 bg-gray-750 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-3">Request Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Organizer Email:</span>
                        <span className="text-gray-300">{request.organizerEmail}</span>
                      </div>
                      {request.type === 'organizer' && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Department:</span>
                          <span className="text-gray-300">{(request as OrganizerApprovalRequest).department}</span>
                        </div>
                      )}
                      {request.type === 'organizer' && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Designation:</span>
                          <span className="text-gray-300">{(request as OrganizerApprovalRequest).designation}</span>
                        </div>
                      )}
                      {request.type === 'organizer' && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Experience:</span>
                          <span className="text-gray-300">{(request as OrganizerApprovalRequest).experience}</span>
                        </div>
                      )}
                      {request.type === 'event' && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Event Time:</span>
                          <span className="text-gray-300">{(request as EventApprovalRequest).eventTime}</span>
                        </div>
                      )}
                      {request.type === 'event' && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Category:</span>
                          <span className="text-gray-300">{(request as EventApprovalRequest).category}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-3">Actions</h4>
                    <div className="space-y-2">
                      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        View Full Details
                      </button>
                      <button className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                        Download Documents
                      </button>
                      <button className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                        Contact Organizer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <FileText size={48} className="mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-medium text-gray-400 mb-2">No approval requests found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default EnhancedApprovalsPage;