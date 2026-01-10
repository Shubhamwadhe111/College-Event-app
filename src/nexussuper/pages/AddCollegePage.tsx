import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, Mail, Phone, Globe, ArrowLeft, Save, CheckCircle } from 'lucide-react';
import { LocalStorageService } from '../../services/localStorageService';

const AddCollegePage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    email: '',
    phone: '',
    website: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const storageService = new LocalStorageService();
      await storageService.createCollege(formData);
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/nexussuper/colleges');
      }, 2000);
    } catch (error) {
      console.error('Error creating college:', error);
      alert('Failed to create college. Please try again.');
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
          <h2 style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '0.5rem' }}>College Added Successfully!</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>Redirecting to colleges list...</p>
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
            <Building2 size={32} color="#10b981" />
            Add New College
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem' }}>
            Register a new college in the Nexus platform
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
                <Building2 size={16} />
                College Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter college name"
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>
                <MapPin size={16} />
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="City, State"
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
                placeholder="admin@college.edu"
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>
                <Phone size={16} />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 XXXXX XXXXX"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>
                <Globe size={16} />
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://www.college.edu"
                style={inputStyle}
              />
            </div>
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
            {isSubmitting ? 'Adding College...' : 'Add College'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCollegePage;
