import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { EventProvider } from './contexts/EventContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/Layout/Layout';
import SimpleHome from './pages/SimpleHome';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateEvent from './pages/CreateEvent';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import AdminRegister from './pages/AdminRegister';
import SuperAdminPanel from './pages/SuperAdminPanel';
import Gallery from './pages/Gallery';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <EventProvider>
          <Router>
            <Layout>
              <Routes>
              <Route path="/" element={<SimpleHome />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin-register" element={<AdminRegister />} />
              <Route path="/create-event" element={
                <ProtectedRoute requiredRole="organizer">
                  <CreateEvent />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/admin-panel" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminPanel />
                </ProtectedRoute>
              } />
              <Route path="/super-admin" element={
                <ProtectedRoute requiredRole="superadmin">
                  <SuperAdminPanel />
                </ProtectedRoute>
              } />
              </Routes>
            </Layout>
          </Router>
        </EventProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;