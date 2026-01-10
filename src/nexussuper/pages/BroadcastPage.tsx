import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, ArrowLeft, CheckCircle, Users, Building2, Bell, AlertTriangle, Info, Megaphone } from 'lucide-react';
import { LocalStorageService } from '../../services/localStorageService';

const BroadcastPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'info',
    priority: 'normal',
    category: 'announcement',
    targetAudience: 'all'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const storageService = new LocalStorageService();
      await storageService.createNotification(formData);
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/nexussuper/notifications');
      }, 2000);
    } catch (error) {
      console.error('Error sending broadcast:', error);
      alert('Failed to send broadcast. Please try again.');
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
          <h2 style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Broadcast Sent Successfully!</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>Redirecting to notifications...</p>
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
            <Megaphone size={32} color="#10b981" />
            Broadcast Message
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem' }}>
            Send announcements to all users across the platform
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
                <Bell size={16} />
                Notification Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter notification title"
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>
                <Send size={16} />
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Enter your broadcast message..."
                required
                rows={5}
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                  minHeight: '120px'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>
                  <Info size={16} />
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  <option value="info" style={{ background: '#1e293b' }}>ℹ️ Information</option>
                  <option value="success" style={{ background: '#1e293b' }}>✅ Success</option>
                  <option value="warning" style={{ background: '#1e293b' }}>⚠️ Warning</option>
                  <option value="error" style={{ background: '#1e293b' }}>❌ Error/Alert</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>
                  <AlertTriangle size={16} />
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  <option value="low" style={{ background: '#1e293b' }}>Low</option>
                  <option value="normal" style={{ background: '#1e293b' }}>Normal</option>
                  <option value="high" style={{ background: '#1e293b' }}>High</option>
                  <option value="urgent" style={{ background: '#1e293b' }}>Urgent</option>
                </select>
              </div>
            </div>

            <div>
              <label style={labelStyle}>
                <Users size={16} />
                Target Audience
              </label>
              <select
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="all" style={{ background: '#1e293b' }}>🌐 All Users</option>
                <option value="students" style={{ background: '#1e293b' }}>🎓 Students Only</option>
                <option value="organizers" style={{ background: '#1e293b' }}>📋 Organizers Only</option>
                <option value="admins" style={{ background: '#1e293b' }}>👔 Admins Only</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>
                <Building2 size={16} />
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="announcement" style={{ background: '#1e293b' }}>📢 Announcement</option>
                <option value="event" style={{ background: '#1e293b' }}>🎉 Event Update</option>
                <option value="system" style={{ background: '#1e293b' }}>⚙️ System Notice</option>
                <option value="maintenance" style={{ background: '#1e293b' }}>🔧 Maintenance</option>
              </select>
            </div>
          </div>

          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'rgba(245, 158, 11, 0.1)',
            borderRadius: '10px',
            border: '1px solid rgba(245, 158, 11, 0.3)'
          }}>
            <p style={{ color: '#fbbf24', fontSize: '0.85rem', margin: 0 }}>
              <strong>⚠️ Note:</strong> This message will be sent to all selected users immediately.
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
            <Send size={20} />
            {isSubmitting ? 'Sending Broadcast...' : 'Send Broadcast'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BroadcastPage;
