import React, { useState, useEffect } from 'react';
import { 
  Calendar, Search, Filter, Eye, Edit, Trash2, CheckCircle, XCircle, Clock,
  MapPin, Users, Plus, ChevronDown, Sparkles, TrendingUp, RefreshCw
} from 'lucide-react';
import { getStorageService, Event } from '../../services/storageAbstraction';

const EnhancedEventsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const storageService = getStorageService();
      const loadedEvents = await storageService.getEvents();
      setEvents(loadedEvents.length > 0 ? loadedEvents : mockEvents);
    } catch (error) {
      setEvents(mockEvents);
    }
    setIsLoading(false);
  };

  const mockEvents = [
    { id: '1', name: 'Tech Innovation Summit 2024', organizer: 'John Smith', startDate: '2024-01-15', time: '10:00 AM', venue: 'Main Auditorium', approvalStatus: 'approved', registrations: Array(150), eventType: 'Technology' },
    { id: '2', name: 'Cultural Fest - Spring Edition', organizer: 'Sarah Johnson', startDate: '2024-01-20', time: '2:00 PM', venue: 'Open Ground', approvalStatus: 'pending', registrations: Array(300), eventType: 'Cultural' },
    { id: '3', name: 'Career Development Workshop', organizer: 'Mike Wilson', startDate: '2024-01-18', time: '11:00 AM', venue: 'Seminar Hall B', approvalStatus: 'approved', registrations: Array(75), eventType: 'Workshop' },
    { id: '4', name: 'Sports Day 2024', organizer: 'Emily Davis', startDate: '2024-01-25', time: '8:00 AM', venue: 'Sports Complex', approvalStatus: 'pending', registrations: Array(500), eventType: 'Sports' },
    { id: '5', name: 'Art Exhibition', organizer: 'Alex Brown', startDate: '2024-01-22', time: '3:00 PM', venue: 'Art Gallery', approvalStatus: 'rejected', registrations: [], eventType: 'Art' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Technology': '#3b82f6', 'Cultural': '#8b5cf6', 'Workshop': '#10b981',
      'Sports': '#f59e0b', 'Art': '#ec4899'
    };
    return colors[category] || '#6b7280';
  };

  const displayEvents = events.length > 0 ? events : mockEvents;
  const filteredEvents = displayEvents.filter(event => {
    const matchesSearch = (event.name || event.title || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || event.approvalStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: displayEvents.length,
    approved: displayEvents.filter(e => e.approvalStatus === 'approved').length,
    pending: displayEvents.filter(e => e.approvalStatus === 'pending').length,
    rejected: displayEvents.filter(e => e.approvalStatus === 'rejected').length
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      padding: '2rem', paddingTop: '80px', position: 'relative', overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)', pointerEvents: 'none', zIndex: 0 }} />
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute', width: `${Math.random() * 300 + 100}px`, height: `${Math.random() * 300 + 100}px`,
          background: `rgba(255,255,255,${Math.random() * 0.1})`, borderRadius: '50%',
          left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, filter: 'blur(40px)',
          animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`
        }} />
      ))}

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Calendar size={28} color="#fbbf24" />
              <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', margin: 0, textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
                Event Management
              </h1>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem' }}>Manage and monitor all college events</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={loadEvents} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem',
              background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: 'white',
              border: '2px solid rgba(255,255,255,0.3)', borderRadius: '12px', fontWeight: 600, cursor: 'pointer'
            }}>
              <RefreshCw size={18} style={{ animation: isLoading ? 'spin 1s linear infinite' : 'none' }} /> Refresh
            </button>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: '#1e293b',
              border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(251, 191, 36, 0.4)'
            }}>
              <Plus size={20} /> Create Event
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Events', value: stats.total, icon: Calendar, color: '#3b82f6' },
            { label: 'Approved', value: stats.approved, icon: CheckCircle, color: '#10b981' },
            { label: 'Pending', value: stats.pending, icon: Clock, color: '#f59e0b' },
            { label: 'Rejected', value: stats.rejected, icon: XCircle, color: '#ef4444' }
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.95)', borderRadius: '20px', padding: '1.25rem',
              boxShadow: '0 15px 35px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '1rem'
            }}>
              <div style={{
                width: '55px', height: '55px', background: `linear-gradient(135deg, ${stat.color}, ${stat.color}99)`,
                borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 8px 20px ${stat.color}40`
              }}>
                <stat.icon size={26} color="white" />
              </div>
              <div>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>{stat.label}</p>
                <p style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div style={{
          background: 'rgba(255,255,255,0.95)', borderRadius: '20px', padding: '1.25rem',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)', marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
              <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input type="text" placeholder="Search events..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%', padding: '0.875rem 1rem 0.875rem 3rem', border: '2px solid #e2e8f0',
                  borderRadius: '12px', fontSize: '0.95rem', outline: 'none', background: '#f8fafc'
                }}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowFilterDropdown(!showFilterDropdown)} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.25rem',
                background: 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none', borderRadius: '12px',
                cursor: 'pointer', fontWeight: 600, color: 'white'
              }}>
                <Filter size={18} />
                {filterStatus === 'all' ? 'All Status' : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
                <ChevronDown size={16} />
              </button>
              {showFilterDropdown && (
                <div style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem', background: 'white',
                  borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)', border: '1px solid #e2e8f0',
                  zIndex: 100, minWidth: '150px', overflow: 'hidden'
                }}>
                  {['all', 'approved', 'pending', 'rejected'].map(status => (
                    <button key={status} onClick={() => { setFilterStatus(status); setShowFilterDropdown(false); }}
                      style={{
                        display: 'block', width: '100%', padding: '0.75rem 1rem', border: 'none',
                        background: filterStatus === status ? 'linear-gradient(135deg, #667eea15, #764ba215)' : 'white',
                        textAlign: 'left', cursor: 'pointer', fontWeight: filterStatus === status ? 600 : 400,
                        color: filterStatus === status ? '#667eea' : '#475569'
                      }}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.5rem' }}>
          {filteredEvents.map(event => (
            <div key={event.id} style={{
              background: 'rgba(255,255,255,0.95)', borderRadius: '24px', padding: '1.5rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)', transition: 'all 0.3s ease', cursor: 'pointer',
              position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.5)'
            }}>
              {/* Category Badge */}
              <div style={{
                position: 'absolute', top: '1rem', right: '1rem', padding: '0.4rem 0.85rem',
                borderRadius: '20px', background: `${getCategoryColor(event.eventType || event.category)}15`,
                color: getCategoryColor(event.eventType || event.category), fontSize: '0.75rem', fontWeight: 600
              }}>
                {event.eventType || event.category || 'General'}
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem', paddingRight: '90px' }}>
                {event.name || event.title}
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>by {event.organizer || 'Unknown'}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.85rem' }}>
                  <Calendar size={16} color="#667eea" /> {event.startDate || event.date} at {event.time}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.85rem' }}>
                  <MapPin size={16} color="#667eea" /> {event.venue || event.location}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.85rem' }}>
                  <Users size={16} color="#667eea" /> {event.registrations?.length || 0} participants
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                <span style={{
                  display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 0.85rem',
                  borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600,
                  background: `${getStatusColor(event.approvalStatus || event.status)}15`,
                  color: getStatusColor(event.approvalStatus || event.status), textTransform: 'capitalize'
                }}>
                  {event.approvalStatus === 'approved' ? <CheckCircle size={14} /> : event.approvalStatus === 'pending' ? <Clock size={14} /> : <XCircle size={14} />}
                  {event.approvalStatus || event.status}
                </span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={{ padding: '0.5rem', background: 'linear-gradient(135deg, #667eea15, #764ba215)', border: 'none', borderRadius: '10px', cursor: 'pointer', color: '#667eea' }}><Eye size={16} /></button>
                  <button style={{ padding: '0.5rem', background: 'linear-gradient(135deg, #10b98115, #34d39915)', border: 'none', borderRadius: '10px', cursor: 'pointer', color: '#10b981' }}><Edit size={16} /></button>
                  <button style={{ padding: '0.5rem', background: 'linear-gradient(135deg, #ef444415, #f8717115)', border: 'none', borderRadius: '10px', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', background: 'rgba(255,255,255,0.95)', borderRadius: '24px' }}>
            <Calendar size={64} color="#94a3b8" style={{ marginBottom: '1rem' }} />
            <h3 style={{ color: '#64748b', fontSize: '1.25rem', marginBottom: '0.5rem' }}>No events found</h3>
            <p style={{ color: '#94a3b8' }}>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
      `}</style>
    </div>
  );
};

export default EnhancedEventsPage;
