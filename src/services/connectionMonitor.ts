// Connection Monitor Service
import { testAPI } from './api';

export class ConnectionMonitor {
  private static instance: ConnectionMonitor;
  private isConnected: boolean = false;
  private checkInterval: NodeJS.Timeout | null = null;
  private listeners: Array<(connected: boolean) => void> = [];

  private constructor() {}

  public static getInstance(): ConnectionMonitor {
    if (!ConnectionMonitor.instance) {
      ConnectionMonitor.instance = new ConnectionMonitor();
    }
    return ConnectionMonitor.instance;
  }

  // Start monitoring connection
  public startMonitoring(intervalMs: number = 30000): void {
    console.log('🔍 Starting connection monitoring...');
    
    // Initial check
    this.checkConnection();
    
    // Set up periodic checks
    this.checkInterval = setInterval(() => {
      this.checkConnection();
    }, intervalMs);
  }

  // Stop monitoring
  public stopMonitoring(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
      console.log('⏹️ Connection monitoring stopped');
    }
  }

  // Check connection status
  private async checkConnection(): Promise<void> {
    try {
      const connected = await testAPI.checkConnection();
      
      if (connected !== this.isConnected) {
        this.isConnected = connected;
        console.log(`🔄 Connection status changed: ${connected ? 'CONNECTED' : 'DISCONNECTED'}`);
        this.notifyListeners(connected);
      }
    } catch (error) {
      if (this.isConnected) {
        this.isConnected = false;
        console.log('🔄 Connection status changed: DISCONNECTED');
        this.notifyListeners(false);
      }
    }
  }

  // Add connection status listener
  public addListener(callback: (connected: boolean) => void): void {
    this.listeners.push(callback);
  }

  // Remove connection status listener
  public removeListener(callback: (connected: boolean) => void): void {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  // Notify all listeners
  private notifyListeners(connected: boolean): void {
    this.listeners.forEach(listener => {
      try {
        listener(connected);
      } catch (error) {
        console.error('Error in connection listener:', error);
      }
    });
  }

  // Get current connection status
  public getConnectionStatus(): boolean {
    return this.isConnected;
  }

  // Force connection check
  public async forceCheck(): Promise<boolean> {
    await this.checkConnection();
    return this.isConnected;
  }
}

// Export singleton instance
export const connectionMonitor = ConnectionMonitor.getInstance();