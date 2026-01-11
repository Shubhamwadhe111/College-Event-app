// Quick test to check if backend is responding
// Using built-in fetch (Node.js 18+)

async function testBackend() {
  console.log('=== TESTING BACKEND STATUS ===\n');
  
  const API_URL = 'https://nexus-event-backend.onrender.com/api';
  
  try {
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${API_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health:', healthData);
    console.log('');
    
    console.log('2. Testing pending organizers endpoint...');
    const orgResponse = await fetch(`${API_URL}/admin/pending-organizers`);
    const orgData = await orgResponse.json();
    console.log('✅ Organizers found:', orgData.length);
    console.log('Organizers:', JSON.stringify(orgData, null, 2));
    console.log('');
    
    if (orgData.length === 0) {
      console.log('⚠️  No organizers in database yet!');
      console.log('   Register an organizer on the main website first.');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n⚠️  Backend might be sleeping. Wait 30-60 seconds and try again.');
  }
}

testBackend();
