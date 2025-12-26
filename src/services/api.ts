const API_BASE_URL = 'http://localhost:5001/api';

// Helper function for API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error: any) {
    // Check if it's a network error
    if (error.message === 'Failed to fetch') {
      throw new Error('Cannot connect to server. Make sure the backend is running on port 5001.');
    }
    throw error;
  }
}

// User API
export const userAPI = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
    college: string;
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
};

// Registration API
export const registrationAPI = {
  register: async (data: { event_id: number; user_id: number }) => {
    return apiCall('/registrations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getUserRegistrations: async (userId: number) => {
    return apiCall(`/registrations/user/${userId}`);
  },
};

// Admin API
export const adminAPI = {
  login: async (credentials: { email: string; password: string }) => {
    return apiCall('/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  getUsers: async () => {
    return apiCall('/admin/users');
  },

  getStats: async () => {
    return apiCall('/admin/stats');
  },
};
