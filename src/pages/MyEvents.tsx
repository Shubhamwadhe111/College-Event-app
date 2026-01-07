import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useEvents } from '../contexts/EventContext';
import { Calendar, Clock, MapPin, Users, Eye, Edit, Trash2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  status: 'pending' | 'approved' | 'rejected';
  poster?: string;
  organizer?: string;
  registrationDate?: string;
}

const MyEvents: React.FC = () => {
  const { user } = useAuth();
  const { events } = useEvents();
  const [activeTab, setActiveTab] = useState<'registered' | 'created'>('registered');
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user's events
    const loadMyEvents = async () => {
      setLoading(true);
      
      // Mock data - in real app, this would come from API
      const mockRegisteredEvents: Event[] = [
        {
          id: 1,
          title: "Tech Innovation Summit 2024",
          description: "Annual technology conference featuring latest innovations",
          date: "2024-02-15",
          time: "09:00",
          location: "Main Auditorium",
          maxParticipants: 500,
          currentParticipants: 342,
          status: 'approved',
          registrationDate: "2024-01-20"
        },
        {
          id: 2,
          title: "Cultural Fest - Rangoli Competition",
          description: "Traditional art competition celebrating cultural diversity",
          date: "2024-02-20",
          time: "14:00",
          location: "Central Courtyard",
          maxParticipants: 100,
          currentParticipants: 78,
          status: 'approved',
          registrationDate: "2024-01-25"
        }
      ];

      const mockCreatedEvents: Event[] = [
        {
          id: 3,
          title: "Photography Workshop",
          description: "Learn professional photography techniques",
          date: "2024-02-25",
          time: "10:00",
          location: "Art Studio",
          maxParticipants: 30,
          currentParticipants: 15,
          status: 'approved',
          organizer: user?.name
        },
        {
          id: 4,
          title: "Coding Bootcamp",
          description: "Intensive programming workshop for beginners",
          date: "2024-03-01",
          time: "09:00",
          location: "Computer Lab",
          maxParticipants: 50,
          currentParticipants: 0,
          status: 'pending',
          organizer: user?.name
        }
      ];

      // Filter based on user role and tab
      if (user?.role === 'organizer') {
        setMyEvents(activeTab === 'registered' ? mockRegisteredEvents : mockCreatedEvents);
      } else {
        setMyEvents(mockRegisteredEvents);
      }
      
      setLoading(false);
    };

    loadMyEvents();
  }, [user, activeTab]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="text-green-400" size={16} />;
      case 'rejected':
        return <XCircle className="text-red-400" size={16} />;
      case 'pending':
        return <AlertCircle className="text-yellow-400" size={16} />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      case 'pending':
        return 'Pending Approval';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            My Events
          </h1>
          <p className="text-gray-300 text-lg">
            {user?.role === 'organizer' 
              ? 'Manage your registered events and created events'
              : 'View and manage your registered events'
            }
          </p>
        </div>

        {/* Tabs for Organizers */}
        {user?.role === 'organizer' && (
          <div className="mb-8">
            <div className="flex space-x-1 bg-gray-800/50 p-1 rounded-lg backdrop-blur-sm border border-gray-700/50">
              <button
                onClick={() => setActiveTab('registered')}
                className={`flex-1 py-3 px-6 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'registered'
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                Registered Events
              </button>
              <button
                onClick={() => setActiveTab('created')}
                className={`flex-1 py-3 px-6 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'created'
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                Created Events
              </button>
            </div>
          </div>
        )}

        {/* Events Grid */}
        {myEvents.length === 0 ? (
          <div className="text-center py-20">
            <Calendar size={64} className="mx-auto text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No events found
            </h3>
            <p className="text-gray-500 mb-6">
              {activeTab === 'registered' 
                ? "You haven't registered for any events yet."
                : "You haven't created any events yet."
              }
            </p>
            {activeTab === 'registered' ? (
              <Link 
                to="/events" 
                className="btn btn-primary"
              >
                Browse Events
              </Link>
            ) : (
              <Link 
                to="/create-event" 
                className="btn btn-primary"
              >
                Create Event
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myEvents.map((event) => (
              <div key={event.id} className="card group hover:scale-105 transition-all duration-300">
                {/* Event Image */}
                <div className="relative h-48 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-t-lg overflow-hidden">
                  {event.poster ? (
                    <img 
                      src={event.poster} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Calendar size={48} className="text-emerald-400/50" />
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  {activeTab === 'created' && (
                    <div className="absolute top-3 right-3">
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                        event.status === 'approved' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                        event.status === 'rejected' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                        'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                      }`}>
                        {getStatusIcon(event.status)}
                        {getStatusText(event.status)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Event Details */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-emerald-400 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Event Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar size={14} />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock size={14} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Users size={14} />
                      <span>{event.currentParticipants}/{event.maxParticipants} participants</span>
                    </div>
                    {event.registrationDate && (
                      <div className="text-xs text-gray-500">
                        Registered on: {new Date(event.registrationDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link 
                      to={`/events/${event.id}`}
                      className="flex-1 btn btn-secondary text-center"
                    >
                      <Eye size={16} />
                      View Details
                    </Link>
                    
                    {activeTab === 'created' && (
                      <>
                        <button className="btn btn-secondary p-2">
                          <Edit size={16} />
                        </button>
                        <button className="btn btn-danger p-2">
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;