#!/usr/bin/env node

const mysql = require('mysql2/promise');
const http = require('http');
require('dotenv').config({ path: './server/.env' });

console.log('🔍 COMPREHENSIVE SYSTEM CHECK');
console.log('================================');

async function checkDatabase() {
  console.log('\n📊 DATABASE CONNECTION CHECK');
  console.log('-----------------------------');
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'nexusxrcpit'
    });
    
    console.log('✅ Database connection: SUCCESS');
    
    // Check tables
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`✅ Tables found: ${tables.length}`);
    
    // Check sample data
    const [users] = await connection.execute('SELECT COUNT(*) as count FROM students');
    console.log(`✅ Sample users: ${users[0].count}`);
    
    const [events] = await connection.execute('SELECT COUNT(*) as count FROM events');
    console.log(`✅ Events: ${events[0].count}`);
    
    await connection.end();
    return true;
  } catch (error) {
    console.log('❌ Database connection: FAILED');
    console.log('Error:', error.message);
    return false;
  }
}

function checkUrl(url, name) {
  return new Promise((resolve) => {
    const request = http.get(url, (res) => {
      if (res.statusCode === 200) {
        console.log(`✅ ${name}: SUCCESS (${res.statusCode})`);
        resolve(true);
      } else {
        console.log(`❌ ${name}: FAILED (${res.statusCode})`);
        resolve(false);
      }
    });
    
    request.on('error', (error) => {
      console.log(`❌ ${name}: FAILED (${error.message})`);
      resolve(false);
    });
    
    request.setTimeout(5000, () => {
      console.log(`❌ ${name}: TIMEOUT`);
      request.destroy();
      resolve(false);
    });
  });
}

async function checkBackend() {
  console.log('\n🚀 BACKEND API CHECK');
  console.log('--------------------');
  
  const endpoints = [
    { name: 'Health Check', url: 'http://localhost:5001/api/health' },
    { name: 'Users Endpoint', url: 'http://localhost:5001/api/users' },
    { name: 'Events Endpoint', url: 'http://localhost:5001/api/events' }
  ];
  
  let allPassed = true;
  
  for (const endpoint of endpoints) {
    const result = await checkUrl(endpoint.url, endpoint.name);
    if (!result) allPassed = false;
  }
  
  return allPassed;
}

async function checkFrontend() {
  console.log('\n🌐 FRONTEND CHECK');
  console.log('-----------------');
  
  const pages = [
    { name: 'Main App', url: 'http://localhost:3000/College-Event-app' }
  ];
  
  let allPassed = true;
  
  for (const page of pages) {
    const result = await checkUrl(page.url, page.name);
    if (!result) allPassed = false;
  }
  
  return allPassed;
}

async function runComprehensiveCheck() {
  console.log('Starting comprehensive system check...\n');
  
  const results = {
    database: await checkDatabase(),
    backend: await checkBackend(),
    frontend: await checkFrontend()
  };
  
  console.log('\n📋 FINAL RESULTS');
  console.log('================');
  
  const allPassed = Object.values(results).every(result => result === true);
  
  Object.entries(results).forEach(([component, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${component.toUpperCase()}: ${passed ? 'PASSED' : 'FAILED'}`);
  });
  
  console.log('\n' + '='.repeat(50));
  
  if (allPassed) {
    console.log('🎉 ALL SYSTEMS OPERATIONAL!');
    console.log('✅ Frontend ↔ Backend ↔ Database: FULLY CONNECTED');
    console.log('');
    console.log('🔗 PERMANENT CONNECTIONS ESTABLISHED:');
    console.log('   • Frontend: http://localhost:3000/College-Event-app');
    console.log('   • Backend API: http://localhost:5001/api');
    console.log('   • Database: MySQL (nexusxrcpit)');
    console.log('   • NexusAdmin: http://localhost:3000/College-Event-app/nexusadmin.html');
  } else {
    console.log('⚠️  SOME ISSUES DETECTED');
    console.log('Please check the failed components above');
  }
  
  console.log('='.repeat(50));
}

// Run the check
runComprehensiveCheck().catch(console.error);