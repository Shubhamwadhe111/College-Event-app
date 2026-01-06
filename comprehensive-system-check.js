#!/usr/bin/env node

const mysql = require('mysql2/promise');
const fetch = require('node-fetch');
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
    try {
      const response = await fetch(endpoint.url);
      if (response.ok) {
        console.log(`✅ ${endpoint.name}: SUCCESS (${response.status})`);
      } else {
        console.log(`❌ ${endpoint.name}: FAILED (${response.status})`);
        allPassed = false;
      }
    } catch (error) {
      console.log(`❌ ${endpoint.name}: FAILED (${error.message})`);
      allPassed = false;
    }
  }
  
  return allPassed;
}

async function checkFrontend() {
  console.log('\n🌐 FRONTEND CHECK');
  console.log('-----------------');
  
  const pages = [
    { name: 'Main App', url: 'http://localhost:3000/College-Event-app' },
    { name: 'NexusAdmin', url: 'http://localhost:3000/College-Event-app/nexusadmin.html' }
  ];
  
  let allPassed = true;
  
  for (const page of pages) {
    try {
      const response = await fetch(page.url);
      if (response.ok) {
        console.log(`✅ ${page.name}: SUCCESS (${response.status})`);
      } else {
        console.log(`❌ ${page.name}: FAILED (${response.status})`);
        allPassed = false;
      }
    } catch (error) {
      console.log(`❌ ${page.name}: FAILED (${error.message})`);
      allPassed = false;
    }
  }
  
  return allPassed;
}

async function testAuthentication() {
  console.log('\n🔐 AUTHENTICATION TEST');
  console.log('----------------------');
  
  try {
    // Test invalid login
    const response = await fetch('http://localhost:5001/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@test.com', password: 'wrongpassword' })
    });
    
    if (response.status === 401 || response.status === 400) {
      console.log('✅ Authentication endpoint: WORKING (properly rejects invalid credentials)');
      return true;
    } else {
      console.log('❌ Authentication endpoint: UNEXPECTED RESPONSE');
      return false;
    }
  } catch (error) {
    console.log('❌ Authentication test: FAILED');
    console.log('Error:', error.message);
    return false;
  }
}

async function runComprehensiveCheck() {
  console.log('Starting comprehensive system check...\n');
  
  const results = {
    database: await checkDatabase(),
    backend: await checkBackend(),
    frontend: await checkFrontend(),
    authentication: await testAuthentication()
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
  } else {
    console.log('⚠️  SOME ISSUES DETECTED');
    console.log('Please check the failed components above');
  }
  
  console.log('='.repeat(50));
}

// Run the check
runComprehensiveCheck().catch(console.error);