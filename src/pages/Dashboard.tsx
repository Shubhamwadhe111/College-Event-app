import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEvents } from '../contexts/EventContext';
import EventStatistics from '../components/EventStatistics';
import { Calendar, Users, Trophy, Plus, Eye, TrendingUp, User } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { events, getEventsByOrganizer, getUserRegistrations } = useEvents();
  const [showStats, setShowStats] = useState(true);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRegistrations = getUserRegistrations(user.id);
  const registeredEvents = events.filter(event => 
    userRegistrations.some(reg => reg.eventId === event.id)
  );

  const organizerEvents = user.role === 'organizer' ? getEventsByOrganizer(user.id) : [];
  const totalRegistrations = organizerEvents.reduce((sum, event) => sum + event.registered, 0);

  const stats = user.role === 'student' ? [
    {
      label: 'Registered Events',
      value: registeredEvents.length,
      icon: <Calendar size={24} />,
      color: '#667eea'
    },
    {
      label: 'Upcoming Events',
      value: registeredEvents.filter(e => e.status === 'upcoming').length,
      icon: <TrendingUp size={24} />,
      color: '#764ba2'
    },
    {
      label: 'Completed Events',
      value: registeredEvents.filter(e => e.status === 'completed').length,
      icon: <Trophy size={24} />,
      color: '#ff6b6b'
    }
  ] : [
    {
      label: 'Total Events',
      value: organizerEvents.length,
      icon: <Calendar size={24} />,
      color: '#667eea'
    },
    {
      label: 'Total Registrations',
      value: totalRegistrations,
      icon: <Users size={24} />,
      color: '#764ba2'
    },
    {
      label: 'Avg. Registrations',
      value: organizerEvents.length > 0 ? Math.round(totalRegistrations / organizerEvents.length) : 0,
      icon: <TrendingUp size={24} />,
      color: '#ff6b6b'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
            <User size={32} />
          </div>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 900,
            color: 'white',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            Welcome back, {user.name}!
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {user.role === 'student' 
              ? 'Manage your event registrations and discover new opportunities'
              : 'Manage your events and track engagement'
            }
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
          animation: 'fadeIn 1s ease-out 0.2s both'
        }}>
          {stats.map((stat, index) => (
            <div key={stat.label} style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(255,255,255,0.2)',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(255,107,107,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{
                color: stat.color,
                marginBottom: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)'
              }}>
                {stat.icon}
              </div>
              <h3 style={{
                fontSize: '3rem',
                fontWeight: 900,
                color: 'white',
                marginBottom: '0.5rem'
              }}>
                {stat.value}
              </h3>
              <p style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '1.1rem',
                fontWeight: 600
              }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Organizer Statistics */}
        {user.role === 'organizer' && organizerEvents.length > 0 && (
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255,255,255,0.2)',
            marginBottom: '3rem',
            animation: 'fadeIn 1s ease-out 0.4s both'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: 'white'
              }}>
                📊 Your Statistics
              </h2>
              <button
                onClick={() => setShowStats(!showStats)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '50px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {showStats ? 'Hide Stats' : 'Show Stats'}
              </button>
            </div>
            {showStats && <EventStatistics events={organizerEvents} />}
          </div>
        )}

        {/* Main Content */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid rgba(255,255,255,0.2)',
          animation: 'fadeIn 1s ease-out 0.6s both'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: 'white'
            }}>
              {user.role === 'student' ? 'Your Registered Events' : 'Your Events'}
            </h3>
            {user.role === 'organizer' && (
              <Link to="/create-event" style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '50px',
                background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                border: 'none',
                color: 'white',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform = 'scale(1.05)';
                (e.target as HTMLElement).style.boxShadow = '0 10px 20px rgba(255,107,107,0.3)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = 'scale(1)';
                (e.target as HTMLElement).style.boxShadow = 'none';
              }}
              >
                <Plus size={16} />
                Create Event
              </Link>
            )}
          </div>

          {user.role === 'student' && registeredEvents.length === 0 && (
            <div style={{
              background: 'rgba(255,107,107,0.1)',
              border: '1px solid rgba(255,107,107,0.3)',
              borderRadius: '15px',
              padding: '2rem',
              marginBottom: '2rem',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  💡
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'white',
                    marginBottom: '0.5rem'
                  }}>
                    Looking for events to join?
                  </h3>
                  <p style={{
                    color: 'rgba(255,255,255,0.8)',
                    marginBottom: '1rem'
                  }}>
                    This dashboard shows only events you've registered for. To browse all available events, visit the Events page.
                  </p>
                  <Link to="/events" style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '50px',
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    border: 'none',
                    color: 'white',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-block',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.transform = 'scale(1.05)';
                    (e.target as HTMLElement).style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.transform = 'scale(1)';
                    (e.target as HTMLElement).style.boxShadow = 'none';
                  }}
                  >
                    Browse All Events
                  </Link>
                </div>
              </div>
            </div>
          )}

          {(user.role === 'student' ? registeredEvents : organizerEvents).length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '1.5rem'
            }}>
              {(user.role === 'student' ? registeredEvents : organizerEvents).map((event, index) => (
                <div key={event.id} style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease',
                  animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(255,107,107,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  <img
                    src={event.image || 'https://via.placeholder.com/400x200?text=Event'}
                    alt={event.title}
                    style={{ 
                      width: '100%', 
                      height: '200px', 
                      objectFit: 'cover'
                    }}
                  />
                  
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      marginBottom: '1rem'
                    }}>
                      <span style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '50px',
                        background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                        color: 'white',
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}>
                        {event.category}
                      </span>
                      <span style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '50px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        background: event.status === 'upcoming' ? 'rgba(34, 197, 94, 0.2)' :
                                  event.status === 'ongoing' ? 'rgba(59, 130, 246, 0.2)' :
                                  'rgba(156, 163, 175, 0.2)',
                        color: event.status === 'upcoming' ? '#22c55e' :
                               event.status === 'ongoing' ? '#3b82f6' :
                               '#6b7280',
                        border: `1px solid ${event.status === 'upcoming' ? 'rgba(34, 197, 94, 0.3)' :
                                             event.status === 'ongoing' ? 'rgba(59, 130, 246, 0.3)' :
                                             'rgba(156, 163, 175, 0.3)'}`
                      }}>
                        {event.status}
                      </span>
                    </div>
                    
                    <h4 style={{
                      fontSize: '1.3rem',
                      fontWeight: 700,
                      color: 'white',
                      marginBottom: '1rem'
                    }}>
                      {event.title}
                    </h4>
                    
                    <div style={{
                      fontSize: '0.9rem',
                      color: 'rgba(255,255,255,0.8)',
                      marginBottom: '1.5rem'
                    }}>
                      <p style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={16} style={{ color: '#ff6b6b' }} />
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </p>
                      <p style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        📍 {event.location}
                      </p>
                      <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Users size={16} style={{ color: '#ff6b6b' }} />
                        {event.registered}/{event.capacity} registered
                      </p>
                    </div>

                    <Link to={`/events/${event.id}`} style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '50px',
                      background: 'linear-gradient(45deg, #667eea, #764ba2)',
                      border: 'none',
                      color: 'white',
                      fontWeight: 600,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.transform = 'scale(1.05)';
                      (e.target as HTMLElement).style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.transform = 'scale(1)';
                      (e.target as HTMLElement).style.boxShadow = 'none';
                    }}
                    >
                      <Eye size={16} />
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)'
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
                fontSize: '2rem'
              }}>
                📅
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'white',
                marginBottom: '0.5rem'
              }}>
                {user.role === 'student' ? 'No registered events' : 'No events created'}
              </h3>
              <p style={{
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '2rem'
              }}>
                {user.role === 'student' 
                  ? "Start exploring and register for events that interest you."
                  : "Create your first event and start building your community."
                }
              </p>
              <Link
                to={user.role === 'student' ? '/events' : '/create-event'}
                style={{
                  padding: '1rem 2rem',
                  borderRadius: '50px',
                  background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                  border: 'none',
                  color: 'white',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.transform = 'scale(1.05)';
                  (e.target as HTMLElement).style.boxShadow = '0 10px 20px rgba(255,107,107,0.3)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.transform = 'scale(1)';
                  (e.target as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <Plus size={16} />
                {user.role === 'student' ? 'Browse Events' : 'Create Event'}
              </Link>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;