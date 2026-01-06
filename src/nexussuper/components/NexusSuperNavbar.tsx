// NexusSuper Navbar Component - COMPLETE MOBILE SIDEBAR FIX v10 - 2025-01-06
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Crown, Menu, X, User, LogOut } from 'lucide-react';
import PortalLink from '../../components/PortalLink';

const NexusSuperNavbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = '0';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isMenuOpen, isMobile]);

  const navigation = [
    { name: 'Home', href: '/', current: location.pathname === '/nexussuper/' || location.pathname === '/nexussuper' },
    { name: 'Dashboard', href: '/dashboard', current: location.pathname === '/nexussuper/dashboard' },
    { name: 'Colleges', href: '/colleges', current: location.pathname === '/nexussuper/colleges' },
    { name: 'Admins', href: '/admins', current: location.pathname === '/nexussuper/admins' },
    { name: 'Events', href: '/events', current: location.pathname === '/nexussuper/events' },
    { name: 'Analytics', href: '/analytics', current: location.pathname === '/nexussuper/analytics' },
    { name: 'Command Center', href: '/command-center', current: location.pathname === '/nexussuper/command-center' },
    { name: 'System Settings', href: '/system-settings', current: location.pathname === '/nexussuper/system-settings' },
    { name: 'Notifications', href: '/notifications', current: location.pathname === '/nexussuper/notifications' },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/nexussuper/';
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)',
        backdropFilter: 'blur(25px) saturate(180%)',
        borderBottom: '1px solid rgba(16, 185, 129, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 60px rgba(16, 185, 129, 0.1)',
        zIndex: 9999,
        height: '60px',
        WebkitBackdropFilter: 'blur(25px) saturate(180%)'
      }}>
        <div style={{
          maxWidth: '1600px',
          margin: '0 auto',
          padding: '0 1rem',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Brand */}
          <PortalLink 
            to="/" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textDecoration: 'none',
              color: '#e2e8f0',
              flexShrink: 0
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 800,
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
            }}>
              <Crown size={20} strokeWidth={2.5} />
            </div>
            <div style={{ display: isMobile ? 'none' : 'flex', flexDirection: 'column' }}>
              <span style={{
                fontSize: '1rem',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #ffffff 0%, #10b981 50%, #14b8a6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                lineHeight: '1.1'
              }}>NEXUS MASTER</span>
              <span style={{
                fontSize: '0.6rem',
                fontWeight: 700,
                color: 'rgba(16, 185, 129, 0.9)',
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}>Master Portal</span>
            </div>
          </PortalLink>

          {/* Desktop Navigation */}
          <div style={{
            display: isMobile ? 'none' : 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            flex: 1,
            justifyContent: 'center',
            maxWidth: '1000px',
            overflow: 'hidden'
          }}>
            {navigation.map((item) => (
              <PortalLink
                key={item.name}
                to={item.href}
                style={{
                  textDecoration: 'none',
                  color: item.current ? '#ffffff' : '#cbd5e1',
                  fontWeight: item.current ? 700 : 600,
                  padding: '0.3rem 0.5rem',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  fontSize: '0.6rem',
                  background: item.current 
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(20, 184, 166, 0.2))' 
                    : 'transparent',
                  border: item.current 
                    ? '1px solid rgba(16, 185, 129, 0.5)' 
                    : '1px solid transparent',
                  backdropFilter: 'blur(10px)',
                  letterSpacing: '0.2px',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  minWidth: 'fit-content',
                  boxShadow: item.current 
                    ? '0 2px 8px rgba(16, 185, 129, 0.2)' 
                    : 'none'
                }}
              >
                {item.name}
              </PortalLink>
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
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 1rem',
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '20px',
                border: '1px solid rgba(16, 185, 129, 0.2)'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10b981, #34d399)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '1rem'
                }}>
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
                  ) : (
                    <span>{user.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div>
                  <div style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#ffffff'
                  }}>{user.name}</div>
                  <div style={{
                    fontSize: '0.6rem',
                    fontWeight: 500,
                    color: 'rgba(16, 185, 129, 0.9)',
                    textTransform: 'uppercase'
                  }}>Master Admin</div>
                </div>
              </div>
            )}

            {/* Auth Buttons - Desktop Only */}
            {!user && !isMobile && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <PortalLink
                  to="/register"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.6rem 1.2rem',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    background: 'linear-gradient(135deg, #10b981, #34d399)',
                    color: 'white',
                    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                  }}
                >
                  Sign Up
                </PortalLink>
                <PortalLink
                  to="/login"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.6rem 1.2rem',
                    border: '2px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '10px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: '#ffffff',
                    backdropFilter: 'blur(15px)'
                  }}
                >
                  Login
                </PortalLink>
              </div>
            )}

            {/* Mobile Menu Button - ALWAYS VISIBLE ON MOBILE */}
            {isMobile && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '45px',
                  height: '45px',
                  color: isMenuOpen ? '#ffffff' : '#10b981',
                  background: isMenuOpen 
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.4), rgba(20, 184, 166, 0.3))' 
                    : 'rgba(16, 185, 129, 0.15)',
                  border: '2px solid rgba(16, 185, 129, 0.6)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  boxShadow: isMenuOpen 
                    ? '0 6px 20px rgba(16, 185, 129, 0.5)' 
                    : '0 4px 15px rgba(16, 185, 129, 0.3)',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  zIndex: 10001
                }}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Sidebar */}
      {isMobile && (
        <>
          {/* Background Overlay */}
          {isMenuOpen && (
            <div 
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.7)',
                zIndex: 9998,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                opacity: isMenuOpen ? 1 : 0,
                transition: 'opacity 0.3s ease'
              }}
              onClick={() => setIsMenuOpen(false)}
            />
          )}
          
          {/* Sidebar Panel */}
          <div 
            style={{
              position: 'fixed',
              top: 0,
              right: isMenuOpen ? 0 : '-100%',
              width: '320px',
              maxWidth: '80vw',
              height: '100vh',
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)',
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
              zIndex: 10000,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.5)',
              borderLeft: '2px solid rgba(16, 185, 129, 0.4)',
              transition: 'right 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {/* Sidebar Header */}
            <div style={{
              padding: '1.5rem 1rem',
              borderBottom: '2px solid rgba(16, 185, 129, 0.3)',
              background: 'rgba(16, 185, 129, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #10b981, #14b8a6)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
                }}>
                  <Crown size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <div style={{
                    color: '#ffffff',
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                  }}>
                    NEXUS MASTER
                  </div>
                  <div style={{
                    color: 'rgba(16, 185, 129, 0.9)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}>
                    Mobile Menu
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setIsMenuOpen(false)}
                style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '2px solid rgba(239, 68, 68, 0.5)',
                  borderRadius: '10px',
                  color: '#ffffff',
                  padding: '0.75rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  touchAction: 'manipulation',
                  transition: 'all 0.3s ease'
                }}
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Navigation Items */}
            <div style={{
              flex: 1,
              padding: '1rem',
              paddingBottom: '180px', // Space for auth buttons/user section + footer
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              minHeight: 0 // Allow flex shrinking
            }}>
              {navigation.map((item, index) => (
                <PortalLink
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
                      ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(20, 184, 166, 0.25))' 
                      : 'rgba(255, 255, 255, 0.08)',
                    border: item.current 
                      ? '2px solid rgba(16, 185, 129, 0.6)' 
                      : '1px solid rgba(255, 255, 255, 0.15)',
                    fontWeight: item.current ? 700 : 600,
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                    boxShadow: item.current 
                      ? '0 6px 20px rgba(16, 185, 129, 0.4)' 
                      : '0 3px 10px rgba(0, 0, 0, 0.15)',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    minHeight: '55px',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent'
                  }}
                >
                  {/* Number Badge */}
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: item.current 
                      ? 'linear-gradient(135deg, #10b981, #14b8a6)' 
                      : 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: item.current ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                    marginRight: '12px',
                    flexShrink: 0,
                    border: item.current ? 'none' : '1px solid rgba(255, 255, 255, 0.3)'
                  }}>
                    {index + 1}
                  </div>
                  
                  <span style={{ 
                    flex: 1,
                    textAlign: 'left',
                    fontSize: '0.9rem',
                    fontWeight: item.current ? 700 : 600
                  }}>
                    {item.name}
                  </span>
                  
                  {/* Active Arrow */}
                  {item.current && (
                    <div style={{
                      width: '0',
                      height: '0',
                      borderLeft: '8px solid #10b981',
                      borderTop: '5px solid transparent',
                      borderBottom: '5px solid transparent',
                      marginLeft: '8px'
                    }} />
                  )}
                </PortalLink>
              ))}

              {/* User Section */}
              {user && (
                <div style={{
                  position: 'absolute',
                  bottom: '80px', // Above the footer
                  left: '1rem',
                  right: '1rem',
                  padding: '1rem',
                  background: 'rgba(16, 185, 129, 0.1)',
                  borderRadius: '12px',
                  border: '2px solid rgba(16, 185, 129, 0.3)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #10b981, #34d399)',
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
                    <div>
                      <div style={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        color: '#ffffff'
                      }}>{user.name}</div>
                      <div style={{
                        fontSize: '0.7rem',
                        fontWeight: 500,
                        color: 'rgba(16, 185, 129, 0.9)',
                        textTransform: 'uppercase'
                      }}>Master Admin</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <PortalLink
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.75rem',
                        border: '1px solid rgba(16, 185, 129, 0.4)',
                        borderRadius: '10px',
                        fontWeight: 600,
                        textDecoration: 'none',
                        fontSize: '0.8rem',
                        gap: '0.5rem',
                        background: 'rgba(16, 185, 129, 0.15)',
                        color: '#ffffff',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <User size={16} />
                      Panel
                    </PortalLink>
                    <button
                      onClick={handleLogout}
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.75rem',
                        border: '1px solid rgba(239, 68, 68, 0.4)',
                        borderRadius: '10px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        gap: '0.5rem',
                        background: 'rgba(239, 68, 68, 0.15)',
                        color: '#ffffff',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}

              {/* Auth Buttons for Mobile when not logged in */}
              {!user && (
                <div style={{
                  position: 'absolute',
                  bottom: '80px', // Above the footer
                  left: '1rem',
                  right: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}>
                  <PortalLink
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '1rem',
                      border: 'none',
                      borderRadius: '12px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      fontSize: '1rem',
                      background: 'linear-gradient(135deg, #10b981, #34d399)',
                      color: 'white',
                      boxShadow: '0 6px 20px rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    Sign Up
                  </PortalLink>
                  <PortalLink
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '1rem',
                      border: '2px solid rgba(16, 185, 129, 0.4)',
                      borderRadius: '12px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      fontSize: '1rem',
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#ffffff',
                      backdropFilter: 'blur(15px)'
                    }}
                  >
                    Login
                  </PortalLink>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div style={{
              padding: '1.5rem 1rem',
              borderTop: '2px solid rgba(16, 185, 129, 0.3)',
              background: 'rgba(0, 0, 0, 0.3)',
              textAlign: 'center',
              flexShrink: 0
            }}>
              <div style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.8rem',
                fontWeight: 600,
                marginBottom: '0.5rem'
              }}>
                All {navigation.length} Options Available
              </div>
              <div style={{
                color: 'rgba(16, 185, 129, 0.9)',
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'uppercase'
              }}>
                Master Management System
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NexusSuperNavbar;