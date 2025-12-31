import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Check if we're accessing the Nexusadmin portal
const isNexusadmin = window.location.pathname.startsWith('/nexusadmin');

if (isNexusadmin) {
  // Dynamically import and render Nexusadmin portal
  import('./nexusadmin').then(() => {
    // The nexusadmin.tsx file will handle its own rendering
  });
} else {
  // Render main application
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
}
