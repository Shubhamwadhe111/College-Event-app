import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEvents } from '../contexts/EventContext';
import { EventCategory } from '../types';

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
  const [currentImage, setCurrentImage] = useState('');
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
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addRequirement = () => {
    if (currentRequirement.trim() && !formData.requirements.includes(currentRequirement.trim())) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, currentRequirement.trim()]
      }));
      setCurrentRequirement('');
    }
  };

  const removeRequirement = (reqToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter(req => req !== reqToRemove)
    }));
  };

  const addPrize = () => {
    if (currentPrize.trim() && !formData.prizes.includes(currentPrize.trim())) {
      setFormData(prev => ({
        ...prev,
        prizes: [...prev.prizes, currentPrize.trim()]
      }));
      setCurrentPrize('');
    }
  };

  const removePrize = (prizeToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      prizes: prev.prizes.filter(prize => prize !== prizeToRemove)
    }));
  };

  const addImage = () => {
    if (currentImage.trim() && !formData.images.includes(currentImage.trim())) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, currentImage.trim()]
      }));
      setCurrentImage('');
    }
  };

  const removeImage = (imageToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img !== imageToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.title || !formData.description || !formData.date || !formData.time || 
        !formData.location || !formData.venue || !formData.capacity || !formData.category) {
      setError('Please fill in all required fields');
      return;
    }

    if (parseInt(formData.capacity) < 1) {
      setError('Capacity must be at least 1');
      return;
    }

    if (formData.isPaid && (!formData.price || parseFloat(formData.price) < 0)) {
      setError('Please enter a valid price for paid events');
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
      contactInfo: {
        email: formData.contactEmail || user.email,
        phone: formData.contactPhone
      },
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
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } else {
      setError(result.message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 0'
    }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '3rem',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem',
            animation: 'fadeIn 1s ease-out'
          }}>
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
              +
            </div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: 'white',
              marginBottom: '0.5rem'
            }}>
              Create New Event
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '1.1rem'
            }}>
              Fill in the details below to create an amazing college event
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

            {/* Basic Information */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 className="text-xl font-bold text-white mb-6">Basic Information</h3>
              
              <div className="mb-6">
                <label className="block text-white font-medium mb-2">Event Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter event title"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-white font-medium mb-2">Short Description</label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                  placeholder="Brief description for event cards"
                  maxLength={150}
                />
              </div>

              <div className="mb-6">
                <label className="block text-white font-medium mb-2">Full Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm resize-vertical min-h-[120px]"
                  placeholder="Detailed description of your event"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="mb-6">
                  <label className="block text-white font-medium mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                    required
                  >
                    <option value="" className="bg-gray-800">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category} className="bg-gray-800">{category}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-white font-medium mb-2">Capacity *</label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="Maximum attendees"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-6">Date & Time</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="mb-6">
                  <label className="block text-white font-medium mb-2">Start Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-white font-medium mb-2">Start Time *</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-white font-medium mb-2">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-white font-medium mb-2">End Time</label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-6">Location</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="mb-6">
                  <label className="block text-white font-medium mb-2">Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="e.g., Main Campus"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-white font-medium mb-2">Venue *</label>
                  <input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="e.g., Auditorium Hall A"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Event Images */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-6">Event Poster & Images</h3>
              
              <div className="mb-6">
                <label className="block text-white font-medium mb-2">Main Event Poster/Image *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData(prev => ({ ...prev, image: reader.result as string }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-l-xl file:border-0 file:text-sm file:font-medium file:bg-pink-500 file:text-white hover:file:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                />
                <p className="text-sm text-white/70 mt-2">Upload the main poster/image for your event (JPG, PNG, GIF)</p>
                {formData.image && (
                  <div className="mt-4">
                    <img src={formData.image} alt="Event poster preview" className="w-full max-w-md h-48 object-cover rounded-xl border-2 border-pink-400" />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                      className="mt-3 px-4 py-2 bg-red-500/20 text-red-300 rounded-xl font-medium hover:bg-red-500/30 transition-all duration-300 border border-red-400/30"
                    >
                      Remove Image
                    </button>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-white font-medium mb-2">Additional Images (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    files.forEach(file => {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData(prev => ({
                          ...prev,
                          images: [...prev.images, reader.result as string]
                        }));
                      };
                      reader.readAsDataURL(file);
                    });
                    e.target.value = ''; // Reset input
                  }}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-l-xl file:border-0 file:text-sm file:font-medium file:bg-pink-500 file:text-white hover:file:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                />
                <p className="text-sm text-white/70 mt-2">Upload multiple images for your event gallery</p>
                {formData.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative group">
                        <img src={img} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded-xl border-2 border-white/30" />
                        <button
                          type="button"
                          onClick={() => removeImage(img)}
                          className="absolute top-2 right-2 bg-red-500/20 text-red-300 px-3 py-1 rounded-xl text-sm font-medium hover:bg-red-500/30 transition-all duration-300 border border-red-400/30"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Pricing */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-6">Pricing</h3>
              
              <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isPaid"
                    checked={formData.isPaid}
                    onChange={handleChange}
                    className="w-5 h-5 text-pink-500 bg-white/10 border-white/20 rounded focus:ring-pink-400 focus:ring-2"
                  />
                  <span className="text-white font-medium">This is a paid event</span>
                </label>
              </div>

              {formData.isPaid && (
                <>
                  <div className="mb-6">
                    <label className="block text-white font-medium mb-2">Price (₹) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                      placeholder="0.00"
                      required={formData.isPaid}
                    />
                  </div>

                  <div className="p-6 backdrop-blur-sm bg-blue-500/10 border border-blue-400/30 rounded-xl mb-6">
                    <h4 className="font-semibold text-white mb-4">Payment Methods</h4>
                    <p className="text-sm text-white/80 mb-6">Add at least one payment method for participants</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="mb-6">
                        <label className="block text-white font-medium mb-2">UPI ID</label>
                        <input
                          type="text"
                          name="upiId"
                          value={formData.upiId}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                          placeholder="yourname@upi"
                        />
                      </div>

                      <div className="mb-6">
                        <label className="block text-white font-medium mb-2">Payment Phone Number</label>
                        <input
                          type="tel"
                          name="paymentPhone"
                          value={formData.paymentPhone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                          placeholder="+91 9876543210"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-white font-medium mb-2">QR Code Image URL</label>
                      <input
                        type="url"
                        name="qrCode"
                        value={formData.qrCode}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                        placeholder="https://example.com/qr-code.jpg"
                      />
                      {formData.qrCode && (
                        <div className="mt-4">
                          <img src={formData.qrCode} alt="QR Code Preview" className="w-32 h-32 object-contain border border-white/30 rounded-xl" />
                        </div>
                      )}
                    </div>

                    <div className="mb-6">
                      <label className="block text-white font-medium mb-2">Bank Details (Optional)</label>
                      <textarea
                        name="bankDetails"
                        value={formData.bankDetails}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm resize-vertical min-h-[100px]"
                        placeholder="Bank Name, Account Number, IFSC Code, etc."
                        rows={3}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Additional Details */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-6">Additional Details</h3>
              
              <div className="mb-6">
                <label className="block text-white font-medium mb-2">Tags</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="Add tags (e.g., AI, ML, Web Dev)"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Add
                  </button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-sm flex items-center gap-2 shadow-lg"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-red-200 ml-1 text-lg leading-none"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-white font-medium mb-2">Requirements</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={currentRequirement}
                    onChange={(e) => setCurrentRequirement(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="Add requirement (e.g., Laptop required)"
                  />
                  <button
                    type="button"
                    onClick={addRequirement}
                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Add
                  </button>
                </div>
                {formData.requirements.length > 0 && (
                  <ul className="mt-4 space-y-3">
                    {formData.requirements.map((req, index) => (
                      <li key={index} className="flex items-center justify-between p-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl">
                        <span className="text-white/90 text-sm">• {req}</span>
                        <button
                          type="button"
                          onClick={() => removeRequirement(req)}
                          className="px-3 py-1 bg-red-500/20 text-red-300 rounded-xl text-sm font-medium hover:bg-red-500/30 transition-all duration-300 border border-red-400/30"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-white font-medium mb-2">Prizes</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={currentPrize}
                    onChange={(e) => setCurrentPrize(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPrize())}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="Add prize (e.g., 1st Prize: ₹10,000)"
                  />
                  <button
                    type="button"
                    onClick={addPrize}
                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Add
                  </button>
                </div>
                {formData.prizes.length > 0 && (
                  <ul className="mt-4 space-y-3">
                    {formData.prizes.map((prize, index) => (
                      <li key={index} className="flex items-center justify-between p-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl">
                        <span className="text-white/90 text-sm">🏆 {prize}</span>
                        <button
                          type="button"
                          onClick={() => removePrize(prize)}
                          className="px-3 py-1 bg-red-500/20 text-red-300 rounded-xl text-sm font-medium hover:bg-red-500/30 transition-all duration-300 border border-red-400/30"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="mb-6">
                  <label className="block text-white font-medium mb-2">Contact Email</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                    placeholder={user.email}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-white font-medium mb-2">Contact Phone</label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-white font-medium mb-2">Registration Deadline</label>
                <input
                  type="date"
                  name="registrationDeadline"
                  value={formData.registrationDeadline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-white/20 text-white rounded-xl font-medium hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <span className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating Event...
                  </span>
                ) : (
                  'Create Event'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;