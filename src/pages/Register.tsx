import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight, User, Mail, IdCard, Lock, GraduationCap } from 'lucide-react';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    password: '',
    confirmPassword: '',
    role: 'student' as 'student' | 'organizer',
    college: '',
    department: '',
    year: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register, isLoading } = useAuth();
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
    setSuccess('');

    // Validation
    if (!formData.name || !formData.email || !formData.studentId || !formData.password) {
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

    const { confirmPassword, ...userData } = formData;
    const result = await register(userData);
    
    if (result.success) {
      if (formData.role === 'organizer') {
        setSuccess('Registration successful! Your account is pending admin approval. You will be notified once approved.');
      } else {
        setSuccess(result.message + ' Please login to continue.');
      }
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else {
      setError(result.message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
      padding: '2rem 0'
    }}>
      <div className="container" style={{ maxWidth: '600px' }}>
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
              Create Account
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '1.1rem'
            }}>
              Join our college event community
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

            {success && (
              <div style={{
                background: 'rgba(0,255,0,0.1)',
                border: '1px solid rgba(0,255,0,0.3)',
                color: '#4ade80',
                padding: '1rem',
                borderRadius: '10px',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                {success}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{
                  color: 'white',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  display: 'block'
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
                      padding: '1rem 1rem 1rem 3rem',
                      borderRadius: '50px',
                      border: '2px solid rgba(255,255,255,0.2)',
                      background: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    placeholder="Enter your full name"
                    required
                  />
                  <User size={20} style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(255,255,255,0.7)'
                  }} />
                </div>
              </div>

              <div>
                <label style={{
                  color: 'white',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  display: 'block'
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
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{
                  color: 'white',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  display: 'block'
                }}>
                  Student/Staff ID *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
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
                    placeholder="Enter your ID"
                    required
                  />
                  <IdCard size={20} style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(255,255,255,0.7)'
                  }} />
                </div>
              </div>

              <div>
                <label style={{
                  color: 'white',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  display: 'block'
                }}>
                  Role *
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
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
                    required
                  >
                    <option value="student" style={{ background: '#667eea', color: 'white' }}>Student</option>
                    <option value="organizer" style={{ background: '#667eea', color: 'white' }}>Event Organizer</option>
                  </select>
                  <GraduationCap size={20} style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(255,255,255,0.7)'
                  }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{
                  color: 'white',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  display: 'block'
                }}>
                  College/University
                </label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '50px',
                    border: '2px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  placeholder="Enter college name"
                />
              </div>

              <div>
                <label style={{
                  color: 'white',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  display: 'block'
                }}>
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '50px',
                    border: '2px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  placeholder="e.g., Computer Science"
                />
              </div>
            </div>

            {formData.role === 'student' && (
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  color: 'white',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  display: 'block'
                }}>
                  Year of Study
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '50px',
                    border: '2px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <option value="" style={{ background: '#667eea', color: 'white' }}>Select Year</option>
                  <option value="1st Year" style={{ background: '#667eea', color: 'white' }}>1st Year</option>
                  <option value="2nd Year" style={{ background: '#667eea', color: 'white' }}>2nd Year</option>
                  <option value="3rd Year" style={{ background: '#667eea', color: 'white' }}>3rd Year</option>
                  <option value="4th Year" style={{ background: '#667eea', color: 'white' }}>4th Year</option>
                  <option value="Graduate" style={{ background: '#667eea', color: 'white' }}>Graduate</option>
                  <option value="PhD" style={{ background: '#667eea', color: 'white' }}>PhD</option>
                </select>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <label style={{
                  color: 'white',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  display: 'block'
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
                      padding: '1rem 1rem 1rem 3rem',
                      borderRadius: '50px',
                      border: '2px solid rgba(255,255,255,0.2)',
                      background: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    placeholder="Create password"
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

              <div>
                <label style={{
                  color: 'white',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  display: 'block'
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
                      padding: '1rem 1rem 1rem 3rem',
                      borderRadius: '50px',
                      border: '2px solid rgba(255,255,255,0.2)',
                      background: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    placeholder="Confirm password"
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
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <div className="text-center">
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1rem' }}>
                Already have an account?{' '}
                <Link to="/login" style={{
                  color: '#ff6b6b',
                  textDecoration: 'none',
                  fontWeight: 600
                }}>
                  Sign in here
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
        input:focus, select:focus {
          border-color: #ff6b6b !important;
          box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default Register;