const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function cleanDatabase() {
  let connection;
  
  try {
    // Create connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'nexusxrcpit'
    });

    console.log('🔗 Connected to database');

    // Clear existing data
    console.log('🧹 Cleaning existing data...');
    
    await connection.execute('DELETE FROM Notifications');
    await connection.execute('DELETE FROM Feedback');
    await connection.execute('DELETE FROM Registrations');
    await connection.execute('DELETE FROM Events');
    await connection.execute('DELETE FROM Organizers');
    await connection.execute('DELETE FROM Students');
    await connection.execute('DELETE FROM Admins');

    console.log('✅ All existing data cleared (including admin accounts)');

    // Reset auto-increment counters
    console.log('🔄 Resetting auto-increment counters...');
    
    await connection.execute('ALTER TABLE Admins AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE Students AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE Organizers AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE Events AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE Registrations AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE Notifications AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE Feedback AUTO_INCREMENT = 1');

    console.log('✅ Auto-increment counters reset');

    console.log('\n🎉 Database completely cleaned!');
    console.log('\n📋 Current Status:');
    console.log('   - No admin accounts exist');
    console.log('   - No student accounts exist');
    console.log('   - No organizer accounts exist');
    console.log('   - No events exist');
    console.log('\n🔑 To create your first admin:');
    console.log('   1. Go to /admin-register');
    console.log('   2. Use secret code: ADMIN2024');
    console.log('   3. Create your own admin account');

  } catch (error) {
    console.error('❌ Error cleaning database:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

// Run the cleanup
cleanDatabase();