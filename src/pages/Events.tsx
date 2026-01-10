import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../contexts/EventContext';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Search, Filter, MapPin, Users, Eye, Clock, Sparkles, Tag } from 'lucide-react';

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

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Technology': '#3b82f6',
      'Cultural': '#ec4899',
      'Sports': '#22c55e',
      'Academic': '#8b5cf6',
      'Career': '#f59e0b',
      'Workshop': '#14b8a6',
      'Competition': '#ef4444',
      'Seminar': '#6366f1',
      'Conference': '#0ea5e9',
      'Hackathon': '#10b981'
    };
    return colors[category] || '#10b981';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      paddingTop: '80px',
      paddingBottom: '3rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2.5rem',
          paddingTop: '1.5rem'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: 'rgba(16, 185, 129, 0.1)',
            borderRadius: '25px',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            marginBottom: '1rem'
          }}>
            <Sparkles size={16} style={{ color: '#10b981' }} />
            <span style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 600 }}>
              Discover Amazing Events
            </span>
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #ffffff 0%, #10b981 50%, #14b8a6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.75rem'
          }}>
            Campus Events
          </h1>
          <p style={{
            fontSize: '1rem',
            color: '#94a3b8',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            Find and register for exciting events happening around campus
          </p>
        </div>

        {/* Search and Filters */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '1.25rem',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
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
                  padding: '0.85rem 0.85rem 0.85rem 2.75rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  background: 'rgba(30, 41, 59, 0.6)',
                  color: 'white',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(16, 185, 129, 0.5)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(16, 185, 129, 0.2)';
                }}
              />
              <Search size={16} style={{
                position: 'absolute',
                left: '0.85rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(16, 185, 129, 0.6)'
              }} />
            </div>
            <div style={{ position: 'relative' }}>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 0.85rem 0.85rem 2.75rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  background: 'rgba(30, 41, 59, 0.6)',
                  color: 'white',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box',
                  cursor: 'pointer'
                }}
              >
                <option value="" style={{ background: '#1e293b' }}>All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category} style={{ background: '#1e293b' }}>{category}</option>
                ))}
              </select>
              <Filter size={16} style={{
                position: 'absolute',
                left: '0.85rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(16, 185, 129, 0.6)'
              }} />
            </div>
          </div>

          {/* Category Pills */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginTop: '1rem'
          }}>
            <button
              onClick={() => setSelectedCategory('')}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '20px',
                border: 'none',
                background: !selectedCategory ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255, 255, 255, 0.08)',
                color: !selectedCategory ? 'white' : '#94a3b8',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              All
            </button>
            {categories.slice(0, 6).map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '20px',
                  border: 'none',
                  background: selectedCategory === category 
                    ? `linear-gradient(135deg, ${getCategoryColor(category)}, ${getCategoryColor(category)}dd)` 
                    : 'rgba(255, 255, 255, 0.08)',
                  color: selectedCategory === category ? 'white' : '#94a3b8',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Showing <span style={{ color: '#10b981', fontWeight: 600 }}>{filteredEvents.length}</span> events
          </p>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredEvents.map((event) => (
              <div key={event.id} style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                {/* Event Image */}
                <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                  <img
                    src={event.image || `https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop`}
                    alt={event.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, transparent 50%, rgba(15, 23, 42, 0.9) 100%)'
                  }} />
                  
                  {/* Category Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '20px',
                    background: getCategoryColor(event.category),
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: 600
                  }}>
                    <Tag size={10} />
                    {event.category}
                  </div>

                  {/* Price Badge */}
                  {event.isPaid && (
                    <div style={{
                      position: 'absolute',
                      top: '0.75rem',
                      right: '0.75rem',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 700
                    }}>
                      ₹{event.price}
                    </div>
                  )}
                </div>

                {/* Event Content */}
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: '0.75rem',
                    lineHeight: 1.3,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {event.title}
                  </h3>

                  <p style={{
                    color: '#94a3b8',
                    marginBottom: '1rem',
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {event.shortDescription || event.description.substring(0, 80) + '...'}
                  </p>

                  {/* Event Details */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                    fontSize: '0.8rem',
                    color: '#64748b'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Calendar size={14} style={{ color: '#10b981' }} />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Clock size={14} style={{ color: '#10b981' }} />
                      <span>{event.time}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <MapPin size={14} style={{ color: '#10b981' }} />
                      <span style={{ 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        whiteSpace: 'nowrap' 
                      }}>{event.location}</span>
                    </div>
                  </div>

                  {/* Registration Progress */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.4rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Users size={14} style={{ color: '#10b981' }} />
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                          {event.registered}/{event.capacity} spots
                        </span>
                      </div>
                      <span style={{ 
                        fontSize: '0.7rem', 
                        color: event.registered >= event.capacity ? '#ef4444' : '#10b981',
                        fontWeight: 600
                      }}>
                        {event.registered >= event.capacity ? 'Full' : `${Math.round((event.registered / event.capacity) * 100)}%`}
                      </span>
                    </div>
                    <div style={{
                      height: '4px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '2px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${Math.min((event.registered / event.capacity) * 100, 100)}%`,
                        background: event.registered >= event.capacity 
                          ? 'linear-gradient(90deg, #ef4444, #dc2626)' 
                          : 'linear-gradient(90deg, #10b981, #14b8a6)',
                        borderRadius: '2px',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>

                  {/* View Button */}
                  <Link to={`/events/${event.id}`} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    border: 'none',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(16, 185, 129, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
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
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <Calendar size={32} style={{ color: '#10b981' }} />
            </div>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: 700,
              color: 'white',
              marginBottom: '0.5rem'
            }}>
              No events found
            </h3>
            <p style={{
              color: '#94a3b8',
              marginBottom: '2rem',
              fontSize: '0.95rem'
            }}>
              {events.length === 0
                ? "No events have been created yet."
                : "Try adjusting your search criteria."
              }
            </p>
            {user?.role === 'organizer' && (
              <Link to="/create-event" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.85rem 1.5rem',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                border: 'none',
                color: 'white',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}>
                <Sparkles size={16} />
                Create First Event
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
