import React, { useState, useEffect } from 'react';
import { Event } from '../../types';
import { Calendar, Search, Trash2, RefreshCw, BarChart3 } from 'lucide-react';
import { toast } from 'react-toastify';
import { adminAPI } from '../../services/api';

const NexusadminEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'ongoing' | 'completed'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const eventsData = await adminAPI.getEvents();
      setEvents(eventsData);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load events');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEvent = async (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await adminAPI.deleteEvent(eventId);
        toast.success('Event deleted successfully');
        loadEvents();
      } catch (error: any) {
        toast.error(error.message || 'Failed to delete event');
      }
    }
  };

  // Filter events based on search term and status filter
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-green-500/20 text-green-300';
      case 'ongoing':
        return 'bg-blue-500/20 text-blue-300';
      case 'completed':
        return 'bg-gray-500/20 text-gray-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="w-8 h-8 text-purple-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">Event Management</h1>
            <p className="text-gray-400">Monitor and manage all events from Nexusadmin</p>
          </div>
        </div>
        <button
          onClick={loadEvents}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Events</p>
              <p className="text-3xl font-bold text-white mt-2">{events.length}</p>
            </div>
            <Calendar className="w-12 h-12 text-purple-400 opacity-60" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Upcoming</p>
              <p className="text-3xl font-bold text-green-400 mt-2">
                {events.filter(e => e.status === 'upcoming').length}
              </p>
            </div>
            <BarChart3 className="w-12 h-12 text-green-400 opacity-60" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Ongoing</p>
              <p className="text-3xl font-bold text-blue-400 mt-2">
                {events.filter(e => e.status === 'ongoing').length}
              </p>
            </div>
            <BarChart3 className="w-12 h-12 text-blue-400 opacity-60" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Completed</p>
              <p className="text-3xl font-bold text-gray-400 mt-2">
                {events.filter(e => e.status === 'completed').length}
              </p>
            </div>
            <BarChart3 className="w-12 h-12 text-gray-400 opacity-60" />
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex gap-3 flex-wrap items-center">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events by title, organizer, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        {filteredEvents.length === 0 ? (
          <div className="p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No events found</p>
            <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="text-left py-4 px-4 text-purple-400 font-semibold">Event Title</th>
                  <th className="text-left py-4 px-4 text-purple-400 font-semibold">Organizer</th>
                  <th className="text-left py-4 px-4 text-purple-400 font-semibold">Date</th>
                  <th className="text-left py-4 px-4 text-purple-400 font-semibold">Category</th>
                  <th className="text-left py-4 px-4 text-purple-400 font-semibold">Capacity</th>
                  <th className="text-left py-4 px-4 text-purple-400 font-semibold">Registered</th>
                  <th className="text-left py-4 px-4 text-purple-400 font-semibold">Status</th>
                  <th className="text-left py-4 px-4 text-purple-400 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map(event => (
                  <tr key={event.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                    <td className="py-4 px-4 text-white font-medium">{event.title}</td>
                    <td className="py-4 px-4 text-gray-300">{event.organizer}</td>
                    <td className="py-4 px-4 text-gray-300">{event.date}</td>
                    <td className="py-4 px-4 text-gray-300">{event.category}</td>
                    <td className="py-4 px-4 text-gray-300">{event.capacity}</td>
                    <td className="py-4 px-4 text-gray-300">
                      <span className={`px-2 py-1 rounded text-sm ${
                        event.registered >= event.capacity 
                          ? 'bg-red-500/20 text-red-300' 
                          : 'bg-green-500/20 text-green-300'
                      }`}>
                        {event.registered}/{event.capacity}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => deleteEvent(event.id)}
                        className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded transition-colors"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Event Analytics */}
      {events.length > 0 && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">Event Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Total Registrations</p>
              <p className="text-3xl font-bold text-white mt-2">
                {events.reduce((sum, e) => sum + e.registered, 0)}
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Average Capacity</p>
              <p className="text-3xl font-bold text-white mt-2">
                {Math.round(events.reduce((sum, e) => sum + e.capacity, 0) / events.length)}
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Fill Rate</p>
              <p className="text-3xl font-bold text-white mt-2">
                {Math.round((events.reduce((sum, e) => sum + e.registered, 0) / 
                  events.reduce((sum, e) => sum + e.capacity, 0)) * 100)}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NexusadminEvents;