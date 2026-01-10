/**
 * Storage Abstraction Layer
 * 
 * Provides unified interface for data operations that works with both
 * database (live mode) and localStorage (demo mode)
 */

import { 
  userAPI, 
  organizerAPI, 
  adminAPI, 
  eventAPI, 
  registrationAPI,
  collegeAPI,
  adminManagementAPI,
  notificationAPI
} from './api';
import { getBackendDetectionService } from './backendDetection';
import { LocalStorageService } from './localStorageService';

// Types for our data models
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'student' | 'organizer' | 'admin' | 'master';
  // Role-specific fields
  studentId?: string;
  college?: string;
  year?: string;
  department?: string;
  designation?: string;
  isApproved?: boolean; // For organizers - requires admin approval
  createdAt: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  eventType: string;
  startDate: string;
  endDate: string;
  time: string;
  venue: string;
  organizerId: string;
  registrationFee?: number;
  maxParticipants?: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  approvalStatus: 'pending' | 'approved' | 'rejected';
  registrations: string[]; // user IDs
  createdAt: string;
}

export interface Registration {
  id: string;
  userId: string;
  eventId: string;
  registrationDate: string;
  paymentStatus: 'paid' | 'unpaid' | 'refunded';
}

export interface College {
  id: string;
  name: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  adminCount: number;
  eventCount: number;
  studentCount: number;
  status: 'active' | 'inactive';
  joinedDate: string;
  lastActivity: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  eventsManaged: number;
  lastLogin?: string;
  joinedDate: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  priority: string;
  category: string;
  status: string;
  createdAt: string;
  sentAt?: string;
  readCount: number;
  totalRecipients: number;
  metadata?: {
    organizerId?: string;
    organizerName?: string;
    organizerEmail?: string;
    organizerDepartment?: string;
    actionRequired?: string;
  };
}

// Results for operations
export interface RegistrationResult {
  success: boolean;
  message: string;
  userId?: string;
}

export interface LoginResult {
  success: boolean;
  message: string;
  user?: User;
  redirectTo?: string;
}

// Storage service interface
export interface StorageService {
  // User Management
  registerUser(userData: any): Promise<RegistrationResult>;
  loginUser(credentials: { email: string; password: string }, userType?: string): Promise<LoginResult>;
  getUserById(id: string): Promise<User | null>;
  
  // Event Management
  createEvent(eventData: any): Promise<Event>;
  getEvents(): Promise<Event[]>;
  getEventById(id: string): Promise<Event | null>;
  updateEvent(id: string, eventData: any): Promise<void>;
  deleteEvent(id: string): Promise<void>;
  
  // Registration Management
  registerForEvent(userId: string, eventId: string): Promise<void>;
  unregisterFromEvent(userId: string, eventId: string): Promise<void>;
  getUserRegistrations(userId: string): Promise<Registration[]>;
  
  // Admin Operations
  getUsers(): Promise<User[]>;
  deleteUser(userId: string): Promise<void>;
  approveOrganizer(organizerId: string, action: 'approve' | 'reject'): Promise<void>;
  approveEvent(eventId: string, action: 'approve' | 'reject'): Promise<void>;
  
  // College Management (Master Admin)
  getColleges(): Promise<College[]>;
  createCollege(collegeData: any): Promise<College>;
  updateCollege(id: string, collegeData: any): Promise<void>;
  deleteCollege(id: string): Promise<void>;
  
  // Admin Management (Master Admin)
  getAdmins(): Promise<Admin[]>;
  createAdmin(adminData: any): Promise<Admin>;
  updateAdmin(id: string, adminData: any): Promise<void>;
  deleteAdmin(id: string): Promise<void>;
  
  // Notification Management (Master Admin)
  getNotifications(): Promise<Notification[]>;
  createNotification(notificationData: any): Promise<Notification>;
  deleteNotification(id: string): Promise<void>;
}

// Database Storage Service (Live Mode)
class DatabaseStorageService implements StorageService {
  async registerUser(userData: any): Promise<RegistrationResult> {
    try {
      console.debug('DatabaseStorageService: Registering user', { ...userData, password: '[HIDDEN]' });
      let response;
      
      if (userData.role === 'organizer') {
        response = await organizerAPI.register(userData);
      } else if (userData.role === 'admin' || userData.role === 'master') {
        response = await adminAPI.register(userData);
      } else {
        response = await userAPI.register(userData);
      }
      
      console.debug('DatabaseStorageService: Registration successful', response);
      return {
        success: true,
        message: response.message || 'Registration successful',
        userId: response.userId || response.organizerId || response.adminId,
      };
    } catch (error: any) {
      console.error('DatabaseStorageService: Registration failed', error);
      return {
        success: false,
        message: error.message || 'Registration failed. Please check your connection and try again.',
      };
    }
  }

