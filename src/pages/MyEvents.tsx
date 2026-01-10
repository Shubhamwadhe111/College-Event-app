import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEvents } from '../contexts/EventContext';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Eye, 
  Bookmark, 
  History, 
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

interface Registration {
  event_id: number;
  event_name: string;
  start_date: string;
  time: string;
  venue: string;
  event_type: string;
  registration_date: string;
}

const MyEvents: React.FC = () => {
  const { user } = useAuth();
  const { events } = useEvents();
  const [activeTab, setActiveTab] = useState<'registered' | 'saved' | 'history'>('registered');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5001/api/registrations/user/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setRegistrations(data);
        } else {
          // If API fails, use local events context
          console.log('Using local events data');
        }
      } catch (err) {
        console.log('Backend not available, using local data');
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [user]);

  // Get user's registered events from context as fallback
  const userRegisteredEvents = events.filter(event => 
    user?.registeredEvents?.includes(event.id)
  );

  // Define display event type
  interface DisplayEvent {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    category: string;
    registrationDate: string;
  }

  // Combine API registrations with local data
  const displayEvents: DisplayEvent[] = registrations.length > 0 
    ? registrations.map(reg => ({
        id: String(reg.event_id),
        title: reg.event_name,
        date: reg.start_date,
        time: reg.time,
        location: reg.venue,
        category: reg.event_type,
        registrationDate: reg.registration_date
      }))
    : userRegisteredEvents.map(event => ({
        id: String(event.id),
        title: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        category: event.category,
        registrationDate: new Date().toISOString()
      }));

  // Filter events based on tab
  const now = new Date();
  const upcomingEvents = displayEvents.filter(event => new Date(event.date) >= now);
  const pastEvents = displayEvents.filter(event => new Date(event.date) < now);

  const tabs = [
    { id: 'registered', label: 'Registered Events', icon: Bookmark, count: upcomingEvents.length },
    { id: 'history', label: 'Event History', icon: History, count: pastEvents.length },
  ];

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        paddingTop: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <AlertCircle size={64} style={{ color: '#f59e0b', marginBottom: '1rem' }} />
          <h2 style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '1rem' }}>Please Login</h2>
          <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>You need to be logged in to view your events.</p>
          <Link to="/login" style={{
            padding: '0.75rem 2rem',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            borderRadius: '10px',
            color: 'white',
            textDecoration: 'none',
            fontWeight: 600
          }}>
            Login Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      paddingTop: '80px',
      paddingBottom: '40px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #ffffff 0%, #10b981 50%, #14b8a6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            My Events
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
            Manage your event registrations and track your participation history
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '0.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  background: activeTab === tab.id 
                    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                    : 'transparent',
                  color: activeTab === tab.id ? '#ffffff' : '#94a3b8'
                }}
              >
                <Icon size={18} />
                {tab.label}
                <span style={{
                  padding: '0.2rem 0.6rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  background: activeTab === tab.id ? 'rgba(255,255,255,0.2)' : 'rgba(16, 185, 129, 0.2)',
                  color: activeTab === tab.id ? '#ffffff' : '#10b981'
                }}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem'
          }}>
            <Loader2 size={40} style={{ color: '#10b981', animation: 'spin 1s linear infinite' }} />
          </div>
        )}

        {/* Events List */}
        {!loading && (
          <>
            {activeTab === 'registered' && (
              <div>
                {upcomingEvents.length > 0 ? (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '1.5rem'
                  }}>
                    {upcomingEvents.map((event, index) => (
                      <div key={event.id} style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        transition: 'all 0.3s ease'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'start',
                          marginBottom: '1rem'
                        }}>
                          <span style={{
                            padding: '0.4rem 0.8rem',
                            borderRadius: '20px',
                            background: 'rgba(16, 185, 129, 0.2)',
                            color: '#10b981',
                            fontSize: '0.75rem',
                            fontWeight: 600
                          }}>
                            {event.category || 'Event'}
                          </span>
                          <CheckCircle size={20} style={{ color: '#10b981' }} />
                        </div>
                        
                        <h3 style={{
                          fontSize: '1.2rem',
                          fontWeight: 700,
                          color: '#ffffff',
                          marginBottom: '1rem'
                        }}>
                          {event.title}
                        </h3>

                        <div style={{ marginBottom: '1.5rem' }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: '#94a3b8',
                            fontSize: '0.9rem',
                            marginBottom: '0.5rem'
                          }}>
                            <Calendar size={16} style={{ color: '#10b981' }} />
                            {new Date(event.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: '#94a3b8',
                            fontSize: '0.9rem',
                            marginBottom: '0.5rem'
                          }}>
                            <Clock size={16} style={{ color: '#10b981' }} />
                            {event.time}
                          </div>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: '#94a3b8',
                            fontSize: '0.9rem'
                          }}>
                            <MapPin size={16} style={{ color: '#10b981' }} />
                            {event.location}
                          </div>
                        </div>

                        <Link to={`/events/${event.id}`} style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem',
                          borderRadius: '10px',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          color: 'white',
                          textDecoration: 'none',
                          fontWeight: 600,
                          fontSize: '0.9rem'
                        }}>
                          <Eye size={16} />
                          View Details
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: '4rem 2rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <Bookmark size={64} style={{ color: '#64748b', marginBottom: '1rem' }} />
                    <h3 style={{ color: '#ffffff', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                      No Upcoming Events
                    </h3>
                    <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
                      You haven't registered for any upcoming events yet.
                    </p>
                    <Link to="/events" style={{
                      padding: '0.75rem 2rem',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      borderRadius: '10px',
                      color: 'white',
                      textDecoration: 'none',
                      fontWeight: 600
                    }}>
                      Browse Events
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                {pastEvents.length > 0 ? (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '1.5rem'
                  }}>
                    {pastEvents.map((event) => (
                      <div key={event.id} style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        opacity: 0.8
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'start',
                          marginBottom: '1rem'
                        }}>
                          <span style={{
                            padding: '0.4rem 0.8rem',
                            borderRadius: '20px',
                            background: 'rgba(100, 116, 139, 0.2)',
                            color: '#94a3b8',
                            fontSize: '0.75rem',
                            fontWeight: 600
                          }}>
                            {event.category || 'Event'}
                          </span>
                          <span style={{
                            padding: '0.4rem 0.8rem',
                            borderRadius: '20px',
                            background: 'rgba(100, 116, 139, 0.2)',
                            color: '#94a3b8',
                            fontSize: '0.75rem',
                            fontWeight: 600
                          }}>
                            Completed
                          </span>
                        </div>
                        
                        <h3 style={{
                          fontSize: '1.2rem',
                          fontWeight: 700,
                          color: '#cbd5e1',
                          marginBottom: '1rem'
                        }}>
                          {event.title}
                        </h3>

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: '#64748b',
                          fontSize: '0.9rem'
                        }}>
                          <Calendar size={16} />
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: '4rem 2rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <History size={64} style={{ color: '#64748b', marginBottom: '1rem' }} />
                    <h3 style={{ color: '#ffffff', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                      No Event History
                    </h3>
                    <p style={{ color: '#94a3b8' }}>
                      Your past event participations will appear here.
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default MyEvents;
