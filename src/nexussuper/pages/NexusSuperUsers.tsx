import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, Download, Plus, Edit, Trash2, Shield, Crown } from 'lucide-react';

const NexusSuperUsers: React.FC = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Admin', email: 'john@college1.edu', role: 'admin', college: 'College A', status: 'active', lastLogin: '2024-01-05' },
    { id: 2, name: 'Sarah Manager', email: 'sarah@college2.edu', role: 'admin', college: 'College B', status: 'active', lastLogin: '2024-01-04' },
    { id: 3, name: 'Mike Super', email: 'mike@system.edu', role: 'master', college: 'System', status: 'active', lastLogin: '2024-01-05' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div style={{ padding: '2rem', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem',
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '2rem', 
              fontWeight: 800, 
              color: '#1e293b', 
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Crown style={{ color: '#10b981' }} size={32} />
              Global User Management
            </h1>
            <p style={{ color: '#64748b', margin: '0.5rem 0 0 0' }}>
              Manage all users across all college portals
            </p>
          </div>
          <button style={{
            background: 'linear-gradient(45deg, #10b981, #14b8a6)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Plus size={20} />
            Add User
          </button>
        </div>

        {/* Search and Filter */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '1.5rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: '#64748b'
            }} size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 44px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            style={{
              padding: '12px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '1rem',
              minWidth: '150px'
            }}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="master">Master</option>
            <option value="student">Student</option>
            <option value="organizer">Organizer</option>
          </select>
          <button style={{
            background: '#f1f5f9',
            color: '#475569',
            border: '2px solid #e2e8f0',
            padding: '12px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Download size={20} />
            Export
          </button>
        </div>

        {/* Users Table */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 120px 120px 100px 120px 120px',
            gap: '1rem',
            padding: '1rem 1.5rem',
            background: '#f8fafc',
            fontWeight: 600,
            color: '#475569',
            borderBottom: '1px solid #e2e8f0'
          }}>
            <div>Name</div>
            <div>Email</div>
            <div>Role</div>
            <div>College</div>
            <div>Status</div>
            <div>Last Login</div>
            <div>Actions</div>
          </div>
          
          {filteredUsers.map((user) => (
            <div key={user.id} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 120px 120px 100px 120px 120px',
              gap: '1rem',
              padding: '1rem 1.5rem',
              borderBottom: '1px solid #f1f5f9',
              alignItems: 'center'
            }}>
              <div style={{ fontWeight: 600, color: '#1e293b' }}>{user.name}</div>
              <div style={{ color: '#64748b' }}>{user.email}</div>
              <div>
                <span style={{
                  background: user.role === 'master' ? '#fef3c7' : user.role === 'admin' ? '#dbeafe' : '#f3f4f6',
                  color: user.role === 'master' ? '#92400e' : user.role === 'admin' ? '#1e40af' : '#374151',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  {user.role === 'master' && <Crown size={14} />}
                  {user.role === 'admin' && <Shield size={14} />}
                  {user.role}
                </span>
              </div>
              <div style={{ color: '#64748b' }}>{user.college}</div>
              <div>
                <span style={{
                  background: user.status === 'active' ? '#dcfce7' : '#fee2e2',
                  color: user.status === 'active' ? '#166534' : '#dc2626',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}>
                  {user.status}
                </span>
              </div>
              <div style={{ color: '#64748b', fontSize: '0.875rem' }}>{user.lastLogin}</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  background: '#f1f5f9',
                  color: '#475569',
                  border: 'none',
                  padding: '6px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}>
                  <Edit size={16} />
                </button>
                <button style={{
                  background: '#fef2f2',
                  color: '#dc2626',
                  border: 'none',
                  padding: '6px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981' }}>
              {users.filter(u => u.role === 'admin').length}
            </div>
            <div style={{ color: '#64748b', fontWeight: 500 }}>College Admins</div>
          </div>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b' }}>
              {users.filter(u => u.role === 'master').length}
            </div>
            <div style={{ color: '#64748b', fontWeight: 500 }}>Master Admins</div>
          </div>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#8b5cf6' }}>
              {users.filter(u => u.status === 'active').length}
            </div>
            <div style={{ color: '#64748b', fontWeight: 500 }}>Active Users</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NexusSuperUsers;