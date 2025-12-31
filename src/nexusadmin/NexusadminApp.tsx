import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NexusadminLayout from './components/NexusadminLayout';
import NexusadminLogin from './pages/NexusadminLogin';
import NexusadminDashboard from './pages/NexusadminDashboard';
import NexusadminUsers from './pages/NexusadminUsers';
import NexusadminEvents from './pages/NexusadminEvents';
import NexusadminSettings from './pages/NexusadminSettings';
import NexusadminAdminPanel from './pages/AdminPanel';
import NexusadminSuperAdminPanel from './pages/NexusadminSuperAdminPanel';
import ProtectedRoute from '../components/ProtectedRoute';

function NexusadminApp() {
  return (
    <div className="nexusadmin-app">
      <Routes>
        <Route path="/login" element={<NexusadminLogin />} />
        <Route path="/" element={
          <ProtectedRoute requiredRole="admin">
            <NexusadminLayout>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<NexusadminDashboard />} />
                <Route path="/users" element={<NexusadminUsers />} />
                <Route path="/events" element={<NexusadminEvents />} />
                <Route path="/settings" element={<NexusadminSettings />} />
                <Route path="/admin-panel" element={<NexusadminAdminPanel />} />
                <Route path="/super-admin" element={<NexusadminSuperAdminPanel />} />
              </Routes>
            </NexusadminLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default NexusadminApp;