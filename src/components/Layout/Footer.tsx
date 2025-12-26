import React from 'react';
import { Mail, Phone, MapPin, Clock, HelpCircle, MessageCircle, Users, Calendar, Shield, ExternalLink } from 'lucide-react';

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
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* College Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">College Events</h3>
                  <p className="text-sm text-white/80">Event Management System</p>
                </div>
              </div>
              <p className="text-white/80 mb-6 leading-relaxed">
                Your one-stop platform for discovering, creating, and managing college events.
                Connect with fellow students and make the most of your college experience.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-emerald-300" />
                  <span className="text-white/80">College Campus, Main Building</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-emerald-300" />
                  <span className="text-white/80">Mon - Fri: 9:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-emerald-300" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="/" className="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    Home
                  </a>
                </li>
                <li>
                  <a href="/events" className="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    Browse Events
                  </a>
                </li>
                <li>
                  <a href="/gallery" className="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    Event Gallery
                  </a>
                </li>
                <li>
                  <a href="/dashboard" className="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    My Dashboard
                  </a>
                </li>
                <li>
                  <a href="/create-event" className="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    Create Event
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-emerald-300" />
                Support
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#help" className="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Contact Us
                  </a>
                </li>
                <li>

                  <a href="#admin" className="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Admin Support
                  </a>
                </li>
                <li>
                  <a href="#feedback" className="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Feedback
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Phone className="w-5 h-5 text-emerald-300" />
                Contact Info
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-emerald-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/80 text-sm">Email Support</p>
                    <a href="mailto:support@collegeevents.com" className="text-white hover:text-emerald-300 transition-colors duration-300">
                      support@collegeevents.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/80 text-sm">Phone Support</p>
                    <a href="tel:+919876543210" className="text-white hover:text-emerald-300 transition-colors duration-300">
                      +91 98765 43210
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/80 text-sm">Response Time</p>
                    <p className="text-white">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-white/80 text-sm">
                  © 2025 College Event Management System. All rights reserved.
                </p>
              </div>
              <div className="flex gap-6 text-sm">
                <a href="#privacy" className="text-white/80 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#terms" className="text-white/80 hover:text-white transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="#cookies" className="text-white/80 hover:text-white transition-colors duration-300">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;