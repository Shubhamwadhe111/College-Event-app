// NexusSuper Navbar Component - COMPLETE MOBILE SIDEBAR FIX v10 - 2025-01-06
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Crown, Menu, X, User, LogOut, Bell, Settings, ChevronDown } from 'lucide-react';
import PortalLink from '../../components/PortalLink';

const NexusSuperNavbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // Main navigation items (visible in navbar)
  const navigation = [
    { name: 'Home', href: '/', current: location.pathname === '/nexussuper/' || location.pathname === '/nexussuper' },
    { name: 'Dashboard', href: '/dashboard', current: location.pathname === '/nexussuper/dashboard' },
    { name: 'Admins', href: '/admins', current: location.pathname === '/nexussuper/admins' },
    { name: 'Analytics', href: '/analytics', current: location.pathname === '/nexussuper/analytics' },
    { name: 'Command Center', href: '/command-center', current: location.pathname === '/nexussuper/command-center' },
    { name: 'System Settings', href: '/system-settings', current: location.pathname === '/nexussuper/system-settings' },
  ];
  
  // Hidden items (only in mobile menu)
  const moreNavigation = [
    { name: 'Colleges', href: '/colleges', current: location.pathname === '/nexussuper/colleges' },
    { name: 'Events', href: '/events', current: location.pathname === '/nexussuper/events' },
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
        height: '50px',
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
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 800,
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
            }}>
              <Crown size={16} strokeWidth={2.5} />
            </div>
            <div style={{ display: isMobile ? 'none' : 'flex', flexDirection: 'column' }}>
              <span style={{
                fontSize: '1rem',
                fontWeight: 900,
                color: '#10b981',
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
            gap: '0.5rem',
            flex: 1,
            justifyContent: 'center',
            maxWidth: '800px',
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
                  padding: '0.5rem 0.7rem',
                  borderRadius: '10px',
                  transition: 'all 0.3s ease',
                  fontSize: '0.75rem',
                  background: item.current 
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(20, 184, 166, 0.2))' 
                    : 'transparent',
                  border: item.current 
                    ? '1px solid rgba(16, 185, 129, 0.5)' 
                    : '1px solid transparent',
                  backdropFilter: 'blur(10px)',
                  letterSpacing: '0.3px',
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
            {/* Notification Bell - Desktop Only */}
            {user && !isMobile && (
              <div ref={notificationRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => {
                    setIsNotificationOpen(!isNotificationOpen);
                    setIsProfileOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    color: '#10b981',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  <Bell size={26} />
                  {/* Notification Badge */}
                  <span style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    width: '8px',
                    height: '8px',
                    background: '#ef4444',
                    borderRadius: '50%',
                    border: '2px solid #0f172a'
                  }} />
                </button>
                
                {/* Notification Dropdown */}
                {isNotificationOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '45px',
                    right: 0,
                    width: '300px',
                    background: 'rgba(15, 23, 42, 0.98)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
                    zIndex: 10000,
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      padding: '1rem',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ color: '#ffffff', fontWeight: 600 }}>Notifications</span>
                      <span style={{ color: '#10b981', fontSize: '0.75rem', cursor: 'pointer' }}>Mark all read</span>
                    </div>
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                      <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
                        <p style={{ color: '#ffffff', fontSize: '0.85rem', margin: 0 }}>New college registration</p>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>5 minutes ago</p>
                      </div>
                      <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
                        <p style={{ color: '#ffffff', fontSize: '0.85rem', margin: 0 }}>System health alert</p>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>30 minutes ago</p>
                      </div>
                      <div style={{ padding: '0.75rem 1rem', cursor: 'pointer' }}>
                        <p style={{ color: '#ffffff', fontSize: '0.85rem', margin: 0 }}>Admin approval pending</p>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>2 hours ago</p>
                      </div>
                    </div>
                    <PortalLink
                      to="/notifications"
                      onClick={() => setIsNotificationOpen(false)}
                      style={{
                        display: 'block',
                        padding: '0.75rem 1rem',
                        textAlign: 'center',
                        color: '#10b981',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        borderTop: '1px solid rgba(255,255,255,0.1)'
                      }}
                    >
                      View All Notifications
                    </PortalLink>
                  </div>
                )}
              </div>
            )}

            {/* User Profile Dropdown - Desktop Only */}
            {user && !isMobile && (
              <div ref={profileRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => {
                    setIsProfileOpen(!isProfileOpen);
                    setIsNotificationOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.35rem 0.7rem 0.35rem 0.4rem',
                    background: 'rgba(16, 185, 129, 0.1)',
                    borderRadius: '25px',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10b981, #34d399)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.85rem'
                  }}>
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
                    ) : (
                      <span>{user.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      lineHeight: 1.2
                    }}>{user.name}</div>
                    <div style={{
                      fontSize: '0.55rem',
                      fontWeight: 500,
                      color: 'rgba(16, 185, 129, 0.9)',
                      textTransform: 'uppercase'
                    }}>Master Admin</div>
                  </div>
                  <ChevronDown 
                    size={14} 
                    color="#10b981" 
                    style={{ 
                      transform: isProfileOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease'
                    }} 
                  />
                </button>
                
                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '45px',
                    right: 0,
                    width: '200px',
                    background: 'rgba(15, 23, 42, 0.98)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
                    zIndex: 10000,
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      padding: '1rem',
                      borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <p style={{ color: '#ffffff', fontWeight: 600, margin: 0, fontSize: '0.9rem' }}>{user.name}</p>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>{user.email}</p>
                    </div>
                    <div style={{ padding: '0.5rem' }}>
                      <PortalLink
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.75rem',
                          color: '#cbd5e1',
                          textDecoration: 'none',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          transition: 'background 0.2s ease'
                        }}
                      >
                        <User size={16} />
                        My Profile
                      </PortalLink>
                      <PortalLink
                        to="/settings"
                        onClick={() => setIsProfileOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.75rem',
                          color: '#cbd5e1',
                          textDecoration: 'none',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          transition: 'background 0.2s ease'
                        }}
                      >
                        <Settings size={16} />
                        Settings
                      </PortalLink>
                    </div>
                    <div style={{ padding: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          handleLogout();
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          width: '100%',
                          padding: '0.75rem',
                          color: '#ef4444',
                          background: 'transparent',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'background 0.2s ease'
                        }}
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Auth Buttons - Desktop Only - Modern Pill Design */}
            {!user && !isMobile && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Sign Up Button - Compact gradient pill */}
                <PortalLink
                  to="/register"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '5px 12px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    border: 'none',
                    borderRadius: '20px',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.35)',
                    transition: 'all 0.25s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.3px',
                    minWidth: '70px'
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.5)';
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.35)';
                  }}
                >
                  Sign Up
                </PortalLink>
                
                {/* Login Button - Glass pill style */}
                <PortalLink
                  to="/login"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '5px 12px',
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1.5px solid rgba(16, 185, 129, 0.4)',
                    borderRadius: '20px',
                    color: '#10b981',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.3px',
                    minWidth: '60px'
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.background = 'rgba(16, 185, 129, 0.15)';
                    e.currentTarget.style.borderColor = '#10b981';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.background = 'rgba(16, 185, 129, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)';
                    e.currentTarget.style.transform = 'translateY(0)';
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
                  width: '40px',
                  height: '40px',
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
                {isMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
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

              {/* More Section Divider */}
              <div style={{
                padding: '0.5rem 1rem',
                marginTop: '0.5rem',
                borderTop: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: 'rgba(16, 185, 129, 0.8)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>More Options</span>
              </div>
              
              {/* Hidden Navigation Items */}
              {moreNavigation.map((item) => (
                <PortalLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.8rem 1.25rem',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    color: item.current ? '#ffffff' : '#94a3b8',
                    background: item.current 
                      ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(20, 184, 166, 0.15))' 
                      : 'rgba(255, 255, 255, 0.04)',
                    border: item.current 
                      ? '1px solid rgba(16, 185, 129, 0.4)' 
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    fontWeight: item.current ? 600 : 500,
                    fontSize: '0.85rem',
                    transition: 'all 0.3s ease',
                    letterSpacing: '0.3px',
                    textTransform: 'uppercase',
                    minHeight: '45px',
                    touchAction: 'manipulation'
                  }}
                >
                  <span style={{ 
                    flex: 1,
                    textAlign: 'left'
                  }}>
                    {item.name}
                  </span>
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
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0.6rem',
                      border: 'none',
                      borderRadius: '20px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      fontSize: '0.75rem',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      boxShadow: '0 2px 8px rgba(16, 185, 129, 0.35)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px'
                    }}
                  >
                    Sign Up
                  </PortalLink>
                  <PortalLink
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0.6rem',
                      border: '1.5px solid rgba(16, 185, 129, 0.4)',
                      borderRadius: '20px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      fontSize: '0.75rem',
                      background: 'rgba(16, 185, 129, 0.08)',
                      color: '#10b981',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px'
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
                All {navigation.length + moreNavigation.length} Options Available
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