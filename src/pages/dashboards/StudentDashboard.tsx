import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useEvents } from '../../contexts/EventContext';
import { Calendar, Users, Trophy, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { events } = useEvents();

  // Mock data for demonstration
  const upcomingEvents = events.slice(0, 3);
  const registeredEvents = events.slice(0, 2);
  const stats = {
    totalEvents: events.length,
    registeredEvents: 5,
    attendedEvents: 3,
    upcomingEvents: upcomingEvents.length
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-blue-100">
          Discover and participate in exciting college events. Stay connected with your campus community.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Events</p>
              <p className="text-2xl font-bold text-white">{stats.totalEvents}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Registered</p>
              <p className="text-2xl font-bold text-white">{stats.registeredEvents}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Attended</p>
              <p className="text-2xl font-bold text-white">{stats.attendedEvents}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Upcoming</p>
              <p className="text-2xl font-bold text-white">{stats.upcomingEvents}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/events"
              className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-blue-500 mr-3" />
                <span className="text-white">Browse Events</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </Link>
            
            <Link
              to="/my-events"
              className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              <div className="flex items-center">
                <Users className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-white">My Registrations</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </Link>
            
            <Link
              to="/profile"
              className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              <div className="flex items-center">
                <Users className="w-5 h-5 text-purple-500 mr-3" />
                <span className="text-white">Update Profile</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </Link>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-4">Upcoming Events</h2>
          <div className="space-y-3">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div key={event.id} className="p-3 bg-gray-700 rounded-lg">
                  <h3 className="font-medium text-white mb-1">{event.title}</h3>
                  <div className="flex items-center text-sm text-gray-400 mb-1">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <MapPin className="w-4 h-4 mr-1" />
                    {event.location}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-4">No upcoming events</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-gray-700 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <div>
              <p className="text-white text-sm">Registered for Tech Symposium 2024</p>
              <p className="text-gray-400 text-xs">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-700 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <div>
              <p className="text-white text-sm">Attended Cultural Fest Opening</p>
              <p className="text-gray-400 text-xs">1 day ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-700 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
            <div>
              <p className="text-white text-sm">Updated profile information</p>
              <p className="text-gray-400 text-xs">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;