import React, { useState, useEffect } from 'react';
import { Megaphone, Calendar, Clock, AlertTriangle, Info, CheckCircle, Pin, Bell, Loader2 } from 'lucide-react';

interface Notice {
  id: number;
  title: string;
  content: string;
  type: 'urgent' | 'important' | 'general' | 'exam' | 'cultural';
  date: string;
  author: string;
  isPinned: boolean;
  expiryDate?: string;
}

const Notices: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    const loadNotices = async () => {
      setLoading(true);
      
      // Try to fetch from API first
      try {
        const response = await fetch('http://localhost:5001/api/notifications');
        if (response.ok) {
          const data = await response.json();
          // Transform API data to Notice format
          const transformedNotices = data.map((n: any, index: number) => ({
            id: n.id || index,
            title: n.title || n.message,
            content: n.message,
            type: n.type || 'general',
            date: n.created_at || new Date().toISOString(),
            author: 'Administration',
            isPinned: n.priority === 'high',
            expiryDate: n.expiry_date
          }));
          if (transformedNotices.length > 0) {
            setNotices(transformedNotices);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.log('Using mock notices data');
      }

      // Mock data fallback
      const mockNotices: Notice[] = [
        {
          id: 1,
          title: "Mid-Semester Examination Schedule Released",
          content: "The mid-semester examination schedule for all departments has been released. Students are advised to check their respective department notice boards and the college website for detailed timetables. Examinations will commence from March 15, 2024.",
          type: 'exam',
          date: '2024-02-10',
          author: 'Academic Office',
          isPinned: true,
          expiryDate: '2024-03-20'
        },
        {
          id: 2,
          title: "Annual Cultural Fest - Nexus 2024 Registration Open",
          content: "Registration for the annual cultural fest 'Nexus 2024' is now open. Students can participate in various events including dance, music, drama, art, and literary competitions. Registration deadline: February 25, 2024.",
          type: 'cultural',
          date: '2024-02-08',
          author: 'Cultural Committee',
          isPinned: true,
          expiryDate: '2024-02-25'
        },
        {
          id: 3,
          title: "Library Timing Changes - Weekend Hours",
          content: "Due to maintenance work, the library will have modified timings during weekends. Saturday: 9:00 AM - 5:00 PM, Sunday: Closed. Regular timings will resume from next week.",
          type: 'important',
          date: '2024-02-07',
          author: 'Library Administration',
          isPinned: false,
          expiryDate: '2024-02-18'
        },
        {
          id: 4,
          title: "Scholarship Application Deadline Extended",
          content: "The deadline for merit-based scholarship applications has been extended to February 28, 2024. Students who meet the eligibility criteria are encouraged to apply through the student portal.",
          type: 'important',
          date: '2024-02-06',
          author: 'Student Affairs',
          isPinned: false,
          expiryDate: '2024-02-28'
        },
        {
          id: 5,
          title: "Campus WiFi Maintenance - Temporary Disruption",
          content: "The campus WiFi network will undergo scheduled maintenance on February 12, 2024, from 2:00 AM to 6:00 AM. Internet services may be temporarily unavailable during this period.",
          type: 'urgent',
          date: '2024-02-05',
          author: 'IT Department',
          isPinned: false,
          expiryDate: '2024-02-12'
        },
        {
          id: 6,
          title: "Guest Lecture on Artificial Intelligence",
          content: "The Computer Science Department is organizing a guest lecture on 'Future of Artificial Intelligence'. Date: February 20, 2024, Time: 2:00 PM, Venue: Main Auditorium. All students are welcome.",
          type: 'general',
          date: '2024-02-04',
          author: 'CS Department',
          isPinned: false,
          expiryDate: '2024-02-20'
        }
      ];

      setNotices(mockNotices);
      setLoading(false);
    };

    loadNotices();
  }, []);

  const getNoticeIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertTriangle size={20} style={{ color: '#ef4444' }} />;
      case 'important':
        return <Info size={20} style={{ color: '#eab308' }} />;
      case 'exam':
        return <CheckCircle size={20} style={{ color: '#3b82f6' }} />;
      case 'cultural':
        return <Megaphone size={20} style={{ color: '#a855f7' }} />;
      default:
        return <Info size={20} style={{ color: '#64748b' }} />;
    }
  };

  const getNoticeTypeStyle = (type: string) => {
    switch (type) {
      case 'urgent':
        return { background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.3)' };
      case 'important':
        return { background: 'rgba(234, 179, 8, 0.2)', color: '#fde047', border: '1px solid rgba(234, 179, 8, 0.3)' };
      case 'exam':
        return { background: 'rgba(59, 130, 246, 0.2)', color: '#93c5fd', border: '1px solid rgba(59, 130, 246, 0.3)' };
      case 'cultural':
        return { background: 'rgba(168, 85, 247, 0.2)', color: '#d8b4fe', border: '1px solid rgba(168, 85, 247, 0.3)' };
      default:
        return { background: 'rgba(100, 116, 139, 0.2)', color: '#cbd5e1', border: '1px solid rgba(100, 116, 139, 0.3)' };
    }
  };

  const filteredNotices = selectedType === 'all' 
    ? notices 
    : notices.filter(notice => notice.type === selectedType);

  const pinnedNotices = filteredNotices.filter(notice => notice.isPinned);
  const regularNotices = filteredNotices.filter(notice => !notice.isPinned);

  const filterTabs = [
    { key: 'all', label: 'All Notices' },
    { key: 'urgent', label: 'Urgent' },
    { key: 'important', label: 'Important' },
    { key: 'exam', label: 'Examinations' },
    { key: 'cultural', label: 'Cultural' },
    { key: 'general', label: 'General' }
  ];

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        paddingTop: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Loader2 size={48} style={{ color: '#10b981', animation: 'spin 1s linear infinite' }} />
          <p style={{ color: '#94a3b8', marginTop: '1rem' }}>Loading notices...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      paddingTop: '80px',
      paddingBottom: '40px'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)'
          }}>
            <Bell size={36} color="white" />
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #ffffff 0%, #10b981 50%, #14b8a6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem',
            textAlign: 'center'
          }}>
            Notices & Announcements
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', textAlign: 'center' }}>
            Stay updated with important college announcements and notices
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '2rem',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '0.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {filterTabs.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedType(filter.key)}
              style={{
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem',
                transition: 'all 0.2s ease',
                background: selectedType === filter.key 
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                  : 'transparent',
                color: selectedType === filter.key ? '#ffffff' : '#94a3b8'
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Pinned Notices */}
        {pinnedNotices.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#10b981'
            }}>
              <Pin size={20} />
              Pinned Notices
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pinnedNotices.map((notice) => (
                <div key={notice.id} style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderLeft: '4px solid #10b981'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', flex: 1 }}>
                      {getNoticeIcon(notice.type)}
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
                          {notice.title}
                        </h3>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          fontSize: '0.8rem',
                          color: '#64748b',
                          flexWrap: 'wrap'
                        }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Calendar size={14} />
                            {new Date(notice.date).toLocaleDateString()}
                          </span>
                          <span>By {notice.author}</span>
                          {notice.expiryDate && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <Clock size={14} />
                              Expires: {new Date(notice.expiryDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span style={{
                      padding: '0.3rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'capitalize',
                      ...getNoticeTypeStyle(notice.type)
                    }}>
                      {notice.type}
                    </span>
                  </div>
                  <p style={{ color: '#cbd5e1', lineHeight: '1.7', margin: 0 }}>
                    {notice.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Notices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {regularNotices.length === 0 && pinnedNotices.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <Megaphone size={64} style={{ color: '#64748b', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.5rem' }}>
                No notices found
              </h3>
              <p style={{ color: '#64748b' }}>
                {selectedType === 'all' 
                  ? "No notices available at the moment."
                  : `No ${selectedType} notices available.`
                }
              </p>
            </div>
          ) : (
            regularNotices.map((notice) => (
              <div key={notice.id} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', flex: 1 }}>
                    {getNoticeIcon(notice.type)}
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
                        {notice.title}
                      </h3>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        fontSize: '0.8rem',
                        color: '#64748b',
                        flexWrap: 'wrap'
                      }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Calendar size={14} />
                          {new Date(notice.date).toLocaleDateString()}
                        </span>
                        <span>By {notice.author}</span>
                      </div>
                    </div>
                  </div>
                  <span style={{
                    padding: '0.3rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    ...getNoticeTypeStyle(notice.type)
                  }}>
                    {notice.type}
                  </span>
                </div>
                <p style={{ color: '#cbd5e1', lineHeight: '1.7', margin: 0 }}>
                  {notice.content}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Notices;
