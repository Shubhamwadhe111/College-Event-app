import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Event, Registration, FilterOptions } from '../types';
import { eventAPI, registrationAPI } from '../services/api';

interface EventContextType {
  events: Event[];
  registrations: Registration[];
  createEvent: (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'registered'>) => Promise<{ success: boolean; message: string }>;
  updateEvent: (id: string, eventData: Partial<Event>) => Promise<{ success: boolean; message: string }>;
  deleteEvent: (id: string) => Promise<{ success: boolean; message: string }>;
  registerForEvent: (eventId: string, userId: string) => Promise<{ success: boolean; message: string }>;
  unregisterFromEvent: (eventId: string, userId: string) => Promise<{ success: boolean; message: string }>;
  getEventById: (id: string) => Event | undefined;
  getEventsByOrganizer: (organizerId: string) => Event[];
  getUserRegistrations: (userId: string) => Registration[];
  filterEvents: (filters: FilterOptions) => Event[];
  searchEvents: (query: string) => Event[];
  isLoading: boolean;
  refreshEvents: () => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};

interface EventProviderProps {
  children: ReactNode;
}

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch events from API
  const refreshEvents = async () => {
    try {
      setIsLoading(true);
      const response = await eventAPI.getAll();
      
      // Transform API response to match Event interface
      const transformedEvents: Event[] = response.map((apiEvent: any) => ({
        id: apiEvent.event_id.toString(),
        title: apiEvent.event_name,
        description: apiEvent.description || '',
        date: apiEvent.start_date,
        time: apiEvent.time,
        location: apiEvent.venue,
        organizer: apiEvent.organizer_name,
        organizerId: apiEvent.organizer_id?.toString() || '',
        category: apiEvent.event_type,
        capacity: apiEvent.max_participants || 100,
        registered: apiEvent.registered_count || 0,
        price: apiEvent.registration_fee || 0,
        isPaid: (apiEvent.registration_fee || 0) > 0,
        status: apiEvent.status || 'upcoming',
        tags: [apiEvent.event_type],
        imageUrl: '/api/placeholder/400/300',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
      
      setEvents(transformedEvents);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      // Fallback to empty array if API fails
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshEvents();
  }, []);

  const createEvent = async (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'registered'>): Promise<{ success: boolean; message: string }> => {
    try {
      setIsLoading(true);
      
      // Transform to API format
      const apiEventData = {
        event_name: eventData.title,
        description: eventData.description,
        event_type: eventData.category,
        start_date: eventData.date,
        end_date: eventData.date, // Same as start date for single-day events
        time: eventData.time,
        venue: eventData.location,
        registration_fee: eventData.price || 0,
        max_participants: eventData.capacity,
        organizer_id: parseInt(eventData.organizerId)
      };

      await eventAPI.create(apiEventData);
      await refreshEvents(); // Refresh events list
      
      return { success: true, message: 'Event created successfully and submitted for approval!' };
    } catch (error: any) {
      console.error('Failed to create event:', error);
      return { success: false, message: error.message || 'Failed to create event' };
    } finally {
      setIsLoading(false);
    }
  };

  const updateEvent = async (id: string, eventData: Partial<Event>): Promise<{ success: boolean; message: string }> => {
    // For now, return not implemented since we need to add update API endpoint
    return { success: false, message: 'Event update not implemented yet' };
  };

  const deleteEvent = async (id: string): Promise<{ success: boolean; message: string }> => {
    // For now, return not implemented since we need to add delete API endpoint
    return { success: false, message: 'Event deletion not implemented yet' };
  };

  const registerForEvent = async (eventId: string, userId: string): Promise<{ success: boolean; message: string }> => {
    try {
      setIsLoading(true);
      
      await registrationAPI.register({
        event_id: parseInt(eventId),
        user_id: parseInt(userId)
      });
      
      await refreshEvents(); // Refresh to get updated registration count
      
      return { success: true, message: 'Successfully registered for event!' };
    } catch (error: any) {
      console.error('Failed to register for event:', error);
      return { success: false, message: error.message || 'Failed to register for event' };
    } finally {
      setIsLoading(false);
    }
  };

  const unregisterFromEvent = async (eventId: string, userId: string): Promise<{ success: boolean; message: string }> => {
    // For now, return not implemented since we need to add unregister API endpoint
    return { success: false, message: 'Event unregistration not implemented yet' };
  };

  const getEventById = (id: string): Event | undefined => {
    return events.find(event => event.id === id);
  };

  const getEventsByOrganizer = (organizerId: string): Event[] => {
    return events.filter(event => event.organizerId === organizerId);
  };

  const getUserRegistrations = (userId: string): Registration[] => {
    return registrations.filter(reg => reg.userId === userId);
  };

  const filterEvents = (filters: FilterOptions): Event[] => {
    return events.filter(event => {
      if (filters.category && event.category !== filters.category) return false;
      if (filters.status && event.status !== filters.status) return false;
      if (filters.location && !event.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (filters.priceRange) {
        if (event.price < filters.priceRange.min || event.price > filters.priceRange.max) return false;
      }
      if (filters.dateRange) {
        const eventDate = new Date(event.date);
        const startDate = new Date(filters.dateRange.start);
        const endDate = new Date(filters.dateRange.end);
        if (eventDate < startDate || eventDate > endDate) return false;
      }
      return true;
    });
  };

  const searchEvents = (query: string): Event[] => {
    const lowercaseQuery = query.toLowerCase();
    return events.filter(event =>
      event.title.toLowerCase().includes(lowercaseQuery) ||
      event.description.toLowerCase().includes(lowercaseQuery) ||
      event.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      event.organizer.toLowerCase().includes(lowercaseQuery) ||
      event.location.toLowerCase().includes(lowercaseQuery)
    );
  };

  const value = {
    events,
    registrations,
    createEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
    unregisterFromEvent,
    getEventById,
    getEventsByOrganizer,
    getUserRegistrations,
    filterEvents,
    searchEvents,
    isLoading,
    refreshEvents,
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};