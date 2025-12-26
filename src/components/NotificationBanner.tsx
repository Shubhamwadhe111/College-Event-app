import React, { useState, useEffect } from 'react';
import { X, Bell, AlertCircle, CheckCircle, Info } from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  dismissible?: boolean;
}

interface NotificationBannerProps {
  notifications: Notification[];
  onDismiss?: (id: string) => void;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({ notifications, onDismiss }) => {
  const [visible, setVisible] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const initialVisible: { [key: string]: boolean } = {};
    notifications.forEach(notif => {
      initialVisible[notif.id] = true;
    });
    setVisible(initialVisible);
  }, [notifications]);

  const handleDismiss = (id: string) => {
    setVisible(prev => ({ ...prev, [id]: false }));
    setTimeout(() => {
      if (onDismiss) onDismiss(id);
    }, 300);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getStyles = (type: string) => {
    switch (type) {
      case 'success':
        return {
          bg: 'rgba(16, 185, 129, 0.1)',
          border: 'rgba(16, 185, 129, 0.3)',
          text: '#10b981',
          icon: '#10b981'
        };
      case 'warning':
        return {
          bg: 'rgba(234, 179, 8, 0.1)',
          border: 'rgba(234, 179, 8, 0.3)',
          text: '#eab308',
          icon: '#eab308'
        };
      case 'error':
        return {
          bg: 'rgba(239, 68, 68, 0.1)',
          border: 'rgba(239, 68, 68, 0.3)',
          text: '#ef4444',
          icon: '#ef4444'
        };
      default:
        return {
          bg: 'rgba(59, 130, 246, 0.1)',
          border: 'rgba(59, 130, 246, 0.3)',
          text: '#3b82f6',
          icon: '#3b82f6'
        };
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="space-y-3 mb-6">
      {notifications.map(notif => {
        if (!visible[notif.id]) return null;
        const styles = getStyles(notif.type);
        
        return (
          <div
            key={notif.id}
            className="flex items-start gap-3 p-4 rounded-lg border transition-all duration-300"
            style={{
              background: styles.bg,
              borderColor: styles.border,
              opacity: visible[notif.id] ? 1 : 0,
              transform: visible[notif.id] ? 'translateY(0)' : 'translateY(-10px)'
            }}
          >
            <div style={{ color: styles.icon }} className="flex-shrink-0 mt-0.5">
              {getIcon(notif.type)}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-white mb-1">{notif.title}</h4>
              <p className="text-sm text-gray-300">{notif.message}</p>
            </div>
            {notif.dismissible !== false && (
              <button
                onClick={() => handleDismiss(notif.id)}
                className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NotificationBanner;
