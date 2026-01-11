import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { getStorageService, getStorageServiceAsync } from '../services/storageAbstraction';

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
      console.debug('Login attempt:', { email, userType });
      // Use async version to wait for backend check
      const storageService = await getStorageServiceAsync();
      console.debug('Using storage service:', storageService.constructor.name);
      
      const result = await storageService.loginUser({ email, password }, userType);
      console.debug('Login result:', result);
      
      if (result.success && result.user) {
        // Convert storage user to frontend User type
        const userData: User = {
          ...result.user,
          studentId: result.user.studentId || result.user.id, // Use ID as fallback for studentId
          registeredEvents: [], // This should be fetched separately if needed
        };
        
        setUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
        setIsLoading(false);
        
        return { 
          success: true, 
          message: result.message, 
          redirectTo: result.redirectTo 
        };
      } else {
        setIsLoading(false);
        return { 
          success: false, 
          message: result.message 
        };
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
      console.debug('Registration attempt:', { ...userData, password: '[HIDDEN]' });
      // Use async version to wait for backend check
      const storageService = await getStorageServiceAsync();
      console.debug('Using storage service:', storageService.constructor.name);
      
      const registrationData = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        phone: userData.phone || '',
        studentId: userData.studentId,
        college: userData.college || '',
        year: userData.year || '1',
        role: 'student'
      };
      
      const result = await storageService.registerUser(registrationData);
      console.debug('Registration result:', result);
      
      if (result.success) {
        // Auto-login after successful registration
        console.debug('Auto-logging in after registration...');
        const loginResult = await storageService.loginUser({ 
          email: userData.email, 
          password: userData.password 
        }, 'student');
        
        if (loginResult.success && loginResult.user) {
          const userDataForContext: User = {
            ...loginResult.user,
            studentId: loginResult.user.studentId || loginResult.user.id,
            registeredEvents: [],
          };
          
          setUser(userDataForContext);
          localStorage.setItem('currentUser', JSON.stringify(userDataForContext));
          console.debug('Auto-login successful after registration');
        }
      }
      
      setIsLoading(false);
      
      return { 
        success: result.success, 
        message: result.message 
      };
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
      // Use async version to wait for backend check
      const storageService = await getStorageServiceAsync();
      const registrationData = {
        ...organizerData,
        role: 'organizer'
      };
      
      const result = await storageService.registerUser(registrationData);
      setIsLoading(false);
      
      return { 
        success: result.success, 
        message: result.message || 'Organizer registration submitted for approval!' 
      };
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
      // Use async version to wait for backend check
      const storageService = await getStorageServiceAsync();
      const registrationData = {
        ...adminData,
        role: 'admin'
      };
      
      const result = await storageService.registerUser(registrationData);
      setIsLoading(false);
      
      return { 
        success: result.success, 
        message: result.message || 'Admin account created successfully!' 
      };
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
      // Use async version to wait for backend check
      const storageService = await getStorageServiceAsync();
      const registrationData = {
        name: masterData.name,
        email: masterData.email,
        password: masterData.password,
        phone: masterData.phone,
        department: masterData.organization,
        secretCode: masterData.masterCode,
        role: 'master'
      };
      
      const result = await storageService.registerUser(registrationData);
      setIsLoading(false);
      
      return { 
        success: result.success, 
        message: result.message || 'Master registration successful' 
      };
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