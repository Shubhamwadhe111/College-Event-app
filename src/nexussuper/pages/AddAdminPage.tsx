import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Phone, Building2, Briefcase, ArrowLeft, Save, CheckCircle, Shield } from 'lucide-react';
import { LocalStorageService } from '../../services/localStorageService';

const AddAdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    role: 'College Admin'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const storageService = new LocalStorageService();
      await storageService.createAdmin(formData);
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/nexussuper/admins');
      }, 2000);
    } catch (error) {
      console.error('Error creating admin:', error);
      alert('Failed to create admin. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.875rem 1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.3s ease'
  };

  const labelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#10b981',
    fontSize: '0.85rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  if (showSuccess) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          background: 'rgba(16, 185, 129, 0.1)',
          borderRadius: '20px',
          border: '2px solid rgba(16, 185, 129, 0.3)'
        }}>
          <CheckCircle size={64} color="#10b981" style={{ marginBottom: '1rem' }} />
          <h2 style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Admin Added Successfully!</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>Redirecting to admins list...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={() => navigate('/nexussuper/functions')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'transparent',
              border: 'none',
              color: '#10b981',
              fontSize: '0.9rem',
              cursor: 'pointer',
              marginBottom: '1rem'
            }}
          >
            <ArrowLeft size={18} />
            Back to Functions
          </button>
          <h1 style={{
            color: '#ffffff',
            fontSize: '2rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <UserPlus size={32} color="#10b981" />
            Add New Admin
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem' }}>
            Create a new administrator account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '16px',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          padding: '2rem'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={labelStyle}>
                <UserPlus size={16} />
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter admin's full name"
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>
                <Mail size={16} />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="admin@example.com"
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>
                <Phone size={16} />
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 XXXXX XXXXX"
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>
                <Building2 size={16} />
                Department *
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                placeholder="e.g., Computer Science, Administration"
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>
                <Shield size={16} />
                Admin Role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
                style={{
                  ...inputStyle,
                  cursor: 'pointer'
                }}
              >
                <option value="College Admin" style={{ background: '#1e293b' }}>College Admin</option>
                <option value="Department Admin" style={{ background: '#1e293b' }}>Department Admin</option>
                <option value="Event Coordinator" style={{ background: '#1e293b' }}>Event Coordinator</option>
                <option value="Super Admin" style={{ background: '#1e293b' }}>Super Admin</option>
              </select>
            </div>
          </div>

          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '10px',
            border: '1px solid rgba(59, 130, 246, 0.3)'
          }}>
            <p style={{ color: '#60a5fa', fontSize: '0.85rem', margin: 0 }}>
              <strong>Note:</strong> The admin will receive login credentials via email after creation.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              marginTop: '2rem',
              padding: '1rem',
              background: isSubmitting 
                ? 'rgba(16, 185, 129, 0.5)' 
                : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              border: 'none',
              borderRadius: '12px',
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
            }}
          >
            <Save size={20} />
            {isSubmitting ? 'Creating Admin...' : 'Create Admin'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdminPage;
