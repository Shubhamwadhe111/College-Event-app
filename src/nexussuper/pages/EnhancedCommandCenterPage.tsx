import React, { useState } from 'react';
import { 
  Terminal, 
  Server, 
  Database, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Power,
  Settings,
  Monitor,
  Activity,
  Zap,
  Lock,
  Unlock,
  Play,
  Pause,
  Square
} from 'lucide-react';

const EnhancedCommandCenterPage: React.FC = () => {
  const [selectedSystem, setSelectedSystem] = useState('all');
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

  // Mock system data
  const systemStatus = {
    webServer: { status: 'online', uptime: '99.9%', load: '45%', memory: '62%' },
    database: { status: 'online', uptime: '99.8%', connections: 45, queries: 1250 },
    fileSystem: { status: 'online', usage: '78%', available: '2.1TB', total: '10TB' },
    cache: { status: 'online', hitRate: '94%', memory: '1.2GB', maxMemory: '2GB' },
    backup: { status: 'running', lastBackup: '2 hours ago', nextBackup: 'in 4 hours' },
    monitoring: { status: 'online', alerts: 2, warnings: 5, errors: 0 }
  };

  const recentActions = [
    { id: 1, action: 'System backup completed', user: 'System', time: '2 hours ago', type: 'success' },
    { id: 2, action: 'Database optimization started', user: 'Admin', time: '3 hours ago', type: 'info' },
    { id: 3, action: 'Security scan completed', user: 'System', time: '5 hours ago', type: 'success' },
    { id: 4, action: 'Cache cleared for MIT College', user: 'Master Admin', time: '6 hours ago', type: 'warning' },
    { id: 5, action: 'SSL certificate renewed', user: 'System', time: '1 day ago', type: 'success' }
  ];

  const quickActions = [
    { name: 'Restart Web Server', icon: RefreshCw, color: '#3b82f6', danger: false },
    { name: 'Clear System Cache', icon: Zap, color: '#f59e0b', danger: false },
    { name: 'Run Database Cleanup', icon: Database, color: '#10b981', danger: false },
    { name: 'Force Backup Now', icon: Shield, color: '#a855f7', danger: false },
    { name: 'Enable Maintenance Mode', icon: Lock, color: '#ef4444', danger: true },
    { name: 'Emergency Shutdown', icon: Power, color: '#dc2626', danger: true }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#10b981';
      case 'running': return '#3b82f6';
      case 'offline': return '#ef4444';
      case 'warning': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle size={16} />;
      case 'running': return <Activity size={16} />;
      case 'offline': return <XCircle size={16} />;
      case 'warning': return <AlertTriangle size={16} />;
      default: return <Monitor size={16} />;
    }
  };

  const getActionTypeColor = (type: string) => {
    switch (type) {
      case 'success': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'error': return '#ef4444';
      case 'info': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{
      padding: '2rem',
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
      minHeight: '100vh',
      color: '#ffffff'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #ffffff 0%, #10b981 50%, #14b8a6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            Command Center
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '1.1rem'
          }}>
            Advanced system control and monitoring
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            background: isMaintenanceMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
            border: `1px solid ${isMaintenanceMode ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
            borderRadius: '8px',
            color: isMaintenanceMode ? '#ef4444' : '#10b981',
            fontWeight: 600
          }}>
            {isMaintenanceMode ? <Lock size={16} /> : <Unlock size={16} />}
            {isMaintenanceMode ? 'Maintenance Mode' : 'Normal Operation'}
          </div>
          <button
            onClick={() => setIsMaintenanceMode(!isMaintenanceMode)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1rem',
              background: isMaintenanceMode ? 'linear-gradient(135deg, #10b981, #14b8a6)' : 'linear-gradient(135deg, #ef4444, #dc2626)',
              border: 'none',
              borderRadius: '8px',
              color: '#ffffff',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            {isMaintenanceMode ? <Unlock size={16} /> : <Lock size={16} />}
            {isMaintenanceMode ? 'Exit Maintenance' : 'Enter Maintenance'}
          </button>
        </div>
      </div>

      {/* System Status Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Web Server */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '1.5rem',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #10b981, #14b8a6)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Server size={20} color="#ffffff" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                Web Server
              </h3>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: getStatusColor(systemStatus.webServer.status),
              fontWeight: 600,
              textTransform: 'uppercase',
              fontSize: '0.9rem'
            }}>
              {getStatusIcon(systemStatus.webServer.status)}
              {systemStatus.webServer.status}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            <div>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.8rem', margin: 0 }}>Uptime</p>
              <p style={{ color: '#10b981', fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                {systemStatus.webServer.uptime}
              </p>
            </div>
            <div>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.8rem', margin: 0 }}>CPU Load</p>
              <p style={{ color: '#3b82f6', fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                {systemStatus.webServer.load}
              </p>
            </div>
            <div>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.8rem', margin: 0 }}>Memory</p>
              <p style={{ color: '#a855f7', fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                {systemStatus.webServer.memory}
              </p>
            </div>
          </div>
        </div>

        {/* Database */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '1.5rem',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Database size={20} color="#ffffff" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                Database
              </h3>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: getStatusColor(systemStatus.database.status),
              fontWeight: 600,
              textTransform: 'uppercase',
              fontSize: '0.9rem'
            }}>
              {getStatusIcon(systemStatus.database.status)}
              {systemStatus.database.status}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            <div>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.8rem', margin: 0 }}>Connections</p>
              <p style={{ color: '#10b981', fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                {systemStatus.database.connections}
              </p>
            </div>
            <div>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.8rem', margin: 0 }}>Queries/min</p>
              <p style={{ color: '#3b82f6', fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                {systemStatus.database.queries}
              </p>
            </div>
          </div>
        </div>

        {/* File System */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '1.5rem',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Monitor size={20} color="#ffffff" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                File System
              </h3>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: getStatusColor(systemStatus.fileSystem.status),
              fontWeight: 600,
              textTransform: 'uppercase',
              fontSize: '0.9rem'
            }}>
              {getStatusIcon(systemStatus.fileSystem.status)}
              {systemStatus.fileSystem.status}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            <div>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.8rem', margin: 0 }}>Usage</p>
              <p style={{ color: '#f59e0b', fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                {systemStatus.fileSystem.usage}
              </p>
            </div>
            <div>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.8rem', margin: 0 }}>Available</p>
              <p style={{ color: '#10b981', fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                {systemStatus.fileSystem.available}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '1.5rem',
        backdropFilter: 'blur(10px)',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.3rem',
          fontWeight: 700,
          color: '#ffffff',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Terminal size={20} />
          Quick Actions
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {quickActions.map((action, index) => (
            <button
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem',
                background: action.danger ? 'rgba(239, 68, 68, 0.1)' : `rgba(${action.color.slice(1, 3)}, ${parseInt(action.color.slice(3, 5), 16)}, ${parseInt(action.color.slice(5, 7), 16)}, 0.1)`,
                border: action.danger ? '1px solid rgba(239, 68, 68, 0.3)' : `1px solid ${action.color}33`,
                borderRadius: '12px',
                color: action.danger ? '#ef4444' : action.color,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.9rem'
              }}
            >
              {React.createElement(action.icon, { size: 18 })}
              {action.name}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Actions */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '1.5rem',
        backdropFilter: 'blur(10px)'
      }}>
        <h3 style={{
          fontSize: '1.3rem',
          fontWeight: 700,
          color: '#ffffff',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Activity size={20} />
          Recent System Actions
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {recentActions.map((action) => (
            <div
              key={action.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: getActionTypeColor(action.type)
                }} />
                <div>
                  <p style={{
                    color: '#ffffff',
                    fontWeight: 600,
                    margin: 0,
                    fontSize: '0.95rem'
                  }}>
                    {action.action}
                  </p>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '0.8rem',
                    margin: 0
                  }}>
                    by {action.user}
                  </p>
                </div>
              </div>
              <span style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.85rem'
              }}>
                {action.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedCommandCenterPage;