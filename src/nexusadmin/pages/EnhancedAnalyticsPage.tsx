import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, TrendingDown, Users, Calendar, Activity,
  Download, RefreshCw, PieChart, Target, Award, Clock, MapPin, Sparkles
} from 'lucide-react';

const EnhancedAnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const analyticsData = {
    overview: {
      totalEvents: 156, totalParticipants: 2847, activeOrganizers: 24,
      avgParticipation: 18.2, growthRate: 12.5, completionRate: 94.2
    },
    eventsByCategory: [
      { category: 'Technology', count: 45, percentage: 28.8, growth: 15.2, color: '#3b82f6' },
      { category: 'Cultural', count: 38, percentage: 24.4, growth: 8.7, color: '#8b5cf6' },
      { category: 'Sports', count: 32, percentage: 20.5, growth: -2.1, color: '#f59e0b' },
      { category: 'Academic', count: 25, percentage: 16.0, growth: 22.3, color: '#10b981' },
      { category: 'Professional', count: 16, percentage: 10.3, growth: 5.8, color: '#ec4899' }
    ],
    monthlyTrends: [
      { month: 'Aug', events: 12, participants: 245 },
      { month: 'Sep', events: 18, participants: 387 },
      { month: 'Oct', events: 22, participants: 456 },
      { month: 'Nov', events: 19, participants: 398 },
      { month: 'Dec', events: 15, participants: 312 },
      { month: 'Jan', events: 23, participants: 489 }
    ],
    topOrganizers: [
      { name: 'John Smith', events: 12, participants: 450, rating: 4.8 },
      { name: 'Sarah Johnson', events: 8, participants: 680, rating: 4.9 },
      { name: 'Mike Wilson', events: 6, participants: 234, rating: 4.6 },
      { name: 'Emily Davis', events: 5, participants: 198, rating: 4.7 }
    ],
    popularVenues: [
      { venue: 'Main Auditorium', events: 28, utilization: 85 },
      { venue: 'Conference Hall', events: 22, utilization: 92 },
      { venue: 'Sports Complex', events: 18, utilization: 78 },
      { venue: 'Innovation Hub', events: 15, utilization: 88 }
    ],
    participationTrends: {
      registrationRate: 78.5, attendanceRate: 85.2, satisfactionScore: 4.6, repeatParticipation: 42.3
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

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
              <BarChart3 size={28} color="#fbbf24" />
              <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', margin: 0, textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
                Analytics Dashboard
              </h1>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem' }}>Comprehensive insights into event performance</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} style={{
              padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255,255,255,0.3)', borderRadius: '12px', color: 'white', fontWeight: 600, cursor: 'pointer'
            }}>
              <option value="week" style={{ color: '#1e293b' }}>This Week</option>
              <option value="month" style={{ color: '#1e293b' }}>This Month</option>
              <option value="quarter" style={{ color: '#1e293b' }}>This Quarter</option>
              <option value="year" style={{ color: '#1e293b' }}>This Year</option>
            </select>
            <button onClick={handleRefresh} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem',
              background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: 'white',
              border: '2px solid rgba(255,255,255,0.3)', borderRadius: '12px', fontWeight: 600, cursor: 'pointer'
            }}>
              <RefreshCw size={18} style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} /> Refresh
            </button>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem',
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: '#1e293b',
              border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(251, 191, 36, 0.4)'
            }}>
              <Download size={18} /> Export
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Events', value: analyticsData.overview.totalEvents, icon: Calendar, color: '#3b82f6', trend: '+12%' },
            { label: 'Participants', value: analyticsData.overview.totalParticipants.toLocaleString(), icon: Users, color: '#10b981', trend: '+8%' },
            { label: 'Organizers', value: analyticsData.overview.activeOrganizers, icon: Activity, color: '#8b5cf6', trend: '+3' },
            { label: 'Avg Participation', value: analyticsData.overview.avgParticipation, icon: Target, color: '#f59e0b', trend: '+2.3%' },
            { label: 'Completion Rate', value: `${analyticsData.overview.completionRate}%`, icon: Award, color: '#ec4899', trend: '+1.8%' },
            { label: 'Satisfaction', value: analyticsData.participationTrends.satisfactionScore, icon: Sparkles, color: '#06b6d4', trend: '+0.2' }
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.95)', borderRadius: '20px', padding: '1.25rem',
              boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{
                  width: '45px', height: '45px', background: `linear-gradient(135deg, ${stat.color}, ${stat.color}99)`,
                  borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 6px 15px ${stat.color}40`
                }}>
                  <stat.icon size={22} color="white" />
                </div>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#10b981', fontSize: '0.8rem', fontWeight: 600 }}>
                  <TrendingUp size={14} /> {stat.trend}
                </span>
              </div>
              <p style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>{stat.value}</p>
              <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {/* Events by Category */}
          <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '24px', padding: '1.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <PieChart size={20} color="#667eea" /> Events by Category
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {analyticsData.eventsByCategory.map((cat, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: cat.color }} />
                      <span style={{ color: '#1e293b', fontWeight: 600 }}>{cat.category}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{cat.count} events</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: cat.growth >= 0 ? '#10b981' : '#ef4444', fontSize: '0.8rem', fontWeight: 600 }}>
                        {cat.growth >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {Math.abs(cat.growth)}%
                      </span>
                    </div>
                  </div>
                  <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${cat.percentage}%`, background: `linear-gradient(90deg, ${cat.color}, ${cat.color}99)`, borderRadius: '4px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trends */}
          <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '24px', padding: '1.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={20} color="#667eea" /> Monthly Trends
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {analyticsData.monthlyTrends.map((month, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ color: '#1e293b', fontWeight: 600, width: '40px' }}>{month.month}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ height: '24px', background: '#f1f5f9', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
                      <div style={{
                        height: '100%', width: `${(month.events / 25) * 100}%`,
                        background: 'linear-gradient(90deg, #667eea, #764ba2)', borderRadius: '12px',
                        display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '0.5rem'
                      }}>
                        <span style={{ color: 'white', fontSize: '0.75rem', fontWeight: 600 }}>{month.events}</span>
                      </div>
                    </div>
                  </div>
                  <span style={{ color: '#64748b', fontSize: '0.85rem', width: '100px', textAlign: 'right' }}>{month.participants} participants</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
          {/* Top Organizers */}
          <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '24px', padding: '1.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1e293b', margin: '0 0 1.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={20} color="#667eea" /> Top Organizers
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {analyticsData.topOrganizers.map((org, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem',
                  background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)', borderRadius: '16px'
                }}>
                  <div style={{
                    width: '45px', height: '45px', background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 700, fontSize: '1.1rem'
                  }}>
                    {org.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#1e293b', fontWeight: 600, margin: 0 }}>{org.name}</p>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>{org.events} events • {org.participants} participants</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span style={{ color: '#fbbf24', fontSize: '1rem' }}>★</span>
                    <span style={{ color: '#1e293b', fontWeight: 600 }}>{org.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Venues */}
          <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '24px', padding: '1.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1e293b', margin: '0 0 1.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={20} color="#667eea" /> Popular Venues
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {analyticsData.popularVenues.map((venue, i) => (
                <div key={i} style={{ padding: '1rem', background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)', borderRadius: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ color: '#1e293b', fontWeight: 600 }}>{venue.venue}</span>
                    <span style={{ color: '#667eea', fontWeight: 600, fontSize: '0.9rem' }}>{venue.utilization}% utilized</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{venue.events} events hosted</span>
                  </div>
                  <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${venue.utilization}%`,
                      background: venue.utilization > 85 ? 'linear-gradient(90deg, #10b981, #34d399)' : 'linear-gradient(90deg, #667eea, #764ba2)',
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Participation Insights */}
          <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '24px', padding: '1.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1e293b', margin: '0 0 1.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={20} color="#667eea" /> Participation Insights
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {[
                { label: 'Registration Rate', value: `${analyticsData.participationTrends.registrationRate}%`, color: '#3b82f6' },
                { label: 'Attendance Rate', value: `${analyticsData.participationTrends.attendanceRate}%`, color: '#10b981' },
                { label: 'Satisfaction', value: analyticsData.participationTrends.satisfactionScore, color: '#fbbf24' },
                { label: 'Repeat Rate', value: `${analyticsData.participationTrends.repeatParticipation}%`, color: '#8b5cf6' }
              ].map((item, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '1rem', background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)', borderRadius: '16px' }}>
                  <div style={{
                    width: '60px', height: '60px', background: `linear-gradient(135deg, ${item.color}, ${item.color}99)`,
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 0.75rem', boxShadow: `0 8px 20px ${item.color}40`
                  }}>
                    <span style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>{item.value}</span>
                  </div>
                  <p style={{ color: '#1e293b', fontWeight: 600, margin: 0, fontSize: '0.9rem' }}>{item.label}</p>
                </div>
              ))}
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

export default EnhancedAnalyticsPage;
