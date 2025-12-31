import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { userAPI, organizerAPI, adminAPI } from '../services/api';
import { mockAPI } from '../services/mockApi';

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
      
      // Check if we should use mock API
      const useMock = await mockAPI.shouldUseMock();
      
      if (useMock) {
        // Use mock API for demo
        response = await mockAPI.login({ email, password });
        const userData: User = {
          ...response.user,
          id: response.user.id.toString(),
          registeredEvents: response.user.registeredEvents || [],
          createdAt: response.user.createdAt || new Date().toISOString(),
        };
        
        setUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
        setIsLoading(false);
        return { success: true, message: response.message || 'Login successful!' };
      } else {
        // Try different login endpoints based on user type
        if (userType === 'admin') {
          response = await adminAPI.login({ email, password });
        } else if (userType === 'organizer') {
          response = await organizerAPI.login({ email, password });
        } else {
          response = await userAPI.login({ email, password });
        }
        
        // The backend now returns a user object that is mostly compatible with the frontend User type.
        const userData: User = {
          ...response.user,
          id: response.user.id.toString(),
          registeredEvents: [], // This should be fetched separately.
          createdAt: response.user.created_at || new Date().toISOString(), // Use backend value if available.
        };
        
        setUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
        setIsLoading(false);
        return { success: true, message: response.message || 'Login successful!' };
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error('Login error:', error);
      return { success: false, message: error.message || 'Login failed' };
    }
  };

  const register = async (userData: Omit<User, 'id' | 'registeredEvents' | 'createdAt'> & { password: string }): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    
    try {
      // Check if we should use mock API
      const useMock = await mockAPI.shouldUseMock();
      
      if (useMock) {
        // Use mock API for demo
        const response = await mockAPI.register({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          studentId: userData.studentId,
          college: userData.college || '',
          role: userData.role as 'student' | 'organizer'
        });
        
        // Auto-login after successful registration
        const loginResponse = await mockAPI.login({
          email: userData.email,
          password: userData.password
        });
        
        const userDataForState: User = {
          ...loginResponse.user,
          id: loginResponse.user.id.toString(),
          registeredEvents: loginResponse.user.registeredEvents || [],
          createdAt: loginResponse.user.createdAt || new Date().toISOString(),
        };
        
        setUser(userDataForState);
        localStorage.setItem('currentUser', JSON.stringify(userDataForState));
        setIsLoading(false);
        return { success: true, message: response.message || 'Registration successful!' };
      } else {
        // Use real API
        const response = await userAPI.register({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          studentId: userData.studentId,
          college: userData.college || '',
          year: userData.year || '1'
        });
        
        setIsLoading(false);
        return { success: true, message: response.message || 'Registration successful!' };
      }
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