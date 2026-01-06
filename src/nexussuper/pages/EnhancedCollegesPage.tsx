import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  MoreVertical, 
  Users, 
  Calendar, 
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Globe,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { collegeAPI } from '../../services/api';

interface College {
  id: string;
  name: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  admin_count: number;
  event_count: number;
  student_count: number;
  status: 'active' | 'inactive' | 'pending';
  joined_date: string;
  last_activity: string;
}

const EnhancedCollegesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCollege, setNewCollege] = useState({
    name: '',
    location: '',
    email: '',
    phone: '',
    website: ''
  });

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      setLoading(true);
      const data = await collegeAPI.getAll();
      setColleges(data);
    } catch (error) {
      console.error('Failed to fetch colleges:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCollege = async () => {
    try {
      await collegeAPI.create(newCollege);
      setShowAddModal(false);
      setNewCollege({ name: '', location: '', email: '', phone: '', website: '' });
      fetchColleges();
    } catch (error) {
      console.error('Failed to add college:', error);
      alert('Failed to add college. Please try again.');
    }
  };

  const handleDeleteCollege = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this college?')) {
      try {
        await collegeAPI.delete(id);
        fetchColleges();
      } catch (error) {
        console.error('Failed to delete college:', error);
        alert('Failed to delete college. Please try again.');
      }
    }
  };

  // Mock data removed - now using state with real API data

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'inactive': return '#ef4444';
      case 'pending': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} />;
      case 'inactive': return <XCircle size={16} />;
      case 'pending': return <AlertCircle size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (college.location && college.location.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === 'all' || college.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div style={{
        padding: '2rem',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
        minHeight: '100vh',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '3px solid rgba(16, 185, 129, 0.3)',
            borderTop: '3px solid #10b981',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }} />
          <p>Loading colleges...</p>
        </div>
      </div>
    );
  }

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
            College Management
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '1.1rem'
          }}>
            Manage all registered colleges and institutions
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1rem 1.5rem',
            background: 'linear-gradient(135deg, #10b981, #14b8a6)',
            border: 'none',
            borderRadius: '12px',
            color: '#ffffff',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
          }}
        >
          <Plus size={20} />
          Add College
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #10b981, #14b8a6)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Building2 size={24} color="#ffffff" />
            </div>
            <div>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', margin: 0 }}>
                Total Colleges
              </p>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', margin: 0 }}>
                {colleges.length}
              </p>
            </div>
          </div>
        </div>

        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '16px',
          padding: '1.5rem',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Users size={24} color="#ffffff" />
            </div>
            <div>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', margin: 0 }}>
                Total Students
              </p>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: '#3b82f6', margin: 0 }}>
                {colleges.reduce((sum, college) => sum + college.student_count, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div style={{
          background: 'rgba(168, 85, 247, 0.1)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          borderRadius: '16px',
          padding: '1.5rem',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Calendar size={24} color="#ffffff" />
            </div>
            <div>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', margin: 0 }}>
                Total Events
              </p>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: '#a855f7', margin: 0 }}>
                {colleges.reduce((sum, college) => sum + college.event_count, 0)}
              </p>
            </div>
          </div>
        </div>

        <div style={{
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '16px',
          padding: '1.5rem',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TrendingUp size={24} color="#ffffff" />
            </div>
            <div>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', margin: 0 }}>
                Active Colleges
              </p>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b', margin: 0 }}>
                {colleges.filter(c => c.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
          <Search style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'rgba(255, 255, 255, 0.5)'
          }} size={20} />
          <input
            type="text"
            placeholder="Search colleges..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem 1rem 1rem 3rem',
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              color: '#ffffff',
              fontSize: '1rem'
            }}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            padding: '1rem',
            background: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            color: '#ffffff',
            fontSize: '1rem',
            minWidth: '150px'
          }}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Colleges Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredColleges.map((college) => (
          <div
            key={college.id}
            style={{
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '1.5rem',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}
          >
            {/* College Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1rem'
            }}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '0.5rem'
                }}>
                  {college.name}
                </h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: getStatusColor(college.status),
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}>
                  {getStatusIcon(college.status)}
                  {college.status}
                </div>
              </div>
              <button style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem',
                color: 'rgba(255, 255, 255, 0.7)',
                cursor: 'pointer'
              }}>
                <MoreVertical size={16} />
              </button>
            </div>

            {/* College Info */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.9rem'
              }}>
                <MapPin size={16} />
                {college.location}
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.9rem'
              }}>
                <Mail size={16} />
                {college.email}
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.9rem'
              }}>
                <Phone size={16} />
                {college.phone}
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.9rem'
              }}>
                <Globe size={16} />
                <a href={college.website} target="_blank" rel="noopener noreferrer" style={{
                  color: '#10b981',
                  textDecoration: 'none'
                }}>
                  {college.website}
                </a>
              </div>
            </div>

            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#10b981',
                  margin: 0
                }}>
                  {college.admin_count}
                </p>
                <p style={{
                  fontSize: '0.8rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  margin: 0
                }}>
                  Admins
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#3b82f6',
                  margin: 0
                }}>
                  {college.event_count}
                </p>
                <p style={{
                  fontSize: '0.8rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  margin: 0
                }}>
                  Events
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#a855f7',
                  margin: 0
                }}>
                  {college.student_count.toLocaleString()}
                </p>
                <p style={{
                  fontSize: '0.8rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  margin: 0
                }}>
                  Students
                </p>
              </div>
            </div>

            {/* Actions */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <button style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                background: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '8px',
                color: '#10b981',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}>
                <Eye size={16} />
                View
              </button>
              <button style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                background: 'rgba(59, 130, 246, 0.2)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '8px',
                color: '#3b82f6',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}>
                <Edit size={16} />
                Edit
              </button>
              <button style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                color: '#ef4444',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
              onClick={() => handleDeleteCollege(college.id)}
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>

            {/* Footer Info */}
            <div style={{
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.8rem',
              color: 'rgba(255, 255, 255, 0.6)'
            }}>
              <span>Joined: {new Date(college.joined_date).toLocaleDateString()}</span>
              <span>Last active: {college.last_activity}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredColleges.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: 'rgba(255, 255, 255, 0.6)'
        }}>
          <Building2 size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No colleges found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Add College Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'rgba(30, 41, 59, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
            padding: '2rem',
            width: '90%',
            maxWidth: '500px',
            backdropFilter: 'blur(10px)'
          }}>
            <h2 style={{ color: '#ffffff', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
              Add New College
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input
                type="text"
                placeholder="College Name"
                value={newCollege.name}
                onChange={(e) => setNewCollege({...newCollege, name: e.target.value})}
                style={{
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              />
              
              <input
                type="text"
                placeholder="Location"
                value={newCollege.location}
                onChange={(e) => setNewCollege({...newCollege, location: e.target.value})}
                style={{
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              />
              
              <input
                type="email"
                placeholder="Email"
                value={newCollege.email}
                onChange={(e) => setNewCollege({...newCollege, email: e.target.value})}
                style={{
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              />
              
              <input
                type="tel"
                placeholder="Phone"
                value={newCollege.phone}
                onChange={(e) => setNewCollege({...newCollege, phone: e.target.value})}
                style={{
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              />
              
              <input
                type="url"
                placeholder="Website"
                value={newCollege.website}
                onChange={(e) => setNewCollege({...newCollege, website: e.target.value})}
                style={{
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddCollege}
                disabled={!newCollege.name || !newCollege.email}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: newCollege.name && newCollege.email ? 'linear-gradient(135deg, #10b981, #14b8a6)' : 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontWeight: 600,
                  cursor: newCollege.name && newCollege.email ? 'pointer' : 'not-allowed',
                  opacity: newCollege.name && newCollege.email ? 1 : 0.5
                }}
              >
                Add College
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedCollegesPage;