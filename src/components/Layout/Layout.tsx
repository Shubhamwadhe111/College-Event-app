import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-container min-h-screen flex flex-col">
      <Navbar />
      <main className="main-content flex-grow">
        {children}
      </main>
    </div>
  );
};

export default Layout;