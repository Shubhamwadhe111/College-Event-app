// Mobile Navigation Verification Script
// Run this in browser console on the admin portal page

console.log('🔍 Mobile Navigation Verification Starting...');

// Check if we're on the admin portal
const isAdminPortal = window.location.pathname.includes('/nexusadmin');
console.log('📍 Admin Portal:', isAdminPortal ? '✅ YES' : '❌ NO');

// Check viewport size
const viewportWidth = window.innerWidth;
const isMobile = viewportWidth <= 768;
console.log('📱 Viewport Width:', viewportWidth + 'px');
console.log('📱 Mobile Mode:', isMobile ? '✅ YES' : '❌ NO');

// Check for hamburger menu button
const menuButton = document.querySelector('button[aria-label*="menu"]');
console.log('🍔 Hamburger Button:', menuButton ? '✅ FOUND' : '❌ NOT FOUND');

// Check for sidebar
const sidebar = document.querySelector('div[style*="right:"]');
console.log('📋 Sidebar Element:', sidebar ? '✅ FOUND' : '❌ NOT FOUND');

// Test mobile detection
if (isMobile) {
  console.log('✅ Mobile mode detected - hamburger menu should be visible');
  if (menuButton) {
    console.log('✅ Hamburger menu button found');
    console.log('🎯 Try clicking the hamburger menu to test sidebar');
  } else {
    console.log('❌ Hamburger menu button not found - check implementation');
  }
} else {
  console.log('💻 Desktop mode - resize window to ≤768px to test mobile navigation');
}

// Function to test menu toggle
window.testMobileMenu = function() {
  if (menuButton) {
    console.log('🧪 Testing menu toggle...');
    menuButton.click();
    setTimeout(() => {
      const sidebarStyle = sidebar?.getAttribute('style');
      const isOpen = sidebarStyle?.includes('right: 0');
      console.log('📋 Sidebar Status:', isOpen ? '✅ OPEN' : '❌ CLOSED');
    }, 100);
  } else {
    console.log('❌ Cannot test - hamburger button not found');
  }
};

console.log('🔍 Verification Complete!');
console.log('💡 Run testMobileMenu() to test the menu toggle');