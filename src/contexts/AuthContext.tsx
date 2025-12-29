import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { userAPI, organizerAPI, adminAPI } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType?: 'student' | 'organizer' | 'admin') => Promise<{ success: boolean; message: string }>;
  register: (userData: Omit<User, 'id' | 'registeredEvents' | 'createdAt'> & { password: string }) => Promise<{ success: boolean; message: string }>;
  registerOrganizer: (organizerData: { name: string; email: string; password: string; phone: string; department: string; designation: string }) => Promise<{ success: boolean; message: string }>;
  registerAdmin: (adminData: { name: string; email: string; password: string; phone: string; department: string; secretCode: string }) => Promise<{ success: boolean; message: string }>;
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

  const login = async (email: string, password: string, userType: 'student' | 'organizer' | 'admin' = 'student'): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    
    try {
      let response;
      
      // Try different login endpoints based on user type
      if (userType === 'admin') {
        response = await adminAPI.login({ email, password });
      } else if (userType === 'organizer') {
        response = await organizerAPI.login({ email, password });
      } else {
        response = await userAPI.login({ email, password });
      }
      
      // Transform API response to User interface
      const userData: User = {
        id: response.user.id.toString(),
        name: response.user.name,
        email: response.user.email,
        studentId: response.user.student_id || '',
        role: response.user.role,
        college: response.user.department || '',
        department: response.user.department || '',
        year: response.user.year || '',
        registeredEvents: [],
        createdAt: new Date().toISOString(),
        isApproved: true,
        approvalStatus: 'approved'
      };
      
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      setIsLoading(false);
      return { success: true, message: response.message || 'Login successful!' };
    } catch (error: any) {
      setIsLoading(false);
      console.error('Login error:', error);
      return { success: false, message: error.message || 'Login failed' };
    }
  };

  const register = async (userData: Omit<User, 'id' | 'registeredEvents' | 'createdAt'> & { password: string }): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    
    try {
      const response = await userAPI.register({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        phone: userData.studentId || '', // Using studentId as phone for now
        college: userData.college || userData.department || '',
        year: userData.year || '1'
      });
      
      setIsLoading(false);
      return { success: true, message: response.message || 'Registration successful!' };
    } catch (error: any) {
      setIsLoading(false);
      console.error('Registration error:', error);
      return { success: false, message: error.message || 'Registration failed' };
    }
  };

  const registerOrganizer = async (organizerData: { 
    name: string; 
    email: string; 
    password: string; 
    phone: string; 
    department: string; 
    designation: string 
  }): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    
    try {
      const response = await organizerAPI.register(organizerData);
      
      setIsLoading(false);
      return { success: true, message: response.message || 'Organizer registration submitted for approval!' };
    } catch (error: any) {
      setIsLoading(false);
      console.error('Organizer registration error:', error);
      return { success: false, message: error.message || 'Organizer registration failed' };
    }
  };

  const registerAdmin = async (adminData: { 
    name: string; 
    email: string; 
    password: string; 
    phone: string; 
    department: string; 
    secretCode: string 
  }): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    
    try {
      const response = await adminAPI.register(adminData);
      
      setIsLoading(false);
      return { success: true, message: response.message || 'Admin account created successfully!' };
    } catch (error: any) {
      setIsLoading(false);
      console.error('Admin registration error:', error);
      return { success: false, message: error.message || 'Admin registration failed' };
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
    }
  };

  const value = {
    user,
    login,
    register,
    registerOrganizer,
    registerAdmin,
    logout,
    updateUser,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};