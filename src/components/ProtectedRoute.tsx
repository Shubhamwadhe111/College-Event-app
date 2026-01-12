import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'student' | 'organizer' | 'admin' | 'master';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Determine which portal we're in based on the current path
  const isAdminPortal = location.pathname.startsWith('/nexusadmin');
  const isMasterPortal = location.pathname.startsWith('/nexussuper');
  const isMainPortal = !isAdminPortal && !isMasterPortal;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // If user is not logged in, redirect to the appropriate login page for the portal
  if (!user) {
    if (isAdminPortal) {
      return <Navigate to="/nexusadmin/login" replace />;
    } else if (isMasterPortal) {
      return <Navigate to="/nexussuper/login" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  // Check if user has the required role
  if (requiredRole) {
    const roleHierarchy = { student: 0, organizer: 1, admin: 2, master: 3 };
    const userRoleLevel = roleHierarchy[user.role];
    const requiredRoleLevel = roleHierarchy[requiredRole];

    if (userRoleLevel < requiredRoleLevel) {
      // Redirect to the appropriate portal home based on user's role
      if (user.role === 'master') {
        return <Navigate to="/nexussuper/dashboard" replace />;
      } else if (user.role === 'admin') {
        return <Navigate to="/nexusadmin/dashboard" replace />;
      } else {
        return <Navigate to="/" replace />;
      }
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
