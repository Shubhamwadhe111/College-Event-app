import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/5 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-emerald-400/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Quick Links */}
            <div>
              <h4 className="text-base font-semibold mb-4 flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-emerald-300" />
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-white/80 hover:text-emerald-300 transition-colors duration-300 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="text-white/80 hover:text-emerald-300 transition-colors duration-300 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>
                    Browse Events
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="text-white/80 hover:text-emerald-300 transition-colors duration-300 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>
                    Event Gallery
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-white/80 hover:text-emerald-300 transition-colors duration-300 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>
                    My Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Account Links */}
            <div>
              <h4 className="text-base font-semibold mb-4">Account</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/login" className="text-white/80 hover:text-emerald-300 transition-colors duration-300 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>
                    Login
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
              <div className="text-center md:text-left">
                <p className="text-white/80 text-sm">
                  © 2025 College Event Management System. All rights reserved.
                </p>
              </div>
              <div className="flex gap-6 text-sm">
                <Link to="/privacy" className="text-white/80 hover:text-emerald-300 transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-white/80 hover:text-emerald-300 transition-colors duration-300">
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

export default Footer;