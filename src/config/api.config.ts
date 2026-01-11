// API Configuration for Frontend
// FORCE LOCALSTORAGE MODE: Set to empty string to skip backend and use localStorage immediately
// This avoids the 30-60 second cold start delay from Render free tier
export const API_CONFIG = {
  // Backend API Base URL
  // Set to empty string to force localStorage mode (instant loading, no backend delays)
  // Set to backend URL to use live database (with 30-60s cold start on Render free tier)
  BASE_URL: '',  // FORCED LOCALSTORAGE MODE - Instant loading, no backend delays
  
  // To re-enable backend, uncomment below and comment out the line above:
  // BASE_URL: process.env.REACT_APP_API_URL || (
  //   process.env.NODE_ENV === 'production' 
  //     ? 'https://nexus-event-backend.onrender.com/api'
  //     : 'http://localhost:5001/api'
  // ),
  
  // Request timeout (30 seconds)
  TIMEOUT: 30000,
  
  // Retry configuration
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  
  // Headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  
  // Endpoints
  ENDPOINTS: {
    // Health check
    HEALTH: '/health',
    
    // Authentication
    USER_LOGIN: '/users/login',
    USER_REGISTER: '/users/register',
    ORGANIZER_LOGIN: '/organizers/login',
    ORGANIZER_REGISTER: '/organizers/register',
    ADMIN_LOGIN: '/admin/login',
    ADMIN_REGISTER: '/admin/register',
    
    // Events
    EVENTS: '/events',
    EVENT_BY_ID: (id: string) => `/events/${id}`,
    
    // Registrations
    REGISTRATIONS: '/registrations',
    USER_REGISTRATIONS: (userId: string) => `/registrations/user/${userId}`,
    
    // Admin
    ADMIN_STATS: '/admin/stats',
    PENDING_ORGANIZERS: '/admin/pending-organizers',
    APPROVE_ORGANIZER: (id: string) => `/admin/organizers/${id}/approve`,
    PENDING_EVENTS: '/admin/pending-events',
    APPROVE_EVENT: (id: string) => `/admin/events/${id}/approve`,
    
    // Users
    USERS: '/users',
    USER_BY_ID: (id: string) => `/users/${id}`,
    CHANGE_USER_ROLE: (id: string) => `/users/${id}/role`
  }
};

// Connection status checker
export const checkAPIConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.HEALTH}`, {
      method: 'GET',
      headers: API_CONFIG.DEFAULT_HEADERS,
      signal: AbortSignal.timeout(5000) // 5 second timeout for health check
    });
    
    if (response.ok) {
      console.log('✅ API connection successful');
      return true;
    } else {
      console.error('❌ API health check failed:', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ API connection failed:', error);
    return false;
  }
};

// Auto-retry mechanism for failed requests
export const retryRequest = async (
  requestFn: () => Promise<Response>,
  attempts: number = API_CONFIG.RETRY_ATTEMPTS
): Promise<Response> => {
  for (let i = 0; i < attempts; i++) {
    try {
      const response = await requestFn();
      if (response.ok) {
        return response;
      }
      throw new Error(`Request failed with status: ${response.status}`);
    } catch (error) {
      console.warn(`Request attempt ${i + 1} failed:`, error);
      
      if (i === attempts - 1) {
        throw error; // Last attempt failed
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY_DELAY * (i + 1)));
    }
  }
  
  throw new Error('All retry attempts failed');
};