import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEvents } from '../contexts/EventContext';
import { EventCategory } from '../types';
import { Calendar, Clock, MapPin, Users, Tag, DollarSign, Image, Plus, X, Briefcase, FileText, Phone, Mail, Award } from 'lucide-react';

const CreateEvent: React.FC = () => {
  const { user } = useAuth();
  const { createEvent, isLoading } = useEvents();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    date: '',
    time: '',
    endDate: '',
    endTime: '',
    location: '',
    venue: '',
    capacity: '',
    category: '' as EventCategory | '',
    tags: [] as string[],
    image: '',
    images: [] as string[],
    price: '',
    isPaid: false,
    registrationDeadline: '',
    requirements: [] as string[],
    prizes: [] as string[],
    contactEmail: '',
    contactPhone: '',
    upiId: '',
    paymentPhone: '',
    qrCode: '',
    bankDetails: ''
  });

  const [currentTag, setCurrentTag] = useState('');
  const [currentRequirement, setCurrentRequirement] = useState('');
  const [currentPrize, setCurrentPrize] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!user || user.role !== 'organizer') {
    return <Navigate to="/dashboard" replace />;
  }

  const categories: EventCategory[] = [
    'Technology', 'Cultural', 'Sports', 'Academic', 'Career', 
    'Workshop', 'Competition', 'Seminar', 'Conference', 'Hackathon', 'Other'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, currentTag.trim()] }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  const addRequirement = () => {
    if (currentRequirement.trim() && !formData.requirements.includes(currentRequirement.trim())) {
      setFormData(prev => ({ ...prev, requirements: [...prev.requirements, currentRequirement.trim()] }));
      setCurrentRequirement('');
    }
  };

  const removeRequirement = (reqToRemove: string) => {
    setFormData(prev => ({ ...prev, requirements: prev.requirements.filter(req => req !== reqToRemove) }));
  };

  const addPrize = () => {
    if (currentPrize.trim() && !formData.prizes.includes(currentPrize.trim())) {
      setFormData(prev => ({ ...prev, prizes: [...prev.prizes, currentPrize.trim()] }));
      setCurrentPrize('');
    }
  };

  const removePrize = (prizeToRemove: string) => {
    setFormData(prev => ({ ...prev, prizes: prev.prizes.filter(prize => prize !== prizeToRemove) }));
  };

  const removeImage = (imageToRemove: string) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter(img => img !== imageToRemove) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.title || !formData.description || !formData.date || !formData.time || 
        !formData.location || !formData.venue || !formData.capacity || !formData.category) {
      setError('Please fill in all required fields');
      return;
    }

    if (parseInt(formData.capacity) < 1) {
      setError('Capacity must be at least 1');
      return;
    }

    if (formData.isPaid && (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0)) {
      setError('Price must be a number greater than 0 for paid events');
      return;
    }

    const eventData = {
      title: formData.title,
      description: formData.description,
      shortDescription: formData.shortDescription || formData.description.substring(0, 150) + '...',
      date: formData.date,
      time: formData.time,
      endDate: formData.endDate || formData.date,
      endTime: formData.endTime,
      location: formData.location,
      venue: formData.venue,
      capacity: parseInt(formData.capacity),
      organizer: user.name,
      organizerId: user.id,
      category: formData.category as EventCategory,
      tags: formData.tags,
      image: formData.image || formData.images[0] || 'https://via.placeholder.com/800x400?text=Event',
      images: formData.images,
      price: formData.isPaid ? parseFloat(formData.price) : 0,
      isPaid: formData.isPaid,
      registrationDeadline: formData.registrationDeadline || formData.date,
      status: 'upcoming' as const,
      requirements: formData.requirements,
      prizes: formData.prizes,
      contactInfo: { email: formData.contactEmail || user.email, phone: formData.contactPhone },
      paymentInfo: formData.isPaid ? {
        upiId: formData.upiId,
        phoneNumber: formData.paymentPhone,
        qrCode: formData.qrCode,
        bankDetails: formData.bankDetails
      } : undefined,
      socialLinks: {}
    };

    const result = await createEvent(eventData);
    if (result.success) {
      setSuccess(result.message);
      setTimeout(() => navigate('/my-events'), 2000);
    } else {
      setError(result.message);
    }
  };

  // Styles
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.85rem 1rem',
    borderRadius: '10px',
    border: '1px solid rgba(245, 158, 11, 0.3)',
    background: 'rgba(30, 41, 59, 0.6)',
    color: 'white',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box' as const
  };

  const labelStyle: React.CSSProperties = {
    color: '#e2e8f0',
    fontWeight: 600,
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.85rem'
  };

  const sectionStyle: React.CSSProperties = {
    background: 'rgba(15, 23, 42, 0.6)',
    borderRadius: '16px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    border: '1px solid rgba(245, 158, 11, 0.15)'
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#f59e0b',
    marginBottom: '1.25rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      padding: '1.5rem 1rem',
      paddingTop: '90px',
      position: 'relative'
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(circle at 20% 30%, rgba(245, 158, 11, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(217, 119, 6, 0.06) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '70px', height: '70px', borderRadius: '16px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1rem',
            boxShadow: '0 8px 25px rgba(245, 158, 11, 0.35)'
          }}>
            <Plus size={32} color="white" strokeWidth={2.5} />
          </div>
          <h1 style={{
            fontSize: '2rem', fontWeight: 800,
            background: 'linear-gradient(135deg, #ffffff 0%, #f59e0b 50%, #d97706 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>Create New Event</h1>
          <p style={{ color: 'rgba(245, 158, 11, 0.8)', fontSize: '0.95rem' }}>
            Fill in the details to create your event
          </p>
        </div>

        {/* Main Form Card */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid rgba(245, 158, 11, 0.2)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
        }}>
          <form onSubmit={handleSubmit}>
            {/* Error/Success Messages */}
            {error && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#fca5a5',
                padding: '1rem',
                borderRadius: '10px',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>{error}</div>
            )}
            {success && (
              <div style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: '#6ee7b7',
                padding: '1rem',
                borderRadius: '10px',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>{success}</div>
            )}

            {/* Basic Information */}
            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}><FileText size={20} /> Basic Information</h3>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Event Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="Enter event title"
                  required
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Short Description</label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="Brief description for event cards"
                  maxLength={150}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Full Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
                  placeholder="Detailed description of your event"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    required
                  >
                    <option value="" style={{ background: '#1e293b' }}>Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat} style={{ background: '#1e293b' }}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}><Users size={16} /> Capacity *</label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    min="1"
                    style={inputStyle}
                    placeholder="Max attendees"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}><Calendar size={20} /> Date & Time</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Start Date *</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}><Clock size={16} /> Start Time *</label>
                  <input type="time" name="time" value={formData.time} onChange={handleChange} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>End Date</label>
                  <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>End Time</label>
                  <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} style={inputStyle} />
                </div>
              </div>
              <div style={{ marginTop: '1rem' }}>
                <label style={labelStyle}>Registration Deadline</label>
                <input type="date" name="registrationDeadline" value={formData.registrationDeadline} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            {/* Location */}
            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}><MapPin size={20} /> Location</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Location *</label>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} style={inputStyle} placeholder="e.g., Main Campus" required />
                </div>
                <div>
                  <label style={labelStyle}>Venue *</label>
                  <input type="text" name="venue" value={formData.venue} onChange={handleChange} style={inputStyle} placeholder="e.g., Auditorium Hall A" required />
                </div>
              </div>
            </div>

            {/* Event Image */}
            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}><Image size={20} /> Event Poster</h3>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Main Event Poster</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setFormData(prev => ({ ...prev, image: reader.result as string }));
                      reader.readAsDataURL(file);
                    }
                  }}
                  style={{ ...inputStyle, padding: '0.5rem' }}
                />
                {formData.image && (
                  <div style={{ marginTop: '1rem' }}>
                    <img src={formData.image} alt="Preview" style={{ width: '100%', maxWidth: '300px', height: '150px', objectFit: 'cover', borderRadius: '10px', border: '2px solid rgba(245, 158, 11, 0.3)' }} />
                    <button type="button" onClick={() => setFormData(prev => ({ ...prev, image: '' }))} style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '8px', color: '#fca5a5', cursor: 'pointer', fontSize: '0.8rem' }}>
                      Remove Image
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Pricing */}
            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}><DollarSign size={20} /> Pricing</h3>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', marginBottom: '1rem' }}>
                <input type="checkbox" name="isPaid" checked={formData.isPaid} onChange={handleChange} style={{ width: '18px', height: '18px', accentColor: '#f59e0b' }} />
                <span style={{ color: '#e2e8f0', fontWeight: 600 }}>This is a paid event</span>
              </label>
              {formData.isPaid && (
                <div style={{ background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', padding: '1.25rem', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Price (₹) *</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} min="0" step="0.01" style={inputStyle} placeholder="0.00" required={formData.isPaid} />
                  </div>
                  <p style={{ color: 'rgba(245, 158, 11, 0.8)', fontSize: '0.85rem', marginBottom: '1rem' }}>Payment Methods</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={labelStyle}>UPI ID</label>
                      <input type="text" name="upiId" value={formData.upiId} onChange={handleChange} style={inputStyle} placeholder="yourname@upi" />
                    </div>
                    <div>
                      <label style={labelStyle}>Payment Phone</label>
                      <input type="tel" name="paymentPhone" value={formData.paymentPhone} onChange={handleChange} style={inputStyle} placeholder="+91 9876543210" />
                    </div>
                  </div>
                  <div style={{ marginTop: '1rem' }}>
                    <label style={labelStyle}>Bank Details (Optional)</label>
                    <textarea name="bankDetails" value={formData.bankDetails} onChange={handleChange} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} placeholder="Bank Name, Account Number, IFSC Code" />
                  </div>
                </div>
              )}
            </div>

            {/* Tags */}
            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}><Tag size={20} /> Tags</h3>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                <input type="text" value={currentTag} onChange={(e) => setCurrentTag(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} style={{ ...inputStyle, flex: 1 }} placeholder="Add tags (e.g., AI, Web Dev)" />
                <button type="button" onClick={addTag} style={{ padding: '0.85rem 1.5rem', background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>Add</button>
              </div>
              {formData.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {formData.tags.map((tag, i) => (
                    <span key={i} style={{ padding: '0.4rem 0.8rem', background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '20px', color: 'white', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 0, fontSize: '1rem' }}>×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Requirements */}
            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}><Briefcase size={20} /> Requirements</h3>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                <input type="text" value={currentRequirement} onChange={(e) => setCurrentRequirement(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())} style={{ ...inputStyle, flex: 1 }} placeholder="Add requirement (e.g., Laptop required)" />
                <button type="button" onClick={addRequirement} style={{ padding: '0.85rem 1.5rem', background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>Add</button>
              </div>
              {formData.requirements.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {formData.requirements.map((req, i) => (
                    <div key={i} style={{ padding: '0.6rem 1rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#e2e8f0', fontSize: '0.85rem' }}>{req}</span>
                      <button type="button" onClick={() => removeRequirement(req)} style={{ background: 'none', border: 'none', color: '#fca5a5', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Prizes */}
            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}><Award size={20} /> Prizes (Optional)</h3>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                <input type="text" value={currentPrize} onChange={(e) => setCurrentPrize(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPrize())} style={{ ...inputStyle, flex: 1 }} placeholder="Add prize (e.g., 1st Place: ₹5000)" />
                <button type="button" onClick={addPrize} style={{ padding: '0.85rem 1.5rem', background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>Add</button>
              </div>
              {formData.prizes.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {formData.prizes.map((prize, i) => (
                    <div key={i} style={{ padding: '0.6rem 1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#6ee7b7', fontSize: '0.85rem' }}>{prize}</span>
                      <button type="button" onClick={() => removePrize(prize)} style={{ background: 'none', border: 'none', color: '#fca5a5', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}><Mail size={20} /> Contact Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}><Mail size={16} /> Contact Email</label>
                  <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} style={inputStyle} placeholder={user.email} />
                </div>
                <div>
                  <label style={labelStyle}><Phone size={16} /> Contact Phone</label>
                  <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} style={inputStyle} placeholder="+91 9876543210" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '12px',
                background: isLoading ? 'rgba(245, 158, 11, 0.4)' : 'linear-gradient(135deg, #f59e0b, #d97706)',
                border: 'none',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
                boxShadow: isLoading ? 'none' : '0 6px 20px rgba(245, 158, 11, 0.35)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              {isLoading ? (
                <>
                  <div style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                  Creating Event...
                </>
              ) : (
                <>
                  <Plus size={20} />
                  Create Event
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        input:focus, textarea:focus, select:focus {
          border-color: rgba(245, 158, 11, 0.5) !important;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1) !important;
        }
        @media (max-width: 640px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CreateEvent;
