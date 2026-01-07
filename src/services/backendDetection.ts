/**
 * Backend Detection Service
 * 
 * Detects and monitors backend availability for automatic mode switching
 * between live (database) and demo (localStorage) modes.
 */

import { API_CONFIG } from '../config/api.config';

export type BackendStatus = 'available' | 'unavailable' | 'checking';

export interface BackendStatusEvent {
  status: BackendStatus;
  timestamp: Date;
  error?: string;
}

export interface BackendDetectionService {
  checkBackendHealth(): Promise<boolean>;
  startPeriodicCheck(): void;
  stopPeriodicCheck(): void;
  getCurrentStatus(): BackendStatus;
  onStatusChange(callback: (event: BackendStatusEvent) => void): () => void;
}

class BackendDetectionServiceImpl implements BackendDetectionService {
  private status: BackendStatus = 'checking';
  private checkInterval: NodeJS.Timeout | null = null;
  private statusChangeCallbacks: ((event: BackendStatusEvent) => void)[] = [];
  private readonly HEALTH_CHECK_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.HEALTH}`;
  private readonly CHECK_TIMEOUT = 3000; // 3 seconds
  private readonly CHECK_INTERVAL = 30000; // 30 seconds

  constructor() {
    // Perform initial health check
    this.performHealthCheck();
  }

  async checkBackendHealth(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.CHECK_TIMEOUT);

      const response = await fetch(this.HEALTH_CHECK_URL, {
        method: 'GET',
        signal: controller.signal,
        headers: API_CONFIG.DEFAULT_HEADERS,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        return data.status === 'OK';
      }

      return false;
    } catch (error) {
      // Network error, timeout, or other issues
      console.debug('Backend health check failed:', error);
      return false;
    }
  }

  private async performHealthCheck(): Promise<void> {
    const previousStatus = this.status;
    this.status = 'checking';

    try {
      const isHealthy = await this.checkBackendHealth();
      const newStatus: BackendStatus = isHealthy ? 'available' : 'unavailable';
      
      if (newStatus !== previousStatus) {
        this.status = newStatus;
        this.emitStatusChange({
          status: newStatus,
          timestamp: new Date(),
        });
      } else {
        this.status = newStatus;
      }
    } catch (error) {
      this.status = 'unavailable';
      this.emitStatusChange({
        status: 'unavailable',
        timestamp: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  startPeriodicCheck(): void {
    if (this.checkInterval) {
      return; // Already running
    }

    this.checkInterval = setInterval(() => {
      this.performHealthCheck();
    }, this.CHECK_INTERVAL);

    console.debug('Backend detection: Started periodic health checks');
  }

  stopPeriodicCheck(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
      console.debug('Backend detection: Stopped periodic health checks');
    }
  }

  getCurrentStatus(): BackendStatus {
    return this.status;
  }

  onStatusChange(callback: (event: BackendStatusEvent) => void): () => void {
    this.statusChangeCallbacks.push(callback);

    // Return unsubscribe function
    return () => {
      const index = this.statusChangeCallbacks.indexOf(callback);
      if (index > -1) {
        this.statusChangeCallbacks.splice(index, 1);
      }
    };
  }

  private emitStatusChange(event: BackendStatusEvent): void {
    console.debug('Backend status changed:', event);
    this.statusChangeCallbacks.forEach(callback => {
      try {
        callback(event);
      } catch (error) {
        console.error('Error in backend status change callback:', error);
      }
    });
  }

  // Cleanup method for when service is no longer needed
  destroy(): void {
    this.stopPeriodicCheck();
    this.statusChangeCallbacks = [];
  }
}

// Singleton instance
let backendDetectionService: BackendDetectionService | null = null;

export const getBackendDetectionService = (): BackendDetectionService => {
  if (!backendDetectionService) {
    backendDetectionService = new BackendDetectionServiceImpl();
  }
  return backendDetectionService;
};

// Utility function to check if backend is available (for quick checks)
export const isBackendAvailable = (): boolean => {
  const service = getBackendDetectionService();
  return service.getCurrentStatus() === 'available';
};

// Utility function to wait for initial backend check to complete
export const waitForInitialCheck = (): Promise<BackendStatus> => {
  return new Promise((resolve) => {
    const service = getBackendDetectionService();
    
    if (service.getCurrentStatus() !== 'checking') {
      resolve(service.getCurrentStatus());
      return;
    }

    const unsubscribe = service.onStatusChange((event) => {
      if (event.status !== 'checking') {
        unsubscribe();
        resolve(event.status);
      }
    });
  });
};