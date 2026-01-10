import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Calendar, Users, Clock, CheckCircle, XCircle, AlertCircle,
  TrendingUp, BarChart3, Activity, Eye, Download, RefreshCw,
  Bell, ArrowRight, Sparkles, Zap, Star, Award
} from 'lucide-react';
import PortalLink from '../../components/PortalLink';
import { getStorageService } from '../../services/storageAbstraction';

const EnhancedAdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pendingOrganizers, setPendingOrganizers] = useState<any[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);
  
  const stats = {
    totalEvents: 156,
    pendingApprovals: 12,
    activeOrganizers: 24,
    totalParticipants: 2847,
    approvedEvents: 134,
    rejectedEvents: 10
  };

  useEffect(() => {
    // Load pending organizers from storage
    const loadPendingOrganizers = async () => {
      const storageService = getStorageService();
      const users = await storageService.getUsers();
      const pending = users.filter((u: any) => u.role === 'organizer' && !u.isApproved);
      setPendingOrganizers(pending);
      setNotificationCount(pending.length);
    };
    loadPendingOrganizers();
  }, []);

  const recentEvents = [
    { id: 1, title: 'Tech Innovation Summit 2024', organizer: 'John Smith', date: '2024-01-15', status: 'pending', participants: 150 },
    { id: 2, title: 'Cultural Fest - Spring Edition', organizer: 'Sarah Johnson', date: '2024-01-20', status: 'approved', participants: 300 },
    { id: 3, title: 'Career Development Workshop', organizer: 'Mike Wilson', date: '2024-01-18', status: 'pending', participants: 75 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const storageService = getStorageService();
    const users = await storageService.getUsers();
    const pending = users.filter((u: any) => u.role === 'organizer' && !u.isApproved);
    setPendingOrganizers(pending);
    setNotificationCount(pending.length);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      padding: '2rem',
      paddingTop: '80px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        pointerEvents: 'none', zIndex: 0
      }} />
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: `${Math.random() * 300 + 100}px`,
          height: `${Math.random() * 300 + 100}px`,
          background: `rgba(255,255,255,${Math.random() * 0.1})`,
          borderRadius: '50%',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          filter: 'blur(40px)',
          animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`
        }} />
      ))}

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Sparkles size={28} color="#fbbf24" />
              <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', margin: 0, textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
                Welcome back, {user?.name}! 
              </h1>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem' }}>
              Manage your college events and organizers
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Notification Bell */}
            <PortalLink to="/approvals" style={{
              position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '50px', height: '50px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
              borderRadius: '15px', border: '2px solid rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'all 0.3s ease'
            }}>
              <Bell size={24} color="white" />
              {notificationCount > 0 && (
                <div style={{
                  position: 'absolute', top: '-5px', right: '-5px', width: '22px', height: '22px',
                  background: 'linear-gradient(135deg, #ef4444, #f87171)', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: '0.75rem', fontWeight: 700, border: '2px solid white'
                }}>
                  {notificationCount}
                </div>
              )}
            </PortalLink>
            <button onClick={handleRefresh} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem',
              background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: 'white',
              border: '2px solid rgba(255,255,255,0.3)', borderRadius: '12px', fontWeight: 600, cursor: 'pointer'
            }}>
              <RefreshCw size={18} style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
              Refresh
            </button>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem',
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: '#1e293b',
              border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(251, 191, 36, 0.4)'
            }}>
              <Download size={18} />
              Export
            </button>
          </div>
        </div>

        {/* Pending Organizers Alert */}
        {pendingOrganizers.length > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.2))',
            backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '1.25rem 1.5rem',
            marginBottom: '1.5rem', border: '2px solid rgba(251, 191, 36, 0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '50px', height: '50px', background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <AlertCircle size={26} color="white" />
              </div>
              <div>
                <h3 style={{ color: 'white', fontWeight: 700, margin: 0, fontSize: '1.1rem' }}>
                  {pendingOrganizers.length} Organizer{pendingOrganizers.length > 1 ? 's' : ''} Awaiting Approval
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '0.9rem' }}>
                  New organizers have registered and need your approval
                </p>
              </div>
            </div>
            <PortalLink to="/approvals" style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: '#1e293b',
              borderRadius: '12px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem'
            }}>
              Review Now <ArrowRight size={18} />
            </PortalLink>
          </div>
        )}

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Events', value: stats.totalEvents, icon: Calendar, color: '#3b82f6', trend: '+12%' },
            { label: 'Pending Approvals', value: stats.pendingApprovals, icon: Clock, color: '#f59e0b', trend: 'Action needed' },
            { label: 'Active Organizers', value: stats.activeOrganizers, icon: Users, color: '#10b981', trend: '+3 new' },
            { label: 'Total Participants', value: stats.totalParticipants.toLocaleString(), icon: Activity, color: '#8b5cf6', trend: '+8%' }
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.95)', borderRadius: '24px', padding: '1.5rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              transition: 'all 0.3s ease', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.5)'
            }}>
              <div>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{stat.label}</p>
                <p style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>{stat.value}</p>
                <p style={{ color: stat.color, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
                  <TrendingUp size={14} /> {stat.trend}
                </p>
              </div>
              <div style={{
                width: '70px', height: '70px', background: `linear-gradient(135deg, ${stat.color}, ${stat.color}99)`,
                borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 10px 25px ${stat.color}40`
              }}>
                <stat.icon size={32} color="white" />
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
          {/* Recent Events */}
          <div style={{
            background: 'rgba(255,255,255,0.95)', borderRadius: '24px', padding: '1.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap size={22} color="#f59e0b" /> Recent Events
              </h2>
              <PortalLink to="/events" style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem',
                background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white',
                borderRadius: '10px', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem'
              }}>
                <Eye size={16} /> View All
              </PortalLink>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentEvents.map((event) => (
                <div key={event.id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1rem 1.25rem', background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
                  borderRadius: '16px', border: '1px solid #e2e8f0', transition: 'all 0.3s ease'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '14px', height: '14px', borderRadius: '50%',
                      backgroundColor: getStatusColor(event.status), boxShadow: `0 0 15px ${getStatusColor(event.status)}60`
                    }} />
                    <div>
                      <h3 style={{ color: '#1e293b', fontWeight: 600, margin: 0, fontSize: '1rem' }}>{event.title}</h3>
                      <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>
                        by {event.organizer} • {event.date} • {event.participants} participants
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 0.85rem',
                      borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600,
                      backgroundColor: `${getStatusColor(event.status)}15`, color: getStatusColor(event.status), textTransform: 'capitalize'
                    }}>
                      {event.status === 'approved' ? <CheckCircle size={14} /> : <Clock size={14} />}
                      {event.status}
                    </span>
                    {event.status === 'pending' && (
                      <button style={{
                        padding: '0.4rem 0.85rem', background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer'
                      }}>Review</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{
              background: 'rgba(255,255,255,0.95)', borderRadius: '24px', padding: '1.5rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Star size={20} color="#f59e0b" /> Quick Actions
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { to: '/approvals', icon: Award, label: 'Organizer Approvals', sub: `${pendingOrganizers.length} pending`, gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)' },
                  { to: '/events', icon: Calendar, label: 'Manage Events', sub: `${stats.pendingApprovals} pending`, gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
                  { to: '/analytics', icon: BarChart3, label: 'View Analytics', sub: 'Monthly reports', gradient: 'linear-gradient(135deg, #10b981, #34d399)' }
                ].map((action, i) => (
                  <PortalLink key={i} to={action.to} style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem',
                    background: action.gradient, borderRadius: '16px', textDecoration: 'none', transition: 'all 0.3s ease'
                  }}>
                    <action.icon size={24} color="white" />
                    <div style={{ flex: 1 }}>
                      <p style={{ color: 'white', fontWeight: 600, margin: 0 }}>{action.label}</p>
                      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem', margin: 0 }}>{action.sub}</p>
                    </div>
                    <ArrowRight size={20} color="white" />
                  </PortalLink>
                ))}
              </div>
            </div>

            {/* Status Overview */}
            <div style={{
              background: 'rgba(255,255,255,0.95)', borderRadius: '24px', padding: '1.5rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', margin: '0 0 1rem 0' }}>Event Status</h2>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                {[
                  { value: stats.approvedEvents, label: 'Approved', color: '#10b981', icon: CheckCircle },
                  { value: stats.pendingApprovals, label: 'Pending', color: '#f59e0b', icon: Clock },
                  { value: stats.rejectedEvents, label: 'Rejected', color: '#ef4444', icon: XCircle }
                ].map((item, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{
                      width: '50px', height: '50px', background: `${item.color}15`, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem'
                    }}>
                      <item.icon size={24} color={item.color} />
                    </div>
                    <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>{item.value}</p>
                    <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
      `}</style>
    </div>
  );
};

export default EnhancedAdminDashboard;
