import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const MobileNavTest: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 99999 }}>
      {/* Test Navbar */}
      <div style={{
        height: '60px',
        background: '#1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem',
        color: 'white'
      }}>
        <span>MOBILE NAV TEST</span>
        {isMobile && (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              background: '#10b981',
              border: 'none',
              borderRadius: '8px',
              padding: '8px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {/* Test Sidebar */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: isMenuOpen ? 0 : '-300px',
          width: '300px',
          height: '100vh',
          background: '#1e293b',
          transition: 'right 0.3s ease',
          zIndex: 10000,
          padding: '1rem',
          color: 'white'
        }}>
          <h3>Mobile Menu</h3>
          <div>Status: {isMenuOpen ? 'OPEN' : 'CLOSED'}</div>
          <div>Mobile: {isMobile ? 'YES' : 'NO'}</div>
        </div>
      )}
    </div>
  );
};

export default MobileNavTest;