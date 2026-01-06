import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  BarChart3, 
  Calendar, 
  Users, 
  Settings, 
  Home,
  FileText,
  Shield,
  Database,
  Globe,
  Activity,
  Bell,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'student' | 'organizer' | 'admin' | 'master';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const getNavigationItems = () => {
    switch (role) {
      case 'master':
        return [
          { name: 'Dashboard', href: '/nexussuper/dashboard', icon: Home, current: location.pathname === '/nexussuper/dashboard' },
          { name: 'System Control', href: '/nexussuper/system', icon: Database, current: location.pathname === '/nexussuper/system' },
          { name: 'Global Analytics', href: '/nexussuper/analytics', icon: BarChart3, current: location.pathname === '/nexussuper/analytics' },
          { name: 'All Colleges', href: '/nexussuper/colleges', icon: Globe, current: location.pathname === '/nexussuper/colleges' },
          { name: 'Master Users', href: '/nexussuper/users', icon: Users, current: location.pathname === '/nexussuper/users' },
          { name: 'All Events', href: '/nexussuper/events', icon: Calendar, current: location.pathname === '/nexussuper/events' },
          { name: 'System Settings', href: '/nexussuper/settings', icon: Settings, current: location.pathname === '/nexussuper/settings' },
        ];
      case 'admin':
        return [
          { name: 'Dashboard', href: '/nexusadmin/dashboard', icon: Home, current: location.pathname === '/nexusadmin/dashboard' },
          { name: 'Event Approvals', href: '/nexusadmin/approvals', icon: FileText, current: location.pathname === '/nexusadmin/approvals' },
          { name: 'College Events', href: '/nexusadmin/events', icon: Calendar, current: location.pathname === '/nexusadmin/events' },
          { name: 'Organizers', href: '/nexusadmin/organizers', icon: Users, current: location.pathname === '/nexusadmin/organizers' },
          { name: 'Students', href: '/nexusadmin/students', icon: Users, current: location.pathname === '/nexusadmin/students' },
          { name: 'Analytics', href: '/nexusadmin/analytics', icon: BarChart3, current: location.pathname === '/nexusadmin/analytics' },
          { name: 'Settings', href: '/nexusadmin/settings', icon: Settings, current: location.pathname === '/nexusadmin/settings' },
        ];
      default:
        return [
          { name: 'Dashboard', href: '/dashboard', icon: Home, current: location.pathname === '/dashboard' },
          { name: 'Events', href: '/events', icon: Calendar, current: location.pathname === '/events' },
          { name: 'My Events', href: '/my-events', icon: Activity, current: location.pathname === '/my-events' },
          { name: 'Profile', href: '/profile', icon: Users, current: location.pathname === '/profile' },
        ];
    }
  };

  const getRoleTitle = () => {
    switch (role) {
      case 'master': return 'Master Admin';
      case 'admin': return 'College Admin';
      case 'organizer': return 'Event Organizer';
      default: return 'Student';
    }
  };

  const getRoleColor = () => {
    switch (role) {
      case 'master': return 'from-purple-600 to-pink-600';
      case 'admin': return 'from-blue-600 to-indigo-600';
      case 'organizer': return 'from-green-600 to-teal-600';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  const navigation = getNavigationItems();

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
          <div className="flex items-center">
            <div className={`w-8 h-8 bg-gradient-to-r ${getRoleColor()} rounded-lg flex items-center justify-center`}>
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="ml-2 text-white font-semibold">{getRoleTitle()}</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`${
                    item.current
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200`}
                >
                  <item.icon
                    className={`${
                      item.current ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    } mr-3 h-5 w-5 transition-colors duration-200`}
                  />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-900">
          <div className="flex items-center">
            <div className={`w-8 h-8 bg-gradient-to-r ${getRoleColor()} rounded-full flex items-center justify-center`}>
              <span className="text-white text-sm font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-gray-800 shadow-sm border-b border-gray-700">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <Bell className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors duration-200" />
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-300">Welcome back,</span>
                <span className="text-sm font-medium text-white">{user?.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-900 p-6">
          {children}
        </main>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;