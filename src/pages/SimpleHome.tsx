import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEvents } from '../contexts/EventContext';
import { Calendar, Users, Trophy, MapPin, Clock, ArrowRight, Star, Mic, Mail, Phone, ChevronDown, Sparkles, Zap, Heart, Rocket, Play } from 'lucide-react';

const SimpleHome: React.FC = () => {
  const { user } = useAuth();
  const { events } = useEvents();
  const [isVisible, setIsVisible] = useState(false);
  const [faqVisible, setFaqVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
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
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        minHeight: 'calc(100vh - 90px)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '1rem'
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.15) 0%, transparent 50%)`,
          transition: 'background 0.3s ease'
        }} />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              background: `rgba(16, 185, 129, ${Math.random() * 0.5 + 0.2})`,
              borderRadius: '50%',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: Math.random() * 2 + 's'
            }}
          />
        ))}
        
        {/* Geometric Shapes */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '100px',
          height: '100px',
          background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(52, 211, 153, 0.1))',
          borderRadius: '20px',
          transform: `rotate(${scrollY * 0.1}deg)`,
          animation: 'pulse 4s ease-in-out infinite'
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: '60px',
          height: '60px',
          background: 'linear-gradient(45deg, rgba(167, 243, 208, 0.2), rgba(110, 231, 183, 0.2))',
          borderRadius: '50%',
          transform: `translateY(${Math.sin(scrollY * 0.01) * 20}px)`,
          animation: 'bounce 3s ease-in-out infinite'
        }} />
        
        <div className="container" style={{ 
          position: 'relative', 
          zIndex: 1,
          paddingTop: '1rem'
        }}>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 1s ease-out'
              }}>
                {/* Animated Title with Typewriter Effect */}
                <div style={{ position: 'relative', marginBottom: '1rem' }}>
                  <h1 style={{
                    fontSize: 'clamp(0.9rem, 2vw, 1.4rem)',
                    fontWeight: 800,
                    color: 'white',
                    marginBottom: '0',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    background: 'linear-gradient(135deg, #ffffff, #10b981, #14b8a6)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'gradientShift 3s ease infinite'
                  }}>
                    NEXUS EVENT
                  </h1>
                  <h1 style={{
                    fontSize: 'clamp(0.9rem, 2vw, 1.4rem)',
                    fontWeight: 800,
                    color: 'white',
                    margin: '0',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    background: 'linear-gradient(135deg, #10b981, #14b8a6, #ffffff)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'gradientShift 3s ease infinite reverse'
                  }}>
                    PLATFORM
                  </h1>
                  
                  {/* Sparkle Effects */}
                  <Sparkles style={{
                    position: 'absolute',
                    top: '10px',
                    right: '20px',
                    color: '#10b981',
                    animation: 'sparkle 2s ease-in-out infinite'
                  }} size={24} />
                  <Zap style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    color: '#14b8a6',
                    animation: 'sparkle 2s ease-in-out infinite 0.5s'
                  }} size={20} />
                </div>
                
                <h2 style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#10b981',
                  marginBottom: '0.6rem',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                  animation: 'slideInLeft 1s ease-out 0.5s both'
                }}>
                  <Heart style={{ display: 'inline', marginRight: '5px', color: '#ef4444' }} size={14} />
                  Where Innovation Meets Community
                </h2>
                
                <p style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.9)',
                  marginBottom: '1rem',
                  lineHeight: 1.4,
                  animation: 'slideInLeft 1s ease-out 0.7s both'
                }}>
                  🚀 Discover amazing events, workshops, and competitions. Connect with your community
                  and create unforgettable experiences together.
                </p>
                
                <div style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  flexWrap: 'wrap',
                  animation: 'slideInUp 1s ease-out 0.9s both'
                }}>
                  <Link to="/events" className="btn btn-primary btn-lg" style={{
                    background: 'linear-gradient(45deg, #10b981, #14b8a6, #06b6d4)',
                    backgroundSize: '200% 200%',
                    border: 'none',
                    padding: '6px 16px',
                    borderRadius: '16px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: 'white',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
                    animation: 'gradientShift 3s ease infinite, pulse 2s ease-in-out infinite',
                    transform: 'translateY(0)',
                    transition: 'all 0.3s ease',
                    fontSize: '0.75rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
                  }}
                  >
                    <Rocket size={16} />
                    Explore Events
                    <ArrowRight size={14} />
                  </Link>
                  
                  {!user && (
                    <Link to="/register" className="btn btn-outline-light btn-lg" style={{
                      border: '2px solid rgba(255,255,255,0.3)',
                      color: 'white',
                      padding: '8px 20px',
                      borderRadius: '18px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      transition: 'all 0.3s ease',
                      fontSize: '0.8rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                      e.currentTarget.style.borderColor = '#10b981';
                      e.currentTarget.style.color = '#10b981';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    >
                      <Play size={16} />
                      Join Now
                    </Link>
                  )}
                  
                  {user && (
                    <Link to="/dashboard" className="btn btn-outline-light btn-lg" style={{
                      border: '2px solid rgba(255,255,255,0.3)',
                      color: 'white',
                      padding: '8px 20px',
                      borderRadius: '18px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      transition: 'all 0.3s ease',
                      fontSize: '0.8rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                      e.currentTarget.style.borderColor = '#10b981';
                      e.currentTarget.style.color = '#10b981';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    >
                      <Users size={18} />
                      My Dashboard
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px)',
                borderRadius: '30px',
                padding: '3rem',
                border: '2px solid rgba(16, 185, 129, 0.2)',
                transform: isVisible ? 'translateY(0) rotateY(0deg)' : 'translateY(50px) rotateY(10deg)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 1.2s ease-out 0.3s',
                boxShadow: '0 25px 50px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Animated Border */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: '30px',
                  background: 'linear-gradient(45deg, #10b981, #14b8a6, #06b6d4, #10b981)',
                  backgroundSize: '300% 300%',
                  animation: 'gradientShift 4s ease infinite',
                  padding: '2px',
                  zIndex: -1
                }}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'rgba(15, 23, 42, 0.95)',
                    borderRadius: '28px'
                  }} />
                </div>
                
                {featuredEvents.length > 0 ? (
                  // Show first featured event if available
                  <>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      marginBottom: '20px'
                    }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'linear-gradient(45deg, #10b981, #14b8a6)',
                        borderRadius: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        animation: 'pulse 2s ease-in-out infinite'
                      }}>
                        <Calendar size={28} color="white" />
                      </div>
                      <h3 style={{ 
                        color: 'white', 
                        margin: 0,
                        fontSize: '1.8rem',
                        fontWeight: 800
                      }}>
                        {featuredEvents[0].title}
                      </h3>
                    </div>
                    
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '15px', 
                      marginBottom: '15px',
                      padding: '10px',
                      background: 'rgba(16, 185, 129, 0.1)',
                      borderRadius: '15px'
                    }}>
                      <MapPin size={24} style={{ color: '#10b981' }} />
                      <span style={{ color: 'white', fontSize: '1.1rem' }}>{featuredEvents[0].location}</span>
                    </div>
                    
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '15px', 
                      marginBottom: '30px',
                      padding: '10px',
                      background: 'rgba(16, 185, 129, 0.1)',
                      borderRadius: '15px'
                    }}>
                      <Clock size={24} style={{ color: '#10b981' }} />
                      <span style={{ color: 'white', fontSize: '1.1rem' }}>
                        {featuredEvents[0].time}, {new Date(featuredEvents[0].date).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <Link to={`/events/${featuredEvents[0].id}`} style={{
                      background: 'linear-gradient(45deg, #10b981, #14b8a6)',
                      border: 'none',
                      borderRadius: '25px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      padding: '18px',
                      fontSize: '1.1rem',
                      boxShadow: '0 10px 25px rgba(16, 185, 129, 0.4)',
                      transition: 'all 0.3s ease',
                      animation: 'pulse 3s ease-in-out infinite'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 15px 35px rgba(16, 185, 129, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.4)';
                    }}
                    >
                      <Zap size={24} />
                      Register Now
                      <ArrowRight size={20} />
                    </Link>
                  </>
                ) : (
                  // Show "Events Coming Soon" when no events
                  <>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        fontSize: '5rem',
                        marginBottom: '20px',
                        animation: 'bounce 2s ease-in-out infinite'
                      }}>
                        🎉
                      </div>
                      
                      <h3 style={{ 
                        color: 'white', 
                        marginBottom: '20px',
                        fontSize: '2rem',
                        fontWeight: 800,
                        background: 'linear-gradient(45deg, #10b981, #14b8a6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        Exciting Events Coming Soon!
                      </h3>
                      
                      <p style={{ 
                        color: 'rgba(255,255,255,0.8)', 
                        marginBottom: '30px', 
                        lineHeight: 1.7,
                        fontSize: '1.1rem'
                      }}>
                        ✨ We're preparing amazing events for you. Stay tuned for workshops, competitions, 
                        and community gatherings that will inspire and connect you.
                      </p>
                      
                      <Link to="/events" style={{
                        background: 'linear-gradient(45deg, #10b981, #14b8a6)',
                        border: 'none',
                        borderRadius: '25px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        padding: '18px',
                        fontSize: '1.1rem',
                        boxShadow: '0 10px 25px rgba(16, 185, 129, 0.4)',
                        transition: 'all 0.3s ease',
                        animation: 'pulse 3s ease-in-out infinite'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 15px 35px rgba(16, 185, 129, 0.6)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.4)';
                      }}
                      >
                        <Star size={24} />
                        Stay Updated
                        <ArrowRight size={20} />
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Event Benefits Section */}
      <section style={{ 
        padding: '40px 0', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(20, 184, 166, 0.05) 0%, transparent 50%)
          `,
          animation: 'float 6s ease-in-out infinite'
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="text-center mb-5" style={{
            animation: 'slideInUp 1s ease-out'
          }}>
            <h2 style={{ 
              fontSize: '1.4rem', 
              fontWeight: 700, 
              color: '#1e293b', 
              marginBottom: '0.6rem',
              background: 'linear-gradient(135deg, #1e293b, #10b981)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              🌟 EVENT BENEFITS
            </h2>
            <p style={{ 
              fontSize: '0.85rem', 
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Why Participate in Our Amazing Events
            </p>
          </div>
          
          <div className="row g-4">
            {[
              {
                icon: <Users size={50} />,
                title: 'Student Networking',
                desc: 'Connect with peers, faculty, and industry professionals to build valuable relationships.',
                color: '#10b981',
                delay: '0.1s'
              },
              {
                icon: <Trophy size={50} />,
                title: 'Skill Development',
                desc: 'Enhance your academic and extracurricular skills through workshops and competitions.',
                color: '#f59e0b',
                delay: '0.3s'
              },
              {
                icon: <Star size={50} />,
                title: 'Campus Community',
                desc: 'Be part of a vibrant college community and create lasting memories with fellow students.',
                color: '#8b5cf6',
                delay: '0.5s'
              }
            ].map((benefit, index) => (
              <div key={index} className="col-lg-4">
                <div style={{
                  background: 'white',
                  padding: '2rem 1.5rem',
                  borderRadius: '20px',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                  textAlign: 'center',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  border: '2px solid transparent',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: `slideInUp 1s ease-out ${benefit.delay} both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
                  e.currentTarget.style.boxShadow = `0 25px 50px ${benefit.color}20`;
                  e.currentTarget.style.borderColor = benefit.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
                >
                  {/* Hover Effect Background */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(90deg, transparent, ${benefit.color}10, transparent)`,
                    transition: 'left 0.6s ease'
                  }} />
                  
                  <div style={{
                    color: benefit.color,
                    marginBottom: '1.5rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${benefit.color}15, ${benefit.color}25)`,
                    position: 'relative',
                    animation: 'pulse 3s ease-in-out infinite'
                  }}>
                    {React.cloneElement(benefit.icon, { size: 40 })}
                    
                    {/* Sparkle effects */}
                    <Sparkles style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      color: benefit.color,
                      animation: 'sparkle 2s ease-in-out infinite'
                    }} size={14} />
                  </div>
                  
                  <h4 style={{ 
                    fontSize: '1rem', 
                    fontWeight: 700, 
                    color: '#1e293b', 
                    marginBottom: '0.8rem' 
                  }}>
                    {benefit.title}
                  </h4>
                  
                  <p style={{ 
                    color: '#64748b', 
                    lineHeight: 1.5,
                    fontSize: '0.85rem',
                    marginBottom: '1.2rem'
                  }}>
                    {benefit.desc}
                  </p>
                  
                  <Link to="/events" style={{
                    color: benefit.color,
                    textDecoration: 'none',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    borderRadius: '25px',
                    background: `${benefit.color}10`,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = benefit.color;
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${benefit.color}10`;
                    e.currentTarget.style.color = benefit.color;
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  >
                    Explore More <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '40px 0', background: 'linear-gradient(135deg, #1a365d 0%, #2b6cb0 100%)', color: 'white' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.6rem' }}>
              Our Impact
            </h2>
            <p style={{ fontSize: '0.85rem', opacity: 0.9 }}>
              Numbers that speak for themselves
            </p>
          </div>
          <div className="row g-4">
            {/* Statistics will be populated from real data */}
            <div className="col-12 text-center">
              <p style={{ fontSize: '1rem', opacity: 0.9, fontStyle: 'italic' }}>
                Real statistics will appear here once events are created and students start participating.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: '60px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1a365d', marginBottom: '0.8rem' }}>
              What Students Say
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#666' }}>
              Hear from our community
            </p>
          </div>
          <div className="row g-4">
            {/* Testimonials will be populated from real user feedback */}
            <div className="col-12 text-center">
              <p style={{ fontSize: '1rem', color: '#666', fontStyle: 'italic' }}>
                Real testimonials from your students will appear here once events are held and feedback is collected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={{ padding: '40px 0', background: 'white' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 style={{
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#333',
                marginBottom: '0.6rem',
                lineHeight: 1.2
              }}>
                Uniting Students Through<br />
                Academic Excellence
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  <Mic size={20} />
                </div>
                <div>
                  <h5 style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem' }}>Guest Speakers & Workshops</h5>
                  <p style={{ margin: 0, color: '#666', fontSize: '0.8rem' }}>
                    Learn from industry experts and enhance your knowledge through interactive sessions.
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  <Users size={20} />
                </div>
                <div>
                  <h5 style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem' }}>Student Organizers</h5>
                  <p style={{ margin: 0, color: '#666', fontSize: '0.8rem' }}>
                    Events organized by students, for students, fostering leadership and collaboration.
                  </p>
                </div>
              </div>
              <Link to="/events" className="btn btn-primary" style={{
                background: 'linear-gradient(45deg, #1a365d, #2b6cb0)',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '18px',
                fontWeight: 600,
                textDecoration: 'none',
                color: 'white',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '0.8rem'
              }}>
                Explore Events <ArrowRight size={14} />
              </Link>
            </div>
            <div className="col-lg-6">
              <div style={{
                background: '#000000',
                borderRadius: '15px',
                padding: '1.5rem',
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
                  <h3 style={{ marginBottom: '0.8rem', fontSize: '1.2rem' }}>Register for Events Today</h3>
                  <p style={{ marginBottom: '1.2rem', opacity: 0.9, fontSize: '0.9rem' }}>
                    Join thousands of students in exciting college events, from technical workshops
                    to cultural festivals, enhancing your college experience.
                  </p>
                  <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                    <Link to="/events" className="btn btn-light" style={{
                      borderRadius: '20px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      color: '#1a365d',
                      padding: '8px 20px',
                      fontSize: '0.85rem'
                    }}>
                      View Events
                    </Link>
                    <Link to="/contact" className="btn btn-outline-light" style={{
                      borderRadius: '20px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      padding: '8px 20px',
                      fontSize: '0.85rem'
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
                fontSize: '2.2rem',
                fontWeight: 900,
                marginBottom: '0.4rem',
                color: '#ff6b6b'
              }}>
                {events.filter(e => e.status === 'upcoming').length}+
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>Upcoming Events</div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div style={{
                fontSize: '2.2rem',
                fontWeight: 900,
                marginBottom: '0.4rem',
                color: '#ff6b6b'
              }}>
                {events.reduce((sum, event) => sum + (event.registered || 0), 0)}+
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>Total Registrations</div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div style={{
                fontSize: '2.2rem',
                fontWeight: 900,
                marginBottom: '0.4rem',
                color: '#ff6b6b'
              }}>
                {new Set(events.map(e => e.category)).size}+
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>Event Categories</div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div style={{
                fontSize: '2.2rem',
                fontWeight: 900,
                marginBottom: '0.4rem',
                color: '#ff6b6b'
              }}>
                50+
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>Student Participants</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section style={{ padding: '60px 0', background: 'white' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1a365d', marginBottom: '0.8rem' }}>
              Event Gallery
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#666' }}>
              Glimpses of our vibrant college events
            </p>
          </div>
          <div className="row g-3">
            {/* Event gallery images will be populated from real events */}
            <div className="col-12 text-center">
              <p style={{ fontSize: '1rem', color: '#666', fontStyle: 'italic' }}>
                Event photos will appear here once events are created and images are uploaded.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section style={{ padding: '60px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#333', marginBottom: '0.8rem' }}>
              Featured Events
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#666' }}>
              Discover exciting college events and register to participate
            </p>
          </div>
          <div className="row g-4">
            {featuredEvents.length > 0 ? (
              featuredEvents.map((event) => (
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
                          color: '#10b981',
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
              ))
            ) : (
              // Show "Events Coming Soon" message
              <div className="col-12">
                <div style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '4rem 2rem',
                  textAlign: 'center',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}>
                  <div style={{
                    fontSize: '5rem',
                    marginBottom: '2rem',
                    opacity: 0.7
                  }}>
                    🚀
                  </div>
                  <h3 style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: '#333',
                    marginBottom: '1rem'
                  }}>
                    Amazing Events Coming Soon!
                  </h3>
                  <p style={{
                    fontSize: '1.2rem',
                    color: '#666',
                    marginBottom: '2rem',
                    maxWidth: '600px',
                    margin: '0 auto 2rem'
                  }}>
                    We're working hard to bring you incredible events, workshops, and experiences. 
                    Be the first to know when new events are available!
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/register" style={{
                      background: 'linear-gradient(45deg, #10b981, #14b8a6)',
                      color: 'white',
                      padding: '12px 30px',
                      borderRadius: '50px',
                      textDecoration: 'none',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      Join Community
                      <ArrowRight size={16} />
                    </Link>
                    {user?.role === 'organizer' && (
                      <Link to="/create-event" style={{
                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                        color: 'white',
                        padding: '12px 30px',
                        borderRadius: '50px',
                        textDecoration: 'none',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        Create Event
                        <ArrowRight size={16} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          {featuredEvents.length > 0 && (
            <div className="text-center mt-5">
              <Link to="/events" className="btn btn-primary btn-lg" style={{
                background: 'linear-gradient(45deg, #10b981, #14b8a6)',
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
          )}
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
            {user?.role === 'organizer' && (
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
            {user?.role === 'student' && (
              <Link to="/events" className="btn btn-primary" style={{
                background: 'linear-gradient(45deg, #ed8936, #f59e0b)',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '50px',
                fontWeight: 600,
                textDecoration: 'none',
                color: 'white'
              }}>
                Browse Events
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin-panel" className="btn btn-primary" style={{
                background: 'linear-gradient(45deg, #ed8936, #f59e0b)',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '50px',
                fontWeight: 600,
                textDecoration: 'none',
                color: 'white'
              }}>
                Admin Panel
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
              Help & Support Center
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#cccccc' }}>
              Find answers to common questions and get in touch with our support team
            </p>
          </div>

          <div className="row g-5">
            {/* FAQ Section */}
            <div className="col-lg-8">
              <h3 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#10b981', marginBottom: '2rem' }}>
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
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

            {/* Contact Information */}
            <div className="col-lg-4">
              <h3 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#10b981', marginBottom: '2rem' }}>
                Contact Support
              </h3>
              
              <div style={{
                background: '#2a2a2a',
                borderRadius: '12px',
                border: '1px solid #404040',
                padding: '2rem'
              }}>
                <div className="space-y-4">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'rgba(16, 185, 129, 0.2)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Mail size={20} style={{ color: '#10b981' }} />
                    </div>
                    <div>
                      <p style={{ color: '#10b981', fontSize: '0.9rem', fontWeight: 600, margin: 0 }}>Email Support</p>
                      <a href="mailto:support@collegeevents.com" style={{ 
                        color: 'white', 
                        textDecoration: 'none',
                        fontSize: '0.95rem'
                      }}>
                        support@collegeevents.com
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'rgba(16, 185, 129, 0.2)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Phone size={20} style={{ color: '#10b981' }} />
                    </div>
                    <div>
                      <p style={{ color: '#10b981', fontSize: '0.9rem', fontWeight: 600, margin: 0 }}>Phone Support</p>
                      <a href="tel:+919876543210" style={{ 
                        color: 'white', 
                        textDecoration: 'none',
                        fontSize: '0.95rem'
                      }}>
                        +91 98765 43210
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'rgba(16, 185, 129, 0.2)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <MapPin size={20} style={{ color: '#10b981' }} />
                    </div>
                    <div>
                      <p style={{ color: '#10b981', fontSize: '0.9rem', fontWeight: 600, margin: 0 }}>Office Location</p>
                      <p style={{ color: 'white', margin: 0, fontSize: '0.95rem' }}>
                        College Campus<br />
                        Main Building, Room 101
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'rgba(16, 185, 129, 0.2)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Clock size={20} style={{ color: '#10b981' }} />
                    </div>
                    <div>
                      <p style={{ color: '#10b981', fontSize: '0.9rem', fontWeight: 600, margin: 0 }}>Office Hours</p>
                      <p style={{ color: 'white', margin: 0, fontSize: '0.95rem' }}>
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{
                  marginTop: '2rem',
                  padding: '1rem',
                  background: 'rgba(16, 185, 129, 0.1)',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <p style={{ color: '#10b981', fontSize: '0.9rem', fontWeight: 600, margin: '0 0 0.5rem 0' }}>
                    Response Time
                  </p>
                  <p style={{ color: 'white', margin: 0, fontSize: '0.95rem' }}>
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default SimpleHome;