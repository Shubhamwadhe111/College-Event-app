import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar, 
  Building2,
  Activity,
  PieChart,
  LineChart,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';

const EnhancedMasterAnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('events');

  // Mock analytics data
  const analyticsData = {
    totalEvents: 156,
    totalColleges: 12,
    totalAdmins: 45,
    totalStudents: 125000,
    eventGrowth: 23.5,
    collegeGrowth: 8.3,
    adminGrowth: 15.2,
    studentGrowth: 12.7
  };

  const collegeStats = [
    { name: 'MIT College of Engineering', events: 45, students: 11000, admins: 12, growth: 25 },
    { name: 'Stanford University', events: 32, students: 17000, admins: 8, growth: 18 },
    { name: 'Harvard University', events: 28, students: 23000, admins: 15, growth: 15 },
    { name: 'UC Berkeley', events: 25, students: 19000, admins: 6, growth: 22 },
    { name: 'Caltech', events: 26, students: 2500, admins: 4, growth: 30 }
  ];

  const eventCategories = [
    { name: 'Technology', count: 45, percentage: 28.8, color: '#10b981' },
    { name: 'Business', count: 32, percentage: 20.5, color: '#3b82f6' },
    { name: 'Cultural', count: 28, percentage: 17.9, color: '#a855f7' },
    { name: 'Sports', count: 25, percentage: 16.0, color: '#f59e0b' },
    { name: 'Academic', count: 26, percentage: 16.7, color: '#ef4444' }
  ];

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
            System Analytics
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '1.1rem'
          }}>
            Comprehensive insights across all colleges and events
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '0.9rem'
            }}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            background: 'linear-gradient(135deg, #10b981, #14b8a6)',
            border: 'none',
            borderRadius: '8px',
            color: '#ffffff',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}>
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '16px',
          padding: '1.5rem',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #10b981, #14b8a6)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Calendar size={24} color="#ffffff" />
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              color: '#10b981',
              fontSize: '0.9rem',
              fontWeight: 600
            }}>
              <TrendingUp size={16} />
              +{analyticsData.eventGrowth}%
            </div>
          </div>
          <div>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', margin: 0 }}>
              Total Events
            </p>
            <p style={{ fontSize: '2.5rem', fontWeight: 800, color: '#10b981', margin: 0 }}>
              {analyticsData.totalEvents}
            </p>
          </div>
        </div>

        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '16px',
          padding: '1.5rem',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Building2 size={24} color="#ffffff" />
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              color: '#3b82f6',
              fontSize: '0.9rem',
              fontWeight: 600
            }}>
              <TrendingUp size={16} />
              +{analyticsData.collegeGrowth}%
            </div>
          </div>
          <div>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', margin: 0 }}>
              Active Colleges
            </p>
            <p style={{ fontSize: '2.5rem', fontWeight: 800, color: '#3b82f6', margin: 0 }}>
              {analyticsData.totalColleges}
            </p>
          </div>
        </div>

        <div style={{
          background: 'rgba(168, 85, 247, 0.1)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          borderRadius: '16px',
          padding: '1.5rem',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Users size={24} color="#ffffff" />
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              color: '#a855f7',
              fontSize: '0.9rem',
              fontWeight: 600
            }}>
              <TrendingUp size={16} />
              +{analyticsData.studentGrowth}%
            </div>
          </div>
          <div>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', margin: 0 }}>
              Total Students
            </p>
            <p style={{ fontSize: '2.5rem', fontWeight: 800, color: '#a855f7', margin: 0 }}>
              {analyticsData.totalStudents.toLocaleString()}
            </p>
          </div>
        </div>

        <div style={{
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '16px',
          padding: '1.5rem',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Activity size={24} color="#ffffff" />
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              color: '#f59e0b',
              fontSize: '0.9rem',
              fontWeight: 600
            }}>
              <TrendingUp size={16} />
              +{analyticsData.adminGrowth}%
            </div>
          </div>
          <div>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', margin: 0 }}>
              System Admins
            </p>
            <p style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f59e0b', margin: 0 }}>
              {analyticsData.totalAdmins}
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* College Performance */}
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
            <BarChart3 size={20} />
            Top Performing Colleges
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {collegeStats.map((college, index) => (
              <div key={college.name} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#ffffff',
                    marginBottom: '0.25rem'
                  }}>
                    {college.name}
                  </h4>
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    fontSize: '0.85rem',
                    color: 'rgba(255, 255, 255, 0.7)'
                  }}>
                    <span>{college.events} events</span>
                    <span>{college.students.toLocaleString()} students</span>
                    <span>{college.admins} admins</span>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: college.growth > 20 ? '#10b981' : '#3b82f6',
                  fontWeight: 600
                }}>
                  <TrendingUp size={16} />
                  +{college.growth}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Categories */}
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
            <PieChart size={20} />
            Event Categories Distribution
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {eventCategories.map((category) => (
              <div key={category.name} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: category.color
                  }} />
                  <span style={{
                    color: '#ffffff',
                    fontWeight: 600
                  }}>
                    {category.name}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '100px',
                    height: '8px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${category.percentage}%`,
                      height: '100%',
                      background: category.color,
                      borderRadius: '4px'
                    }} />
                  </div>
                  <span style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.9rem',
                    minWidth: '60px',
                    textAlign: 'right'
                  }}>
                    {category.count} ({category.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Health */}
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
          System Health & Performance
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'conic-gradient(#10b981 0deg 324deg, rgba(255, 255, 255, 0.1) 324deg 360deg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              position: 'relative'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(30, 41, 59, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: 800,
                color: '#10b981'
              }}>
                90%
              </div>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', margin: 0 }}>
              System Uptime
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'conic-gradient(#3b82f6 0deg 288deg, rgba(255, 255, 255, 0.1) 288deg 360deg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              position: 'relative'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(30, 41, 59, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: 800,
                color: '#3b82f6'
              }}>
                80%
              </div>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', margin: 0 }}>
              Performance Score
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'conic-gradient(#a855f7 0deg 342deg, rgba(255, 255, 255, 0.1) 342deg 360deg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              position: 'relative'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(30, 41, 59, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: 800,
                color: '#a855f7'
              }}>
                95%
              </div>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', margin: 0 }}>
              User Satisfaction
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'conic-gradient(#f59e0b 0deg 306deg, rgba(255, 255, 255, 0.1) 306deg 360deg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              position: 'relative'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(30, 41, 59, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: 800,
                color: '#f59e0b'
              }}>
                85%
              </div>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', margin: 0 }}>
              Resource Usage
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedMasterAnalyticsPage;