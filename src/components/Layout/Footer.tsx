import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Zap } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, #0a0a1a 0%, #0d0d20 100%)',
      color: '#ffffff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle Background Glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.03) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Main Footer Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 24px 40px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '40px'
        }} className="footer-grid">
          
          {/* Column 1 - Brand & About */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Zap size={22} color="white" />
              </div>
              <span style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #ffffff, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>NEXUS</span>
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.9rem',
              lineHeight: 1.7,
              marginBottom: '20px'
            }}>
              Your premier college event management platform. Discover, create, and manage amazing campus events.
            </p>
            
            {/* Social Icons */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginTop: '20px'
            }}>
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Instagram, href: '#' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(99, 102, 241, 0.1)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.7)',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(99, 102, 241, 0.3)';
                    e.currentTarget.style.borderColor = '#8b5cf6';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: '#a855f7',
              marginBottom: '24px',
              letterSpacing: '0.5px'
            }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { label: 'Home', path: '/' },
                { label: 'Browse Events', path: '/events' },
                { label: 'Event Gallery', path: '/gallery' },
                { label: 'My Dashboard', path: '/dashboard' }
              ].map((link, index) => (
                <li key={index} style={{ marginBottom: '14px' }}>
                  <Link
                    to={link.path}
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#a855f7';
                      e.currentTarget.style.paddingLeft = '8px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                      e.currentTarget.style.paddingLeft = '0';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Resources */}
          <div>
            <h4 style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: '#a855f7',
              marginBottom: '24px',
              letterSpacing: '0.5px'
            }}>Resources</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { label: 'Help Center', path: '/help' },
                { label: 'Notices', path: '/notices' },
                { label: 'Create Event', path: '/create-event' },
                { label: 'My Events', path: '/my-events' }
              ].map((link, index) => (
                <li key={index} style={{ marginBottom: '14px' }}>
                  <Link
                    to={link.path}
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#a855f7';
                      e.currentTarget.style.paddingLeft = '8px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                      e.currentTarget.style.paddingLeft = '0';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact Us */}
          <div>
            <h4 style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: '#a855f7',
              marginBottom: '24px',
              letterSpacing: '0.5px'
            }}>Contact Us</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.9rem'
              }}>
                <Mail size={18} style={{ color: '#8b5cf6' }} />
                <span>support@nexusevents.com</span>
              </li>
              <li style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.9rem'
              }}>
                <Phone size={18} style={{ color: '#8b5cf6' }} />
                <span>+91 123 456 7890</span>
              </li>
              <li style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.9rem'
              }}>
                <MapPin size={18} style={{ color: '#8b5cf6', flexShrink: 0, marginTop: '2px' }} />
                <span>College Campus,<br />Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: '1px solid rgba(99, 102, 241, 0.15)',
        background: 'rgba(0,0,0,0.3)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.85rem',
            margin: 0
          }}>
            © 2025 Nexus Event Management. All rights reserved.
          </p>
          <div style={{
            display: 'flex',
            gap: '24px'
          }}>
            <Link
              to="/privacy"
              style={{
                color: 'rgba(255,255,255,0.5)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#a855f7'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              style={{
                color: 'rgba(255,255,255,0.5)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#a855f7'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .footer-grid > div {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
