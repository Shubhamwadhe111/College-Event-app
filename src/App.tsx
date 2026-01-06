import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { EventProvider } from './contexts/EventContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/Layout/Layout';
import DashboardLayout from './components/DashboardLayout';
import BackgroundManager from './components/BackgroundManager';
import SimpleHome from './pages/SimpleHome';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Dashboard from './pages/Dashboard';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminRegister from './pages/AdminRegister';
import CreateEvent from './pages/CreateEvent';
import Profile from './pages/Profile';
import Gallery from './pages/Gallery';
import ProtectedRoute from './components/ProtectedRoute';
import RoleBasedRouter from './components/RoleBasedRouter';

// Import admin portal components
import NexusadminApp from './nexusadmin/NexusadminApp';
import NexusSuperApp from './nexussuper/NexusSuperApp';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <EventProvider>
          <Router>
            <BackgroundManager />
            <RoleBasedRouter>
              <Routes>
                {/* Admin Portal Routes */}
                <Route path="/nexusadmin/*" element={<NexusadminApp />} />
                <Route path="/nexussuper/*" element={<NexusSuperApp />} />
                
                {/* Main Website Routes */}
                <Route path="/*" element={
                  <Layout>
                    <Routes>
                      <Route path="/" element={<SimpleHome />} />
                      <Route path="/College-Event-app" element={<SimpleHome />} />
                      <Route path="/events" element={<Events />} />
                      <Route path="/events/:id" element={<EventDetails />} />
                      <Route path="/gallery" element={<Gallery />} />
                      
                      {/* Role-based dashboard routes */}
                      <Route path="/dashboard" element={
                        <ProtectedRoute>
                          <DashboardLayout role="student">
                            <StudentDashboard />
                          </DashboardLayout>
                        </ProtectedRoute>
                      } />
                      
                      {/* Organizer dashboard - same as student for now */}
                      <Route path="/organizer-dashboard" element={
                        <ProtectedRoute requiredRole="organizer">
                          <DashboardLayout role="organizer">
                            <StudentDashboard />
                          </DashboardLayout>
                        </ProtectedRoute>
                      } />
                      
                      {/* My Events page for organizers and students */}
                      <Route path="/my-events" element={
                        <ProtectedRoute>
                          <Layout>
                            <div className="text-white">My Events Page - Coming Soon</div>
                          </Layout>
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
                    </Routes>
                  </Layout>
                } />
              </Routes>
            </RoleBasedRouter>
          </Router>
        </EventProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;