import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield } from 'lucide-react';

const AdminRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    password: '',
    confirmPassword: '',
    role: 'admin' as 'admin',
    college: '',
    department: '',
    secretCode: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { registerAdmin, login, isLoading } = useAuth();
  const navigate = useNavigate();

  // Secret code for admin registration
  const ADMIN_SECRET_CODE = 'ADMIN2024';

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
    if (!formData.name || !formData.email || !formData.studentId || !formData.password || !formData.secretCode) {
      setError('Please fill in all required fields');
      return;
    }

    // Verify secret code
    if (formData.secretCode !== ADMIN_SECRET_CODE) {
      setError('Invalid secret code. Access denied.');
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

    // Prepare admin data
    const adminData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.studentId, // Using studentId as phone
      department: formData.department || 'Administration',
      secretCode: formData.secretCode
    };

    const result = await registerAdmin(adminData);
    
    if (result.success) {
      // Auto-login after successful registration with admin type
      const loginResult = await login(adminData.email, adminData.password, 'admin');
      
      if (loginResult.success) {
        setSuccess('Admin account created! Redirecting to admin panel...');
        setTimeout(() => {
          navigate('/admin-panel');
        }, 1500);
      } else {
        setSuccess('Registration successful! Please login as admin.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container" style={{ maxWidth: '500px' }}>
        <div className="card">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center" style={{ boxShadow: '0 0 30px rgba(99, 102, 241, 0.6)' }}>
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold" style={{ color: '#e2e8f0' }}>Admin Registration</h2>
            <p style={{ color: '#94a3b8' }} className="mt-2">Create an administrator account</p>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ Admin registration requires a secret code
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="message message-error">
                {error}
              </div>
            )}

            {success && (
              <div className="message message-success">
                {success}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Admin Secret Code *</label>
              <input
                type="password"
                name="secretCode"
                value={formData.secretCode}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter admin secret code"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Required for admin registration
              </p>
            </div>

            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">Staff ID *</label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your staff ID"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., Administration"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">College/University</label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter institution name"
              />
            </div>

            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Create password"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
              <h4 className="font-semibold text-blue-900 mb-2">Admin Privileges:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>✓ Access to Admin Panel</li>
                <li>✓ Manage all users and roles</li>
                <li>✓ Grant/revoke organizer access</li>
                <li>✓ Oversee and delete events</li>
                <li>✓ Full system control</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full"
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="loading"></div>
                  Creating Admin Account...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Shield className="w-5 h-5" />
                  Create Admin Account
                </span>
              )}
            </button>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Regular user?{' '}
                <Link to="/register" className="text-primary font-medium">
                  Register here
                </Link>
              </p>
              <p className="text-gray-600 mt-2">
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
