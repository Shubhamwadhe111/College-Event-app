import React, { useState, useEffect } from 'react';
import { connectionMonitor } from '../services/connectionMonitor';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

const ConnectionStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    // Add connection listener
    const handleConnectionChange = (connected: boolean) => {
      setIsConnected(connected);
    };

    connectionMonitor.addListener(handleConnectionChange);
    
    // Start monitoring
    connectionMonitor.startMonitoring();
    
    // Initial status check
    setIsConnected(connectionMonitor.getConnectionStatus());

    // Cleanup
    return () => {
      connectionMonitor.removeListener(handleConnectionChange);
    };
  }, []);

  const handleRefresh = async () => {
    setIsChecking(true);
    try {
      const connected = await connectionMonitor.forceCheck();
      setIsConnected(connected);
    } catch (error) {
      console.error('Connection check failed:', error);
    } finally {
      setIsChecking(false);
    }
  };

  if (isConnected) {
    return (
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'rgba(16, 185, 129, 0.9)',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
      }}>
        <Wifi size={16} />
        Connected
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'rgba(239, 68, 68, 0.9)',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      fontWeight: '500',
      zIndex: 1000,
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)'
    }}>
      <WifiOff size={16} />
      <span>Disconnected</span>
      <button
        onClick={handleRefresh}
        disabled={isChecking}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          padding: '2px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center'
        }}
        title="Retry connection"
      >
        <RefreshCw 
          size={14} 
          style={{
            animation: isChecking ? 'spin 1s linear infinite' : 'none'
          }}
        />
      </button>
    </div>
  );
};

export default ConnectionStatus;