  async loginUser(credentials: { email: string; password: string }, userType = 'student'): Promise<LoginResult> {
    try {
      console.debug('DatabaseStorageService: Logging in user', { email: credentials.email, userType });
      let response;
      
      if (userType === 'admin' || userType === 'master') {
        response = await adminAPI.login(credentials);
      } else if (userType === 'organizer') {
        response = await organizerAPI.login(credentials);
      } else {
        response = await userAPI.login(credentials);
      }
      
      console.debug('DatabaseStorageService: Login successful', response);
      
      const user: User = {
        id: response.user.id.toString(),
        name: response.user.name,
        email: response.user.email,
        phone: response.user.phone,
        role: response.user.role,
        studentId: response.user.studentId,
        college: response.user.college || response.user.department,
        year: response.user.year,
        department: response.user.department,
        designation: response.user.designation,
        createdAt: response.user.createdAt || new Date().toISOString(),
      };
      
      let redirectTo = '/dashboard';
      if (user.role === 'master') {
        redirectTo = '/nexussuper/dashboard';
      } else if (user.role === 'admin') {
        redirectTo = '/nexusadmin/dashboard';
      }
      
      return {
        success: true,
        message: response.message || 'Login successful',
        user,
        redirectTo,
      };
    } catch (error: any) {
      console.error('DatabaseStorageService: Login failed', error);
      return {
        success: false,
        message: error.message || 'Login failed. Please check your credentials and try again.',
      };
    }
  }

  async getUserById(id: string): Promise<User | null> {
    // Implementation would call appropriate API endpoint
    return null; // Placeholder
  }

  async createEvent(eventData: any): Promise<Event> {
    const response = await eventAPI.create(eventData);
    return response as Event;
  }

  async getEvents(): Promise<Event[]> {
    const response = await eventAPI.getAll();
    return response as Event[];
  }

  async getEventById(id: string): Promise<Event | null> {
    try {
      const response = await eventAPI.getById(id);
      return response as Event;
    } catch {
      return null;
    }
  }

  async updateEvent(id: string, eventData: any): Promise<void> {
    await eventAPI.update(id, eventData);
  }

  async deleteEvent(id: string): Promise<void> {
    await eventAPI.delete(id);
  }

  async registerForEvent(userId: string, eventId: string): Promise<void> {
    await registrationAPI.register({ 
      event_id: parseInt(eventId), 
      user_id: parseInt(userId) 
    });
  }

  async unregisterFromEvent(userId: string, eventId: string): Promise<void> {
    await registrationAPI.unregister({ 
      event_id: parseInt(eventId), 
      user_id: parseInt(userId) 
    });
  }

  async getUserRegistrations(userId: string): Promise<Registration[]> {
    const response = await registrationAPI.getUserRegistrations(parseInt(userId));
    return response as Registration[];
  }

  async getUsers(): Promise<User[]> {
    const response = await adminAPI.getUsers();
    return response as User[];
  }

  async deleteUser(userId: string): Promise<void> {
    await adminAPI.deleteUser(userId);
  }

  async approveOrganizer(organizerId: string, action: 'approve' | 'reject'): Promise<void> {
    await adminAPI.approveOrganizer(parseInt(organizerId), action, 1); // TODO: Get actual admin ID
  }

  async approveEvent(eventId: string, action: 'approve' | 'reject'): Promise<void> {
    await adminAPI.approveEvent(parseInt(eventId), action, 1); // TODO: Get actual admin ID
  }

  async getColleges(): Promise<College[]> {
    const response = await collegeAPI.getAll();
    return response as College[];
  }

  async createCollege(collegeData: any): Promise<College> {
    const response = await collegeAPI.create(collegeData);
    return response as College;
  }

  async updateCollege(id: string, collegeData: any): Promise<void> {
    await collegeAPI.update(id, collegeData);
  }

  async deleteCollege(id: string): Promise<void> {
    await collegeAPI.delete(id);
  }

  async getAdmins(): Promise<Admin[]> {
    const response = await adminManagementAPI.getAll();
    return response as Admin[];
  }

  async createAdmin(adminData: any): Promise<Admin> {
    const response = await adminManagementAPI.create(adminData);
    return response as Admin;
  }

  async updateAdmin(id: string, adminData: any): Promise<void> {
    await adminManagementAPI.update(id, adminData);
  }

  async deleteAdmin(id: string): Promise<void> {
    await adminManagementAPI.delete(id);
  }

  async getNotifications(): Promise<Notification[]> {
    const response = await notificationAPI.getAll();
    return response as Notification[];
  }

  async createNotification(notificationData: any): Promise<Notification> {
    const response = await notificationAPI.create(notificationData);
    return response as Notification;
  }

  async deleteNotification(id: string): Promise<void> {
    await notificationAPI.delete(id);
  }
}

// Get the appropriate storage service based on backend availability
export const getStorageService = (): StorageService => {
  const backendService = getBackendDetectionService();
  const status = backendService.getCurrentStatus();
  
  console.debug('Storage service selection - Backend status:', status);
  
  // If backend is available, always use database service
  if (status === 'available') {
    console.debug('Using DatabaseStorageService (backend available)');
    return new DatabaseStorageService();
  }
  
  // If still checking, try database service first (it will fail gracefully if backend is down)
  if (status === 'checking') {
    console.debug('Using DatabaseStorageService (checking backend...)');
    return new DatabaseStorageService();
  }
  
  // Backend is unavailable - use localStorage for demo mode
  console.debug('Using LocalStorageService (demo mode - backend unavailable)');
  console.info('📱 Running in DEMO MODE - Data is stored locally in your browser');
  return new LocalStorageService();
};