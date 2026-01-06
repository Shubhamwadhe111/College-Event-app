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
import ProtectedRoute from '../components/ProtectedRoute';

function NexusadminApp() {
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
        
        {/* Protected admin routes with enhanced pages */}
        <Route path="/dashboard" element={
          <ProtectedRoute requiredRole="admin">
            <EnhancedAdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/events" element={
          <ProtectedRoute requiredRole="admin">
            <EnhancedEventsPage />
          </ProtectedRoute>
        } />
        <Route path="/organizers" element={
          <ProtectedRoute requiredRole="admin">
            <EnhancedOrganizersPage />
          </ProtectedRoute>
        } />
        <Route path="/approvals" element={
          <ProtectedRoute requiredRole="admin">
            <EnhancedApprovalsPage />
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute requiredRole="admin">
            <EnhancedAnalyticsPage />
          </ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute requiredRole="admin">
            <EnhancedNotificationsPage />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute requiredRole="admin">
            <EnhancedSettingsPage />
          </ProtectedRoute>
        } />
        <Route path="/help" element={
          <ProtectedRoute requiredRole="admin">
            <EnhancedHelpPage />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default NexusadminApp;