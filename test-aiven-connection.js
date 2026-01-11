/**
 * Test Aiven MySQL Connection
 * This script tests if you can connect to your Aiven database
 */

const mysql = require('mysql2/promise');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function testConnection() {
  console.log('========================================');
  console.log('  Test Aiven MySQL Connection');
  console.log('========================================\n');
  
  try {
    console.log('Enter your Aiven connection details:\n');
    
    const host = await question('Aiven Host: ');
    const port = await question('Aiven Port: ');
    const user = await question('Aiven User: ');
    const database = await question('Database Name: ');
    const password = await question('Password: ');
    
    console.log('\n========================================');
    console.log('  Testing connection...');
    console.log('========================================\n');
    
    const connection = await mysql.createConnection({
      host: host.trim(),
      port: parseInt(port.trim()),
      user: user.trim(),
      password: password.trim(),
      database: database.trim(),
      ssl: {
        rejectUnauthorized: false
      }
    });
    
    console.log('✅ Connection successful!\n');
    
    // Test query
    const [rows] = await connection.query('SELECT DATABASE() as db, VERSION() as version');
    console.log('Database:', rows[0].db);
    console.log('MySQL Version:', rows[0].version);
    
    // Check if tables exist
    const [tables] = await connection.query('SHOW TABLES');
    console.log('\nTables found:', tables.length);
    
    if (tables.length === 0) {
      console.log('\n⚠️  No tables found. You need to import the schema.');
      console.log('Run: node import-schema-node.js');
    } else {
      console.log('\nExisting tables:');
      tables.forEach(table => {
        console.log('  -', Object.values(table)[0]);
      });
    }
    
    await connection.end();
    
    console.log('\n========================================');
    console.log('  ✅ Test Complete!');
    console.log('========================================\n');
    console.log('Your Aiven database is working correctly.');
    console.log('You can now import the schema if needed.\n');
    
  } catch (error) {
    console.error('\n========================================');
    console.error('  ❌ Connection Failed');
    console.error('========================================\n');
    console.error('Error:', error.message);
    console.error('\nPlease check:');
    console.error('- Your Aiven service is running (green status)');
    console.error('- Connection details are correct');
    console.error('- Password is correct (copy from Aiven dashboard)');
    console.error('- You have internet connection\n');
  } finally {
    rl.close();
  }
}

testConnection();
