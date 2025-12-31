// Mock API for demo purposes when backend is not available
import { User } from '../types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data storage (in real app, this would be a database)
const mockUsers: Array<User & { password: string }> = [];

let nextUserId = 1;

export const mockAPI = {
  // User registration
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    studentId: string;
    college: string;
    role: 'student' | 'organizer';
  }) => {
    await delay(1000); // Simulate network delay

    // Check if email already exists
    const existingUser = mockUsers.find(user => user.email === userData.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Create new user
    const newUser: User & { password: string } = {
      id: nextUserId.toString(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      studentId: userData.studentId,
      role: userData.role,
      registeredEvents: [],
      createdAt: new Date().toISOString(),
      college: userData.college
    };

    mockUsers.push(newUser);
    nextUserId++;

    // Return user without password
    const { password, ...userWithoutPassword } = newUser;
    return {
      success: true,
      message: 'Registration successful!',
      user: userWithoutPassword
    };
  },

  // User login
  login: async (credentials: { email: string; password: string }) => {
    await delay(800); // Simulate network delay

    const user = mockUsers.find(u => 
      u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return {
      success: true,
      message: 'Login successful!',
      user: userWithoutPassword
    };
  },

  // Check if we should use mock API (when real API is not available)
  shouldUseMock: async () => {
    try {
      // Try to ping the real API
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
      
      const response = await fetch('http://localhost:5001/api/admin/stats', {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      clearTimeout(timeoutId);
      
      // If we get any response (even error), the server is running
      return false; // Use real API
    } catch (error: any) {
      console.log('Backend not available, using mock API:', error.message);
      // If we can't reach the real API, use mock
      return true; // Use mock API
    }
  }
};