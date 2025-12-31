import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../contexts/EventContext';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Search, Filter, MapPin, Users, Eye } from 'lucide-react';

const Events: React.FC = () => {
  const { events } = useEvents();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['Technology', 'Cultural', 'Sports', 'Academic', 'Career', 'Workshop', 'Competition', 'Seminar', 'Conference', 'Hackathon'];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
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
            <Calendar size={32} />
          </div>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 900,
            color: 'white',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            Discover Events
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Find and register for amazing college events happening around campus
          </p>
        </div>

        {/* Search and Filters */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid rgba(255,255,255,0.2)',
          marginBottom: '3rem',
          animation: 'fadeIn 1s ease-out 0.2s both'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <Search size={20} style={{ color: 'white' }} />
            <span style={{ color: 'white', fontWeight: 600, fontSize: '1.1rem' }}>Search & Filter Events</span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '1rem'
          }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3rem',
                  borderRadius: '50px',
                  border: '2px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
              />
              <Search size={20} style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(255,255,255,0.7)'
              }} />
            </div>
            <div style={{ position: 'relative' }}>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3rem',
                  borderRadius: '50px',
                  border: '2px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <option value="" style={{ background: '#667eea', color: 'white' }}>All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category} style={{ background: '#667eea', color: 'white' }}>{category}</option>
                ))}
              </select>
              <Filter size={20} style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(255,255,255,0.7)'
              }} />
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem',
            animation: 'fadeIn 1s ease-out 0.4s both'
          }}>
            {filteredEvents.map((event, index) => (
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
                    {event.isPaid && (
                      <span style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '50px',
                        background: 'linear-gradient(45deg, #eab308, #f59e0b)',
                        color: 'white',
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}>
                        ₹{event.price}
                      </span>
                    )}
                  </div>

                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: 'white',
                    marginBottom: '1rem'
                  }}>
                    {event.title}
                  </h3>

                  <p style={{
                    color: 'rgba(255,255,255,0.8)',
                    marginBottom: '1rem',
                    fontSize: '0.9rem',
                    lineHeight: 1.5
                  }}>
                    {event.shortDescription || event.description.substring(0, 100) + '...'}
                  </p>

                  <div style={{
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.7)',
                    marginBottom: '1.5rem'
                  }}>
                    <p style={{
                      marginBottom: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <Calendar size={16} style={{ color: '#ff6b6b' }} />
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </p>
                    <p style={{
                      marginBottom: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <MapPin size={16} style={{ color: '#ff6b6b' }} />
                      {event.location}
                    </p>
                    <p style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
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
            border: '1px solid rgba(255,255,255,0.2)',
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
              No events found
            </h3>
            <p style={{
              color: 'rgba(255,255,255,0.6)',
              marginBottom: '2rem'
            }}>
              {events.length === 0
                ? "No events have been created yet."
                : "Try adjusting your search criteria."
              }
            </p>
            {user?.role === 'organizer' && (
              <Link to="/create-event" style={{
                padding: '1rem 2rem',
                borderRadius: '50px',
                background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                border: 'none',
                color: 'white',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block',
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
                Create First Event
              </Link>
            )}
          </div>
        )}
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
        input:focus, select:focus {
          border-color: #ff6b6b !important;
          box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default Events;