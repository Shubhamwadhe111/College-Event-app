import React, { useEffect } from 'react';
import NexusadminNavbar from './NexusadminNavbar';
import NexusadminFooter from './NexusadminFooter';
import { ModeBanner } from '../../components/ModeIndicator';

interface NexusadminMainLayoutProps {
  children: React.ReactNode;
}

const NexusadminMainLayout: React.FC<NexusadminMainLayoutProps> = ({ children }) => {
  useEffect(() => {
    // Set admin portal attribute on body to isolate from main site
    document.body.setAttribute('data-admin-portal', 'true');
    document.body.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)';
    document.body.style.overflow = 'auto';
    document.body.style.minHeight = '100vh';
    
    // Add admin portal specific styles
    const style = document.createElement('style');
    style.textContent = `
      [data-admin-portal="true"] {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      }
      
      [data-admin-portal="true"] * {
        box-sizing: border-box;
      }
      
      [data-admin-portal="true"] .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
        width: 100%;
      }
      
      [data-admin-portal="true"] .row {
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;
        justify-content: center;
        align-items: center;
      }
      
      [data-admin-portal="true"] .col-lg-6 {
        flex: 1 1 500px;
        max-width: 600px;
        padding: 0 1rem;
      }
      
      [data-admin-portal="true"] .text-center {
        text-align: center;
      }
      
      @keyframes shimmer {
        0% { transform: translateX(-100%) rotate(45deg); }
        100% { transform: translateX(100%) rotate(45deg); }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
      }
      
      @keyframes sparkle {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.2); }
      }
      
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @media (max-width: 992px) {
        [data-admin-portal="true"] .col-lg-6 {
          flex: 1 1 100%;
          max-width: 100%;
          margin-bottom: 2rem;
        }
        
        [data-admin-portal="true"] .row {
          flex-direction: column;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      // Clean up when component unmounts
      document.body.removeAttribute('data-admin-portal');
      document.body.style.background = '';
      document.body.style.overflow = '';
      document.body.style.minHeight = '';
      document.head.removeChild(style);
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
      <NexusadminNavbar />
      <ModeBanner />
      <main style={{
        flex: 1,
        paddingTop: '80px',
        background: 'transparent',
        minHeight: 'calc(100vh - 80px)'
      }}>
        {children}
      </main>
      <NexusadminFooter />
    </div>
  );
};

export default NexusadminMainLayout;