import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Zap } from 'lucide-react';
import NotificationCenter from '../NotificationCenter';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Brand */}
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo">
            <Zap size={24} strokeWidth={3} />
          </div>
          <span className="navbar-title">NEXUS</span>
        </Link>

        {/* Navigation Links */}
        <ul className="navbar-nav">
          <li>
            <Link 
              to="/" 
              className={isActive('/') ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/events" 
              className={isActive('/events') ? 'active' : ''}
            >
              Events
            </Link>
          </li>
          <li>
            <Link 
              to="/gallery" 
              className={isActive('/gallery') ? 'active' : ''}
            >
              Gallery
            </Link>
          </li>
          
          {user && (
            <>
              <li>
                <Link 
                  to="/dashboard" 
                  className={isActive('/dashboard') ? 'active' : ''}
                >
                  Dashboard
                </Link>
              </li>
              {user.role === 'organizer' && (
                <li>
                  <Link 
                    to="/create-event" 
                    className={isActive('/create-event') ? 'active' : ''}
                  >
                    Create Event
                  </Link>
                </li>
              )}
              <li>
                <Link 
                  to="/profile" 
                  className={isActive('/profile') ? 'active' : ''}
                >
                  Profile
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* User Section */}
        <div className="navbar-user">
          {user ? (
            <>
              <NotificationCenter />
              <div className="user-avatar">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
                ) : (
                  <span>{user.name.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <span className="text-sm font-medium">{user.name}</span>
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary" style={{ marginRight: '0.5rem' }}>
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;