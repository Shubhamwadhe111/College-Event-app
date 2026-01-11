import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock, GraduationCap, Briefcase, Zap } from 'lucide-react';
import * as authService from '../services/authService';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'student' | 'organizer'>('student');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      let result;
      
      if (userType === 'organizer') {
        console.log('[Login] Logging in organizer via authService...');
        result = await authService.loginOrganizer({ email, password });
      } else {
        console.log('[Login] Logging in student via authService...');
        result = await authService.loginStudent({ email, password });
      }

      if (result.success) {
        // Store user data in localStorage for the app to use
        if (result.user) {
          localStorage.setItem('nexus_user', JSON.stringify({
            ...result.user,
            role: userType
          }));
        }
        
        // Navigate to appropriate page
        if (result.redirectTo) {
          navigate(result.redirectTo);
        } else {
          navigate(userType === 'organizer' ? '/create-event' : '/events');
        }
      } else {
        setError(result.message || 'Invalid credentials');
      }
    } catch (error: any) {
      console.error('[Login] Error:', error);
      setError(error.message || 'Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
        background: 'radial-gradient(circle at 20% 30%, rgba(16, 185, 129, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(20, 184, 166, 0.08) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '380px', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{
          background: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '2rem 1.5rem',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 60px rgba(16, 185, 129, 0.08)'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              boxShadow: '0 8px 25px rgba(16, 185, 129, 0.35)'
            }}>
              <Zap size={28} color="white" strokeWidth={2.5} />
            </div>
            <h2 style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #ffffff 0%, #10b981 50%, #14b8a6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.3rem'
            }}>
              Welcome Back
            </h2>
            <p style={{
              color: 'rgba(16, 185, 129, 0.8)',
              fontSize: '0.85rem',
              fontWeight: 500
            }}>
              Sign in to Nexus Events
            </p>
          </div>

          {/* User Type Selection - Cards */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <button
              type="button"
              onClick={() => setUserType('student')}
              style={{
                flex: 1,
                padding: '1rem 0.75rem',
                borderRadius: '12px',
                border: userType === 'student' 
                  ? '2px solid #10b981' 
                  : '2px solid rgba(255, 255, 255, 0.1)',
                background: userType === 'student' 
                  ? 'rgba(16, 185, 129, 0.15)' 
                  : 'rgba(30, 41, 59, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: userType === 'student' 
                  ? 'linear-gradient(135deg, #10b981, #14b8a6)' 
                  : 'rgba(100, 116, 139, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <GraduationCap size={20} color={userType === 'student' ? 'white' : '#94a3b8'} />
              </div>
              <span style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                color: userType === 'student' ? '#10b981' : '#94a3b8'
              }}>
                Student
              </span>
            </button>

            <button
              type="button"
              onClick={() => setUserType('organizer')}
              style={{
                flex: 1,
                padding: '1rem 0.75rem',
                borderRadius: '12px',
                border: userType === 'organizer' 
                  ? '2px solid #f59e0b' 
                  : '2px solid rgba(255, 255, 255, 0.1)',
                background: userType === 'organizer' 
                  ? 'rgba(245, 158, 11, 0.15)' 
                  : 'rgba(30, 41, 59, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: userType === 'organizer' 
                  ? 'linear-gradient(135deg, #f59e0b, #d97706)' 
                  : 'rgba(100, 116, 139, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Briefcase size={20} color={userType === 'organizer' ? 'white' : '#94a3b8'} />
              </div>
              <span style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                color: userType === 'organizer' ? '#f59e0b' : '#94a3b8'
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

            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                color: '#e2e8f0',
                fontWeight: 600,
                marginBottom: '0.5rem',
                display: 'block',
                fontSize: '0.8rem'
              }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Enter your email"
                  required
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(16, 185, 129, 0.5)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(16, 185, 129, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <Mail size={16} style={{
                  position: 'absolute',
                  left: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(16, 185, 129, 0.6)'
                }} />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                color: '#e2e8f0',
                fontWeight: 600,
                marginBottom: '0.5rem',
                display: 'block',
                fontSize: '0.8rem'
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  placeholder="Enter your password"
                  required
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(16, 185, 129, 0.5)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(16, 185, 129, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <Lock size={16} style={{
                  position: 'absolute',
                  left: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(16, 185, 129, 0.6)'
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
                  ? 'rgba(16, 185, 129, 0.4)' 
                  : userType === 'student'
                    ? 'linear-gradient(135deg, #10b981, #059669)'
                    : 'linear-gradient(135deg, #f59e0b, #d97706)',
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
                boxShadow: isLoading ? 'none' : userType === 'student' 
                  ? '0 6px 20px rgba(16, 185, 129, 0.35)' 
                  : '0 6px 20px rgba(245, 158, 11, 0.35)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                }
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
                  Signing in...
                </>
              ) : (
                <>
                  Sign In as {userType === 'student' ? 'Student' : 'Organizer'}
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <div style={{ textAlign: 'center' }}>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  style={{ 
                    color: '#10b981', 
                    textDecoration: 'none',
                    fontWeight: 600
                  }}
                >
                  Sign Up
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

export default Login;
