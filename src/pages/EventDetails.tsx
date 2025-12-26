import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useEvents } from '../contexts/EventContext';
import { useAuth } from '../contexts/AuthContext';

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getEventById, registerForEvent, unregisterFromEvent, getUserRegistrations } = useEvents();
  const { user } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!id) {
    return <Navigate to="/events" replace />;
  }

  const event = getEventById(id);
  if (!event) {
    return <Navigate to="/events" replace />;
  }

  const userRegistrations = user ? getUserRegistrations(user.id) : [];
  const isRegistered = userRegistrations.some(reg => reg.eventId === event.id);
  const isEventFull = event.registered >= event.capacity;
  const registrationProgress = (event.registered / event.capacity) * 100;

  const handleRegistration = async () => {
    if (!user) {
      setMessage({ type: 'error', text: 'Please login to register for events' });
      return;
    }

    setIsRegistering(true);
    setMessage(null);

    try {
      let result;
      if (isRegistered) {
        result = await unregisterFromEvent(event.id, user.id);
      } else {
        result = await registerForEvent(event.id, user.id);
      }

      setMessage({
        type: result.success ? 'success' : 'error',
        text: result.message
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'An error occurred. Please try again.'
      });
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="py-8">
      <div className="container">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/events" className="btn btn-secondary">
            ← Back to Events
          </Link>
        </div>

        <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          {/* Main Content */}
          <div>
            {/* Event Image Gallery */}
            <div className="mb-8">
              <img
                src={(event.images && event.images[selectedImage]) || event.image || 'https://via.placeholder.com/800x400?text=Event'}
                alt={event.title}
                style={{ 
                  width: '100%', 
                  height: '400px', 
                  objectFit: 'cover',
                  borderRadius: '12px',
                  marginBottom: '1rem'
                }}
              />
              
              {/* Image Thumbnails */}
              {event.images && event.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {event.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${event.title} ${index + 1}`}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 object-cover rounded cursor-pointer transition-all ${
                        selectedImage === index ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Message */}
            {message && (
              <div className={`message ${message.type === 'success' ? 'message-success' : 'message-error'}`}>
                {message.text}
              </div>
            )}

            {/* Event Info */}
            <div className="card">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-sm font-medium text-white px-3 py-1 rounded-full bg-primary mb-4 inline-block">
                    {event.category}
                  </span>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {event.title}
                  </h1>
                </div>
                {event.isPaid && (
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">₹{event.price}</div>
                    <div className="text-sm text-gray-500">Registration fee</div>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">About This Event</h3>
                <p className="text-gray-600 leading-relaxed">{event.description}</p>
              </div>

              {/* Event Details */}
              <div className="grid grid-2 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">📅 Date & Time</h4>
                  <p className="text-gray-600">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-gray-600">
                    {event.time} - {event.endTime || 'TBD'}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">📍 Location</h4>
                  <p className="text-gray-600">{event.venue}</p>
                  <p className="text-gray-600">{event.location}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">👥 Capacity</h4>
                  <p className="text-gray-600">
                    {event.registered}/{event.capacity} registered
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">🏢 Organizer</h4>
                  <p className="text-gray-600">{event.organizer}</p>
                </div>
              </div>

              {/* Requirements */}
              {event.requirements && event.requirements.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {event.requirements.map((requirement, index) => (
                      <li key={index}>{requirement}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Prizes */}
              {event.prizes && event.prizes.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">🏆 Prizes & Rewards</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {event.prizes.map((prize, index) => (
                      <li key={index}>{prize}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Registration Card */}
            <div className="card mb-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {event.isPaid ? `₹${event.price}` : 'Free'}
                </div>
                {event.isPaid && (
                  <p className="text-sm text-gray-500">Registration fee</p>
                )}
              </div>

              {/* Registration Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Registrations</span>
                  <span>{event.registered}/{event.capacity}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      registrationProgress >= 90 ? 'bg-red-500' :
                      registrationProgress >= 70 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(registrationProgress, 100)}%` }}
                  ></div>
                </div>
                {registrationProgress >= 90 && (
                  <p className="text-sm text-red-600 mt-2">
                    ⚠️ Almost full! Register soon.
                  </p>
                )}
              </div>

              {/* Registration Button */}
              {user ? (
                <button
                  onClick={handleRegistration}
                  disabled={isRegistering || (!isRegistered && isEventFull)}
                  className={`btn w-full ${
                    isRegistered
                      ? 'btn-secondary'
                      : isEventFull
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'btn-primary'
                  }`}
                >
                  {isRegistering ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="loading"></div>
                      Processing...
                    </span>
                  ) : isRegistered ? (
                    'Unregister'
                  ) : isEventFull ? (
                    'Event Full'
                  ) : (
                    'Register Now'
                  )}
                </button>
              ) : (
                <Link to="/login" className="btn btn-primary w-full">
                  Login to Register
                </Link>
              )}

              {event.registrationDeadline && (
                <p className="text-xs text-gray-500 text-center mt-3">
                  Registration deadline: {new Date(event.registrationDeadline).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* Payment Information */}
            {event.isPaid && event.paymentInfo && (
              <div className="card mb-6">
                <h4 className="font-semibold text-gray-900 mb-4">💳 Payment Methods</h4>
                <div className="space-y-4">
                  {event.paymentInfo.upiId && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-1">UPI ID</p>
                      <p className="text-primary font-mono">{event.paymentInfo.upiId}</p>
                      <button
                        onClick={() => navigator.clipboard.writeText(event.paymentInfo!.upiId!)}
                        className="text-xs text-blue-600 hover:text-blue-700 mt-1"
                      >
                        📋 Copy UPI ID
                      </button>
                    </div>
                  )}
                  
                  {event.paymentInfo.phoneNumber && (
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-1">Phone/GPay</p>
                      <p className="text-primary font-mono">{event.paymentInfo.phoneNumber}</p>
                      <button
                        onClick={() => navigator.clipboard.writeText(event.paymentInfo!.phoneNumber!)}
                        className="text-xs text-green-600 hover:text-green-700 mt-1"
                      >
                        📋 Copy Number
                      </button>
                    </div>
                  )}
                  
                  {event.paymentInfo.qrCode && (
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-2">Scan QR Code</p>
                      <img 
                        src={event.paymentInfo.qrCode} 
                        alt="Payment QR Code" 
                        className="w-full max-w-[200px] mx-auto border-2 border-gray-200 rounded"
                      />
                    </div>
                  )}
                  
                  {event.paymentInfo.bankDetails && (
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-1">Bank Details</p>
                      <p className="text-sm text-gray-600 whitespace-pre-line">{event.paymentInfo.bankDetails}</p>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  ⚠️ After payment, please keep the transaction screenshot for verification
                </p>
              </div>
            )}

            {/* Contact Information */}
            {event.contactInfo && (
              <div className="card">
                <h4 className="font-semibold text-gray-900 mb-4">📞 Contact Information</h4>
                <div className="space-y-3">
                  {event.contactInfo.email && (
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <a 
                        href={`mailto:${event.contactInfo.email}`}
                        className="text-primary"
                      >
                        {event.contactInfo.email}
                      </a>
                    </div>
                  )}
                  
                  {event.contactInfo.phone && (
                    <div>
                      <p className="text-sm font-medium text-gray-700">Phone</p>
                      <a 
                        href={`tel:${event.contactInfo.phone}`}
                        className="text-primary"
                      >
                        {event.contactInfo.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;