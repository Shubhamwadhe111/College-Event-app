import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (userData: Omit<User, 'id' | 'registeredEvents' | 'createdAt'> & { password: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize empty users array if not exists
    const storedUsers = localStorage.getItem('users');
    if (!storedUsers) {
      localStorage.setItem('users', JSON.stringify([]));
    }

    // Check for existing session
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    
    try {
      // Get users and passwords from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const passwords = JSON.parse(localStorage.getItem('passwords') || '{}');
      
      // Find user by email
      const foundUser = users.find((u: User) => u.email === email);
      
      if (!foundUser) {
        setIsLoading(false);
        return { success: false, message: 'Invalid email or password' };
      }
      
      // Check password
      if (passwords[email] !== password) {
        setIsLoading(false);
        return { success: false, message: 'Invalid email or password' };
      }
      
      // Check if organizer is approved
      if (foundUser.role === 'organizer' && !foundUser.isApproved) {
        setIsLoading(false);
        return { 
          success: false, 
          message: 'Your organizer account is pending admin approval. Please wait for approval before logging in.' 
        };
      }
      
      // Check if organizer was rejected
      if (foundUser.role === 'organizer' && foundUser.approvalStatus === 'rejected') {
        setIsLoading(false);
        return { 
          success: false, 
          message: 'Your organizer account was rejected by admin. Please contact support for more information.' 
        };
      }
      
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      setIsLoading(false);
      return { success: true, message: 'Login successful!' };
    } catch (error: any) {
      setIsLoading(false);
      return { success: false, message: error.message || 'Login failed' };
    }
  };

  const register = async (userData: Omit<User, 'id' | 'registeredEvents' | 'createdAt'> & { password: string }): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    
    try {
      // Get existing users
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if email already exists
      if (users.some((u: User) => u.email === userData.email)) {
        setIsLoading(false);
        return { success: false, message: 'Email already registered' };
      }
      
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        studentId: userData.studentId,
        role: userData.role,
        college: userData.college || '',
        department: userData.department || '',
        year: userData.year || '',
        registeredEvents: [],
        createdAt: new Date().toISOString(),
        // Organizers need approval, students are auto-approved
        isApproved: userData.role === 'student',
        approvalStatus: userData.role === 'student' ? 'approved' : 'pending'
      };
      
      // Store password separately (in real app, this would be hashed on backend)
      const passwords = JSON.parse(localStorage.getItem('passwords') || '{}');
      passwords[userData.email] = userData.password;
      localStorage.setItem('passwords', JSON.stringify(passwords));
      
      // Add user to users array
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      setIsLoading(false);
      return { success: true, message: 'Registration successful!' };
    } catch (error: any) {
      setIsLoading(false);
      return { success: false, message: error.message || 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // Update in users array
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...userData };
        localStorage.setItem('users', JSON.stringify(users));
      }
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};