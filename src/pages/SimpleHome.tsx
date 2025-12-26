import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEvents } from '../contexts/EventContext';
import { Calendar, Users, Trophy, MapPin, Clock, ArrowRight, Star, Mic, Mail, Phone, ChevronDown } from 'lucide-react';

const SimpleHome: React.FC = () => {
  const { user } = useAuth();
  const { events } = useEvents();
  const [isVisible, setIsVisible] = useState(false);
  const [faqVisible, setFaqVisible] = useState(false);
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFaqVisible(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { threshold: 0.1 }
    );

    if (faqRef.current) {
      observer.observe(faqRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const featuredEvents = events
    .filter(event => event.status === 'upcoming')
    .sort((a, b) => b.registered - a.registered)
    .slice(0, 3);

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I register for an event?",
      answer: "Browse events on the Events page, click on any event that interests you, and click the 'Register' button. You'll need to be logged in as a student."
    },
    {
      question: "How can I create my own event?",
      answer: "Register as an event organizer, get approval from admin, then use the 'Create Event' option in your dashboard to submit your event for approval."
    },
    {
      question: "What should I do if I forget my password?",
      answer: "Click 'Forgot Password' on the login page and follow the instructions to reset your password via email."
    },
    {
      question: "How do I contact event organizers?",
      answer: "Event details include organizer contact information. You can also message them through the platform or use the contact details provided."
    },
    {
      question: "Can I edit my event after posting it?",
      answer: "Yes, organizers can edit their events from the dashboard, but major changes may require admin approval."
    },
    {
      question: "How do I report inappropriate content?",
      answer: "Use the 'Report' button on any event or user profile, or contact admin directly through the support channels."
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" style={{
        background: 'linear-gradient(135deg, #1a365d 0%, #2b6cb0 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(26, 54, 93, 0.9), rgba(43, 108, 176, 0.9))',
          opacity: 0.8
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 1s ease-out'
              }}>
                <h1 style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 900,
                  color: 'white',
                  marginBottom: '1rem',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}>
                  COLLEGE EVENT<br />
                  MANAGEMENT SYSTEM
                </h1>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#ffeb3b',
                  marginBottom: '1rem',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}>
                  Where Campus Comes Alive
                </h2>
                <p style={{
                  fontSize: '1.2rem',
                  color: 'rgba(255,255,255,0.9)',
                  marginBottom: '2rem',
                  lineHeight: 1.6
                }}>
                  Discover and register for exciting college events, workshops, seminars, and competitions
                  that enhance your academic journey and campus life.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link to="/events" className="btn btn-primary btn-lg" style={{
                    background: 'linear-gradient(45deg, #ed8936, #f59e0b)',
                    border: 'none',
                    padding: '12px 30px',
                    borderRadius: '50px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: 'white',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Calendar size={20} />
                    Browse Events
                    <ArrowRight size={16} />
                  </Link>
                  <Link to="/register" className="btn btn-outline-light btn-lg" style={{
                    border: '2px solid white',
                    color: 'white',
                    padding: '12px 30px',
                    borderRadius: '50px',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}>
                    Join Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid rgba(255,255,255,0.2)',
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 1s ease-out 0.3s'
              }}>
                <h3 style={{ color: 'white', marginBottom: '1rem' }}>TECH FEST 2024</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <MapPin size={20} style={{ color: '#ed8936' }} />
                  <span style={{ color: 'white' }}>College Auditorium, Main Campus</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                  <Clock size={20} style={{ color: '#ed8936' }} />
                  <span style={{ color: 'white' }}>9 AM To 5 PM, December 25, 2024</span>
                </div>
                <Link to="/events" className="btn btn-warning btn-lg w-100" style={{
                  background: '#ed8936',
                  border: 'none',
                  borderRadius: '50px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: 'white',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}>
                  Register Now
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Benefits Section */}
      <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#333', marginBottom: '1rem' }}>
              EVENT BENEFITS
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666' }}>
              Why Participate in College Events
            </p>
          </div>
          <div className="row g-4">
            {[
              {
                icon: <Users size={40} />,
                title: 'Student Networking',
                desc: 'Connect with peers, faculty, and industry professionals to build valuable relationships.'
              },
              {
                icon: <Trophy size={40} />,
                title: 'Skill Development',
                desc: 'Enhance your academic and extracurricular skills through workshops and competitions.'
              },
              {
                icon: <Star size={40} />,
                title: 'Campus Community',
                desc: 'Be part of a vibrant college community and create lasting memories with fellow students.'
              }
            ].map((benefit, index) => (
              <div key={index} className="col-lg-4">
                <div style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '15px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{
                    color: '#ff6b6b',
                    marginBottom: '1rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)'
                  }}>
                    {benefit.icon}
                  </div>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#333', marginBottom: '1rem' }}>
                    {benefit.title}
                  </h4>
                  <p style={{ color: '#666', lineHeight: 1.6 }}>
                    {benefit.desc}
                  </p>
                  <Link to="/events" style={{
                    color: '#ff6b6b',
                    textDecoration: 'none',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    marginTop: '1rem'
                  }}>
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, #1a365d 0%, #2b6cb0 100%)', color: 'white' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
              Our Impact
            </h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
              Numbers that speak for themselves
            </p>
          </div>
          <div className="row g-4">
            {/* Statistics will be populated from real data */}
            <div className="col-12 text-center">
              <p style={{ fontSize: '1.2rem', opacity: 0.9, fontStyle: 'italic' }}>
                Real statistics will appear here once events are created and students start participating.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#1a365d', marginBottom: '1rem' }}>
              What Students Say
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666' }}>
              Hear from our community
            </p>
          </div>
          <div className="row g-4">
            {/* Testimonials will be populated from real user feedback */}
            <div className="col-12 text-center">
              <p style={{ fontSize: '1.2rem', color: '#666', fontStyle: 'italic' }}>
                Real testimonials from your students will appear here once events are held and feedback is collected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                color: '#333',
                marginBottom: '1rem',
                lineHeight: 1.2
              }}>
                Uniting Students Through<br />
                Academic Excellence
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  <Mic size={24} />
                </div>
                <div>
                  <h5 style={{ margin: 0, fontWeight: 600 }}>Guest Speakers & Workshops</h5>
                  <p style={{ margin: 0, color: '#666' }}>
                    Learn from industry experts and enhance your knowledge through interactive sessions.
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  <Users size={24} />
                </div>
                <div>
                  <h5 style={{ margin: 0, fontWeight: 600 }}>Student Organizers</h5>
                  <p style={{ margin: 0, color: '#666' }}>
                    Events organized by students, for students, fostering leadership and collaboration.
                  </p>
                </div>
              </div>
              <Link to="/events" className="btn btn-primary" style={{
                background: 'linear-gradient(45deg, #1a365d, #2b6cb0)',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '50px',
                fontWeight: 600,
                textDecoration: 'none',
                color: 'white',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                Explore Events <ArrowRight size={16} />
              </Link>
            </div>
            <div className="col-lg-6">
              <div style={{
                background: '#000000',
                borderRadius: '20px',
                padding: '2rem',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  transform: 'rotate(45deg)'
                }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 style={{ marginBottom: '1rem' }}>Register for Events Today</h3>
                  <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
                    Join thousands of students in exciting college events, from technical workshops
                    to cultural festivals, enhancing your college experience.
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link to="/events" className="btn btn-light" style={{
                      borderRadius: '50px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      color: '#1a365d'
                    }}>
                      View Events
                    </Link>
                    <Link to="/contact" className="btn btn-outline-light" style={{
                      borderRadius: '50px',
                      fontWeight: 600,
                      textDecoration: 'none'
                    }}>
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '60px 0', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <div className="container">
          <div className="row text-center">
            <div className="col-lg-3 col-md-6 mb-4">
              <div style={{
                fontSize: '3rem',
                fontWeight: 900,
                marginBottom: '0.5rem',
                color: '#ff6b6b'
              }}>
                {events.filter(e => e.status === 'upcoming').length}+
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>Upcoming Events</div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div style={{
                fontSize: '3rem',
                fontWeight: 900,
                marginBottom: '0.5rem',
                color: '#ff6b6b'
              }}>
                {events.reduce((sum, event) => sum + (event.registered || 0), 0)}+
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>Total Registrations</div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div style={{
                fontSize: '3rem',
                fontWeight: 900,
                marginBottom: '0.5rem',
                color: '#ff6b6b'
              }}>
                {new Set(events.map(e => e.category)).size}+
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>Event Categories</div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div style={{
                fontSize: '3rem',
                fontWeight: 900,
                marginBottom: '0.5rem',
                color: '#ff6b6b'
              }}>
                50+
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>Student Participants</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#1a365d', marginBottom: '1rem' }}>
              Event Gallery
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666' }}>
              Glimpses of our vibrant college events
            </p>
          </div>
          <div className="row g-3">
            {/* Event gallery images will be populated from real events */}
            <div className="col-12 text-center">
              <p style={{ fontSize: '1.2rem', color: '#666', fontStyle: 'italic' }}>
                Event photos will appear here once events are created and images are uploaded.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#333', marginBottom: '1rem' }}>
              Featured Events
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666' }}>
              Discover exciting college events and register to participate
            </p>
          </div>
          <div className="row g-4">
            {featuredEvents.map((event) => (
              <div key={event.id} className="col-lg-4">
                <div style={{
                  background: 'white',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{
                    height: '200px',
                    background: `url(${event.image || ''})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#666'
                  }}>
                    {!event.image && 'No Image Available'}
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h4 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#333', marginBottom: '0.5rem' }}>
                      {event.title}
                    </h4>
                    <p style={{ color: '#666', marginBottom: '1rem', fontSize: '0.9rem' }}>
                      {event.description?.substring(0, 100)}...
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
                        <Calendar size={16} />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <Link to={`/events/${event.id}`} style={{
                        color: '#667eea',
                        textDecoration: 'none',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}>
                        View Details <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/events" className="btn btn-primary btn-lg" style={{
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '50px',
              fontWeight: 600,
              textDecoration: 'none',
              color: 'white'
            }}>
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#1a365d', marginBottom: '1rem' }}>
                Get In Touch
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
                Have questions about events or need help? Reach out to us!
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #ed8936, #f59e0b)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <h5 style={{ margin: 0, color: '#1a365d' }}>Email Us</h5>
                    <p style={{ margin: 0, color: '#666' }}>events@college.edu</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #ed8936, #f59e0b)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <h5 style={{ margin: 0, color: '#1a365d' }}>Call Us</h5>
                    <p style={{ margin: 0, color: '#666' }}>+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}>
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      style={{
                        borderRadius: '10px',
                        border: '2px solid #e2e8f0',
                        padding: '12px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email"
                      style={{
                        borderRadius: '10px',
                        border: '2px solid #e2e8f0',
                        padding: '12px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      rows={4}
                      placeholder="Your Message"
                      style={{
                        borderRadius: '10px',
                        border: '2px solid #e2e8f0',
                        padding: '12px',
                        fontSize: '1rem',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn w-100"
                    style={{
                      background: 'linear-gradient(45deg, #ed8936, #f59e0b)',
                      border: 'none',
                      borderRadius: '50px',
                      padding: '12px',
                      fontWeight: 600,
                      color: 'white'
                    }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer-like CTA */}
      <section style={{ padding: '60px 0', background: 'linear-gradient(135deg, #1a365d 0%, #2b6cb0 100%)', color: 'white' }}>
        <div className="container text-center">
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
            Ready to Join College Events?
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9 }}>
            Connect with your college community through amazing events and activities
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {!user && (
              <>
                <Link to="/register" className="btn btn-primary" style={{
                  background: 'linear-gradient(45deg, #ed8936, #f59e0b)',
                  border: 'none',
                  padding: '12px 30px',
                  borderRadius: '50px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: 'white'
                }}>
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-outline-light" style={{
                  border: '2px solid white',
                  color: 'white',
                  padding: '12px 30px',
                  borderRadius: '50px',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}>
                  Sign In
                </Link>
              </>
            )}
            {user && (
              <Link to="/create-event" className="btn btn-primary" style={{
                background: 'linear-gradient(45deg, #ed8936, #f59e0b)',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '50px',
                fontWeight: 600,
                textDecoration: 'none',
                color: 'white'
              }}>
                Create Event
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Help / FAQ Section */}
      <section ref={faqRef} style={{ padding: '80px 0', background: '#1a1a1a' }}>
        <div className={`container ${faqVisible ? 'faq-enter' : ''}`}>
          <div className="text-center mb-12">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white', marginBottom: '1rem' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#cccccc' }}>
              Find answers to common questions about our platform
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item-hover" style={{
                background: '#2a2a2a',
                borderRadius: '12px',
                border: '1px solid #404040',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                cursor: 'pointer'
              }}>
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-700 transition-colors duration-300"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                  <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white' }}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    style={{
                      color: '#10b981',
                      transition: 'transform 0.3s ease-in-out',
                      transform: openFAQ === index ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                  />
                </button>
                <div
                  style={{
                    overflow: 'hidden',
                    transition: 'all 0.4s ease-in-out',
                    maxHeight: openFAQ === index ? '200px' : '0',
                    opacity: openFAQ === index ? 1 : 0,
                    padding: openFAQ === index ? '0 24px 24px 24px' : '0 24px 0 24px'
                  }}
                >
                  <p style={{
                    color: '#cccccc',
                    lineHeight: 1.6,
                    fontSize: '1rem',
                    margin: 0
                  }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default SimpleHome;