import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Event, Registration, FilterOptions } from '../types';

// Notification helper function
const sendNotification = (notification: {
  userId: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  link?: string;
  data?: any;
}) => {
  const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
  const newNotification = {
    ...notification,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    read: false,
  };
  notifications.unshift(newNotification);
  localStorage.setItem('notifications', JSON.stringify(notifications));
  
  // Trigger storage event for real-time updates
  window.dispatchEvent(new StorageEvent('storage'));
};

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

  useEffect(() => {
    // Initialize empty events and registrations if not exists
    const storedEvents = localStorage.getItem('events');
    const storedRegistrations = localStorage.getItem('registrations');
    
    if (!storedEvents) {
      localStorage.setItem('events', JSON.stringify([]));
      setEvents([]);
    } else {
      setEvents(JSON.parse(storedEvents));
    }

    if (!storedRegistrations) {
      localStorage.setItem('registrations', JSON.stringify([]));
      setRegistrations([]);
    } else {
      setRegistrations(JSON.parse(storedRegistrations));
    }

    setIsLoading(false);
  }, []);

  const createEvent = async (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'registered'>): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const newEvent: Event = {
        ...eventData,
        id: Date.now().toString(),
        registered: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      
      // Notify all admins about new event
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const admins = users.filter((u: any) => u.role === 'admin' || u.role === 'collegeadmin' || u.role === 'superadmin');
      admins.forEach((admin: any) => {
        sendNotification({
          userId: admin.id,
          type: 'info',
          title: '🎉 New Event Created',
          message: `${eventData.organizer} created "${eventData.title}"`,
          link: `/events/${newEvent.id}`,
          data: { eventId: newEvent.id }
        });
      });

      // Notify organizer
      sendNotification({
        userId: eventData.organizerId,
        type: 'success',
        title: '✅ Event Created Successfully',
        message: `Your event "${eventData.title}" is now live!`,
        link: `/events/${newEvent.id}`,
        data: { eventId: newEvent.id }
      });
      
      setIsLoading(false);
      return { success: true, message: 'Event created successfully!' };
    } catch (error) {
      setIsLoading(false);
      return { success: false, message: 'Failed to create event' };
    }
  };

  const updateEvent = async (id: string, eventData: Partial<Event>): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const event = events.find(e => e.id === id);
      if (!event) {
        setIsLoading(false);
        return { success: false, message: 'Event not found' };
      }

      const updatedEvents = events.map(event => 
        event.id === id 
          ? { ...event, ...eventData, updatedAt: new Date().toISOString() }
          : event
      );
      
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      
      // Notify all registered students about event update
      const eventRegistrations = registrations.filter(r => r.eventId === id);
      eventRegistrations.forEach(reg => {
        sendNotification({
          userId: reg.userId,
          type: 'info',
          title: '📝 Event Updated',
          message: `"${event.title}" has been updated. Check the latest details.`,
          link: `/events/${id}`,
          data: { eventId: id }
        });
      });

      // Notify organizer
      sendNotification({
        userId: event.organizerId,
        type: 'success',
        title: '✅ Event Updated',
        message: `Your event "${event.title}" has been updated successfully.`,
        link: `/events/${id}`,
        data: { eventId: id }
      });
      
      setIsLoading(false);
      return { success: true, message: 'Event updated successfully!' };
    } catch (error) {
      setIsLoading(false);
      return { success: false, message: 'Failed to update event' };
    }
  };

  const deleteEvent = async (id: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const event = events.find(e => e.id === id);
      if (!event) {
        setIsLoading(false);
        return { success: false, message: 'Event not found' };
      }

      // Notify all registered students about event cancellation
      const eventRegistrations = registrations.filter(r => r.eventId === id);
      eventRegistrations.forEach(reg => {
        sendNotification({
          userId: reg.userId,
          type: 'warning',
          title: '⚠️ Event Cancelled',
          message: `"${event.title}" has been cancelled. You will be refunded if applicable.`,
          data: { eventId: id }
        });
      });

      const updatedEvents = events.filter(event => event.id !== id);
      const updatedRegistrations = registrations.filter(reg => reg.eventId !== id);
      
      setEvents(updatedEvents);
      setRegistrations(updatedRegistrations);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      localStorage.setItem('registrations', JSON.stringify(updatedRegistrations));
      
      setIsLoading(false);
      return { success: true, message: 'Event deleted successfully!' };
    } catch (error) {
      setIsLoading(false);
      return { success: false, message: 'Failed to delete event' };
    }
  };

  const registerForEvent = async (eventId: string, userId: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const event = events.find(e => e.id === eventId);
      if (!event) {
        setIsLoading(false);
        return { success: false, message: 'Event not found' };
      }

      if (event.registered >= event.capacity) {
        setIsLoading(false);
        return { success: false, message: 'Event is full' };
      }

      const existingRegistration = registrations.find(r => r.eventId === eventId && r.userId === userId);
      if (existingRegistration) {
        setIsLoading(false);
        return { success: false, message: 'Already registered for this event' };
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.id === userId);

      const newRegistration: Registration = {
        id: Date.now().toString(),
        userId,
        eventId,
        registeredAt: new Date().toISOString(),
        status: 'registered',
        paymentStatus: event.isPaid ? 'pending' : undefined
      };

      const updatedRegistrations = [...registrations, newRegistration];
      const updatedEvents = events.map(e => 
        e.id === eventId ? { ...e, registered: e.registered + 1 } : e
      );

      setRegistrations(updatedRegistrations);
      setEvents(updatedEvents);
      localStorage.setItem('registrations', JSON.stringify(updatedRegistrations));
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      
      // Notify organizer about new registration
      sendNotification({
        userId: event.organizerId,
        type: 'success',
        title: '🎉 New Registration',
        message: `${user?.name || 'Someone'} registered for "${event.title}"! (${event.registered + 1}/${event.capacity})`,
        link: `/events/${eventId}`,
        data: { eventId, userId }
      });

      // Notify student about successful registration
      sendNotification({
        userId: userId,
        type: 'success',
        title: '✅ Registration Confirmed',
        message: `You're registered for "${event.title}"! Event date: ${new Date(event.date).toLocaleDateString()}`,
        link: `/events/${eventId}`,
        data: { eventId }
      });

      // Notify admins
      const admins = users.filter((u: any) => u.role === 'admin' || u.role === 'collegeadmin');
      admins.forEach((admin: any) => {
        sendNotification({
          userId: admin.id,
          type: 'info',
          title: '📊 New Event Registration',
          message: `${user?.name || 'A student'} registered for "${event.title}"`,
          link: `/events/${eventId}`,
          data: { eventId, userId }
        });
      });
      
      setIsLoading(false);
      return { success: true, message: 'Successfully registered for event!' };
    } catch (error) {
      setIsLoading(false);
      return { success: false, message: 'Failed to register for event' };
    }
  };

  const unregisterFromEvent = async (eventId: string, userId: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const event = events.find(e => e.id === eventId);
      if (!event) {
        setIsLoading(false);
        return { success: false, message: 'Event not found' };
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.id === userId);

      const updatedRegistrations = registrations.filter(r => !(r.eventId === eventId && r.userId === userId));
      const updatedEvents = events.map(e => 
        e.id === eventId ? { ...e, registered: Math.max(0, e.registered - 1) } : e
      );

      setRegistrations(updatedRegistrations);
      setEvents(updatedEvents);
      localStorage.setItem('registrations', JSON.stringify(updatedRegistrations));
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      
      // Notify organizer about cancellation
      sendNotification({
        userId: event.organizerId,
        type: 'info',
        title: '📉 Registration Cancelled',
        message: `${user?.name || 'Someone'} cancelled registration for "${event.title}" (${Math.max(0, event.registered - 1)}/${event.capacity})`,
        link: `/events/${eventId}`,
        data: { eventId, userId }
      });

      // Notify student about cancellation
      sendNotification({
        userId: userId,
        type: 'info',
        title: '✅ Unregistered Successfully',
        message: `You've been unregistered from "${event.title}"`,
        data: { eventId }
      });
      
      setIsLoading(false);
      return { success: true, message: 'Successfully unregistered from event!' };
    } catch (error) {
      setIsLoading(false);
      return { success: false, message: 'Failed to unregister from event' };
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
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};