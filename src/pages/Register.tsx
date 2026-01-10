import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight, Mail, Lock, User, Phone, School, Sparkles, GraduationCap, UserPlus } from 'lucide-react';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    college: '',
    userType: 'student' as 'student' | 'organizer'
  });
  const [error, setError] = useState('');
  const { register, registerOrganizer, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    let result;

    if (formData.userType === 'organizer') {
      result = await registerOrganizer({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || '',
        department: formData.college || 'Not specified',
        designation: 'Event Organizer'
      });
    } else {
      result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        studentId: formData.phone || 'auto-generated',
        college: formData.college || 'Not specified',
        role: 'student'
      });
    }

    if (result.success) {
      if (formData.userType === 'organizer') {
        setError('');
        alert('Organizer registration submitted! Please wait for admin approval before you can login.');
        navigate('/login');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(result.message);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.9rem 1rem 0.9rem 3.5rem',
    borderRadius: '12px',
    border: '2px solid rgba(99, 102, 241, 0.2)',
    background: 'rgba(30, 30, 60, 0.8)',
    color: 'white',
    fontSize: '0.95rem',
    fontWeight: 500,
    outline: 'none',
    transition: 'all 0.3s ease'
  };

  const labelStyle = {
    color: '#f1f5f9',
    fontWeight: 600,
    marginBottom: '0.6rem',
    display: 'block',
    fontSize: '0.85rem'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 50%, #2d1b4e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.12) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />
      
      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 6 + 2 + 'px',
            height: Math.random() * 6 + 2 + 'px',
            background: `rgba(${Math.random() > 0.5 ? '99, 102, 241' : '168, 85, 247'}, ${Math.random() * 0.4 + 0.2})`,
            borderRadius: '50%',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: `float ${Math.random() * 4 + 3}s ease-in-out infinite`,
            animationDelay: Math.random() * 2 + 's'
          }}
        />
      ))}

      <div className="container" style={{ maxWidth: '480px', position: 'relative', zIndex: 1 }}>
        <div style={{
          background: 'rgba(15, 15, 35, 0.9)',
          backdropFilter: 'blur(25px)',
          borderRadius: '24px',
          padding: '2.5rem 2rem',
          border: '2px solid rgba(99, 102, 241, 0.2)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.4), 0 0 80px rgba(99, 102, 241, 0.1)'
        }}>
          {/* Header */}
          <div className="text-center mb-4">
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              boxShadow: '0 10px 40px rgba(99, 102, 241, 0.4), 0 0 60px rgba(139, 92, 246, 0.2)',
              position: 'relative'
            }}>
              <UserPlus size={38} color="white" strokeWidth={2} />
              <Sparkles size={16} style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                color: '#fbbf24'
              }} />
            </div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #ffffff 0%, #6366f1 50%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.5rem',
              letterSpacing: '0.5px'
            }}>
              Join Nexus
            </h2>
            <p style={{
              color: 'rgba(139, 92, 246, 0.9)',
              fontSize: '0.95rem',
              fontWeight: 600
            }}>
              Create your college event account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1))',
                border: '2px solid rgba(239, 68, 68, 0.3)',
                color: '#fca5a5',
                padding: '1rem',
                borderRadius: '12px',
                marginBottom: '1.25rem',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}>
                {error}
              </div>
            )}

            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Account Type</label>
              <div style={{ position: 'relative' }}>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  style={{...inputStyle, cursor: 'pointer'}}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(99, 102, 241, 0.6)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="student" style={{ background: '#1e1e3e', color: 'white' }}>Student</option>
                  <option value="organizer" style={{ background: '#1e1e3e', color: 'white' }}>Event Organizer</option>
                </select>
                <User size={18} style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(139, 92, 246, 0.7)'
                }} />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Full Name *</label>
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
                    e.target.style.borderColor = 'rgba(99, 102, 241, 0.6)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <User size={18} style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(139, 92, 246, 0.7)'
                }} />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Email Address *</label>
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
                    e.target.style.borderColor = 'rgba(99, 102, 241, 0.6)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <Mail size={18} style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(139, 92, 246, 0.7)'
                }} />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Student ID / Phone Number</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="Enter your student ID or phone"
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(99, 102, 241, 0.6)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <Phone size={18} style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(139, 92, 246, 0.7)'
                }} />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>College/Institution</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="Enter your college name"
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(99, 102, 241, 0.6)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <School size={18} style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(139, 92, 246, 0.7)'
                }} />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Password *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="Create a password"
                  required
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(99, 102, 241, 0.6)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <Lock size={18} style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(139, 92, 246, 0.7)'
                }} />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.75rem' }}>
              <label style={labelStyle}>Confirm Password *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="Confirm your password"
                  required
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(99, 102, 241, 0.6)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <Lock size={18} style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(139, 92, 246, 0.7)'
                }} />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '12px',
                background: isLoading 
                  ? 'rgba(99, 102, 241, 0.5)' 
                  : 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)',
                border: 'none',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                transition: 'all 0.3s ease',
                marginBottom: '1.5rem',
                boxShadow: isLoading ? 'none' : '0 8px 25px rgba(99, 102, 241, 0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(99, 102, 241, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.4)';
                }
              }}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            <div className="text-center">
              <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  style={{ 
                    color: '#a855f7', 
                    textDecoration: 'none',
                    fontWeight: 700
                  }}
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default Register;
