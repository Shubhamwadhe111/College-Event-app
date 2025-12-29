import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BackgroundManager: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const body = document.body;
    
    // Remove all existing page classes
    body.classList.remove('page-events', 'page-gallery', 'page-admin', 'page-login', 'page-home');
    
    // Add appropriate class based on current route
    switch (location.pathname) {
      case '/':
        body.classList.add('page-home');
        break;
      case '/events':
        body.classList.add('page-events');
        break;
      case '/gallery':
        body.classList.add('page-gallery');
        break;
      case '/admin-panel':
      case '/super-admin':
        body.classList.add('page-admin');
        break;
      case '/login':
      case '/register':
      case '/admin-register':
        body.classList.add('page-login');
        break;
      default:
        body.classList.add('page-home');
    }
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

export default BackgroundManager;