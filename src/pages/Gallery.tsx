import React, { useState, useEffect } from 'react';
import { useEvents } from '../contexts/EventContext';
import { X, Calendar, MapPin, Users, Camera, Filter, Image, Sparkles } from 'lucide-react';

const Gallery: React.FC = () => {
  const { events } = useEvents();
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string; event: any } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Get completed events with images
  const completedEvents = events.filter(e => e.status === 'completed' && (e.images?.length || e.image));
  
  // Get all images from events
  const allImages = completedEvents.flatMap(event => {
    const images = [];
    if (event.image) {
      images.push({ url: event.image, title: event.title, event });
    }
    if (event.images) {
      event.images.forEach((img: string) => {
        images.push({ url: img, title: event.title, event });
      });
    }
    return images;
  });

  // Sample gallery images for demo
  const sampleImages = [
    { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', title: 'Tech Conference 2024', event: { category: 'Technology', date: '2024-01-15', location: 'Main Auditorium', registered: 250 } },
    { url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800', title: 'Cultural Night', event: { category: 'Cultural', date: '2024-01-20', location: 'Open Air Theatre', registered: 500 } },
    { url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800', title: 'Sports Day', event: { category: 'Sports', date: '2024-02-01', location: 'Sports Ground', registered: 300 } },
    { url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800', title: 'Hackathon 2024', event: { category: 'Technology', date: '2024-02-10', location: 'Computer Lab', registered: 150 } },
    { url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800', title: 'Music Festival', event: { category: 'Cultural', date: '2024-02-15', location: 'College Ground', registered: 800 } },
    { url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800', title: 'Workshop Series', event: { category: 'Workshop', date: '2024-02-20', location: 'Seminar Hall', registered: 100 } },
  ];

  const displayImages = allImages.length > 0 ? allImages : sampleImages;

  const categories = ['all', 'Technology', 'Cultural', 'Sports', 'Workshop', 'Academic'];

  const filteredImages = selectedCategory === 'all' 
    ? displayImages 
    : displayImages.filter(img => img.event.category === selectedCategory);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Camera size={48} style={{ color: '#10b981', marginBottom: '1rem', animation: 'pulse 2s infinite' }} />
          <p style={{ color: '#94a3b8' }}>Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      paddingTop: '80px',
      paddingBottom: '40px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)'
          }}>
            <Camera size={36} color="white" />
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #ffffff 0%, #10b981 50%, #14b8a6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}>
            Event Gallery
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#94a3b8',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Relive the unforgettable moments from our college events
          </p>
        </div>

        {/* Category Filter */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '3rem',
          padding: '1rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#94a3b8',
            marginRight: '1rem',
            padding: '0.5rem'
          }}>
            <Filter size={18} />
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Filter:</span>
          </div>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: '25px',
                border: selectedCategory === category 
                  ? '2px solid #10b981' 
                  : '2px solid rgba(255,255,255,0.15)',
                background: selectedCategory === category 
                  ? 'rgba(16, 185, 129, 0.2)' 
                  : 'rgba(255,255,255,0.05)',
                color: selectedCategory === category ? '#10b981' : '#cbd5e1',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'capitalize',
                fontSize: '0.85rem'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredImages.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredImages.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(img)}
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  aspectRatio: '4/3',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.2)';
                  e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Event+Photo';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.5rem',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                  color: 'white'
                }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    marginBottom: '0.5rem'
                  }}>
                    {img.title}
                  </h3>
                  <span style={{
                    padding: '0.3rem 0.75rem',
                    background: 'rgba(16, 185, 129, 0.3)',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#10b981'
                  }}>
                    {img.event.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <Image size={64} style={{ color: '#64748b', marginBottom: '1rem' }} />
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '0.5rem'
            }}>
              No photos yet
            </h3>
            <p style={{ color: '#94a3b8' }}>
              Photos from completed events will appear here
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
        >
          <button
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              background: 'rgba(255,255,255,0.1)',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'white'
            }}
          >
            <X size={24} />
          </button>

          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '90vh' }}>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              style={{
                maxWidth: '100%',
                maxHeight: '75vh',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
              }}
            />
            <div style={{
              marginTop: '1.5rem',
              padding: '1.5rem',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '12px'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'white',
                marginBottom: '1rem'
              }}>
                {selectedImage.title}
              </h3>
              <div style={{
                display: 'flex',
                gap: '2rem',
                flexWrap: 'wrap',
                fontSize: '0.95rem',
                color: 'rgba(255, 255, 255, 0.8)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={18} style={{ color: '#10b981' }} />
                  {new Date(selectedImage.event.date).toLocaleDateString()}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={18} style={{ color: '#10b981' }} />
                  {selectedImage.event.location}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Users size={18} style={{ color: '#10b981' }} />
                  {selectedImage.event.registered} participants
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default Gallery;
