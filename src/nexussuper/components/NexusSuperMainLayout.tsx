import React, { useEffect } from 'react';
import NexusSuperNavbar from './NexusSuperNavbar';
import NexusSuperFooter from './NexusSuperFooter';
import { ModeBanner } from '../../components/ModeIndicator';

interface NexusSuperMainLayoutProps {
  children: React.ReactNode;
}

const NexusSuperMainLayout: React.FC<NexusSuperMainLayoutProps> = ({ children }) => {
  useEffect(() => {
    // Set super admin portal attribute on body to isolate from main site
    document.body.setAttribute('data-super-admin-portal', 'true');
    document.body.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)';
    document.body.style.overflow = 'auto';
    document.body.style.minHeight = '100vh';
    
    return () => {
      // Clean up when component unmounts
      document.body.removeAttribute('data-super-admin-portal');
      document.body.style.background = '';
      document.body.style.overflow = '';
      document.body.style.minHeight = '';
    };
  }, []);

  return (
    <div className="app-container" style={{
      minHeight: '100vh',
      background: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      <NexusSuperNavbar />
      <ModeBanner />
      <main style={{
        flex: 1,
        paddingTop: '75px',
        background: 'transparent',
        minHeight: 'calc(100vh - 75px)'
      }}>
        {children}
      </main>
      <NexusSuperFooter />
    </div>
  );
};

export default NexusSuperMainLayout;