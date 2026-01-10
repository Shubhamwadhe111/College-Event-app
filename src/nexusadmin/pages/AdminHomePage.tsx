import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, Users, Trophy, Shield, BarChart3, Activity, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import PortalLink from '../../components/PortalLink';

const AdminHomePage: React.FC = () => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="home-page" style={{ 
      minHeight: '100vh',
      background: 'transparent',
      position: 'relative',
      zIndex: 1,
      width: '100%'
    }}>
      {/* Hero Section */}
      <section className="hero-section" style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: isMobile ? '80px 1rem 2rem 1rem' : '2rem 0',
        width: '100%',
        marginTop: isMobile ? '0' : '0'
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
          paddingTop: isMobile ? '0' : '1rem',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : '0'
        }}>
          <div className="row align-items-center" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap'
          }}>
            <div className="col-lg-6" style={{
              flex: '1 1 500px',
              maxWidth: '600px'
            }}>
              <div style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 1s ease-out'
              }}>
                {/* Animated Title */}
                <div style={{ position: 'relative', marginBottom: isMobile ? '1rem' : '2rem' }}>
                  <h1 style={{
                    fontSize: isMobile ? '1.8rem' : 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: 900,
                    color: 'white',
                    marginBottom: '0',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    background: 'linear-gradient(135deg, #ffffff, #10b981, #14b8a6)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: '1.1',
                    letterSpacing: isMobile ? '-1px' : '-2px'
                  }}>
                    NEXUS ADMIN
                  </h1>
                  <h1 style={{
                    fontSize: isMobile ? '1.8rem' : 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: 900,
                    color: 'white',
                    margin: '0',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    background: 'linear-gradient(135deg, #10b981, #14b8a6, #ffffff)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: '1.1',
                    letterSpacing: isMobile ? '-1px' : '-2px'
                  }}>
                    PORTAL
                  </h1>
                  
                  {/* Sparkle Effects */}
                  <Sparkles style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    color: '#10b981',
                    animation: 'sparkle 2s ease-in-out infinite'
                  }} size={32} />
                </div>
                
                <h2 style={{
                  fontSize: isMobile ? '1.1rem' : '1.6rem',
                  fontWeight: 700,
                  color: '#10b981',
                  marginBottom: isMobile ? '1rem' : '2rem',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                  animation: 'slideInLeft 1s ease-out 0.5s both'
                }}>
                  <Trophy style={{ display: 'inline', marginRight: '10px', color: '#f59e0b' }} size={isMobile ? 20 : 32} />
                  College Event Management Hub
                </h2>
                
                <p style={{
                  fontSize: isMobile ? '0.95rem' : '1.1rem',
                  color: 'rgba(255,255,255,0.9)',
                  marginBottom: isMobile ? '1.5rem' : '3rem',
                  lineHeight: 1.7,
                  animation: 'slideInLeft 1s ease-out 0.7s both',
                  maxWidth: '600px'
                }}>
                  🎓 Manage college events, oversee student activities, monitor registrations,
                  and maintain comprehensive control over your institution's event ecosystem.
                </p>
                
                <div style={{ 
                  display: 'flex', 
                  gap: '1.5rem', 
                  flexWrap: 'wrap',
                  animation: 'slideInUp 1s ease-out 0.9s both'
                }}>
                  {!user ? (
                    <>
                      <PortalLink to="/login" className="btn btn-primary btn-lg" style={{
                        background: 'linear-gradient(45deg, #10b981, #14b8a6, #06b6d4)',
                        backgroundSize: '200% 200%',
                        border: 'none',
                        padding: '15px 35px',
                        borderRadius: '50px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        color: 'white',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)',
                        animation: 'gradientShift 3s ease infinite, pulse 2s ease-in-out infinite',
                        transform: 'translateY(0)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(16, 185, 129, 0.6)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.4)';
                      }}
                      >
                        <Shield size={24} />
                        Admin Login
                        <ArrowRight size={20} />
                      </PortalLink>
                      
                      <PortalLink to="/register" className="btn btn-outline-light btn-lg" style={{
                        border: '3px solid rgba(255,255,255,0.3)',
                        color: 'white',
                        padding: '15px 35px',
                        borderRadius: '50px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                        e.currentTarget.style.borderColor = '#10b981';
                        e.currentTarget.style.color = '#10b981';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                      >
                        <Users size={20} />
                        Register Admin
                      </PortalLink>
                    </>
                  ) : (
                    <>
                      <PortalLink to="/dashboard" className="btn btn-primary btn-lg" style={{
                        background: 'linear-gradient(45deg, #10b981, #14b8a6, #06b6d4)',
                        backgroundSize: '200% 200%',
                        border: 'none',
                        padding: '15px 35px',
                        borderRadius: '50px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        color: 'white',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)',
                        animation: 'gradientShift 3s ease infinite, pulse 2s ease-in-out infinite',
                        transform: 'translateY(0)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(16, 185, 129, 0.6)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.4)';
                      }}
                      >
                        <BarChart3 size={24} />
                        Admin Dashboard
                        <ArrowRight size={20} />
                      </PortalLink>
                      
                      <PortalLink to="/events" className="btn btn-outline-light btn-lg" style={{
                        border: '3px solid rgba(255,255,255,0.3)',
                        color: 'white',
                        padding: '15px 35px',
                        borderRadius: '50px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                        e.currentTarget.style.borderColor = '#10b981';
                        e.currentTarget.style.color = '#10b981';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                      >
                        <Calendar size={20} />
                        Manage Events
                      </PortalLink>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-6" style={{
              flex: '1 1 500px',
              maxWidth: '600px'
            }}>
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
                
                {user ? (
                  // Show admin welcome if logged in
                  <>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      marginBottom: '20px'
                    }}>
                      <div style={{
                        width: '70px',
                        height: '70px',
                        background: 'linear-gradient(45deg, #10b981, #14b8a6)',
                        borderRadius: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        animation: 'pulse 2s ease-in-out infinite',
                        boxShadow: '0 0 30px rgba(16, 185, 129, 0.5)'
                      }}>
                        <Shield size={35} color="white" />
                      </div>
                      <h3 style={{ 
                        color: 'white', 
                        margin: 0,
                        fontSize: '1.5rem',
                        fontWeight: 800
                      }}>
                        Admin {user.name}
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
                      <Activity size={24} style={{ color: '#10b981' }} />
                      <span style={{ color: 'white', fontSize: '1rem' }}>
                        College Portal Active
                      </span>
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
                      <TrendingUp size={24} style={{ color: '#10b981' }} />
                      <span style={{ color: 'white', fontSize: '1rem' }}>
                        Event Management Ready
                      </span>
                    </div>
                    
                    <PortalLink to="/dashboard" style={{
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
                      fontSize: '1rem',
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
                      <BarChart3 size={24} />
                      Admin Control
                      <ArrowRight size={20} />
                    </PortalLink>
                  </>
                ) : (
                  // Show login prompt if not logged in
                  <>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        fontSize: '5rem',
                        marginBottom: '20px',
                        animation: 'bounce 2s ease-in-out infinite'
                      }}>
                        🎓
                      </div>
                      
                      <h3 style={{ 
                        color: 'white', 
                        marginBottom: '20px',
                        fontSize: '1.7rem',
                        fontWeight: 800,
                        background: 'linear-gradient(45deg, #10b981, #14b8a6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        Admin Access Required
                      </h3>
                      
                      <p style={{ 
                        color: 'rgba(255,255,255,0.8)', 
                        marginBottom: '30px', 
                        lineHeight: 1.7,
                        fontSize: '1rem'
                      }}>
                        🔐 Admin login required for college event management. Access student registrations,
                        manage events, and oversee your institution's activities.
                      </p>
                      
                      <PortalLink to="/login" style={{
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
                        fontSize: '1rem',
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
                        <Shield size={24} />
                        Admin Login
                        <ArrowRight size={20} />
                      </PortalLink>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Features Section */}
      <section style={{ 
        padding: '100px 0', 
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
              fontSize: '2.2rem', 
              fontWeight: 800, 
              color: '#1e293b', 
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #1e293b, #10b981)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              🎓 ADMIN FEATURES
            </h2>
            <p style={{ 
              fontSize: '1.1rem', 
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Comprehensive College Event Management Tools
            </p>
          </div>
          
          <div className="row g-4" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch',
            gap: '2rem',
            flexWrap: 'wrap',
            margin: '0 auto',
            maxWidth: '1200px'
          }}>
            {[
              {
                icon: <Calendar size={50} />,
                title: 'Event Management',
                desc: 'Create, edit, and manage college events with full control over registrations and attendance.',
                color: '#10b981',
                delay: '0.1s'
              },
              {
                icon: <Users size={50} />,
                title: 'Student Oversight',
                desc: 'Monitor student registrations, manage user accounts, and track participation across events.',
                color: '#f59e0b',
                delay: '0.3s'
              },
              {
                icon: <BarChart3 size={50} />,
                title: 'Analytics & Reports',
                desc: 'Access detailed analytics, generate reports, and track event performance and engagement.',
                color: '#8b5cf6',
                delay: '0.5s'
              }
            ].map((feature, index) => (
              <div key={index} style={{
                flex: '0 0 350px',
                maxWidth: '350px'
              }}>
                <div style={{
                  background: 'white',
                  padding: '3rem 2rem',
                  borderRadius: '25px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  textAlign: 'center',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  border: '2px solid transparent',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: `slideInUp 1s ease-out ${feature.delay} both`,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
                  e.currentTarget.style.boxShadow = `0 25px 50px ${feature.color}20`;
                  e.currentTarget.style.borderColor = feature.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
                >
                  <div style={{
                    color: feature.color,
                    marginBottom: '2rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}25)`,
                    position: 'relative',
                    margin: '0 auto'
                  }}>
                    {feature.icon}
                    
                    {/* Sparkle effects */}
                    <Sparkles style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      color: feature.color,
                      animation: 'sparkle 2s ease-in-out infinite'
                    }} size={16} />
                  </div>
                  
                  <h4 style={{ 
                    fontSize: '1.3rem', 
                    fontWeight: 700, 
                    color: '#1e293b', 
                    marginBottom: '1.5rem' 
                  }}>
                    {feature.title}
                  </h4>
                  
                  <p style={{ 
                    color: '#64748b', 
                    lineHeight: 1.7,
                    fontSize: '0.95rem',
                    marginBottom: '2rem',
                    flex: 1
                  }}>
                    {feature.desc}
                  </p>
                  
                  <div style={{
                    color: feature.color,
                    textDecoration: 'none',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    borderRadius: '25px',
                    background: `${feature.color}10`,
                    transition: 'all 0.3s ease',
                    justifyContent: 'center'
                  }}>
                    Learn More
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminHomePage;
