import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ExternalLink } from 'lucide-react';

const NexusadminFooter: React.FC = () => {
  return (
    <footer className="relative bg-gray-800 text-white overflow-hidden border-t border-gray-700">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/5 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-400/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Quick Links */}
            <div>
              <h4 className="text-base font-semibold mb-4 flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-purple-300" />
                Admin Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-white/80 hover:text-purple-300 transition-colors duration-300 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="text-white/80 hover:text-purple-300 transition-colors duration-300 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                    Manage Events
                  </Link>
                </li>
                <li>
                  <Link to="/users" className="text-white/80 hover:text-purple-300 transition-colors duration-300 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                    User Management
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-white/80 hover:text-purple-300 transition-colors duration-300 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                    Admin Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Account Links */}
            <div>
              <h4 className="text-base font-semibold mb-4">Account</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/login" className="text-white/80 hover:text-purple-300 transition-colors duration-300 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                    Admin Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-white/80 hover:text-purple-300 transition-colors duration-300 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                    Register as Admin
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-3 h-3 text-white" />
                </div>
                <p className="text-white/80 text-sm">
                  © 2025 Nexusadmin Portal. College administration made simple.
                </p>
              </div>
              <div className="flex gap-6 text-sm">
                <Link to="/privacy" className="text-white/80 hover:text-purple-300 transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-white/80 hover:text-purple-300 transition-colors duration-300">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NexusadminFooter;