import React, { useState } from 'react';
import { Calendar, Search, Filter, Download, Plus, Eye, Edit, Trash2, Users, MapPin, Clock } from 'lucide-react';

const NexusSuperEvents: React.FC = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Tech Conference 2024', college: 'College A', date: '2024-02-15', time: '09:00', location: 'Main Auditorium', registered: 150, capacity: 200, status: 'upcoming' },
    { id: 2, title: 'Cultural Festival', college: 'College B', date: '2024-02-20', time: '14:00', location: 'Campus Grounds', registered: 300, capacity: 500, status: 'upcoming' },
    { id: 3, title: 'Sports Meet', college: 'College A', date: '2024-01-30', time: '08:00', location: 'Sports Complex', registered: 80, capacity: 100, status: 'completed' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.college.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: '2rem', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem',
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '2rem', 
              fontWeight: 800, 
              color: '#1e293b', 
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Calendar style={{ color: '#10b981' }} size={32} />
              Global Event Management
            </h1>
            <p style={{ color: '#64748b', margin: '0.5rem 0 0 0' }}>
              Monitor and manage events across all college portals
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '1.5rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: '#64748b'
            }} size={20} />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 44px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '12px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
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
          <button style={{
            background: '#f1f5f9',
            color: '#475569',
            border: '2px solid #e2e8f0',
            padding: '12px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Download size={20} />
            Export
          </button>
        </div>

        {/* Events Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {filteredEvents.map((event) => (
            <div key={event.id} style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
            >
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 700, 
                    color: '#1e293b', 
                    margin: 0,
                    lineHeight: 1.3
                  }}>
                    {event.title}
                  </h3>
                  <span style={{
                    background: event.status === 'upcoming' ? '#dbeafe' : 
                               event.status === 'ongoing' ? '#dcfce7' : 
                               event.status === 'completed' ? '#f3f4f6' : '#fee2e2',
                    color: event.status === 'upcoming' ? '#1e40af' : 
                           event.status === 'ongoing' ? '#166534' : 
                           event.status === 'completed' ? '#374151' : '#dc2626',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}>
                    {event.status}
                  </span>
                </div>
                
                <div style={{ marginBottom: '1rem', color: '#64748b', fontWeight: 500 }}>
                  {event.college}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                    <Calendar size={16} />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                    <Clock size={16} />
                    <span>{event.time}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                    <Users size={16} />
                    <span>{event.registered}/{event.capacity} registered</span>
                  </div>
                </div>
                
                <div style={{ 
                  background: '#f8fafc', 
                  borderRadius: '8px', 
                  padding: '0.75rem', 
                  marginBottom: '1rem' 
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Registration Progress</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>
                      {Math.round((event.registered / event.capacity) * 100)}%
                    </span>
                  </div>
                  <div style={{ 
                    width: '100%', 
                    height: '6px', 
                    background: '#e2e8f0', 
                    borderRadius: '3px', 
                    marginTop: '0.5rem',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${(event.registered / event.capacity) * 100}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #10b981, #14b8a6)',
                      borderRadius: '3px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{
                    flex: 1,
                    background: '#f1f5f9',
                    color: '#475569',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontSize: '0.875rem',
                    fontWeight: 500
                  }}>
                    <Eye size={16} />
                    View
                  </button>
                  <button style={{
                    background: '#fef2f2',
                    color: '#dc2626',
                    border: 'none',
                    padding: '8px',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981' }}>
              {events.filter(e => e.status === 'upcoming').length}
            </div>
            <div style={{ color: '#64748b', fontWeight: 500 }}>Upcoming Events</div>
          </div>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b' }}>
              {events.reduce((sum, e) => sum + e.registered, 0)}
            </div>
            <div style={{ color: '#64748b', fontWeight: 500 }}>Total Registrations</div>
          </div>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#8b5cf6' }}>
              {events.filter(e => e.status === 'completed').length}
            </div>
            <div style={{ color: '#64748b', fontWeight: 500 }}>Completed Events</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NexusSuperEvents;