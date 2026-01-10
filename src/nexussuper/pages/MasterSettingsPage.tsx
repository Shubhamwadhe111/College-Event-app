import React, { useState } from 'react';
import { Bell, Shield, Database, Mail, Calendar, FileText, Save, Server, Globe, Zap, Users } from 'lucide-react';

const MasterSettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('platform');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const [platformSettings, setPlatformSettings] = useState({
    platformName: 'Nexus Event Management',
    platformVersion: '2.0.0',
    maxColleges: 100,
    maxAdminsPerCollege: 5,
    enableMultiTenancy: true,
    globalMaintenanceMode: false
  });

  const [collegeSettings, setCollegeSettings] = useState({
    autoApproveColleges: false,
    requireCollegeVerification: true,
    maxEventsPerCollege: 500,
    collegeTrialDays: 30,
    enableCollegeAnalytics: true
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    collegeRegistrations: true,
    adminRequests: true,
    systemAlerts: true,
    weeklyReports: true,
    monthlyAnalytics: true
  });

  const [security, setSecurity] = useState({
    requireMFA: false,
    sessionTimeout: 60,
    loginAttempts: 3,
    enforceStrongPasswords: true,
    ipWhitelisting: false,
    auditLogging: true
  });

  const [systemSettings, setSystemSettings] = useState({
    databaseBackupFrequency: 'daily',
    logRetentionDays: 90,
    apiRateLimit: 1000,
    enableCaching: true,
    debugMode: false
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: 'smtp.gmail.com',
    smtpPort: 587,
    senderEmail: 'master@nexus-events.com',
    senderName: 'Nexus Master System'
  });

  const sections = [
    { id: 'platform', label: 'Platform', icon: Globe },
    { id: 'colleges', label: 'College Rules', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'system', label: 'System', icon: Server },
    { id: 'email', label: 'Email Config', icon: Mail }
  ];

  const handleSave = () => {
    setIsSaving(true);
    setSaveMessage('');
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage('Settings saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    }, 1500);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.875rem 1rem',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '0.95rem',
    outline: 'none',
    color: '#1e293b',
    transition: 'border-color 0.2s ease'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    color: '#e2e8f0',
    fontSize: '0.85rem',
    fontWeight: 600,
    marginBottom: '0.5rem'
  };

  const sidebarButtonStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    width: '100%',
    padding: '0.875rem 1rem',
    borderRadius: '8px',
    border: isActive ? '1px solid rgba(255,255,255,0.3)' : '1px solid transparent',
    cursor: 'pointer',
    textAlign: 'left',
    fontWeight: 500,
    fontSize: '0.9rem',
    background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
    color: isActive ? '#ffffff' : 'rgba(255,255,255,0.7)',
    transition: 'all 0.2s ease'
  });

  const toggleStyle = (isOn: boolean): React.CSSProperties => ({
    width: '48px',
    height: '26px',
    borderRadius: '13px',
    border: 'none',
    cursor: 'pointer',
    background: isOn ? '#10b981' : '#475569',
    position: 'relative',
    transition: 'background 0.2s ease'
  });

  const toggleKnobStyle = (isOn: boolean): React.CSSProperties => ({
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: 'white',
    position: 'absolute',
    top: '3px',
    left: isOn ? '25px' : '3px',
    transition: 'left 0.2s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  });

  const settingRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.1)'
  };

  const renderPlatformSettings = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{
        ...settingRowStyle,
        background: platformSettings.globalMaintenanceMode ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255,255,255,0.05)',
        border: platformSettings.globalMaintenanceMode ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(255,255,255,0.1)'
      }}>
        <div>
          <p style={{ color: platformSettings.globalMaintenanceMode ? '#ef4444' : '#ffffff', fontWeight: 600, margin: 0 }}>
            Global Maintenance Mode
          </p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', margin: '0.25rem 0 0 0' }}>
            Disable all portals for system maintenance
          </p>
        </div>
        <button
          onClick={() => setPlatformSettings(prev => ({ ...prev, globalMaintenanceMode: !prev.globalMaintenanceMode }))}
          style={toggleStyle(platformSettings.globalMaintenanceMode)}
        >
          <div style={toggleKnobStyle(platformSettings.globalMaintenanceMode)} />
        </button>
      </div>

      <div style={settingRowStyle}>
        <div>
          <p style={{ color: '#ffffff', fontWeight: 500, margin: 0, fontSize: '0.95rem' }}>
            Enable Multi-Tenancy
          </p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', margin: '0.25rem 0 0 0' }}>
            Allow multiple colleges to use the platform
          </p>
        </div>
        <button
          onClick={() => setPlatformSettings(prev => ({ ...prev, enableMultiTenancy: !prev.enableMultiTenancy }))}
          style={toggleStyle(platformSettings.enableMultiTenancy)}
        >
          <div style={toggleKnobStyle(platformSettings.enableMultiTenancy)} />
        </button>
      </div>

      <div>
        <label style={labelStyle}>Platform Name</label>
        <input
          type="text"
          value={platformSettings.platformName}
          onChange={(e) => setPlatformSettings(prev => ({ ...prev, platformName: e.target.value }))}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Max Colleges</label>
        <input
          type="number"
          value={platformSettings.maxColleges}
          onChange={(e) => setPlatformSettings(prev => ({ ...prev, maxColleges: parseInt(e.target.value) || 100 }))}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Max Admins Per College</label>
        <input
          type="number"
          value={platformSettings.maxAdminsPerCollege}
          onChange={(e) => setPlatformSettings(prev => ({ ...prev, maxAdminsPerCollege: parseInt(e.target.value) || 5 }))}
          style={inputStyle}
        />
      </div>
    </div>
  );

  const renderCollegeSettings = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={settingRowStyle}>
        <div>
          <p style={{ color: '#ffffff', fontWeight: 500, margin: 0, fontSize: '0.95rem' }}>
            Auto-Approve Colleges
          </p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', margin: '0.25rem 0 0 0' }}>
            Automatically approve new college registrations
          </p>
        </div>
        <button
          onClick={() => setCollegeSettings(prev => ({ ...prev, autoApproveColleges: !prev.autoApproveColleges }))}
          style={toggleStyle(collegeSettings.autoApproveColleges)}
        >
          <div style={toggleKnobStyle(collegeSettings.autoApproveColleges)} />
        </button>
      </div>

      <div style={settingRowStyle}>
        <div>
          <p style={{ color: '#ffffff', fontWeight: 500, margin: 0, fontSize: '0.95rem' }}>
            Require College Verification
          </p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', margin: '0.25rem 0 0 0' }}>
            Require document verification for colleges
          </p>
        </div>
        <button
          onClick={() => setCollegeSettings(prev => ({ ...prev, requireCollegeVerification: !prev.requireCollegeVerification }))}
          style={toggleStyle(collegeSettings.requireCollegeVerification)}
        >
          <div style={toggleKnobStyle(collegeSettings.requireCollegeVerification)} />
        </button>
      </div>

      <div style={settingRowStyle}>
        <div>
          <p style={{ color: '#ffffff', fontWeight: 500, margin: 0, fontSize: '0.95rem' }}>
            Enable College Analytics
          </p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', margin: '0.25rem 0 0 0' }}>
            Provide analytics dashboard to colleges
          </p>
        </div>
        <button
          onClick={() => setCollegeSettings(prev => ({ ...prev, enableCollegeAnalytics: !prev.enableCollegeAnalytics }))}
          style={toggleStyle(collegeSettings.enableCollegeAnalytics)}
        >
          <div style={toggleKnobStyle(collegeSettings.enableCollegeAnalytics)} />
        </button>
      </div>

      <div>
        <label style={labelStyle}>Max Events Per College</label>
        <input
          type="number"
          value={collegeSettings.maxEventsPerCollege}
          onChange={(e) => setCollegeSettings(prev => ({ ...prev, maxEventsPerCollege: parseInt(e.target.value) || 500 }))}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>College Trial Period (days)</label>
        <input
          type="number"
          value={collegeSettings.collegeTrialDays}
          onChange={(e) => setCollegeSettings(prev => ({ ...prev, collegeTrialDays: parseInt(e.target.value) || 30 }))}
          style={inputStyle}
        />
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {Object.entries(notifications).map(([key, value]) => (
        <div key={key} style={settingRowStyle}>
          <div>
            <p style={{ color: '#ffffff', fontWeight: 500, margin: 0, fontSize: '0.95rem' }}>
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', margin: '0.25rem 0 0 0' }}>
              {key === 'emailNotifications' ? 'Receive notifications via email' :
               key === 'pushNotifications' ? 'Receive browser push notifications' :
               key === 'collegeRegistrations' ? 'Notify when colleges register' :
               key === 'adminRequests' ? 'Notify when admins request approval' :
               key === 'systemAlerts' ? 'Receive system maintenance alerts' :
               key === 'weeklyReports' ? 'Receive weekly summary reports' :
               'Receive monthly analytics reports'}
            </p>
          </div>
          <button
            onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
            style={toggleStyle(value as boolean)}
          >
            <div style={toggleKnobStyle(value as boolean)} />
          </button>
        </div>
      ))}
    </div>
  );

  const renderSecuritySettings = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{
        ...settingRowStyle,
        background: 'rgba(16, 185, 129, 0.1)',
        border: '1px solid rgba(16, 185, 129, 0.3)'
      }}>
        <div>
          <p style={{ color: '#ffffff', fontWeight: 600, margin: 0 }}>Require MFA</p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', margin: '0.25rem 0 0 0' }}>
            Require multi-factor authentication for all admins
          </p>
        </div>
        <button
          onClick={() => setSecurity(prev => ({ ...prev, requireMFA: !prev.requireMFA }))}
          style={toggleStyle(security.requireMFA)}
        >
          <div style={toggleKnobStyle(security.requireMFA)} />
        </button>
      </div>

      <div style={settingRowStyle}>
        <div>
          <p style={{ color: '#ffffff', fontWeight: 500, margin: 0 }}>Enforce Strong Passwords</p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', margin: '0.25rem 0 0 0' }}>
            Require minimum 12 characters with complexity
          </p>
        </div>
        <button
          onClick={() => setSecurity(prev => ({ ...prev, enforceStrongPasswords: !prev.enforceStrongPasswords }))}
          style={toggleStyle(security.enforceStrongPasswords)}
        >
          <div style={toggleKnobStyle(security.enforceStrongPasswords)} />
        </button>
      </div>

      <div style={settingRowStyle}>
        <div>
          <p style={{ color: '#ffffff', fontWeight: 500, margin: 0 }}>Audit Logging</p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', margin: '0.25rem 0 0 0' }}>
            Log all administrative actions
          </p>
        </div>
        <button
          onClick={() => setSecurity(prev => ({ ...prev, auditLogging: !prev.auditLogging }))}
          style={toggleStyle(security.auditLogging)}
        >
          <div style={toggleKnobStyle(security.auditLogging)} />
        </button>
      </div>

      <div>
        <label style={labelStyle}>Session Timeout (minutes)</label>
        <input
          type="number"
          value={security.sessionTimeout}
          onChange={(e) => setSecurity(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) || 60 }))}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Max Login Attempts</label>
        <input
          type="number"
          value={security.loginAttempts}
          onChange={(e) => setSecurity(prev => ({ ...prev, loginAttempts: parseInt(e.target.value) || 3 }))}
          style={inputStyle}
        />
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={settingRowStyle}>
        <div>
          <p style={{ color: '#ffffff', fontWeight: 500, margin: 0 }}>Enable Caching</p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', margin: '0.25rem 0 0 0' }}>
            Enable system-wide caching for performance
          </p>
        </div>
        <button
          onClick={() => setSystemSettings(prev => ({ ...prev, enableCaching: !prev.enableCaching }))}
          style={toggleStyle(systemSettings.enableCaching)}
        >
          <div style={toggleKnobStyle(systemSettings.enableCaching)} />
        </button>
      </div>

      <div style={{
        ...settingRowStyle,
        background: systemSettings.debugMode ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255,255,255,0.05)',
        border: systemSettings.debugMode ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(255,255,255,0.1)'
      }}>
        <div>
          <p style={{ color: systemSettings.debugMode ? '#f59e0b' : '#ffffff', fontWeight: 500, margin: 0 }}>
            Debug Mode
          </p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', margin: '0.25rem 0 0 0' }}>
            Enable verbose logging (not for production)
          </p>
        </div>
        <button
          onClick={() => setSystemSettings(prev => ({ ...prev, debugMode: !prev.debugMode }))}
          style={toggleStyle(systemSettings.debugMode)}
        >
          <div style={toggleKnobStyle(systemSettings.debugMode)} />
        </button>
      </div>

      <div>
        <label style={labelStyle}>Database Backup Frequency</label>
        <select
          value={systemSettings.databaseBackupFrequency}
          onChange={(e) => setSystemSettings(prev => ({ ...prev, databaseBackupFrequency: e.target.value }))}
          style={inputStyle}
        >
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Log Retention (days)</label>
        <input
          type="number"
          value={systemSettings.logRetentionDays}
          onChange={(e) => setSystemSettings(prev => ({ ...prev, logRetentionDays: parseInt(e.target.value) || 90 }))}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>API Rate Limit (requests/hour)</label>
        <input
          type="number"
          value={systemSettings.apiRateLimit}
          onChange={(e) => setSystemSettings(prev => ({ ...prev, apiRateLimit: parseInt(e.target.value) || 1000 }))}
          style={inputStyle}
        />
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <label style={labelStyle}>SMTP Server</label>
        <input
          type="text"
          value={emailSettings.smtpServer}
          onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpServer: e.target.value }))}
          style={inputStyle}
        />
      </div>
      <div>
        <label style={labelStyle}>SMTP Port</label>
        <input
          type="number"
          value={emailSettings.smtpPort}
          onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPort: parseInt(e.target.value) || 587 }))}
          style={inputStyle}
        />
      </div>
      <div>
        <label style={labelStyle}>Sender Email</label>
        <input
          type="email"
          value={emailSettings.senderEmail}
          onChange={(e) => setEmailSettings(prev => ({ ...prev, senderEmail: e.target.value }))}
          style={inputStyle}
        />
      </div>
      <div>
        <label style={labelStyle}>Sender Name</label>
        <input
          type="text"
          value={emailSettings.senderName}
          onChange={(e) => setEmailSettings(prev => ({ ...prev, senderName: e.target.value }))}
          style={inputStyle}
        />
      </div>
      <div style={{
        padding: '1rem',
        background: 'rgba(59, 130, 246, 0.1)',
        borderRadius: '8px',
        border: '1px solid rgba(59, 130, 246, 0.3)'
      }}>
        <p style={{ color: '#60a5fa', fontSize: '0.85rem', margin: 0 }}>
          💡 Test your email configuration by sending a test email after saving changes.
        </p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'platform': return renderPlatformSettings();
      case 'colleges': return renderCollegeSettings();
      case 'notifications': return renderNotificationSettings();
      case 'security': return renderSecuritySettings();
      case 'system': return renderSystemSettings();
      case 'email': return renderEmailSettings();
      default: return renderPlatformSettings();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      padding: '2rem',
      paddingTop: '20px'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#ffffff',
            margin: 0,
            marginBottom: '0.5rem'
          }}>
            Master Settings
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', margin: 0 }}>
            Configure platform-wide settings, security, and system preferences
          </p>
        </div>

        {/* Success Message */}
        {saveMessage && (
          <div style={{
            padding: '0.75rem 1rem',
            background: 'rgba(16, 185, 129, 0.2)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: '8px',
            color: '#10b981',
            marginBottom: '1.5rem',
            fontSize: '0.9rem'
          }}>
            ✓ {saveMessage}
          </div>
        )}

        {/* Main Content */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap'
        }}>
          {/* Sidebar */}
          <div style={{
            width: '180px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            padding: '0.75rem',
            border: '1px solid rgba(255,255,255,0.1)',
            height: 'fit-content',
            flexShrink: 0
          }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  style={sidebarButtonStyle(activeSection === section.id)}
                >
                  <section.icon size={18} />
                  {section.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div style={{
            flex: 1,
            minWidth: '300px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            {/* Section Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#ffffff',
                margin: 0
              }}>
                {sections.find(s => s.id === activeSection)?.label}
              </h2>
              <button
                onClick={handleSave}
                disabled={isSaving}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: isSaving ? 'rgba(16, 185, 129, 0.3)' : 'linear-gradient(135deg, #10b981, #059669)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 600,
                  cursor: isSaving ? 'default' : 'pointer',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s ease',
                  boxShadow: isSaving ? 'none' : '0 2px 8px rgba(16, 185, 129, 0.3)'
                }}
              >
                <Save size={16} />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

            {/* Dynamic Content */}
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterSettingsPage;
