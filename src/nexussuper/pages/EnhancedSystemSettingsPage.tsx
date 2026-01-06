import React, { useState } from 'react';
import { 
  Settings, 
  Save, 
  RefreshCw, 
  Shield, 
  Globe, 
  Mail, 
  Database,
  Server,
  Lock,
  Key,
  Bell,
  Palette,
  Monitor,
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const EnhancedSystemSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [hasChanges, setHasChanges] = useState(false);

  // Mock settings data
  const [settings, setSettings] = useState({
    general: {
      siteName: 'Nexus Event Management',
      siteDescription: 'Comprehensive event management platform for colleges',
      timezone: 'America/New_York',
      language: 'en',
      maintenanceMode: false,
      registrationEnabled: true
    },
    security: {
      passwordMinLength: 8,
      requireSpecialChars: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      twoFactorAuth: false,
      sslEnabled: true
    },
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      smtpUser: 'noreply@nexusevent.com',
      smtpPassword: '••••••••',
      fromName: 'Nexus Event Management',
      fromEmail: 'noreply@nexusevent.com'
    },
    database: {
      backupFrequency: 'daily',
      retentionDays: 30,
      autoOptimize: true,
      connectionPoolSize: 20,
      queryTimeout: 30
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      adminAlerts: true,
      systemAlerts: true
    }
  });

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'database', name: 'Database', icon: Database },
    { id: 'notifications', name: 'Notifications', icon: Bell }
  ];

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...(prev as any)[category],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Mock save functionality
    console.log('Saving settings:', settings);
    setHasChanges(false);
    // Show success message
  };

  const renderGeneralSettings = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <label style={{
          display: 'block',
          color: '#ffffff',
          fontSize: '0.9rem',
          fontWeight: 600,
          marginBottom: '0.5rem'
        }}>
          Site Name
        </label>
        <input
          type="text"
          value={settings.general.siteName}
          onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '1rem'
          }}
        />
      </div>

      <div>
        <label style={{
          display: 'block',
          color: '#ffffff',
          fontSize: '0.9rem',
          fontWeight: 600,
          marginBottom: '0.5rem'
        }}>
          Site Description
        </label>
        <textarea
          value={settings.general.siteDescription}
          onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
          rows={3}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '1rem',
            resize: 'vertical'
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{
            display: 'block',
            color: '#ffffff',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: '0.5rem'
          }}>
            Timezone
          </label>
          <select
            value={settings.general.timezone}
            onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '1rem'
            }}
          >
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
          </select>
        </div>

        <div>
          <label style={{
            display: 'block',
            color: '#ffffff',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: '0.5rem'
          }}>
            Language
          </label>
          <select
            value={settings.general.language}
            onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '1rem'
            }}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, margin: 0 }}>
              Maintenance Mode
            </h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem', margin: 0 }}>
              Temporarily disable public access to the system
            </p>
          </div>
          <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
            <input
              type="checkbox"
              checked={settings.general.maintenanceMode}
              onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              position: 'absolute',
              cursor: 'pointer',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: settings.general.maintenanceMode ? '#10b981' : '#374151',
              transition: '0.4s',
              borderRadius: '34px'
            }}>
              <span style={{
                position: 'absolute',
                content: '""',
                height: '26px',
                width: '26px',
                left: settings.general.maintenanceMode ? '30px' : '4px',
                bottom: '4px',
                backgroundColor: 'white',
                transition: '0.4s',
                borderRadius: '50%'
              }} />
            </span>
          </label>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, margin: 0 }}>
              User Registration
            </h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem', margin: 0 }}>
              Allow new users to register accounts
            </p>
          </div>
          <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
            <input
              type="checkbox"
              checked={settings.general.registrationEnabled}
              onChange={(e) => handleSettingChange('general', 'registrationEnabled', e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              position: 'absolute',
              cursor: 'pointer',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: settings.general.registrationEnabled ? '#10b981' : '#374151',
              transition: '0.4s',
              borderRadius: '34px'
            }}>
              <span style={{
                position: 'absolute',
                content: '""',
                height: '26px',
                width: '26px',
                left: settings.general.registrationEnabled ? '30px' : '4px',
                bottom: '4px',
                backgroundColor: 'white',
                transition: '0.4s',
                borderRadius: '50%'
              }} />
            </span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{
            display: 'block',
            color: '#ffffff',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: '0.5rem'
          }}>
            Minimum Password Length
          </label>
          <input
            type="number"
            value={settings.security.passwordMinLength}
            onChange={(e) => handleSettingChange('security', 'passwordMinLength', parseInt(e.target.value))}
            min="6"
            max="20"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '1rem'
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            color: '#ffffff',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: '0.5rem'
          }}>
            Session Timeout (minutes)
          </label>
          <input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
            min="5"
            max="120"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '1rem'
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            color: '#ffffff',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: '0.5rem'
          }}>
            Max Login Attempts
          </label>
          <input
            type="number"
            value={settings.security.maxLoginAttempts}
            onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
            min="3"
            max="10"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '1rem'
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, margin: 0 }}>
              Require Special Characters
            </h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem', margin: 0 }}>
              Passwords must contain special characters
            </p>
          </div>
          <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
            <input
              type="checkbox"
              checked={settings.security.requireSpecialChars}
              onChange={(e) => handleSettingChange('security', 'requireSpecialChars', e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              position: 'absolute',
              cursor: 'pointer',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: settings.security.requireSpecialChars ? '#10b981' : '#374151',
              transition: '0.4s',
              borderRadius: '34px'
            }}>
              <span style={{
                position: 'absolute',
                content: '""',
                height: '26px',
                width: '26px',
                left: settings.security.requireSpecialChars ? '30px' : '4px',
                bottom: '4px',
                backgroundColor: 'white',
                transition: '0.4s',
                borderRadius: '50%'
              }} />
            </span>
          </label>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, margin: 0 }}>
              Two-Factor Authentication
            </h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem', margin: 0 }}>
              Require 2FA for admin accounts
            </p>
          </div>
          <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
            <input
              type="checkbox"
              checked={settings.security.twoFactorAuth}
              onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              position: 'absolute',
              cursor: 'pointer',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: settings.security.twoFactorAuth ? '#10b981' : '#374151',
              transition: '0.4s',
              borderRadius: '34px'
            }}>
              <span style={{
                position: 'absolute',
                content: '""',
                height: '26px',
                width: '26px',
                left: settings.security.twoFactorAuth ? '30px' : '4px',
                bottom: '4px',
                backgroundColor: 'white',
                transition: '0.4s',
                borderRadius: '50%'
              }} />
            </span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'security':
        return renderSecuritySettings();
      case 'email':
        return <div style={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', padding: '2rem' }}>Email settings coming soon...</div>;
      case 'database':
        return <div style={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', padding: '2rem' }}>Database settings coming soon...</div>;
      case 'notifications':
        return <div style={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', padding: '2rem' }}>Notification settings coming soon...</div>;
      default:
        return null;
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
            System Settings
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '1.1rem'
          }}>
            Configure global system parameters and preferences
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => window.location.reload()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#ffffff',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            <RefreshCw size={16} />
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1rem',
              background: hasChanges ? 'linear-gradient(135deg, #10b981, #14b8a6)' : 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '8px',
              color: '#ffffff',
              fontWeight: 600,
              cursor: hasChanges ? 'pointer' : 'not-allowed',
              fontSize: '0.9rem',
              opacity: hasChanges ? 1 : 0.5
            }}
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Sidebar */}
        <div style={{
          width: '250px',
          background: 'rgba(30, 41, 59, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '1rem',
          backdropFilter: 'blur(10px)',
          height: 'fit-content'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem',
                  background: activeTab === tab.id ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                  border: activeTab === tab.id ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent',
                  borderRadius: '12px',
                  color: activeTab === tab.id ? '#10b981' : 'rgba(255, 255, 255, 0.7)',
                  fontWeight: activeTab === tab.id ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '0.95rem',
                  textAlign: 'left',
                  width: '100%'
                }}
              >
                <tab.icon size={18} />
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          background: 'rgba(30, 41, 59, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '2rem',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '2rem'
          }}>
            {tabs.find(tab => tab.id === activeTab)?.icon && (
              React.createElement(tabs.find(tab => tab.id === activeTab)!.icon, { size: 24, color: "#10b981" })
            )}
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#ffffff',
              margin: 0
            }}>
              {tabs.find(tab => tab.id === activeTab)?.name} Settings
            </h2>
          </div>

          {renderTabContent()}
        </div>
      </div>

      {hasChanges && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: 'rgba(245, 158, 11, 0.9)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '12px',
          padding: '1rem 1.5rem',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)',
          backdropFilter: 'blur(10px)'
        }}>
          <AlertTriangle size={20} />
          <span style={{ fontWeight: 600 }}>You have unsaved changes</span>
        </div>
      )}
    </div>
  );
};

export default EnhancedSystemSettingsPage;
