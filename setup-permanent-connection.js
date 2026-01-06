// Permanent Connection Setup Script
const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up permanent connections...');
console.log('=====================================');

// Create package.json scripts for easy startup
const updatePackageJson = () => {
  const packageJsonPath = path.join(__dirname, 'package.json');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Add custom scripts
    packageJson.scripts = {
      ...packageJson.scripts,
      "start:system": "node check-system.js && concurrently \"npm run start:backend\" \"npm run start:frontend\"",
      "start:backend": "cd server && npm start",
      "start:frontend": "npm start",
      "health": "node check-system.js",
      "setup": "npm install && cd server && npm install"
    };
    
    // Add concurrently as dev dependency if not present
    if (!packageJson.devDependencies) {
      packageJson.devDependencies = {};
    }
    
    if (!packageJson.devDependencies.concurrently) {
      packageJson.devDependencies.concurrently = "^7.6.0";
    }
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Updated package.json with system scripts');
  } catch (error) {
    console.log('⚠️  Could not update package.json:', error.message);
  }
};

// Create environment validation
const createEnvValidation = () => {
  const envValidationPath = path.join(__dirname, 'validate-env.js');
  
  const envValidationContent = `// Environment Validation
const fs = require('fs');
const path = require('path');

const validateEnvironment = () => {
  console.log('🔍 Validating environment configuration...');
  
  // Check server .env file
  const serverEnvPath = path.join(__dirname, 'server', '.env');
  
  if (!fs.existsSync(serverEnvPath)) {
    console.log('❌ Server .env file missing');
    console.log('   Creating default .env file...');
    
    const defaultEnv = \`PORT=5001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Shubham@123
DB_NAME=nexusxrcpit
\`;
    
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
`;
  
  fs.writeFileSync(envValidationPath, envValidationContent);
  console.log('✅ Created environment validation script');
};

// Create connection test script
const createConnectionTest = () => {
  const testPath = path.join(__dirname, 'test-connections.js');
  
  const testContent = `// Connection Test Script
const { validateEnvironment } = require('./validate-env');
const mysql = require('mysql2/promise');
const http = require('http');

const testDatabaseConnection = async () => {
  console.log('🔍 Testing database connection...');
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Shubham@123',
      database: process.env.DB_NAME || 'nexusxrcpit'
    });
    
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM students');
    console.log(\`✅ Database connected - Found \${rows[0].count} students\`);
    
    await connection.end();
    return true;
  } catch (error) {
    console.log('❌ Database connection failed:', error.message);
    return false;
  }
};

const testAPIEndpoints = async () => {
  console.log('🔍 Testing API endpoints...');
  
  const endpoints = [
    '/api/health',
    '/api/users',
    '/api/events'
  ];
  
  for (const endpoint of endpoints) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(\`http://localhost:5001\${endpoint}\`, (res) => {
          if (res.statusCode === 200) {
            console.log(\`✅ \${endpoint} - OK\`);
            resolve();
          } else {
            console.log(\`⚠️  \${endpoint} - Status: \${res.statusCode}\`);
            resolve();
          }
        });
        
        req.on('error', () => {
          console.log(\`❌ \${endpoint} - Connection failed\`);
          resolve();
        });
        
        req.setTimeout(3000, () => {
          console.log(\`❌ \${endpoint} - Timeout\`);
          resolve();
        });
      });
    } catch (error) {
      console.log(\`❌ \${endpoint} - Error: \${error.message}\`);
    }
  }
};

const runTests = async () => {
  console.log('🧪 NEXUS EVENT MANAGEMENT - Connection Tests');
  console.log('=============================================\\n');
  
  // Validate environment
  if (!validateEnvironment()) {
    console.log('❌ Environment validation failed');
    process.exit(1);
  }
  
  // Test database
  const dbOk = await testDatabaseConnection();
  
  // Test API endpoints
  await testAPIEndpoints();
  
  console.log('\\n=============================================');
  console.log(dbOk ? '✅ Connection tests completed' : '❌ Some tests failed');
  console.log('=============================================');
};

if (require.main === module) {
  runTests();
}
`;
  
  fs.writeFileSync(testPath, testContent);
  console.log('✅ Created connection test script');
};

// Create startup configuration
const createStartupConfig = () => {
  const configPath = path.join(__dirname, 'startup.config.json');
  
  const config = {
    "name": "Nexus Event Management System",
    "version": "1.0.0",
    "services": {
      "database": {
        "host": "localhost",
        "port": 3306,
        "name": "nexusxrcpit",
        "required": true
      },
      "backend": {
        "host": "localhost",
        "port": 5001,
        "path": "./server",
        "command": "npm start",
        "required": true
      },
      "frontend": {
        "host": "localhost",
        "port": 3000,
        "path": "./",
        "command": "npm start",
        "required": true
      }
    },
    "urls": {
      "main": "http://localhost:3000/College-Event-app",
      "admin": "http://localhost:3000/College-Event-app/nexusadmin.html",
      "api": "http://localhost:5001/api"
    },
    "monitoring": {
      "enabled": true,
      "interval": 30000,
      "retryAttempts": 3
    }
  };
  
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log('✅ Created startup configuration');
};

// Main setup function
const setupPermanentConnection = () => {
  console.log('Starting permanent connection setup...\n');
  
  updatePackageJson();
  createEnvValidation();
  createConnectionTest();
  createStartupConfig();
  
  console.log('\n=====================================');
  console.log('🎉 Permanent connection setup complete!');
  console.log('=====================================');
  console.log('\n📋 Available commands:');
  console.log('   npm run health     - Check system health');
  console.log('   npm run start:system - Start all services');
  console.log('   node test-connections.js - Test connections');
  console.log('   node validate-env.js - Validate environment');
  console.log('\n🚀 To start the system:');
  console.log('   1. Run: npm run setup (install dependencies)');
  console.log('   2. Run: npm run health (check system)');
  console.log('   3. Run: npm run start:system (start all services)');
  console.log('\n✨ Your system is now configured for permanent connections!');
};

// Run setup
setupPermanentConnection();