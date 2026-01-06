import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface RoleBasedRouterProps {
  children: React.ReactNode;
}

const RoleBasedRouter: React.FC<RoleBasedRouterProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Only redirect if user is logged in and trying to access wrong portal
  if (user) {
    const currentPath = window.location.pathname;
    
    // Only redirect master users if they're on main portal root or wrong admin portal
    if (user.role === 'master') {
      if (currentPath === '/' || currentPath === '/College-Event-app' || currentPath.startsWith('/nexusadmin')) {
        return <Navigate to="/nexussuper/dashboard" replace />;
      }
    }
    
    // Only redirect admin users if they're on main portal root or wrong admin portal
    if (user.role === 'admin') {
      if (currentPath === '/' || currentPath === '/College-Event-app' || currentPath.startsWith('/nexussuper')) {
        return <Navigate to="/nexusadmin/dashboard" replace />;
      }
    }
    
    // Only redirect students/organizers if they're trying to access admin portals
    if ((user.role === 'organizer' || user.role === 'student')) {
      if (currentPath.startsWith('/nexusadmin') || currentPath.startsWith('/nexussuper')) {
        return <Navigate to="/dashboard" replace />;
      }
    }
  }

  return <>{children}</>;
};

export default RoleBasedRouter;