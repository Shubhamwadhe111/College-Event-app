import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, Mail, Lock, User, Phone, Building, Key, ArrowRight, Eye, EyeOff } from 'lucide-react';
import PortalLink from '../../components/PortalLink';

const NexusadminRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    department: '',
    secretCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showSecretCode, setShowSecretCode] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { registerAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.email || !formData.password || !formData.phone || !formData.department || !formData.secretCode) {
      setError('Please fill in all fields');
      return;
    }

    const result = await registerAdmin(formData);
    if (result.success) {
      setSuccess('Registration successful! You can now login.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setError(result.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const inputStyle = {
    width: '100%',
    paddingLeft: '3.5rem',
    paddingRight: '1rem',
    paddingTop: '0.875rem',
    paddingBottom: '0.875rem',
    background: 'rgba(30, 41, 59, 0.8)',
    border: '2px solid rgba(16, 185, 129, 0.2)',
    borderRadius: '12px',
    fontSize: '0.95rem',
    color: '#ffffff',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)'
  };

  const labelStyle = {
    display: 'block',
    color: '#f1f5f9',
    fontSize: '0.85rem',
    fontWeight: 600,
    marginBottom: '0.6rem',
    letterSpacing: '0.3px'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      position: 'relative'
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(20, 184, 166, 0.08) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        width: '100%',
        maxWidth: '480px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Main Card */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(25px) saturate(180%)',
          borderRadius: '24px',
          padding: '2.5rem 2rem',
          border: '2px solid rgba(16, 185, 129, 0.2)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 60px rgba(16, 185, 129, 0.1)',
          WebkitBackdropFilter: 'blur(25px) saturate(180%)'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '70px',
              height: '70px',
              background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%)',
              borderRadius: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4), 0 0 60px rgba(16, 185, 129, 0.2)',
              position: 'relative'
            }}>
              <Shield size={32} color="#ffffff" strokeWidth={2.5} />
              <div style={{
                position: 'absolute',
                inset: '-4px',
                background: 'linear-gradient(135deg, #10b981, #14b8a6, #06b6d4)',
                borderRadius: '18px',
                zIndex: -1,
                opacity: 0.3,
                filter: 'blur(8px)'
              }} />
            </div>
            <h1 style={{
              fontSize: '2.2rem',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #ffffff 0%, #10b981 50%, #14b8a6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.5rem',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              JOIN NEXUS ADMIN
            </h1>
            <p style={{
              color: 'rgba(16, 185, 129, 0.9)',
              fontSize: '0.9rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Register as College Administrator
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {error && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1))',
                border: '2px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                padding: '1rem',
                textAlign: 'center'
              }}>
                <p style={{ color: '#fca5a5', fontSize: '0.9rem', fontWeight: 600 }}>{error}</p>
              </div>
            )}

            {success && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1))',
                border: '2px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '12px',
                padding: '1rem',
                textAlign: 'center'
              }}>
                <p style={{ color: '#6ee7b7', fontSize: '0.9rem', fontWeight: 600 }}>{success}</p>
              </div>
            )}

            <div>
              <label style={labelStyle}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="Enter your full name"
                  required
                  onFocus={(e) => {
                    (e.target as HTMLElement).style.borderColor = 'rgba(16, 185, 129, 0.6)';
                    (e.target as HTMLElement).style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)';
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLElement).style.borderColor = 'rgba(16, 185, 129, 0.2)';
                    (e.target as HTMLElement).style.boxShadow = 'none';
                  }}
                />
                <User style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(16, 185, 129, 0.7)'
                }} size={18} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="Enter your email"
                  required
                  onFocus={(e) => {
                    (e.target as HTMLElement).style.borderColor = 'rgba(16, 185, 129, 0.6)';
                    (e.target as HTMLElement).style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)';
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLElement).style.borderColor = 'rgba(16, 185, 129, 0.2)';
                    (e.target as HTMLElement).style.boxShadow = 'none';
                  }}
                />
                <Mail style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(16, 185, 129, 0.7)'
                }} size={18} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{...inputStyle, paddingRight: '3.5rem'}}
                  placeholder="Create a password"
                  required
                  onFocus={(e) => {
                    (e.target as HTMLElement).style.borderColor = 'rgba(16, 185, 129, 0.6)';
                    (e.target as HTMLElement).style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)';
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLElement).style.borderColor = 'rgba(16, 185, 129, 0.2)';
                    (e.target as HTMLElement).style.boxShadow = 'none';
                  }}
                />
                <Lock style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(16, 185, 129, 0.7)'
                }} size={18} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(16, 185, 129, 0.7)',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    borderRadius: '4px'
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Phone Number</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="Enter your phone number"
                  required
                  onFocus={(e) => {
                    (e.target as HTMLElement).style.borderColor = 'rgba(16, 185, 129, 0.6)';
                    (e.target as HTMLElement).style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)';
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLElement).style.borderColor = 'rgba(16, 185, 129, 0.2)';
                    (e.target as HTMLElement).style.boxShadow = 'none';
                  }}
                />
                <Phone style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(16, 185, 129, 0.7)'
                }} size={18} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Department</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="Enter your department"
                  required
                  onFocus={(e) => {
                    (e.target as HTMLElement).style.borderColor = 'rgba(16, 185, 129, 0.6)';
                    (e.target as HTMLElement).style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)';
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLElement).style.borderColor = 'rgba(16, 185, 129, 0.2)';
                    (e.target as HTMLElement).style.boxShadow = 'none';
                  }}
                />
                <Building style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(16, 185, 129, 0.7)'
                }} size={18} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Admin Secret Code</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showSecretCode ? 'text' : 'password'}
                  name="secretCode"
                  value={formData.secretCode}
                  onChange={handleChange}
                  style={{...inputStyle, paddingRight: '3.5rem'}}
                  placeholder="Enter admin secret code"
                  required
                  onFocus={(e) => {
                    (e.target as HTMLElement).style.borderColor = 'rgba(16, 185, 129, 0.6)';
                    (e.target as HTMLElement).style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)';
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLElement).style.borderColor = 'rgba(16, 185, 129, 0.2)';
                    (e.target as HTMLElement).style.boxShadow = 'none';
                  }}
                />
                <Key style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(16, 185, 129, 0.7)'
                }} size={18} />
                <button
                  type="button"
                  onClick={() => setShowSecretCode(!showSecretCode)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(16, 185, 129, 0.7)',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    borderRadius: '4px'
                  }}
                >
                  {showSecretCode ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p style={{
                color: 'rgba(16, 185, 129, 0.6)',
                fontSize: '0.75rem',
                marginTop: '0.5rem',
                fontWeight: 500
              }}>
                Contact your system administrator for the secret code
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                background: isLoading 
                  ? 'rgba(16, 185, 129, 0.5)' 
                  : 'linear-gradient(135deg, #10b981, #14b8a6, #06b6d4)',
                color: '#ffffff',
                fontWeight: 700,
                padding: '1rem 1.5rem',
                borderRadius: '12px',
                border: 'none',
                fontSize: '0.95rem',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                boxShadow: isLoading 
                  ? 'none' 
                  : '0 8px 25px rgba(16, 185, 129, 0.3), 0 0 40px rgba(16, 185, 129, 0.1)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginTop: '0.5rem'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.target as HTMLElement).style.boxShadow = '0 12px 35px rgba(16, 185, 129, 0.4), 0 0 60px rgba(16, 185, 129, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  (e.target as HTMLElement).style.transform = 'translateY(0)';
                  (e.target as HTMLElement).style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.3), 0 0 40px rgba(16, 185, 129, 0.1)';
                }
              }}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '2px solid #ffffff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Admin Account
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div style={{
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '2px solid rgba(16, 185, 129, 0.2)',
            textAlign: 'center'
          }}>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Already have an admin account?
            </p>
            <PortalLink
              to="/login"
              style={{
                color: '#10b981',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                padding: '0.5rem 1rem',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                display: 'inline-block',
                textTransform: 'uppercase',
                letterSpacing: '0.3px'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = 'rgba(16, 185, 129, 0.1)';
                (e.target as HTMLElement).style.borderColor = 'rgba(16, 185, 129, 0.6)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = 'transparent';
                (e.target as HTMLElement).style.borderColor = 'rgba(16, 185, 129, 0.3)';
              }}
            >
              Sign In Instead
            </PortalLink>
          </div>
        </div>

        {/* Bottom Branding */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{
            color: 'rgba(16, 185, 129, 0.6)',
            fontSize: '0.8rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            © 2025 Nexus Admin Portal • Secure Administrative Access
          </p>
        </div>
      </div>
    </div>
  );
};

export default NexusadminRegister;
