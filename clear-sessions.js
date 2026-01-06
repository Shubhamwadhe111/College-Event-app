// Clear All Sessions Script
// Run this in the browser console to clear all authentication sessions

function clearAllSessions() {
  // Clear localStorage
  localStorage.removeItem('currentUser');
  localStorage.removeItem('authToken');
  localStorage.removeItem('userSession');
  localStorage.removeItem('adminSession');
  localStorage.removeItem('masterSession');
  localStorage.removeItem('organizerSession');
  
  // Clear sessionStorage
  sessionStorage.clear();
  
  // Clear all localStorage (nuclear option)
  // localStorage.clear();
  
  console.log('✅ All authentication sessions cleared!');
  console.log('🔄 Please refresh the page to see changes.');
  
  // Auto-refresh the page
  window.location.reload();
}

// Run the function
clearAllSessions();