import React, { useState } from 'react';
import { useEvents } from '../contexts/EventContext';
import { X, Calendar, MapPin, Users, Camera, Filter } from 'lucide-react';

const Gallery: React.FC = () => {
  const { events } = useEvents();
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string; event: any } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get completed events with images
  const completedEvents = events.filter(e => e.status === 'completed' && (e.images?.length || e.image));
  
  // Get all images from events
  const allImages = completedEvents.flatMap(event => {
    const images = [];
    if (event.image) {
      images.push({ url: event.image, title: event.title, event });
    }
    if (event.images) {
      event.images.forEach(img => {
        images.push({ url: img, title: event.title, event });
      });
    }
    return images;
  });

  const categories = ['all', 'Technology', 'Cultural', 'Sports', 'Academic', 'Workshop', 'Competition'];

  const filteredImages = selectedCategory === 'all' 
    ? allImages 
    : allImages.filter(img => img.event.category === selectedCategory);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 0'
    }}>
      <div className="container">
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
            <Camera size={32} />
          </div>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 900,
            color: 'white',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            Event Gallery
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Relive the unforgettable moments from our college events
          </p>
        </div>

        {/* Category Filter */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '3rem',
          animation: 'fadeIn 1s ease-out 0.2s both'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'white',
            marginRight: '1rem'
          }}>
            <Filter size={20} />
            <span style={{ fontWeight: 600 }}>Filter by:</span>
          </div>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '50px',
                border: selectedCategory === category ? '2px solid #ff6b6b' : '2px solid rgba(255,255,255,0.3)',
                background: selectedCategory === category ? 'rgba(255,107,107,0.2)' : 'rgba(255,255,255,0.1)',
                color: selectedCategory === category ? '#ff6b6b' : 'white',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'capitalize',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(255,107,107,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
            animation: 'fadeIn 1s ease-out 0.4s both'
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
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease',
                  animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both`,
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(255,107,107,0.3)';
                  e.currentTarget.style.borderColor = 'rgba(255,107,107,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
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
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.transform = 'scale(1)';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.5rem',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                  color: 'white'
                }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    marginBottom: '0.5rem'
                  }}>
                    {img.title}
                  </h3>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.85rem',
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      background: 'rgba(255,107,107,0.3)',
                      borderRadius: '50px',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>
                      {img.event.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            animation: 'fadeIn 1s ease-out',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
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
              fontSize: '2rem'
            }}>
              <Camera size={32} style={{ color: 'white' }} />
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'white',
              marginBottom: '0.5rem'
            }}>
              No photos yet
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Photos from completed college events will appear here
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
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            animation: 'fadeIn 0.3s ease-out'
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
              transition: 'all 0.3s ease',
              color: 'white',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <X size={24} />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              animation: 'scaleIn 0.3s ease-out'
            }}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
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
              borderRadius: '12px',
              backdropFilter: 'blur(10px)'
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
                  <Calendar size={18} style={{ color: '#ff6b6b' }} />
                  {new Date(selectedImage.event.date).toLocaleDateString()}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={18} style={{ color: '#ff6b6b' }} />
                  {selectedImage.event.location}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Users size={18} style={{ color: '#ff6b6b' }} />
                  {selectedImage.event.registered} participants
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Gallery;
