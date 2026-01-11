/**
 * Authentication Service
 * Handles all authentication API calls to the backend
 * Falls back to localStorage if backend is unavailable
 */

const API_URL = process.env.REACT_APP_API_URL || 'https://nexus-event-backend.onrender.com/api';
const REQUEST_TIMEOUT = 60000; // 60 seconds for backend cold start

/**
 * Helper function to make fetch requests with timeout
 */
const fetchWithTimeout = async (url: string, options: RequestInit, timeout: number = REQUEST_TIMEOUT): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - backend server is waking up. Please try again.');
    }
    throw error;
  }
};

interface LoginResponse {
  success: boolean;
  message: string;
  user?: any;
  redirectTo?: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  userId?: number;
  organizerId?: number;
  adminId?: number;
}

/**
 * Student Registration
 */
export const registerStudent = async (data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  studentId?: string;
  college?: string;
  year?: string;
}): Promise<RegisterResponse> => {
  try {
    console.log('[AuthService] Registering student:', data.email);
    
    const response = await fetchWithTimeout(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('[AuthService] Student registered successfully');
      return {
        success: true,
        message: result.message || 'Registration successful',
        userId: result.userId,
      };
    } else {
      console.log('[AuthService] Registration failed:', result.error);
      return {
        success: false,
        message: result.error || 'Registration failed',
      };
    }
  } catch (error: any) {
    console.error('[AuthService] Student registration error:', error);
    return {
      success: false,
      message: error.message || 'Network error. Please try again.',
    };
  }
};

/**
 * Student Login
 */
export const loginStudent = async (data: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  try {
    console.log('[AuthService] Logging in student:', data.email);
    
    const response = await fetchWithTimeout(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('[AuthService] Student login successful');
      return {
        success: true,
        message: result.message || 'Login successful',
        user: result.user,
        redirectTo: '/events',
      };
    } else {
      console.log('[AuthService] Login failed:', result.error);
      return {
        success: false,
        message: result.error || 'Invalid credentials',
      };
    }
  } catch (error: any) {
    console.error('[AuthService] Student login error:', error);
    return {
      success: false,
      message: error.message || 'Network error. Please try again.',
    };
  }
};

/**
 * Organizer Registration
 */
export const registerOrganizer = async (data: {
  name: string;
  email: string;
  password: string;
  phone: string;
  department: string;
  designation: string;
}): Promise<RegisterResponse> => {
  try {
    console.log('[AuthService] Registering organizer:', data.email);
    
    const response = await fetchWithTimeout(`${API_URL}/organizers/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('[AuthService] Organizer registered successfully');
      return {
        success: true,
        message: result.message || 'Registration submitted. Please wait for admin approval.',
        organizerId: result.organizerId,
      };
    } else {
      console.log('[AuthService] Organizer registration failed:', result.error);
      return {
        success: false,
        message: result.error || 'Registration failed',
      };
    }
  } catch (error: any) {
    console.error('[AuthService] Organizer registration error:', error);
    return {
      success: false,
      message: error.message || 'Network error. Please try again.',
    };
  }
};

/**
 * Organizer Login
 */
export const loginOrganizer = async (data: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  try {
    console.log('[AuthService] Logging in organizer:', data.email);
    
    const response = await fetchWithTimeout(`${API_URL}/organizers/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('[AuthService] Organizer login successful');
      return {
        success: true,
        message: result.message || 'Login successful',
        user: result.user,
        redirectTo: '/create-event',
      };
    } else {
      console.log('[AuthService] Organizer login failed:', result.error);
      return {
        success: false,
        message: result.error || 'Invalid credentials or account not approved',
      };
    }
  } catch (error: any) {
    console.error('[AuthService] Organizer login error:', error);
    return {
      success: false,
      message: error.message || 'Network error. Please try again.',
    };
  }
};

/**
 * Admin Registration
 */
export const registerAdmin = async (data: {
  name: string;
  email: string;
  password: string;
  phone: string;
  department: string;
  secretCode: string;
}): Promise<RegisterResponse> => {
  try {
    console.log('[AuthService] Registering admin:', data.email);
    
    const response = await fetchWithTimeout(`${API_URL}/admin/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('[AuthService] Admin registered successfully');
      return {
        success: true,
        message: result.message || 'Admin registration successful',
        adminId: result.adminId,
      };
    } else {
      console.log('[AuthService] Admin registration failed:', result.error);
      return {
        success: false,
        message: result.error || 'Registration failed',
      };
    }
  } catch (error: any) {
    console.error('[AuthService] Admin registration error:', error);
    return {
      success: false,
      message: error.message || 'Network error. Please try again.',
    };
  }
};

/**
 * Admin Login
 */
export const loginAdmin = async (data: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  try {
    console.log('[AuthService] Logging in admin:', data.email);
    
    const response = await fetchWithTimeout(`${API_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('[AuthService] Admin login successful');
      return {
        success: true,
        message: result.message || 'Login successful',
        user: result.user,
        redirectTo: '/nexusadmin/dashboard',
      };
    } else {
      console.log('[AuthService] Admin login failed:', result.error);
      return {
        success: false,
        message: result.error || 'Invalid credentials',
      };
    }
  } catch (error: any) {
    console.error('[AuthService] Admin login error:', error);
    return {
      success: false,
      message: error.message || 'Network error. Please try again.',
    };
  }
};

/**
 * Check if backend is available
 */
export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.ok;
  } catch (error) {
    console.error('[AuthService] Backend health check failed:', error);
    return false;
  }
};
