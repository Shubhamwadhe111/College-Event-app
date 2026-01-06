import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Users, 
  MapPin, 
  Clock,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Building2
} from 'lucide-react';

interface Event {
  id: string;
  title: string;
  college: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  category: string;
  description: string;
}

const EnhancedMasterEventsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCollege, setFilterCollege] = useState('all');

  // Mock data
  const events: Event[] = [
    {
      id: '1',
      title: 'AI & Machine Learning Summit 2024',
      college: 'MIT College of Engineering',
      organizer: 'Dr. Sarah Johnson',
      date: '2024-02-15',
      time: '09:00 AM',
      location: 'Main Auditorium',
      attendees: 450,
      maxAttendees: 500,
      status: 'upcoming',
      category: 'Technology',
      description: 'Annual summit on latest AI trends and research'
    },
    {
      id: '2',
      title: 'Startup Pitch Competition',
      college: 'Stanford University',
      organizer: 'Prof. Michael Chen',
      date: '2024-02-10',
      time: '02:00 PM',
      location: 'Innovation Hub',
      attendees: 200,
      maxAttendees: 250,
      status: 'ongoing',
      category: 'Business',
      description: 'Students pitch their startup ideas to investors'
    },
    {
      id: '3',
      title: 'Cultural Festival 2024',
      college: 'Harvard University',
      organizer: 'Dr. Emily Rodriguez',
      date: '2024-01-20',
      time: '06:00 PM',
      location: 'Campus Grounds',
      attendees: 800,
      maxAttendees: 1000,
      status: 'completed',
      category: 'Cultural',
      description: 'Annual celebration of diverse cultures'
    }
  ];

  const colleges = ['MIT College of Engineering', 'Stanford University', 'Harvard University'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return '#3b82f6';
      case 'ongoing': return '#10b981';
      case 'completed': return '#6b7280';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return <Clock size={16} />;
      case 'ongoing': return <CheckCircle size={16} />;
      case 'completed': return <CheckCircle size={16} />;
      case 'cancelled': return <XCircle size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    const matchesCollege = filterCollege === 'all' || event.college === filterCollege;
    return matchesSearch && matchesStatus && matchesCollege;
  });

  return (
    <div style={{
      padding: '2rem',
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
      minHeight: '100vh',
      color: '#ffffff'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #ffffff 0%, #10b981 50%, #14b8a6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            Global Events Overview
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '1.1rem'
          }}>
            Monitor and manage events across all colleges
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '16px',
          padding: '1.5rem',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #10b981, #14b8a6)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Calendar size={24} color="#ffffff" />
            </div>
            <div>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', margin: 0 }}>
                Total Events
              </p>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', margin: 0 }}>
                {events.length}
              </p>
            </div>
          </div>
        </div>

        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '16px',
          padding: '1.5rem',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Clock size={24} color="#ffffff" />
            </div>
            <div>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', margin: 0 }}>
                Upcoming Events
              </p>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: '#3b82f6', margin: 0 }}>
                {events.filter(e => e.status === 'upcoming').length}
              </p>
            </div>
          </div>
        </div>

        <div style={{
          background: 'rgba(168, 85, 247, 0.1)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          borderRadius: '16px',
          padding: '1.5rem',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Users size={24} color="#ffffff" />
            </div>
            <div>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', margin: 0 }}>
                Total Attendees
              </p>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: '#a855f7', margin: 0 }}>
                {events.reduce((sum, event) => sum + event.attendees, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div style={{
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '16px',
          padding: '1.5rem',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TrendingUp size={24} color="#ffffff" />
            </div>
            <div>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', margin: 0 }}>
                Ongoing Events
              </p>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b', margin: 0 }}>
                {events.filter(e => e.status === 'ongoing').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
          <Search style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'rgba(255, 255, 255, 0.5)'
          }} size={20} />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem 1rem 1rem 3rem',
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              color: '#ffffff',
              fontSize: '1rem'
            }}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            padding: '1rem',
            background: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            color: '#ffffff',
            fontSize: '1rem',
            minWidth: '150px'
          }}
        >
          <option value="all">All Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          value={filterCollege}
          onChange={(e) => setFilterCollege(e.target.value)}
          style={{
            padding: '1rem',
            background: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            color: '#ffffff',
            fontSize: '1rem',
            minWidth: '200px'
          }}
        >
          <option value="all">All Colleges</option>
          {colleges.map(college => (
            <option key={college} value={college}>{college}</option>
          ))}
        </select>
      </div>

      {/* Events Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            style={{
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '1.5rem',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}
          >
            {/* Event Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1rem'
            }}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '0.5rem'
                }}>
                  {event.title}
                </h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: getStatusColor(event.status),
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}>
                  {getStatusIcon(event.status)}
                  {event.status}
                </div>
              </div>
              <button style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem',
                color: 'rgba(255, 255, 255, 0.7)',
                cursor: 'pointer'
              }}>
                <MoreVertical size={16} />
              </button>
            </div>

            {/* Event Info */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.9rem'
              }}>
                <Building2 size={16} />
                {event.college}
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.9rem'
              }}>
                <Calendar size={16} />
                {new Date(event.date).toLocaleDateString()} at {event.time}
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.9rem'
              }}>
                <MapPin size={16} />
                {event.location}
              </div>
              <div style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '0.85rem',
                marginTop: '0.5rem'
              }}>
                Organizer: {event.organizer}
              </div>
            </div>

            {/* Attendance Progress */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <span style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.9rem'
                }}>
                  Attendance
                </span>
                <span style={{
                  color: '#10b981',
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}>
                  {event.attendees} / {event.maxAttendees}
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(event.attendees / event.maxAttendees) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(135deg, #10b981, #14b8a6)',
                  borderRadius: '4px'
                }} />
              </div>
            </div>

            {/* Category Badge */}
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{
                padding: '0.5rem 1rem',
                background: 'rgba(59, 130, 246, 0.2)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '20px',
                color: '#3b82f6',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase'
              }}>
                {event.category}
              </span>
            </div>

            {/* Actions */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <button style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                background: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '8px',
                color: '#10b981',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}>
                <Eye size={16} />
                View Details
              </button>
              <button style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                background: 'rgba(59, 130, 246, 0.2)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '8px',
                color: '#3b82f6',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}>
                <Users size={16} />
                Attendees
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: 'rgba(255, 255, 255, 0.6)'
        }}>
          <Calendar size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No events found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default EnhancedMasterEventsPage;