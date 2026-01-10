import React, { useState, useEffect } from 'react';
import { 
  Clock, CheckCircle, XCircle, AlertCircle, Search, Calendar, User, Users,
  FileText, Eye, ThumbsUp, ThumbsDown, Sparkles, RefreshCw, Mail, Building, Phone
} from 'lucide-react';
import { getStorageService, User as UserType } from '../../services/storageAbstraction';

const EnhancedApprovalsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [pendingOrganizers, setPendingOrganizers] = useState<UserType[]>([]);
  const [allOrganizers, setAllOrganizers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadOrganizers();
  }, []);

  const loadOrganizers = async () => {
    setIsLoading(true);
    try {
      const storageService = getStorageService();
      const users = await storageService.getUsers();
      const organizers = users.filter((u: UserType) => u.role === 'organizer');
      setAllOrganizers(organizers);
      setPendingOrganizers(organizers.filter((u: UserType) => !u.isApproved));
    } catch (error) {
      console.error('Error loading organizers:', error);
    }
    setIsLoading(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadOrganizers();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleApprove = async (organizerId: string) => {
    try {
      const storageService = getStorageService();
      await storageService.approveOrganizer(organizerId, 'approve');
      await loadOrganizers();
    } catch (error) {
      console.error('Error approving organizer:', error);
    }
  };

  const handleReject = async (organizerId: string) => {
    try {
      const storageService = getStorageService();
      await storageService.approveOrganizer(organizerId, 'reject');
      await loadOrganizers();
    } catch (error) {
      console.error('Error rejecting organizer:', error);
    }
  };

  const tabs = [
    { id: 'pending', label: 'Pending Approval', count: pendingOrganizers.length },
    { id: 'approved', label: 'Approved', count: allOrganizers.filter(o => o.isApproved).length },
    { id: 'all', label: 'All Organizers', count: allOrganizers.length }
  ];

  const getFilteredOrganizers = () => {
    let filtered = allOrganizers;
    if (activeTab === 'pending') {
      filtered = pendingOrganizers;
    } else if (activeTab === 'approved') {
      filtered = allOrganizers.filter(o => o.isApproved);
    }
    if (searchTerm) {
      filtered = filtered.filter(o => 
        o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (o.department || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  };

  const filteredOrganizers = getFilteredOrganizers();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      padding: '2rem', paddingTop: '80px', position: 'relative', overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)', pointerEvents: 'none', zIndex: 0 }} />
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute', width: `${Math.random() * 300 + 100}px`, height: `${Math.random() * 300 + 100}px`,
          background: `rgba(255,255,255,${Math.random() * 0.1})`, borderRadius: '50%',
          left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, filter: 'blur(40px)',
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
                Organizer Approvals
              </h1>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem' }}>Review and manage organizer registration requests</p>
          </div>
          <button onClick={handleRefresh} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem',
            background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: 'white',
            border: '2px solid rgba(255,255,255,0.3)', borderRadius: '12px', fontWeight: 600, cursor: 'pointer'
          }}>
            <RefreshCw size={18} style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} /> Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Pending Approvals', value: pendingOrganizers.length, icon: Clock, color: '#f59e0b', desc: 'Awaiting review' },
            { label: 'Approved Organizers', value: allOrganizers.filter(o => o.isApproved).length, icon: CheckCircle, color: '#10b981', desc: 'Active organizers' },
            { label: 'Total Organizers', value: allOrganizers.length, icon: Users, color: '#3b82f6', desc: 'All registered' }
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.95)', borderRadius: '20px', padding: '1.5rem',
              boxShadow: '0 15px 35px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '1rem'
            }}>
              <div style={{
                width: '60px', height: '60px', background: `linear-gradient(135deg, ${stat.color}, ${stat.color}99)`,
                borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 8px 20px ${stat.color}40`
              }}>
                <stat.icon size={28} color="white" />
              </div>
              <div>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>{stat.label}</p>
                <p style={{ fontSize: '2.25rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>{stat.value}</p>
                <p style={{ color: stat.color, fontSize: '0.8rem', margin: 0, fontWeight: 600 }}>{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pending Alert */}
        {pendingOrganizers.length > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.2))',
            backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '1.25rem 1.5rem',
            marginBottom: '1.5rem', border: '2px solid rgba(251, 191, 36, 0.4)',
            display: 'flex', alignItems: 'center', gap: '1rem'
          }}>
            <div style={{
              width: '50px', height: '50px', background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <AlertCircle size={26} color="white" />
            </div>
            <div>
              <h3 style={{ color: 'white', fontWeight: 700, margin: 0, fontSize: '1.1rem' }}>
                {pendingOrganizers.length} Organizer{pendingOrganizers.length > 1 ? 's' : ''} Awaiting Your Approval
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '0.9rem' }}>
                New organizers have registered and need your review before they can create events
              </p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div style={{
          background: 'rgba(255,255,255,0.95)', borderRadius: '20px', padding: '0.5rem',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem'
        }}>
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              flex: 1, padding: '1rem', borderRadius: '16px', border: 'none', cursor: 'pointer',
              fontWeight: 600, fontSize: '0.95rem', transition: 'all 0.3s ease',
              background: activeTab === tab.id ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
              color: activeTab === tab.id ? 'white' : '#64748b'
            }}>
              {tab.label}
              <span style={{
                marginLeft: '0.5rem', padding: '0.25rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem',
                background: activeTab === tab.id ? 'rgba(255,255,255,0.2)' : '#f1f5f9',
                color: activeTab === tab.id ? 'white' : '#64748b'
              }}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{
          background: 'rgba(255,255,255,0.95)', borderRadius: '20px', padding: '1rem',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)', marginBottom: '1.5rem'
        }}>
          <div style={{ position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input type="text" placeholder="Search by name, email, or organization..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%', padding: '0.875rem 1rem 0.875rem 3rem', border: '2px solid #e2e8f0',
                borderRadius: '12px', fontSize: '0.95rem', outline: 'none', background: '#f8fafc'
              }}
            />
          </div>
        </div>

        {/* Organizers List */}
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: 'rgba(255,255,255,0.95)', borderRadius: '24px' }}>
            <RefreshCw size={48} color="#667eea" style={{ animation: 'spin 1s linear infinite', marginBottom: '1rem' }} />
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Loading organizers...</p>
          </div>
        ) : filteredOrganizers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: 'rgba(255,255,255,0.95)', borderRadius: '24px' }}>
            <Users size={64} color="#94a3b8" style={{ marginBottom: '1rem' }} />
            <h3 style={{ color: '#64748b', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              {activeTab === 'pending' ? 'No pending approvals' : 'No organizers found'}
            </h3>
            <p style={{ color: '#94a3b8' }}>
              {activeTab === 'pending' ? 'All organizer requests have been reviewed' : 'Try adjusting your search criteria'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredOrganizers.map((organizer) => (
              <div key={organizer.id} style={{
                background: 'rgba(255,255,255,0.95)', borderRadius: '24px', padding: '1.5rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)', border: '1px solid rgba(255,255,255,0.5)'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', flex: 1 }}>
                    <div style={{
                      width: '70px', height: '70px', background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.75rem', fontWeight: 700, color: 'white', flexShrink: 0,
                      boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)'
                    }}>
                      {organizer.name.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>{organizer.name}</h3>
                        <span style={{
                          padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600,
                          background: organizer.isApproved ? 'linear-gradient(135deg, #10b98115, #34d39915)' : 'linear-gradient(135deg, #f59e0b15, #fbbf2415)',
                          color: organizer.isApproved ? '#10b981' : '#f59e0b',
                          display: 'flex', alignItems: 'center', gap: '0.35rem'
                        }}>
                          {organizer.isApproved ? <CheckCircle size={14} /> : <Clock size={14} />}
                          {organizer.isApproved ? 'Approved' : 'Pending'}
                        </span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginTop: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                          <Mail size={16} color="#667eea" /> {organizer.email}
                        </div>
                        {organizer.phone && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                            <Phone size={16} color="#667eea" /> {organizer.phone}
                          </div>
                        )}
                        {organizer.department && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                            <Building size={16} color="#667eea" /> {organizer.department}
                          </div>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                          <Calendar size={16} color="#667eea" /> Registered: {new Date(organizer.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
                    {!organizer.isApproved && (
                      <>
                        <button onClick={() => handleApprove(organizer.id)} style={{
                          display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem',
                          background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white',
                          border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer',
                          boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)', transition: 'all 0.3s ease'
                        }}>
                          <ThumbsUp size={18} /> Approve
                        </button>
                        <button onClick={() => handleReject(organizer.id)} style={{
                          display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem',
                          background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white',
                          border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer',
                          boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)', transition: 'all 0.3s ease'
                        }}>
                          <ThumbsDown size={18} /> Reject
                        </button>
                      </>
                    )}
                    <button style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem',
                      background: 'linear-gradient(135deg, #667eea15, #764ba215)', color: '#667eea',
                      border: '2px solid #667eea30', borderRadius: '12px', fontWeight: 600, cursor: 'pointer'
                    }}>
                      <Eye size={18} /> View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
      `}</style>
    </div>
  );
};

export default EnhancedApprovalsPage;
