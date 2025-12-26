import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight, Mail, Lock } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 0'
    }}>
      <div className="container" style={{ maxWidth: '450px' }}>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '3rem 2rem',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          {/* Header */}
          <div className="text-center mb-5">
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'white'
            }}>
              N
            </div>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: 'white',
              marginBottom: '0.5rem'
            }}>
              Welcome Back
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '1.1rem'
            }}>
              Sign in to your college event account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{
                background: 'rgba(255,0,0,0.1)',
                border: '1px solid rgba(255,0,0,0.3)',
                color: '#ff6b6b',
                padding: '1rem',
                borderRadius: '10px',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label style={{
                color: 'white',
                fontWeight: 600,
                marginBottom: '0.5rem',
                display: 'block'
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
                    padding: '1rem 1rem 1rem 3rem',
                    borderRadius: '50px',
                    border: '2px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  placeholder="Enter your email"
                  required
                />
                <Mail size={20} style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255,255,255,0.7)'
                }} />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label style={{
                color: 'white',
                fontWeight: 600,
                marginBottom: '0.5rem',
                display: 'block'
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
                    padding: '1rem 1rem 1rem 3rem',
                    borderRadius: '50px',
                    border: '2px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  placeholder="Enter your password"
                  required
                />
                <Lock size={20} style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255,255,255,0.7)'
                }} />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '50px',
                background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                border: 'none',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
                marginBottom: '1.5rem'
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
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <div className="text-center">
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1rem' }}>
                Don't have an account?{' '}
                <Link to="/register" style={{
                  color: '#ff6b6b',
                  textDecoration: 'none',
                  fontWeight: 600
                }}>
                  Sign up here
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
        input:focus {
          border-color: #ff6b6b !important;
          box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default Login;