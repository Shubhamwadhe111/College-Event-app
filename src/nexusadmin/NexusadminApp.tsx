import { Routes, Route } from 'react-router-dom';
import NexusadminMainLayout from './components/NexusadminMainLayout';
import AdminHomePage from './pages/AdminHomePage';
import NexusadminLogin from './pages/NexusadminLogin';
import NexusadminRegister from './pages/NexusadminRegister';
import EnhancedAdminDashboard from './pages/EnhancedAdminDashboard';
import EnhancedEventsPage from './pages/EnhancedEventsPage';
import EnhancedOrganizersPage from './pages/EnhancedOrganizersPage';
import EnhancedApprovalsPage from './pages/EnhancedApprovalsPage';
import EnhancedAnalyticsPage from './pages/EnhancedAnalyticsPage';
import EnhancedNotificationsPage from './pages/EnhancedNotificationsPage';
import EnhancedSettingsPage from './pages/EnhancedSettingsPage';
import EnhancedHelpPage from './pages/EnhancedHelpPage';
import AdminProfilePage from './pages/AdminProfilePage';
import ProtectedRoute from '../components/ProtectedRoute';

function NexusadminApp() {
  console.log('🔧 NexusadminApp is loading!');
  console.log('Current URL:', window.location.href);
  console.log('Current pathname:', window.location.pathname);
  
  return (
    <div className="nexusadmin-app">
      <Routes>
        {/* Public routes with main layout */}
        <Route path="/" element={
          <NexusadminMainLayout>
            <AdminHomePage />
          </NexusadminMainLayout>
        } />
        <Route path="/login" element={
          <NexusadminMainLayout>
            <NexusadminLogin />
          </NexusadminMainLayout>
        } />
        <Route path="/register" element={
          <NexusadminMainLayout>
            <NexusadminRegister />
          </NexusadminMainLayout>
        } />
        
        {/* Protected admin routes with enhanced pages - wrapped with layout for navbar */}
        <Route path="/dashboard" element={
          <ProtectedRoute requiredRole="admin">
            <NexusadminMainLayout>
              <EnhancedAdminDashboard />
            </NexusadminMainLayout>
          </ProtectedRoute>
        } />
        <Route path="/events" element={
          <ProtectedRoute requiredRole="admin">
            <NexusadminMainLayout>
              <EnhancedEventsPage />
            </NexusadminMainLayout>
          </ProtectedRoute>
        } />
        <Route path="/organizers" element={
          <ProtectedRoute requiredRole="admin">
            <NexusadminMainLayout>
              <EnhancedOrganizersPage />
            </NexusadminMainLayout>
          </ProtectedRoute>
        } />
        <Route path="/approvals" element={
          <ProtectedRoute requiredRole="admin">
            <NexusadminMainLayout>
              <EnhancedApprovalsPage />
            </NexusadminMainLayout>
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute requiredRole="admin">
            <NexusadminMainLayout>
              <EnhancedAnalyticsPage />
            </NexusadminMainLayout>
          </ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute requiredRole="admin">
            <NexusadminMainLayout>
              <EnhancedNotificationsPage />
            </NexusadminMainLayout>
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute requiredRole="admin">
            <NexusadminMainLayout>
              <EnhancedSettingsPage />
            </NexusadminMainLayout>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute requiredRole="admin">
            <NexusadminMainLayout>
              <AdminProfilePage />
            </NexusadminMainLayout>
          </ProtectedRoute>
        } />
        <Route path="/help" element={
          <ProtectedRoute requiredRole="admin">
            <NexusadminMainLayout>
              <EnhancedHelpPage />
            </NexusadminMainLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default NexusadminApp;