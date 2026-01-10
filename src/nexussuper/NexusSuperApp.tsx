import { Routes, Route } from 'react-router-dom';
import NexusSuperMainLayout from './components/NexusSuperMainLayout';
import SuperAdminHomePage from './pages/SuperAdminHomePage';
import NexusSuperLogin from './pages/NexusSuperLogin';
import NexusSuperRegister from './pages/NexusSuperRegister';
import ProtectedRoute from '../components/ProtectedRoute';

// Enhanced Master Admin Pages
import {
  EnhancedCollegesPage,
  EnhancedAdminsPage,
  EnhancedMasterEventsPage,
  EnhancedMasterAnalyticsPage,
  EnhancedCommandCenterPage,
  EnhancedSystemSettingsPage,
  EnhancedMasterNotificationsPage,
  FunctionsPage,
  AddCollegePage,
  AddAdminPage,
  BroadcastPage
} from './pages';

// New Profile and Settings Pages
import MasterProfilePage from './pages/MasterProfilePage';
import MasterSettingsPage from './pages/MasterSettingsPage';

function NexusSuperApp() {
  console.log('🚀 NexusSuperApp is loading!');
  console.log('Current URL:', window.location.href);
  console.log('Current pathname:', window.location.pathname);
  
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
        
        {/* Protected master admin routes with main layout */}
        <Route path="/colleges" element={
          <ProtectedRoute requiredRole="master">
            <NexusSuperMainLayout>
              <EnhancedCollegesPage />
            </NexusSuperMainLayout>
          </ProtectedRoute>
        } />
        <Route path="/admins" element={
          <ProtectedRoute requiredRole="master">
            <NexusSuperMainLayout>
              <EnhancedAdminsPage />
            </NexusSuperMainLayout>
          </ProtectedRoute>
        } />
        <Route path="/events" element={
          <ProtectedRoute requiredRole="master">
            <NexusSuperMainLayout>
              <EnhancedMasterEventsPage />
            </NexusSuperMainLayout>
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute requiredRole="master">
            <NexusSuperMainLayout>
              <EnhancedMasterAnalyticsPage />
            </NexusSuperMainLayout>
          </ProtectedRoute>
        } />
        <Route path="/command-center" element={
          <ProtectedRoute requiredRole="master">
            <NexusSuperMainLayout>
              <EnhancedCommandCenterPage />
            </NexusSuperMainLayout>
          </ProtectedRoute>
        } />
        <Route path="/system-settings" element={
          <ProtectedRoute requiredRole="master">
            <NexusSuperMainLayout>
              <EnhancedSystemSettingsPage />
            </NexusSuperMainLayout>
          </ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute requiredRole="master">
            <NexusSuperMainLayout>
              <EnhancedMasterNotificationsPage />
            </NexusSuperMainLayout>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute requiredRole="master">
            <NexusSuperMainLayout>
              <MasterProfilePage />
            </NexusSuperMainLayout>
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute requiredRole="master">
            <NexusSuperMainLayout>
              <MasterSettingsPage />
            </NexusSuperMainLayout>
          </ProtectedRoute>
        } />
        
        {/* Functions Routes */}
        <Route path="/functions" element={
          <ProtectedRoute requiredRole="master">
            <NexusSuperMainLayout>
              <FunctionsPage />
            </NexusSuperMainLayout>
          </ProtectedRoute>
        } />
        <Route path="/add-college" element={
          <ProtectedRoute requiredRole="master">
            <NexusSuperMainLayout>
              <AddCollegePage />
            </NexusSuperMainLayout>
          </ProtectedRoute>
        } />
        <Route path="/add-admin" element={
          <ProtectedRoute requiredRole="master">
            <NexusSuperMainLayout>
              <AddAdminPage />
            </NexusSuperMainLayout>
          </ProtectedRoute>
        } />
        <Route path="/broadcast" element={
          <ProtectedRoute requiredRole="master">
            <NexusSuperMainLayout>
              <BroadcastPage />
            </NexusSuperMainLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default NexusSuperApp;