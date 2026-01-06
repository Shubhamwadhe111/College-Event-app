// Environment Validation
const fs = require('fs');
const path = require('path');

const validateEnvironment = () => {
  console.log('🔍 Validating environment configuration...');
  
  // Check server .env file
  const serverEnvPath = path.join(__dirname, 'server', '.env');
  
  if (!fs.existsSync(serverEnvPath)) {
    console.log('❌ Server .env file missing');
    console.log('   Creating default .env file...');
    
    const defaultEnv = `PORT=5001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Shubham@123
DB_NAME=nexusxrcpit
`;
    
    fs.writeFileSync(serverEnvPath, defaultEnv);
    console.log('✅ Created server/.env with default values');
  } else {
    console.log('✅ Server .env file exists');
  }
  
  // Validate required environment variables
  require('dotenv').config({ path: serverEnvPath });
  
  const required = ['PORT', 'DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.log('❌ Missing environment variables:', missing.join(', '));
    return false;
  }
  
  console.log('✅ All environment variables configured');
  return true;
};

if (require.main === module) {
  validateEnvironment();
}

module.exports = { validateEnvironment };
