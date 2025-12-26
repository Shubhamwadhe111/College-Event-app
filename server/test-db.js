const mysql = require('mysql2/promise');
require('dotenv').config();

async function testDatabase() {
  console.log('Testing database connection...\n');
  
  try {
    // Create connection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });
    
    console.log('✅ Connected to MySQL server');
    
    // Show all databases
    console.log('\n📁 Available databases:');
    const [databases] = await connection.query('SHOW DATABASES');
    databases.forEach(db => {
      console.log(`  - ${db.Database}`);
    });
    
    // Try to use the configured database
    const dbName = process.env.DB_NAME || 'Nexusxrcpit';
    console.log(`\n🔍 Checking database: ${dbName}`);
    
    try {
      await connection.query(`USE ${dbName}`);
      console.log(`✅ Database "${dbName}" exists`);
      
      // Show tables
      console.log(`\n📋 Tables in ${dbName}:`);
      const [tables] = await connection.query('SHOW TABLES');
      
      if (tables.length === 0) {
        console.log('  ❌ No tables found! You need to run the schema.sql file.');
      } else {
        tables.forEach(table => {
          const tableName = table[`Tables_in_${dbName}`];
          console.log(`  - ${tableName}`);
        });
      }
      
    } catch (error) {
      console.log(`❌ Database "${dbName}" does not exist!`);
      console.log(`\nYou need to create it. Run this in MySQL Workbench:`);
      console.log(`  CREATE DATABASE ${dbName};`);
      console.log(`  USE ${dbName};`);
      console.log(`  -- Then run the schema.sql file`);
    }
    
    await connection.end();
    console.log('\n✅ Test complete');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\nCheck your .env file settings:');
    console.log(`  DB_HOST: ${process.env.DB_HOST}`);
    console.log(`  DB_USER: ${process.env.DB_USER}`);
    console.log(`  DB_NAME: ${process.env.DB_NAME}`);
  }
}

testDatabase();
