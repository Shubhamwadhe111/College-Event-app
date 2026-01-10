// Main Website Navbar Component - Simple Navigation with Role-Based Menu
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Zap, Menu, X, LogOut, User, Sparkles, Briefcase } from 'lucide-react';
import NotificationCenter from '../NotificationCenter';

interface NavItem {
  name: string;
  href: string;
  current: boolean;
}

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen, isMobile]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  // Navigation items based on user role
  const getNavigationItems = (): NavItem[] => {
    // Base items for all users (logged out)
    const baseItems: NavItem[] = [
      { name: 'Home', href: '/', current: location.pathname === '/' },
      { name: 'Events', href: '/events', current: location.pathname === '/events' || location.pathname.startsWith('/events/') },
      { name: 'Gallery', href: '/gallery', current: location.pathname === '/gallery' },
      { name: 'About', href: '/about', current: location.pathname === '/about' },
    ];

    if (!user) {
      return baseItems;
    }

    // Student navigation
    if (user.role === 'student') {
      return [
        ...baseItems,
        { name: 'My Events', href: '/my-events', current: location.pathname === '/my-events' },
        { name: 'Notices', href: '/notices', current: location.pathname === '/notices' },
        { name: 'Help', href: '/help', current: location.pathname === '/help' },
      ];
    }

    // Organizer navigation - Event management focused
    if (user.role === 'organizer') {
      return [
        { name: 'Home', href: '/', current: location.pathname === '/' },
        { name: 'My Events', href: '/my-events', current: location.pathname === '/my-events' },
        { name: 'Create Event', href: '/create-event', current: location.pathname === '/create-event' },
        { name: 'All Events', href: '/events', current: location.pathname === '/events' || location.pathname.startsWith('/events/') },
        { name: 'Notices', href: '/notices', current: location.pathname === '/notices' },
        { name: 'Help', href: '/help', current: location.pathname === '/help' },
      ];
    }

    return baseItems;
  };

  const navigation = getNavigationItems();
  const isOrganizer = user?.role === 'organizer';

  // Theme colors based on role
  const themeColor = isOrganizer ? '#f59e0b' : '#10b981';
  const themeGradient = isOrganizer 
    ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' 
    : 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)',
        backdropFilter: 'blur(25px) saturate(180%)',
        borderBottom: `1px solid rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.3)`,
        boxShadow: `0 8px 32px rgba(0, 0, 0, 0.2), 0 0 60px rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.1)`,
        zIndex: 9999,
        height: '65px',
        WebkitBackdropFilter: 'blur(25px) saturate(180%)'
      }}>
        <div style={{
          maxWidth: '1600px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Brand */}
          <Link 
            to="/" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textDecoration: 'none',
              color: '#e2e8f0',
              flexShrink: 0
            }}
            onClick={() => setIsMenuOpen(false)}
          >
            <div style={{
              width: '42px',
              height: '42px',
              background: themeGradient,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 800,
              boxShadow: `0 4px 15px rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.4)`
            }}>
              {isOrganizer ? <Briefcase size={22} strokeWidth={2.5} /> : <Zap size={22} strokeWidth={2.5} />}
            </div>
            <div style={{ display: isMobile ? 'none' : 'flex', flexDirection: 'column' }}>
              <span style={{
                fontSize: '1.1rem',
                fontWeight: 900,
                background: isOrganizer 
                  ? 'linear-gradient(135deg, #ffffff 0%, #f59e0b 50%, #d97706 100%)'
                  : 'linear-gradient(135deg, #ffffff 0%, #10b981 50%, #14b8a6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                lineHeight: '1.1'
              }}>NEXUS</span>
              <span style={{
                fontSize: '0.6rem',
                fontWeight: 700,
                color: `rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.9)`,
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}>{isOrganizer ? 'Organizer Portal' : 'Event Portal'}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div style={{
            display: isMobile ? 'none' : 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flex: 1,
            justifyContent: 'center',
            maxWidth: '750px'
          }}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                style={{
                  textDecoration: 'none',
                  color: item.current ? '#ffffff' : '#cbd5e1',
                  fontWeight: item.current ? 700 : 600,
                  padding: '0.5rem 0.85rem',
                  borderRadius: '10px',
                  transition: 'all 0.3s ease',
                  fontSize: '0.78rem',
                  background: item.current 
                    ? `linear-gradient(135deg, rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.25), rgba(${isOrganizer ? '217, 119, 6' : '20, 184, 166'}, 0.2))` 
                    : 'transparent',
                  border: item.current 
                    ? `1px solid rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.5)` 
                    : '1px solid transparent',
                  backdropFilter: 'blur(10px)',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  boxShadow: item.current ? `0 2px 8px rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.2)` : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!item.current) {
                    e.currentTarget.style.background = `rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.1)`;
                    e.currentTarget.style.color = themeColor;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!item.current) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#cbd5e1';
                  }
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Section & Mobile Menu Button */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexShrink: 0
          }}>
            {/* User Info - Desktop Only */}
            {user && !isMobile && (
              <>
                <NotificationCenter />
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.5rem 1rem',
                  background: `rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.1)`,
                  borderRadius: '25px',
                  border: `1px solid rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.2)`
                }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: themeGradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1rem',
                    boxShadow: `0 2px 8px rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.3)`
                  }}>
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
                    ) : (
                      <span>{user.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff' }}>{user.name}</div>
                    <div style={{ 
                      fontSize: '0.6rem', 
                      fontWeight: 500, 
                      color: `rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.9)`, 
                      textTransform: 'uppercase' 
                    }}>{user.role}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    style={{
                      padding: '0.4rem 0.8rem',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      borderRadius: '8px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: '0.65rem',
                      background: 'rgba(239, 68, 68, 0.15)',
                      color: '#ffffff',
                      backdropFilter: 'blur(10px)',
                      textTransform: 'uppercase',
                      marginLeft: '0.5rem',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                    }}
                  >
                    <LogOut size={12} />
                    Logout
                  </button>
                </div>
              </>
            )}

            {/* Auth Buttons - Desktop Only */}
            {!user && !isMobile && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Link
                  to="/register"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px 18px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    border: 'none',
                    borderRadius: '25px',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    textDecoration: 'none',
                    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.4)';
                  }}
                >
                  <Sparkles size={14} style={{ marginRight: '6px' }} />
                  Sign Up
                </Link>
                
                <Link
                  to="/login"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px 18px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '2px solid rgba(16, 185, 129, 0.4)',
                    borderRadius: '25px',
                    color: '#10b981',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)';
                    e.currentTarget.style.borderColor = '#10b981';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <User size={14} style={{ marginRight: '6px' }} />
                  Login
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '45px',
                  height: '45px',
                  color: isMenuOpen ? '#ffffff' : themeColor,
                  background: isMenuOpen 
                    ? `linear-gradient(135deg, rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.4), rgba(${isOrganizer ? '217, 119, 6' : '20, 184, 166'}, 0.3))` 
                    : `rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.15)`,
                  border: `2px solid rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.6)`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  boxShadow: isMenuOpen 
                    ? `0 6px 20px rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.5)` 
                    : `0 4px 15px rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.3)`,
                  zIndex: 10001
                }}
              >
                {isMenuOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobile && isMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '65px',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)',
          backdropFilter: 'blur(25px)',
          zIndex: 9998,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          borderTop: `2px solid rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.4)`
        }}>
          <div style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: item.current ? '#ffffff' : '#cbd5e1',
                  background: item.current 
                    ? `linear-gradient(135deg, rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.3), rgba(${isOrganizer ? '217, 119, 6' : '20, 184, 166'}, 0.25))` 
                    : 'rgba(255, 255, 255, 0.08)',
                  border: item.current 
                    ? `2px solid rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.6)` 
                    : '1px solid rgba(255, 255, 255, 0.15)',
                  fontWeight: item.current ? 700 : 600,
                  fontSize: '0.95rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile User/Auth Section */}
          <div style={{
            padding: '1rem',
            borderTop: `2px solid rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.3)`,
            background: 'rgba(0, 0, 0, 0.3)'
          }}>
            {user ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem',
                background: `rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.1)`,
                borderRadius: '12px',
                border: `2px solid rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.3)`
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: themeGradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '1.1rem'
                }}>
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
                  ) : (
                    <span>{user.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>{user.name}</div>
                  <div style={{ 
                    fontSize: '0.7rem', 
                    fontWeight: 500, 
                    color: `rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.9)`, 
                    textTransform: 'uppercase' 
                  }}>{user.role}</div>
                </div>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.7rem',
                    background: 'rgba(239, 68, 68, 0.15)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.75rem',
                    border: 'none',
                    borderRadius: '25px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
                    textTransform: 'uppercase'
                  }}
                >
                  <Sparkles size={14} style={{ marginRight: '6px' }} />
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.75rem',
                    border: '2px solid rgba(16, 185, 129, 0.4)',
                    borderRadius: '25px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: '#10b981',
                    textTransform: 'uppercase'
                  }}
                >
                  <User size={14} style={{ marginRight: '6px' }} />
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
