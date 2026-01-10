import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Zap, 
  Home, 
  Calendar, 
  BookOpen, 
  Plus, 
  Bell, 
  Megaphone, 
  HelpCircle, 
  User, 
  ChevronDown,
  Menu,
  X,
  UserPlus,
  LogIn,
  Sparkles
} from 'lucide-react';
import NotificationCenter from '../NotificationCenter';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Navigation items based on user role
  const getNavigationItems = () => {
    const baseItems = [
      { path: '/', label: 'Home', icon: Home },
      { path: '/events', label: 'Events', icon: Calendar },
    ];

    if (user) {
      baseItems.push({ path: '/my-events', label: 'My Events', icon: BookOpen });
      
      // Add Create Event for organizers only
      if (user.role === 'organizer') {
        baseItems.push({ path: '/create-event', label: 'Create Event', icon: Plus });
      }
      
      baseItems.push(
        { path: '/notices', label: 'Notices', icon: Megaphone },
        { path: '/notifications', label: 'Notifications', icon: Bell },
        { path: '/help', label: 'Help', icon: HelpCircle }
      );
    }

    return baseItems;
  };

  const navigationItems = getNavigationItems();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Brand */}
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <div className="navbar-logo">
            <Zap size={24} strokeWidth={3} />
          </div>
          <span className="navbar-title">NEXUS</span>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <ul className={`navbar-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  <IconComponent size={18} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* User Section */}
        <div className="navbar-user">
          {user ? (
            <>
              {/* Notification Center - Desktop only */}
              <div className="desktop-only">
                <NotificationCenter />
              </div>
              
              {/* User Profile Dropdown */}
              <div className="user-profile-dropdown">
                <button 
                  className="user-profile-button"
                  onClick={toggleProfileDropdown}
                  aria-label="User menu"
                >
                  <div className="user-avatar">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        style={{
                          width: '100%', 
                          height: '100%', 
                          borderRadius: '50%', 
                          objectFit: 'cover'
                        }} 
                      />
                    ) : (
                      <span>{user.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div className="user-info desktop-only">
                    <span className="user-name">{user.name}</span>
                    <span className="user-role">{user.role}</span>
                  </div>
                  <ChevronDown size={16} className="dropdown-arrow" />
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="profile-dropdown-menu">
                    <div className="dropdown-header">
                      <div className="user-avatar-large">
                        {user.avatar ? (
                          <img 
                            src={user.avatar} 
                            alt={user.name} 
                            style={{
                              width: '100%', 
                              height: '100%', 
                              borderRadius: '50%', 
                              objectFit: 'cover'
                            }} 
                          />
                        ) : (
                          <span>{user.name.charAt(0).toUpperCase()}</span>
                        )}
                      </div>
                      <div className="user-details">
                        <div className="user-name">{user.name}</div>
                        <div className="user-email">{user.email}</div>
                        <div className="user-role-badge">{user.role}</div>
                      </div>
                    </div>
                    
                    <div className="dropdown-divider"></div>
                    
                    <Link 
                      to="/profile" 
                      className="dropdown-item"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <User size={16} />
                      <span>Profile Settings</span>
                    </Link>
                    
                    {/* Mobile-only notification link */}
                    <Link 
                      to="/notifications" 
                      className="dropdown-item mobile-only"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <Bell size={16} />
                      <span>Notifications</span>
                    </Link>
                    
                    <div className="dropdown-divider"></div>
                    
                    <button 
                      onClick={handleLogout} 
                      className="dropdown-item logout-button"
                    >
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="auth-buttons" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Sign Up Button - Gradient filled */}
              <Link 
                to="/register" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                  backgroundSize: '200% 200%',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4), 0 0 20px rgba(139, 92, 246, 0.2)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.5), 0 0 30px rgba(139, 92, 246, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.4), 0 0 20px rgba(139, 92, 246, 0.2)';
                }}
              >
                <UserPlus size={16} />
                <span>Sign Up</span>
                <Sparkles size={14} style={{ opacity: 0.8 }} />
              </Link>
              
              {/* Login Button - Outlined with glow */}
              <Link 
                to="/login" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'transparent',
                  border: '2px solid rgba(139, 92, 246, 0.5)',
                  borderRadius: '12px',
                  color: '#a855f7',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.15)';
                  e.currentTarget.style.borderColor = '#a855f7';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <LogIn size={16} />
                <span>Login</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={closeMobileMenu}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
