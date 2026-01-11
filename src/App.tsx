import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { EventProvider } from './contexts/EventContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/Layout/Layout';
import BackgroundManager from './components/BackgroundManager';
import SimpleHome from './pages/SimpleHome';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminRegister from './pages/AdminRegister';
import CreateEvent from './pages/CreateEvent';
import Profile from './pages/Profile';
import Gallery from './pages/Gallery';
import About from './pages/About';
import MyEvents from './pages/MyEvents';
import Notices from './pages/Notices';
import NotificationsPage from './pages/NotificationsPage';
import Help from './pages/Help';
import MigrationStatus from './pages/MigrationStatus';
import ProtectedRoute from './components/ProtectedRoute';

// Import admin portal components
import NexusadminApp from './nexusadmin/NexusadminApp';
import NexusSuperApp from './nexussuper/NexusSuperApp';

// Get the base path for GitHub Pages
const getBasename = () => {
  // In production (GitHub Pages), use the repository name as basename
  if (process.env.NODE_ENV === 'production') {
    return '/College-Event-app';
  }
  // In development, no basename needed
  return '';
};

function App() {
  console.log('App rendering with basename:', getBasename());
  console.log('Current pathname:', window.location.pathname);
  
  return (
    <AuthProvider>
      <NotificationProvider>
        <EventProvider>
          <Router basename={getBasename()}>
            <BackgroundManager />
            <Routes>
              {/* Admin Portal Routes - These must come first and be exact */}
              <Route path="/nexusadmin/*" element={<NexusadminApp />} />
              <Route path="/nexussuper/*" element={<NexusSuperApp />} />
              
              {/* Main Website Routes */}
              <Route path="/*" element={
                <Layout>
                  <Routes>
                    <Route path="/" element={<SimpleHome />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/events/:id" element={<EventDetails />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/about" element={<About />} />
                    
                    {/* My Events page */}
                    <Route path="/my-events" element={
                      <ProtectedRoute>
                        <MyEvents />
                      </ProtectedRoute>
                    } />
                    
                    {/* Notices and Announcements */}
                    <Route path="/notices" element={<Notices />} />
                    
                    {/* Personal Notifications */}
                    <Route path="/notifications" element={
                      <ProtectedRoute>
                        <NotificationsPage />
                      </ProtectedRoute>
                    } />
                    
                    {/* Help and Support */}
                    <Route path="/help" element={<Help />} />
                    
                    {/* Migration Status */}
                    <Route path="/migration-status" element={<MigrationStatus />} />
                    
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
          </Router>
        </EventProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;