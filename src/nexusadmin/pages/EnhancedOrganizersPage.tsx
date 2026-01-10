import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  CheckCircle, 
  XCircle, 
  Clock,
  Mail,
  Phone,
  Building,
  Calendar,
  TrendingUp,
  UserCheck,
  AlertCircle,
  MoreVertical
} from 'lucide-react';

const EnhancedOrganizersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrganizer, setSelectedOrganizer] = useState<number | null>(null);

  const [organizers, setOrganizers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@college.edu',
      phone: '+91 98765 43210',
      department: 'Computer Science',
      designation: 'Assistant Professor',
      status: 'active',
      eventsCreated: 12,
      totalParticipants: 450,
      joinedDate: '2023-08-15',
      lastActive: '2024-01-14',
      approvalStatus: 'approved',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@college.edu',
      phone: '+91 98765 43211',
      department: 'Cultural Affairs',
      designation: 'Event Coordinator',
      status: 'active',
      eventsCreated: 8,
      totalParticipants: 680,
      joinedDate: '2023-09-20',
      lastActive: '2024-01-13',
      approvalStatus: 'approved',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.wilson@college.edu',
      phone: '+91 98765 43212',
      department: 'Career Services',
      designation: 'Career Counselor',
      status: 'pending',
      eventsCreated: 0,
      totalParticipants: 0,
      joinedDate: '2024-01-10',
      lastActive: '2024-01-10',
      approvalStatus: 'pending',
      rating: 0
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@college.edu',
      phone: '+91 98765 43213',
      department: 'Sports',
      designation: 'Sports Coordinator',
      status: 'inactive',
      eventsCreated: 5,
      totalParticipants: 200,
      joinedDate: '2023-07-10',
      lastActive: '2023-12-15',
      approvalStatus: 'approved',
      rating: 4.5
    },
    {
      id: 5,
      name: 'Raj Patel',
      email: 'raj.patel@college.edu',
      phone: '+91 98765 43214',
      department: 'Technical Club',
      designation: 'Club President',
      status: 'active',
      eventsCreated: 15,
      totalParticipants: 890,
      joinedDate: '2023-06-01',
      lastActive: '2024-01-15',
      approvalStatus: 'approved',
      rating: 4.7
    }
  ]);

  const tabs = [
    { id: 'all', label: 'All', count: organizers.length },
    { id: 'active', label: 'Active', count: organizers.filter(o => o.status === 'active').length },
    { id: 'pending', label: 'Pending', count: organizers.filter(o => o.approvalStatus === 'pending').length },
    { id: 'inactive', label: 'Inactive', count: organizers.filter(o => o.status === 'inactive').length }
  ];

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

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active': return { background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.4)' };
      case 'pending': return { background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.4)' };
      case 'inactive': return { background: 'rgba(107, 114, 128, 0.2)', color: '#9ca3af', border: '1px solid rgba(107, 114, 128, 0.4)' };
      default: return { background: 'rgba(107, 114, 128, 0.2)', color: '#9ca3af', border: '1px solid rgba(107, 114, 128, 0.4)' };
    }
  };

  const totalEvents = organizers.reduce((sum, o) => sum + o.eventsCreated, 0);
  const totalParticipants = organizers.reduce((sum, o) => sum + o.totalParticipants, 0);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      padding: '1.5rem',
      paddingTop: '20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#ffffff', margin: 0, marginBottom: '0.5rem' }}>
                Organizers Management
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', margin: 0 }}>
                Manage event organizers, approvals, and permissions
              </p>
            </div>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.25rem',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
            }}>
              <Plus size={18} />
              Add Organizer
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            padding: '1.25rem',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', margin: 0, marginBottom: '0.5rem' }}>Total Organizers</p>
                <p style={{ color: '#ffffff', fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>{organizers.length}</p>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Users size={24} color="white" />
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            padding: '1.25rem',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', margin: 0, marginBottom: '0.5rem' }}>Active</p>
                <p style={{ color: '#ffffff', fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>{organizers.filter(o => o.status === 'active').length}</p>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <UserCheck size={24} color="white" />
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            padding: '1.25rem',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', margin: 0, marginBottom: '0.5rem' }}>Pending Approval</p>
                <p style={{ color: '#ffffff', fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>{organizers.filter(o => o.approvalStatus === 'pending').length}</p>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Clock size={24} color="white" />
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            padding: '1.25rem',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', margin: 0, marginBottom: '0.5rem' }}>Total Events</p>
                <p style={{ color: '#ffffff', fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>{totalEvents}</p>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Calendar size={24} color="white" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs and Search */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '12px',
          padding: '1rem',
          border: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    transition: 'all 0.2s ease',
                    background: activeTab === tab.id ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255,255,255,0.1)',
                    color: activeTab === tab.id ? '#ffffff' : 'rgba(255,255,255,0.7)'
                  }}
                >
                  {tab.label}
                  <span style={{
                    marginLeft: '0.5rem',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '10px',
                    fontSize: '0.75rem',
                    background: activeTab === tab.id ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'
                  }}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div style={{ position: 'relative', minWidth: '280px' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
              <input
                type="text"
                placeholder="Search organizers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 1rem 0.6rem 2.5rem',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        </div>

        {/* Organizers List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredOrganizers.map((organizer) => (
            <div key={organizer.id} style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '1.25rem',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.2s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1 }}>
                  {/* Avatar */}
                  <div style={{
                    width: '56px',
                    height: '56px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.25rem' }}>
                      {organizer.name.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                      <h3 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>{organizer.name}</h3>
                      <span style={{
                        ...getStatusStyle(organizer.status),
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}>
                        {organizer.status === 'active' && <CheckCircle size={12} />}
                        {organizer.status === 'pending' && <Clock size={12} />}
                        {organizer.status === 'inactive' && <XCircle size={12} />}
                        {organizer.status.charAt(0).toUpperCase() + organizer.status.slice(1)}
                      </span>
                      {organizer.approvalStatus === 'pending' && (
                        <span style={{
                          background: 'rgba(239, 68, 68, 0.2)',
                          color: '#ef4444',
                          border: '1px solid rgba(239, 68, 68, 0.4)',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}>
                          <AlertCircle size={12} />
                          Needs Approval
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                        <Mail size={14} />
                        {organizer.email}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                        <Phone size={14} />
                        {organizer.phone}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                        <Building size={14} />
                        {organizer.department}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                      <div>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', margin: 0 }}>Designation</p>
                        <p style={{ color: '#ffffff', fontSize: '0.85rem', margin: 0, fontWeight: 500 }}>{organizer.designation}</p>
                      </div>
                      <div>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', margin: 0 }}>Events</p>
                        <p style={{ color: '#10b981', fontSize: '0.85rem', margin: 0, fontWeight: 600 }}>{organizer.eventsCreated}</p>
                      </div>
                      <div>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', margin: 0 }}>Participants</p>
                        <p style={{ color: '#3b82f6', fontSize: '0.85rem', margin: 0, fontWeight: 600 }}>{organizer.totalParticipants}</p>
                      </div>
                      {organizer.rating > 0 && (
                        <div>
                          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', margin: 0 }}>Rating</p>
                          <p style={{ color: '#f59e0b', fontSize: '0.85rem', margin: 0, fontWeight: 600 }}>⭐ {organizer.rating}</p>
                        </div>
                      )}
                      <div>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', margin: 0 }}>Joined</p>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', margin: 0 }}>{organizer.joinedDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button style={{
                    padding: '0.5rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: 'rgba(255,255,255,0.7)',
                    cursor: 'pointer'
                  }}>
                    <Eye size={16} />
                  </button>
                  <button style={{
                    padding: '0.5rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: 'rgba(255,255,255,0.7)',
                    cursor: 'pointer'
                  }}>
                    <Edit size={16} />
                  </button>

                  {organizer.approvalStatus === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(organizer.id)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: 'linear-gradient(135deg, #10b981, #059669)',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#ffffff',
                          fontWeight: 600,
                          fontSize: '0.8rem',
                          cursor: 'pointer'
                        }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(organizer.id)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#ffffff',
                          fontWeight: 600,
                          fontSize: '0.8rem',
                          cursor: 'pointer'
                        }}
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {organizer.approvalStatus === 'approved' && (
                    <button
                      onClick={() => handleToggleStatus(organizer.id)}
                      style={{
                        padding: '0.5rem 1rem',
                        background: organizer.status === 'active' 
                          ? 'linear-gradient(135deg, #ef4444, #dc2626)' 
                          : 'linear-gradient(135deg, #10b981, #059669)',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      {organizer.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredOrganizers.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <Users size={48} style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }} />
            <h3 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 600, margin: 0, marginBottom: '0.5rem' }}>
              No organizers found
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', margin: 0 }}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedOrganizersPage;
