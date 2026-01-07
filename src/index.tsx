import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// GitHub Pages SPA routing fix: Restore original URL from sessionStorage
function restoreOriginalUrl() {
  console.log('=== GitHub Pages SPA Fix Debug ===');
  console.log('Current URL:', window.location.href);
  console.log('Pathname:', window.location.pathname);
  
  // Check if we have a stored redirect path
  const redirectPath = sessionStorage.getItem('nexus_redirect_path');
  console.log('Stored redirect path:', redirectPath);
  
  if (redirectPath) {
    try {
      // Clear the stored path immediately to prevent loops
      sessionStorage.removeItem('nexus_redirect_path');
      
      // Validate the path format
      if (redirectPath.startsWith('/')) {
        // Get the base path from package.json homepage
        const basePath = '/College-Event-app';
        
        // Construct the correct URL: base path + stored path
        const newUrl = window.location.origin + basePath + redirectPath;
        
        console.log('Restoring to URL:', newUrl);
        
        // Use history.replaceState to update the URL without reloading
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, '', newUrl);
          console.log('Successfully restored URL to:', window.location.href);
          
          // Force a re-render by dispatching a popstate event
          window.dispatchEvent(new PopStateEvent('popstate'));
        } else {
          console.warn('history.replaceState not supported');
        }
      } else {
        console.warn('Invalid redirect path format:', redirectPath);
      }
    } catch (error) {
      console.error('Error restoring original URL:', error);
    }
  } else {
    console.log('No stored redirect path - normal page load');
  }
  console.log('=== End Debug ===');
}

// Execute path restoration before rendering the app
restoreOriginalUrl();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </React.StrictMode>
);
