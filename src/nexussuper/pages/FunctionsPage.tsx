import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  UserPlus, 
  Megaphone, 
  Calendar, 
  CheckSquare, 
  Shield, 
  Database, 
  FileText,
  Settings,
  BarChart3,
  Crown
} from 'lucide-react';

interface FunctionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  onClick: () => void;
}

const FunctionCard: React.FC<FunctionCardProps> = ({ icon, title, description, color, onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: 'rgba(255, 255, 255, 0.03)',
      border: `1px solid ${color}30`,
      borderRadius: '16px',
      padding: '1.5rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = `${color}15`;
      e.currentTarget.style.borderColor = `${color}60`;
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = `0 10px 30px ${color}20`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
      e.currentTarget.style.borderColor = `${color}30`;
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    <div style={{
      width: '50px',
      height: '50px',
      borderRadius: '12px',
      background: `${color}20`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: color
    }}>
      {icon}
    </div>
    <div>
      <h3 style={{
        color: '#ffffff',
        fontSize: '1.1rem',
        fontWeight: 700,
        margin: 0,
        marginBottom: '0.5rem'
      }}>{title}</h3>
      <p style={{
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: '0.85rem',
        margin: 0,
        lineHeight: 1.5
      }}>{description}</p>
    </div>
  </button>
);

const FunctionsPage: React.FC = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: <Building2 size={24} />,
      title: 'Add College',
      description: 'Register a new college in the platform',
      color: '#10b981',
      path: '/nexussuper/add-college'
    },
    {
      icon: <UserPlus size={24} />,
      title: 'Add Admin',
      description: 'Create a new administrator account',
      color: '#3b82f6',
      path: '/nexussuper/add-admin'
    },
    {
      icon: <Megaphone size={24} />,
      title: 'Broadcast Message',
      description: 'Send announcements to all users',
      color: '#f59e0b',
      path: '/nexussuper/broadcast'
    },
    {
      icon: <Calendar size={24} />,
      title: 'Create Event',
      description: 'Create a new platform-wide event',
      color: '#8b5cf6',
      path: '/nexussuper/events'
    }
  ];

  const managementFunctions = [
    {
      icon: <CheckSquare size={24} />,
      title: 'Pending Approvals',
      description: 'Review and approve pending requests',
      color: '#ef4444',
      path: '/nexussuper/admins'
    },
    {
      icon: <Shield size={24} />,
      title: 'Access Control',
      description: 'Manage user roles and permissions',
      color: '#06b6d4',
      path: '/nexussuper/system-settings'
    },
    {
      icon: <Database size={24} />,
      title: 'Data Management',
      description: 'Backup, restore, and manage data',
      color: '#84cc16',
      path: '/nexussuper/command-center'
    },
    {
      icon: <FileText size={24} />,
      title: 'Reports',
      description: 'Generate and view system reports',
      color: '#ec4899',
      path: '/nexussuper/analytics'
    }
  ];

  const systemFunctions = [
    {
      icon: <Settings size={24} />,
      title: 'System Settings',
      description: 'Configure platform settings',
      color: '#64748b',
      path: '/nexussuper/system-settings'
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Analytics Dashboard',
      description: 'View platform analytics and metrics',
      color: '#14b8a6',
      path: '/nexussuper/analytics'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.5rem 1.5rem',
            background: 'rgba(16, 185, 129, 0.1)',
            borderRadius: '30px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            marginBottom: '1rem'
          }}>
            <Crown size={20} color="#10b981" />
            <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase' }}>
              Master Admin Functions
            </span>
          </div>
          <h1 style={{
            color: '#ffffff',
            fontSize: '2.5rem',
            fontWeight: 800,
            margin: 0,
            marginBottom: '0.5rem'
          }}>
            Quick Functions
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '1rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Access all administrative functions from one place. Manage colleges, admins, and platform-wide operations.
          </p>
        </div>

        {/* Quick Actions Section */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{
            color: '#10b981',
            fontSize: '1.1rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{
              width: '4px',
              height: '20px',
              background: '#10b981',
              borderRadius: '2px'
            }} />
            Quick Actions
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}>
            {quickActions.map((action, index) => (
              <FunctionCard
                key={index}
                icon={action.icon}
                title={action.title}
                description={action.description}
                color={action.color}
                onClick={() => navigate(action.path)}
              />
            ))}
          </div>
        </div>

        {/* Management Functions Section */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{
            color: '#3b82f6',
            fontSize: '1.1rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{
              width: '4px',
              height: '20px',
              background: '#3b82f6',
              borderRadius: '2px'
            }} />
            Management
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}>
            {managementFunctions.map((func, index) => (
              <FunctionCard
                key={index}
                icon={func.icon}
                title={func.title}
                description={func.description}
                color={func.color}
                onClick={() => navigate(func.path)}
              />
            ))}
          </div>
        </div>

        {/* System Functions Section */}
        <div>
          <h2 style={{
            color: '#8b5cf6',
            fontSize: '1.1rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{
              width: '4px',
              height: '20px',
              background: '#8b5cf6',
              borderRadius: '2px'
            }} />
            System
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}>
            {systemFunctions.map((func, index) => (
              <FunctionCard
                key={index}
                icon={func.icon}
                title={func.title}
                description={func.description}
                color={func.color}
                onClick={() => navigate(func.path)}
              />
            ))}
          </div>
        </div>

        {/* Stats Footer */}
        <div style={{
          marginTop: '3rem',
          padding: '1.5rem',
          background: 'rgba(16, 185, 129, 0.05)',
          borderRadius: '16px',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ color: '#10b981', fontSize: '1.5rem', fontWeight: 800 }}>10+</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>Functions Available</div>
          </div>
          <div>
            <div style={{ color: '#3b82f6', fontSize: '1.5rem', fontWeight: 800 }}>24/7</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>System Monitoring</div>
          </div>
          <div>
            <div style={{ color: '#f59e0b', fontSize: '1.5rem', fontWeight: 800 }}>Instant</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>Action Execution</div>
          </div>
          <div>
            <div style={{ color: '#8b5cf6', fontSize: '1.5rem', fontWeight: 800 }}>Secure</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>Admin Access</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunctionsPage;
