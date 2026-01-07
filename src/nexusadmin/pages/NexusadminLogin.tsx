import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import PortalLink from '../../components/PortalLink';

const NexusadminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = await login(email, password, 'admin');
    if (result.success) {
      // Check for post-login redirect from route recovery
      const postLoginRedirect = sessionStorage.getItem('nexus_post_login_redirect');
      if (postLoginRedirect) {
        sessionStorage.removeItem('nexus_post_login_redirect');
        navigate(postLoginRedirect);
      } else {
        navigate(result.redirectTo || '/nexusadmin/dashboard');
      }
    } else {
      setError(result.message);
    }
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
        maxWidth: '420px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Main Card */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(25px) saturate(180%)',
          borderRadius: '24px',
          padding: '3rem 2.5rem',
          border: '2px solid rgba(16, 185, 129, 0.2)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 60px rgba(16, 185, 129, 0.1)',
          WebkitBackdropFilter: 'blur(25px) saturate(180%)'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4), 0 0 60px rgba(16, 185, 129, 0.2)',
              position: 'relative'
            }}>
              <Shield size={36} color="#ffffff" strokeWidth={2.5} />
              <div style={{
                position: 'absolute',
                inset: '-4px',
                background: 'linear-gradient(135deg, #10b981, #14b8a6, #06b6d4)',
                borderRadius: '20px',
                zIndex: -1,
                opacity: 0.3,
                filter: 'blur(8px)'
              }} />
            </div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #ffffff 0%, #10b981 50%, #14b8a6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.5rem',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              NEXUS ADMIN
            </h1>
            <p style={{
              color: 'rgba(16, 185, 129, 0.9)',
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Administrative Portal
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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

            <div>
              <label style={{
                display: 'block',
                color: '#f1f5f9',
                fontSize: '0.9rem',
                fontWeight: 600,
                marginBottom: '0.75rem',
                letterSpacing: '0.3px'
              }}>
                Admin Email
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    paddingLeft: '3.5rem',
                    paddingRight: '1rem',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                    background: 'rgba(30, 41, 59, 0.8)',
                    border: '2px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    color: '#ffffff',
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                  placeholder="Enter your admin email"
                  required
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(16, 185, 129, 0.6)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1), 0 8px 25px rgba(16, 185, 129, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(16, 185, 129, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <Mail style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(16, 185, 129, 0.7)'
                }} size={20} />
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                color: '#f1f5f9',
                fontSize: '0.9rem',
                fontWeight: 600,
                marginBottom: '0.75rem',
                letterSpacing: '0.3px'
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    paddingLeft: '3.5rem',
                    paddingRight: '3.5rem',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                    background: 'rgba(30, 41, 59, 0.8)',
                    border: '2px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    color: '#ffffff',
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                  placeholder="Enter your password"
                  required
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(16, 185, 129, 0.6)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1), 0 8px 25px rgba(16, 185, 129, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(16, 185, 129, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <Lock style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(16, 185, 129, 0.7)'
                }} size={20} />
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
                    borderRadius: '4px',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'rgba(16, 185, 129, 1)'}
                  onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'rgba(16, 185, 129, 0.7)'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
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
                fontSize: '1rem',
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
                  Signing In...
                </>
              ) : (
                <>
                  Access Admin Portal
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
              Need an admin account?
            </p>
            <PortalLink
              to="/register"
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
              Register as Admin
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

export default NexusadminLogin;