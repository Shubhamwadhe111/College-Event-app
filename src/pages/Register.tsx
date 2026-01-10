import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight, Mail, Lock, User, Phone, School, Zap, GraduationCap, Briefcase, Building } from 'lucide-react';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    phone: '',
    college: '',
    clubName: '',
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
      if (!formData.clubName) {
        setError('Please enter your Club/Organization name');
        return;
      }
      if (!formData.phone) {
        setError('Please enter your phone number');
        return;
      }
      result = await registerOrganizer({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        department: formData.clubName,
        designation: 'Event Organizer'
      });
    } else {
      result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        studentId: formData.studentId || 'auto-generated',
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

  const isOrganizer = formData.userType === 'organizer';
  const themeColor = isOrganizer ? '#f59e0b' : '#10b981';

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem 1rem',
      paddingTop: '80px',
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
        background: `radial-gradient(circle at 20% 30%, rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(${isOrganizer ? '217, 119, 6' : '20, 184, 166'}, 0.08) 0%, transparent 50%)`,
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '420px', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{
          background: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '2rem 1.5rem',
          border: `1px solid rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.2)`,
          boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 60px rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.08)`
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: isOrganizer 
                ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                : 'linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              boxShadow: `0 8px 25px rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.35)`
            }}>
              {isOrganizer ? <Briefcase size={28} color="white" strokeWidth={2.5} /> : <Zap size={28} color="white" strokeWidth={2.5} />}
            </div>
            <h2 style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              background: isOrganizer 
                ? 'linear-gradient(135deg, #ffffff 0%, #f59e0b 50%, #d97706 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #10b981 50%, #14b8a6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.3rem'
            }}>
              Join Nexus
            </h2>
            <p style={{
              color: `rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.8)`,
              fontSize: '0.85rem',
              fontWeight: 500
            }}>
              {isOrganizer ? 'Register as Event Organizer' : 'Create your student account'}
            </p>
          </div>

          {/* User Type Selection */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            marginBottom: '1.5rem'
          }}>
            <button
              type="button"
              onClick={() => setFormData({...formData, userType: 'student'})}
              style={{
                flex: 1,
                padding: '0.85rem 0.5rem',
                borderRadius: '12px',
                border: formData.userType === 'student' 
                  ? '2px solid #10b981' 
                  : '2px solid rgba(255, 255, 255, 0.1)',
                background: formData.userType === 'student' 
                  ? 'rgba(16, 185, 129, 0.15)' 
                  : 'rgba(30, 41, 59, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <GraduationCap size={22} color={formData.userType === 'student' ? '#10b981' : '#94a3b8'} />
              <span style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                color: formData.userType === 'student' ? '#10b981' : '#94a3b8'
              }}>
                Student
              </span>
            </button>

            <button
              type="button"
              onClick={() => setFormData({...formData, userType: 'organizer'})}
              style={{
                flex: 1,
                padding: '0.85rem 0.5rem',
                borderRadius: '12px',
                border: formData.userType === 'organizer' 
                  ? '2px solid #f59e0b' 
                  : '2px solid rgba(255, 255, 255, 0.1)',
                background: formData.userType === 'organizer' 
                  ? 'rgba(245, 158, 11, 0.15)' 
                  : 'rgba(30, 41, 59, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Briefcase size={22} color={formData.userType === 'organizer' ? '#f59e0b' : '#94a3b8'} />
              <span style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                color: formData.userType === 'organizer' ? '#f59e0b' : '#94a3b8'
              }}>
                Organizer
              </span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#fca5a5',
                padding: '0.75rem',
                borderRadius: '10px',
                marginBottom: '1rem',
                textAlign: 'center',
                fontSize: '0.85rem',
                fontWeight: 500
              }}>
                {error}
              </div>
            )}

            {/* Full Name */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                color: '#e2e8f0',
                fontWeight: 600,
                marginBottom: '0.5rem',
                display: 'block',
                fontSize: '0.8rem'
              }}>
                Full Name *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.85rem 0.85rem 0.85rem 2.75rem',
                    borderRadius: '10px',
                    border: `1px solid rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.2)`,
                    background: 'rgba(30, 41, 59, 0.6)',
                    color: 'white',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter your full name"
                  required
                />
                <User size={16} style={{
                  position: 'absolute',
                  left: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: `rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.6)`
                }} />
              </div>
            </div>

            {/* Organizer: Club/Organization Name */}
            {isOrganizer && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  color: '#e2e8f0',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  display: 'block',
                  fontSize: '0.8rem'
                }}>
                  Club/Organization Name *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="clubName"
                    value={formData.clubName}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.85rem 0.85rem 0.85rem 2.75rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(245, 158, 11, 0.2)',
                      background: 'rgba(30, 41, 59, 0.6)',
                      color: 'white',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Enter club or organization name"
                    required={isOrganizer}
                  />
                  <Building size={16} style={{
                    position: 'absolute',
                    left: '0.85rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(245, 158, 11, 0.6)'
                  }} />
                </div>
              </div>
            )}

            {/* Email */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                color: '#e2e8f0',
                fontWeight: 600,
                marginBottom: '0.5rem',
                display: 'block',
                fontSize: '0.8rem'
              }}>
                Email Address *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.85rem 0.85rem 0.85rem 2.75rem',
                    borderRadius: '10px',
                    border: `1px solid rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.2)`,
                    background: 'rgba(30, 41, 59, 0.6)',
                    color: 'white',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter your email"
                  required
                />
                <Mail size={16} style={{
                  position: 'absolute',
                  left: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: `rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.6)`
                }} />
              </div>
            </div>

            {/* Student: Student ID */}
            {!isOrganizer && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  color: '#e2e8f0',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  display: 'block',
                  fontSize: '0.8rem'
                }}>
                  Student ID
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.85rem 0.85rem 0.85rem 2.75rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      background: 'rgba(30, 41, 59, 0.6)',
                      color: 'white',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Enter your student ID"
                  />
                  <GraduationCap size={16} style={{
                    position: 'absolute',
                    left: '0.85rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(16, 185, 129, 0.6)'
                  }} />
                </div>
              </div>
            )}

            {/* Organizer: Phone Number */}
            {isOrganizer && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  color: '#e2e8f0',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  display: 'block',
                  fontSize: '0.8rem'
                }}>
                  Phone Number *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.85rem 0.85rem 0.85rem 2.75rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(245, 158, 11, 0.2)',
                      background: 'rgba(30, 41, 59, 0.6)',
                      color: 'white',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Enter your phone number"
                    required={isOrganizer}
                  />
                  <Phone size={16} style={{
                    position: 'absolute',
                    left: '0.85rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(245, 158, 11, 0.6)'
                  }} />
                </div>
              </div>
            )}

            {/* Student: College */}
            {!isOrganizer && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  color: '#e2e8f0',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  display: 'block',
                  fontSize: '0.8rem'
                }}>
                  College/Institution
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.85rem 0.85rem 0.85rem 2.75rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      background: 'rgba(30, 41, 59, 0.6)',
                      color: 'white',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Enter your college name"
                  />
                  <School size={16} style={{
                    position: 'absolute',
                    left: '0.85rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(16, 185, 129, 0.6)'
                  }} />
                </div>
              </div>
            )}

            {/* Password */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                color: '#e2e8f0',
                fontWeight: 600,
                marginBottom: '0.5rem',
                display: 'block',
                fontSize: '0.8rem'
              }}>
                Password *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.85rem 0.85rem 0.85rem 2.75rem',
                    borderRadius: '10px',
                    border: `1px solid rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.2)`,
                    background: 'rgba(30, 41, 59, 0.6)',
                    color: 'white',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Create a password"
                  required
                />
                <Lock size={16} style={{
                  position: 'absolute',
                  left: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: `rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.6)`
                }} />
              </div>
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                color: '#e2e8f0',
                fontWeight: 600,
                marginBottom: '0.5rem',
                display: 'block',
                fontSize: '0.8rem'
              }}>
                Confirm Password *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.85rem 0.85rem 0.85rem 2.75rem',
                    borderRadius: '10px',
                    border: `1px solid rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.2)`,
                    background: 'rgba(30, 41, 59, 0.6)',
                    color: 'white',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Confirm your password"
                  required
                />
                <Lock size={16} style={{
                  position: 'absolute',
                  left: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: `rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.6)`
                }} />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: '10px',
                background: isLoading 
                  ? `rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.4)` 
                  : isOrganizer
                    ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                    : 'linear-gradient(135deg, #10b981, #059669)',
                border: 'none',
                color: 'white',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
                marginBottom: '1.25rem',
                boxShadow: isLoading ? 'none' : `0 6px 20px rgba(${isOrganizer ? '245, 158, 11' : '16, 185, 129'}, 0.35)`,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Creating Account...
                </>
              ) : (
                <>
                  Create {isOrganizer ? 'Organizer' : 'Student'} Account
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <div style={{ textAlign: 'center' }}>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  style={{ 
                    color: themeColor, 
                    textDecoration: 'none',
                    fontWeight: 600
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
      `}</style>
    </div>
  );
};

export default Register;
