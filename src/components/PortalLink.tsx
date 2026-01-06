import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { usePortalNavigation } from '../hooks/usePortalNavigation';

// Cache busting version - Force component reload - TIMESTAMP: 2025-01-05-12-00-00
const COMPONENT_VERSION = '2025-01-05-ULTIMATE-CACHE-BUST-' + Date.now();
console.log(`🔄 PortalLink loaded: ${COMPONENT_VERSION}`);

interface PortalLinkProps extends Omit<LinkProps, 'onClick'> {
  to: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  forcePortal?: boolean;
}

const PortalLink: React.FC<PortalLinkProps> = ({ 
  to, 
  children, 
  onClick, 
  forcePortal = true,
  ...props 
}) => {
  const { navigateInPortal, isInPortal, getCurrentPortal } = usePortalNavigation();

  // Calculate the portal-aware path for the RouterLink 'to' prop
  const getPortalAwarePath = () => {
    if (!forcePortal || !isInPortal) {
      return to;
    }
    
    const portal = getCurrentPortal();
    if (!portal) {
      return to;
    }
    
    const cleanPath = to.startsWith('/') ? to : `/${to}`;
    return `/${portal}${cleanPath}`;
  };

  const portalAwareTo = getPortalAwarePath();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Enhanced debug logging
    console.log(`🔗 PortalLink clicked:`, {
      originalTo: to,
      portalAwareTo,
      forcePortal,
      isInPortal,
      currentPath: window.location.pathname,
      portal: getCurrentPortal(),
      timestamp: new Date().toISOString()
    });

    if (forcePortal && isInPortal) {
      e.preventDefault();
      e.stopPropagation();
      
      console.log(`🚀 Navigating within portal to: ${to} -> ${portalAwareTo}`);
      navigateInPortal(to);
    }
    
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <RouterLink 
      to={portalAwareTo} 
      onClick={handleClick}
      {...props}
    >
      {children}
    </RouterLink>
  );
};

export default PortalLink;