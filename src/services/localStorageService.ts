/**
 * LocalStorage Service Implementation
 * 
 * Provides full data persistence using browser localStorage for demo mode
 */

import bcrypt from 'bcryptjs';
import { 
  StorageService, 
  User, 
  Event, 
  Registration, 
  College, 
  Admin, 
  Notification,
  RegistrationResult,
  LoginResult
} from './storageAbstraction';

// LocalStorage keys
const STORAGE_KEYS = {
  USERS: 'nexus_demo_users',
  EVENTS: 'nexus_demo_events',
  REGISTRATIONS: 'nexus_demo_registrations',
  COLLEGES: 'nexus_demo_colleges',
  ADMINS: 'nexus_demo_admins',
  NOTIFICATIONS: 'nexus_demo_notifications',
  METADATA: 'nexus_demo_metadata',
} as const;

// Type definitions for localStorage data structures
interface UserWithPassword extends User {
  password: string;
}

interface StoredUsers {
  [id: string]: UserWithPassword;
}

interface StoredEvents {
  [id: string]: Event;
}

interface StoredRegistrations {
  [id: string]: Registration;
}

interface StoredColleges {
  [id: string]: College;
}

interface StoredAdmins {
  [id: string]: Admin;
}

interface StoredNotifications {
  [id: string]: Notification;
}

interface StoredMetadata {
  version: string;
  lastUpdated: string;
  nextUserId: number;
  nextEventId: number;
  nextRegistrationId: number;
  nextCollegeId: number;
  nextAdminId: number;
  nextNotificationId: number;
}

export class LocalStorageService implements StorageService {
  private readonly ADMIN_SECRET_CODE = 'ADMIN2024';

