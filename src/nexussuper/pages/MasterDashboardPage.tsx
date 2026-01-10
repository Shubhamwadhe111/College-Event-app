import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Crown, 
  Building2, 
  Users, 
  Calendar, 
  TrendingUp, 
  Bell, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  ArrowRight,
  Activity,
  BarChart3,
  Shield,
  Zap
} from 'lucide-react';
import { LocalStorageService } from '../../services/localStorageService';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  color: string;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change, changeType, color, onClick }) => (
  <div
    onClick={onClick}
    style={{
      background: `${color}10`,
      border: `1px solid ${color}30`,
      borderRadius: '16px',
      padding: '1.5rem',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'all 0.3s ease'
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        background: `${color}20`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color
      }}>
        {icon}
      </div>
      {change && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          color: changeType === 'positive' ? '#10b981' : changeType === 'negative' ? '#ef4444' : '#64748b',
          fontSize: '0.85rem',
          fontWeight: 600
        }}>
          <TrendingUp size={14} />
          {change}
        </div>
      )}
    </div>
    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', margin: 0, marginBottom: '0.25rem' }}>{title}</p>
    <p style={{ color: color, fontSize: '2rem', fontWeight: 800, margin: 0 }}>{value}</p>
  </div>
);

const MasterDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    colleges: 0,
    admins: 0,
    events: 0,
    notifications: 0,
    pendingApprovals: 0
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const storageService = new LocalStorageService();
      const [colleges, admins, events, notifications] = await Promise.all([
        storageService.getColleges(),
        storageService.getAdmins(),
        storageService.getEvents(),
        storageService.getNotifications()
      ]);

      setStats({
        colleges: colleges.length,
        admins: admins.length,
        events: events.length,
        notifications: notifications.length,
        pendingApprovals: notifications.filter(n => n.category === 'approval').length
      });

      // Create recent activity from notifications
      const activity = notifications.slice(0, 5).map(n => ({
        id: n.id,
        title: n.title,
        time: n.createdAt,
        type: n.type
      }));
      setRecentActivity(activity);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const quickActions = [
    { icon: <Building2 size={20} />, label: 'Add College', path: '/nexussuper/add-college', color: '#10b981' },
    { icon: <Users size={20} />, label: 'Add Admin', path: '/nexussuper/add-admin', color: '#3b82f6' },
    { icon: <Bell size={20} />, label: 'Broadcast', path: '/nexussuper/broadcast', color: '#f59e0b' },
    { icon: <BarChart3 size={20} />, label: 'Analytics', path: '/nexussuper/analytics', color: '#8b5cf6' }
  ];

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Welcome Header */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(20, 184, 166, 0.1) 100%)',
          borderRadius: '20px',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '2rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Crown size={28} color="#10b981" />
              <span style={{
                color: '#10b981',
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>Master Admin Dashboard</span>
            </div>
            <h1 style={{
              color: '#ffffff',
              fontSize: '2rem',
              fontWeight: 800,
              margin: 0,
              marginBottom: '0.5rem'
            }}>
              Welcome back, {user?.name || 'Master Admin'}!
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0 }}>
              Here's what's happening across your platform today.
            </p>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.25rem',
            background: 'rgba(16, 185, 129, 0.2)',
            borderRadius: '30px',
            border: '1px solid rgba(16, 185, 129, 0.4)'
          }}>
            <Activity size={18} color="#10b981" />
            <span style={{ color: '#10b981', fontWeight: 600 }}>System Online</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <StatCard
            icon={<Building2 size={24} />}
            title="Total Colleges"
            value={stats.colleges}
            change="+12%"
            changeType="positive"
            color="#10b981"
            onClick={() => navigate('/nexussuper/colleges')}
          />
          <StatCard
            icon={<Users size={24} />}
            title="System Admins"
            value={stats.admins}
            change="+8%"
            changeType="positive"
            color="#3b82f6"
            onClick={() => navigate('/nexussuper/admins')}
          />
          <StatCard
            icon={<Calendar size={24} />}
            title="Total Events"
            value={stats.events}
            change="+23%"
            changeType="positive"
            color="#8b5cf6"
            onClick={() => navigate('/nexussuper/events')}
          />
          <StatCard
            icon={<Bell size={24} />}
            title="Notifications"
            value={stats.notifications}
            color="#f59e0b"
            onClick={() => navigate('/nexussuper/notifications')}
          />
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem'
        }}>
          {/* Quick Actions */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1.5rem'
          }}>
            <h2 style={{
              color: '#ffffff',
              fontSize: '1.25rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Zap size={20} color="#10b981" />
              Quick Actions
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => navigate(action.path)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem',
                    background: `${action.color}10`,
                    border: `1px solid ${action.color}30`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    color: '#ffffff'
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: `${action.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: action.color
                  }}>
                    {action.icon}
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1.5rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{
                color: '#ffffff',
                fontSize: '1.25rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                margin: 0
              }}>
                <Clock size={20} color="#3b82f6" />
                Recent Activity
              </h2>
              <button
                onClick={() => navigate('/nexussuper/notifications')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  background: 'transparent',
                  border: 'none',
                  color: '#10b981',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                View All <ArrowRight size={14} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.875rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: activity.type === 'info' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: activity.type === 'info' ? '#3b82f6' : '#10b981'
                    }}>
                      <Bell size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: '#ffffff', fontSize: '0.9rem', margin: 0, fontWeight: 500 }}>
                        {activity.title}
                      </p>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', margin: 0 }}>
                        {formatTime(activity.time)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '2rem',
                  color: 'rgba(255,255,255,0.5)'
                }}>
                  <Bell size={32} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                  <p style={{ margin: 0 }}>No recent activity</p>
                </div>
              )}
            </div>
          </div>

          {/* System Status */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1.5rem'
          }}>
            <h2 style={{
              color: '#ffffff',
              fontSize: '1.25rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Shield size={20} color="#8b5cf6" />
              System Status
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '10px',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle size={20} color="#10b981" />
                  <span style={{ color: '#ffffff', fontWeight: 500 }}>Database</span>
                </div>
                <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.85rem' }}>Operational</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '10px',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle size={20} color="#10b981" />
                  <span style={{ color: '#ffffff', fontWeight: 500 }}>API Services</span>
                </div>
                <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.85rem' }}>Operational</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '10px',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle size={20} color="#10b981" />
                  <span style={{ color: '#ffffff', fontWeight: 500 }}>Authentication</span>
                </div>
                <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.85rem' }}>Operational</span>
              </div>
            </div>
          </div>

          {/* Pending Approvals */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1.5rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{
                color: '#ffffff',
                fontSize: '1.25rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                margin: 0
              }}>
                <AlertTriangle size={20} color="#f59e0b" />
                Pending Actions
              </h2>
              {stats.pendingApprovals > 0 && (
                <span style={{
                  background: '#ef4444',
                  color: '#ffffff',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 700
                }}>
                  {stats.pendingApprovals} pending
                </span>
              )}
            </div>
            {stats.pendingApprovals > 0 ? (
              <div style={{
                padding: '1.5rem',
                background: 'rgba(245, 158, 11, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                textAlign: 'center'
              }}>
                <AlertTriangle size={32} color="#f59e0b" style={{ marginBottom: '0.75rem' }} />
                <p style={{ color: '#ffffff', fontWeight: 600, margin: 0, marginBottom: '0.5rem' }}>
                  {stats.pendingApprovals} items need your attention
                </p>
                <button
                  onClick={() => navigate('/nexussuper/admins')}
                  style={{
                    marginTop: '1rem',
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Review Now
                </button>
              </div>
            ) : (
              <div style={{
                padding: '2rem',
                textAlign: 'center',
                color: 'rgba(255,255,255,0.5)'
              }}>
                <CheckCircle size={32} color="#10b981" style={{ marginBottom: '0.5rem' }} />
                <p style={{ margin: 0, color: '#10b981' }}>All caught up!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterDashboardPage;
