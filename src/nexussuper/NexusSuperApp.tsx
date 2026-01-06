import { Routes, Route } from 'react-router-dom';
import NexusSuperMainLayout from './components/NexusSuperMainLayout';
import DashboardLayout from '../components/DashboardLayout';
import SuperAdminHomePage from './pages/SuperAdminHomePage';
import NexusSuperLogin from './pages/NexusSuperLogin';
import NexusSuperRegister from './pages/NexusSuperRegister';
import MasterDashboard from '../pages/dashboards/MasterDashboard';
import ProtectedRoute from '../components/ProtectedRoute';

// Enhanced Master Admin Pages
import {
  EnhancedCollegesPage,
  EnhancedAdminsPage,
  EnhancedMasterEventsPage,
  EnhancedMasterAnalyticsPage,
  EnhancedCommandCenterPage,
  EnhancedSystemSettingsPage,
  EnhancedMasterNotificationsPage
} from './pages';

function NexusSuperApp() {
  return (
    <div className="nexussuper-app">
      <Routes>
        {/* Public routes with main layout */}
        <Route path="/" element={
          <NexusSuperMainLayout>
            <SuperAdminHomePage />
          </NexusSuperMainLayout>
        } />
        <Route path="/login" element={
          <NexusSuperMainLayout>
            <NexusSuperLogin />
          </NexusSuperMainLayout>
        } />
        <Route path="/register" element={
          <NexusSuperMainLayout>
            <NexusSuperRegister />
          </NexusSuperMainLayout>
        } />
        
        {/* Protected master admin routes with dashboard layout */}
        <Route path="/dashboard" element={
          <ProtectedRoute requiredRole="master">
            <DashboardLayout role="master">
              <MasterDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/colleges" element={
          <ProtectedRoute requiredRole="master">
            <DashboardLayout role="master">
              <EnhancedCollegesPage />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/admins" element={
          <ProtectedRoute requiredRole="master">
            <DashboardLayout role="master">
              <EnhancedAdminsPage />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/events" element={
          <ProtectedRoute requiredRole="master">
            <DashboardLayout role="master">
              <EnhancedMasterEventsPage />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute requiredRole="master">
            <DashboardLayout role="master">
              <EnhancedMasterAnalyticsPage />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/command-center" element={
          <ProtectedRoute requiredRole="master">
            <DashboardLayout role="master">
              <EnhancedCommandCenterPage />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/system-settings" element={
          <ProtectedRoute requiredRole="master">
            <DashboardLayout role="master">
              <EnhancedSystemSettingsPage />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute requiredRole="master">
            <DashboardLayout role="master">
              <EnhancedMasterNotificationsPage />
            </DashboardLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default NexusSuperApp;