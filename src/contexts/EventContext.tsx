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
  const [registrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch events from API
  const refreshEvents = async () => {
    try {
      setIsLoading(true);
      const apiEvents = await eventAPI.getAll();
      setEvents(apiEvents);
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
      
      const apiEventData = {
        eventName: eventData.title,
        shortDescription: eventData.shortDescription,
        description: eventData.description,
        eventType: eventData.category,
        startDate: eventData.date,
        endDate: eventData.endDate || eventData.date,
        time: eventData.time,
        venue: eventData.venue,
        registrationFee: eventData.price,
        maxParticipants: eventData.capacity,
        organizerId: parseInt(eventData.organizerId),
        images: eventData.images,
        tags: eventData.tags,
        prizes: eventData.prizes,
        requirements: eventData.requirements,
        contactInfo: eventData.contactInfo,
        paymentInfo: eventData.paymentInfo,
        socialLinks: eventData.socialLinks,
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
    try {
      setIsLoading(true);
      await eventAPI.update(id, eventData);
      await refreshEvents();
      return { success: true, message: 'Event updated successfully' };
    } catch (error: any) {
      console.error('Failed to update event:', error);
      return { success: false, message: error.message || 'Failed to update event' };
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEvent = async (id: string): Promise<{ success: boolean; message: string }> => {
    try {
      setIsLoading(true);
      await eventAPI.delete(id);
      await refreshEvents();
      return { success: true, message: 'Event deleted successfully' };
    } catch (error: any) {
      console.error('Failed to delete event:', error);
      return { success: false, message: error.message || 'Failed to delete event' };
    } finally {
      setIsLoading(false);
    }
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
    try {
      setIsLoading(true);
      
      await registrationAPI.unregister({
        event_id: parseInt(eventId),
        user_id: parseInt(userId)
      });
      
      await refreshEvents(); // Refresh to get updated registration count
      
      return { success: true, message: 'Successfully unregistered from event!' };
    } catch (error: any) {
      console.error('Failed to unregister from event:', error);
      return { success: false, message: error.message || 'Failed to unregister from event' };
    } finally {
      setIsLoading(false);
    }
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