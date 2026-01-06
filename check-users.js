#!/usr/bin/env node

const mysql = require('mysql2/promise');
require('dotenv').config({ path: './server/.env' });

async function checkUsers() {
  let connection;
  
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'nexusxrcpit'
    });
    
    console.log('👥 CHECKING AVAILABLE USERS');
    console.log('============================');
    
    // Check students
    console.log('\n📚 STUDENTS:');
    const [students] = await connection.execute('SELECT student_id, full_name, email FROM students LIMIT 5');
    students.forEach(student => {
      console.log(`  ID: ${student.student_id} | Name: ${student.full_name} | Email: ${student.email}`);
    });
    
    // Check organizers
    console.log('\n👨‍💼 ORGANIZERS:');
    const [organizers] = await connection.execute('SELECT organizer_id, full_name, email, account_status FROM organizers LIMIT 5');
    organizers.forEach(organizer => {
      console.log(`  ID: ${organizer.organizer_id} | Name: ${organizer.full_name} | Email: ${organizer.email} | Status: ${organizer.account_status}`);
    });
    
    // Check admins
    console.log('\n👨‍💻 ADMINS:');
    const [admins] = await connection.execute('SELECT admin_id, full_name, email FROM admins LIMIT 5');
    admins.forEach(admin => {
      console.log(`  ID: ${admin.admin_id} | Name: ${admin.full_name} | Email: ${admin.email}`);
    });
    
    console.log('\n🔐 LOGIN INSTRUCTIONS:');
    console.log('======================');
    
    if (students.length > 0) {
      console.log(`\n✅ STUDENT LOGIN:`);
      console.log(`   Email: ${students[0].email}`);
      console.log(`   Password: [You need to know the password you set]`);
      console.log(`   URL: http://localhost:3000/College-Event-app/login`);
    }
    
    if (organizers.length > 0) {
      console.log(`\n✅ ORGANIZER LOGIN:`);
      console.log(`   Email: ${organizers[0].email}`);
      console.log(`   Status: ${organizers[0].account_status}`);
      console.log(`   Password: [You need to know the password you set]`);
    }
    
    if (admins.length > 0) {
      console.log(`\n✅ ADMIN LOGIN:`);
      console.log(`   Email: ${admins[0].email}`);
      console.log(`   Password: [You need to know the password you set]`);
      console.log(`   URL: http://localhost:3000/College-Event-app/admin-login`);
    }
    
    if (students.length === 0 && organizers.length === 0 && admins.length === 0) {
      console.log('\n⚠️  NO USERS FOUND!');
      console.log('   You need to register first:');
      console.log('   - Student: http://localhost:3000/College-Event-app/register');
      console.log('   - Admin: http://localhost:3000/College-Event-app/admin-register (Code: ADMIN2024)');
    }
    
    await connection.end();
    
  } catch (error) {
    console.log('❌ Error:', error.message);
    if (connection) await connection.end();
  }
}

checkUsers();