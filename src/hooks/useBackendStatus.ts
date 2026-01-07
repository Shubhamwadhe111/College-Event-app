/**
 * React Hook for Backend Status Detection
 * 
 * Provides real-time backend availability status and automatic mode switching
 */

import { useState, useEffect, useCallback } from 'react';
import { 
  getBackendDetectionService, 
  BackendStatus, 
  BackendStatusEvent,
  waitForInitialCheck 
} from '../services/backendDetection';

export interface UseBackendStatusReturn {
  status: BackendStatus;
  isAvailable: boolean;
  isChecking: boolean;
  lastChecked: Date | null;
  error: string | null;
  forceCheck: () => Promise<void>;
}

export const useBackendStatus = (): UseBackendStatusReturn => {
  const [status, setStatus] = useState<BackendStatus>('checking');
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const service = getBackendDetectionService();

  // Force a manual health check
  const forceCheck = useCallback(async () => {
    setStatus('checking');
    setError(null);
    
    try {
      const isHealthy = await service.checkBackendHealth();
      const newStatus: BackendStatus = isHealthy ? 'available' : 'unavailable';
      setStatus(newStatus);
      setLastChecked(new Date());
    } catch (err) {
      setStatus('unavailable');
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLastChecked(new Date());
    }
  }, [service]);

  useEffect(() => {
    // Get initial status
    const initialStatus = service.getCurrentStatus();
    setStatus(initialStatus);

    // Subscribe to status changes
    const unsubscribe = service.onStatusChange((event: BackendStatusEvent) => {
      setStatus(event.status);
      setLastChecked(event.timestamp);
      setError(event.error || null);
    });

    // Start periodic checking
    service.startPeriodicCheck();

    // Wait for initial check if still checking
    if (initialStatus === 'checking') {
      waitForInitialCheck().then((finalStatus) => {
        setStatus(finalStatus);
        setLastChecked(new Date());
      });
    }

    // Cleanup on unmount
    return () => {
      unsubscribe();
      // Note: We don't stop periodic checking here as other components might be using it
    };
  }, [service]);

  return {
    status,
    isAvailable: status === 'available',
    isChecking: status === 'checking',
    lastChecked,
    error,
    forceCheck,
  };
};

// Hook for components that only need to know if backend is available
export const useIsBackendAvailable = (): boolean => {
  const { isAvailable } = useBackendStatus();
  return isAvailable;
};

// Hook that waits for initial backend check to complete
export const useBackendReady = (): { isReady: boolean; isAvailable: boolean } => {
  const { status, isAvailable } = useBackendStatus();
  
  return {
    isReady: status !== 'checking',
    isAvailable,
  };
};