import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { userAPI, organizerAPI, adminAPI } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType?: 'student' | 'organizer' | 'admin' | 'master') => Promise<{ success: boolean; message: string; redirectTo?: string }>;
  register: (userData: Omit<User, 'id' | 'registeredEvents' | 'createdAt'> & { password: string }) => Promise<{ success: boolean; message: string }>;
  registerOrganizer: (organizerData: { name: string; email: string; password: string; phone: string; department: string; designation: string }) => Promise<{ success: boolean; message: string }>;
  registerAdmin: (adminData: { name: string; email: string; password: string; phone: string; department: string; secretCode: string }) => Promise<{ success: boolean; message: string }>;
  registerMaster: (masterData: { name: string; email: string; password: string; phone: string; organization: string; masterCode: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  clearAllSessions: () => void;
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

  const login = async (email: string, password: string, userType: 'student' | 'organizer' | 'admin' | 'master' = 'student'): Promise<{ success: boolean; message: string; redirectTo?: string }> => {
    setIsLoading(true);
    
    try {
      let response;
      
      // Try different login endpoints based on user type
      if (userType === 'admin' || userType === 'master') {
        response = await adminAPI.login({ email, password });
      } else if (userType === 'organizer') {
        response = await organizerAPI.login({ email, password });
      } else {
        // For student, try student API first, then try organizer and admin as fallback
        try {
          response = await userAPI.login({ email, password });
        } catch (studentError: any) {
          // If student login fails, try organizer
          try {
            response = await organizerAPI.login({ email, password });
          } catch (organizerError: any) {
            // If organizer login fails, try admin
            try {
              response = await adminAPI.login({ email, password });
            } catch (adminError: any) {
              // If all fail, throw the original student error
              throw studentError;
            }
          }
        }
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
      
      // Determine redirect URL based on user role
      let redirectTo = '/dashboard';
      if (userData.role === 'master') {
        redirectTo = '/nexussuper/dashboard';
      } else if (userData.role === 'admin') {
        redirectTo = '/nexusadmin/dashboard';
      } else if (userData.role === 'organizer') {
        redirectTo = '/dashboard'; // Organizers use main portal dashboard
      } else {
        redirectTo = '/dashboard'; // Students use main portal dashboard
      }
      
      return { success: true, message: response.message || 'Login successful!', redirectTo };
    } catch (error: any) {
      setIsLoading(false);
      console.error('Login error:', error);
      return { success: false, message: error.message || 'Login failed' };
    }
  };

  const register = async (userData: Omit<User, 'id' | 'registeredEvents' | 'createdAt'> & { password: string }): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    
    try {
      // Use real API only
      const response = await userAPI.register({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        phone: userData.phone || '',
        studentId: userData.studentId,
        college: userData.college || '',
        year: userData.year || '1'
      });
      
      // Don't auto-login after registration - let user manually login
      setIsLoading(false);
      return { success: true, message: response.message || 'Registration successful! Please login to continue.' };
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

  const registerMaster = async (masterData: { 
    name: string; 
    email: string; 
    password: string; 
    phone: string; 
    organization: string; 
    masterCode: string 
  }): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    
    try {
      // For now, use the admin registration API with master code validation
      const response = await adminAPI.register({
        name: masterData.name,
        email: masterData.email,
        password: masterData.password,
        phone: masterData.phone,
        department: masterData.organization,
        secretCode: masterData.masterCode
      });
      
      setIsLoading(false);
      return { success: true, message: 'Master registration successful' };
    } catch (error: any) {
      setIsLoading(false);
      console.error('Master registration error:', error);
      return { success: false, message: error.message || 'Master registration failed' };
    }
  };

  const clearAllSessions = () => {
    setUser(null);
    // Clear all possible auth-related localStorage items
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userSession');
    localStorage.removeItem('adminSession');
    localStorage.removeItem('masterSession');
    localStorage.removeItem('organizerSession');
    // Clear sessionStorage as well
    sessionStorage.clear();
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    // Also clear any other auth-related localStorage items
    localStorage.removeItem('authToken');
    localStorage.removeItem('userSession');
    localStorage.removeItem('adminSession');
    localStorage.removeItem('masterSession');
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
    registerMaster,
    logout,
    clearAllSessions,
    updateUser,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};