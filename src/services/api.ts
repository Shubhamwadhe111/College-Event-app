import { API_CONFIG, checkAPIConnection, retryRequest } from '../config/api.config';

// Helper function for API calls with proper error handling and retry mechanism
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const requestFn = () => fetch(url, {
    ...options,
    headers: {
      ...API_CONFIG.DEFAULT_HEADERS,
      ...options.headers,
    },
    signal: AbortSignal.timeout(API_CONFIG.TIMEOUT)
  });

  try {
    console.log(`🔗 API Call: ${options.method || 'GET'} ${url}`);
    
    const response = await retryRequest(requestFn);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `API request failed with status: ${response.status}`);
    }

    console.log('✅ API call successful');
    return data;
  } catch (error: any) {
    console.error(`❌ API call failed for ${url}:`, error.message);
    
    if (error.name === 'TimeoutError') {
      throw new Error('Request timeout. Please check your connection and try again.');
    }
    
    if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
      throw new Error('Cannot connect to server. Make sure the backend is running on port 5001.');
    }
    
    throw error;
  }
}

// Test API connection
export const testAPI = {
  health: async () => {
    return apiCall(API_CONFIG.ENDPOINTS.HEALTH);
  },
  
  checkConnection: checkAPIConnection
};

// User API (Students)
export const userAPI = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    college: string;
    year?: string;
    studentId: string;
  }) => {
    return apiCall('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials: { email: string; password: string }) => {
    return apiCall('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
};

// Organizer API
export const organizerAPI = {
  register: async (organizerData: {
    name: string;
    email: string;
    password: string;
    phone: string;
    department: string;
    designation: string;
  }) => {
    return apiCall('/organizers/register', {
      method: 'POST',
      body: JSON.stringify(organizerData),
    });
  },

  login: async (credentials: { email: string; password: string }) => {
    return apiCall('/organizers/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
};

// Event API
export const eventAPI = {
  getAll: async () => {
    return apiCall('/events');
  },

  getById: async (id: string) => {
    return apiCall(`/events/${id}`);
  },

  create: async (eventData: any) => {
    return apiCall('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  },

  update: async (id: string, eventData: any) => {
    return apiCall(`/events/${id}`, {
        method: 'PUT',
        body: JSON.stringify(eventData),
    });
  },

  delete: async (id: string) => {
    return apiCall(`/events/${id}`, {
        method: 'DELETE',
    });
  },
};

// Registration API
export const registrationAPI = {
  register: async (data: { event_id: number; user_id: number }) => {
    return apiCall('/registrations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  unregister: async (data: { event_id: number; user_id: number }) => {
    return apiCall('/registrations', {
      method: 'DELETE',
      body: JSON.stringify(data),
    });
  },

  getUserRegistrations: async (userId: number) => {
    return apiCall(`/registrations/user/${userId}`);
  },
};

// Admin API
export const adminAPI = {
  register: async (adminData: {
    name: string;
    email: string;
    password: string;
    phone: string;
    department: string;
    secretCode: string;
  }) => {
    return apiCall('/admin/register', {
      method: 'POST',
      body: JSON.stringify(adminData),
    });
  },

  login: async (credentials: { email: string; password: string }) => {
    return apiCall('/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  getStats: async () => {
    return apiCall('/admin/stats');
  },

  getPendingOrganizers: async () => {
    return apiCall('/admin/pending-organizers');
  },

  approveOrganizer: async (organizerId: number, action: 'approve' | 'reject', adminId: number, remarks?: string) => {
    return apiCall(`/admin/organizers/${organizerId}/approve`, {
      method: 'POST',
      body: JSON.stringify({ action, admin_id: adminId, remarks }),
    });
  },

  getPendingEvents: async () => {
    return apiCall('/admin/pending-events');
  },

  approveEvent: async (eventId: number, action: 'approve' | 'reject', adminId: number, remarks?: string) => {
    return apiCall(`/admin/events/${eventId}/approve`, {
      method: 'POST',
      body: JSON.stringify({ action, admin_id: adminId, remarks }),
    });
  },

  getUsers: async () => {
    return apiCall('/users');
  },

  deleteUser: async (userId: string) => {
    return apiCall(`/users/${userId}`, {
      method: 'DELETE',
    });
  },

  getEvents: async () => {
    return apiCall('/events');
  },

  deleteEvent: async (eventId: string) => {
    return apiCall(`/events/${eventId}`, {
      method: 'DELETE',
    });
  },

  changeUserRole: async (userId: string, newRole: string) => {
    return apiCall(`/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role: newRole }),
    });
  },
};

// College API (for master admin)
export const collegeAPI = {
  getAll: async () => {
    return apiCall('/colleges');
  },

  create: async (collegeData: {
    name: string;
    location: string;
    email: string;
    phone: string;
    website: string;
  }) => {
    return apiCall('/colleges', {
      method: 'POST',
      body: JSON.stringify(collegeData),
    });
  },

  update: async (id: string, collegeData: any) => {
    return apiCall(`/colleges/${id}`, {
      method: 'PUT',
      body: JSON.stringify(collegeData),
    });
  },

  delete: async (id: string) => {
    return apiCall(`/colleges/${id}`, {
      method: 'DELETE',
    });
  },
};

// Admin Management API (for master admin)
export const adminManagementAPI = {
  getAll: async () => {
    return apiCall('/admins');
  },

  create: async (adminData: {
    name: string;
    email: string;
    phone: string;
    department: string;
    role: string;
    password?: string;
  }) => {
    return apiCall('/admins', {
      method: 'POST',
      body: JSON.stringify(adminData),
    });
  },

  update: async (id: string, adminData: any) => {
    return apiCall(`/admins/${id}`, {
      method: 'PUT',
      body: JSON.stringify(adminData),
    });
  },

  delete: async (id: string) => {
    return apiCall(`/admins/${id}`, {
      method: 'DELETE',
    });
  },
};

// Notification API (for master admin)
export const notificationAPI = {
  getAll: async () => {
    return apiCall('/notifications');
  },

  create: async (notificationData: {
    title: string;
    message: string;
    type: string;
    priority: string;
    category: string;
    recipients: string[];
  }) => {
    return apiCall('/notifications', {
      method: 'POST',
      body: JSON.stringify(notificationData),
    });
  },

  delete: async (id: string) => {
    return apiCall(`/notifications/${id}`, {
      method: 'DELETE',
    });
  },
};
