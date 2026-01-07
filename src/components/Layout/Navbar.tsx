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
  X
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
            <div className="auth-buttons">
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Login
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