  // Utility methods for localStorage operations
  private getData<T>(key: string, defaultValue: T): T {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return defaultValue;
    }
  }

  private setData<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error);
      throw new Error('Failed to save data to local storage');
    }
  }

  private generateId(type: 'user' | 'event' | 'registration' | 'college' | 'admin' | 'notification'): string {
    const metadata = this.getData<StoredMetadata>(STORAGE_KEYS.METADATA, {
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
      nextUserId: 1,
      nextEventId: 1,
      nextRegistrationId: 1,
      nextCollegeId: 1,
      nextAdminId: 1,
      nextNotificationId: 1,
    });

    let id: string;
    switch (type) {
      case 'user':
        id = metadata.nextUserId.toString();
        metadata.nextUserId++;
        break;
      case 'event':
        id = metadata.nextEventId.toString();
        metadata.nextEventId++;
        break;
      case 'registration':
        id = metadata.nextRegistrationId.toString();
        metadata.nextRegistrationId++;
        break;
      case 'college':
        id = metadata.nextCollegeId.toString();
        metadata.nextCollegeId++;
        break;
      case 'admin':
        id = metadata.nextAdminId.toString();
        metadata.nextAdminId++;
        break;
      case 'notification':
        id = metadata.nextNotificationId.toString();
        metadata.nextNotificationId++;
        break;
    }

    metadata.lastUpdated = new Date().toISOString();
    this.setData(STORAGE_KEYS.METADATA, metadata);
    return id;
  }

  // User Management
  async registerUser(userData: any): Promise<RegistrationResult> {
    try {
      const users = this.getData<StoredUsers>(STORAGE_KEYS.USERS, {});
      
      // Check if email already exists
      const existingUser = Object.values(users).find((user: UserWithPassword) => user.email === userData.email);
      if (existingUser) {
        return {
          success: false,
          message: 'Email already registered',
        };
      }

      // Validate secret code for admin/master roles
      if ((userData.role === 'admin' || userData.role === 'master') && userData.secretCode !== this.ADMIN_SECRET_CODE) {
        return {
          success: false,
          message: 'Invalid secret code. Access denied.',
        };
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      // Create user
      const userId = this.generateId('user');
      
      // Organizers need admin approval before they can login
      const isOrganizer = userData.role === 'organizer';
      
      const user: User = {
        id: userId,
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '',
        role: userData.role || 'student',
        studentId: userData.studentId,
        college: userData.college || userData.department,
        year: userData.year,
        department: userData.department,
        designation: userData.designation,
        isApproved: isOrganizer ? false : true, // Organizers need approval, others are auto-approved
        createdAt: new Date().toISOString(),
      };

      // Store user with hashed password (for login verification)
      const userWithPassword: UserWithPassword = { ...user, password: hashedPassword };
      users[userId] = userWithPassword;
      this.setData(STORAGE_KEYS.USERS, users);

      // Create notification for admin if organizer registered
      if (isOrganizer) {
        this.createOrganizerApprovalNotification(user);
      }

      const message = isOrganizer 
        ? 'Registration submitted! Please wait for admin approval before you can login.'
        : 'Registration successful! Please login to continue.';

      return {
        success: true,
        message,
        userId,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Registration failed',
      };
    }
  }

  // Create notification for admin when organizer registers
  private createOrganizerApprovalNotification(organizer: User): void {
    const notifications = this.getData<StoredNotifications>(STORAGE_KEYS.NOTIFICATIONS, {});
    const notificationId = this.generateId('notification');
    
    const notification: Notification = {
      id: notificationId,
      title: 'New Organizer Registration',
      message: `${organizer.name} (${organizer.email}) from ${organizer.department || 'Unknown Organization'} has registered as an organizer and is waiting for approval.`,
      type: 'info',
      priority: 'high',
      category: 'approval',
      status: 'sent',
      createdAt: new Date().toISOString(),
      sentAt: new Date().toISOString(),
      readCount: 0,
      totalRecipients: 1,
      metadata: {
        organizerId: organizer.id,
        organizerName: organizer.name,
        organizerEmail: organizer.email,
        organizerDepartment: organizer.department,
        actionRequired: 'approve_organizer'
      }
    };

    notifications[notificationId] = notification;
    this.setData(STORAGE_KEYS.NOTIFICATIONS, notifications);
  }

  async loginUser(credentials: { email: string; password: string }, userType?: string): Promise<LoginResult> {
    try {
      const users = this.getData<StoredUsers>(STORAGE_KEYS.USERS, {});
      
      // Find user by email
      const userEntry = Object.entries(users).find(([, user]: [string, UserWithPassword]) => 
        user.email === credentials.email
      );

      if (!userEntry) {
        return {
          success: false,
          message: 'Invalid credentials',
        };
      }

      const [, userData] = userEntry;
      const user = userData as UserWithPassword;

      // Check if user role matches the requested userType (if specified)
      if (userType && user.role !== userType) {
        return {
          success: false,
          message: 'Invalid credentials',
        };
      }

      // Verify password
      const validPassword = await bcrypt.compare(credentials.password, user.password);
      if (!validPassword) {
        return {
          success: false,
          message: 'Invalid credentials',
        };
      }

      // Check if organizer is approved
      if (user.role === 'organizer' && user.isApproved === false) {
        return {
          success: false,
          message: 'Your organizer account is pending approval. Please wait for admin to approve your registration.',
        };
      }

      // Remove password from user object
      const { password, ...userWithoutPassword } = user;
      const cleanUser: User = userWithoutPassword;

      // Determine redirect URL
      let redirectTo = '/dashboard';
      if (cleanUser.role === 'master') {
        redirectTo = '/nexussuper/dashboard';
      } else if (cleanUser.role === 'admin') {
        redirectTo = '/nexusadmin/dashboard';
      }

      return {
        success: true,
        message: 'Login successful!',
        user: cleanUser,
        redirectTo,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Login failed',
      };
    }
  }

  async getUserById(id: string): Promise<User | null> {
    const users = this.getData<StoredUsers>(STORAGE_KEYS.USERS, {});
    const user = users[id];
    if (!user) return null;
    
    // Remove password from returned user
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // Event Management
  async createEvent(eventData: any): Promise<Event> {
    const events = this.getData<StoredEvents>(STORAGE_KEYS.EVENTS, {});
    const eventId = this.generateId('event');
    
    const event: Event = {
      id: eventId,
      name: eventData.eventName || eventData.name,
      description: eventData.description,
      shortDescription: eventData.shortDescription,
      eventType: eventData.eventType,
      startDate: eventData.startDate,
      endDate: eventData.endDate,
      time: eventData.time,
      venue: eventData.venue,
      organizerId: eventData.organizerId,
      registrationFee: eventData.registrationFee || 0,
      maxParticipants: eventData.maxParticipants,
      status: 'upcoming',
      approvalStatus: 'approved', // Auto-approve in demo mode
      registrations: [],
      createdAt: new Date().toISOString(),
    };

    events[eventId] = event;
    this.setData(STORAGE_KEYS.EVENTS, events);
    return event;
  }

  async getEvents(): Promise<Event[]> {
    const events = this.getData<StoredEvents>(STORAGE_KEYS.EVENTS, {});
    return Object.values(events).filter((event: Event) => event.approvalStatus === 'approved');
  }

  async getEventById(id: string): Promise<Event | null> {
    const events = this.getData<StoredEvents>(STORAGE_KEYS.EVENTS, {});
    return events[id] || null;
  }

  async updateEvent(id: string, eventData: any): Promise<void> {
    const events = this.getData<StoredEvents>(STORAGE_KEYS.EVENTS, {});
    if (events[id]) {
      events[id] = { ...events[id], ...eventData };
      this.setData(STORAGE_KEYS.EVENTS, events);
    }
  }

  async deleteEvent(id: string): Promise<void> {
    const events = this.getData<StoredEvents>(STORAGE_KEYS.EVENTS, {});
    delete events[id];
    this.setData(STORAGE_KEYS.EVENTS, events);
    
    // Also remove related registrations
    const registrations = this.getData<StoredRegistrations>(STORAGE_KEYS.REGISTRATIONS, {});
    const updatedRegistrations: StoredRegistrations = {};
    Object.entries(registrations).forEach(([regId, reg]) => {
      if (reg.eventId !== id) {
        updatedRegistrations[regId] = reg;
      }
    });
    this.setData(STORAGE_KEYS.REGISTRATIONS, updatedRegistrations);
  }

  // Registration Management
  async registerForEvent(userId: string, eventId: string): Promise<void> {
    const registrations = this.getData<StoredRegistrations>(STORAGE_KEYS.REGISTRATIONS, {});
    const events = this.getData<StoredEvents>(STORAGE_KEYS.EVENTS, {});
    
    // Check if already registered
    const existingRegistration = Object.values(registrations).find((reg: Registration) => 
      reg.userId === userId && reg.eventId === eventId
    );
    
    if (existingRegistration) {
      throw new Error('Already registered for this event');
    }

    // Check event capacity
    const event = events[eventId];
    if (event && event.maxParticipants) {
      const currentRegistrations = Object.values(registrations).filter((reg: Registration) => 
        reg.eventId === eventId
      ).length;
      
      if (currentRegistrations >= event.maxParticipants) {
        throw new Error('Event is full');
      }
    }

    // Create registration
    const registrationId = this.generateId('registration');
    const registration: Registration = {
      id: registrationId,
      userId,
      eventId,
      registrationDate: new Date().toISOString(),
      paymentStatus: 'unpaid',
    };

    registrations[registrationId] = registration;
    this.setData(STORAGE_KEYS.REGISTRATIONS, registrations);

    // Update event registrations list
    if (event) {
      event.registrations.push(userId);
      events[eventId] = event;
      this.setData(STORAGE_KEYS.EVENTS, events);
    }
  }

  async unregisterFromEvent(userId: string, eventId: string): Promise<void> {
    const registrations = this.getData<StoredRegistrations>(STORAGE_KEYS.REGISTRATIONS, {});
    const events = this.getData<StoredEvents>(STORAGE_KEYS.EVENTS, {});
    
    // Find and remove registration
    const registrationEntry = Object.entries(registrations).find(([, reg]: [string, Registration]) => 
      reg.userId === userId && reg.eventId === eventId
    );
    
    if (registrationEntry) {
      const [registrationId] = registrationEntry;
      delete registrations[registrationId];
      this.setData(STORAGE_KEYS.REGISTRATIONS, registrations);
      
      // Update event registrations list
      const event = events[eventId];
      if (event) {
        event.registrations = event.registrations.filter((id: string) => id !== userId);
        events[eventId] = event;
        this.setData(STORAGE_KEYS.EVENTS, events);
      }
    }
  }

  async getUserRegistrations(userId: string): Promise<Registration[]> {
    const registrations = this.getData<StoredRegistrations>(STORAGE_KEYS.REGISTRATIONS, {});
    return Object.values(registrations).filter((reg: Registration) => reg.userId === userId);
  }

  // Admin Operations
  async getUsers(): Promise<User[]> {
    const users = this.getData<StoredUsers>(STORAGE_KEYS.USERS, {});
    return Object.values(users).map((user: UserWithPassword) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  async deleteUser(userId: string): Promise<void> {
    const users = this.getData<StoredUsers>(STORAGE_KEYS.USERS, {});
    delete users[userId];
    this.setData(STORAGE_KEYS.USERS, users);
  }

  async approveOrganizer(organizerId: string, action: 'approve' | 'reject'): Promise<void> {
    const users = this.getData<StoredUsers>(STORAGE_KEYS.USERS, {});
    if (users[organizerId] && users[organizerId].role === 'organizer') {
      if (action === 'approve') {
        users[organizerId].isApproved = true;
        this.setData(STORAGE_KEYS.USERS, users);
        console.log(`Approved organizer ${organizerId}`);
      } else {
        // For reject, we can either delete the user or mark them as rejected
        delete users[organizerId];
        this.setData(STORAGE_KEYS.USERS, users);
        console.log(`Rejected and removed organizer ${organizerId}`);
      }
    }
  }

  // Get pending organizer approvals
  async getPendingOrganizers(): Promise<User[]> {
    const users = this.getData<StoredUsers>(STORAGE_KEYS.USERS, {});
    return Object.values(users)
      .filter((user: UserWithPassword) => user.role === 'organizer' && user.isApproved === false)
      .map((user: UserWithPassword) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
  }

  async approveEvent(eventId: string, action: 'approve' | 'reject'): Promise<void> {
    const events = this.getData<StoredEvents>(STORAGE_KEYS.EVENTS, {});
    if (events[eventId]) {
      events[eventId].approvalStatus = action === 'approve' ? 'approved' : 'rejected';
      this.setData(STORAGE_KEYS.EVENTS, events);
    }
  }

  // College Management (Master Admin)
  async getColleges(): Promise<College[]> {
    const colleges = this.getData<StoredColleges>(STORAGE_KEYS.COLLEGES, {});
    return Object.values(colleges);
  }

  async createCollege(collegeData: any): Promise<College> {
    const colleges = this.getData<StoredColleges>(STORAGE_KEYS.COLLEGES, {});
    const collegeId = this.generateId('college');
    
    const college: College = {
      id: collegeId,
      name: collegeData.name,
      location: collegeData.location,
      email: collegeData.email,
      phone: collegeData.phone,
      website: collegeData.website,
      adminCount: 0,
      eventCount: 0,
      studentCount: 0,
      status: 'active',
      joinedDate: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
    };

    colleges[collegeId] = college;
    this.setData(STORAGE_KEYS.COLLEGES, colleges);
    return college;
  }

  async updateCollege(id: string, collegeData: any): Promise<void> {
    const colleges = this.getData<StoredColleges>(STORAGE_KEYS.COLLEGES, {});
    if (colleges[id]) {
      colleges[id] = { ...colleges[id], ...collegeData };
      this.setData(STORAGE_KEYS.COLLEGES, colleges);
    }
  }

  async deleteCollege(id: string): Promise<void> {
    const colleges = this.getData<StoredColleges>(STORAGE_KEYS.COLLEGES, {});
    delete colleges[id];
    this.setData(STORAGE_KEYS.COLLEGES, colleges);
  }

  // Admin Management (Master Admin)
  async getAdmins(): Promise<Admin[]> {
    const admins = this.getData<StoredAdmins>(STORAGE_KEYS.ADMINS, {});
    return Object.values(admins);
  }

  async createAdmin(adminData: any): Promise<Admin> {
    const admins = this.getData<StoredAdmins>(STORAGE_KEYS.ADMINS, {});
    const adminId = this.generateId('admin');
    
    const admin: Admin = {
      id: adminId,
      name: adminData.name,
      email: adminData.email,
      phone: adminData.phone,
      role: adminData.role,
      department: adminData.department,
      status: 'active',
      eventsManaged: 0,
      joinedDate: new Date().toISOString(),
    };

    admins[adminId] = admin;
    this.setData(STORAGE_KEYS.ADMINS, admins);
    return admin;
  }

  async updateAdmin(id: string, adminData: any): Promise<void> {
    const admins = this.getData<StoredAdmins>(STORAGE_KEYS.ADMINS, {});
    if (admins[id]) {
      admins[id] = { ...admins[id], ...adminData };
      this.setData(STORAGE_KEYS.ADMINS, admins);
    }
  }

  async deleteAdmin(id: string): Promise<void> {
    const admins = this.getData<StoredAdmins>(STORAGE_KEYS.ADMINS, {});
    delete admins[id];
    this.setData(STORAGE_KEYS.ADMINS, admins);
  }

  // Notification Management (Master Admin)
  async getNotifications(): Promise<Notification[]> {
    const notifications = this.getData<StoredNotifications>(STORAGE_KEYS.NOTIFICATIONS, {});
    return Object.values(notifications);
  }

  async createNotification(notificationData: any): Promise<Notification> {
    const notifications = this.getData<StoredNotifications>(STORAGE_KEYS.NOTIFICATIONS, {});
    const notificationId = this.generateId('notification');
    
    const notification: Notification = {
      id: notificationId,
      title: notificationData.title,
      message: notificationData.message,
      type: notificationData.type,
      priority: notificationData.priority,
      category: notificationData.category,
      status: 'sent',
      createdAt: new Date().toISOString(),
      sentAt: new Date().toISOString(),
      readCount: 0,
      totalRecipients: 1,
    };

    notifications[notificationId] = notification;
    this.setData(STORAGE_KEYS.NOTIFICATIONS, notifications);
    return notification;
  }

  async deleteNotification(id: string): Promise<void> {
    const notifications = this.getData<StoredNotifications>(STORAGE_KEYS.NOTIFICATIONS, {});
    delete notifications[id];
    this.setData(STORAGE_KEYS.NOTIFICATIONS, notifications);
  }

  // Utility methods for demo data management
  exportData(): string {
    const data = {
      users: this.getData(STORAGE_KEYS.USERS, {}),
      events: this.getData(STORAGE_KEYS.EVENTS, {}),
      registrations: this.getData(STORAGE_KEYS.REGISTRATIONS, {}),
      colleges: this.getData(STORAGE_KEYS.COLLEGES, {}),
      admins: this.getData(STORAGE_KEYS.ADMINS, {}),
      notifications: this.getData(STORAGE_KEYS.NOTIFICATIONS, {}),
      metadata: this.getData(STORAGE_KEYS.METADATA, {}),
      exportedAt: new Date().toISOString(),
      version: '1.0.0',
    };
    
    return JSON.stringify(data, null, 2);
  }

  importData(jsonData: string): void {
    try {
      const data = JSON.parse(jsonData);
      
      // Validate data structure
      if (!data.version || !data.exportedAt) {
        throw new Error('Invalid data format');
      }
      
      // Import data
      this.setData(STORAGE_KEYS.USERS, data.users || {});
      this.setData(STORAGE_KEYS.EVENTS, data.events || {});
      this.setData(STORAGE_KEYS.REGISTRATIONS, data.registrations || {});
      this.setData(STORAGE_KEYS.COLLEGES, data.colleges || {});
      this.setData(STORAGE_KEYS.ADMINS, data.admins || {});
      this.setData(STORAGE_KEYS.NOTIFICATIONS, data.notifications || {});
      this.setData(STORAGE_KEYS.METADATA, data.metadata || {});
      
    } catch (error) {
      throw new Error('Failed to import data: Invalid JSON format');
    }
  }

  clearAllData(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
}