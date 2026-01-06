#!/usr/bin/env node

const mysql = require('mysql2/promise');
require('dotenv').config({ path: './server/.env' });

async function checkSchema() {
  let connection;
  
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'nexusxrcpit'
    });
    
    console.log('📊 CHECKING TABLE SCHEMAS');
    console.log('=========================');
    
    // Check organizers table structure
    console.log('\n👥 ORGANIZERS TABLE STRUCTURE:');
    const [organizerCols] = await connection.execute('DESCRIBE organizers');
    organizerCols.forEach(col => {
      console.log(`  - ${col.Field} (${col.Type})`);
    });
    
    // Check events table structure
    console.log('\n🎪 EVENTS TABLE STRUCTURE:');
    const [eventCols] = await connection.execute('DESCRIBE events');
    eventCols.forEach(col => {
      console.log(`  - ${col.Field} (${col.Type})`);
    });
    
    await connection.end();
    
  } catch (error) {
    console.log('Error:', error.message);
    if (connection) await connection.end();
  }
}

checkSchema();