import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

// Cache busting version - Force component reload - TIMESTAMP: 2025-01-05-12-00-00
const HOOK_VERSION = '2025-01-05-ULTIMATE-CACHE-BUST-' + Date.now();
console.log(`🔄 usePortalNavigation loaded: ${HOOK_VERSION}`);

export const usePortalNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine which portal we're in based on current path
  const getCurrentPortal = useCallback(() => {
    if (location.pathname.startsWith('/nexusadmin')) {
      return 'nexusadmin';
    } else if (location.pathname.startsWith('/nexussuper')) {
      return 'nexussuper';
    }
    return null;
  }, [location.pathname]);

  // Navigate within the current portal context
  const navigateInPortal = useCallback((path: string) => {
    const portal = getCurrentPortal();
    
    console.log(`🔄 navigateInPortal called:`, {
      path,
      portal,
      currentLocation: location.pathname
    });
    
    if (!portal) {
      // If not in a portal, navigate normally
      console.log(`❌ Not in portal, navigating normally to: ${path}`);
      navigate(path);
      return;
    }

    // Ensure path starts with /
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    
    // Navigate within the portal context
    if (portal === 'nexusadmin') {
      const finalPath = `/nexusadmin${cleanPath}`;
      console.log(`✅ Nexusadmin portal navigation: ${path} -> ${finalPath}`);
      navigate(finalPath);
    } else if (portal === 'nexussuper') {
      const finalPath = `/nexussuper${cleanPath}`;
      console.log(`✅ NexusSuper portal navigation: ${path} -> ${finalPath}`);
      navigate(finalPath);
    }
  }, [navigate, getCurrentPortal, location.pathname]);

  // Force navigation to stay within portal by replacing window.location if needed
  const forcePortalNavigation = useCallback((path: string) => {
    const portal = getCurrentPortal();
    
    if (!portal) {
      window.location.href = path;
      return;
    }

    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    
    if (portal === 'nexusadmin') {
      window.location.href = `/nexusadmin${cleanPath}`;
    } else if (portal === 'nexussuper') {
      window.location.href = `/nexussuper${cleanPath}`;
    }
  }, [getCurrentPortal]);

  return {
    navigateInPortal,
    forcePortalNavigation,
    getCurrentPortal,
    isInPortal: getCurrentPortal() !== null
  };
};