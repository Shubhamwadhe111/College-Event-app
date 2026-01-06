// System Health Checker
const http = require('http');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: './server/.env' });

console.log('🔍 NEXUS EVENT MANAGEMENT - System Health Check');
console.log('================================================');

// Check if backend is running
const checkBackend = () => {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:5001/api/health', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          console.log('✅ Backend Server: RUNNING');
          console.log(`   Port: ${response.port}`);
          console.log(`   Status: ${response.status}`);
          resolve(true);
        } catch (error) {
          console.log('❌ Backend Server: INVALID RESPONSE');
          resolve(false);
        }
      });
    });
    
    req.on('error', () => {
      console.log('❌ Backend Server: NOT RUNNING');
      console.log('   Please start with: cd server && npm start');
      resolve(false);
    });
    
    req.setTimeout(5000, () => {
      console.log('❌ Backend Server: TIMEOUT');
      resolve(false);
    });
  });
};

// Check if frontend is accessible
const checkFrontend = () => {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:3000/College-Event-app', (res) => {
      if (res.statusCode === 200) {
        console.log('✅ Frontend App: RUNNING');
        console.log('   URL: http://localhost:3000/College-Event-app');
        resolve(true);
      } else {
        console.log('❌ Frontend App: INVALID RESPONSE');
        resolve(false);
      }
    });
    
    req.on('error', () => {
      console.log('❌ Frontend App: NOT RUNNING');
      console.log('   Please start with: npm start');
      resolve(false);
    });
    
    req.setTimeout(5000, () => {
      console.log('❌ Frontend App: TIMEOUT');
      resolve(false);
    });
  });
};

// Check database connection
const checkDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Shubham@123',
      database: process.env.DB_NAME || 'nexusxrcpit'
    });
    
    await connection.execute('SELECT 1');
    console.log('✅ Database: CONNECTED');
    console.log(`   Host: ${process.env.DB_HOST || 'localhost'}`);
    console.log(`   Database: ${process.env.DB_NAME || 'nexusxrcpit'}`);
    
    await connection.end();
    return true;
  } catch (error) {
    console.log('❌ Database: CONNECTION FAILED');
    console.log(`   Error: ${error.message}`);
    return false;
  }
};

// Main health check
const runHealthCheck = async () => {
  console.log('\n🔍 Checking system components...\n');
  
  const [backendOk, frontendOk, databaseOk] = await Promise.all([
    checkBackend(),
    checkFrontend(),
    checkDatabase()
  ]);
  
  console.log('\n================================================');
  console.log('📊 SYSTEM HEALTH SUMMARY');
  console.log('================================================');
  
  const allOk = backendOk && frontendOk && databaseOk;
  
  if (allOk) {
    console.log('🎉 ALL SYSTEMS OPERATIONAL!');
    console.log('\n🌐 Access URLs:');
    console.log('   Main App: http://localhost:3000/College-Event-app');
    console.log('   Admin Portal: http://localhost:3000/College-Event-app/nexusadmin.html');
    console.log('   Backend API: http://localhost:5001/api');
  } else {
    console.log('⚠️  SOME SYSTEMS NEED ATTENTION');
    console.log('\n🔧 To start all services:');
    console.log('   Run: node start-system.bat');
    console.log('   Or manually:');
    console.log('   1. cd server && npm start');
    console.log('   2. npm start (in main directory)');
  }
  
  console.log('\n================================================');
  process.exit(allOk ? 0 : 1);
};

runHealthCheck();